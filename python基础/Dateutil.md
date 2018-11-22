#Dateutil

rrulestr

- INTERVAL: 每隔一段时间
- DTSTART: 规则开始时间
- COUNT: 执行次数

rrule

- freq: 单位	YEARLY, MONTHLY, WEEKLY,DAILY, HOURLY, MINUTELY, SECONDLY

- interval 每隔一段时间(需配合执行时间单位,DAY/WEEKDAY/MONTH等)
- dtstart:  开始时间
- until: 结束时间
- byweekday：执行的星期

- wkst： 周开始时间



测试数据

```bash
from util.common import *
lesson_time("2018/09/;2/9:00;3/13:00;5/13:00","2018/08/22 16:26",20)

```

```python
Lessons.objects(num=str(lesson_num)).first()
StudentApplies.objects(lessonid=str(lesson["id"]))
TeacherApplies.objects(
            Q(unionid=data["teacher"]["unionid"]) & Q(courseid=course)
        ).first()
```

