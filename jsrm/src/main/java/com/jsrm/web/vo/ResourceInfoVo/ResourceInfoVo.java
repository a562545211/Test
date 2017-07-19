package com.jsrm.web.vo.ResourceInfoVo;

import com.jsrm.model.resourceInfo.ResourceInfo;

import java.util.Date;

/**
 * 资源信息Vo
 * Created by wdCao on 2016/10/13.
 */
public class ResourceInfoVo extends ResourceInfo {

    /**
     * 发稿开始、结束日期
     */
    private String startTime, endTime, createTime, updateTime;

    /** 流程需要 */
    private String approveUserId;       //审核人用户id
    private String approveUserName;      //审核人用户姓名
    private String appriveDesc;         //审批意见

    private String deleteIds;           //删除ids

    private String loginUserId;              //当前登录用户

    private String userId;                  //当前登录用户

    private String suffix;

    private String changeState;

    private Integer fileType;

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    public String getApproveUserId() {
        return approveUserId;
    }

    public void setApproveUserId(String approveUserId) {
        this.approveUserId = approveUserId;
    }

    public String getApproveUserName() {
        return approveUserName;
    }

    public void setApproveUserName(String approveUserName) {
        this.approveUserName = approveUserName;
    }

    public String getAppriveDesc() {
        return appriveDesc;
    }

    public void setAppriveDesc(String appriveDesc) {
        this.appriveDesc = appriveDesc;
    }

    public String getDeleteIds() {
        return deleteIds;
    }

    public void setDeleteIds(String deleteIds) {
        this.deleteIds = deleteIds;
    }

    public String getLoginUserId() {
        return loginUserId;
    }

    public void setLoginUserId(String loginUserId) {
        this.loginUserId = loginUserId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getSuffix() {
        return suffix;
    }

    public void setSuffix(String suffix) {
        this.suffix = suffix;
    }

    public String getChangeState() {
        return changeState;
    }

    public void setChangeState(String changeState) {
        this.changeState = changeState;
    }

    public Integer getFileType() {
        return fileType;
    }

    public void setFileType(Integer fileType) {
        this.fileType = fileType;
    }
}
