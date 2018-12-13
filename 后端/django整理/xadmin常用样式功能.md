# xadmin常用样式功能

[TOC]

```
xadmin可以使用的页面样式控制基本与Django原生的admin一直。

list_display 控制列表展示的字段
search_fields 控制可以通过搜索框搜索的字段名称，xadmin使用的是模糊查询
list_filter 可以进行过滤操作的列
ordering 默认排序的字段
readonly_fields 在编辑页面的只读字段
exclude 在编辑页面隐藏的字段
list_editable 在列表页可以快速直接编辑的字段
show_detail_fileds 在列表页提供快速显示详情信息
refresh_times 指定列表页的定时刷新
list_export 控制列表页导出数据的可选格式
show_bookmarks 控制是否显示书签功能
data_charts 控制显示图标的样式
model_icon 控制菜单的图标
```

## model_icon 菜单图标

model_icon 参考`http://fontawesome.dashgame.com/`

<center><img src="http://qiniu.s001.xin/kx79l.jpg" width=600></center>

**效果图**

<center><img src="http://qiniu.s001.xin/8yoke.jpg" width=300></center>

## style_fields

控制字段的显示样式

默认manytomany字段样式是个单排下拉框，对添加选项操作十分不友好

<center><img src="http://qiniu.s001.xin/i3y0q.jpg" width=600></center>

`level`是我model中的一个多对多字段

`m2m_transfer`就是多对多穿梭框样式

`ueditor`是支持富文本编辑

`filter_horizontal`是多对多样式字段支持过滤

<center><img src="http://qiniu.s001.xin/fkstl.jpg" width=600></center>

## list_display

 指定xadmin中需要显示哪些字段信息，以列表显示

```python
list_display = ('first_name', 'last_name', 'email')
```

## search_fields

 指定哪些字段信息可以被搜索

```python
search_fields = ('first_name', 'last_name')
```

## list_filter

 添加哪些字段需要进行过滤显示（添加过滤器)

```python
list_filter = ('publication_date',)  #添加过滤（这里是过滤日期）
```

## date_hierarchy

  添加日期过滤器，该字段只能是日期类型

```python
date_hierarchy = 'publication_date'   #过滤（日期的另外一种过滤方式，可以添加后看一下）
```

## ordering 

 显示的列表以什么进行排序 ，加‘-’表示降序

```python
ordering = ('-publication_date',)   #排序（这里以日期排序，加‘-’表示降序）
```

## fields 

排除一些不想被其他人编辑的fields，不包含在内的字段不能编辑

```python
fields = ('title', 'authors', 'publisher')
```

## filter_horizontal 

从‘多选框’的形式改变为‘过滤器’的方式，水平排列过滤器，必须是一个 ManyToManyField类型，且不能用于 ForeignKey字段，默认地，管理工具使用`` 下拉框`` 来展现`` 外键`` 字段

```python
filter_horizontal = ('authors',)
```

## raw_id_fields

 将ForeignKey字段从‘下拉框’改变为‘文本框’显示

```python
raw_id_fields = ('publisher',)
```

## list_editable

 列表显示的时候，指定的字段可以直接页面一键编辑

```python
list_editable = ['csdevice']
```

## readonly_fields 

指定一些字段为只读，不可修改

```python
readonly_fields = ('cservice',)
```

## exclude 

在编辑和查看列表时指定不显示的字段

```python
exclude = ['cservice']
```

## refresh_times

 后台可选择10秒刷新一次或者60秒刷新一次如下

```python
refresh_times = [10, 60]
```

## show_detail_fields

 在指定的字段后添加一个显示数据详情的一个按钮

```python
show_detail_fields=['ttdsn']
```

## relfield_style

后台自定义不是下拉选择框，而是搜索框（解决了为什么用户不是下拉框的问题。。）

```python
relfield_style = 'fk-ajax'
```

## 修改 xadmin 的主题 、title、header、菜单样式

<center><img src="http://qiniu.s001.xin/veog6.jpg" width=600></center>

## settings中配置中文、时区

```python
# LANGUAGE_CODE = 'en-us'
LANGUAGE_CODE = 'zh-hans'
  
# TIME_ZONE = 'UTC'
TIME_ZONE = 'Asia/Shanghai'
```

## 设置xadmin的app标题

在apps.py文件中，添加`verbose_name = "客户管理"`

```python
from django.apps import AppConfig
class CustomersConfig(AppConfig):
    name = 'apps.customers'
    verbose_name = "客户管理"

```

