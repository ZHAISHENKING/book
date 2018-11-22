#MP4视频在Safari播放

----

>  前言：在用Flask框架写上传文件接口时，图片可以正常上传显示，但视频无法在Safari中播放，IOS手机也不支持,最终解决了这个问题



来看看问题的关键

<img src="http://qiniu.s001.xin/flask/content_range.png">

<img src="http://qiniu.s001.xin/flask/range.png">

简而言之就是，http请求报文信息中，请求头有['range']，它的格式有下面几种(假设总字节为10000)：

> bytes=0-			0开始，请求全部
>
> bytes=1000-2999	请求字节从1000开始到2999
>
> bytes=8000-9999	请求字节从8000开始到9999
>
> bytes=-500		请求最后500字节

按照上面的介绍，也就是说你的响应头中的['Content-Range']字段，必须对应它的range做出不同响应

> bytes 0-9999/10000		0开始，请求全部
>
> bytes 1000-2999/10000	请求字节从1000开始到2999
>
> bytes 8000-9999/10000	请求字节从8000开始到9999
>
> bytes 9499-9999/10000		请求最后500字节

最恶心的是,苹果为了节省用户流量，会先发一个字节的请求，`bytes=0-1`并判断你是否有Content-range响应。这个请求辉获取到你的视频类型，总长度，成功之后才会发起第二个请求，响应状态为206，通常是断点续传，否则就不再发起请求。所以我们在用ios打开视频的时候，会闪一下出现进度条，然后是图像破裂的样式，显示播放失败

<img src="http://qiniu.s001.xin/flask/video206.png">

### 解决

----

问题就在于获取视频长度、视频类型和针对不同range返回content-range

```python
class ServerFile(Resource):
    """
    查看作品视频
    """
    def get(self,id):
        # 请求的视频名是md5+.mp4后缀拼接
        md = file_set.find_one({'md5': id.split('.')[0]})
        if md is None:
            raise bson.errors.InvalidId()
        resp = flask.Response(md['content'], mimetype=ALLOWED_EXTENSIONS[md['mime']])
        resp.headers['Last-Modified'] = md['time'].ctime()
        ctype = '*'
        
        # 判断请求头是否包含range
        if request.headers.get("Range"):
            range_value = request.headers["Range"]
            # 取出start与end
            HTTP_RANGE_HEADER = re.compile(r'bytes=([0-9]+)\-(([0-9]+)?)')
            m = re.match(HTTP_RANGE_HEADER, range_value)
            if m:
                start_str = m.group(1)
                start = int(start_str)
                end_str = m.group(2)
                end = -1
                # end存在
                if len(end_str) > 0:
                    end = int(end_str)
                # range存在时，让请求支持断点续传,status_code改为206
                resp.status_code = 206
                # 图省事这里把content-type写为*
                resp.headers["Content-Type"] = ctype
                if end == -1:
                    # 此处的md['size']是文件大小
                    resp.headers["Content-Length"] = str(md['size'] - start)
                else:
                    # Content-Length也要改变
                    resp.headers["Content-Length"] = str(end - start + 1)
                resp.headers["Accept-Ranges"] = "bytes"
                if end < 0:
                    content_range_header_value = "bytes %d-%d/%d" % (start, md['size'] - 1, md['size'])
                else:
                    content_range_header_value = "bytes %d-%d/%d" % (start, end, md['size'])
                resp.headers["Content-Range"] = content_range_header_value
                resp.headers["Connection"] = "keep-alive"
        return resp
```

最终，视频正常播放

### 特别感谢

<a href="https://blog.csdn.net/cteng/article/details/52791723">Python3 http服务器脚本，支持range请求头部</a>