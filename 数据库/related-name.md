# Django ORM

[TOC]

### 一. 单表操作

**QuerySet数据类型**

QuerySet与惰性机制

所谓惰性机制：Publisher.objects.all()或者.filter()等都只是返回了一个QuerySet（查询结果集对象），它并不会马上执行sql，而是当调用QuerySet的时候才执行。

QuerySet特点

- 可迭代
- 可切片
- <font color=red>惰性计算和缓存</font>

```python
def queryset(request):
    books=models.Book.objects.all()[:10]  #切片 应用分页
    books = models.Book.objects.all()[::2]
    book= models.Book.objects.all()[6]    #索引
    print(book.title)
    for obj in books:                     #可迭代
        print(obj.title)
    books=models.Book.objects.all()          #惰性计算--->等于一个生成器，不应用books不会执行任何SQL操作
    # query_set缓存机制1次数据库查询结果query_set都会对应一块缓存，再次使用该query_set时，不会发生新的SQL操作；
    #这样减小了频繁操作数据库给数据库带来的压力;
    authors=models.Author.objects.all()
    for author in  authors:
        print(author.name)
    print('-------------------------------------')
    models.Author.objects.filter(id=1).update(name='张某')
    for author in  authors:
        print(author.name)
    #但是有时候取出来的数据量太大会撑爆缓存，可以使用迭代器优雅得解决这个问题；
    models.Publish.objects.all().iterator()
    return HttpResponse('OK')
```

>  查询

**双下划线应用**

```python
# 获取个数
#
# models.Tb1.objects.filter(name='seven').count()

# 大于，小于
#
# models.Tb1.objects.filter(id__gt=1)              # 获取id大于1的值
# models.Tb1.objects.filter(id__gte=1)              # 获取id大于等于1的值
# models.Tb1.objects.filter(id__lt=10)             # 获取id小于10的值
# models.Tb1.objects.filter(id__lte=10)             # 获取id小于10的值
# models.Tb1.objects.filter(id__lt=10, id__gt=1)   # 获取id大于1 且 小于10的值

# in
#
# models.Tb1.objects.filter(id__in=[11, 22, 33])   # 获取id等于11、22、33的数据
# models.Tb1.objects.exclude(id__in=[11, 22, 33])  # not in

# isnull
# Entry.objects.filter(pub_date__isnull=True)

# contains
#
# models.Tb1.objects.filter(name__contains="ven")
# models.Tb1.objects.filter(name__icontains="ven") # icontains大小写不敏感
# models.Tb1.objects.exclude(name__icontains="ven")

# range
#
# models.Tb1.objects.filter(id__range=[1, 2])   # 范围bettwen and

# 其他类似
#
# startswith，istartswith, endswith, iendswith,

# order by
#
# models.Tb1.objects.filter(name='seven').order_by('id')    # asc
# models.Tb1.objects.filter(name='seven').order_by('-id')   # desc

# group by
#
# from django.db.models import Count, Min, Max, Sum
# models.Tb1.objects.filter(c1=1).values('id').annotate(c=Count('num'))
# SELECT "app01_tb1"."id", COUNT("app01_tb1"."num") AS "c" FROM "app01_tb1" WHERE "app01_tb1"."c1" = 1 GROUP BY "app01_tb1"."id"

# limit 、offset
#
# models.Tb1.objects.all()[10:20]

# regex正则匹配，iregex 不区分大小写
#
# Entry.objects.get(title__regex=r'^(An?|The) +')
# Entry.objects.get(title__iregex=r'^(an?|the) +')

# date
#
# Entry.objects.filter(pub_date__date=datetime.date(2005, 1, 1))
# Entry.objects.filter(pub_date__date__gt=datetime.date(2005, 1, 1))

# year
#
# Entry.objects.filter(pub_date__year=2005)
# Entry.objects.filter(pub_date__year__gte=2005)

# month
#
# Entry.objects.filter(pub_date__month=12)
# Entry.objects.filter(pub_date__month__gte=6)

# day
#
# Entry.objects.filter(pub_date__day=3)
# Entry.objects.filter(pub_date__day__gte=3)

# week_day
#
# Entry.objects.filter(pub_date__week_day=2)
# Entry.objects.filter(pub_date__week_day__gte=2)

# hour
#
# Event.objects.filter(timestamp__hour=23)
# Event.objects.filter(time__hour=5)
# Event.objects.filter(timestamp__hour__gte=12)

# minute
#
# Event.objects.filter(timestamp__minute=29)
# Event.objects.filter(time__minute=46)
# Event.objects.filter(timestamp__minute__gte=29)

# second
#
# Event.objects.filter(timestamp__second=31)
# Event.objects.filter(time__second=2)
# Event.objects.filter(timestamp__second__gte=31)

进阶操作
```

**extra,F,Q**

```python
# extra 过滤
#
# extra(self, select=None, where=None, params=None, tables=None, order_by=None, select_params=None)
#    Entry.objects.extra(select={'new_id': "select col from sometable where othercol > %s"}, select_params=(1,))
#    Entry.objects.extra(where=['headline=%s'], params=['Lennon'])
#    Entry.objects.extra(where=["foo='a' OR bar = 'a'", "baz = 'a'"])
#    Entry.objects.extra(select={'new_id': "select id from tb where id > %s"}, select_params=(1,), order_by=['-nid'])

# F	列字段操作
#
# from django.db.models import F
# models.Tb1.objects.update(num=F('num')+1)


# Q 条件查询
#
# 方式一：
# Q(nid__gt=10)
# Q(nid=8) | Q(nid__gt=10)
# Q(Q(nid=8) | Q(nid__gt=10)) & Q(caption='root')
# 方式二：
# con = Q()
# q1 = Q()
# q1.connector = 'OR'
# q1.children.append(('id', 1))
# q1.children.append(('id', 10))
# q1.children.append(('id', 9))
# q2 = Q()
# q2.connector = 'OR'
# q2.children.append(('c1', 1))
# q2.children.append(('c1', 10))
# q2.children.append(('c1', 9))
# con.add(q1, 'AND')
# con.add(q2, 'AND')
#
# models.Tb1.objects.filter(con)


# 执行原生SQL
#
# from django.db import connection, connections
# cursor = connection.cursor()  # cursor = connections['default'].cursor()
# cursor.execute("""SELECT * from auth_user where id = %s""", [1])
# row = cursor.fetchone()
```

### 二. 连表操作

我们在学习django中的orm的时候，我们可以把一对多，多对多，分为正向和反向查找两种方式。

正向查找：ForeignKey在 UserInfo表中，如果从UserInfo表开始向其他的表进行查询，这个就是正向操作，反之如果从UserType表去查询其他的表这个就是反向操作。

- 一对多：models.ForeignKey(其他表)
- 多对多：models.ManyToManyField(其他表)
- 一对一：models.OneToOneField(其他表)

**正向连表操作总结：**

所谓正、反向连表操作的认定无非是Foreign_Key字段在哪张表决定的，

Foreign_Key字段在哪张表就可以哪张表使用Foreign_Key字段连表，反之没有Foreign_Key字段就使用与其关联的 小写表名；

<font color=red>1对多：对象.外键.关联表字段，values(外键字段__关联表字段)</font>

<font color=red>多对多：外键字段.all()</font>

**反向连表操作总结：**

 通过value、value_list、fifter 方式反向跨表：小写表名__关联表字段

通过对象的形式反向跨表：小写表名_set().all()

**应用场景：**

**一对多**：当一张表中创建一行数据时，有一个单选的下拉框（可以被重复选择）

例如：创建用户信息时候，需要选择一个用户类型【普通用户】【金牌用户】【铂金用户】等。

**多对多**：在某表中创建一行数据是，有一个可以多选的下拉框

例如：创建用户信息，需要为用户指定多个爱好

