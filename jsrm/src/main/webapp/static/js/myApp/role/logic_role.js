function register_l(){
	$("#tree_show input[type=checkbox]").on("click", function(){
//		isCheckByParent(this);
	});
}
function isCheckByParent(o){
	if(!this.checked){
		this.checked="checked";
	}else{
		this.checked="";
	}
		var frist = $("input[parentid="+o.id+"]");
		for(var i=0;i<frist.length;i++){
			if(o.checked){
				frist[i].checked = "checked";
				
			}else{
				frist[i].checked = "";
			}
			if(frist[i].id.indexOf("-")==4){
				var sec = $("input[parentid="+frist[i].id+"]");
				for(var j=0;j<sec.length;j++){
					if(frist[i].checked){
						sec[j].checked = "checked";
						
					}else{
						sec[j].checked = "";
					}
				}
			}
		}
}