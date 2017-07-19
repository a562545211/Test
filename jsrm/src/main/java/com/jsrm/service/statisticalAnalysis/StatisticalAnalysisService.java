package com.jsrm.service.statisticalAnalysis;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.common.PageVO;
import com.jsrm.base.service.BaseService;
import com.jsrm.model.catalog.BaseKnowledge;
import com.jsrm.model.catalog.Category;
import com.jsrm.web.vo.statisticalAnalysis.*;

import java.util.List;
import java.util.Map;


/**
 * 用户service
 * Created by liguoxiang on 2016/11/14.
 */
public interface StatisticalAnalysisService extends BaseService {

    /**
     * 资源分类统计(资源类型)
     * @return
     * @throws BusinessException
     */
    public List<StatisticalVo> queryResourceTypeNum(Object[] parameArrayList) throws BusinessException;

    /**
     *资源分类统计(资源类型总量)
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public List<StatisticalVo> queryResourceTypeNumTotal(Object[] parameArrayList) throws BusinessException;

    /**
     * 个人上传总量
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public List<UploadNumber> queryUploadNumber(Object[] parameArrayList) throws BusinessException;

    /**
     *资源形式统计(资源格式)
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public List<ResourceForm> getResourceFormNum(Object[] parameArrayList) throws BusinessException;

    /**
     * 资源形式统计(资源格式总量)
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public List<ResourceForm> getResourceFormNumTotal(Object[] parameArrayList) throws BusinessException;

    /**
     * 选题发稿统计
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public List<SelectedTopic> getSelectedTopic(Object[] parameArrayList) throws BusinessException;

    /**
     * 资源审核统计
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public List<ResourceAudit> getResourceAudit(Object[] parameArrayList) throws BusinessException;

    /**
     * 资源统计（审核统计-个人审核数量,上传审核数量,发稿审核数量）
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public List<ResourceAudit> queryResourceAuditNum(Object[] parameArrayList) throws BusinessException;

    /**
     * 资源统计（审核统计-发稿复审）
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public List<ReappAudit> queryReappAuditNum(Object[] parameArrayList) throws BusinessException;

    /**
     * 知识点统计
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public List<KnowledgeStatisticalVo> queryKnowledgeNum(Object[] parameArrayList) throws BusinessException;

    /**
     * 资源统计（审核统计-发稿终审）
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public List<FinalAudit> queryFinalAuditNum(Object[] parameArrayList) throws BusinessException;

    /**i
     * 资源分类统计(资源统计)
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public List<StatisticalVo> getResourceClassificationStatic(Object[] parameArrayList) throws BusinessException;

    /**
     * 资源形式统计(资源统计)
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public List<ResourceForm> getResourceFormStatic(Object[] parameArrayList) throws BusinessException;

    /**
     * 学科资源分类统计
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public List<StatisticalVo> getSubjectAllNum(Object[] parameArrayList) throws BusinessException;

    /**
     * 获取目录前四级信息
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public List<Category> getCategory(Object[] parameArrayList) throws BusinessException;

    /**
     * 统计分析-工作量统计（角色：boss or 角色：主管）
     * @param pageNo 当前页
     * @param pageSize 每页数
     * @param phase 学段id
     * @param subject 学科
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @param createUserName 人员名称
     * @param sessionId 登录人的id
     * @return
     * @throws BusinessException
     */
    public PageVO<Workload> getWorkload(Integer pageNo, Integer pageSize, String phase, String subject, String startTime, String endTime, String createUserName, String sessionId) throws Exception;

    /**
     * 一级二级资源分类统计
     * @param createUserId 用户id
     * @param phase 一级id
     * @param subject 二级id
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @return
     */
    public List<Map<String, Object>> getResourceStatistics(String createUserId, String phase, String subject, String version, String books, String startTime, String endTime) throws Exception;

    /**
     * 获取知识点
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public List<BaseKnowledge> getKnowledge(Object[] parameArrayList) throws BusinessException;

    List<Map<String, Object>> getCategoryRelations(Object[] parameArrayList) throws BusinessException;



}
