var iurl = getBasePath();
var zNodes ="";
var phaseId ="";
var subjectId ="";
var param = "";
var id = "treeDemo";
var url =iurl + "/knowledge/getKnowledge/";
saveOrUpdateUrl = iurl + "/knowledge/saveOrUpdateKnowledge";
deleteUrl = iurl + "/knowledge/delete";
entitySeqUrl = iurl + "/knowledge/getKnowledgeSeq";

/**
 * 设置树节点字体样式
 */
function getFontCss1(treeId, treeNode) {
    return (!!treeNode.highlight) ? {color:"#A60000", "font-weight":"bold"} : {color:"#333", "font-weight":"normal"};
}

var settingCatalog = {
    view: {
        selectedMulti: false,
        fontCss: getFontCss1
    },
    edit: {
        enable: false,
        editNameSelectAll: false
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        onClick: knowledgeOnClick
    }
};

var settingKnowledge = {
    view: {
        addHoverDom: addHoverDomKnowledge,
        removeHoverDom: removeHoverDom,
        dblClickExpand: dblClickExpand,
        //showIcon: false,
        selectedMulti: false,
        fontCss: getFontCss
    },
    edit: {
        enable: true,
        editNameSelectAll: true,
        removeTitle: "删除该节点",
        renameTitle: "编辑该节点"
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        beforeDrag: beforeDrag,
        beforeEditName: beforeEditName,
        beforeRemove: beforeRemove,
        beforeRename: beforeRename,
        onRemove: onRemove,
        onRename: onRename
    }
};
$(function () {
    checkAll("resource");
    initTree("categoryTree","/knowledge/list",settingCatalog);
    importExcel();
})
function knowledgeOnClick(e,treeId,treeNode){
    if(!treeNode.isParent){
        param = {categoryId:treeNode.id,categoryDeep:treeNode.deep};
        initTree(id,url,settingKnowledge,param);

        phaseId = treeNode.pId;
        subjectId = treeNode.id;
    }
}

function importExcel(){
    $("#import").click(function () {

        var formData = new FormData($('form')[0]);
        $.ajax({
            type: "POST",    //必须POST
            url: getBasePath() + "knowledge/insertKnowledgeByExcel",
            processData: false,
            contentType: false,
            data: formData,
            dataType: "json",
            success: function(rtnData) {
                alert(rtnData.message);
            }
        });
    });
}