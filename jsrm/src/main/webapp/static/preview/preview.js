var preview = preview || {};
//资源预览
preview.previewRes = function(ext,url,clazz){
	if(url==""){
		return;
	}
	switch(ext){
	  case "jpg":
	  case "png":
	  case "gif":
	  case "jpeg":
	  case "bmp":
		    this.previewImg(url,clazz);
	      break;
	  case "mp3":
	  case "wma":
	  case "wav":
	  case "ogg":
	  case "ape":
	  case "mid":
	  case "midi":
			this.previewAudio(url,clazz);
		  break;
	  case "flv":
	  case "mkv":
	  case "avi":
	  case "mp4":
	  case "wmv":
	  case "3gp":
	  case "mpg":
	  case "rmvb":
	  case "rm":
	  case "asf":
		    this.previewFlv(url,clazz);
		  break;
	  case "swf":
		    this.previewFlash(url,clazz);
		  break;
	  case "doc":
	  case "docx":
	  case "txt":
	  case "xlsx":
	  case "xls":
	  case "ppt":
	  case "pptx":
	  case "pdf":
		    this.previewOffice(url,clazz);
		  break;
	  case "icw":
           var isIE9 = false;
          if(navigator.appName == "Microsoft Internet Explorer"){
              if(navigator.appVersion.match(/6./i)=="6."){
              }
              if(navigator.appVersion.match(/7./i)=="7."){
              }
              if(navigator.appVersion.match(/8./i)=="8."){
              }
              if(navigator.appVersion.match(/9./i)=="9."){
                  isIE9 = true;
              }
              if(navigator.appVersion.match(/10./i)=="10."){
                  isIE9 = true;
              }
              if(navigator.appVersion.match(/11./i)=="11."){
                  isIE9 = true;
              }

              if(isIE9){
                  this.previewICW(url,clazz);
                  $("html,body").animate({scrollTop: $("#show_top").offset().top-45}, 100);
                  jQuery(".view_pro_box").show();
              }else{
                  jQuery("#"+clazz).html('<div class="no_view"></div>');
              }
          }else{
              this.previewICW(url,clazz);
              $("html,body").animate({scrollTop: $("#show_top").offset().top-45}, 100);
              jQuery(".view_pro_box").show();
          }
		  break;
	  case "widget":
	  case "wgt":
		  var isIE9 = false;
          if(navigator.appName == "Microsoft Internet Explorer"){
              if(navigator.appVersion.match(/6./i)=="6."){
              }
              if(navigator.appVersion.match(/7./i)=="7."){
              }
              if(navigator.appVersion.match(/8./i)=="8."){
              }
              if(navigator.appVersion.match(/9./i)=="9."){
                  isIE9 = true;
              }
              if(navigator.appVersion.match(/10./i)=="10."){
                  isIE9 = true;
              }
              if(navigator.appVersion.match(/11./i)=="11."){
                  isIE9 = true;
              }

              if(isIE9){
                  this.previewICW(url,clazz);
                  $("html,body").animate({scrollTop: $("#show_top").offset().top-45}, 100);
              }else{
                  jQuery("#"+clazz).html('<div class="no_view"></div>');
              }
          }else{
              this.previewWidget(url,clazz);
              $("html,body").animate({scrollTop: $("#show_top").offset().top-45}, 100);
          }
		  break;
	  case "icp":
		  preview.previewIcp(url);
		  break;
	  default :
		  jQuery("#"+clazz).html('<div class="no_view"></div>');
		  break;
	}
}
preview.previewIcp=function(data){
	//data = eval(data);
	if(data!=null&&data!=undefined&&data.length>0){
		index=0;
		pictures=data;
		$('#prePic').css('display','block');
		$('#nextPic').css('display','block');
		jQuery("#preview").html('<img class="" src="'+pictures[index]+'" style="width: 702px;height: 430px;">');
		if(pictures.length==1){
			$('#nextPic a').css('display','none');
		}else{
	        $('#nextPic a').css('display','block');
	    }
	}else{
		jQuery("#pop_videoObject").html('<div class="no_view"></div>');
	}
}



// 预览图片文件
preview.previewImg = function (fileurl,clazz) {
	var viewholder = document.getElementById(clazz);
	viewholder.innerHTML = "";
	viewholder.innerHTML = "<img src='"
			+ fileurl
			+ "' style='width:100%;height:850px;'></img>";
}

// 预览音频
preview.previewAudio = function(fileurl,clazz) {
    $('#'+clazz).css({
        'width' : '100%',
        'height' : '100%'
    });
    $('#'+clazz).html('');
    var url = fileurl;
    $f(clazz, "../../preview/flowplayer-3.2.16.swf", {
        clip: {	url: url, provider: "audio",coverImage: { url: "../../images/music.png",
            scaling: 'orig' }},
        plugins: {
            audio:{
                url: "../../preview/flowplayer.audio-3.2.11_0.swf"
            },
            controls:{
                autoHide:false
            }
        }
    });
}

// 预览FLV视频文件
preview.previewFlv = function(fileurl,clazz) {
	$('#'+clazz).css({
		'width' : '100%',
		'height' : '100%'
	});
	$('#'+clazz).html('');
    var url = fileurl;
	$f(clazz, "../../preview/flowplayer-3.2.16.swf", {
		log:{level:'Debug'},
		clip: {url: url, scaling: "fit", autoPlay: false},
		plugins: {
			controls: {
				autoHide: false,
				url: "../../preview/flowplayer.controls-3.2.15.swf"
			}
		}
	});
}

// 预览office文件
preview.previewOffice = function(url,clazz) {
	jQuery("#"+clazz).css("height", "100%");
	jQuery("#"+clazz).css("width", "100%");
	var fp = new FlexPaperViewer(
			'../../preview/FlexPaperViewer',
			clazz, 
			{
				config : {
					SwfFile : url,
					Scale : 1.0,
					ZoomTransition : 'easeOut',
					ZoomTime : 0.5,
					ZoomInterval : 0.2,
					FitPageOnLoad : false,
					FitWidthOnLoad : false,
					FullScreenAsMaxWindow : false,
					ProgressiveLoading : false,
					MinZoomSize : 0.2,
					MaxZoomSize : 5,
					SearchMatchAll : false,
					InitViewMode : 'Portrait',
					PrintPaperAsBitmap : false,
					ViewModeToolsVisible : true,
					ZoomToolsVisible : true,
					NavToolsVisible : true,
					CursorToolsVisible : true,
					SearchToolsVisible : false,
					PrintToolsVisible : false,
					localeChain : 'zh_CN'
				}
			});
}

// 预览flash动画
preview.previewFlash = function(url,clazz) {
	var flashvars = {};
	var params = {};
	params.bgcolor = "#FFFFFF";
	params.menu = "false";
	params.quality = "high";
	params.play = "true";
	params.loop = "true";
	params.scale = "1";
	params.wmode = "Opaque";
	params.devicefont = "false";
	params.allowfullscreen = "true";
	params.allowscriptaccess = "always";
	params.align = "middle";
	var attributes = {};
	swfobject.embedSWF(
					url,
					clazz,
					"100%",
					"100%",
					"9.0.0",
					"../../preview/expressInstall.swf",
					flashvars, params, attributes);
}
//预览交互式课件  ssdu add 2014-9-17
preview.previewICW=function(url,clazz){
			var viewholder = document.getElementById(clazz);
			viewholder.innerHTML = "<iframe name='viewIcw' id='viewIcw' width='100%' height='624px' frameborder='no' border='0' scrolling='no' src='"+SITE_URL+"/Public/_static/js/webCourseware/main/player.html?package="+url+"&route="+encodeURIComponent(U('Search/RequestContent/index'))+"'></iframe>";
}
//预览交互式课件  widget  ssdu add 2014-10-29
preview.previewWidget=function(url,clazz){
	var viewholder = document.getElementById(clazz);
	var lastStr=url.charAt(url.length-1);
	if(lastStr=='/'){
		url=url.substr(0,url.length-1);
	}
	viewholder.innerHTML = "<iframe style='margin:0 auto;' name='viewIcw' id='viewIcw' width='100%' height='624px' frameborder='no' border='0' scrolling='no' src='"+SITE_URL+"/Public/_static/js/webCourseware/main/player.html?widget="+url+"&route="+encodeURIComponent(U('Search/RequestContent/index'))+"'></iframe>";
}
//保存到我的文档
preview.save = function(uid, resid){
	 $.ajax({
         url: ('Resource/Resource/importFile'),
         data: {'uid':uid, 'resid':resid},
         success: function (data) {
             if (data == "true") {
            	 alert("保存成功！");
             } else {
            	alert("保存失败！请重试···");
             }
         },
         error: function () {

         }
     });
}

//下载
preview.download = function(){
	
}

//二维码
preview.qrcode = function(){
	jQuery("#erweima").mouseover(function(){
		jQuery(".wxsm").css("display","block");
	});

	jQuery("#erweima").mouseout(function(){
		jQuery(".wxsm").css("display","none");
	});
}
preview.init = function(extension,previewurl,clazz){
	preview.previewRes(extension,previewurl,clazz);
//	preview.qrcode();
}



