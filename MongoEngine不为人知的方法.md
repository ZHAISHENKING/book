# MongoEngine不为人知的方法

> 之前发了个博客写的是<a href="https://blog.csdn.net/weixin_42042680/article/details/81676972">MongoEngine的入门文档</a>，在清楚了建表的字段类型，学会如何查询之后，我们来聊聊MongoEngine不常用但很有用的其他方法。

[TOC]

### 1.get查询容错

```python
# 查询某个用户时，get方法有则返回queryset,无则报错User.DoesNotExist
user = User.objects.get(name="xx")
# 为防止报错, 有则返回queryset，无则返回None
user = User.objects.filter(name="xx")
if user:
    user = user[0]
# 或者
user = User.objects.filter(name="xx").first()
# 进一步优化
user = User.objects(name="xx").first()
```

### 2.with_id使用

```python
# mongo默认id类型为ObjectId，所以使用id查询时，需将str转换为ObjectId
from bson import ObjectId
user = User.objects.get(id=ObjectId(user_id))
# 优化
user = User.objects.with_id(user_id)
```

### 3.filter中字符查询-contains使用

```python
# contains包含，icontains包含(忽略大小写)
# 模糊检索时对象属性包含所查询字符,如name为abc,输入ab
user = User.objects.filter(name__contains=search_str)
```

### 4.不包含查询

这个功能让我找了好久…知道怎么写的时候眼泪掉下来

```python
# 包含contains 不包含not__contains
# 姓名不包含aa的人
user = User.objects.filter(name__not__contains="aa")
```

### 5.list转querySet

```python
# 多对多查询时，查询到某对象关联的列表集，进一步使用filter时报错非querySet
set_role = Role.objects.filter(pk__in=[i.pk for i in role_list if i])
```

### 6.querySet转dict

```python
user = User.objects.get(name="xxx")
# 需⚠️的是，若将此功能作为结果集的serializer使用，不应该包含外键关联字段
# 用fields方法过滤指定字段也不起作用
user_dict = user.to_mongo().to_dict()
```

### 7.Serializer处理

```python
# 自定义函数
# 序列化处理，排除指定字段
def m2d_exclude(obj, *args):
    model_dict = obj.to_mongo().to_dict()
    if args:
        list(map(model_dict.pop, list(args)))
    if "_id" in model_dict.keys():
        model_dict["_id"] = str(model_dict["_id"])
    return model_dict

# 序列化处理，只返回特定字段
def m2d_fields(obj, *args):
    model_dict = obj.to_mongo().to_dict()
    if args:
        fields = [i for i in model_dict.keys() if i not in list(args)]
        list(map(model_dict.pop, fields))
    if "_id" in model_dict.keys():
        model_dict["_id"] = str(model_dict["_id"])
    return model_dict
```

**调用**

```python
class Role(db.Document):
    name = db.StringField(verbose_name="角色名称")
    desc = db.StringField(verbose_name="职责描述")
    permission = db.ListField(db.ReferenceField(Permission, reverse_delete_rule=4), verbose_name="权限")
    staff = db.ListField(db.ReferenceField(Staff, reverse_delete_rule=4), verbose_name="关联员工")
    
    
role = Role.objects.get(name="管理员")
result = m2d_exclude(role, "permission", "staff")
# 或
result = m2d_fields(role, "name", "desc", "_id")
```

<img src="http://qiniu.s001.xin/9kbpp.jpg" width=600>

### 8. item_frequencies的使用

文档是这么写的:**返回整个查询文档集中字段存在的所有项的字典及其对应的频率**，即某字段所有值的集合(去重)和结果出现次数，简单来说就是group_by

**想到的应用场景**

1. 一个班级所有人的数学成绩，不及格的多少人，60-70的多少人，80-90的多少人...

2. 分类

   <img src="http://qiniu.s001.xin/vwhm3.jpg" width=250>

**使用**:

<img src="http://qiniu.s001.xin/abu6o.jpg" width=400>

### 9.scalar

获取所查询的字段值的列表

<img src="http://qiniu.s001.xin/k7enm.jpg" width=600>



