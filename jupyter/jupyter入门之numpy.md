# jupyter入门之numpy

### 安装

<a href='https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/'>jupyter下载地址</a>

下载安装成功之后打开

<img src="http://qiniu.s001.xin/numpy/jiemain.png">

### jupyter使用

点击base(root)后的小三角（open with Jupiter notebook）

默认打开8888端口

> cell
> 每一个cell都可以放一段独立的代码, 独立运行
> ctrl+enter
>
> 切换cell的编辑格式 在cell的选中状态下使用y/m
> y:code格式
> markdown模式
>
> 删除cell
> x 删除选中cell
> dd 删除选中cell
>
> shift+tab查看api
>
> tab自动补全

新建文件

 ### numpy语法

```python
import numpy as np
# 查看版本
np.__version__
# '1.14.3'
```

#### 1. np.array

```python
a1 = np.array([1,2,3,4,5])
>>> array([1,2,3,4,5])
a2 = np.array([1.0,2,3,4,5])
>>> array([1.,2.,3.,4.,5.])
```

#### 2. 使用np的routines函数创建数组

- np.ones(shape,)

```python
n1 = np.ones(shape=5)
>>> array([1., 1., 1., 1., 1.])
n2 = np.ones(shape=(3,3))
>>> array([[1., 1., 1.],
           [1., 1., 1.],
           [1., 1., 1.]])
n3 = np.ones(shape=(3,3,2))
>>> array([[[1., 1.],
            [1., 1.],
            [1., 1.]],

           [[1., 1.],
            [1., 1.],
            [1., 1.]],

           [[1., 1.],
            [1., 1.],
            [1., 1.]]])
```

- np.zeros 

```python
# 5行3列以0填充
n4 = np.zeros(shape=(5,3))
```

- np.full

```python
# 3行2列以6填充
n5 = np.full(shape=(3,2),fill_value=6)
```

- np.eye

```python
# 5行5列单位矩阵
np.eye(N=5)
```

- np.linspace

```python
# 0到10分为10等份 末尾不计
np.linspace(0,10,10,endpoint=False)
>>> array([0., 1., 2., 3., 4., 5., 6., 7., 8., 9.])
```

- n.arange

```python
# start,stop,step
np.arange(0,10,1)
>>> array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
```

#### 3 正态分布

```python
# 标准正太分布 方差为1，期望为0
np.random.randn(3,2)
# 普通正太分布 指定方差和期望值
np.random.normal(loc=1.75,scale=0.3,size=10)
```

### ndarray属性

> 4个必记参数： 
>
> ndim：维度
>
> shape：形状（各维度的长度） 
>
> size：总长度
>
> dtype：元素类型

```python
# 0-100随机 5行4列
n = np.random.randint(0,100,size=(5,4))

n.ndim
>>> 2
n.shape
>>> (5,4)
n.size
>>> 20
n.dtype
>>> dtype=('int32')
```

### ndarray基本操作

#### 1. 索引

```python
n1[0]
# numpy特有 方便取值
n1[0,0]
```

#### 2. 切片

```python
# start:stop:step
n1[0:3]
# 取反
n1[::-1]
# 索引2，3行，之后取索引2，3列
n2[2:4,2:4]
# 索引0,1列
n2[:,:2]
# 主要看第几维在变
n3[:,:,:2]
```

#### 3. 变形

```python
# 变为1维数组
n2.reshape(36)
n2.reshape(36,)
# 1行36列
n2.reshape(1,36)
# 36行1列
n2.reshape(36,1)
```

#### 4. 级联

> 1. np.concatenate() 级联需要注意的点：
> 2. 级联的参数是列表：一定要加中括号或小括号
> 3. 维度必须相同
> 4. 形状相符
> 5. 【重点】级联的方向默认是shape这个tuple的第一个值所代表的维度方向
> 6. 可通过axis参数改变级联的方向

```python
np.concatenate((n1,n2),axis=1)
```

> h:horizontal  横向 
> v:vertical    纵向
>
> np.hstack与np.vstack
> 水平级联与垂直级联,处理自己，进行维度的变更

#### 5.切分 

> 与级联类似，三个函数完成切分工作：
>
> - np.split
> - np.vsplit
> - np.hsplit

```python
# 1.如果indices_or_sections设置为整数，必须保证在切割的维度上是可以被这个整数整除的
# 2.如果是1-D array,[m,n] 意味着按照如下方式切割 [0:m] [m:n] [n:]
result = np.split(n,indices_or_sections=3,axis=1)
```

#### 6.副本

```python
# 浅拷贝 不会修改n1的值
cn = n1.copy()
```

###ndarray聚合操作

> 求和 np.sum
>
> 标准差 np.std()
>
> np.nan
>
> 最大最小值 np.max/np.min
>
> 其他运算
>
> ```
> Function Name    NaN-safe Version    Description
> np.sum    np.nansum    Compute sum of elements
> np.prod    np.nanprod    Compute product of elements
> np.mean    np.nanmean    Compute mean of elements
> np.std    np.nanstd    Compute standard deviation
> np.var    np.nanvar    Compute variance
> np.min    np.nanmin    Find minimum value
> np.max    np.nanmax    Find maximum value
> np.argmin    np.nanargmin    Find index of minimum value
> np.argmax    np.nanargmax    Find index of maximum value
> np.median    np.nanmedian    Compute median of elements
> np.percentile    np.nanpercentile    Compute rank-based statistics of elements
> np.any    N/A    Evaluate whether any elements are true
> np.all    N/A    Evaluate whether all elements are true
> np.power 幂运算
> ```

### ndarray的矩阵操作

#### 1. 加减乘除

#### 2. 矩阵积np.dot()

```python
n3 = np.array([[1,2],[3,4]])
np.dot(n3,n3)
>>> array([[ 7, 10],
       	[15, 22]])
```

#### 3. 广播机制(重点)

> 【重要】ndarray广播机制的两条规则
>
> - 规则一：为缺失的维度补1
> - 规则二：假定缺失元素用已有值填充

```python
# 计算一个数组中每个元素与平均值的差
n1 = np.random.randint(0,100,size=10)
n1-n1.mean()
# axis=1求每一行的平均值
n2.mean(axis=1).reshape((-1,1))
# 求每一行的每一个元素与该行的平均值的差
n2 - n2.mean(axis=1).reshape((-1,1))
```

> ### 1. 快速排序
>
> np.sort()与ndarray.sort()都可以，但有区别：
>
> - np.sort()不改变输入
> - ndarray.sort()本地处理，不占用空间，但改变输入
>
> ### 2. 部分排序
>
> np.partition(a,k)
>
> 有的时候我们不是对全部数据感兴趣，我们可能只对最小或最大的一部分感兴趣。
>
> - 当k为正时，我们想要得到最小的k个数
> - 当k为负时，我们想要得到最大的k个数

### 补充：

数据合并

```python
x
>>> array([1,2,3,1,2,3,1,2,3])
y
>>> array([10,20,30,10,20,30,10,20,30])
np.c_[x,y]
>>> array([
    [1,10],
    [2,10],
    [3,10],
    [1,20],
    ...
])
```

随机数固定

```python
np.random.seed(0)
```





