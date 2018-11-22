#Celery

- 什么是celery
- 如何使用

### 什么是celery

Celery 是一个异步任务队列。你可以使用它在你的应用上下文之外执行任务。总的想法就是你的应用程序可能需要执行任何消耗资源的任务都可以交给任务队列，让你的应用程序自由和快速地响应客户端请求。

通过Celery在后台跑任务并不像用线程那么的简单，但是用Celery的话，能够使应用有较好的可扩展性，因为Celery是个分布式架构。下面介绍Celery的三个核心组件。

1. 生产者(Celery client)。生产者(Celery client)发送消息。在Flask上工作时，生产者(Celery client)在Flask应用内运行。
2. 消费者(Celery workers)。消费者用于处理后台任务。消费者(Celery client)可以是本地的也可以是远程的。我们可以在运行Flask的server上运行一个单一的消费者(Celery workers)，当业务量上涨之后再去添加更多消费者(Celery workers)。
3. 消息传递者(message broker)。生产者(Celery client)和消费者(Celery workers)的信息的交互使用的是消息队列(message queue)。Celery支持若干方式的消息队列，其中最常用的是[RabbitMQ](http://www.rabbitmq.com/)和[Redis](http://redis.io/).

### Flask中使用Celery

Flask与Celery结合极其简单，无需其他扩展。一个使用Celery的Flask应用的初始化过程如下：通过创建Celery类的对象，完成Celery的初始化。创建Celery对象时，需要传递应用的名称以及消息传递者(message broker)的URL。

教程入口：	<a href="http://www.pythondoc.com/flask-celery/first.html">celery基本介绍</a>



```
# connect('ultrabear_courses',username='jamie',password='jamie199469',host='127.0.0.1',port=27676,serverSelectionTimeoutMS=3)
```



