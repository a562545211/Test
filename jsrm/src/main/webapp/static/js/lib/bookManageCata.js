/**
 * Created by John on 2016/10/28.
 */

$(function () {

    $(".addSelectbox").click(function () {
        if($(this).parent().find('.selectbox').eq(0).find(".selectbox_body").children().length == 0) return;//判断如果selectboxKnowledge1下没有数据，不让添加
        var id_pre = "selectboxKnowledge";

        var id_num = 4;
        try {
            id_num = parseInt($(this).prev().find('.selectbox').attr('id').split(id_pre)[1]);
        } catch (e) {
            id_num;
        }
        var str = "";
        for (var i = 1; i <= 4; i++) {
            var id = id_pre + parseInt(id_num + i);
            var _k = "一";
            if (i == 2) _k = "二";
            if (i == 3) _k = "三";
            if (i == 4) _k = "四";
            str = '<dd data-group="'+id_num+'"><div class="selectbox selebar selectbox_width126" id="' + id + '"> <input  value="" type="hidden"> <div class="selectbox_arraw"><span class="selectbox_down"></span><span class="selectbox_up"></span></div> <div class="selectbox_value_box"><div class="selectbox_value">' + _k + '级知识点</div></div><div class="selectbox_list selectbox_width126"><div class="selectbox_scroll_body"><div class="selectbox_scroll"><div></div></div></div><ul class="selectbox_body"></ul></div></div></dd>';
            $(this).before(str);
            $("#"+id).selectBox();
        }

        initKnowledgesBy2(id_num);
       
    });
    checkAll("show");
    // layer(".btn_xz_alert", ".btn_xz_alertb");
    // layer("#btn_xz_alert", "#btn_xz_alertb");

});

function initKnowledgesBy2(id_num) {
    var phaseId = $("#selectbox1 .selectbox_selected").attr("data-id");
    var subjectId = $("#selectbox2 .selectbox_selected").attr("data-id");
    if(phaseId == null) return;
    var _data = {phaseId: phaseId, subjectId: subjectId};
    knowledgesAttribute(parseInt(id_num) + 4, getBasePath() + "knowledge/getKnowledgesByCascade", _data);
}

/**
 * 初始化知识点
 * @param n 代表：下级次数
 * @param url 代表：网页地址
 */
function knowledgesAttribute(n, url, _data) {
    var FIXNUMBER = n;
    _data.deep = "1";
    /*进入页面就给第一个按钮适配数据*/
    firstBtn();
    function firstBtn() {
        $.ajax({
            type: "post",
            url: url,
            dataType: "json",
            async: "false",
            data: _data,
            success: function (data) {
                if (data.status == "0") {
                    firstBtnAdapter(data.data);
                } else {
                    console.log("第一个按钮获取信息失败！！");
                }
            },
            error: function () {
                console.log("第一个按钮获取信息失败！！！")
            }
        });
    }

    /*第一个按钮适配数据*/
    function firstBtnAdapter(data) {
        var _num = FIXNUMBER - 3;
        if (data.length != 0) {
            $("#selectboxKnowledge" + _num).css("background-color", "white");
            $("#selectboxKnowledge" + _num + " ul").attr("data-deep", data[0].deep);
            var str = "";
            $.each(data, function (index, item) {
                str += '<li data-id=\'' + item.id + '\' data-pId=\'' + item.pId + '\' data-deep=\'' + item.deep + '\'>' + item.name + '</li>'
            });
            $("#selectboxKnowledge" + _num + " ul").html(str);

            $("#selectboxKnowledge" + _num + " ul li").click(function () {
                var $this = $(this);
                var _nextId = $this.attr('data-id');
                AJAXrender(_num, _nextId, FIXNUMBER);
            });

            for (var i = _num; i <= FIXNUMBER; i++) {
                if ($("#selectboxKnowledge" + i).selectBox("getLength") === 0) {
                    $("#selectboxKnowledge" + i).css("background-color", "#eaecf2");
                }
            }

        } else {
            var _k = "一";
            if (_num == 2) _k = "二";
            if (_num == 3) _k = "三";
            if (_num == 4) _k = "四";
            $("#selectboxKnowledge" + _num).selectBox("setCaption", _k + "级知识点", "-1");
        }
    }

    /**
     * 清空后面数据
     * @param index
     */
    function resetCheckbox(index) {
        for (var i = index + 1; i <= 8; i++) {
            $("#selectboxKnowledge" + i).selectBox("removeAll");
        }
    }

    /*
     * AJAX数据请求
     * @param number:点击第n个按钮数字
     * */
    function AJAXrender(number, _nextId, total) {
        /*清空后面数据*/
        //resetCheckbox(number);
        var next = number + 1;
        var i = next;
        for (i; i <= total; i++) {
            $("#selectboxKnowledge" + i).selectBox("removeAll");
        }
        var parentId = _nextId;
        var deep = 1 + Number($("#selectboxKnowledge" + number + " ul").attr("data-deep"));
        $.ajax({
            type: "post",
            url: url,
            dataType: "json",
            data: {
                "parentId": parentId,
                "deep": deep
            },
            success: function (data) {
                if (data.status == "0") {
                    AJAXAdapter(data.data, next, _nextId);
                } else {
                    console.log("第" + next + "个按钮获取信息失败！！");
                }
            },
            error: function () {
                console.log("第" + next + "个按钮获取信息失败！！");
            }
        });
    }

    function AJAXAdapter(data, next, _nextId) {
        if (data.length === 0) {
            return;
        }
        $("#selectboxKnowledge" + next + " ul").attr("data-deep", data[0].deep);
        $("#selectboxKnowledge" + next + " ul").html("");
        var str = "";
        $.each(data, function (index, item) {
            str += '<li data-id=\'' + item.id + '\' data-pId=\'' + item.pId + '\' data-deep=\'' + item.deep + '\'>' + item.name + '</li>'
        });
        $("#selectboxKnowledge" + next + " ul").html(str);
        for (var i = next; i <= FIXNUMBER; i++) {
            if ($("#selectboxKnowledge" + i).selectBox("getLength") === 0) {
                $("#selectboxKnowledge" + i).css("background-color", "#eaecf2");
            } else {
                $("#selectboxKnowledge" + i).css("background-color", "white");
            }
        }
        $("#selectboxKnowledge" + next + " ul li").click(function () {
            var $this = $(this);
            var _nextId = $this.attr('data-id');
            AJAXrender(next,_nextId);
        });
    }
}
