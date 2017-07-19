var pagination = new Pagination(getBasePath() + "resourceFileInfo/selectListForPage", "page", function (data) {
    fillTableData(data)
});

function searchPage(page){
    pagination.search(getParams(), page);
}

$(function(){

    $(".btn-check").on("click", function(){searchPage();});
    $(".btn-grey").on("click", function(){$("#resourceName").val("")});

    searchPage();
});

function getParams(){
    var resourceName = $("#resourceName").val();
    var params = {resourceName : resourceName};
    return params;
}

/** table数据 */
function fillTableData(data){

    //清空table
    $("#table_data tr:not(:first)").remove();
    
    var result = "";
    for(var i = 0; i < data.length; i++){

        var tResourceId = data[i].tResourceId;
        var fileType = data[i].fileType;
        var createDate = data[i].createDate;
        var state = data[i].state;
        var resourceName = data[i].resourceName;
        var createUserName = data[i].createUserName;

        result = "<tr data-id='" + tResourceId + "'>";
        result += "<td>" + resourceName + "</td>"
            + "<td>" + createDate + "</td>"
            + "<td>" + getType(fileType) + "</td>"
            + "<td>" + createUserName + "</td>"
            + "<td>" + getState(state) + "</td>" ;

        if(state == 4 || state == 2){
            result += "<td>" + "<a href=\"javascript:void(0);\" onclick=\"transform('" + tResourceId + "','" + fileType + "')\">重新转换</a>" + "</td>";
        }else{
            result += "<td></td>";
        }

        result += "</tr>";

        $("#table_data").append(result);
    }

}

function transform(id, fileType){
    //alert(id);alert(fileType);
    $.ajax({
        type: "post",
        url: getBasePath() + "resourceFileInfo/transform",
        dataType: "json",
        async:false,
        data: {
            id : id,
            fileType : fileType
        },
        success: function (data) {
            if(data.data.data > 0){
                alert("操作成功");
                searchPage();
            }else{
                alert("操作失败");
            }
        },
        error: function () {
            alert("出错了！！");
        }
    })
}

function getState(state){
    switch(state){
        case "2":
            return "转换中";
        case "3":
            return "转换成功";
        case "4":
            return "转换失败";
        default:
            return "状态有问题";
    }
}

function getType(fileType){
    switch(fileType){
        case "1":
            return "缩略图";
        case "2":
            return "swf";
        case "3":
            return "小样";
        default:
            return "没这东西";
    }
}

function transformAll(){
    $("#all").attr("onclick", "");
    $("#all").removeClass("btn-check").addClass("btn-grey");
    $.ajax({
        type: "post",
        url: getBasePath() + "resourceFileInfo/transformAll",
        dataType: "json",
        // async:false,
        data: {},
        success: function (data) {
            // if(data.data.data > 0){
            //     alert("操作成功");
            //     searchPage();
            // }else{
            //     alert("操作失败");
            // }
        },
        error: function () {
            //alert("出错了！！");
        }
    })
}