/**
 * Created by Administrator on 2016/10/24 0024.
 */

$(function () {

    if(top.location != this.location){
        top.location = this.location;
    }

    /**新页面加载，先判断之前有没有登录过*/
    var userName=localStorage.getItem("loginName");
    if(userName){
        // $(".login_name input").val(atob(userName));
        $(".login_name input").val(userName);
    }
    /**新页面加载，先判断之前有没有记住密码*/
    var userPwd=localStorage.getItem("password");
    if(userPwd){
        // $(".login_pass input").val(atob(userPwd));
        $(".login_pass input").val(userPwd);
        $("#re-pass").attr("checked","checked");
    }

    /**点击登录按钮*/
    $(".login_box button").on("click",function () {
        $.ajax({
            type:"post",
            url:getBasePath()+"userRest/login",
            dataType:"json",
            data:{
                "loginName":$(".login_name input").val(),       //用户名value
                "password":$(".login_pass input").val()         //用户密码value
            },
            success: function (data) {
                loginAdapter(data);
            },
            error: function () {
                alert("登录，出错了")
            }
        })
    });
    

    /**模拟回车事件*/
    $("#password").keyup(function(event){
        var e = window.event|| event;    //兼容火狐
        if(e.keyCode == 13){
            $("#btn-login").trigger("click");
        }
    });

    function loginAdapter(data){
        if(data.status=="0"){                                                 //密码或用户名输入正确时
            /**把登录数据保存到localStorage*/
            // localStorage.setItem("id",btoa(data.data.id));                 //id加密保存
            localStorage.setItem("id",data.data.id);                          //id保存
            // localStorage.setItem("loginName",btoa(data.data.loginName));   //loginName加密保存
            localStorage.setItem("loginName",data.data.loginName);            //loginName保存
            /**判断记住密码按钮有没有选中*/
            if($("#re-pass").prop("checked")){
                // localStorage.setItem("password",btoa(data.data.password));  //password加密保存
                // localStorage.setItem("password",data.data.password);        //password加密保存
                localStorage.setItem("password",$(".login_pass input").val()); //password保存
            }else{
                localStorage.removeItem("password");
            }
            // localStorage.setItem("username",btoa(data.data.username));       //username加密保存
            localStorage.setItem("username",data.data.username);                //username保存
            // localStorage.setItem("createtime",btoa(data.data.createtime));   //createtime加密保存
            localStorage.setItem("createtime",data.data.createtime);            //createtime保存
            // localStorage.setItem("state",btoa(data.data.state));             //state加密保存
            localStorage.setItem("state",data.data.state);                      //state保存
            // console.log(localStorage.getItem("password"));
            /*进入资源管理中心*/
            window.location.href="../index.html"
        }else{//密码或用户名输入错误时
            alert("用户名或者密码错误!!");
            $(".login_pass input").val("");                                       //清除密码
        }
    }
});

