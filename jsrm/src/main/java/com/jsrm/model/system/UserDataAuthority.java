package com.jsrm.model.system;

/**
 * 用户信息pojo
 * Created by li on 2016/10/17.
 */
public class UserDataAuthority {
    private String id;
    private String userId;   //角色ID
    private String dataAuthorityId;    //用户ID
    private String deep;    //用户ID
    private String parentId;    //用户ID
    private String name;    //用户ID

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getDataAuthorityId() {
        return dataAuthorityId;
    }

    public void setDataAuthorityId(String dataAuthorityId) {
        this.dataAuthorityId = dataAuthorityId;
    }

    public String getDeep() {
        return deep;
    }

    public void setDeep(String deep) {
        this.deep = deep;
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
}
