/**
 * Created by Administrator on 2016/11/1 0001.
 */

var checkPass = true;

$(function () {
    /** 点击“选择”适配数据 */
    layer('#btn_xz_alert', '#btn_xz_alertD');

    alert_A_ajax();
    // alert_B_ajax();
    
    $("#btn_xz_alertb").hide();
    $("#chose-no").click(function () {
        $("#selenumber").next().html("选题编号");
        $(".check_show").html("");
        $(".cover").css("display","block");
        $("#btn_xz_alert").click(function () {
            $("#btn_xz_alertD").hide();
            $("#btn_xz_alertb").show();
            $("#btn_xz_alertb .search").val("");
            $("#selectboxAlert").selectBox();
            $("#btn_xz_alertb .wrap_table").find("input").removeAttr("checked");
        });
        clear();
        /** 进入页面时，判断全选和反选是不是选中 */
        loginJudge();
        alert_B_ajax();
    });

    $("#chose-yes").click(function () {
        $("#selenumber").next().html("资源编号");
        $(".check_show").html("");
        $(".cover").css("display","block");
        $("#btn_xz_alert").click(function () {
            $("#btn_xz_alertD").show();
            $("#btn_xz_alertb").hide();
            $("#btn_xz_alertD .search").val("");
            $("#selectboxAlert_D").selectBox();
            $("#btn_xz_alertD .wrap_table").find("input").removeAttr("checked");
        });
        clear();
        /** 进入页面时，判断全选和反选是不是选中 */
        loginJudge();

    });

    /** 弹出框b的ajax */
    function alert_B_ajax() {
        $.ajax({
            type: "post",
            url: getBasePath() + "resourceCode/selectResourceCodeList?time="+new Date(),
            dataType: "json",
            success: function (data) {
                if (data.status == 0) {
                    selectBoxAdapter(data.data.data);
                } else {
                    alert("获取信息失败！！");
                }
            },
            error: function () {
                alert("获取信息失败！！");
            }
        });
    }

    /** 弹出框a的ajax */
    function alert_A_ajax() {
        $.ajax({
            type: "post",
            url: getBasePath() + "resourceManage/getNewResourceList?time="+new Date(),
            dataType: "json",
            success: function (data) {
                if (data.status == 0) {
                    topicTableAdapter(data.data);
                } else {
                    alert("获取信息失败！！");
                }
            },
            error: function () {
                alert("获取信息失败！！");
            }
        });
    }
    
    /** B弹出框，里的选择选题编号切换 */
    // $("#selectboxAlert").selectBox("callback", function (_data) {
    //     debugger;
    //     if (_data == 0) {
    //         $("#btn_xz_alertb .alert_sousuo button").click(function () {
    //             $.ajax({
    //                 type: "post",
    //                 url: getBasePath() + "resourceCode/selectResourceCodeList?time="+new Date(),
    //                 dataType: "json",
    //                 data: {
    //                     "code": $(".search").val().trim()
    //                 },
    //                 success: function (data) {
    //                     if (data.status == 0) {
    //                         selectBoxAdapter(data.data.data);
    //                     } else {
    //                         alert("获取信息失败！！");
    //                     }
    //                 }
    //             });
    //         });
    //     } else {
    //         $("#btn_xz_alertb .alert_sousuo button").click(function () {
    //             $.ajax({
    //                 type: "post",
    //                 url: getBasePath() + "resourceCode/selectResourceCodeList?time="+new Date(),
    //                 dataType: "json",
    //                 data: {
    //                     "name": $(".search").val().trim()
    //                 },
    //                 success: function (data) {
    //                     if (data.status == 0) {
    //                         selectBoxAdapter(data.data.data);
    //                     } else {
    //                         alert("获取信息失败！！");
    //                     }
    //                 }
    //             });
    //         });
    //     }
    // });
    $("#btn_xz_alertb .alert_sousuo button").click(function () {
        var chooseIds= $("#selectboxAlert .selectbox_selected").attr("data-value");
        if(chooseIds==0){
            $.ajax({
                type: "post",
                url: getBasePath() + "resourceCode/selectResourceCodeList?time="+new Date(),
                dataType: "json",
                data: {
                    "code": $("#search").val().trim()
                },
                success: function (data) {
                    if (data.status == 0) {
                        selectBoxAdapter(data.data.data);
                    } else {
                        alert("获取信息失败！！");
                    }
                }
            });
        }else if(chooseIds==1){
            $.ajax({
                type: "post",
                url: getBasePath() + "resourceCode/selectResourceCodeList?time="+new Date(),
                dataType: "json",
                data: {
                    "name": $("#search").val().trim()
                },
                success: function (data) {
                    if (data.status == 0) {
                        selectBoxAdapter(data.data.data);
                    } else {
                        alert("获取信息失败！！");
                    }
                }
            });
        }
    });
    /** A弹出框，里的选择选题编号切换 */
    $("#btn_xz_alertD .alert_sousuo button").click(function () {
        var chooseId= $("#selectboxAlert_D .selectbox_selected").attr("data-value");
        if(chooseId==0){
            $.ajax({
                type: "post",
                url: getBasePath() + "resourceManage/getNewResourceList?time="+new Date(),
                dataType: "json",
                data: {
                    "tResourceCode": $("#search_D").val().trim()    //选题编号
                },
                success: function (data) {
                    if (data.status == 0) {
                        topicTableAdapter(data.data);
                    } else {
                        alert("获取信息失败！！");
                    }
                }
            });
        }else if(chooseId==1){
            $.ajax({
                type: "post",
                url: getBasePath() + "resourceManage/getNewResourceList?time="+new Date(),
                dataType: "json",
                data: {
                    "resourceName": $("#search_D").val().trim()   //资源名称
                },
                success: function (data) {
                    if (data.status == 0) {
                        topicTableAdapter(data.data);
                    } else {
                        alert("获取信息失败！！");
                    }
                }
            });
        }else if(chooseId==2){
            $.ajax({
                type: "post",
                url: getBasePath() + "resourceManage/getNewResourceList?time="+new Date(),
                dataType: "json",
                data: {
                    "resourceFileCode": $("#search_D").val().trim()   //资源编号
                },
                success: function (data) {
                    if (data.status == 0) {
                        topicTableAdapter(data.data);
                    } else {
                        alert("获取信息失败！！");
                    }
                }
            });
        }
    });
    
    /**
     * 弹出框的确定按钮
     */
    $("#table_data").on("click", "input", function () {
        if ($(this).prop("checked") == true) {
            $(this).addClass("checked").parents("tr").siblings().children().children().removeClass("checked");
        }
    });

    /**
     * 如果是工程文件，需要判断编号是否已经生成过
     */
    function checkSelectUsed(code) {
        var iid = null;
        if(typeof id != "undefined"){
            iid = id;
        }
        $.ajax({
            type: "post",
            url: getBasePath() + "resourceCode/checkSelectUsed",
            dataType: "json",
            async: false,
            data: {code: code, id : iid},
            success: function (data) {
                if (data.status == 0) {
                    if (data.data > 0)
                        checkPass = false;
                    else
                        checkPass = true;
                }
            },
            error: function () {

            }
        });
    }

    $(".btn-alert-B").click(function () {
        var code = "";
        var name = "";
        var personName = "";
        var id = $(".checked").parent().parent().attr("data-value");
        var categoresCode = $(".checked").parent().parent().attr("data-code");
        for (var i = 0; i < $("#table_data tr").length; i++) {
            if ($("#table_data tr input").eq(i).attr("class") == "checked") {
                code = $("#table_data tr input").eq(i).parent().next().html();
                name = $("#table_data tr input").eq(i).parent().next().next().html();
                personName = $("#table_data tr input").eq(i).parent().next().next().next().html();
            }
        }

        if (typeof isProj != "undefined") {
            checkSelectUsed(code);
        }

        if (!checkPass) {
            alert("该选题编号已经使用过！");
            return;
        }
        $("#tResourceCode").val(code);
        $(".check_show").html(code);
        $(".check_show").attr("id", id);
        $(".chargeEditor").html(personName);

        if (name == "-") {
            $(".iptFl").val("");
        } else {
            $(".iptFl").val(name)
        }

        if (categoresCode != "undefined") {
            clearKnowledge();   //清空资源属性和知识点
            showAllCategories(categoresCode);
            initKnowledgesBy2(0);
        } else {
            clearKnowledge();   //清空知识点
            $("#selectbox1 .selectbox_value").html("学段");
            $("#selectbox1 .selectbox_body li").removeClass("selectbox_selected");
            for (var i = 2; i <= 8; i++) {
                $("#selectbox" + i).selectBox("removeAll");
                $("#selectbox" + i).css("background-color", "#eaecf2");
            }
        }
    });
    /**
     * 弹出框table数据
     * */
    function selectBoxAdapter(data) {
        //清空table
        $("#table_data tr:not(:first)").remove();
        var result = "";
        for (var i = 0; i < data.length; i++) {
            var code = getValue(data[i].code);
            var name = getValue(data[i].name);
            var createUserName = getValue(data[i].createUserName);
            var createTime = data[i].createTime.split(" ")[0];
            var id = data[i].id;
            var categoresCode = data[i].categoresCode;
            result += "<tr data-value='" + id + "' data-code='" + categoresCode + "'>"
                + "<td><input type='radio' name='check'></td>"
                + "<td>" + code + "</td>"
                + "<td>" + name + "</td>"
                + "<td>" + createUserName + "</td>"
                + "<td>" + createTime + "</td>" +
                "</tr>"
        }
        if(result == "") {
            result = "<tr><td colspan='5'>暂无可用资源</td></tr>>";
        }
        $("#table_data").append(result);
    }

    /**
     * 弹出框table数据--已发稿
     * */
    function topicTableAdapter(data) {
        $("#table_data_D tr:not(:first)").remove();
        var result = "";
        for (var i = 0; i < data.length; i++) {
            var id = getValue(data[i].id);
            var tResourceCode = getValue(data[i].tResourceCode);
            var resourceFileCode = getValue(data[i].resourceFileCode);
            var resourceName = getValue(data[i].resourceName);
            result += "<tr data-num='" + tResourceCode + "' data-code='" + resourceFileCode + "'>"
                + "<td><input type='radio' name='tcheck'></td>"
                + "<td>" + tResourceCode + "</td>"
                + "<td>" + resourceFileCode + "</td>"
                + "<td>" + resourceName + "</td>"
            "</tr>"
        }
        if(result == "") {
            result = "<tr><td colspan='4'>暂无可用资源</td></tr>>";
        }
        $("#table_data_D").append(result);
    }

    /**
     * 获取data值
     * @param val
     * @returns {boolean}
     */
    function getValue(val) {
        return (val == undefined) ? '-' : val;
    }


    /** 是否为选题发稿：“是” */
    $("#chose-yes").click(function () {
        $(".res_num").show();
        $("#btn_xz_alertD").hide();
        $("#btn_xz_alertb").hide();
    });
    /** 是否为选题发稿：“否”*/
    $("#chose-no").click(function () {
        $(".res_num").hide();
        $("#resnumber").val("");
        $("#resourceTopicCode").val("");
        $("#btn_xz_alertD").hide();
        $("#btn_xz_alertb").hide();
    });

    /** 重要提示下的确认按钮 */
    $(".alert_btn").click(function () {
        $(".alertboxC").hide();
    });

    /** 重要提示下的关闭按钮 */
    $(".alertImg").click(function () {
        $(".alertboxC").hide();
    });

    /** B弹出框 ，的img点击关闭*/
    $(".closealertb").click(function () {
        $(".alertboxB").hide();
    });
    /** B 弹出框的，确认点击关闭*/
    $(".btn-alert-B").click(function () {
        $(".alertboxB").hide();
    });

    /** D弹出框 ，的img点击关闭*/
    $(".closealertD").click(function () {
        $(".alertboxD").hide();
    });
    /** D 弹出框的，确认点击关闭*/
    $(".btn-alert-D").click(function () {
        $(".alertboxD").hide();

        var code = $("#table_data_D input[type='radio']:checked").parent().parent().attr("data-code");
        var num = $("#table_data_D input[type='radio']:checked").parent().parent().attr("data-num");
        $("#resourceTopicCode").val(code);
        $("#tResourceCode").val(num);

        if (code != "undefined") {
            getInfoByCode(code);
        } else {
            $("#selectbox1 .selectbox_value").html("学段");
            $("#selectbox1 .selectbox_body li").removeClass("selectbox_selected");
            for (var i = 2; i <= 8; i++) {
                $("#selectbox" + i).selectBox("removeAll");
                $("#selectbox" + i).css("background-color", "#eaecf2");
            }
        }
    });

    function clear() {
        /*选题编号*/
        $("#resourceTopicCode").val("");
        $("#tResourceCode").val("");
        $(".check_show").html("");
        /*资源名称*/
        $(".iptFl").val("");
        /*发版类型*/
        $("#selectbox0").selectBox("setCaption", "未选择", "-1");
        /*版次*/
        $(".ipt").val("");
        /*ISBN号*/
        $(".ISBN").val("");
        /*责任编辑*/
        // $(".chargeEditor").html("");
        /*资源属性*/
        $("#selectbox1").selectBox("setCaption", "学段", "-1");
        $("#selectbox2").selectBox("setCaption", "学科", "-1");
        $("#selectbox3").selectBox("setCaption", "版本", "-1");
        $("#selectbox4").selectBox("setCaption", "册次", "-1");
        $("#selectbox5").selectBox("setCaption", "章", "-1");
        $("#selectbox6").selectBox("setCaption", "节", "-1");
        $("#selectbox7").selectBox("setCaption", "目", "-1");
        $("#selectbox8").selectBox("setCaption", "课时", "-1");
        /*知识点*/
        clearKnowledge();
        /*资源一级类别*/
        $("#selectboxBox9").selectBox("setCaption", "未选择", "-1");
        /*资源二级类别*/
        $("#selectbox10").selectBox("setCaption", "未选择", "-1");
        /*资源格式*/
        $("#selectbox11").selectBox("setCaption", "未选择", "-1");
        /*字数*/
        $(".wordCount").val("");
        /*时长*/
        $(".timeCount").val("");
        /*图幅数*/
        $(".mapCount").val("");
        /*资源描述*/
        $(".btm10 dd textarea").val("");
        /*资源制作者*/
        $(".resourceMaker").val("");
        /*作者简介*/
        $(".aboutAuthor").val("");
        /*使用对象*/
        if ($("#teacher").prop("checked")) {
            $("#teacher").removeProp("checked");
        }
        if ($("#student").prop("checked")) {
            $("#student").removeProp("checked");
        }
        /*资源来源*/
        $(".resourceSources").val("");
        /*版权*/
        $(".copyright").val("");
        /*年份*/
        $(".yearMonth").val("");
        /*是否是独家资源*/
        if ($("#yes").prop("checked")) {
            $("#yes").removeProp("checked");
        }
        if ($("#no").prop("checked")) {
            $("#no").removeProp("checked");
        }
        /*是否原创*/
        if ($("#yes01").prop("checked")) {
            $("#yes01").removeProp("checked");
        }
        if ($("#no01").prop("checked")) {
            $("#no01").removeProp("checked");
        }
        /*是否中文*/
        if ($("#china").prop("checked")) {
            $("#china").removeProp("checked");
        }
        if ($("#enish").prop("checked")) {
            $("#enish").removeProp("checked");
        }
        /*资源等级*/
        if ($("#nice").prop("checked")) {
            $("#nice").removeProp("checked");
        }
        if ($("#common").prop("checked")) {
            $("#common").removeProp("checked");
        }
        /*是否免费*/
        if ($("#free").prop("checked")) {
            $("#free").removeProp("checked");
            $(".dot").val("");
        }
        if ($("#charge").prop("checked")) {
            $("#charge").removeProp("checked");
            $(".dot").val("");
        }
        /*电子课件*/
        if ($("#yes1").prop("checked")) {
            $("#yes1").removeProp("checked");
        }
        if ($("#no1").prop("checked")) {
            $("#no1").removeProp("checked");
        }
    }
});


/**
 * 清空知识点
 * */
function clearKnowledge(){
    /*资源属性*/
    // $("#selectbox1").selectBox("removeAll").css("background-color", "white").selectBox("setCaption","学段","-1");
    // $("#selectbox2").selectBox("removeAll").css("background-color", "#eaecf2").selectBox("setCaption","学科","-1");
    // $("#selectbox3").selectBox("removeAll").css("background-color", "#eaecf2").selectBox("setCaption","版本","-1");
    // $("#selectbox4").selectBox("removeAll").css("background-color", "#eaecf2").selectBox("setCaption","册次","-1");
    // $("#selectbox5").selectBox("removeAll").css("background-color", "#eaecf2").selectBox("setCaption","章","-1");
    // $("#selectbox6").selectBox("removeAll").css("background-color", "#eaecf2").selectBox("setCaption","节","-1");
    // $("#selectbox7").selectBox("removeAll").css("background-color", "#eaecf2").selectBox("setCaption","目","-1");
    // $("#selectbox8").selectBox("removeAll").css("background-color", "#eaecf2").selectBox("setCaption","课时","-1");
    var knowledgeLength= $("#knowledgeAdd").children("dd").length;
    $("#knowledgeAdd").children("dd").eq(0).find("#selectboxKnowledge1").selectBox("removeAll").css("background-color", "#eaecf2").selectBox("setCaption","一级知识点","-1");
    $("#knowledgeAdd").children("dd").eq(1).find("#selectboxKnowledge2").selectBox("removeAll").css("background-color", "#eaecf2").selectBox("setCaption","二级知识点","-1");
    $("#knowledgeAdd").children("dd").eq(2).find("#selectboxKnowledge3").selectBox("removeAll").css("background-color", "#eaecf2").selectBox("setCaption","三级知识点","-1");
    $("#knowledgeAdd").children("dd").eq(3).find("#selectboxKnowledge4").selectBox("removeAll").css("background-color", "#eaecf2").selectBox("setCaption","四级知识点","-1");
    for(var i=knowledgeLength-1;i>=4;i--){
        $("#knowledgeAdd").children("dd").eq(i).remove();
    }
}