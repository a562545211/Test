/**
 * Created by jichao on 2016/11/7.
 * 预览进入后，根据文件后缀名判断iframe应该加载哪个页面
 * iframe的id = preview_frame
 */

//得到后缀名
function getSuffix(path){
    if(path == "")
        return "";
    else
        return path.substring(path.lastIndexOf(".") + 1);
}

//判断类型，放入页面
function showPreview(path){

    path = path.replace(/\\/g, "/");

    //alert(path);

    if(path == ""){
        $("#download_btn").attr("href", "");
        $("#download_btn").removeAttr("download");
    }else{
        $("#download_btn").attr("href", getFileServerIpPath() + path);
    }

    var result_path = "";
    //var height = $(".yuheight").height() - 20;
    var type = getSuffix(path);

    var obj = $(".audio_left");
    obj.empty();
    var content = "";

    //判断图片
    if(type == "jpg" || type == "png" || type == "gif" || type == "bmp"){
        result_path = getFileServerIpPath() + path;
        content = "<div style=\"width: 100%; height: 100%;\"><img src=\"" + result_path + "\" style=\"width: 100%; height: 100%;\"></div>";
    }else if(type == "ogg" || type == "webm" || type == "mp4"){
        result_path = getFileServerIpPath() + path;
        content = "<video src=\"" + result_path + "\" width=\"100%\" controls>您的浏览器不支持 video 标签</video>";
    }else if(type == "doc" || type == "docx" || type == "xls" || type == "xlsx" || type == "ppt" || type == "pptx"){
        result_path = getOfficeWebAppsPath() + "/op/embed.aspx?src=" + encodeURI(encodeURI(getFileServerHostPath() + path));
        //console.log(result_path);
        content = "<iframe frameborder=\"0\" height=\"100%\" width=\"100%\" src=\"" + result_path + "\"></iframe>";
    }else if(type == "pdf" || type == "txt" || type == "swf"){
        content = "<iframe frameborder=\"0\" height=\"100%\" width=\"100%\" src=\"" + getFileServerIpPath() + path + "\"></iframe>";
        //alert(content);
    }else if(type == "mp3" || type == "wav" || type == "ogg"){
        result_path = getFileServerIpPath() + path;
        content = "<audio src=\"" + result_path + "\" width=\"100%\" controls>您的浏览器不支持 audio 标签</audio>";
    }else{
        content = "<div class=\"wrap_audio\" style=\"height: 100%;\"><span class=\"no_source\">暂无预览</span></div>";
    }
    obj.append(content);
}