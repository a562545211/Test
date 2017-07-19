$(function(){
//定义frame_bottom高度
    var frame_height=$(window).height();
    $('.frame_bottom').height(frame_height-67);
    $(window).resize(function(){
        var frame_height=$(window).height();
        $('.frame_bottom').height(frame_height-67);
    })
//选择文件
    function choose(a,b){
        $(a).change(function(){
            var name=$(a).val();
            $(b).text(name);
        });
    }
    choose('#file','#aim');
//背景切换
    $(".content-subnav").on("click","a", function(e){
        e.preventDefault();
        $(this).parents(".content-subnav").find(".selected").removeClass("selected");
        if($(this).parent().prop("nodeName") == "LI") {
            $(this).parent().addClass("selected");
        }else{
            $(this).addClass("selected");
        }
    })
    //删除
    $('.btn_dl_alert').click(function(){
        var html ="<div class='alertboxB deleteB'>"+
            "<div class='alertbox1 deletebox'>"+
            "<span>确定要删除吗？</span>"+
            "<button class='btn btn_qd'>确定<button>"+
            "<button class='btn btn_qx'>取消<button></div></div>";
        $("body").append(html);
        $('.deleteB .btn_qd').click(function(){$(".deleteB").remove();
        });
        $('.deleteB .btn_qx').click(function(){$(".deleteB").remove();
        });
    })
    //上传
    $('.btn_tj_alert').click(function(){
        var html='<div class="alertboxB commitB">'+
            "<div class='alertbox commitbox'>"+
            "<div class='bar'></div>"+
            "<span>10%</span></div></div>";
        $("body").append(html);
    })
    //index左侧导航选中样式
    $("li",".frame_left").click(function(){
        $(".frame_left li").removeClass("active");
        $(this).addClass("active");
    })

    addLoading();       //添加loding效果

    $.ajaxSetup({           //定义全局ajax请求效果
        beforeSend: function () {
            showLoding();
        },
        complete: function () {
            hiddenLoding();
        },
        error: function (xhr, status, e) {
            if(xhr.status == '-9') {            //需重新登录系统
                alert("请重新登录!");
                window.location.reload();       //重新加载页面
            }
        }
    });

});

/**
 * select/unselect all
 * @param elemId, without "#"
 */
function checkAll(elemId){
    var that = $("#" + elemId);
    var itemClass = '.item-check';
    var allBtnClass = '.all-check';
    var unSelBtnClass = '.all-uncheck';
    // click select all
    $(that).on("click", allBtnClass, function(){
        var items = $(that).find(itemClass);
        for(var i=0;i<items.length;i++){
            if(!items[i].disabled){
                items[i].checked = $(allBtnClass)[0].checked;
                toggleClass(items[i]);
            }
        }
        itemCheck();
        $(unSelBtnClass).prop("checked",false);
    });

    // click un-select all
    $(that).on("click", unSelBtnClass, function(){
        var items = $(that).find(itemClass);
        for(var i=0;i<items.length;i++){
            items[i].checked = !items[i].checked;
            toggleClass(items[i]);
        }
        itemCheck();
    });

    function itemCheck(){
        var items = $(that).find(itemClass);
        var checknum = items.length;
        //-----------特殊需要，改了一下-------------
        var checknum2 = 0;//资源管理中，待审核的不能选择，checknum2得到可以选择的checkbox的数量
        for(var i=0;i<items.length;i++) {
            if (!items[i].disabled) {
                checknum2++;
            }
        }
        //------------如果checknum2不为0，是资源管理模块，而且存在不能选的checkbox，所以checknum需要等于checknum2，只得到能选择的总量-------------------------------
        if(checknum2 != 0){
            checknum = checknum2;
        }
        //-------------到此改动结束---------------------
        var num = 0;
        items.each(function(){
            if(this.checked==true){
                num++;
            }
        });
        if(num == checknum){
            $(allBtnClass).prop("checked",true);
        }else{
            $(allBtnClass).prop("checked",false);
        }
    }

    function toggleClass(elem){
        if($(elem).is(':checked')) {
            $(elem).parents("tr").addClass("checkTrue");
        }else{
            $(elem).parents("tr").removeClass("checkTrue");
        }
    }
    // click item
    $(that).on("click", itemClass, function(){
        itemCheck();
        toggleClass(this);
        $(unSelBtnClass).prop("checked",false);
    });
}
//弹窗
function layer(butt,butt_b){

    $(butt).click(function(){
        $(butt_b).show();
        $(butt_b+ " .search").val("");
        if(butt_b != "#btn_xz_alertb" && butt_b != "#btn_xz_alertD" ){
            $(butt_b+" .selectbox").selectBox("setCaption","请选择","-1");
        }

    });

    $('.btn_qd').click(function(){$(butt_b).hide();
    });
    $('.btn_qx').click(function(){$(butt_b).hide();
    });

    $('.closealertb').click(function(){$(butt_b).hide();
    });
    
    $('input[type=radio]','.alertbox').click(function(){
        if(this.checked){
            $(this).parent().parent().css({'background':'#E0EFD8'})
        }else{
        }
    });
}

/**
 * 隐藏loding
 */
function hiddenLoding() {
    $("#loding").hide();
}

/**
 * 显示加载状态
 */
function showLoding() {
    $("#loding").show();
}

/**
 * 添加loding效果
 */
function addLoading() {
    var html='<div class="alertboxB loaderB" id="loding" style="display: none">';
        html +='<div class="alertbox loaderbox" style="background:none;box-shadow:none;">'
        html +=  '<img src="/static/images/ajax-loader.gif"></div></div>';
    $("body").append(html);
}