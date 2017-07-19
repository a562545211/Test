package com.jsrm.web.vo.approve;

import com.jsrm.model.approve.ApproveHistory;

/**
 * 历史审批记录vo
 * Created by wdCao on 2016/11/14.
 */
public class ApproveHistoryVo extends ApproveHistory {
    private String createUserId;
    private String createUserName;

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
}
