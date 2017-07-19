/**
 * Created by Administrator on 2016/10/25 0025.
 */

/**
 * 获取按钮权限
 */
    var id = $.getUrlParam("item2Id");
    var result = $.getOperateByType({
        "itemId":id,
        "type":['list','bar'],
        "path":'/'
    });
