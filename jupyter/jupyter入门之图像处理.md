## scipy图片处理

导入库

```python
import numpy as np
import pandas as pd
from pandas import Series,DataFrame
# 图像处理库
import matplotlib.pyplot as plt
%matplotlib inline
# scipy.fftpack模块用来计算快速傅里叶变换
# 速度比传统傅里叶变换更快，是对之前算法的改进
# 图片是二维数据，注意使用fftpack的二维转变方法
from scipy.fftpack import fft2,ifft2
# 积分库
from scipy.integrate import quad
```

### 图片消噪

示例，登月图片消噪

```python
moon = plt.imread('moonlanding.png')

# 灰度化处理的图片
plt.imshow(moon,cmap='gray')

# 时域-频域
fft_data = fft2(moon)

# 滤波，把高频波滤掉
# > 后边的值需要自己调节
condition = np.abs(fft_data) > 2e3
fft_data[np.where(condition)] = 0

# 频域--时域
ifft_data = ifft2(fft_data)

plt.imshow(np.real(ifft_data),cmap='gray')

# jpg图像  0-255之间的整数
# png图像  0-1之间的小数
```

### 灰度处理

```python
# 读取图片
pujing = plt.imread('pujing.jpg')
# 查看维度
pujing.shape
>>> (354, 500, 3)
# 去除色彩
pujing.mean(axis=2).shape
>>> (354, 500)
# 灰度处理
plt.imshow(pujing.mean(axis=2),cmap='gray')
```

### 数值积分，求解圆周率

integrate 对函数(1 - x^2)^0.5进行积分

```python
f = lambda x:(1-x**2)**0.5
# 绘制区间
x = np.linspace(-1,1,100)
y = f(x)
plt.figure(figsize=(4,4))
plt.plot(x,y)
plt.plot(x,-y)
```

<img src="http://qiniu.s001.xin/pandas/zero.png" width="400">

使用scipy.integrate进行积分，调用quad()方法

```python
# 返回值第一个是面积，第二个是误差
area,err = quad(f,-1,1)
# area*2是整圆的面积
p = area*2/1**2
print(p)
>>> 3.1415926535897967
```

### scipy文件输入/输出

> 随机生成数组，使用scipy中的io.savemat()保存 文件格式是.mat，标准的二进制文件

```python
n = np.random.randint(0,100,size=10)
>>> array([28, 90, 21, 45, 75, 42, 76, 58,  1, 49])
# 导入io库
import scipy.io as io
# 存储二进制  文件路径默认是.mat，可以省略
# mdict用于传递要写入本地的数据，字典的键自由定制
io.savemat('dancer',mdict={'data':n})
# 使用io.loadmat()读取数据
io.loadmat('dancer.mat')['data']
>>> array([[28, 90, 21, 45, 75, 42, 76, 58,  1, 49]])
# 读写图片使用scipy中misc.imread()/imsave()
# 旧版读取
import scipy.misc as misc
misc.imread('pujing.jpg')
# 读取
import imageio as imgio
pujing = imgio.imread('pujing.jpg')
# 存储
pjgray = np.uint8(pujing.mean(axis=2))
imgio.imsave('gray_pujing.jpg',pjgray)
```

misc的rotate、resize、imfilter操作

```python
# 旋转90度
plt.imshow(misc.imrotate(pujing,angle = 90))
import skimage.transform as transform
import imageio as misc
pujing = misc.imread('pujing.jpg')
transform.rotate(pujing,angle=90)
# output_shape 指定元组，会对图片进行变形压缩
# mode参数的默认值conctant需要修改，因为即将被remove
# 该拜年大小
plt.imshow(transform.resize(pujing,output_shape=(100,100),mode='symmetric'))
# 'blur', 'contour', 'detail', 'edge_enhance', 'edge_enhance_more',
# 'emboss', 'find_edges', 'smooth', 'smooth_more', 'sharpen'
# 类似于滤镜
plt.imshow(misc.imfilter(pujing,'emboss'))
```

### scipy.ndimage图片处理

```python
import scipy.ndimage as ndimage
# misc库自带的一张图片，可以快速读取一张小浣熊
img = misc.face(gray=True)
```

使用`scipy.misc.face(gray=True)`获取图片，使用ndimage移动坐标、旋转图片、切割图片、缩放图片

shift移动坐标

```python
# constant', 'nearest', 'reflect', 'mirror' ,'wrap'
plt.imshow(ndimage.shift(img,shift=[100,200],mode='wrap'),cmap='gray')
```

> - rotate旋转图片
>
> - zoom缩放图片
>
> - 使用切片切割图片
>
> - 图片进行过滤
>
> - 添加噪声，对噪声图片使用ndimage中的高斯滤波、中值滤波、signal中维纳滤波进行处理
>
>   使图片变清楚
>
> - 加载图片，使用灰色图片misc.face()添加噪声
>
> - gaussian高斯滤波参数sigma：高斯核的标准偏差
>
> - median中值滤波参数size：给出在每个元素上从输入数组中取出的形状位置，定义过滤器功能的输入
>
> - signal维纳滤波参数mysize：滤镜尺寸的标量



## pandas中的绘图函数

### 线形图

导入库

```python
# 三剑客
import numpy as np
import pandas as pd
from pandas import Series,DataFrame
# 图像处理函数
import matplotlib.pyplot as plt
%matplotlib inline
```

示例

```python
# 连续100天内，某一支股票价格的变化，可以采用线型图来表示
s1 = Series(data=np.random.randint(0,10,size=100))
s1.plot()
```

<img src="http://qiniu.s001.xin/pandas/xianxing.png" width="400">

```python
# 绘制多条股票变化趋势
# 在同一个cell中，绘制多个对象的图
s2 = Series(data=np.random.randint(0,100,size=100))
s2.cumsum().plot()
s1.cumsum().plot()
```

<img src="http://qiniu.s001.xin/pandas/xian2.png" width="400">

- 图例的位置可能会随着数据的不同而不同

### 柱状图

Series柱状图示例,`kind = 'bar'/'barh'`

```python
s1 = Series(data=[100,80,99,80,78,76,22,90,100],index=list('123456789'))
s1.plot(kind='bar')
```

<img src="http://qiniu.s001.xin/pandas/zhu1.png" width="400">

DataFrame柱状图示例,

```python
df1 = DataFrame(data=np.random.randint(50,100,size=(9,3)),
                columns=list('ABC'),
                index=list('123456789'))
df1.plot(kind='bar')
```

<img src="http://qiniu.s001.xin/pandas/zhu4.png" width="400">

```python
# 改变方向
df1.plot(kind="barh")
```

<img src="http://qiniu.s001.xin/pandas/zhu2.png" width="400">

### 直方图

series示例,`kind='hist'`

```python
s1 = Series(data=np.array([1,1,4,1,3,5,8,8,5,5]))
s1.plot(kind='hist',bins=10)
# 不同的bins，会导致直方图显示的不一样
```

<img src="http://qiniu.s001.xin/pandas/zhi1.png" width="400">

> rondom生成随机数百分比直方图，调用hist方法
>
> - 柱高表示数据的频数，柱宽表示各组数据的组距
> - 参数bins可以设置直方图方柱的个数上限，越大柱宽越小，数据分组越细致
> - 设置normed参数为True，可以把频数转换为概率
>
> kde图：核密度估计，用于弥补直方图由于参数bins设置的不合理导致的精度缺失问题

```python
s1.plot(kind='hist',bins=3,normed=True)
s1.plot(kind='kde')
```

<img src="http://qiniu.s001.xin/pandas/zhi2.png" width="400">

示例: 绘制一个由两个不同的标准正态分布组成的双峰分布

```python
n1 = np.random.normal(loc=50,scale=1,size=100)
n2 = np.random.normal(loc=70,scale=3,size=50)

s = Series(data=np.concatenate((n1,n2)))
s.plot(kind='hist',normed=True,bins=30)
s.plot(kind='kde')
```

<img src="http://qiniu.s001.xin/pandas/zhi3.png" width="400">

### 散点图

散布图 散布图是观察两个一维数据数列之间的关系的有效方法,DataFrame对象可用

使用方法： 设置kind = 'scatter'，给明标签columns

散布图矩阵，当有多个点时，两两点的关系

使用函数：pd.plotting.scatter_matrix(),

- 参数diagnol：设置对角线的图像类型

```python
x = Series(data=[1,3,5,7,9])
y = Series(data=[2,4,6,8,10])

df = DataFrame(data = np.random.randint(0,10,size=(5,2)),columns=['A','B'])
df.A = x
df.B = y
df.plot(kind='scatter',x='A',y='B')
```

<img src="http://qiniu.s001.xin/pandas/san1.png" width="400">

```python
df2 = DataFrame(data=np.random.randn(10000,4),columns=list('ABCD'))
# DataFrme多列对应关系
# diagonal='kde' 设置对角线的图形显示模式
r = pd.plotting.scatter_matrix(df2,diagonal='kde')
```

<img src="http://qiniu.s001.xin/pandas/san2.png" width="400">