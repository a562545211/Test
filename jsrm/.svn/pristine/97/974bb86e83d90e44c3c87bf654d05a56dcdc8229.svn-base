/**
 * Created by Administrator on 2016/11/10 0010.
 */

$(function () {
    /**文件名过长用hover显示*/
    $("#aim").mouseover(function () {
        var fileName = $(this).html();
        if(fileName != null && fileName != ""){
            fileName = fileName.substring(fileName.lastIndexOf("\\") + 1, fileName.length);
        }
        $('#edit-span').css("display","block").html(fileName);
    }).mouseout(function () {
        $('#edit-span').css("display","none");
    });

    $("#file").on('change', function( e ){
        var name = $(this).val();
        if(name != null && name != ""){
            name = name.substring(name.lastIndexOf("\\") + 1, name.length);
        }
        $("#aim").text(name);
    });
});