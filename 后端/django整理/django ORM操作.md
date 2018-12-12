# Django多层嵌套ManyToMany字段ORM操作

>  在用django写项目时，遇到了许多场景，关于ORM操作获取数据的，但是不好描述出来，百度搜索关键词都不知道该怎么搜，导致一个人鼓捣了好久。这里细化下问题，还原场景，记录踩下的坑

首先先列举model，我举些生活中的例子，更方便理解问题

```python
# 习题
class Problem(models.Model):
    desc = models.CharField()
    answer = models.TextField()
    is_pass = models.BooleanField(default=False, verbose_name="是否通过")

# 章节
class Chapter(models.Model):
    _id = models.IntegerField(verbose_name="编号")
    title = models.CharField()
    problem = models.ManyToManyField(Problem)
    pass_rate = models.IntegerField(verbose_name="通关率")

# 书籍    
class Book(models.Model):
    title = models.CharField()
    desc = models.TextField()
    chapter = models.ManyToManyField(Chapter,verbose_name="章节")
    speed = models.IntegerField(verbose_name="学习进度", default=0)
    
    
```

假设是一本数学书，有5个章节，每个章节里有数量不等的习题,

即book与chapter是多对多,chapter与problem也是多对多

**场景一: 书籍下的所有习题**

```python
# 按我的理解是取问题非空的章节数
# 类似于问爷爷有几个孙子，没办法跨辈，就按一个孙子对应一个爸爸来取（有重复）
book.chapter.filter(problem___id__isnull=False).count()
```

**场景二：书籍下所有通过的习题**

```python
book.chapter.filter(problem__is_pass=True).count()
```

**场景三: 判断某个问题是否在这本书里**

```python
    def problem_in_ladder(book, problem):
        for i in book.chapter.all():
            if problem in i.problem.all():
                return True
        return False
```



尽可能的减少view中对models的取值操作，所以把上面几个场景方法写在models类中

最终的models

```python
# 习题
class Problem(models.Model):
    desc = models.CharField()
    answer = models.TextField()
    is_pass = models.BooleanField(default=False, verbose_name="是否通过")

# 章节
class Chapter(models.Model):
    _id = models.IntegerField(verbose_name="编号")
    title = models.CharField()
    problem = models.ManyToManyField(Problem)
    pass_rate = models.IntegerField(verbose_name="通关率")
	
    @property
    def items(self):
        return self.problem.count()

    @property
    def pass_problem(self):
        return self.problem.filter(is_pass=True).count()
    
# 书籍    
class Book(models.Model):
    title = models.CharField()
    desc = models.TextField()
    chapter = models.ManyToManyField(Chapter,verbose_name="章节")
    speed = models.IntegerField(verbose_name="学习进度", default=0)
    
    @property
    def chapters(self):
        return self.chapter.count()

    @property
    def pass_count(self):
        return self.chapter.filter(problem__is_pass=True).count()

    @property
    def items(self):
        return self.chapter.filter(problem___id__isnull=False).count()
```

