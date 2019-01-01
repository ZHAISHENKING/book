### admin后台QUIZ接口修改（11.13）

> 1. QUIZ增删改查功能
>
> 2. 创建试卷增加`start_time`,`end_time`,`is_visitable`字段和`status`属性
> 3. 前端通过status属性值判断试卷是否过期，通过is_visitable值判断试卷是否公开

- 增

**创建试卷接口所需字段**

```json
{
    "start_time":"",
    "end_time":"",
    "title":"",
    "desc":"",
    "is_visitable":True/False
}

```

创建问题、答题接口不变

- 删

**删除试卷**

DELETE http://oj.ultrabear.com.cn/api/admin/subject_edit?id=7

参数 试卷id

**删除问题**

DELETE http://oj.ultrabear.com.cn/api/admin/question?id=7

参数 问题id

- 改

**编辑试卷**

PUT http://oj.ultrabear.com.cn/api/admin/subject_edit

id必填，需具体讨论

```json
{
	"id": 14,
	"desc":"sssr",
	"title":"asdasdasd",
	"question_list":[42],
    "start_time":"",
    "end_time":"",
    "is_visitable":True
}
```

**编辑问题**

PUT http://oj.ultrabear.com.cn/api/admin/question

注: 如果要改选项顺序，则更换选项的desc描述

```json
{
    "id":"14",
	"desc":"bbbbb?",
	"score":"2",
	"answer":"1",
	"choice_list":[{
		"desc":"嗯嗯额",
		"order_in_list":"1"
	},{
		"desc":"啊啊啊",
		"order_in_list":"2"
	}]
			
}
```

