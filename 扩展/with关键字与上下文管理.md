# with关键字与上下文管理

如果你有阅读源码的习惯，可能会看到一些优秀的代码经常出现带有 “with” 关键字的语句，它通常用在什么场景呢？今天就来说说 with 和 上下文管理器。

对于系统资源如文件、数据库连接、socket 而言，应用程序打开这些资源并执行完业务逻辑之后，必须做的一件事就是要关闭（断开）该资源。

比如 Python 程序打开一个文件，往文件中写内容，写完之后，就要关闭该文件，否则会出现什么情况呢？极端情况下会出现 "Too many open files" 的错误，因为系统允许你打开的最大文件数量是有限的。

同样，对于数据库，如果连接数过多而没有及时关闭的话，就可能会出现 "Can not connect to MySQL server Too many connections"，因为数据库连接是一种非常昂贵的资源，不可能无限制的被创建。

来看看如何正确关闭一个文件。

**普通版：**

```python
def m1():
    f = open("output.txt", "w")
    f.write("python之禅")
    f.close()
```

这样写有一个潜在的问题，如果在调用 write 的过程中，出现了异常进而导致后续代码无法继续执行，close 方法无法被正常调用，因此资源就会一直被该程序占用而无法被释放。那么该如何改进代码呢？

**进阶版：**

```python
def m2():
    f = open("output.txt", "w")
    try:
        f.write("python之禅")
    except IOError:
        print("oops error")
    finally:
        f.close()
```

改良版本的程序是对可能发生异常的代码处进行 try 捕获，使用 try/finally 语句，该语句表示如果在 try 代码块中程序出现了异常，后续代码就不再执行，而直接跳转到 except 代码块。而无论如何，finally 块的代码最终都会被执行。因此，只要把 close 放在 finally 代码中，文件就一定会关闭。

**高级版：**

```python
def m3():
    with open("output.txt", "w") as f:
        f.write("Python之禅")
```

一种更加简洁、优雅的方式就是用 with 关键字。open 方法的返回值赋值给变量 f，当离开 with 代码块的时候，系统会自动调用 f.close() 方法， with 的作用和使用 try/finally 语句是一样的。那么它的实现原理是什么？在讲 with 的原理前要涉及到另外一个概念，就是上下文管理器（Context Manager）。

**上下文管理器**

任何实现了 *__enter__()* 和 *__exit__()* 方法的对象都可称之为上下文管理器，上下文管理器对象可以使用 with 关键字。显然，文件（file）对象也实现了上下文管理器。

那么文件对象是如何实现这两个方法的呢？我们可以模拟实现一个自己的文件类，让该类实现 *__enter__()* 和 *__exit__()* 方法。

```python
class File():

    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode

    def __enter__(self):
        print("entering")
        self.f = open(self.filename, self.mode)
        return self.f

    def __exit__(self, *args):
        print("will exit")
        self.f.close()
```

*__enter__()* 方法返回资源对象，这里就是你将要打开的那个文件对象，*__exit__()* 方法处理一些清除工作。

因为 File 类实现了上下文管理器，现在就可以使用 with 语句了。

```python
with File('out.txt', 'w') as f:
    print("writing")
    f.write('hello, python')
```

这样，你就无需显示地调用 close 方法了，由系统自动去调用，哪怕中间遇到异常 close 方法也会被调用。

**contextlib**

Python 还提供了一个 contextmanager 的装饰器，更进一步简化了上下文管理器的实现方式。通过 yield 将函数分割成两部分，yield 之前的语句在 *__enter__* 方法中执行，yield 之后的语句在 *__exit__* 方法中执行。紧跟在 yield 后面的值是函数的返回值。

```python
from contextlib import contextmanager

@contextmanager
def my_open(path, mode):
    f = open(path, mode)
    yield f
    f.close()
```

调用

```python
with my_open('out.txt', 'w') as f:
    f.write("hello , the simplest context manager")
```

**总结**

Python 提供了 with 语法用于简化资源操作的后续清除操作，是 try/finally 的替代方法，实现原理建立在上下文管理器之上。此外，Python 还提供了一个 contextmanager 装饰器，更进一步简化上下管理器的实现方式。



 