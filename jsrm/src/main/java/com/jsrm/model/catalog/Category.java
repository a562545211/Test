package com.jsrm.model.catalog;

/**
 * Created by kingsj.yuan@foxmail.com on 2016/10/25.
 * 目录体系 entity
 */
public class Category {

    private String id; //id

    private String parentId; //父级Id

    private String name; //目录名称

    private String deep; //数据结构深度(固定，暂定内部使用)

    private String deepCode; //数据结构深度(固定，供外部对接使用)

    private String flag; //删除状态(0可用，1不可用）

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDeep() {
        return deep;
    }

    public void setDeep(String deep) {
        this.deep = deep;
    }

    public String getDeepCode() {
        return deepCode;
    }

    public void setDeepCode(String deepCode) {
        this.deepCode = deepCode;
    }

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }
}
