/**
 * Created by jichao on 2016/10/27.
 */
var id = $.getUrlParam("id");
var type = $.getUrlParam("type");
var addOrUpdate = $.getUrlParam("addOrUpdate");

$(function(){
   /** 判断新增还是编辑 */
    if(type == 1){//新增
        $("#title").html("新增");
        $("#resource_code").hide();
        showAllCategories(localStorage.getItem("bm_categoresCode"),"async");
        /** 访问后台拿到session的内容 */
        getSession();
    }else if(type == 2){//编辑
        $("#title").html("编辑");
        /** 根据id得到对象 */
        selectResourceCodeById();
    }
});

/** 新增进入，查询session的user */
function getSession(){
    $.ajax({
        type : "post",
        url : getBasePath() + "/userRest/getSession",
        dataType : "json",
        data : {},
        success:function(data) {
            if(data.status == 0){
                $("#createUserName").html(data.data.createUserName);
                $("#createTime").html(data.data.createTime);
            }else{
                alert(data.message);
                window.history.back(-1);
            }
        },
        error:function(){
            alert("出错了");
            window.history.back(-1);
        }
    });
}
/** 修改进入，根据id查询对象 */
function selectResourceCodeById(){
    $.ajax({
        type : "post",
        url : getBasePath() + "/resourceCode/selectResourceCodeById",
        dataType : "json",
        data : {id : id},
        success:function(data) {
            // console.log(data.data);
            if(data.status == 0){
                $("#createUserName").html(data.data.data.createUserName);
                $("#createTime").html(data.data.data.createTime);
                $("#id").val(data.data.data.id);
                $("#code").val(data.data.data.code);
                $("#name").val(data.data.data.name);
                $("#resoureDes").val(data.data.data.resoureDes);
                showAllCategories(data.data.data.categoresCode);
            }else{
                alert(data.message);
                window.history.back(-1);
            }
        },
        error:function(){
            alert("出错了");
            window.history.back(-1);
        }
    });
}

/** 清空数据 */
function clearAll(){
    $("#name").val("");
    $("#resoureDes").val("");
    $("#selectbox1").selectBox("setCaption","学段","-1");
    $("#selectbox2").selectBox("setCaption","学科","-1");
    $("#selectbox3").selectBox("setCaption","版本","-1");
    $("#selectbox4").selectBox("setCaption","册次","-1");
    $("#selectbox5").selectBox("setCaption","章","-1");
    $("#selectbox6").selectBox("setCaption","节","-1");
    $("#selectbox7").selectBox("setCaption","目","-1");
    $("#selectbox8").selectBox("setCaption","课时","-1");
    for(var i = 2; i <= 8; i++){
        $("#selectbox" + i + " .selectbox_body").empty();
        $("#selectbox"+i).css("background-color","#eaecf2");
    }
}

/** 保存，提交 */
function saveResourceCode(saveOrCommit){
    var url = getBasePath();
    var state = "";

    if(saveOrCommit == "save"){
        state = "1";
    }else if(saveOrCommit == "commit") {
        state = "2";
    }

    if(addOrUpdate == "add") {
        url += "/resourceCode/saveResourceCode";
    }else if(addOrUpdate == "update") {
        url += "/resourceCode/updateResourceCode";
    }

    /*学段*/
    var phaseId = "";
    /*学科*/
    var subjectId= "";
    //获得关联目录
    var categoresCode = "";
    var attribute_id = "data-value";
    attribute_id = $("#selectbox1 .selectbox_selected").attr("data-value") == undefined ? "data-id" : attribute_id;
    for(var i = 1; i < 9; i++){
        if(i == 1){
            phaseId = $("#selectbox" + i+ " li.selectbox_selected").data("id");
        }else if(i == 2){
            subjectId = $("#selectbox" + i+ " li.selectbox_selected").data("id");
        }
        var select_value = $("#selectbox" + i + " .selectbox_selected").attr(attribute_id);
        if(select_value == undefined){
            break;
        }else{
            if(i == 1){
                categoresCode = select_value;
            }else{
                categoresCode += "," + select_value;
            }
        }
    }

    /** 保存categoresCode到localStorage*/
    localStorage.setItem("bm_categoresCode",categoresCode);

    if($("#name").val() == ""){
        alert("请填写资源名称");
        return;
    }

    if(categoresCode == ""){
        alert("请选择目录");
        return;
    }

    if($("#selectbox1 .selectbox_selected").attr(attribute_id) == null){
        alert("请选择学段");
        return;
    }
    if($("#selectbox2 .selectbox_selected").attr(attribute_id) == null){
        alert("请选择学科");
        return;
    }
    if($("#selectbox3 .selectbox_selected").attr(attribute_id) == null){
        alert("请选择版本");
        return;
    }if($("#selectbox4 .selectbox_selected").attr(attribute_id) == null){
        alert("请选择册次");
        return;
    }


    if(check()) {
        $.ajax({
            type: "post",
            url: url,
            dataType: "json",
            data: {
                id: $("#id").val(),
                code: $("#code").val(),
                name: $("#name").val(),
                resoureDes: $("#resoureDes").val(),
                state: state,
                categoresCode: categoresCode,
                phaseId: phaseId,
                subjectId: subjectId
            },
            success: function (data) {
                if (data.result == 2) {
                    alert("资源名称重复，请重新填写！");
                } else {
                    alert(data.message);
                    window.history.back(-1);
                }
            },
            error: function () {
                alert("出错了");
            }
        });
    }
}
function check(){
    if($("#name").val() == null || $("#name").val() ==""){
        alert("资源名称不能为空！");
        return false;
    }
    return true;
}