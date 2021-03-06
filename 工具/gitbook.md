# gitbook

[TOC]

## 自动生成`SUMMARY.md`

### 方法一

`book.json`中加入

```json
{
        "title" : "公共服务组文档库",
        "theme-default": {
            "showLevel": true
        },
        "plugins": ["summary", "toggle-chapters", "theme-comscore"]
    }
```

插件说明

Summary：自动生成SUMMARY.md

toggle-chapters： 菜单可折叠

Theme-comscore: 主题插件 修改表格与标题颜色

**注意事项**

1. 每个新增的目录中加入README.md否则菜单则为不可折叠
2. 同个目录下的文件采用自然排序来决定菜单生成的前后顺序, 故在文件或目录前加入 "数字-" 如 "0-" 或 "1-" 来排序菜单的前后顺序.
3. 菜单由目录自动生成, 菜单名称依赖md文件中的标题, 故每个md文件中必须添加标题, 否则无法生成目录.

### 方法二

使用自动化生成工具`summarybuilder`

安装

```bash
npm i -g summarybuilder
```

使用

<center><img src="http://qiniu.s001.xin/21okr.jpg" width=600></center>

## 定制化插件

创建`book.json`

```bash
touch book.json
vi book.json
```

复制

```json
{
    "title": "GitBook 使用教程",
    "description": "记录 GitBook 的配置和一些插件的使用",
    "author": "zhaishen",
    "output.name": "site",
    "language": "zh-hans",
    "gitbook": "3.2.3",
    "root": ".",
    "structure": {
        "readme": "SUMMARY.md"
    },
    "links": {
        "sidebar": {
            "Home": "https://oj.s001.xin"
        }
    },
    "plugins": [
        "-lunr",
        "-search",
        "-highlight",
        "-livereload",
        "search-plus@^0.0.11",
        "simple-page-toc@^0.1.1",
        "github@^2.0.0",
        "github-buttons@2.1.0",
        "edit-link@^2.0.2",
        "disqus@^0.1.0",
        "advanced-emoji@^0.2.1",
        "anchors@^0.7.1",
        "include-codeblock@^3.0.2",
        "ace@^0.3.2",
        "emphasize@^1.1.0",
        "katex@^1.1.3",
        "splitter@^0.0.8",
        "mermaid-gb3@2.1.0",
        "tbfed-pagefooter@^0.0.1",
        "expandable-chapters-small@^0.1.7",
        "sectionx@^3.1.0",
        "local-video@^1.0.1",
        "sitemap-general@^0.1.1",
        "anchor-navigation-ex@0.1.8",
        "favicon@^0.0.2",
        "todo@^0.1.3",
        "3-ba@^0.9.0",
        "terminal@^0.3.2",
        "alerts@^0.2.0",
        "include-csv@^0.1.0",
        "puml@^1.0.1",
        "musicxml@^1.0.2",
        "klipse@^1.2.0",
        "versions-select@^0.1.1",
        "-sharing",
        "sharing-plus@^0.0.2",
        "graph@^0.1.0",
        "chart@^0.2.0"
    ],
    "pluginsConfig": {
        "theme-default": {
            "showLevel": true
        },
        "disqus": {
            "shortName": "gitbookuse"
        },
        "github": {
            "url": "https://github.com/ZHAISHENKING/book.git"
        },
        "include-codeblock": {
            "template": "ace",
            "unindent": true,
            "edit": true
        },
        "sharing": {
           "douban": false,
           "facebook": false,
           "google": true,
           "hatenaBookmark": false,
           "instapaper": false,
           "line": false,
           "linkedin": true,
           "messenger": false,
           "pocket": false,
           "qq": false,
           "qzone": false,
           "stumbleupon": false,
           "twitter": false,
           "viber": false,
           "vk": false,
           "weibo": true,
           "whatsapp": false,
           "all": [
               "facebook", "google", "twitter",
               "weibo", "instapaper", "linkedin",
               "pocket", "stumbleupon", "qq", "qzone"
           ]
        },
        "tbfed-pagefooter": {
            "copyright": "Copyright © housegod.cn 2018",
            "modify_label": "该文件修订时间：",
            "modify_format": "YYYY-MM-DD HH:mm:ss"
        },
        "3-ba": {
            "token": "ff100361cdce95dd4c8fb96b4009f7bc"
        },
        "simple-page-toc": {
            "maxDepth": 3,
            "skipFirstH1": true
        },
        "edit-link": {
            "base": "https://github.com/ZHAISHENKING/book/edit/master",
            "label": "编辑本页"
        },
        "sitemap-general": {
            "prefix": "http://gitbook.zhangjikai.com"
        },
        "anchor-navigation-ex": {
            "isRewritePageTitle": false,
            "tocLevel1Icon": "fa fa-hand-o-right",
            "tocLevel2Icon": "fa fa-hand-o-right",
            "tocLevel3Icon": "fa fa-hand-o-right"
        },
        "sectionx": {
            "tag": "b"
        },
        "favicon": {
            "shortcut": "favicon.ico",
            "bookmark": "favicon.ico"
        },
        "terminal": {
            "copyButtons": true,
            "fade": false,
            "style": "flat"
        }
    }
}

```

执行`gitbook install`

## 部署

创建`gh-pages`分支

```bash
git checkout --orphan gh-pages
git rm -f --cached -r .
git clean -df
rm -rf *~
```

执行完上面操作，目录下就剩`_book`目录了

添加忽略文件

```bash
echo "*~" > .gitignore
echo "_book" >> .gitignore
git add .gitignore
git commit -m "ignore files"
```

加入_book下的文件到分支

```bash
cp -r _book/* .
git add .
git commit -m "publish book"
```

上传

```bash
git push -u origin gh-pages
```

