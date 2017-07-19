package com.jsrm.model.approve;

import com.jsrm.base.common.BaseModel;

import java.util.Date;

/**
 * 流程定义表model
 * Created by wdCao on 2016/10/13.
 */
public class ApproveDefinition extends BaseModel {

    private String id;                 //id
    private String flowType;            //流程类型
    private String flowDef;             //流程定义 json格式
    private String state;               //状态：1：可用 0：不可用
    private Date createdate;            //创建时间
    private String createUserId;       //创建用户id
    private String createUserName;      //创建用户姓名

    public String getFlowType() {
        return flowType;
    }

    public void setFlowType(String flowType) {
        this.flowType = flowType;
    }

    public String getFlowDef() {
        return flowDef;
    }

    public void setFlowDef(String flowDef) {
        this.flowDef = flowDef;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Date getCreatedate() {
        return createdate;
    }

    public void setCreatedate(Date createdate) {
        this.createdate = createdate;
    }

    public String getCreateUserName() {
        return createUserName;
    }

    public void setCreateUserName(String createUserName) {
        this.createUserName = createUserName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCreateUserId() {
        return createUserId;
    }

    public void setCreateUserId(String createUserId) {
        this.createUserId = createUserId;
    }
}
