## jupyter入门之pandas

### 一. 什么是pandas

- pandas是基于NumPy的一种工具 该工具是为了解决数据分析任务而创建的
- pandas纳入了大量库及一些标准的数据模型，提供了高效的操作大型数据集所需要的工具
- pandas提供了大量能使我们快速便捷地处理数据的函数与方法
- 它是python成为强大而高效的数据分析环境的重要因素之一

#### 导入

```python
# 三剑客
import numpy
import pandas
from pandas import Series,DataFrame
```

### 二. Series

> `Series`是一种类似于一维数组的对象，由下面两个部分组成
>
> - values: 一组数据 (ndarrary类型)
> - index: 相关的数据索引标签

#### 1.创建

- 由列表或numpy数组创建

  ```python
  s1 = Series([1,2,3,4])
  >>> 0    1
      1    2
      2    3
      3    4
      dtype: int64
  s1 = np.array([1,2,3,4])
  >>> array([1, 2, 3, 4])
  ```

  特别地，由ndarray创建的是引用，而不是副本。对Series元素的改变也会改变原来的ndarray对象中的元素。（列表没有这种情况）

- 由字典创建

  ```python
  dic = {
      'name':'dancer',
      'age':19,
      'address':'hangzhou'
  }
  s3 = Series(data=dic)
  ```

####2. 索引和切片

**loc为显示切片（通过键），iloc为隐式切片（通过索引）**

```python
# 访问单个元素
s[indexname]
s.loc[indexname] 推荐
s[loc]
s.iloc[loc] 推荐

# 访问多个元素
s[[indexname1,indexname2]]
s.loc[[indexname1,indexname2]] 推荐
s[[loc1,loc2]]
s.iloc[[loc1,loc2]] 推荐
```

#### 3. 基本概念

可以把Series看成一个定长的有序字典

可以通过`shape`（维度），`size`（长度），`index`（键）,`values`（值）等得到series的属性

#### 4.基本运算

> - 运算的原则就是索引对齐，如果缺失索引，对应位置补np.nan
> - NaN 是np.nan在pandas中的显示形式
> - 可以使用pd.isnull()，pd.notnull()，或自带isnull(),notnull()函数检测缺失数据
> - 可以使用isnull和any结合,来查看某一列或一行数据中是否存在缺失值

```python
# 需求：提取s3对象中的所有非空数据
s3[s3.notnull()]
# 提取空值的索引
s3[s3.isnull()].index
# Sereis,对象可以使用一个与该对象等长的bool_list列表作为index访问数组元素
# 碰到True,就把对应位置的值返回
s3[[True,False,True,True,True,False]]
# name属性为Series对象添加列索引
s3.name = 'haha'
```

**pandas会自动处理空值**

```python
add()
sub()
mul()
div()
```

> Series之间的运算
>
> - 在运算中自动对齐不同索引的数据
> - 如果索引不对应，则补NaN

```python
# fill_value设置空值的填充值
s1.add(s2,fill_value=0)
```



### 三. DataFrame

> `DataFrame`是一个【表格型】的数据结构，可以看做是【由Series组成的字典】（共用同一个索引）。DataFrame由按一定顺序排列的多列数据组成。设计初衷是将Series的使用场景从一维拓展到多维。DataFrame既有行索引，也有列索引。
>
> - 行索引：index
> - 列索引：columns
> - 值：values（numpy的二维数组）

#### 1. 创建

最常用的方法是传递一个字典来创建。DataFrame以字典的键作为每一【列】的名称，以字典的值（一个数组）作为每一列。

```python
dic = {
    '张三':[150,150,150,300],
    '李四':[0,0,0,0]
}
DataFrame(data=dic,index=['语文','数学','英语','理综'])
```

也可以用下面代码实现创建

```python
data = [[0,150],[0,150],[0,150],[0,300]]
index = ['语文','数学','英语','理综']
columns = ['李四','张三']
df = DataFrame(data=data,index=index,columns=columns)
>>> 
        李四	张三
        语文	0	150
        数学	0	150
        英语	0	150
        理综	0	300
```



此外，DataFrame会自动加上每一行的索引（和Series一样）。

同Series一样，若传入的列与字典的键不匹配，则相应的值为NaN。

#### 2. 索引

(1) 对列进行索引

```
- 通过类似字典的方式
- 通过属性的方式
```

可以将DataFrame的列获取为一个Series。返回的Series拥有原DataFrame相同的索引，且name属性也已经设置好了，就是相应的列名。

(2) 对行进行索引

```
- 使用.ix[]来进行行索引
- 使用.loc[]加index来进行行索引
- 使用.iloc[]加整数来进行行索引
```

同样返回一个Series，index为原来的columns。

(3) 对元素索引的方法

```
- 使用列索引
- 使用行索引(iloc[3,1]相当于两个参数;iloc[[3,3]] 里面的[3,3]看做一个参数)
- 使用values属性（二维numpy数组）
```

```python
# 索引行
df.loc[indexname] 推荐
df.iloc[loc]
# 索引列
df[columnname] 推荐
df.columnname
# 索引元素
df.loc[indexname].loc[columnname]
df[columnname].loc[indexname]
df.loc[indexname,columnname] 推荐
```

#### 3. 切片

> 【注意】 直接用中括号时：
>
> - 索引表示的是列索引
> - 切片表示的是行切片

```python
# 行切片
df[indexname1:indexname2] 
df.loc[indexname1:indexname2] 推荐
# 列切片
df.loc[:,columnname1:columnname2] 推荐
# 行列切片
df.loc[indexname1:indexname2,columnname1:columnname2] 推荐

df.iloc[indexloc1:indexloc2,columnloc1:columnloc2]
```



#### 4. 运算

下面是Python 操作符与pandas操作函数的对应表：

> | Python Operator | Pandas Method(s)                 |
> | --------------- | -------------------------------- |
> | `+`             | `add()`                          |
> | `-`             | `sub()`, `subtract()`            |
> | `*`             | `mul()`, `multiply()`            |
> | `/`             | `truediv()`, `div()`, `divide()` |
> | `//`            | `floordiv()`                     |
> | `%`             | `mod()`                          |
> | `**`            | `pow()`                          |

```Python
# df1与df2相加 空值以0填充
df1.add(df2,fill_value=0)
# DataFrame跟Series对象相加，fill_value不可用
df1.add(DataFrame(s1),fill_value=0)

# 求平均成绩
score1 = DataFrame(data=np.random.randint(0,100,size=(5,3)),
                   index=['dancer','lucy','tom','jack','rose'],
                  columns=['python','java','C++'])
score2 = DataFrame(data=np.random.randint(0,100,size=(5,3)),
                   index=['dancer','lucy','tom','jack','rose'],
                  columns=['python','java','C++'])

(score1 + score2)/2.
```



> 1） DataFrame之间的运算
>
> 同Series一样：
>
> - 在运算中自动对齐相同索引的数据
> - 如果索引不对应，则补NaN
>
> 2） Series与DataFrame之间的运算
>
> 【重要】
>
> - 使用Python操作符：以行为单位操作（参数必须是行），对所有行都有效。（类似于numpy中二维数组与一维数组的运算，但可能出现NaN）
>
> - 使用pandas操作函数：
>
>     axis=0：以列为单位操作（参数必须是列），对所有列都有效。
>     axis=1：以行为单位操作（参数必须是行），对所有行都有效。
>
> - axis=0（0 == index 行）：以列为单位操作（参数必须是列），对所有列都有效。 axis=1（1 == columns 列）：以行为单位操作（参数必须是行），对所有行都有效。
>
> - fill_value在df和series之间运算时，不能使用

### 四. 处理丢失数据

> 丢失数据有两种,
>
> - None
> - np.nan(NaN)

#### 1. None

None是Python自带的，其类型为python object。因此，None不能参与到任何计算中。

```python
type(None)
>>> NoneType
```

object类型，不能直接参与运算

而且object类型的运算比int类型的运算慢很多

#### 2.np.nan(NaN)

```python
type(np.nan)
>>> float
```

np.nan是浮点类型 可以参与计算，但计算结果为NaN

可以使用np.nan*()函数类计算nan，此时视nan为0

> ### pandas中None与np.nan的操作
>
> - `isnull()`
> - `notnull()`
> - `dropna()`: 过滤丢失数据
> - `fillna()`: 填充丢失数据
>
> (1)判断函数
>
> - `isnull()`
> - `notnull()`

过滤函数 `dropna`

```python
# 默认过滤有空值的行
df1.dropna(axis=0)
# 过滤有空值的列
df1.dropna(axis=1)
# how参数指定过滤规则
# any  行或列中存在空值就过滤
# all  行或列中全部为空就过滤
df1.dropna(axis=0,how='all')
```

填充函数 `fillna`

```python
df1.fillna(value=None,method=None,axis=0,limit=1)
# value  填充的值
# method 填充方式
  - ffill 向前
  - bfill 向后
  - pading
  - backfill
# axis   填充的轴
# limit  填充次数
```

### 五. pandas层次化索引

> 我们已经知道了Series和DataFrame
>
> DataFrame是Series对象的扩展 那么为什么还要学层次化索引呢？
>
> 生活中的表格形式不是一成不变的
>
> <img src="http://qiniu.s001.xin/numpy/cengji.png" width="400">
>
> 图中这种表如果使用DataFrame创建的话会相当麻烦

#### 1.创建多层行索引

```python
# 使用DataFrame创建
index1 = [['first','second'],['大米','白面','猪肉']]

index2 = [['first','大米'],['first','白面'],['first','猪肉'],['second','大米'],['second','白面'],['second','猪肉']]

index3 = [['first','first','first','second','second','second'],['大米','白面','猪肉','大米','白面','猪肉']]

data = np.random.randint(0,200,size=(6,4))
columns = ['dancer','lucy','tom','jerry']
df = DataFrame(data=data,index=index3,columns=columns)
```

显然 重复写索引是很麻烦的事

这里我们可以使用pandas的显示构造 `pandas.MultiIndex`

它提供了三种方法 

`pandas.MultiIndex.from_array`

```python
mindex3 = pd.MultiIndex.from_arrays(index3,names=('季度','品类'))
df = DataFrame(data=data,columns=columns,index=mindex3)
```

`pandas.MultiIndex.from_tuple`

```python
mindex2 = pd.MultiIndex.from_tuples(index2,names=('季度','品类'))
df2 = DataFrame(data=data,index=mindex2,columns=columns)
```

`pandas.MultiIndex.from_product`

```python
# 推荐
mindex3 = pd.MultiIndex.from_product(index1,names=('季度','品类'))
df3 = DataFrame(data=data,index=mindex3,columns=columns)
```

#### 2. 多层列索引

```python
columns = pd.MultiIndex.from_product([['first','seoncd'],['大米','白面','猪肉']])
data = np.random.randint(0,100,size=(4,6))
index = df3.columns
df4 = DataFrame(data=data,index=index,columns=columns)
df4
>>> 季度		first		second
品类	大米	白面	猪肉	大米	白面	猪肉
dancer	50	94	71	46	72	22
lucy	94	61	96	15	76	12
tom		72	97	63	18	8	22
jerry	98	5	73	84	84	31
```

#### 3. 多层索引对象的索引与切片操作

【重要】对于Series来说，直接中括号[]与使用.loc()完全一样，推荐使用.loc中括号索引和切片。

```python
index = pd.MultiIndex.from_product([['期中','期末'],['语文','数学','英语']])
data = np.random.randint(0,150,size=6)
s1 = Series(data=data,index=index)
s1
>>> 期中  语文    112
          数学    145
          英语     59
    期末  语文    128
          数学     91
          英语    129
    dtype: int32
```

1) 索引

```python
# 把多级索引变成单级索引访问
s1.loc['期中'].loc['语文']
s1['期中'].iloc[0]
s1.loc['期中','语文']
>>> 结果都为 112
```

2）切片

- 可以直接使用`iloc`对value切片 但可读性不高

- 多级索引切片 可使用显示索引 

  ```python
  # 期中考试的语文数学成绩
  s1.loc['期中'].loc['语文':'数学']
  # 编程单级索引进行列切片 （不能跨区）
  df['期中'].loc[:,'语文':'数学']
  ```

- 不能跨区切片 比如获取期中到期末的语文成绩

<img src="http://qiniu.s001.xin/numpy/qiepian.png" width="400">

那如果我们需要进行跨区切片该怎么办呢？

这里引入一个`stack`概念(索引的堆)

#### 4. 索引的堆(stack)

- `stack()`
- `unstack()`

> - level 多级索引从外向内 依次的编号是0.1.2...
> - 使用stack()时, level设置为几，就把哪一级索引消失
> - 使用unstack()的时候，level等于哪一个，哪一个就消失，出现在列里
> - 注意不要在变化的途中变成了Series对象

### 六. pandas的拼接操作

> pandas的拼接分为两种：
>
> - 级联：pd.concat, pd.append
> - 合并：pd.merge, pd.join

回顾 numpy的级联

```python
n1 = np.random.randint(0,10,size=(3,3))
n2 = np.random.randint(10,20,size=(3,2))
np.concatenate((n1,n2),axis=1)
>>>	array([[ 4,  0,  4, 14, 17],
       	[ 5,  9,  2, 10, 17],
       	[ 2,  3,  1, 15, 11]])
```

#### 1. 使用pd.concat()级联

```python
# 注：create_DF为封装的一个用于生成DataFrame对象的函数 
#第一个参数是index 第二个参数是column
df1 = create_DF(list('12345'),list('ABCDE'))
df2 = create_DF(list('12345'),list('BCDEF'))
# 两个DataFrame对象级联操作
pd.concat((df1,df2),axis=1)
```

Create_DF

```python
def create_DF(index,columns):
    return DataFrame({j:[j+i for i in index] for j in columns},index=index)
```

> - pandas中，级联允许形状不同，缺失的索引补充NaN
>
> - pandas使用pd.concat函数，与np.concatenate函数类似，只是多了一些参数：
>
>   objs
>   axis=0
>   join='outer'
>   join_axes=None
>   ignore_index=False
>
> - 索引没有特定含义的时候，可以使用如下方法处理索引重复的问题
>
>   ```python
>   pd.concat((df1,df2),ignore_index=True)
>   ```
>
> - 索引有特定含义，可以引入keys参数，对两张表做分区说明
>
>   ```python
>   pd.concat((df1,df2),keys=['上学期','下学期'])
>   ```
>
> - 应该更多的采用外连接来级联，保留更多的原始数据
>
>   - inner内连接，取交集
>
>   - outer外连接, 取并集
>
>   ```python
>   pd.concat((df1,df2),join='outer')
>   ```

**1) pandas与series级联**

```python
# 使用级联处理
s = Series(data=[100,99],index=['张三','李四'],name='计算机')
# pandas可以直接跟series对象进行级联
pd.concat((score,s),axis=1)
```

**2) 不匹配级联**

> 不匹配指的是级联的维度的索引不一致。例如纵向级联时列索引不一致，横向级联时行索引不一致
>
> 有3种连接方式：
>
> - 外连接：补NaN（默认模式）
>
> - 内连接：只连接匹配的项
>
> - 连接指定轴 join_axes

**3) append()函数**

> 由于在后面级联的使用非常普遍，因此有一个函数append专门用于在后面添加
>
> 注意:append函数只是沿着axis=0的方向进行级联

<img src="http://qiniu.s001.xin/numpy/append.png" height="450px">

#### 2.使用pd.merge()合并

> `merge`与`concat`的区别在于，merge需要依据某一共同列来进行合并
>
> 使用pd.merge()合并时，会自动根据两者相同column名称的那一列，作为key来进行合并。
>
> 注意每一列元素的顺序不要求一致
>
> - `merge`的合并也分一对一 多对一 多对多 就是合并相同columns

**1) 一对一合并**

<img src="http://qiniu.s001.xin/numpy/onetoone.png" height="350px">

*以手机型号为合并基准*

**2) 多对一合并**

<img src="http://qiniu.s001.xin/numpy/manytoone.png" height="350px">

*同样以手机型号为基准*

**3) 多对多合并**

<img src="http://qiniu.s001.xin/numpy/manytomany.png" width="400px">

*当有多个相同列时 可以以其中任何一个相同列为基准合并 也可以多个相同列为基准*

**4) key的规范化**

```python
1. 如果两个表中，只有一列内容是有重复的，就参考这一列进行合并
2. 默认的合并方式，只取交集
3. how 设置合并的参考列
4. 合并就是以列为参考的，不是以行

pd.merge(table1,table2,how='right')

5. 使用on=显式指定哪一列为key,当有多个key相同时使用
6. 两张表中不存在相同的列表签，可以使用left_on和right_on来显示制定合并参考列
7. 合并之后两列都会保留，可以使用drop函数删除没用的列

pd.merge(table2,table5,left_on='手机型号',right_on='型号').drop(labels=['型号'],axis=1)
# 替换原表
a.drop('',axis=1,inplace=True)
# 以表的行索引为合并参考
# 设置left_index或right_index为True
pd.merge(table2,table6,left_on='手机型号',right_index=True)
```

> - 数值型数据，尽量采用级联而不是合并
> - 字符串型数据，可以使用合并
> - 一旦数值出现重复值，就会导致业务逻辑变成1对多或者对对多的关系

**5) 内合并与外合并**

> - 内合并：只保留两者都有的key（默认模式）
>
> - 外合并 how='outer'：补NaN
>
> - 左合并、右合并：how='left'，how='right'，

**6）列冲突的解决**

> - 当列冲突时，即有多个列名称相同时，需要使用on=来指定哪一个列作为key，配合suffixes指定冲突列名
> - 可以使用suffixes=自己指定后缀

### 补充

```python
# 去重
series.unique()
# 删除
df.drop(inplace=True)  # 替换原表
```



