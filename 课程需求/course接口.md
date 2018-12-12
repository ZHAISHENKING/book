```python
a=PaymentLog.objects.all()
for i in a:
	c = str(i.payment).split("[奥创熊编程]")[1].rsplit("-",1)[0]
	i.update(course=c)
```

> 调用第三方平台ping++支付，目前使用支付渠道微信扫码、支付宝扫码

### 查询记录

`GET` **https://www.ultrabear.com.cn/v1/order/search_log**

可选参数 id（记录id）、course（课程名）、create_by（创建人姓名/手机）

参数缺省则返回全部记录

响应

```json
{
    "msg": "请求成功",
    "data": [
        {
            "id": "5bade95c2d9c7a37591f0864",
            "status": "支付状态",
            "user": "用户名",
            "channel": "支付渠道",
            "course": "课程名",
            "created_at": "创建时间",
            "amount_paid": "支付金额"
        },
        {
            "id": "5bbc27a32d9c7a55669b8a79",
            "status": "paid",
            "user": "18971254266",
            "channel": "alipay_qr",
            "course": "Scratch季课",
            "created_at": 1539056997,
            "amount_paid": 3000
        }
    ],
    "code": 0
}
```

### 支付订单

`POST` **https://www.ultrabear.com.cn/v1/pay/**

参数

```json
{
	"id": "2001809180000123541",
	"channel": "wx_pub_qr"
}
```

