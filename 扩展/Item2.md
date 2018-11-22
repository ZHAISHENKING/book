#Item2

> 修改mac上的终端配色

1. 安装

```python
brew cask install iterm2
```

2. 配置主题

- iTerm2 最常用的主题是 Solarized Dark theme，下载地址：<http://ethanschoonover.com/solarized>
- 打开 iTerm2，按`Command + ,`键，
- 打开 Preferences 配置界面，然后Profiles -> Colors -> Color Presets -> Import`，选择刚才解压的solarized->iterm2-colors-solarized->Solarized Dark.itermcolors文件，导入成功，最后选择 Solarized Dark 主题，就可以了。

<img src="https://images2017.cnblogs.com/blog/435188/201712/435188-20171228124549144-520902143.png">

3. 配置oh my zsh

> Oh My Zsh 是对主题的进一步扩展，地址：<https://github.com/robbyrussell/oh-my-zsh>

- 一键安装

```ruby
$ sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

- 安装好之后，需要把 Zsh 设置为当前用户的默认 Shell（这样新建标签的时候才会使用 Zsh）：

```ruby
$ chsh -s /bin/zsh
# 如果影响正常使用要切回
$ chsh -s /bin/bash
# 使用时直接执行
/bin/bash
```

- 然后，我们编辑`vim ~/.zshrc`文件，将主题配置修改为`ZSH_THEME="agnoster"`

<img src="https://images2017.cnblogs.com/blog/435188/201712/435188-20171228124617863-587540558.png">

4. 配置字体

   由于上面主题需要字体支持 所以我们需要下载字体

   字体下载地址：[Meslo LG M Regular for Powerline.ttf](https://github.com/powerline/fonts/blob/master/Meslo%20Slashed/Meslo%20LG%20M%20Regular%20for%20Powerline.ttf)

   下载好之后，直接在 Mac OS 中安装即可。

   然后打开 iTerm2，按`Command + ,`键，打开 Preferences 配置界面，然后Profiles -> Text -> Font -> Chanage Font，选择 Meslo LG M Regular for Powerline 字体

<img src="https://images2017.cnblogs.com/blog/435188/201712/435188-20171228124638503-196536251.png">

5. 声明高亮

**使用brew 安装**

```ruby
$ brew install zsh-syntax-highlighting
```

编辑`vim ~/.zshrc`文件 最后一行添加

```python
source /usr/local/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
```

<img src="https://images2017.cnblogs.com/blog/435188/201712/435188-20171228124702378-701306768.png">

