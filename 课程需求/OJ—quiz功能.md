## OJ—quiz功能

- Admin后台创建Subject
- 试卷总分值随问题分值和改变
- Admin后台创建Question
- ~~问题在试卷中的排序及选项顺序依据<font color=red>order_in_list</font>字段,在admin后台中可上下移来控制~~

- 降低试卷与问题耦合度，尽可能问题复用

创建试题字段

POST  http://oj.ultrbear.com.cn/api/admin/subject

```json
{
    "title":"第一套xxx",
    "desc":"描述"
}
```

<font color=red>成功回调</font>

```json
{
    "error": null,
    "data": 7
}
```



查询试题

GET http://oj.ultrbear.com.cn/api/subject(?id=1)

创建题目字段

POST  http://oj.ultrbear.com.cn/api/admin/question

```json
{
    "desc":"aaaaa?",
    "score":"分值",
    "answer":"答案",
    "choice_list":[{
        "desc":"选项描述",
        "order_in_list":"选项位置"
    }]	
}
```

查询题目

GET  http://oj.ultrbear.com.cn/api/question(?id=1)

编辑试卷字段

POST  http://oj.ultrbear.com.cn/api/admin/subject_edit

```json
{
    "id":"试卷id",
    "question_list":[1,2,3]
}
```



提交答案

POST  http://oj.ultrbear.com.cn/api/record

```json
{
	"subject":7,
	"answer_list":[{"question":"16","answer":"1"}]
}
```

<font color=red>成功回调</font>

```json
{
    "error": null,
    "data": [
        {
            "id": 24,
            "user": {
                "id": 7,
                "user": {
                    "id": 7,
                    "username": "jamie",
                    "email": "18700790825@163.com",
                    "phone": "18700790825",
                    "admin_type": "Super Admin",
                    "problem_permission": "All",
                    "create_time": "2018-11-02T01:50:55.610450Z",
                    "last_login": "2018-11-12T02:29:20.348139Z",
                    "two_factor_auth": false,
                    "open_api": false,
                    "is_disabled": false
                },
                "real_name": null,
                "acm_problems_status": {},
                "oi_problems_status": {},
                "avatar": "/public/avatar/default.png",
                "blog": null,
                "mood": null,
                "github": null,
                "school": null,
                "major": null,
                "language": null,
                "accepted_number": 0,
                "total_score": 0,
                "submission_number": 0
            },
            "subject": {
                "id": 7,
                "question_list": [
                    {
                        "id": 16,
                        "desc": "aaaaa?",
                        "create_at": "2018-11-09T09:44:04.015858Z",
                        "value": 2
                    },
                    {
                        "id": 17,
                        "desc": "bbbbb?",
                        "create_at": "2018-11-12T02:31:11.381598Z",
                        "value": 2
                    }
                ],
                "create_by": {
                    "id": 7,
                    "username": "jamie",
                    "real_name": null
                },
                "create_time": "2018-11-12T02:29:35.520242Z",
                "title": "第1套",
                "desc": "简单测试",
                "score": 4
            },
            "answer_list": [
                {
                    "answer": "1",
                    "question": "16"
                }
            ],
            "value": 2,
            "update_time": "2018-11-12T02:37:35.652650Z"
        }
    ]
}
```

