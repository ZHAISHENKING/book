**OJ天梯系统问题提交逻辑**

用户提交问题->判断问题是否属于某个章节->判断是否全部正确



**course支付问题**

支付宝 `alipay_wap`

```json
{
    "extra":{
        "success_url": "成功回调",
        "app_pay": "true"
    }
}
```



微信 `wx_wap`

```json
{
    "extra":{
        "result_url":"成功回调"
    }
}
```



微信公众平台

https://mp.weixin.qq.com/

微信开放平台

https://open.weixin.qq.com/

微信商户平台

https://pay.weixin.qq.com/