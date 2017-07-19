var url_uploadFileInit = "/getChunkedFileSize.do";
var url_uploadToserver = "/appendUpload2Server";

var paragraph = 1024*1024*2;  //每次分片传输文件的大小 默认2M
var blob = null;             //分片数据的载体Blob对象
var fileList = null;         //传输的文件
var uploadState = 0;         // 0: 无上传/取消， 1： 上传中， 2： 暂停
var uploadMsg = null;       //消息

var fileId = null;          //input type="file" id
var fileName = null;        //上传文件名称
var fileSize = null;        //上传文件大小
var percentComplete = 0;    //上传百分比

var callBack = null;
var uploadObj = {
    upload : function(){            //开始上传
        uploadFiles();
    },
    pause:function () {             //暂停上传
        pauseUpload();
    }
};

/**
 * 调用上传初始化方法
 * @param fileId
 */
function uploadInit(_fileId, _callback) {
    fileId = _fileId;

    document.getElementById(fileId).addEventListener("change", fileSelected);       //添加onChange事件

    callBack = _callback;

    return uploadObj;
}

/**
 * 开始上传
 */
function uploadFiles(){
    uploadState = 1;            //将上传状态设置成1
    if(fileList.files.length>0){
        for(var i = 0; i< fileList.files.length; i++){
            var file = fileList.files[i];
            uploadFileInit(file,i);
        }
    }
}

/**
 * 获取服务器文件大小，开始续传
 * @param file
 * @param i
 */
function uploadFileInit(file,i){
    if(file){
        var startSize = 0;
        var endSize = 0;
        var date = file.lastModifiedDate;
        var lastModifyTime = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+"-"
            +date.getHours()+"-"+date.getMinutes()+"-"+date.getSeconds()
        //获取当前文件已经上传大小
        jQuery.post(url_uploadFileInit,{"fileName":encodeURIComponent(file.name),"fileSize":file.size,"lastModifyTime":lastModifyTime, "chunkedFileSize":"chunkedFileSize"},
            function(data){
                if(data.fileLength != -1){
                    endSize = Number(data.fileLength);
                }
                uploadFile(file,startSize,endSize,i);
            });

    }
}

/**
 * 分片上传文件
 */
function uploadFile(file,startSize,endSize,i) {
    var date = file.lastModifiedDate;
    var lastModifyTime = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+"-"
        +date.getHours()+"-"+date.getMinutes()+"-"+date.getSeconds()
    var reader = new FileReader();
    reader.onload = function loaded(evt) {
        // 构造 xmlHttpRequest 对象，发送文件 Binary 数据
        var xhr = new XMLHttpRequest();
        xhr.sendAsBinary = function(text){
            var data = new ArrayBuffer(text.length);
            var ui8a = new Uint8Array(data, 0);
            for (var i = 0; i < text.length; i++) ui8a[i] = (text.charCodeAt(i) & 0xff);
            this.send(ui8a);
        }

        xhr.onreadystatechange = function(){
            if(xhr.readyState==4){
                if(xhr.status==200){                //表示服务器的相应代码是200；正确返回了数据
                    var message=xhr.responseText;   //纯文本数据的接受方法
                    message = Number(message);
                    uploadProgress(file,startSize,message,i);
                } else{
                    uploadMsg = "上传出错，服务器相应错误！";
                }
            }
        };
        xhr.open("POST",url_uploadToserver + "?fileName=" + encodeURIComponent(file.name)+"&fileSize="+file.size+"&lastModifyTime="+lastModifyTime, false);     //创建回调方法
        xhr.overrideMimeType("application/octet-stream;charset=utf-8");
        xhr.sendAsBinary(evt.target.result);
    };
    if(endSize < file.size){
        startSize = endSize;        //处理文件发送（字节）
        if(paragraph > (file.size - endSize)){
            endSize = file.size;
        }else{
            endSize += paragraph ;
        }
        if (file.webkitSlice) {     //webkit浏览器
            blob = file.webkitSlice(startSize, endSize);
        }else {
            blob = file.slice(startSize, endSize);
        }
        reader.readAsBinaryString(blob);
    }else{
        // document.getElementById('progressNumber'+i).innerHTML = '100%';
    }
}

/**
 * 显示处理进程
 */
function uploadProgress(file,startSize,uploadLen,i) {
    percentComplete = Math.round(uploadLen * 100 / file.size); //计算上传百分比

    callBack.call(this, {fileName: fileName, fileSize:fileSize, percentComplete: percentComplete});
    if(uploadState == 1){       //续传
        uploadFile(file,startSize,uploadLen,i);
    }
}

/**
 * 暂停上传
 */
function pauseUpload(){
    uploadState = 2;
}

/**
 * 选择文件之后触发事件
 */
function fileSelected() {
    fileList = document.getElementById(fileId);
    var length = fileList.files.length;
    for(var i=0; i<length; i++){
        file = fileList.files[i];
        if(file){
            var _fileSize = 0;
            if (file.size > 1024 * 1024)
                _fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
            else
                _fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
            fileName =  file.name;
            fileSize = _fileSize;

            callBack.call(this, {fileName: fileName, fileSize:fileSize, percentComplete: percentComplete});
        }
    }
}