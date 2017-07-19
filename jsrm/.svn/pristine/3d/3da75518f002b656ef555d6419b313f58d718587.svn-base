function html5MultUpload(_fileId, _busiId, _busiType,  _callback) {
    var url_uploadFileInit = getBasePath()+"/fileUpload/getChunkedFileSize";
    var url_uploadToserver = getBasePath()+"/fileUpload/appendUpload2Server";
    var url_getFileInfo = getBasePath()+"/fileUpload/getFileInfo";

    var busiId = _busiId;          //业务id
    var busiType = _busiType;      //业务类型

    var md5Code = null;           //文件md5Code

    var paragraph = 1024*1024*20;      //每次分片传输文件的大小 默认2M
    var blob = null;                 //分片数据的载体Blob对象
    var fileList = null;             //传输的文件
    var uploadState = 0;             // 0: 无上传/取消， 1： 上传中， 2： 暂停，  3：检查中, 4：检查失败, 5:上传完成, 6:上传中
    var uploadMsg = null;           //消息
    var fileId = _fileId;           //input type="file" id
    var fileName = null;           //上传文件名称
    var fileSize = null;           //上传文件大小

    /** 文件属性 */
    var id = null;              //file id
    var fileFormat = null;      //文件格式
    var filePath = null;        //文件路径
    var fileReName = null;      //文件别名
    /** 文件属性 */

    var percentComplete = 0;    //上传百分比
    var checkComplete = 0;      //检测百分比

    var callBack = _callback;
    var uploadObj = {
        upload : function(){            //开始上传
            uploadFiles();
        },
        pause:function () {             //暂停上传
            pauseUpload();
        },
        uploadState : function () {     //获取文件状态
            return uploadState;
        },
        checkFile :function () {
            checkFile();
        },
        setBusiId :function (_busiId) {
            busiId = _busiId;
        },
        setBusiType :function (_busiType) {
            busiType = _busiType;
        },
        getFileName :function () {
            return fileName;
        },
        getFileSize :function () {
            return fileSize;
        }
    };

    init();         //初始化

    /**
     * 调用上传初始化方法
     * @param fileId
     */
    function init() {
        document.getElementById(fileId).addEventListener("change", fileSelected);       //添加onChange事件
        callBack.call(this, {fileName: fileName, fileSize:fileSize, uploadState:uploadState});
    }

    /**
     * 检测文件
     */
    function checkFile() {

        var file = fileList.files[0];

        if(file.size <= 0) {      //如果文件大小为0
            uploadState = 4;        //检测失败
            callBack.call(this, {uploadState: uploadState});
            return;
        }
        fileMD5();        //计算md5值
    }

    /**
     * 获取上传附件信息
     */
    function getFileInfo() {

        $.ajax({
            type:"post",
            url:url_getFileInfo,
            async: false,
            dataType:"json",
            data:{"fileName":file.name,"fileSize":file.size,"relateId":busiId, "relateType":busiType , "MD5Code": md5Code+"-"+busiId},
            success:function (data) {
                fileName = data.fileName;
                fileSize = data.fileSize;
                id = data.id;
                fileFormat = data.fileFormat;
                filePath = data.filePath;
                fileReName = data.fileReName;
            },
            error:function () {
                console.log("获取数据失败！！");
            }
        })
    }
    
    /**
     * 开始上传
     */
    function uploadFiles(){
        console.log("md5Code" + md5Code);

        if(id=='' || id==undefined) {         //如果id为空，则返回检测失败状态
            uploadState = 4;
            callBack.call(this, {uploadState: uploadState});
        }
        if(uploadState == 1) {      //文件可上传
            uploadState = 6;        //上传中
            // if(fileList.files.length>0){
            //     for(var i = 0; i< fileList.files.length; i++){
                    var file = fileList.files[0];
                    uploadFileInit(file,0);
                // }
            }
        // }
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
            //获取当前文件已经上传大小
            jQuery.post(url_uploadFileInit,{"fileName":encodeURIComponent(file.name),"fileSize":file.size, "id":id, "MD5Code": md5Code+"-"+busiId, "filePath":filePath, "fileReName":fileReName, "relateId":busiId},
                function(data){
                    if(data.fileLength != -1){
                        endSize = Number(data.fileLength);
                    }
                    uploadFile(file,startSize,endSize,i);
                }
            );
        }
    }

    /**
     * 分片上传文件
     */
    function uploadFile(file,startSize,endSize,i) {
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
                        // alert("出错了");
                        window.history.go(-1);
                        uploadMsg = "上传出错，服务器相应错误！";
                    }
                }
            };
            xhr.open("POST",url_uploadToserver + "?fileName=" + encodeURIComponent(file.name)+"&fileSize="+file.size+"&MD5Code="+md5Code+"-"+busiId+"&fileFormat="+fileFormat+"&filePath="+filePath+"&fileReName="+fileReName+"&relateId="+busiId+"&relateType="+busiType, true);     //创建回调方法
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
        }
    }

    /**
     * 显示处理进程
     */
    function uploadProgress(file,startSize,uploadLen,i) {
        percentComplete = Math.round(uploadLen * 100 / file.size / 2); //计算上传百分比

        callBack.call(this, {percentComplete: percentComplete, uploadState: uploadState});
        if(uploadState == 6){       //续传
            uploadFile(file,startSize,uploadLen,i);
        }

        if(percentComplete == 50) {
            uploadState = 5;
            callBack.call(this, {uploadState: uploadState});
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

                callBack.call(this, {fileName: fileName, fileSize:fileSize, uploadState:uploadState});
            }
        }
    }

    /**
     * 计算fileMD5值
     * @constructor
     */
    function fileMD5() {
        uploadState = 3;        //检测中
        callBack.call(this, {uploadState:uploadState});

        var fileReader = new FileReader();      //声明必要的变量
        //文件分割方法（注意兼容性）
        var blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice;
        var file = fileList.files[0];

        var chunks = Math.ceil(file.size / paragraph);     //按2M分割多少块
        var currentChunk = 0;

        var spark = new SparkMD5();             //创建md5对象（基于SparkMD5）

        //每块文件读取完毕之后的处理
        fileReader.onload = function(e) {
            console.log("读取文件", currentChunk + 1, "/", chunks);
            spark.appendBinary(e.target.result);        //每块交由sparkMD5进行计算
            currentChunk ++;

            if (currentChunk < chunks) {                //如果文件处理完成计算MD5，如果还有分片继续处理
                loadNext();
            } else {
                console.log("finished loading");
                console.info("计算的Hash", spark.end());
                md5Code = spark.end();      //md5Code

                getFileInfo();              //获取文件信息

                uploadState = 1;        //上传
                callBack.call(this, {uploadState:uploadState});
            }
        };

        /**
         * 加载文件
         */
        function loadNext() {
            var start = currentChunk * paragraph, end = start + paragraph >= file.size ? file.size : start + paragraph;

            checkComplete = Math.round((currentChunk+1) * 100 / chunks); //计算上传百分比
            callBack.call(this, {checkComplete:checkComplete, uploadState: uploadState});

            fileReader.readAsBinaryString(blobSlice.call(file, start, end));
        }

        loadNext();
    }


    return uploadObj;
}