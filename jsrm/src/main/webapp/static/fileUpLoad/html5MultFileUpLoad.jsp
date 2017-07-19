<%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>断点续传文件</title>
    <script type="text/javascript" src="/js/jquery.min.js"> </script>
    <script type="text/javascript" src="/static/js/html5MultUpload.js"> </script>
    <script type="text/javascript">
        var ui = null;
        var ui2 = null;
        $(function () {
            ui = html5MultUpload("fileToUpload", function (e) {
                alert(e.fileName);
                alert(e.fileSize);
                alert(e.percentComplete);
            });

            ui2 = html5MultUpload("fileToUpload2", function (e) {
                alert(e.fileName);
                alert(e.fileSize);
                alert(e.percentComplete);
            });
        })
    </script>
</head>

<body >
<div class="row">
    <label for="fileToUpload">请选择需要上传的文件</label>
    <input type="file" name="fileToUpload" id="fileToUpload"/>
    <input type="file" name="fileToUpload2" id="fileToUpload2"/>
</div>

</div>
<div class="row">
    <button onclick="javascript:ui.upload();">上传</button>
    <button onclick="javascript:ui2.upload();">上传2</button>
    <button onclick="javascript:ui.pause();">暂停</button>
    &nbsp;<label id="progressNumber"></label>
</div>
<div id="msg"></div>
<div id="fileFrame"></div>
<br>
<div><h6>支持批量，支持断点续传</h6></div>

</body>
</html>