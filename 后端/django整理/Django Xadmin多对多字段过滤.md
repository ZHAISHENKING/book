# Django Xadmin多对多字段过滤

> 在xadmin中是不能像原生admin那样使用`formfield_for_manytomany`方法来过滤多对多字段



<center><img src="http://qiniu.s001.xin/4ibon.jpg"></center>

进入xadmin源码,找到了`formfield_for_dbfield`这个方法,测试是有用的，可以过滤第一个选项框的值

<center><img src="http://qiniu.s001.xin/4imwk.jpg"></center>

