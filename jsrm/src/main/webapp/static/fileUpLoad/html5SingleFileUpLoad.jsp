<%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>断点续传文件</title>
    <script type="text/javascript" src="/js/jquery.min.js"> </script>
    <script type="text/javascript" src="../js/lib/upload/html5MultUpload.js"> </script>
    <script type="text/javascript" src="../js/myApp/baseURL.js"></script>
    <script type="text/javascript" src="../js/lib/upload/spark-md5.js"></script>
    <script type="text/javascript">
        var ui = null;
        $(function () {
            ui = html5MultUpload("fileToUpload", "1", "1", function (e) {
                console.log("fileName=" + e.fileName);
                console.log("fileSize=" + e.fileSize);
                console.log("uploadState=" + e.uploadState);
                console.log("percentComplete=" + e.percentComplete);
                console.log("checkComplete=" + e.checkComplete)

                if(e.uploadState == 1) {        //文件可上传
                    ui.upload();   //上传文件
                }
            });
        })
    </script>
</head>

<body >
<div class="row">
    <label for="fileToUpload">请选择需要上传的文件</label>
    <input type="file" name="fileToUpload" id="fileToUpload"/>
</div>

</div>
<div class="row">
    <button onclick="javascript:ui.checkFile();">上传</button>
    <button onclick="javascript:ui.pause();">暂停</button>
    &nbsp;<label id="progressNumber"></label>
</div>
<div id="msg"></div>
<div id="fileFrame"></div>
<br>
<div><h6>支持批量，支持断点续传</h6></div>

</body>
</html>