## pandas高级操作

----

### pandas数据处理

#### 1. 删除重复元素

> 使用`duplicated`函数检测重复的行，返回元素为布尔类型的Series对象，每个元素对应一行，如果该行不是第一次出现，则元素为True
>
> - 使用`drop_duplicates()`函数删除重复的行
> - 使用`duplicated()`函数查看重复的行
> - 如果使用**pd.concat([df1,df2],axis = 1)**生成新的DataFrame，新的df中columns相同，使用duplicate()和drop_duplicates()都会出问题

```python
df.duplicated(keep='last')
>>> 0     True
    1    False
    2     True
    3    False
    4    False
    dtype: bool
df.drop_duplicates(keep='last')
# 使用drop函数删除重复元素
df.drop(df[df.duplicated()].index)
```

#### 2. 映射

> 映射的含义：创建一个映射关系列表，把values元素和一个特定的标签或者字符串绑定
>
> 包含三种操作：
>
> - replace()函数：替换元素（DataFrame\Series的函数)
> - 最重要：map()函数：新建一列(Series的函数)
> - rename()函数：替换索引(DataFrame的函数)

- DateFrame可以存在多种数据类型
- Series、numpy只能存在一种类型
- DateFrame赋值时如果有None，显示方式取决于该列的数据类型，如果为object，则为None，如果是float,则显示np.nan

#####1) replace()函数: 替换元素

使用replace()函数，对values进行替换操作

**Series替换操作**

- 单值替换
  - 普通替换
  - 字典替换
- 多值替换
  - 列表替换
  - 字典替换(推荐)

```python
s = Series(data=[np.nan,'小七',19,10])
>>>	0       NaN
    1    	小七
    2        19
    3        10
    dtype: object
s.replace(to_replace={'小七':'张学友',19:21})
>>>	0    NaN
    1    张学友
    2     21
    3     10
    dtype: object
```

> **Series参数说明：**
>
> - method：对指定的值使用相邻的值填充
> - limit：设定填充次数
> - to_replace: 旧值

**DataFrame替换操作**

- 单值替换
  - 普通替换
  - 按列指定单值替换{列标签：替换值}
- 多值替换
  - 列表替换
  - 单字典替换（推荐）

```python
# replace函数中不能接收None对象
df.replace(to_replace=np.nan,value=19)
# 接收键值对
df.replace(to_replace={'boy':np.nan},value=True)
# 多值替换
df.replace(to_replace=['tom','tomGG'],value=['TOM','TOMGG'])
# 推荐使用一个能满足所有表格替换目的的字典来进行替换,便于后期维护
df.replace(to_replace={'dancer':'DANCER','lucy':'王淑芬',True:'是','nosuch':'hahaha'})
```

**注意：DataFrame中，无法使用method和limit参数**

#####2) map()函数：新建一列

> - map()可以映射新一列数据
> - map()中可以使用`lambd`表达式
> - map()中可以使用方法，可以是自定义的方法
>
> **注意**
>
> - map()中不能使用sum之类的函数，for循环
> - map(字典) 字典的键要足以匹配`所有`的数据，否则出现NaN

```python
dic = {
    'name':['dancer','lucy','mery','tom'],
    'age':[19,20,18,25],
    'score':[90.8,109,87.2,99],
    'boy':[True,False,False,None],
    'oldname':['dancer','lucy','王二狗','tomGG']
}
df = DataFrame(data=dic)
```

<img src="http://qiniu.s001.xin/pandas/repdf.png" width="350">

```python
dic = {
    'dancer':'张学友',
    'lucy':'张曼玉',
    'mery':'刘诗诗',
    'tom':'郑凯'
}
# 普通的值之间的映射,可以直接使用字典
df['oldname'] = df['name'].map(dic)
```

<img src="http://qiniu.s001.xin/pandas/repdf1.png" width="350">

```python
# 自定义方法使用map
def trans_func(x):
    if x>=20:
        return '成年'
    else:
        return '未成年'
# 自定义函数可以用来处理一些复杂的逻辑
df['年纪'] = df.age.map(trans_func)
```

#####3) transform()

transform与map类似

```python
年龄列加1
df.age = df.age.transform(lambda x:x-1)
```

##### 4) rename()函数:替换索引

> 使用rename()函数替换行索引
>
> - mapper 替换所有索引
> - index 替换行索引
> - columns 替换列索引
> - level 指定多维索引的维度

```python
# 替换列索引
df2.rename(columns={'oldname':'曾用名2'})
# 替换行索引
df2.rename(index={'上学期':'first','下学期':'last'})
# mapper默认替换行索引,level指定替换的索引层级,如果不指定就全部层级都进行替换
df2.rename(mapper={'上学期':'第一学期','dan':'DAN'},level=1)
# 同时替换行和列索引
df2.rename(index={'上学期':'first'},columns={'曾用名':'曾用名1'})
```

#### 3. 使用聚合操作对数据异常值检测和过滤

- 使用`describe()`函数查看每一列的描述性统计量
- 使用`std()`函数可以求得DataFrame对象每一列的标准差

```python
data = np.random.randint(0,100,size=(6,6))
df = DataFrame(data=data)
df
```

<img src="http://qiniu.s001.xin/pandas/des.png" width="250">

使用`df.describe()`之后

<img src="http://qiniu.s001.xin/pandas/des1.png" width="450">

#### 4. 排序

> **使用take()函数排序**
>
> - take()函数接受一个`索引`列表，用数字表示
> - eg:df.take([1,3,4,2,5])
> - 可以借助`np.random.permutation()`函数随机排序

```python
df = DataFrame(data=np.random.randint(0,10,size=(5,5)),
              index = list('ABCDE'),
              columns = list('甲乙丙丁戊'))
df
```

<img src="http://qiniu.s001.xin/pandas/sort.png" width="250">

```python
df.take([2,4,3,1],axis=1)
```

<img src="http://qiniu.s001.xin/pandas/sort1.png" width="250">

**小技巧：当DataFrame规模足够大时，直接使用`np.random.randint()`函数，就配合take()函数实现随机抽样**

####5. 数据分类处理（重点）

> 数据聚合是数据处理的最后一步，通常是要使每一个数组生成一个单一的数值。
>
> 数据分类处理：
>
> - 分组：先把数据分为几组
> - 用函数处理：为不同组的数据应用不同的函数以转换数据
> - 合并：把不同组得到的结果合并起来
>
> 数据分类处理的核心：
>
>  - `groupby()`函数
>  - `groups`属性查看分组情况

```python
df = DataFrame({'item':['苹果','香蕉','橘子','香蕉','橘子','苹果'],
                'price':[4,3,3,2.5,4,2],
               'color':['red','yellow','yellow','green','green','green'],
               'weight':[12,20,50,30,20,44]})

df
```

<img src="http://qiniu.s001.xin/pandas/group.png" width="250">

```python
# 以颜色分类
df.groupby('color').groups
>>> {'green': Int64Index([3, 4, 5], dtype='int64'),
     'red': Int64Index([0], dtype='int64'),
     'yellow': Int64Index([1, 2], dtype='int64')}

# 查看各种颜色水果重量的总和
df.groupby('color')['weight'].sum()
>>>	color
    green     94
    red       12
    yellow    70
    Name: weight, dtype: int64
```

- 根据item分组 查看结果

```python
# 按item分类取price的平均值
price_mean = DataFrame(df.groupby('item')['price'].mean())
# 平均价格Series
price_mean.rename(columns={'price':'mean_prcie'},inplace=True)
# 合并对象 
pd.merge(df,price_mean,left_on='item',right_index=True,how='outer')
```

<img src="http://qiniu.s001.xin/pandas/group1.png" width="300">

```python
# 多个分组条件,得到的是一个多级索引的分组表
df.groupby(['color','item']).sum()
```

<img src="http://qiniu.s001.xin/pandas/group2.png" width="250">

**总结**

- 数据类型是离散的可以分组，连续的没有意义
- 使用列表进行多列分组，得到的结果是多层级索引

#### 6. 高级数据聚合

> 使用groupby分组后，也可以使用transform和apply提供自定义函数实现更多的运算
>
> ```python
> df.groupby('item')['price'].sum() <==> df.groupby('item')['price'].apply(sum)
> ```
>
> - transform和apply都会进行运算，在transform或者apply中传入函数即可
> - transform和apply也可以传入一个lambda表达式

我们来写个例子感受下transform和apply,数据还用到上面的水果

```python
def test_func(items):
    result = 0
    for item in items:
        result += item
    return result

# 结果可以直接跟原始表合并操作
df.groupby('color')['weight'].apply(test_func)
>>>color
    green     94
    red       12
    yellow    70
    Name: weight, dtype: int64
            
# 结果可以直接跟原始表级联操作
df.groupby('color')['weight'].transform(test_func)
>>>	0    12
    1    70
    2    70
    3    94
    4    94
    5    94
    Name: weight, dtype: int64
```



**注意**

- transform 会自动匹配列索引返回值，不去重
- apply 会根据分组情况返回值，去重

### 数据加载

> 将表格数据读取为DataFrame对象
>
> - read_csv
> - read_table

```python
# sep 确认文件内容的间隔符号
# 如果文件没有列标签，应该设置header为None
table = pd.read_csv('./data/type-.txt',sep='-',header=None)
```

**使用read_excel()读取excel表格**

```python
table1 = pd.read_csv('./data/type_comma')
```

**写入excel文件**

```python
table1.to_excel('dancer.xls')
```

**读取sqlite文件**

> 导包 import sqlite3 as sqlite3
>
> - 连接数据库
>   sqlite3.connect('dbpath')
> - 读取table内容
>   pd.read_sql("SQL语句", con)
> - 写入数据库文件 df对象.to_sql('tablename',connection)
> - 操作数据库 connection.execute(SQL语句)

```python
# SQL Server阉割版 轻量级的关系型数据库 支持SQL语句 应用在移动端
# 文件轻量级
import sqlite3 as sqlite3
connection = sqlite3.connect('./data/weather_2012.sqlite')
# 读取数据库内容
# select * from weatehr_2012
weather = pd.read_sql('select * from weather_2012',connection,index_col='index')
# 写入数据库
table1.to_sql('dancer',connection)
# 读取dancer，查看是否写入成功
pd.read_sql('select * from dancer',connection)
# 删除一个表
# drop table name
connection.execute('drop table dancer')
# 设置行索引
weather.set_index('index')
```

### 交叉表和透视表

> 大家之前已经对分组表有了了解，用`groupby`分组
>
> 而透视表也是用来分组，它可以指定分组的类型，行、列、行列

```python
...三剑客导入

df = DataFrame({'item':['苹果','香蕉','橘子','香蕉','橘子','苹果'],
                'price':[4,3,3,2.5,4,2],
               'color':['red','yellow','yellow','green','green','green'],
               'weight':[12,20,50,30,20,44]})
```

<img src="http://qiniu.s001.xin/pandas/group.png" width="250">

**透视表**

> 各种电子表格程序和其他数据分析软件中一种常见的数据汇总工具。它根据一个或多个键对数据进行聚合，并根据行和列上的分组键将数据分配到各个矩形区域中

```python
# 行分组透视表
df.pivot_table(index='color',aggfunc='sum')['weight']
# 列分组透视表
df.pivot_table(columns='color',aggfunc='sum').loc['weight']
# 行列分组
# 行列分组的透视表 同时设定index、columns参数
def myfunction(x):
    mysum = 0
    for item in x:
        mysum += item
    return mysum

```

aggfunc：设置应用在每个区域的聚合函数，默认值为np.mean

fill_value：替换结果中的缺失值 

**交叉表**

> 是一种用于计算分组频率的特殊透视图,对数据进行汇总 
>
> `pd.crosstab(index,colums)`
>
> - index:分组数据，交叉表的行索引
> - columns:交叉表的列索引

```python
pd.crosstab(df.color,df.item)
>>> item	橘子	苹果	香蕉
    color			
	green	1	1	1
	red		0	1	0
	yellow	1	0	1
```



# 附件

----

**pandas常用函数速查表**

## 导入数据

- pd.read_csv(filename)：从CSV文件导入数据
- pd.read_table(filename)：从限定分隔符的文本文件导入数据
- pd.read_excel(filename)：从Excel文件导入数据
- pd.read_sql(query, connection_object)：从SQL表/库导入数据
- pd.read_json(json_string)：从JSON格式的字符串导入数据
- pd.read_html(url)：解析URL、字符串或者HTML文件，抽取其中的tables表格
- pd.read_clipboard()：从你的粘贴板获取内容，并传给read_table()
- pd.DataFrame(dict)：从字典对象导入数据，Key是列名，Value是数据

 

## 导出数据

- df.to_csv(filename)：导出数据到CSV文件
- df.to_excel(filename)：导出数据到Excel文件
- df.to_sql(table_name, connection_object)：导出数据到SQL表
- df.to_json(filename)：以Json格式导出数据到文本文件



## 创建测试对象

- pd.DataFrame(np.random.rand(20,5))：创建20行5列的随机数组成的DataFrame对象
- pd.Series(my_list)：从可迭代对象my_list创建一个Series对象
- df.index = pd.date_range('1900/1/30', periods=df.shape[0])：增加一个日期索引



## 查看、检查数据

- df.head(n)：查看DataFrame对象的前n行
- df.tail(n)：查看DataFrame对象的最后n行
- df.shape()：查看行数和列数
- df.info()：查看索引、数据类型和内存信息
- df.describe()：查看数值型列的汇总统计
- s.value_counts(dropna=False)：查看Series对象的唯一值和计数
- df.apply(pd.Series.value_counts)：查看DataFrame对象中每一列的唯一值和计数

 

## 数据选取

- df[col]：根据列名，并以Series的形式返回列
- df[[col1, col2]]：以DataFrame形式返回多列
- s.iloc[0]：按位置选取数据
- s.loc['index_one']：按索引选取数据
- df.iloc[0,:]：返回第一行
- df.iloc[0,0]：返回第一列的第一个元素

## 数据清理

- df.columns = ['a','b','c']：重命名列名
- pd.isnull()：检查DataFrame对象中的空值，并返回一个Boolean数组
- pd.notnull()：检查DataFrame对象中的非空值，并返回一个Boolean数组
- df.dropna()：删除所有包含空值的行
- df.dropna(axis=1)：删除所有包含空值的列
- df.dropna(axis=1,thresh=n)：删除所有小于n个非空值的行
- df.fillna(x)：用x替换DataFrame对象中所有的空值
- s.astype(float)：将Series中的数据类型更改为float类型
- s.replace(1,'one')：用‘one’代替所有等于1的值
- s.replace([1,3],['one','three'])：用'one'代替1，用'three'代替3
- df.rename(columns=lambda x: x + 1)：批量更改列名
- df.rename(columns={'old_name': 'new_ name'})：选择性更改列名
- df.set_index('column_one')：更改索引列
- df.rename(index=lambda x: x + 1)：批量重命名索引



## 数据处理：Filter、Sort和GroupBy

- df[df[col] > 0.5]：选择col列的值大于0.5的行
- df.sort_values(col1)：按照列col1排序数据，默认升序排列
- df.sort_values(col2, ascending=False)：按照列col1降序排列数据
- df.sort_values([col1,col2], ascending=[True,False])：先按列col1升序排列，后按col2降序排列数据
- df.groupby(col)：返回一个按列col进行分组的Groupby对象
- df.groupby([col1,col2])：返回一个按多列进行分组的Groupby对象
- df.groupby(col1)[col2]：返回按列col1进行分组后，列col2的均值
- df.pivot_table(index=col1, values=[col2,col3], aggfunc=max)：创建一个按列col1进行分组，并计算col2和col3的最大值的数据透视表
- df.groupby(col1).agg(np.mean)：返回按列col1分组的所有列的均值
- data.apply(np.mean)：对DataFrame中的每一列应用函数np.mean
- data.apply(np.max,axis=1)：对DataFrame中的每一行应用函数np.max 

## 数据合并

- df1.append(df2)：将df2中的行添加到df1的尾部
- df.concat([df1, df2],axis=1)：将df2中的列添加到df1的尾部
- df1.join(df2,on=col1,how='inner')：对df1的列和df2的列执行SQL形式的join

 

## 数据统计

- df.describe()：查看数据值列的汇总统计
- df.mean()：返回所有列的均值
- df.corr()：返回列与列之间的相关系数
- df.count()：返回每一列中的非空值的个数
- df.max()：返回每一列的最大值
- df.min()：返回每一列的最小值
- df.median()：返回每一列的中位数
- df.std()：返回每一列的标准差



