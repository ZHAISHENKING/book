### SVM

> **理解**：
>
> 在二维上，找一条`最优分割线`将两类分开，分割线满足分类两边尽可能有最大间隙
>
> 当直线难以完成分类时，引入`超平面`使数据分类，分类的契机是`kerneling内核`
>
> **应用场景**
>
> SVM主要针对`小样本数据`进行学习，分类和预测（有时也较回归），有很好的泛化能力

SVM内核：

- Linear

  主要用于线性可分的情形。参数少，速度快，适用于一般数据

- rbf

  主要用于线性不可分的情形。参数多，分类结果非常依赖于参数。

- Poly

  参数较多，在另外两种都不适用的时候选择

经验：

> 就拟合程度来讲，linear在线性可分的情况下和rbf想过差不多，在线性不可分的情况下rbf明显优于linear，poly在前两种情况下效果都不怎么好，但是在变化剧烈的情况下ploy稍微好点。
> 就速度来讲，linear肯定是最快的，poly的话因为参数很多，测试中最慢。
> 就参数而言，linear简单易用，rbf, poly参数较多，但是调参好的话可以得到较好的结果。

实战：

鸢尾花分类

- 导包

  ```python
  from sklearn.svm import SVC
  from sklearn.svm import LinearSVC
  from sklearn import datasets
  ```

  

- 生成数据，训练数据

  ```python
  iris = datasets.load_iris()
  
  # 只取两个特征（方便画图）
  X = iris.data[:,:2]
  y = iris.target
  
  
  # 建立模型
  svc_linear = SVC(kernel='linear')
  svc_rbf = SVC(kernel='rbf')#Radial Based Function 基于半径的函数
  svc_poly = SVC(kernel='poly') # poly是多项式的意思
  linear_svc = LinearSVC() # SVC(kernel = 'linear')相近方法更多，可以处理更多的数据
  
  # 训练模型
  svc_linear.fit(X,y)
  svc_rbf.fit(X,y)
  svc_poly.fit(X,y)
  linear_svc.fit(X,y)
  ```

  

- 图片背景云点

  ```python
  # 网格密度
  h = 0.02
  
  # 设置x轴y轴的界限
  x_min,x_max = X[:,0].min()-1, X[:,0].max()+1
  y_min,y_max = X[:,1].min()-1, X[:,1].max()+1
  # 得到网格的坐标
  xx,yy = np.meshgrid(np.arange(x_min,x_max,h),
                     np.arange(y_min,y_max,h))
  ```

  

- 绘制图形

  ```python
  # 设置图片标题
  titles = ['svc_linear',
           'svc_rbf',
           'svc_poly',
           'linear_svc']
  
  plt.figure(figsize=(12,8))
  
  # 在2*2子图中画出四种SVC
  for i,clf in enumerate((svc_linear,svc_rbf,svc_poly,linear_svc)):
      plt.subplot(2,2,i+1)
      Z = clf.predict(np.c_[xx.ravel(),yy.ravel()])
      Z = Z.reshape(xx.shape)
      # 等高线以及背景
      plt.contourf(xx,yy,Z,alpha=0.2,cmap = 'cool')
      
      # 实际点的图
      plt.scatter(X[:,0],X[:,1],c=y,cmap='rainbow')
      plt.title(titles[i])
  ```



**多种核函数回归**

- 导包

  ```python
  from sklearn.svm import SVR
  import numpy as np
  ```

  

- 随机生成数据，训练数据

  ```python
  #自定义样本点
  X = 5*np.random.rand(40,1)
  X.sort(axis = 0)
  y = np.sin(X).ravel()
  
  #添加噪声
  y[::5] += 3*(0.5 - np.random.rand(8))
  
  #建立模型
  svr_linear = SVR(kernel='linear')
  svr_rbf = SVR(kernel = 'rbf')
  svr_poly = SVR(kernel = 'poly')
  
  #训练并预测
  p_y_linear = svr_linear.fit(X,y).predict(X)
  p_y_rbf = svr_rbf.fit(X,y).predict(X)
  p_y_poly = svr_poly.fit(X,y).predict(X)
  ```

  

- 绘图

  ```python
  # 画图
  plt.figure(figsize=(12,8))
  # 画出真实样本点
  plt.scatter(X,y,c='k',label='data')
  # 画出预测曲线
  plt.plot(X,p_y_linear,c='navy',label='linear')
  plt.plot(X,p_y_rbf,c='r',label='rbf')
  plt.plot(X,p_y_poly,c='g',label='poly')
  plt.legend()
  ```



### K-Means

> **应用场景**
>
> 一种无监督学习，事先不知道结果，自动将相似对象归类
>
> **原理**
>
> 与knn类似，使用欧式距离函数，求各点到各分类中心点的距离，距离近的归为一类
>
> <img src="http://qiniu.s001.xin/knn/kmeans1.png" width="350">
>
> **步骤图**
>
> <img src="http://qiniu.s001.xin/knn/kmeans2.png">
>
> **缺陷**
>
> - K值的选定(分多少类)
>   - ISODATA算法通过类的自动合并和分裂，得到较为合理的类型数目K
> - 初始随机种子点的选取(分类参考点)
>   - K-Means++算法可以用来解决这个问题，其可以有效地选择初始点
>
> **步骤**
>
> 1. 从数据中选择k个对象作为初始聚类中心; 
> 2. 计算每个聚类对象到聚类中心的距离来划分； 
> 3. 再次计算每个聚类中心 
> 4. 计算标准测度函数，直到达到最大迭代次数，则停止，否则，继续操作。 
> 5. 确定最优的聚类中心 

**实战**

Make_blobs随机生成点

- 效果图

  <img src="http://qiniu.s001.xin/knn/kmeans3.png" width="400">

- 导包

  ```python
  from sklearn.cluster import KMeans
  
  import matplotlib.pyplot as plt
  %matplotlib inline
  import numpy as np
  from sklearn.datasets import make_blobs
  
  #生成样本点
  X_train,y_train = make_blobs(n_samples=300,centers=4,cluster_std=  0.6, random_state = 9)
  ```

  

- 建模

  ```python
  # 建立模型
  kmeans = KMeans(n_clusters=4)
  kmeans.fit(X_train)
  y_ = kmeans.predict(X_train)
  ```

  

- 画图

  ```python
  #画图
  plt.figure(figsize = (12,8))
  centers = kmeans.cluster_centers_
  plt.scatter(X_train[:,0],X_train[:,1],c = y_)
  plt.scatter(centers[:,0],centers[:,1],c = 'r',s = 100,alpha = 0.4)
  ```

  

