/**
 * Created by John on 2016/10/28.
 */

$(function () {

    for (var i = 1; i <= 8; i++) {
        $("#selectbox" + i + " ul").html("");
    }
    categoriesAttribute(8, "category/getCategoriesByCascade")
});

/**
 * @param n 代表：一共有几级联动
 * @param url 代表：网页地址
 */
function categoriesAttribute(n, url) {
    var FIXNUMBER = n;

    /*进入页面学段学科适配数据*/
    firstBtn();
    function firstBtn() {
        $.ajax({
            type: "post",
            url: getBasePath() + "userManager/queryUserDataAuthority",
            dataType: "json",
            success: function (data) {
                if (data.status == "0") {
                    filterCategories(data.data.userDataAut);
                } else {
                    alert("获取信息失败！！");
                }
            },
            error: function () {
                alert("获取信息失败！！！")
            }
        });
    }

    /*学段学科适配数据*/
    function filterCategories(data) {
        var str = "";
        $.each(data, function (index, item) {
            if (item.deep == "1") {
                str += '<li data-id=\'' + item.dataAuthorityId + '\' data-pId=\'' + item.parentId + '\' data-deep=\'' + item.deep + '\' title=\'' + item.name + '\'>' + item.name + '</li>'
            }
        });
        $("#selectbox1 ul").html(str);

        $("#selectbox2").css("background-color", "#eaecf2");   //为了“选题发稿”那边资源属性好看，添加的，可以删除。

        $("#selectbox1 ul li").click(function () {
            var $this = $(this);
            var _phaseId = $this.attr('data-id');
            $.post(getBasePath() + "userManager/queryUserDataAuthorityByPhaseId", {"parentId": _phaseId}, function (rtnData) {
                if (rtnData.status == "0") {
                    var _subject = rtnData.data;
                    if(_subject.length != 0) {
                        $("#selectbox2").css("background-color", "white");
                        var _str = "";
                        $.each(_subject, function (index, item) {
                            _str += '<li data-id=\'' + item.dataAuthorityId + '\' data-pId=\'' + item.parentId + '\' data-deep=\'' + item.deep + '\' title=\'' + item.name + '\'>' + item.name + '</li>'
                        });
                        $("#selectbox2 ul").html(_str);

                        $("#selectbox2 ul li").click(function () {
                            var $this = $(this);
                            var _subjectId = $this.attr('data-id');
                            AJAXrender(2, _subjectId, FIXNUMBER);
                            formatKnowledges(_phaseId, _subjectId); //点击学段学科知识点联动
                        });
                    } else {
                        $("#selectbox2").css("background-color", "#eaecf2");
                    }
                }
            }, "json");
        });


        for (var i = 3; i <= FIXNUMBER; i++) {
            $("#selectbox" + i).css("background-color", "#eaecf2");
        }
    }

    /**
     * 清空后面数据
     * @param index
     */
    function resetCheckbox(index) {
        for (var i = index + 1; i <= 8; i++) {
            $("#selectbox" + i).selectBox("removeAll");
        }
    }

    /*
     * AJAX数据请求
     * @param number:点击第n个按钮数字
     * */
    function AJAXrender(number, _nextId, total) {
        /*清空后面数据*/
        resetCheckbox(number);
        var next = number + 1;
        var i = next;
        for (i; i <= total; i++) {
            $("#selectbox" + i).selectBox("removeAll");
        }
        var parentId = _nextId;
        var deep = 1 + Number($("#selectbox" + number + " ul li").attr("data-deep"));
        $.ajax({
            type: "post",
            url: getBasePath() + url,
            dataType: "json",
            data: {
                "parentId": parentId,
                "deep": deep
            },
            success: function (data) {
                if (data.status == "0") {
                    AJAXAdapter(data.data, next);
                } else {
                    alert("第" + next + "个按钮获取信息失败！！");
                }
            },
            error: function () {
                alert("第" + next + "个按钮获取信息失败！！");
            }
        });
    }

    function AJAXAdapter(data, next) {
        if (data.length === 0) {
            return;
        }
        $("#selectbox" + next + " ul").html("");
        var str = "";
        $.each(data, function (index, item) {
            str += '<li data-id=\'' + item.id + '\' data-pId=\'' + item.pId + '\' data-deep=\'' + item.deep + '\' title=\'' + item.name + '\'>' + item.name + '</li>'
        });
        $("#selectbox" + next + " ul").html(str);
        for (var i = next; i <= FIXNUMBER; i++) {
            if ($("#selectbox" + i).selectBox("getLength") === 0) {
                $("#selectbox" + i).css("background-color", "#eaecf2");
            } else {
                $("#selectbox" + i).css("background-color", "white");
            }
        }
        $("#selectbox" + next + " ul li").click(function () {
            var $this = $(this);
            var _nextId = $this.attr('data-id');
            AJAXrender(next, _nextId);
        });
    }
}

