/**
 * Created by sjyuan on 2016/11/2.
 */

var categoriesCascadeUrl = getBasePath() + "/category/getCategoriesByCascade";
var knowledgesCascadeUrl = getBasePath() + "/knowledge/getKnowledgesByCascade";
var filterCategoriesUrl = getBasePath() + "userManager/queryUserDataAuthority";
var filterCategoriesCascadeUrl = getBasePath() + "userManager/queryUserDataAuthorityByPhaseId";
var maxDeep = 8;

/**
 * 过滤目录
 * */
var filterCategories = function (phaseId, subjectId) {

    var _getSelectBoxDom = function (item, _id) {
        var _str = "";
        if (item.dataAuthorityId == _id) {
            _str += '<li data-id=\'' + item.dataAuthorityId + '\' data-pId=\'' + item.parentId + '\' data-deep=\'' + item.deep + '\' class="selectbox_selected" title=\'' + item.name + '\' >' + item.name + '</li>'
        } else {
            _str += '<li data-id=\'' + item.dataAuthorityId + '\' data-pId=\'' + item.parentId + '\' data-deep=\'' + item.deep + '\' title=\'' + item.name + '\' >' + item.name + '</li>'
        }
        return _str;
    }

    var _subjectClickFun = function () {

        $("#selectbox2 ul li").click(function () {
            var $this = $(this);
            var _id = $this.attr('data-id');
            var _data = {"parentId": _id, "deep": 3};
            var _url = categoriesCascadeUrl;

            disableCategories("#selectbox", 3);

            initNextCategories(_url, _data, _id);
            var phaseId = $("#selectbox1 .selectbox_selected").attr("data-id");
            var subjectId = $(this).attr("data-id");
            formatKnowledges(phaseId, subjectId);
        });
    };

    $.ajax({
        type: "post",
        url: filterCategoriesUrl,
        async: false,
        dataType: "json",
        success: function (rtnData) {

            var info = rtnData.data.userDataAut;
            var _phase = "";
            $.each(info, function (index, item) {
                if (item.deep == "1") {
                    _phase += _getSelectBoxDom(item, phaseId);
                }
                if (item.deep == "2") {
                    $.ajax({
                        type: "post",
                        url: filterCategoriesCascadeUrl,
                        async: false,
                        dataType: "json",
                        data: {"parentId": $("#selectbox1").attr("data-default-id")},
                        success: function (rtnData) {
                            if (rtnData.status == "0") {
                                var _subject = "";
                                var _data = rtnData.data;
                                $.each(_data, function (index, item) {
                                    _subject += _getSelectBoxDom(item, subjectId);
                                });
                                enableSelectBox("#selectbox", 2);
                                $("#selectbox2 ul").html(_subject);
                                _subjectClickFun();
                            }
                        }
                    });
                }
            });
            $("#selectbox1 ul").html(_phase);

            if (subjectId == null && $("#selectbox2 ul li").length == 0) {
                $("#selectbox2").css("background-color", "#eaecf2"); //二级置灰
            }
            /*else {
             enableSelectBox("#selectbox", 2);
             $("#selectbox2 ul").html(_subject);
             }*/

            $("#selectbox1 ul li").click(function () {
                var $this = $(this);
                var _nextId = $this.attr('data-id');
                $.post(filterCategoriesCascadeUrl, {"parentId": _nextId}, function (rtnData) {
                    if (rtnData.status == "0") {
                        disableCategories("#selectbox", 2);
                        var _subject = rtnData.data;
                        if (_subject.length != 0) {
                            $("#selectbox2").css("background-color", "white");
                            var _str = "";
                            $.each(_subject, function (index, item) {
                                _str += '<li data-id=\'' + item.dataAuthorityId + '\' data-pId=\'' + item.parentId + '\' data-deep=\'' + item.deep + '\' title=\'' + item.name + '\' >' + item.name + '</li>'
                            });
                            $("#selectbox2 ul").html(_str);
                            _subjectClickFun();
                        } else {
                            $("#selectbox2").css("background-color", "#eaecf2");
                        }
                    }
                }, "json");
                disableCategories("#selectboxKnowledge", 1);
            });
            _subjectClickFun();
        }
    });

};

/**
 * 回显查询数据--目录体系
 * */
var showAllCategories = function (ids, type) {
    var check = false;
    if (type != null) {
        check = true;
    }
    $.ajax({
        url: getBasePath() + "/category/getCategoriesByIds",
        type: "post",
        traditional: true,
        data: {"ids": ids},
        async: check,
        dataType: "json",
        success: function (rtnData) {
            if (rtnData.status == "0") {

                /** 清空数据 */
                disableCategories("#selectbox", 2);

                var _phaseId, subjectId;
                var _length = rtnData.data.length;
                $.each(rtnData.data, function (i, v) {
                    $("#selectbox" + v.deep).attr("data-default-value", v.name); //数据回显
                    $("#selectbox" + v.deep).attr("data-default-id", v.id); //数据回显
                    $("#selectbox" + v.deep + " .selectbox_value").text(v.name);

                    if (v.deep > 2) {
                        var _data = {"parentId": v.pId, "deep": v.deep};
                        var _url = categoriesCascadeUrl;
                        var _id = v.id;
                        initNextCategories(_url, _data, _id);
                        if (i == _length - 1) {
                            _data = {"parentId": _id, "deep": parseInt(v.deep) + 1};
                            initNextCategories(_url, _data, _id);
                        }
                    } else {
                        if (v.deep == 1) {
                            _phaseId = v.id;
                        }
                        if (v.deep == 2) {
                            subjectId = v.id;
                        }
                        filterCategories(_phaseId, subjectId);
                    }
                });
            }
        }
    });

};

/**
 * 预加载下级数据--目录体系
 * */
var initNextCategories = function (url, data, _x) {
    $.ajax({
        url: url,
        type: "post",
        data: data,
        async: false,
        dataType: "json",
        success: function (rtnData) {
            if (rtnData.status == "0") {
                var str = "";
                var _data = rtnData.data;
                if(data.deep < 9){
                    if (_data.length == 0) {
                        disableCategories("#selectbox", data.deep);
                    } else {
                        enableSelectBox("#selectbox", data.deep);
                    }
                    $.each(_data, function (i, v) {
                        if (v.deep != 0) {
                            if (_x == v.id) {
                                str += '<li data-id=\'' + v.id + '\' data-pId=\'' + v.pId + '\' data-deep=\'' + v.deep + '\' class="selectbox_selected" title=\'' + v.name + '\'>' + v.name + '</li>';
                            } else {
                                str += '<li data-id=\'' + v.id + '\' data-pId=\'' + v.pId + '\' data-deep=\'' + v.deep + '\' title=\'' + v.name + '\'>' + v.name + '</li>';
                            }
                        }
                    });
                    $("#selectbox" + data.deep + " ul").html(str);
                    $("#selectbox" + data.deep + " ul li").click(function () {
                        var $this = $(this);
                        var _nextId = $this.attr('data-id');
                        var _nextDeep = parseInt($this.attr('data-deep')) + 1;
                        var _data = {"parentId": _nextId, "deep": _nextDeep};
                        disableCategories("#selectbox", _nextDeep);
                        initNextCategories(categoriesCascadeUrl, _data);
                    });
                }
            }
        }
    });
};

/**
 * 学段学科查询数据--知识点体系
 * */
var showKnowledgesByps = function (phaseId, subjectId) {
    var _data = {phaseId: phaseId, subjectId: subjectId};
    knowledgesAttribute(4, knowledgesCascadeUrl, _data);
};

/**
 * 格式化知识点
 * */
var formatKnowledges = function (phaseId, subjectId) {

    disableCategories("#selectboxKnowledge", 1); //初始化默认去掉知识点第一级
    // initKnowledgesBy2(0); //加载知识点第一级数据
    showKnowledgesByps(phaseId, subjectId);
    var _knowledgesDom = $("div[id^=selectboxKnowledge]");
    $.each(_knowledgesDom, function (i, v) {
        if (i < 4) {
            var _k = "一";
            if (i == 1) _k = "二";
            if (i == 2) _k = "三";
            if (i == 3) _k = "四";
            $(this).selectBox("setCaption", _k + "级知识点", "-1");
        } else {
            $(this).remove();
        }
    });
};


/**
 * 回显查询数据--知识点体系
 * */
var showAllKnowledges = function (ids) {
        $.ajax({
            url: getBasePath() + "/knowledge/getdgeKnowlesByIds",
            type: "post",
            traditional: true,
            data: {"ids": ids},
            async: "false",
            dataType: "json",
            success: function (rtnData) {
                if (rtnData.status == "0") {
                    var _length = rtnData.data.length;
                    if (_length == 0) {
                        disableCategories("#selectboxKnowledge", 1);
                        return;
                    }
                    $.each(rtnData.data, function (i, v) {
                        var _num = 1;
                        if (i != 0) {
                            var id_pre = "selectboxKnowledge";
                            var str = "";
                            for (var j = 1; j <= 4; j++) {
                                var id = id_pre + parseInt(i * 4 + j);
                                var _k = "一";
                                if (j == 2) _k = "二";
                                if (j == 3) _k = "三";
                                if (j == 4) _k = "四";
                                str += '<dd><div class="selectbox selebar selectbox_width126" id="' + id + '" data-default-value="' + _k + '级知识点"> <input  value="" type="hidden"> <div class="selectbox_arraw"><span class="selectbox_down"></span><span class="selectbox_up"></span></div> <div class="selectbox_value_box"><div class="selectbox_value">' + _k + '级知识点</div></div><div class="selectbox_list selectbox_width126"><div class="selectbox_scroll_body"><div class="selectbox_scroll"><div></div></div></div><ul class="selectbox_body"></ul></div></div></dd>';
                            }
                            $(".addSelectbox").before(str);
                            $(".selectbox").selectBox();
                        }
                        var _length = v.length;
                        disableKnowledges(i * 4 + _length, (i + 1) * 4);
                        $.each(v, function (index, item) {

                            _num = index + (i * 4) + 1;

                            // $("#selectboxKnowledge" + _num).attr("data-default-value", item.name);
                            $("#selectboxKnowledge" + _num + " .selectbox_value").text(item.name);

                            var phaseId = $("#selectbox1 .selectbox_selected").attr("data-id");
                            var subjectId = $("#selectbox2 .selectbox_selected").attr("data-id");
                            var _data = {"parentId": item.pId, "deep": item.deep, "phaseId": phaseId, "subjectId": subjectId};
                            var _url = knowledgesCascadeUrl;
                            var _id = item.id;

                            initNextKnowledges(_url, _data, _id, _num);
                            if (index == _length - 1) {
                                _data = {"parentId": _id, "deep": parseInt(item.deep) + 1};
                                initNextKnowledges(_url, _data, null, _num + 1);
                            }
                        });
                    });
                }
            }
        })
        ;
    }
    ;

/**
 * 预加载下级数据--知识点体系
 * */
var initNextKnowledges = function (url, data, _x, _num) {
    $.ajax({
        url: url,
        type: "post",
        data: data,
        async: false,
        dataType: "json",
        success: function (rtnData) {
            if (rtnData.status == "0") {
                var str = "";
                var _data = rtnData.data;
                if (_data.length == 0) {
                    disableKnowledges(_num, _num % 4 == 0 ? _num : (Math.floor(_num / 4) + 1) * 4);
                } else {
                    enableSelectBox("#selectboxKnowledge", _num);
                }
                $.each(_data, function (i, v) {
                    if (v.deep != 0) {
                        if (_x == v.id) {
                            str += '<li data-id=\'' + v.id + '\' data-pId=\'' + v.pId + '\' data-deep=\'' + v.deep + '\' class="selectbox_selected" title=\'' + v.name + '\'>' + v.name + '</li>';
                        } else {
                            str += '<li data-id=\'' + v.id + '\' data-pId=\'' + v.pId + '\' data-deep=\'' + v.deep + '\' title=\'' + v.name + '\' >' + v.name + '</li>';
                        }
                    }
                });
                $("#selectboxKnowledge" + _num + " ul").html(str);
                $("#selectboxKnowledge" + _num + " ul li").click(function () {
                    var $this = $(this);
                    var _nextId = $this.attr('data-id');
                    var _nextDeep = parseInt($this.attr('data-deep')) + 1;
                    data.parentId = _nextId;
                    data.deep = _nextDeep;
                    disableKnowledges(_num + 1, (Math.floor(_num / 4) + 1) * 4);
                    initNextKnowledges(knowledgesCascadeUrl, data, null, _num + 1);
                });
            }
        }
    });
};

/**
 * 不可点击控制
 * */
var disableCategories = function (id, nextDeep) {
    var defaultValue = ["学段","学科","版本","册次","章","节","目","课时"];
    for (var i = nextDeep; i <= maxDeep; i++) {
        $(id + i).selectBox("removeAll").selectBox("setCaption", defaultValue[i - 1], "-1");
        $(id + i).css("background-color", "#eaecf2");
    }
};

/**
 * 不可点击控制--知识点
 * */
var disableKnowledges = function (start, end) {
    for (var i = start; i <= end; i++) {
        $("#selectboxKnowledge" + i).selectBox("removeAll");
        $("#selectboxKnowledge" + i).css("background-color", "#eaecf2");
    }
};
/**
 * 可点击控制
 * */
var enableSelectBox = function (id, deep) {
    $(id + deep).css("background-color", "white");
};
