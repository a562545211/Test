package com.jsrm.web.vo.catalog;

import com.jsrm.model.catalog.BaseKnowledge;

/**
 * 用户信息pojo
 * Created by li on 2016/10/17.
 */
public class BaseKnowledgeVo extends BaseKnowledge {
    private String id;
    private String pId;    //父ID
    private String code;   //编码
    private String name;   //名称
    private String deep;   //数据深度
    private String open;   //节点初始开闭状态(true,false)
    private String categoryDeep; //目录深度值
    private String categoryId; //目录id

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getpId() {
        return pId;
    }

    public void setpId(String pId) {
        this.pId = pId;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getOpen() {
        return open;
    }

    public String getCategoryDeep() {
        return categoryDeep;
    }

    public void setCategoryDeep(String categoryDeep) {
        this.categoryDeep = categoryDeep;
    }

    public void setOpen(String open) {
        this.open = open;
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

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }
}
