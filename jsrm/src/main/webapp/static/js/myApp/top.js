/**
 * Created by Administrator on 2016/10/25 0025.
 */
/*点击按钮退出*/

var item3id=$.getUrlParam("item2id");

var changepage = $.getUrlParam("changepage");

var statisURL;

$(function () {

    jumpStatistics();

    getItem(3);

    if(item3id != null && item3id != "null"){
        // changeStyle(item3id);
        getItem(item3id);
    }

});

function getItem(item3id){

    $("#item").html("");

    var id = $.getUrlParam("itemId");
    var itemName = unescape($.getUrlParam("itemName"));

    // console.log(itemName);
    var item2List = $.getItemByRoleSec({
        "path":'/',
        "itemId":id
    });
    // console.log(item2List);
    var html = "<div class=\"edit-word head\">"+itemName+"</div>";
    for(var i=0;i < item2List.length;i++){
        if(itemName==="统计分析"){
            if(i==0&&item2List[i].itemName==="资源统计"){
                html+="<a href='"+item2List[i].itemAction+"?item2Id="+item2List[i].id+"' id='item2"+item2List[i].id+"' target='right1' class=\"selected\" onclick='changeStyle("+item2List[i].id+")'>"+item2List[i].itemName+"</a>";
            }else if(i==0&&item2List[i].itemName==="工作量统计"){
                html+="<a href='"+statisURL+"?item2Id="+item2List[i].id+"' id='item2"+item2List[i].id+"' target='right1' class=\"selected\" onclick='changeStyle("+item2List[i].id+")'>"+item2List[i].itemName+"</a>";
            }else if(i!=0){
                html+="<a href='"+statisURL+"' id='item2"+item2List[i].id+"' target='right1' onclick='changeStyle("+item2List[i].id+")'>" + item2List[i].itemName + "</a>";
            }
        }else if(itemName!=="统计分析"){
            if(item3id==3){
                if(i==0){
                    html+="<a href='"+item2List[i].itemAction+"?item2Id="+item2List[i].id+"' id='item2"+item2List[i].id+"' target='right1' class=\"selected\" onclick='changeStyle("+item2List[i].id+")'>"+item2List[i].itemName+"</a>";
                }else {
                    html+="<a href='"+item2List[i].itemAction+"?item2Id="+item2List[i].id+"' id='item2"+item2List[i].id+"' target='right1' onclick='changeStyle("+item2List[i].id+")'>" + item2List[i].itemName + "</a>";
                }
            }else{
                if(i==0){
                    html+="<a href='"+item2List[i].itemAction+"?item2Id="+item2List[i].id+"' id='item2"+item2List[i].id+"' target='right1'  onclick='changeStyle("+item2List[i].id+")'>"+item2List[i].itemName+"</a>";
                }else {
                    html += "<a href='" + item2List[i].itemAction + "?item2Id=" + item2List[i].id + "' id='item2"+item2List[i].id+"' target='right1' class=\"selected\" onclick='changeStyle("+item2List[i].id+")'>" + item2List[i].itemName + "</a>";
                }
            }
        }
    }
    $("#item").append(html);
    
    var srcOne = item2List[0].itemAction+ "?item2Id=" +item2List[0].id;
    if(item3id==3){
        if(itemName==="统计分析"){
            if(item2List.length==1&&item2List[0].itemName=="资源统计"){
                $("#iframeId").attr("src",srcOne);
            }else if(item2List.length==1&&item2List[0].itemName=="工作量统计"){
                $("#iframeId").attr("src",statisURL);
            }else if(item2List.length!=1){
                $("#iframeId").attr("src",srcOne);
            }
        }else{
            $("#iframeId").attr("src",srcOne);
        }
    }else{
        if(changepage!=""){
            srcOne = changepage+ "?item2Id=" +item2List[0].id;
            if(item2List.length==1){
                changeStyle(item2List[0].id);
            }else{
                changeStyle(item2List[1].id);
            }
            $("#iframeId").attr("src",srcOne);
        }
    }
}

function changeStyle(id){
    $("a").removeAttr("class");
    $("#item2"+id).attr("class","selected");
}


function jumpStatistics(){
    $.ajax({
        type:"post",
        url:getBasePath()+"userRest/getUserInfo",
        dataType:"json",
        async:false
    }).done(function (data) {
        if(data.status==0){
            if(data.data.data.roleCode=="BOSS"){
                userId = data.data.data.id;
                statisURL="newStatistics_classification/statistics_classification.html?item2Id=19&userId="+userId;
            }else{
                userId = data.data.data.id;
                statisURL="newStatistics_classification/statistics_classification_people.html?item2Id=19&userId="+userId;
            }
        }
    });
}
