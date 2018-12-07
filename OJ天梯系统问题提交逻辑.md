## OJ天梯系统问题提交逻辑

场景一：

用户答题：可直接至问题页面提交，也可进入天梯系统的章节列表选择问题提交

场景二：

用户登录后进入天梯点击某个ladder详情，则创建一个userladder，退出后会展示该用户最新的userladder

用户未登录不会展示天梯历史记录

场景三：

用户提交问题时，问题在章节里，那么userladder有则更新，无则新建

判断问题是否正确，错误只更新时间、正确更新答题进度

更新答题进度步骤：

- userladder下的该问题is_pass字段为true
- userladder下的该问题所属level的speed字段更新为章节通过问题数/章节总问题数
- userladder下ladder的pass_rate字段更新为通过问题数/ladder总问题数
- 单个level下所有问题全部通过，解锁下个level

场景四:

UserLadder表需记录的字段

- user
- ladder 
- ladder_speed(ladder进度)
- Level_speed(level进度)
- 

Q&A

level在lock状态时所属问题不能提交，不能查看



## course支付接口参数

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

### 支付完善

退款记录(时间、金额、状态)、交易负责人