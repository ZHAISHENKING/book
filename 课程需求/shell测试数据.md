# shell测试数据



```python
from apply.models import *
from users.models import *
from courses.models import *

User(name="admin",hash="admin",phone="18700790825",email="18700790825@163.com",year="1993",gender=1,map="1").save()

Teacher(name="xiaohua",courses="",time_slots="").save()

StudentArchives(
    user="userid",
    room_id="",
    class_num=0,
    comments=[],
    homework=""
).save()




```

