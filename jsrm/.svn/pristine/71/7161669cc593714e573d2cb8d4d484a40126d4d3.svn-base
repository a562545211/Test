$(function(){
    //菜单树
    $(".tree").each(function(index, element) {
        if($(this).next(".node").length>0){
            if($(this).hasClass("first_ceng")){
                $(this).addClass("big_ceng_close");
            }else{
                $(this).addClass("ce_ceng_close");
            }
        }
    });
    $(".tree").click(function(e){
        var ul = $(this).next(".node");
        if(ul.css("display")=="none"){
            ul.slideDown();
            $(this).addClass("ce_ceng_open");
            ul.find(".ce_ceng_close").removeClass("ce_ceng_open");
        }else{
            ul.slideUp();
            $(this).removeClass("ce_ceng_open");
            ul.find(".node").slideUp();
            ul.find(".ce_ceng_close").removeClass("ce_ceng_open");
        }
    });
    //宽度
    initpage();
    window.onresize = function(){
        initpage();
    };
    function initpage() {
        var ww = $(".main_con").width()-263;
        $(".wrap_table").width(ww);
        $(".list_nav").height($(".wrap_table_01").height())
    }
    //隔行变色
    $("tbody tr").hover(function () {
        $()
    })
})