route页面修改

```
# 主页
docs.add_resource(Index, '/', endpoint="index")
# 登录
docs.add_resource(LoginView, '/login/', endpoint="login")
# 退出登录
docs.add_resource(LogoutView, '/logout/', endpoint="logout")
# 老师申请
docs.add_resource(TeacherSubmitApply, '/teacher/submit_apply/', endpoint='teacher_apply')
# 学生申请
docs.add_resource(StudentSubmitApply, '/student/submit_apply/', endpoint='student_apply')
# 预约试听课
docs.add_resource(SubmitSurvey, '/user/submit_survey/', endpoint='user_survery')
# 获取该课时下的所有学生申请
docs.add_resource(GetAllStudentApplies, '/admin/all_student_applies/<lesson_num>', endpoint='all_student_applies')
# 获取该课时下的所有老师申请
docs.add_resource(GetAllTeacherApplies, '/admin/all_teacher_applies/<lesson_num>', endpoint='all_teacher_applies')
# 创建课时
docs.add_resource(CreateLesson, '/admin/lession/', endpoint='lession')
# 获取所有学生
docs.add_resource(GetAllUser, '/student/all/', endpoint="all_user")
# 创建时间模版
docs.add_resource(CreateTiemTemplate, '/admin/create_template/', endpoint='create_template')
# 添加学生
docs.add_resource(AddStudent, '/student/', endpoint="add_student", verbose="")
# 添加老师
docs.add_resource(AddStudent, '/teacher/', endpoint="add_teacher", verbose="添加老师")
```