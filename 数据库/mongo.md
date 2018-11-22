mongo ORM字段

BinaryField

BooleanField

ComplexDateTimeField

DateTimeField

DecimalField

DictField

DynamicField

EmailField

EmbeddedDocumentField

FileField

FloatField

GenericEmbeddedDocumentField

GenericReferenceField

GeoPointField

ImageField

IntField

ListField

MapField

ObjectIdField

ReferenceField

SequenceField

SortedListField

StringField

URLField

UUIDField



```python
app = create_app()
# 让python支持命令行工作
manager = Manager(app)
migrate = Migrate(app, db)
# 添加迁移脚本的命令到manager中
manager.add_command('db', MigrateCommand)


if __name__ == '__main__':
    manager.run()
```





```
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from v1.app import create_app
from v1.models import db, StudentInfo


app = create_app()
# 让python支持命令行工作
manager = Manager(app)


@manager.command
def create_student():
    name = 'student'
    student = StudentInfo(name=name)
    student.save()
    print('创建成功')


if __name__ == '__main__':
    app = create_app()
    app.debug = True
    app.run(host='0.0.0.0', port=12341)
```