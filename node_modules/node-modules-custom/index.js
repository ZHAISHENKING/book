const fs = require('fs');
const path = require('path');
const os = require('os').type();

function cs_fs_wfSync(filePathString, datas) {
    let argms = arguments[2] || { encoding: 'utf8', flag: 'w' };

    if (os == "Windows_NT") {
        let spRegexp = new RegExp(/\\\\/g);
        if (spRegexp.test(filePathString) == false) {
            var fooFPS = filePathString.replace(/\\|\//g, "\\");
        } else {
            var fooFPS = filePathString;
        }
        let fpDirname = path.dirname(fooFPS);
        let pathSeq = fpDirname.split(path.sep);// JSON 化
        var pathJion = [];
        for (let i = 0; i < pathSeq.length; i++) {
            pathJion.push(pathSeq[i]);
            let prfixDir = pathJion.join('/');
            if (fs.existsSync(prfixDir) == false) {
                fs.mkdirSync(prfixDir);
            }
        }
        fs.writeFileSync(filePathString, datas, argms);
    } else {
        var fooFPS = filePathString;
        let fpDirname = path.dirname(fooFPS);
        let pathSeq = fpDirname.split(path.sep);// JSON 化
        var pathJion = [];
        for (let i = 0; i < pathSeq.length; i++) {
            pathJion.push(pathSeq[i]);
            let prfixDir = pathJion.join('/');
            if (fs.existsSync(prfixDir) == false) {
                fs.mkdirSync(prfixDir);
            }
        }
        fs.writeFileSync(filePathString, datas, argms);
    }

}
function cs_fs_wf(filePathString, datas) {
    let argms = arguments[2] || { encoding: 'utf8', flag: 'w' };

    if (os == "Windows_NT") {
        let spRegexp = new RegExp(/\\\\/g);
        if (spRegexp.test(filePathString) == false) {
            var fooFPS = filePathString.replace(/\\|\//g, "\\");
        } else {
            var fooFPS = filePathString;
        }
        let fpDirname = path.dirname(fooFPS);
        let pathSeq = fpDirname.split(path.sep);// JSON 化
        var pathJion = [];
        for (let i = 0; i < pathSeq.length; i++) {
            pathJion.push(pathSeq[i]);
            let prfixDir = pathJion.join('/');
            if (fs.existsSync(prfixDir) == false) {
                fs.mkdirSync(prfixDir);
            }
        }
        fs.writeFile(filePathString, datas, argms,(err)=>{
            if(err){
                console.log(`${err}`)
            }
        });
    } else {
        var fooFPS = filePathString;
        let fpDirname = path.dirname(fooFPS);
        let pathSeq = fpDirname.split(path.sep);// JSON 化
        var pathJion = [];
        for (let i = 0; i < pathSeq.length; i++) {
            pathJion.push(pathSeq[i]);
            let prfixDir = pathJion.join('/');
            if (fs.existsSync(prfixDir) == false) {
                fs.mkdirSync(prfixDir);
            }
        }
        fs.writeFile(filePathString, datas, argms,(err)=>{
            if(err){
                console.log(`${err}`)
            }
        });
    }

}
/**
 * 自定义的 fs.writeFileSync(),试图解决长路径文件不能创建的问题。
 * 
 * 
 * @param {String} filePath 文件路径
 * @param {String} data 内容(当创建文件夹时，可以使用任意值，但必须声明)
 * @param {Boolean} isReplaceAndCover  对于已经存在的文件或文件夹如何处理，true：将会进行覆盖并替换。false：则忽略，什么都不做。
 * @argument {Object} object 默认 {"encoding": "utf8", "flag": "w" }
 * 
 * 
 * 当文件路径的父路径文件夹不存在时创建文件常常会导致写入失败报错(会中断运行)，我们试着先创建文件的父路径目录，最后再创建文件（写入文件）.
 * 
 * 顺便加入是否对已有文件的操作功能：是忽略已存在文件还是直接覆盖。有时候还是有用的，比如批量创建文件的时候。
 * 
 * NOTE: 
 * 
 * 1. 对已有文件进行覆盖、追加，请自行通过添加{encoding:"",flag:"",mode:""}处理。
 * 2. 如果不是长路径还是不要使用这个函数，开发者没有考虑：./x.x 和 x.x 的情况(太懒，不想测试)，不知道能不能创建成功。 
 */
function fs_wfSync(filePath, data, isReplaceAndCover) {
    let options = arguments[3] || {encoding:'utf-8',flag:'w'}; // 用于fs.writeFileSync()的options
    // 判断 filePath 是否已经存在。
    if (fs.existsSync(filePath) == false) {
        cs_fs_wfSync(filePath, data, options);
        //console.log(`${filePath}    创建成功！`)
    } else if (fs.existsSync(filePath) && isReplaceAndCover == true) {
        fs.writeFileSync(filePath, data, options);
        //console.log(`${filePath}    创建成功！`)
    } else if (fs.existsSync(filePath) && isReplaceAndCover == false) {
        // 什么都不做
        console.log(filePath + '    已经存在并忽略.It has already existed and skipped.');
    }
}

/**
 * 自定义的 fs.writeFile(),试图解决长路径文件不能创建的问题。
 * 
 * 
 * @param {String} filePath 文件路径
 * @param {String} data 内容(当创建文件夹时，可以使用任意值，但必须声明)
 * @param {Boolean} isReplaceAndCover  对于已经存在的文件或文件夹如何处理，true：将会进行覆盖并替换。false：则忽略，什么都不做。
 * @argument {Object} object 默认 {"encoding": "utf8", "flag": "w" }
 * 
 * 
 * 当文件路径的父路径文件夹不存在时创建文件常常会导致写入失败报错(会中断运行)，我们试着先创建文件的父路径目录，最后再创建文件（写入文件）.
 * 
 * 顺便加入是否对已有文件的操作功能：是忽略已存在文件还是直接覆盖。有时候还是有用的，比如批量创建文件的时候。
 * 
 * NOTE: 
 * 
 * 1. 对已有文件进行覆盖、追加，请自行通过添加{encoding:"",flag:"",mode:""}处理。
 * 2. 如果不是长路径还是不要使用这个函数，没有考虑：./x.x 和 x.x 的情况(太懒，不想测试)，不知道能不能创建成功。 
 */
function fs_wf(filePath, data, isReplaceAndCover) {
    let options = arguments[3] || {encoding:'utf-8',flag:'w'}; // 用于fs.writeFile()的options
    // 判断 filePath 是否已经存在。
    if (fs.existsSync(filePath) == false) {
        cs_fs_wf(filePath, data, options);
    } else if (fs.existsSync(filePath) && isReplaceAndCover == true) {
        fs.writeFile(filePath, data, options,(err)=>{
            if(err){
                console.log(`${err}`)
            }
        });
    } else if (fs.existsSync(filePath) && isReplaceAndCover == false) {
        // 什么都不做
        console.log(filePath + '    已经存在并忽略.It has already existed and skipped.');
    }
}

/**
 * 
 * 自定义的 fs.mkdirSync()，已经存在的文件夹会跳过,不会触发其callback。
 * 
 * @param {String} pathString 文件夹路径
 * 
 * NOTE:
 * 1. 如果不是长路径，没有必要使用这个函数。
 * 2. 没有设计mode参数，使用 fs.mkdirSync() 的默认值。
 */
function fs_mkdirSync(pathString) {
    if (fs.existsSync(pathString) == false) {
        let prefixdir = path.dirname(pathString);
        if (os == "Windows_NT") {
            let foodir = prefixdir.replace(/\/|\\|\\\\/g, "\\");
            let pathSeq = foodir.split(path.sep);
            let dirs = [];
            for (let i = 0; i < pathSeq.length; i++) {
                dirs.push(pathSeq[i]);
                let pfdir = dirs.join('/');
                if (fs.existsSync(pfdir) == false) {
                    fs.mkdirSync(pfdir);
                }
            }
            fs.mkdirSync(pathString);
        } else {
            let pathSeq = pathString.split(path.sep);
            let dirs = [];
            for (let i = 0; i < pathSeq.length; i++) {
                dirs.push(pathSeq[i]);
                let pfdir = dirs.join('/');
                if (fs.existsSync(pfdir) == false) {
                    fs.mkdirSync(pfdir);
                }
            }
            fs.mkdirSync(pathString);
            //console.log(pathString+'    ok');
        }
    }else{
        console.log(pathString+"    文件夹已经存在，什么都没做。The folders already exist and nothing to do.")
    }

}
/**
 * write a file with long path.
 * 
 * @param {*} filepath file path
 * @param {string} contents content
 * @param {object} param2 options default:{flag:'w',encoding:'utf8'}
 * 
 * WARRING: 
 * 
 *  不要在路径中使用单个“\\”符号作为路径分隔符，不管是Windows_NT系统还是Unix系统，它带来的问题目前无解。正则表达式：'/\\\\/g'无法匹配"\\",我也无能为力。
 *  
 *  其实，这个问题貌似只出现Windows系统，在Unix系统中写代码的时候输入单个"\\"就已经发生了变化(用于转义)，而不像在Windows中允许其作为一个有意义的字符存在。
 */
function writeFileSyncLong(filepath, contents) {
    const options = arguments[2] || { flag: 'w', encoding: 'utf8' };
    let lastPath;
    const pathNormal = path.normalize(filepath);
    if (path.isAbsolute(pathNormal)) {
        lastPath = pathNormal;
    } else {
        lastPath = path.resolve(pathNormal);
    }
    if (fs.existsSync(lastPath)) {
        fs.writeFileSync(lastPath, contents, options);
    } else {
        let prefixPath = [];
        let dir = path.dirname(lastPath);
        let splitPath = dir.split(path.sep)
        if (splitPath[0] == "") {
            splitPath.splice(0, 1, "/");// 将Unix 下的产生的root[""]替换为["/"];
        }
        for (let i = 0; i < splitPath.length; i++) {
            prefixPath.push(splitPath[i]);
            let prefixPaths = prefixPath.join("/");
            if (fs.existsSync(prefixPaths) == false) {
                fs.mkdirSync(prefixPaths);
            }
        }
        fs.writeFileSync(lastPath, contents, options);
    }
}
/**
 * write a file with long path.
 * 
 * @param {*} filepath file path
 * @param {string} contents content
 * @param {boolaen} ctrs 'true' or 'false'.
 * @param {object} param3 options Default:{flag:'w',encoding:'utf8'}
 * 
 *  WARRING: 
 * 
 *  不要在路径中使用单个“\\”符号作为路径分隔符，不管是Windows_NT系统还是Unix系统，它带来的问题目前无解。正则表达式：'/\\\\/g'无法匹配"\\",我也无能为力。
 *  
 *  其实，这个问题貌似只出现Windows系统，在Unix系统中写代码的时候输入单个"\\"就已经发生了变化(用于转义)，而不像在Windows中，允许其作为一个有意义的字符存在。
 */
function writeFileSyncLongBatch(filepath, contents, ctrs) {
    const options = arguments[3] || { flag: 'w', encoding: 'utf8' };
    let lastPath;
    const pathNormal = path.normalize(filepath);
    if (path.isAbsolute(pathNormal)) {
        lastPath = pathNormal;
    } else {
        lastPath = path.resolve(pathNormal);
    }
    if (fs.existsSync(lastPath) && ctrs == true) {
        fs.writeFileSync(lastPath, contents, options);
    } else if (fs.existsSync(lastPath) && ctrs == false) {
        // nothing
    } else {
        let prefixPath = [];
        let dir = path.dirname(lastPath);
        let splitPath = dir.split(path.sep)
        if (splitPath[0] == "") {
            splitPath.splice(0, 1, "/");// 将Unix 下的产生的root[""]替换为["/"];
        }
        for (let i = 0; i < splitPath.length; i++) {
            prefixPath.push(splitPath[i]);
            let prefixPaths = prefixPath.join("/");
            if (fs.existsSync(prefixPaths) == false) {
                fs.mkdirSync(prefixPaths);
            }
        }
        fs.writeFileSync(lastPath, contents, options);
    }
}
module.exports = {
    fs_wfSync,
    fs_wf,
    fs_mkdirSync,
    writeFileSyncLong,
    writeFileSyncLongBatch
}

