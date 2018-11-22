# CRM客户关系管理系统

###客户关系管理（CRM）

​        客户关系管理（customer relationship management）的定义是：企业为提高核心竞争力，利用相应的信息技术以及互联网技术协调企业与顾客间在[销售](https://baike.baidu.com/item/%E9%94%80%E5%94%AE/239410)、[营销](https://baike.baidu.com/item/%E8%90%A5%E9%94%80)和服务上的交互，从而提升其[管理方式](https://baike.baidu.com/item/%E7%AE%A1%E7%90%86%E6%96%B9%E5%BC%8F)，向客户提供创新式的个性化的客户交互和服务的过程。其最终目标是吸引新客户、保留老客户以及将已有客户转为忠实[客户](https://baike.baidu.com/item/%E5%AE%A2%E6%88%B7)，增加市场。

###作用

>1.提高市场营销效果
>
>2.为生产研发提供决策支持
>
>3.提供技术支持的重要手段
>
>4.为财务金融策略提供决策支持
>
>5.为适时调整内部管理提供依据
>
>6.使企业的资源得到合理利用
>
>7.优化企业[业务流程](https://baike.baidu.com/item/%E4%B8%9A%E5%8A%A1%E6%B5%81%E7%A8%8B)
>
>8.提高企业的快速响应和应变能力
>
>9.改善企业服务，提高客户满意度
>
>10.提高企业的销售收入
>
>11.推动了企业文化的变革
>
>12.与QQ集成，可以快速与客户沟通

### 思维导图

<img src="http://qiniu.s001.xin/crm/siwei.jpeg" height="600px">

### 用户场景分析

**`销售`**

- 销售A    刚从   百度推广   聊了一个客户，录入了CRM系统，咨询了python全栈开发课程，但是没报名
- 销售B    从 qq群聊了客户，且报名了python全栈9期课程，给用户发送了报名连接，待用户填写完毕后，把他添加到了python fullstack s9的班级里

- 销售C  打电话给之前的一个客户，说服他报名linux40期，但是没说服成功，更新了跟踪记录
- 销售D   聊了一个客户，录入时发现，此客户已存在，不能录入，随后通知相应的客户负责人跟进
- 销售B   从客户库里过滤出了 所有超过一个月未跟踪的客户，然后进行跟踪（如果成了，这客户就算B的）
- 销售主管   查看了部门 本月的销售报表， 包括来源分析，成单率分析，班级报名数量分析，销售额同比

 

 **`学员`**

- 客户A   填写了销售发来的报名链接，上传了个人的证件信息，并提交，过了一会儿，发现收到一个邮件，告知他报名python9期课程成功，并帮他开通了学员账号

- 学员A  登录了学员系统，看到了 自己的合同，报名的班级，以及课程大纲
- 学员A  提交了python9期的 第1节课的作业
- 学员A   查看了自己在python9期的学习成绩和排名
- 学员A   在线搜索一个问题，发现没有答案，于是提交了一个问题

 

**`讲师`**

- 登录了CRM，查看自己管理的班级列表
- 进入了python9期，创建了第一节的上课记录，填入了本节内容，作业需求
- 为python9期的第一节课，进行点名，发现科比迟到了，标记他为迟到状态
- 批量下载了所有学员的python9期第一节的作业，给每个学生在线  打成绩+批注

 

 **`管理员`**

- 创建了    课程（linux,python）
- 创建了    校区（北京，上海）
- 创建了    班级（python fullstacks9和linux40）
- 创建了    账号（A,B,C,D）
- 创建了    销售，讲师，学员三个角色，并把ABCD分配到了销售角色里
- 设置了销售可以操作的权限

### 表结构设计

<img src="http://qiniu.s001.xin/sql.jpg">

### 重点代码段

**登录**

```python
from django.shortcuts import render,redirect
from django.contrib.auth import authenticate,login


def acc_login(request):
    if request.method == 'POST':
        username = request.POST.get('username',None)
        password = request.POST.get('password',None)
        #user是一个对象
        #验证
        user = authenticate(username=username,password=password)
        if user:
            #登录（已生成session）
            login(request,user)
            #如果有next值就获取next值，没有就跳转到首页
 			return redirect(request.GET.get('next','/'))
    return render(request,'login.html')
```

**动态菜单生成**

>- 首先获取登录的用户（User）
>- 通过User反向查找到UserProfile(用户信息)
>- 然后通过UserProfile找到用户关联的所有角色
>- 最后通过角色循环遍历出用户所有的菜单

**OneToOneField和ForeignKey反向获取**

>- OneToOneField反向查，直接request.user.userprofile  后面跟反向的表名（小写）就可以
>- 如果是FK，直接request.user.userprofile_set  后面跟反向的表名（小写）+“_set” 就可以
>- request.user.userprofile.role.select_related等价于request.user.userprofile.role.all
>
>

**自定义前端kingadmin全局注册时报错NoneType**

> 是因为我们在注册model的时候，有的写了自定义的model类，有的没写，而我们都统一的赋值，导致那些没写自定义model类（空的）赋值的时候就会报NoneType错误
>
> django自带的自定义admin类的写法继承了ModelAdmin，那注册的时候为什么有的没写自定义admin类没有报错呢？

是因为继承的`admin.ModelAdmin`帮我们写了（里面其实都定义为空了），我们模仿django admin的写法，也写个父类。

<img src="http://qiniu.s001.xin/crm/baseadmin.png">

**分页**

<img src="http://qiniu.s001.xin/crm/pagin.png">

官方实例

<img src="http://qiniu.s001.xin/crm/gwpagin.png">

**报名页面流程**

> - 销售填写客户跟班级，点“下一步”提交
> - 后台获取到客户id和班级id，在数据库中创建记录，并生成一个报名链接，返回到前端
> - 前端显示报名链接，然后销售把报名链接发给用户

**学员填写报名信息**

> -  添加学员注册url
> - 添加CustomerInfo字段，身份证信息，紧急联络人，性别
> - 有些字段是只读的，填写信息的时候不能修改，因为如果设置了只读(添加属性disabled=true)，提交的时候会报这些字段为空，导致提交错误
> - 所以在前段添加了js代码，*BeforeFormSubmit  在提交前去掉disable=true（因为数据库中有默认值，提交的时候就不会报错）*
> - 防止用户通过前端改html代码的方式改只读字段的信息，所以在form.py里面添加了一个自定义的验证方法（clean）,如果只读字段提交的时候信息跟数据库中默认的不一样，就报错

```python
 #只读字段不让用户通过浏览器改html代码的方式改
    def clean(self):
        # 表单级别的错误
        if self.errors:
            raise forms.ValidationError(("Please fix errors before re-submit."))
        # means this is a change form ,should check the readonly fields
        if self.instance.id is not None:
            #取出只读字段，是一个字符串形式
            for field in self.Meta.readonly_fields:
                #通过反射取出字段的值（数据库里的数据）
                old_field_val = getattr(self.instance, field)
                #提交过来的数据
                form_val = self.cleaned_data.get(field)
                #如果两个数据不匹配
                if old_field_val != form_val:
                    #就提示只读字段不能修改
                    #add_error是字段级别的错误
                    self.add_error(field, "Readonly Field: field should be '{value}' ,not '{new_value}' ".format(**{'value': old_field_val, 'new_value': form_val}))
```

**学员报名合同及身份信息上传**

> - 必须勾选报名合同协议
> - 必须上传个人证件信息
> - 最多只能上传三个文件
> - 文件大小2M以内
> - 列出已上传文件

```python
@csrf_exempt
def enrollment_fileupload(request,enrollment_id):
    '''学员报名文件上传'''
    enrollment_upload_dir = os.path.join(conf.settings.CRM_FILE_UOLOAD_DIR,enrollment_id)
    #第一次上传图片就创建目录，学员上传第二章图片的时候，会判断目录是否已经存在
    #因为如果目录存在还mkdir就会报错，所以这里要做判断
    if not os.path.isdir(enrollment_upload_dir):
        os.mkdir(enrollment_upload_dir)
    #获取上传文件的对象
    file_obj = request.FILES.get('file')
    #最多只允许上传3个文件
    if len(os.listdir(enrollment_upload_dir)) <= 3:
        #把图片名字拼接起来（file.name：上传的文件名字）
        with open(os.path.join(enrollment_upload_dir,file_obj.name),'wb') as f:
            for chunks in file_obj.chunks():
                f.write(chunks)
    else:
        return HttpResponse(json.dumps({'status':False,'err_msg':'最多只能上传三个文件'}))

    return HttpResponse(json.dumps({'status':True,}),)
```

```python

    # 列出学员已上传的文件
    upload_files = []
    enrollment_upload_dir = os.path.join(conf.settings.CRM_FILE_UOLOAD_DIR, enrollment_id)
    if os.path.isdir(enrollment_upload_dir):
        upload_files = os.listdir(enrollment_upload_dir)
```

**合同审核**

> - 学员提交报名信息后，应该是等待审核状态
> - 管理员改审核状态为ture， 并保存提交时间

**所有权限**

```python
perm_dic = {
    # 'crm_table_index': ['table_index', 'GET', [], {}, ],  # 可以查看CRM APP里所有数据库表
    
	# 可以查看每张表里所有的数据
    'crm_table_list': ['table_obj_list', 'GET', [], {}],  
    # 'crm_table_list': ['table_obj_list', 'GET', [], {'source':0,'status':0}],  # 添加参数：只能访问来源是qq和未报名的客户
    # 可以访问表里每条数据的修改页
    'crm_table_list_view': ['table_obj_change',  'GET', [], {}],  
    # 可以对表里的每条数据进行修改
    'crm_table_list_change': ['table_obj_change', 'POST', [], {}],  
    # 可以访问数据增加页
    'crm_table_list_add_view': ['table_obj_add ',  'GET', [], {}],
    # 可以添加表数据
    'crm_table_list_add': ['table_obj_add ', 'POST', [], {}],  

}
```



***per_name和split用法**

```python
> a,*b,c=[1,2,3,4,5,6]
>a
1
>c
6
>b
[2,3,4,5]
```

```python
>>>a='crm_table_list'
>>>a.split('_')
['crm','table','list']
>>>
>>>app_name,*per_name=a.split('_')
>>>
>>>app_name
'crm'
>>>per_name
# 权限
['table','list']
```

