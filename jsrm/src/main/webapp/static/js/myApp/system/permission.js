function permission(){
    $(".perm-item").on("click","input",function(){
        var status = $(this).prop("checked");
     
        if($(this).parent().prop("nodeName").toLowerCase() == "dd"){
            // 获取子项dd，判断
            var checkedCount = $(this).parent().siblings("dd").length;
            if(status == true){
                checkedCount++;
            }
            $(this).parent().siblings("dd").each(function(){
                if($(this).find("input").prop("checked") == false){
                    checkedCount--;
                }
            });
            if(checkedCount == 0){
                checkParents($(this).parent(), false);
            }else{
                checkParents($(this).parent(), true);
            }
            checkRoot($(this), status);
        }

        if($(this).parent().prop("nodeName").toLowerCase() == "dt"){
            // 获取子项dt，判断
            $(this).parent().parent().find("dd").find("input").each(function(){
                $(this).prop("checked", status);
            });
            checkRoot($(this), status);
        }

        function checkParents(elem, status){
            $(elem).parents("dl").eq(0).each(function(){
                $(this).find("dt").eq(0).find("input").prop("checked", status);
            });
        }
        function checkRoot(elem, status){
            var ret = false;
            var items = $(elem).parents(".perm-item").find("dd").find("input");
            var uncheckedCount = 0;
            for(var i in items){
                if(!items.hasOwnProperty(i) || isNaN(parseInt(i))){
                    break;
                }
                if(status == false) {
                    if ($(items[i]).prop("checked") == false) {
                        uncheckedCount++;
                    }
                }else{
                    if ($(items[i]).prop("checked") == true) {
                        $(items[i]).parents(".perm-item").find("dt").eq(0).find("input").prop("checked", true);
                        return;
                    }
                }
            }
            if(uncheckedCount == items.length) {
                $(elem).parents(".perm-item").find("dt").eq(0).find("input").prop("checked", false);
            }
        }
    });
}