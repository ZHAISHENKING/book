# Django-redis

### 1.安装

```py
pip install django-redis
```

settings.py

```python
CACHES = {
    "default":{
        "BACKEND":"django_redis.cache.RedisCache",
        "LOCATION":"redis://127.0.0.1:6379/1",
        "OPTIONS":{
            "CLIENT_CLASS":"django_redis.client.DefaultClient"
        }
    }
}
```

> django缓存的使用

### 2.视图函数中使用缓存

下面这段代码将my_view这个视图函数缓存60*15秒，即15分钟，这个视图中所有的url都会创建一个缓存

```python
from django.views.decorators.cache import cache_page

@cache_page(60 * 15)
def my_view(request):
    return render(request, 'index.html')
```

但是，需要说明的是，给视图添加缓存是有风险的，如果视图所展示的网页中有经常动态变动的信息，那么被添加缓存命不可取。

缓存整个视图最实用的场景应该是这个视图所展示的网页的内容基本上不怎么变动，或者说在很长一段时间内不需要变动，这样使用缓存就非常有效。

### 3.URLconf中使用缓存

上面说了函数视图使用缓存，但是我们可能还有一种场景，那就是多个 URL 指向同一个函数视图，但是我只想缓存一部分的 URL，这时候就可以采用在 URLconf 中使用缓存，这样就指定了哪些 URL 需要缓存。

下面分别表示了函数视图和类视图的路由中使用缓存的方式，基本一致：

```python
from django.views.decorators.cache import cache _page

urlpatterns = [
    url(r'^foo/([0-9]{1,2})/$',cache_page(60 * 15)(my_view)),
    url(r'^$', cache_page(60 * 30)(IndexView.as_view()), name='index'),
]
```

URLconf 使用缓存和视图函数使用缓存需要注意的地方是一样的，因为它们都是缓存整个页面，所有都需要考虑是否整个页面都应该缓存。

### 4.函数中使用缓存

函数中使用缓存是最基本的使用方法，跟在其他非 django 中使用的方式一致，无非就是使用 set() 和 get() 方法。

例如我有一个使用场景：<code>我的博客的文章是使用的 markdown 的格式输入的，所以每次展现到前端之前后端都需要把文章的内容进行一次 markdown 转化，这个渲染的过程难免会有点影响性能，所以我可以使用缓存来存放已经被渲染过的文章内容。具体的代码片段如下</code>：

```python
ud = obj.update_date.strftime("%Y%m%d%H%M%S")
md_key = '{}_md_{}'.format(obj.id, ud)
cache_md = cache.get(md_key)
if cache_md:
    md = cache_md
else:
    md = markdown.Markdown(extensions=[
        'markdown.extensions.extra',
        'markdown.extensions.codehilite',
        TocExtension(slugify=slugify),
    ])
    cache.set(md_key, md, 60 * 60 * 12)
```

上面的代码中，我选择文章的 ID 和文章更新的日期作为缓存的 key，这样可以保证当文章更改的时候能够丢弃旧的缓存进而使用新的缓存，而当文章没有更新的时候，缓存可以一直被调用，直到缓存按照设置的过期时间过期。

### 5.模板中使用缓存

模板中使用缓存是我比较推荐的一种缓存方式，因为使用这种方式可以充分的考虑缓存的颗粒度，细分颗粒度，可以保证只缓存那些适合使用缓存的 HTML 片段。

具体的使用方式如下，首先加载 cache 过滤器，然后使用模板标签语法把需要缓存的片段包围起来即可。

```html
{% load cache %}
{% cache 500 ‘cache_name’ %}
    <div>container</div>
{% endcache %}
```

## 总结

### 缓存的使用原则

先说一下我在使用缓存的时候遇到的问题，我之前给我的很多视图函数还有URL路由添加了缓存，也就是缓存整个页面，后来发现出问题了，因为我的每个页面都有导航栏，而导航栏上面有登录和登出按钮，这样如果缓存起来的话，就无法让用户显示登录和登出了，并且，有表单的页面也无法提交表单，总之，缓存整个页面是一件有风险的行为。

那么到底哪些时候应该用缓存呢？

据我目前的理解，下面这些时候可以用缓存：

- 纯静态页面
- 读取了数据库信息，但是不经常变动的页面，比如文章热门排行榜，这个调用数据库信息并且还要排序的完全可以使用缓存，因为不需要实时展现最新的
- HTML 的片段，比如整个页面都经常变动，但是有个侧边栏不经常变动，就可以缓存侧边栏
- 需要使用复杂逻辑生成的 HTML 片段，使用缓存可以减少多次重复操作



