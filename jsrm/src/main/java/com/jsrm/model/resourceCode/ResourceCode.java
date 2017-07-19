package com.jsrm.model.resourceCode;

import java.util.Date;

/**
 * Created by jichao on 2016/10/25.
 * 资源编号表
 */
public class ResourceCode {
    private String id;
    private String code;
    private String name;
    private String resoureDes;
    private String state;
    private String createUserId;
    private String createUserName;
    private Date createTime;
    private Date updateTime;
    private String categoresCode;
    private String phaseId,subjectId;//学段，学科

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getResoureDes() {
        return resoureDes;
    }

    public void setResoureDes(String resoureDes) {
        this.resoureDes = resoureDes;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCreateUserId() {
        return createUserId;
    }

    public void setCreateUserId(String createUserId) {
        this.createUserId = createUserId;
    }

    public String getCreateUserName() {
        return createUserName;
    }

    public void setCreateUserName(String createUserName) {
        this.createUserName = createUserName;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public String getCategoresCode() {
        return categoresCode;
    }

    public void setCategoresCode(String categoresCode) {
        this.categoresCode = categoresCode;
    }

    public String getPhaseId() {
        return phaseId;
    }

    public void setPhaseId(String phaseId) {
        this.phaseId = phaseId;
    }

    public String getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(String subjectId) {
        this.subjectId = subjectId;
    }
}
