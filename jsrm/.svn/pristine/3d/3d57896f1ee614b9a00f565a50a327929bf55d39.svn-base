package com.jsrm.service.approve;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.common.PageVO;
import com.jsrm.base.service.BaseService;
import com.jsrm.model.approve.ApproveDefinition;
import com.jsrm.model.approve.ApproveHistory;
import com.jsrm.model.approve.ApproveInstance;
import com.jsrm.model.user.User;
import com.jsrm.web.vo.ResourceInfoVo.ResourceInfoVo;
import com.jsrm.web.vo.approve.ApproveHistoryVo;
import com.jsrm.web.vo.approve.ApproveInstanceVo;
import com.jsrm.web.vo.vetting.VettingVo;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 流程审批service
 * Created by wdCao on 2016/10/13.
 */
public interface ApproveService extends BaseService {

    /**
     * 获取流程定义信息
     * @param approveDefinition
     * @return
     * @throws BusinessException
     */
    public ApproveDefinition getApproveDefinition(ApproveDefinition approveDefinition) throws BusinessException;

    /**
     * 获取流程实例
     * @param approveInstance
     * @return
     * @throws BusinessException
     */
    public ApproveInstance getOneApproveInstance(ApproveInstance approveInstance) throws BusinessException;

    /**
     * 启动流程
     * @param approveInstance
     * @throws BusinessException
     */
    @Transactional
    public void startApproveInstance(ApproveInstance approveInstance) throws BusinessException;

    /**
     * 更新流程实例
     * @param approveInstance
     * @throws BusinessException
     */
    @Transactional
    public void updateApproveInstance(ApproveInstance approveInstance) throws BusinessException;

    /**
     * 保存审批记录
     * @param approveHistory
     * @throws BusinessException
     */
    @Transactional
    public void saveApproveHistory(ApproveHistory approveHistory) throws BusinessException;

    /**
     * 获取流程待办
     * @param pageNo
     * @param pageSize
     * @param approveInstance
     * @return
     * @throws BusinessException
     */
    public PageVO<ApproveInstance> queryApproveInstance(int pageNo, int pageSize, ApproveInstance approveInstance) throws BusinessException;

    /**
     * 获取审批记录
     * @param approveHistory
     * @return
     * @throws BusinessException
     */
    public List<ApproveHistoryVo> queryApproveHistory(ApproveHistory approveHistory) throws BusinessException;

    /**
     * 获取耽搁审批记录
     * @param approveHistory
     * @return
     * @throws BusinessException
     */
    public ApproveHistory selectOneHistory(ApproveHistory approveHistory) throws BusinessException;

    /**
     * 查询待审批记录
     * @param pageNo
     * @param pageSize
     * @param vettingVo
     * @return
     * @throws BusinessException
     */
    public PageVO<VettingVo> queryVettingList(int pageNo, int pageSize, VettingVo vettingVo) throws BusinessException;

    /**
     * 查询已审批记录
     * @param pageNo
     * @param pageSize
     * @param vettingVo
     * @return
     * @throws BusinessException
     */
    public PageVO<VettingVo> queryVettedList(int pageNo, int pageSize, VettingVo vettingVo) throws BusinessException;

    /**
     * 查询发稿审批记录
     * @param pageNo
     * @param pageSize
     * @param vettingVo
     * @return
     * @throws BusinessException
     */
    public PageVO<VettingVo> queryTopicVettingList(int pageNo, int pageSize, VettingVo vettingVo) throws BusinessException;

    /**
     * 查询发稿已审批记录
     * @param pageNo
     * @param pageSize
     * @param vettingVo
     * @return
     * @throws BusinessException
     */
    public PageVO<VettingVo> queryTopicVettedList(int pageNo, int pageSize, VettingVo vettingVo) throws BusinessException;

    /**
     * 启动流程
     * @param resourceInfoVo
     * @return
     * @throws BusinessException
     */
    @Transactional
    public String startWorkFlow(ResourceInfoVo resourceInfoVo) throws BusinessException;

    /**
     * 提交审批
     * @param approveInstanceVo
     * @return
     * @throws BusinessException
     */
    @Transactional
    public String submitTask(ApproveInstanceVo approveInstanceVo) throws BusinessException;

    /**
     * 批量退回
     * @param approveInstanceVo
     * @return
     * @throws BusinessException
     */
    @Transactional
    public String batchGoBack(ApproveInstanceVo approveInstanceVo) throws BusinessException;

    /**
     * 根据角色id获取
     * @param roleId
     * @return
     * @throws BusinessException
     */
    public User getIdleRoleUser(String roleId, String subjectId, String loginUserid) throws BusinessException;

    /**
     * 获取资源审核人
     * @return
     * @throws BusinessException
     */
    public User getIdelResourceApp(ResourceInfoVo resourceInfoVo) throws BusinessException;

    /**
     * 转发待办
     * @throws BusinessException
     */
    @Transactional
    public void transpondTask(ApproveInstanceVo approveInstanceVo) throws BusinessException;

    /**
     * 获取流程当前角色审批人
     * @param approveInstanceVo
     * @return
     * @throws BusinessException
     */
    public List<User> selectCurrentAppUsers(ApproveInstanceVo approveInstanceVo,String catagorId) throws BusinessException;

}
