# node-modules-custom

Node.js 内置模块：`fs.writeFile`、`fs.writeFileSync`、`fs.mkdirSync`自定义改装。

> 经常会进行批量写入、追加操作，但当目录不存在时（且目录层级多时）往往会报错并终止运行，我希望可以尽量避免或者减少出现在路径问题上发生的错误回调，仅此而已。

## Updates

### v1.0.6

新增：`writeFileSyncLong()`,`writeFileSyncLongBatch()`,作为之前`fs_wfSync()`的替代（貌似它总能某些地方发生错误提示，而且在Unix 上不能准确获取绝对路径）。

## Usage

Install:

 ```
 npm install --save node-modules-custom
 ```

Example:
 ```JavaScript
 const myWriteFile = require('node-modules-custom');

 //.....

// If a.txt didn't exist will create it,else add the content:'hello' to it.

myWriteFile.fs_wfSync('a.txt','hello',true,{flag:"a"});
 

// If a.txt didn't exist will create it,else rewrite it.

myWriteFile.fs_wfSync('a.txt','hello',true);


// If a.txt didn't exist will create it,else notring.

myWriteFile.fs_wfSync('a.txt','hello',false);

// Create multi-level directory(as long path)
// Note: Don't add a file name at the end, otherwise the file name will be created as a directory unless you want to do it.
myWriteFile.fs_mkdirSync('a/b/c/d/e/f/g/h/i');


// asynchronous

// If a.txt didn't exist will create it,else notring.

myWriteFile.fs_wf('a.txt','hello',false);
 ```

## APIs

### 1、 .fs_wfSync ( filePath, data, isReplaceAndCover )

>`writeFileSyncLongBatch()` from v1.0.6. 用法和参数基本一致。

`fs.writeFileSync()` 的免报错改进。

 *  `filePath`:  文件路径.
 *  `data`:  内容.
 *  `isReplaceAndCover`: 类型：Boolean;  对于已经存在的文件如何处理，`true`：将会进行处理（怎么处理请参考 `fs.writeFileSync()`的`options:{}`进行）。`false`：则忽略，什么都不做。
 * `options`：arguments[3]  默认值 `{encoding:'utf-8',flag:'w'}` ，当设置为`{flag:'a'}` 的时候将对已经存在的文件执行追加操作。
    > examp：
    >
    >`xxx.fs_wfSync('a.txt','hello',true,{flag:"a"});`
    >
    >`{mode:'0o666'}` 可能带来一些权限问题(不确定)，这里就不指定了。

### 2、 .fs_mkdirSync ( pathString )

`fs.mkdirSync()` 的改进，尽可能避免触发 ‘文件夹已经存在’ 的callback。

* `pathString`: 文件夹路径。

### 3、 .fs_wf(filePath, data, isReplaceAndCover)

 *  `filePath`:  文件路径.
 *  `data`:  内容.
 *  `isReplaceAndCover`: 类型：Boolean;  对于已经存在的文件如何处理，`true`：将会进行处理（怎么处理请参考 `fs.writeFile()`的`options:{}`进行）。`false`：则忽略，什么都不做。
 * `options`：arguments[3]  默认值 `{encoding:'utf-8',flag:'w'}` ，当设置为`{flag:'a'}` 的时候将对已经存在的文件执行追加操作。