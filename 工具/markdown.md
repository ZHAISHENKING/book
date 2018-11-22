> 前言：markdown在django中的配置与使用

### 1. 安装

```ruby
 pip install markdown
```

### 2. 视图中渲染

> 例：Article中定义text，想要渲染text

```python
blog/views.py

import markdown
from django.shortcuts import render, get_object_or_404
from .models import Article

def detail(request, pk):
    article = get_object_or_404(Article, pk=pk)
    # 记得在顶部引入 markdown 模块
    article.text = markdown.markdown(article.text,
                                  extensions=[
                                     'markdown.extensions.extra',
                                     'markdown.extensions.codehilite',
                                     'markdown.extensions.toc',
                                  ])
    return render(request, 'blog/detail.html', context={'article': article})
```

说明一下，这里用到了`markdown.extensions`函数, 

- `extra`本身包含很多扩展
- `codehilite`是语法高亮
- `toc`是自动生成目录

### 3. safe标签

我们在发布的文章详情页没有看到预期的效果，而是类似于一堆乱码一样的 HTML 标签，这些标签本应该在浏览器显示它本身的格式，但是 Django 出于安全方面的考虑，任何的 HTML 代码在 Django 的模板中都会被转义（即显示原始的 HTML 代码，而不是经浏览器渲染后的格式）。为了解除转义，只需在模板标签使用 `safe` 过滤器即可，告诉 Django，这段文本是安全的，你什么也不用做。在模板中找到展示博客文章主体的 `{{ article.text }}` 部分，为其加上 `safe` 过滤器，**{{ article.text|safe }}**，大功告成，这下看到预期效果了。



 `safe` 是 Django 模板系统中的过滤器（`Filter`），可以简单地把它看成是一种函数，其作用是作用于模板变量，将模板变量的值变为经过滤器处理过后的值。例如这里 {{ article.text|safe }}，本来 {{article.text }} 经模板系统渲染后应该显示 body 本身的值，但是在后面加上 safe 过滤器后，渲染的值不再是text 本身的值，而是由 safe 函数处理后返回的值。过滤器的用法是在模板变量后加一个 | 管道符号，再加上过滤器的名称。可以连续使用多个过滤器，例如` {{ var|filter1|filter2 }}`。

### 4. 代码高亮

&ensp;&ensp;程序员写博客免不了要插入一些代码，Markdown 的语法使我们容易地书写代码块，但是目前来说，显示的代码块里的代码没有任何颜色，很不美观，也难以阅读，要是能够像我们的编辑器里一样让代码高亮就好了。虽然我们在渲染时使用了` codehilite` 拓展，但这只是实现代码高亮的第一步，还需要简单的几步才能达到我们的最终目的。

1. 安装Pygments

首先我们需要安装 Pygments，**激活虚拟环境**，运行： `pip install Pygments` 安装即可。

搞定了，虽然我们除了安装了一下 Pygments 什么也没做，但 Markdown 使用 Pygments 在后台为我们做了很多事。如果你打开博客详情页，找到一段代码段，在浏览器查看这段代码段的 HTML 源代码，可以发现 Pygments 的工作原理是把代码切分成一个个单词，然后为这些单词添加 css 样式，不同的词应用不同的样式，这样就实现了代码颜色的区分，即高亮了语法。为此，还差最后一步，引入一个样式文件来给这些被添加了样式的单词定义颜色。

2. 引入样式文件

`pygmentize -f html -a .codehilite -S darcula > darcula.css` 该命令会在命令路径下生成.css文件，在html文件可以引用，其中default是默认，也可以换成monokai github等，生成的就是对应主题的.css 文件

```html
templates/base.html

...
<link rel="stylesheet" href="{% static 'blog/css/pace.css' %}">
<link rel="stylesheet" href="{% static 'blog/css/custom.css' %}">
...
<link rel="stylesheet" href="{% static 'blog/css/highlights/github.css' %}">
```

**注意**：如果你按照教程中的方法做完后发现代码依然没有高亮，请依次检查以下步骤：

1. 确保在渲染文本时添加了 `markdown.extensions.codehilite` 拓展，详情见上文。
2. 确保安装了 Pygments。
3. 确保代码块的 Markdown 语法正确，**特别是指明该代码块的语言类型**，具体请参见上文中 Markdown 的语法示例。
4. 在浏览器端代码块的源代码，看代码是否被 pre 标签包裹，并且代码的每一个单词都被 span 标签包裹，且有一个 class 属性值。如果没有，极有可能是前三步中某个地方出了问题。
5. 确保用于代码高亮的样式文件被正确地引入，具体请参见上文中引入样式文件的讲解。
6. 有些样式文件可能对代码高亮没有作用，首先尝试用 github.css 样式文件做测试。

 