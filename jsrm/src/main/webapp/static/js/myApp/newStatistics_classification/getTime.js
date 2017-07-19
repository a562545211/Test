/**
 * Created by xzb on 2016/12/1.
 */
function getTime(){
    /** 点击最近时间切换 */
    var time = Date.parse(new Date())/1000;
    var oneMonth = 30*24*60*60;
    var threeMonth = 3*oneMonth;
    var sixMonth = 6*oneMonth;
    var timeNow=getLocalTime(time);
    var oneMonthLater=getLocalTime(time-oneMonth);
    var threeMonthLater=getLocalTime(time-threeMonth);
    var sixMonthLater=getLocalTime(time-sixMonth);
    // $("#dates_start1").val(oneMonthLater);
    $("#dates_start1").val();
    // $("#dates_end1").val(timeNow);
    $("#dates_end1").val();
    $(".timeMondth li").click(function () {
        $("#dates_end1").val(timeNow);
        $(this).addClass("selected").siblings().removeClass("selected");
        if($(this).data("date")=="one"){
            $("#dates_start1").val(oneMonthLater);
        }else if($(this).data("date")=="three"){
            $("#dates_start1").val(threeMonthLater);
        }else{
            $("#dates_start1").val(sixMonthLater);
        }
    });
}
/** 时间戳转换成日期格式*/
function getLocalTime(nS) {
    var time =new Date(parseInt(nS) * 1000).toLocaleString().replace(/\//g,"-").split(" ")[0];
    var arr=time.split("-");
    if(arr[1]<10){
        arr[1]="0"+arr[1]
    }
    if(arr[2]<10){
        arr[2]="0"+arr[2]
    }
    arr = arr.join("-");
    return arr;
}