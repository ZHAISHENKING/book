# django ORM之 values和annotate使用

> 任务需求：项目中有个问题表，存储所有的问题，以`_id`为编号，由于`_id`未做唯一校验，所以早期数据有多个问题使用同一编号的情况。 
>
> <font color=green>需求就是找出编号有重复的数据，只保留第一个</font>

<br>

## 开始之前

使用了values和annotate两个函数

简单的来说`values`可以理解成展示`models`指定列的值

`annotate`起到了`group by`的作用,

所以我做的事就是**对指定字段按个数进行统计，然后留下重复编号的数据，进行清洗**

<br>

1. 看看数据库数据

<center><img src="http://qiniu.s001.xin/7c7nt.jpg"></center>

2. 查看每条数据的_id的值

<center><img src="http://qiniu.s001.xin/lgftn.jpg"></center>

3. 对_id数据条数进行统计

<center><img src="http://qiniu.s001.xin/7omrg.jpg"></center>

4. 转换数据格式为list

<center><img src="http://qiniu.s001.xin/ajy3l.jpg"></center>

Emmm。。。我只需要重复数据，所以把_id唯一的数据剔除

5. 写个简单的遍历

<center><img src="http://qiniu.s001.xin/wj493.jpg" width=300></center>

6. 然后只需要找到这些数据，对每个_id只留下第一条数据

7. 导出sql，做个备份，开始删除数据



最终处理:

<center><img src="http://qiniu.s001.xin/rvn5w.jpg"></center>

删除过程:

<center><img src="http://qiniu.s001.xin/ujwim.jpg"></center>

再回到网站看看数据清洗后的效果

<center><img src="http://qiniu.s001.xin/ephme.jpg"></center>



## 相关代码

```python
from django.db.models.aggregates import Count
from problem.models import *
a=Problem.objects.values("_id").annotate(count=Count("_id")).all()
c=[i for i in a if i["count"] != 1]
for i in c:
    p_list = Problem.objects.filter(_id=i["_id"])
    id = p_list[0].id
    for j in p_list:
        if j.id != id:
			j.delete()
```

