## jupyter入门之Matplotlib

### 一. Matplotlib基础知识

Matplotlib中的基本图表包括的元素

- x轴和y轴 axis 水平和垂直的轴线

- 轴标签 axisLabel 水平和垂直的轴标签

- x轴和y轴刻度 tick 刻度标示坐标轴的分隔，包括最小刻度和最大刻度

- x轴和y轴刻度标签 tick label 表示特定坐标轴的值

- 绘图区域（坐标系） axes 实际绘图的区域

- 画布 figure 呈现所有的坐标系

可以用下图来概括

<img src="http://qiniu.s001.xin/matplot/tushi1.png" width="500">

#### 1.子画布

依赖导入

```python
import numpy as np
import pandas as pd
from pandas import Series,DataFrame

import matplotlib.pyplot as plt
%matplotlib inline
```

**只含单一曲线的图**

1、可以使用多个plot函数（推荐），在一个图中绘制多个曲线

2、也可以在一个plot函数中传入多对X,Y值，在一个图中绘制多个曲线 

```python
x = np.arange(0,10,step=1)
s1 = Series(x,index=list('abcdefghij'))
s2 = Series(x**2,index=s1.index)

# 索引和值一起设置
plt.plot(x,x*2,x,x*3,x,x)
```

<img src="http://qiniu.s001.xin/matplot/tushi2.png" width="400">

**设置子画布**

`axes = plt.subplot()`

```python
# 221的含义是将画布分为两行两列，
# axes1在第一个位置
axes1 = plt.subplot(2,2,1)
axes1.plot(x,x**2)
# axes2在第四个位置
axes2 = plt.subplot(2,2,4)
axes2.plot(x,x**3)
```

<img src="http://qiniu.s001.xin/matplot/tushi3.png" width="400">

```python
# 子画布可以按照不同的比例进行拆分，可以在一个版面内共存，
# 但是，如果两个子画布有重叠部分，后绘制的画布会覆盖先绘制的画布
axes2 = plt.subplot(2,2,1)
axes2.plot(x,x**2)

axes1 = plt.subplot(3,3,1)
axes1.plot(x,x*2)
```

网格线

#### 2. 绘制正弦余弦

```python
x = np.linspace(0,2*np.pi,100)
y1 = np.sin(x)
y2 = np.cos(x)
# 自动选择最近的画布进行开启
plt.grid(True)
plt.plot(x,y1,x,y2)
```

<img src="http://qiniu.s001.xin/matplot/tushi5.png" width="400">

```python
axes1 = plt.subplot(221)
# True 开启网格线
# linewidth设置网格线的粗细
axes1.grid(True,linewidth=2)

axes2 = plt.subplot(222)
# alpha设置透明度 0-1之间的数
axes2.grid(True,alpha=0.5)

axes3 = plt.subplot(223)
axes3.grid(True,color='green')

axes4 = plt.subplot(224)
# 设置网格线方向
# linestyle/ls设置虚线
axes4.grid(True,axis='x')
```

使用plt.grid方法可以开启网格线，使用plt面向对象的方法，创建多个子图显示不同网格线

- lw代表linewidth，线的粗细
- alpha表示线的明暗程度
- color代表颜色
- axis显示轴向

<img src="http://qiniu.s001.xin/matplot/tushi6.png" width="400">

**坐标轴界限**

`plt.axis([xmin,xmax,ymin,ymax])`

```python
plt.plot(x,y1)
# 注意：必须x,y轴同时设置界限
plt.axis([-1,7.2,-2,2])
```

<img src="http://qiniu.s001.xin/matplot/tushi7.png" width="400">

```python
# 画圆
x = np.linspace(-1,1,100)
f = lambda x:(1-x**2)**0.5
plt.plot(x,f(x),x,-f(x))
# 使用axis函数设置坐标轴的显示风格
plt.axis('equal')
```

<img src="http://qiniu.s001.xin/matplot/tushi8.png" width="400">

```python
axes = plt.subplot(111)
axes.plot(x,f(x),x,-f(x))
axes.axis('equal')
```

<img src="http://qiniu.s001.xin/matplot/tushi8.png" width="400">

**xlim方法和ylim方法**

除了plt.axis方法，还可以通过xlim，ylim方法设置坐标轴范围

```python
# 分别设置x轴和y轴界限
plt.plot(x,y2)
plt.xlim(-2,20)
plt.ylim(-2,2)
```

<img src="http://qiniu.s001.xin/matplot/tushi9.png" width="400">

面向对象风格设置画布样式

```python
axes = plt.subplot(111)
axes.plot(x,y2)
# 使用面向对象风格设置画布样式，如果属性找不到，就使用set_XX函数设置
# .+Tab键,快捷查看对象属性和方法
axes.set_xlim(-5,5)
axes.set_ylim(-5,5)
```

<img src="http://qiniu.s001.xin/matplot/tushi10.png" width="400">

**坐标轴标签**

xlabel方法和ylabel方法
plt.ylabel('y = x^2 + 5',rotation = 60)旋转

- color 标签颜色
- fontsize 字体大小
- rotation 旋转角度

```python
plt.plot(x,y1)
plt.xlabel('x_label',fontsize=35)
plt.ylabel('y-label',color='pink',fontsize=40)
```

<img src="http://qiniu.s001.xin/matplot/tushi11.png" width="400">

```python
axes = plt.subplot(111)
axes.plot(x,y1)
# HTML支持的字体设置，在这里都可以使用color fontsize linestyle linewidth
# fontsize 字体大小
# color 字体颜色
# rotation 旋转角度
axes.set_ylabel('y_label',fontsize=30,color='red',rotation=90)

# 使用字典设置字体
axes.set_xlabel('x_label',fontdict={
    'fontsize':40,
    'color':'blue'
})
```

<img src="http://qiniu.s001.xin/matplot/tushi12.png" width="400">

**标题**

plt.title()方法

- loc {left,center,right}
- color 标签颜色
- fontsize 字体大小
- rotation 旋转角度

```python
plt.plot(x,y1)

# loc设置标题显示位置（left,right,center）

plt.title('SIN(X)',fontsize=60,color='purple',rotation=45,loc='left')
```

<img src="http://qiniu.s001.xin/matplot/tushi13.png" width="400">

**注：matplotlib显示中文如何处理?**

Windows：

```python
from pylab import mpl
# 指定默认字体
mpl.rcParams['font.sans-serif'] = ['FangSong'] 
# 解决保存图像是负号'-'显示为方块的问题
mpl.rcParams['axes.unicode_minus'] = False 
```



Mac:

```python
import numpy as np
import matplotlib
import matplotlib.pyplot as plt
from matplotlib.font_manager import 
FontProperties
# 导入本地字体文件
font = FontProperties(fname='/Library/Fonts/Songti.ttc')

# Fixing random state for reproducibility
np.random.seed(19680801)
# 设置为FALSE 解决负号显示为框的问题
matplotlib.rcParams['axes.unicode_minus'] = False
fig, ax = plt.subplots()
ax.plot(10*np.random.randn(100), 10*np.random.randn(100), 'o')
# 用fontproperties参数设置字体为自定义字体
ax.set_title(u'散点图',fontproperties=font,fontsize=30)
plt.show()
```

#### 3.图例

**原始方法**

```python
# 相关依赖导入
...
df = DataFrame(data=np.random.randint(0,100,size=(5,3)),columns=list('abc'))
df.plot()
```

<img src="http://qiniu.s001.xin/matplot/tuli1.png" width="400">

**legend方法**

两种传参方法：

- 分别在plot函数中增加label参数,再调用legend()方法显示
- 直接在legend方法中传入字符串列表

```python
x = np.arange(0,10,step=1)
plt.plot(x,x,x,x*2,x,x/2)
# 传入一个列表参数，参数内容就是每一个data的说明
plt.legend(['fast','normal','slow'])
```

<img src="http://qiniu.s001.xin/matplot/tuli2.png" width="400">

第二种传参

```python
plt.plot(x,x,label='normal')
plt.plot(x,x*2,label='fast')
plt.plot(x,x/2,label='slow')
plt.legend(loc=10)
```

<img src="http://qiniu.s001.xin/matplot/tuli3.png" width="400">

**loc参数**

- loc参数用于设置图例标签的位置，一般在legend函数内
- matplotlib已经预定义好几种数字表示的位置

loc参数可以是2元素的元组，表示图例左下角的坐标

- [0,0] 左下
- [0,1] 左上
- [1,0] 右下
- [1,1] 右上
- 图例也可以超过图的界限loc = (-0.1,0.9)

```python
plt.plot(x,x,label='normal')
plt.plot(x,x*2,label='fast')
plt.plot(x,x/2,label='slow')
plt.legend(loc=[0.4,1.1],ncol=3)
```

<img src="http://qiniu.s001.xin/matplot/tuli4.png" width="400">

**ncol参数**

ncol控制图例中有几列,在legend中设置ncol,需要设置loc

**linestyle、color、marker**

修改线条样式

#### 4.保存图片

使用figure对象的savefig的函数

- `filename`
  含有文件路径的字符串或Python的文件型对象。图像格式由文件扩展名推断得出，例如，.pdf推断出PDF，.png推断出PNG （“png”、“pdf”、“svg”、“ps”、“eps”……）
- `dpi`
  图像分辨率（每英寸点数），默认为100
- `facecolor`
  图像的背景色，默认为“w”（白色）

```python
# 获取figure对象（画布对象）
# 设置画布的背景色
figure = plt.figure(facecolor='cyan')

# 设置坐标系的背景色
axes = plt.subplot(111,facecolor='blue')

# 设置线条的颜色
axes.plot(x,x,x,x*2,color='yellow')

# dpi设置像素大小
figure.savefig('18011.png',dpi=50)
```

<img src="http://qiniu.s001.xin/matplot/bg.png" width="400">

### 二. 设置plot的风格和样式

> plot语句中支持除X,Y以外的参数，以字符串形式存在，来控制颜色、线型、点型等要素，语法形式为： plt.plot(X, Y, 'format', ...)

#### 1.点和线的样式

**颜色**

参数`color`或`c`

```python
plt.plot(x,x,color='c')
```

常用色彩名与别名

**透明度**

`alpha`

```python
plt.plot(x,x,alpha=0.3,color='r')
```

**背景色**

设置背景色，通过`plt.subplot()`方法传入`facecolor`参数，来设置坐标系的背景色

```python
# 设置坐标系的背景
plt.subplot(facecolor='red')
plt.plot(x,np.sin(x))
```

**线型**

参数`linestyle`或`ls`

```python
plt.plot(x,x,ls=':')
plt.plot(x,x*2,ls='steps')
plt.plot(x,x/2,ls='None')
```

常用线型

<img src="http://qiniu.s001.xin/matplot/xianxing.png" width="400">

**线宽**

`linewidth`或`lw`参数

**不同宽度的破折线**

`dashes`参数 eg.dashes = [20,50,5,2,10,5]

设置破折号序列各段的宽度

```python
# dashes自定义破折线的样式
plt.plot(x,x,dashes=[10,2,3,5])
```

**点型**

- marker 设置点形
- markersize 设置点形大小

```python
x = np.random.randint(0,10,size=6)
plt.plot(x,marker='s',markersize=60)
```

<img src="http://qiniu.s001.xin/matplot/marker.png" width="400">

常用点型参数设置

<img src="http://qiniu.s001.xin/matplot/dianxing.png" width="400">

```python
plt.plot(x,marker='4',markersize=30)
plt.plot(x,x*2,marker='3',markersize=40)
```

<img src="http://qiniu.s001.xin/matplot/sanjiao.png" width="400">

| 标记 |  描述   | 标记 |  描述   |
| :--: | :-----: | :--: | :-----: |
| 's'  | 正方形  | 'p'  | 五边形  |
| 'h'  | 六边形1 | 'H'  | 六边形2 |
| '8'  | 八边形  |      |         |

```python
plt.plot(np.random.randint(0,10,size=10),marker='h',markersize=20,label='六边形1',)
plt.plot(np.random.randint(0,10,size=10),marker='H',markersize=20,label='六边形2')
plt.plot(np.random.randint(0,10,size=10),marker='8',markersize=20,label='八边形')
plt.plot(np.random.randint(0,10,size=10),marker='p',markersize=20,label='五边形')
plt.legend()
```

<img src="http://qiniu.s001.xin/matplot/tuxing.png" width="400">

标记参数

<img src="http://qiniu.s001.xin/matplot/biaoji.png" width="400">

#### 2.多参数连用

> 颜色、点型、线型，可以把几种参数写在一个字符串内进行设置 'r-.o'

```python
# 参数连用需要对不同的线进行分别设置
plt.plot(x,x,'r:v',x,x*2,'b--h')
```

<img src="http://qiniu.s001.xin/matplot/many.png" width="400">

**更多点和线的设置**

> - markeredgecolor = 'green',
> - markeredgewidth = 2,
> - markerfacecolor = 'purple'

<img src="http://qiniu.s001.xin/matplot/manysetting.png" width="400">

**多个曲线同一设置**

> 属性名声明,不可以多参数连用
>
> plt.plot(x1, y1, x2, y2, fmt, ...)

```python
x = np.arange(0,10,1)
# 统一设置
plt.plot(x,x,x,x*2,x,x/2,linewidth=3,color='blue')
# 分别设置
plt.plot(x,x,'r-.s',x,x*2,'b--h')
```

**多曲线不同设置**

> 多个都进行设置时，多参数连用 plt.plot(x1, y1, fmt1, x2, y2, fmt2, ...)

**三种设置方式**

1. ##### 向方法传入关键字参数

   - import matplotlib as mpl

2. ##### 对实例使用一系列的setter方法

   plt.plot()方法返回一个包含所有线的列表，设置每一个线需要获取该线对象

   - eg: lines = plt.plot(); line = lines[0]
   - line.set_linewith()
   - line.set_linestyle()
   - line.set_color()

3. ##### 对坐标系使用一系列的setter方法

   axes = plt.subplot()获取坐标系

   - set_title()
   - set_facecolor()
   - set_xticks、set_yticks 设置刻度值
   - set_xticklabels、set_yticklabels 设置刻度名称

例：

```python
lines = plt.plot(x,x,x,x*2,x,x/2)

# 根据line对象设置line的属性
lines[0].set_linewidth(3)
lines[1].set_color('cyan')
lines[2].set_linestyle('--')
```

<img src="http://qiniu.s001.xin/matplot/sett.png" width="400">

**X、Y轴坐标刻度**

> plt.xticks()和plt.yticks()方法
>
> - 需指定刻度值和刻度名称 plt.xticks([刻度列表],[名称列表])
> - 支持fontsize、rotation、color等参数设置

```python
x = np.linspace(0,2*np.pi,100)
plt.plot(x,np.sin(x))

# xticks函数设置坐标轴刻度和标签
plt.xticks([0,np.pi/2,np.pi,3*np.pi/2,2*np.pi],['0','π/2','π','3π/2','2π'])
```

<img src="http://qiniu.s001.xin/matplot/stick.png" width="400">

```python
axes = plt.subplot(111)
axes.plot(x,np.sin(x))
# 使用画布对象设置坐标轴刻度和坐标轴刻度标签
axes.set_xticks([0,np.pi/2,np.pi,3*np.pi/2,2*np.pi])
axes.set_xticklabels(['0','$\pi$/2','π','3π/2','2π'],fontsize=20)

axes.set_yticks([-1,0,1])
axes.set_yticklabels(['min',0,'max'],fontsize=20)
```

<img src="http://qiniu.s001.xin/matplot/xstick.png" width="400">

### 三、2D图形

#### 1.直方图

> 【直方图的参数只有一个x！！！不像条形图需要传入x,y】

**hist()的参数**

- bins
  可以是一个bin数量的整数值，也可以是表示bin的一个序列。默认值为10
- normed
  如果值为True，直方图的值将进行归一化处理，形成概率密度，默认值为False
- color
  指定直方图的颜色。可以是单一颜色值或颜色的序列。如果指定了多个数据集合，颜色序列将会设置为相同的顺序。如果未指定，将会使用一个默认的线条颜色
- orientation
  通过设置orientation为horizontal创建水平直方图。默认值为vertical

```python
x = np.random.randint(0,100,size=100)
plt.hist(x,bins=5)
```

#### 2. 条形图

> 【条形图有两个参数x,y】
>
> - width 纵向设置条形宽度
> - height 横向设置条形高度
> - bar()、barh()

```python
x = np.array([2,5,7,9,4,3,8])
# x 就是底轴刻度标签
# height 就是柱形图的柱高
# width 表示柱宽 (0-1取值)
plt.bar(x=list('abcdefg'),height=x,width=1)

# y 就是底轴刻度标签
# width 就是柱形图的柱高
# height 表示柱宽
plt.barh(y=list('abcdefg'),width=x,height=1)
```

#### 3. 饼图

> 【饼图也只有一个参数x！】
>
> pie()
> **饼图适合展示各部分占总体的比例，条形图适合比较各部分的大小**

**普通部分占满饼图**

```python
x = [45,6]
plt.pie(x)
```

普通未占满饼图

```python
x = [0.4,0.3]
plt.pie(x)
```

> 饼图阴影、分裂等属性设置
>
> - labels参数设置每一块的标签；
> - labeldistance参数设置标签距离圆心的距离（比例值,只能设置一个浮点小数）
> - autopct参数设置比例值的显示格式(%1.1f%%)；
> - pctdistance参数设置比例值文字距离圆心的距离
> - explode参数设置每一块顶点距圆形的长度（比例值,列表）；
> - colors参数设置每一块的颜色（列表）；
> - shadow参数为布尔值，设置是否绘制阴影
> - startangle参数设置饼图起始角度

```python
# labeldistance只能设置一个小数
plt.pie(x,labels=['男','女'],labeldistance=0.3,
        autopct="%1.2f%%",pctdistance=0.8,
       explode=[0.1,0.0],
       colors=['blue','yellow'],
       startangle=90,
       shadow=True)
```

<img src="http://qiniu.s001.xin/matplot/bing.png" width="400">

#### 4. 散点图

> 【 散点图需要两个参数x,y，但此时x不是表示x轴的刻度，而是每个点的横坐标！】
>
> scatter()

```python
x = np.random.normal(size=1000)
y = np.random.normal(size=1000)

# 生成1000个随机颜色
colors = np.random.random(size=(1000,3))
# 使用c参数来设置颜色
plt.scatter(x,y,marker='d',c=colors)
```

<img src="http://qiniu.s001.xin/matplot/sandian.png" width="400">

### 四.3D图

#### 曲面图

> 导包
>
> - from mpl_toolkits.mplot3d.axes3d import Axes3D
>
> 使用mershgrid函数切割x,y轴
>
> - X,Y = np.meshgrid(x, y)
>
> 创建3d坐标系
>
> - axes = plt.subplot(projection='3d')
>
> 绘制3d图形
>
> - p = axes.plot_surface(X,Y,Z,color='red',cmap='summer',rstride=5,cstride=5)
>
> 添加colorbar
>
> - plt.colorbar(p,shrink=0.5)

例>

```python
def createZ(x,y):
    return np.sin(x) + np.cos(y)*2 - np.pi/5

from mpl_toolkits.mplot3d.axes3d import Axes3D
axes = plt.subplot(projection='3d')

x = np.linspace(-np.pi,np.pi,100)
y = np.linspace(-np.pi,np.pi,100)

# 使用x,y生成一组网格
X,Y = np.meshgrid(x,y)
Z = createZ(X,Y)

p = axes.plot_surface(X,Y,Z,cmap='summer',rstride=5,cstride=5)

plt.colorbar(p,shrink=0.5)
```

<img src="http://qiniu.s001.xin/matplot/3d.png" width="400">

### 五.玫瑰图/极坐标条形图

> 创建极坐标，设置polar属性
>
> - plt.axes(polar = True)
>
> 绘制极坐标条形图
>
> - index = np.arange(-np.pi,np.pi,2*np.pi/6)
> - plt.bar(x=index ,height = [1,2,3,4,5,6] ,width = 2*np.pi/6)

```python
# 玫瑰图
x = np.array([2,5,7,9,4,3,8])
plt.axes(polar = True)
plt.bar(x=list('abcdefg'),height=x)
```

<img src="http://qiniu.s001.xin/matplot/rose.png" width="400">

### 六.图形内的文字、注释、箭头

#### 1.控制文字属性的方法

Prop

所有的方法会返回一个matplotlib.text.Text对象

```python
# 画布
figure = plt.figure()
# figure.text(x=1,y=1,s='这是figure对象的注释')
figure.suptitle('figure  title')
# 等差数列
x = np.linspace(-np.pi,np.pi,100)
axes1 = plt.subplot(221)
axes1.plot(x,np.sin(x))
# x,y是以坐标轴刻度为准的一组数据，描述了注释信息的注释位置
axes1.text(x=0.5,y=0.5,s='这是一段注释')

axes2 = plt.subplot(222)
axes2.plot(x,np.cos(x),color='red')
```

<img src="http://qiniu.s001.xin/matplot/figure.png" width="400">

#### 2.图形内的文字

`text()`

#### 3. 注释

`annotate()`

> - xy参数设置箭头指示的位置
> - xytext参数设置注释文字的位置
> - arrowprops参数以字典的形式设置箭头的样式
> - width参数设置箭头长方形部分的宽度
> - headlength参数设置箭头尖端的长度，
> - headwidth参数设置箭头尖端底部的宽度
> - shrink参数设置箭头顶点、尾部与指示点、注释文字的距离（比例值），可以理解为控制箭头的长度

```python
figure = plt.figure(figsize=(8,6))
axes = plt.subplot(111)
axes.plot(x,np.sin(x))

# s 注释的文字
# xy  箭头指向的位置
# xytext 注释文字放置的位置
# arrowprops没有arrowstyle键的设置方式
axes.annotate(s='this is a annotate',xy=(0.5,0.5),xytext=(0.8,0.8),
             arrowprops = {
                 'width':10,
                 'headlength':12,
                 'headwidth':15,
                 'shrink':0.2
             })

# 使用arrowstyle设置箭头样式
axes.annotate(s='this is a good text',xy=(-0.2,-0.2),xytext=(-0.4,-0.6),
             arrowprops = {
                'arrowstyle': 'fancy'
             })
```


<img src="http://qiniu.s001.xin/matplot/zhushi.png" width="400">

<img src="http://qiniu.s001.xin/matplot/jiantou.png">
