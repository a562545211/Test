package com.jsrm.model.approve;

import com.jsrm.base.common.BaseModel;

import java.util.Date;

/**
 * 流程实例表
 * Created by wdCao on 2016/10/13.
 */
public class ApproveInstance extends BaseModel {
    private String id;
    private String tApproveDefId;          //管理流程定义id
    private String isEdit;                  //是否可编辑
    private String currentNode;             //当前环节
    private String currentNodeName;         //当前环节名称
    private String busiType;                //业务类型
    private String busiId;                 //关联业务id
    private String fromUserId;             //来自用户id
    private String fromUserName;            //来自用户姓名
    private String appUserId;              //审批人用户id
    private String appUserName;             //审批人姓名
    private String state;                   //状态：1：审批中 2：审批结束
    private String flowDef;                 //流程定义
    private String createUserId;           //流程发起人id
    private String createUserName;          //发起人姓名
    private Date createTime;                //发起时间
    private Date updateTime;                //更新时间


    public String getCurrentNode() {
        return currentNode;
    }

    public void setCurrentNode(String currentNode) {
        this.currentNode = currentNode;
    }

    public String getBusiType() {
        return busiType;
    }

    public void setBusiType(String busiType) {
        this.busiType = busiType;
    }

    public String getAppUserName() {
        return appUserName;
    }

    public void setAppUserName(String appUserName) {
        this.appUserName = appUserName;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
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

    public String getFlowDef() {
        return flowDef;
    }

    public void setFlowDef(String flowDef) {
        this.flowDef = flowDef;
    }

    public String getCurrentNodeName() {
        return currentNodeName;
    }

    public void setCurrentNodeName(String currentNodeName) {
        this.currentNodeName = currentNodeName;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String gettApproveDefId() {
        return tApproveDefId;
    }

    public void settApproveDefId(String tApproveDefId) {
        this.tApproveDefId = tApproveDefId;
    }

    public String getBusiId() {
        return busiId;
    }

    public void setBusiId(String busiId) {
        this.busiId = busiId;
    }


    public String getAppUserId() {
        return appUserId;
    }

    public void setAppUserId(String appUserId) {
        this.appUserId = appUserId;
    }

    public String getCreateUserId() {
        return createUserId;
    }

    public void setCreateUserId(String createUserId) {
        this.createUserId = createUserId;
    }

    public String getIsEdit() {
        return isEdit;
    }

    public void setIsEdit(String isEdit) {
        this.isEdit = isEdit;
    }

    public String getFromUserId() {
        return fromUserId;
    }

    public void setFromUserId(String fromUserId) {
        this.fromUserId = fromUserId;
    }

    public String getFromUserName() {
        return fromUserName;
    }

    public void setFromUserName(String fromUserName) {
        this.fromUserName = fromUserName;
    }
}
