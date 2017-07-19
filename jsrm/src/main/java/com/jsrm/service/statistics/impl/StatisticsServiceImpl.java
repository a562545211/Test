package com.jsrm.service.statistics.impl;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.service.impl.BaseSupportServiceImpl;
import com.jsrm.model.user.User;
import com.jsrm.service.statistics.StatisticsService;
import com.jsrm.service.user.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 用户service实现
 * Created by wdCao on 2016/10/17.
 */
@Service
public class StatisticsServiceImpl extends BaseSupportServiceImpl implements StatisticsService {

    @Override
    public Integer pendingSubmissionUpload(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectCount("statistics.pendingSubmissionUpload",parameArrayList);
    }

    @Override
    public Integer pendingApprovalUpload(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectCount("statistics.pendingApprovalUpload",parameArrayList);
    }

    @Override
    public Integer auditDoesNotPassUpload(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectCount("statistics.auditDoesNotPassUpload",parameArrayList);
    }

    @Override
    public Integer pendingSubmissionDraft(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectCount("statistics.pendingSubmissionDraft",parameArrayList);
    }

    @Override
    public Integer pendingApprovalDraft(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectCount("statistics.pendingApprovalDraft",parameArrayList);
    }

    @Override
    public Integer finalJudgmentDwraft(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectCount("statistics.finalJudgmentDwraft",parameArrayList);
    }

    @Override
    public Integer pendingBackDraft(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectCount("statistics.pendingBackDraft",parameArrayList);
    }

    @Override
    public Integer uploadpendingApprovalResource(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectCount("statistics.uploadpendingApprovalResource",parameArrayList);
    }

    @Override
    public Integer dwraftPendingApprovalResource(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectCount("statistics.dwraftPendingApprovalResource",parameArrayList);
    }

    @Override
    public Integer dwraftFinalJudgmentResource(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectCount("statistics.dwraftFinalJudgmentResource",parameArrayList);
    }
}
