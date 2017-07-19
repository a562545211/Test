/**
 * Created by liguoxiang on 2016/11/10.
 */

function update(){
    if(check()) {
        if ($("#newPass").val() == $("#reNewPass").val()) {
            $.ajax({
                type: "post",
                url: getBasePath() + "userManager/modifyPass",
                dataType: "json",
                data: {"newPass": $("#newPass").val(),"oldPass":$("#old").val()},
                success: function (data) {
                    if(data.result == 3){
                        alert("愿密码错误，请重新输入！");
                    }else {
                        alert("修改成功！！");
                        window.history.back(-1);
                    }
                },
                error: function () {
                    alert("修改失败！！");
                }
            });
        } else {
            alert("输入的密码不一致，请重新输入！");
        }
    }
}

function check(){
    if($("#newPass").val() == "" || $("#newPass").val() == null){
        alert("新密码不能为空！");
        return false;
    }
    if($("#reNewPass").val() == "" || $("#reNewPass").val() == null){
        alert("确认新密码不能为空！");
        return false;

    }
    if($("#old").val() == "" || $("#old").val() == null){
        alert("原密码不能为空！");
        return false;
    }
    return true;
}


/**
 * 取消
 */
function back(){
    window.history.back(-1);
}
