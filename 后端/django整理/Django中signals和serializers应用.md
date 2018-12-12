# Django中signals和serializers应用

[TOC]

<br>

> 最近工作中出现了一个问题, models需要等一个进程结束后更新，但我不知道进程什么时候结束。
>
> 简单来说就是<font color=red>我是监考老师，我得在学生答完题后收卷，但我不知道学生什么时候答完</font>,当我问同事的时候他告诉我这个👇

<center><img src="http://qiniu.s001.xin/dufd4.jpg" width=600></center>



<br>

## signals应用(仅限入门，记录我的问题)

&ensp;&ensp;&ensp;&ensp;百度了一下，`signal`(信号)类似于前端的一些周期函数，可以在models save,delete，包括请求发生前后调用自己定义的方法,可以很好的解决我的问题

**首先，在你需要发送信号的app下创建`signals.py`,`apps.py`, `__init__.py`文件**

<center><img src="http://qiniu.s001.xin/9ugu2.jpg" width=300></center>

**开始写逻辑**

```python
# signals.py
from django.dispatch import receiver
from django.db.models.signals import post_save
from .models import Submit


@receiver(post_save, sender=Submit, dispatch_uid="subject_post_save")
def sub_result_changed(sender, instance, **kwargs):
    print("signals正常")
    sub = Submit.objects.get(pk=instance.id)
    print(sub.id)
```

调用receiver装饰器

`post_save`是models.save发生后调用

上面一段代码完成了在Submit这个model更新之后返回它的id

**在app.py文件写配置引用signal**

```python
# app.py
from django.apps import AppConfig


class QuestionBankConfig(AppConfig):
    name = 'question_bank'
    verbose_name = '题库'
	# 在ready方法中引用
    def ready(self):
        import question_bank.signals
```

**`__init__.py`文件中再声明配置**

```python
# __init__.py
default_app_config = 'question_bank.apps.QuestionBankConfig'
```

<br>

分三步且放在三个文件是为了模块化划分，每个文件各司其职降低各模块耦合度，易于维护



## serializers序列化

> serializer，在view中调用写好的serializer类，将models字段序列化输出。

在flask中，开发API不需要serializer，只需从db中取出数据，按你想输出的格式将数据dumps就可以完成一个API

django的serializer看似冗余，不过这种先做模板，再走流程的开发方式在大型项目中也显得很吃香。