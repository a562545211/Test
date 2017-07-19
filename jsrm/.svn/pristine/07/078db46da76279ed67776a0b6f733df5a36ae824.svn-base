package com.jsrm.service.statistics;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.service.BaseService;
import com.jsrm.model.user.User;

import java.util.List;


/**
 * 用户service
 * Created by wdCao on 2016/10/17.
 */
public interface StatisticsService extends BaseService {

    /**
     * 上传管理待提交数量
     * @return
     * @throws BusinessException
     */
    public Integer pendingSubmissionUpload(Object[] parameArrayList) throws BusinessException;

    /**
     * 上传管理待审核数量
     * @return
     * @throws BusinessException
     */
    public Integer pendingApprovalUpload(Object[] parameArrayList) throws BusinessException;

    /**
     * 上传管理不通过数量
     * @return
     * @throws BusinessException
     */
    public Integer auditDoesNotPassUpload(Object[] parameArrayList) throws BusinessException;

    /**
     * 选题发稿待提交数量
     * @return
     * @throws BusinessException
     */
    public Integer pendingSubmissionDraft(Object[] parameArrayList) throws BusinessException;

    /**
     * 选题发稿待审核数量
     * @return
     * @throws BusinessException
     */
    public Integer pendingApprovalDraft(Object[] parameArrayList) throws BusinessException;

    /**
     * 选题发稿待终审数量
     * @return
     * @throws BusinessException
     */
    public Integer finalJudgmentDwraft(Object[] parameArrayList) throws BusinessException;

    /**
     * 选题发稿已退回数量
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public Integer pendingBackDraft(Object[] parameArrayList) throws BusinessException;


    /**
     * 资源审核上传待审核数量
     * @return
     * @throws BusinessException
     */
    public Integer uploadpendingApprovalResource(Object[] parameArrayList) throws BusinessException;

    /**
     * 资源审核发稿待审核数量
     * @return
     * @throws BusinessException
     */
    public Integer dwraftPendingApprovalResource(Object[] parameArrayList) throws BusinessException;

    /**
     * 资源审核发稿待终审数量
     * @return
     * @throws BusinessException
     */
    public Integer dwraftFinalJudgmentResource(Object[] parameArrayList) throws BusinessException;

}
