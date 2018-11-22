# iSurvey

问卷调查项目

## models设计

### User    用户表 __tablename__ = users

        '''
        某个用户下所有的调查表
        建立一个1对n的关系
        surveys代表当前用户天蝎的所有问卷调查
        surveys = db.relationship('Survey',backref='creator')
        user.surveys可以获得当前用户所有的问卷调查
        '''
### Survey  调查表  __tablename__ = surveys

```
    '''
    questions = db.relationship('Question',backref='survey')
    # survey.questions 可以获得某个调查表中的所有question
    creator_id = ...ForeignKey('users.id')
    survey.creator可以获得当前问卷调查对应的user
    name #调查表名字
    '''
```

### Question 问题表 __tablename__ = questions

```
    '''
    survey_id = .... ForeignKey('surveys.id') # 标识该问题所属的调查表
    content
    created_at
    choise # 问题选项
    
    '''
```

### Choise   选项表 __tablename_ = choises

```
	'''
    id
    content
    is_selected #是否被选中
    create # 创建时间
    # 标示该选项所属的问题
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'))
    '''
```

