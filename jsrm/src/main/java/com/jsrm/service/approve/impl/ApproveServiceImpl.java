package com.jsrm.service.approve.impl;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.common.ModelUtil;
import com.jsrm.base.common.PageVO;
import com.jsrm.base.service.impl.BaseSupportServiceImpl;
import com.jsrm.base.utils.BaseUtils;
import com.jsrm.base.utils.JSONUtil;
import com.jsrm.base.utils.UUIDUtils;
import com.jsrm.model.approve.ApproveDefinition;
import com.jsrm.model.approve.ApproveHistory;
import com.jsrm.model.approve.ApproveInstance;
import com.jsrm.model.resourceInfo.ResourceInfo;
import com.jsrm.model.user.User;
import com.jsrm.service.ResourceInfo.ResourceInfoService;
import com.jsrm.service.approve.ApproveService;
import com.jsrm.service.codeManage.CodeManageService;
import com.jsrm.service.selectTopic.SelectTopicService;
import com.jsrm.web.vo.ResourceInfoVo.ResourceInfoVo;
import com.jsrm.web.vo.approve.ApproveHistoryVo;
import com.jsrm.web.vo.approve.ApproveInstanceVo;
import com.jsrm.web.vo.vetting.VettingVo;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.*;

/**
 * 流程service实现
 * Created by wdCao on 2016/10/14.
 */
@Service
public class ApproveServiceImpl extends BaseSupportServiceImpl implements ApproveService {

    @Resource
    private ResourceInfoService resourceInfoService;

    @Resource
    private SelectTopicService selectTopicService;

    //编号管理service
    @Resource
    private CodeManageService codeManageService;

    @Override
    public ApproveDefinition getApproveDefinition(ApproveDefinition approveDefinition) throws BusinessException {
        Map<String, Object> param = new HashMap<String, Object>();
        BaseUtils.copyMap(param, approveDefinition);

        return this.getDao().selectOne("approve.selectApproveDefinition", new Object[]{param});
    }

    @Override
    public ApproveInstance getOneApproveInstance(ApproveInstance approveInstance) throws BusinessException {
        Map<String, Object> param = new HashMap<String, Object>();

        BaseUtils.copyMap(param, approveInstance);

        return this.getDao().selectOne("approve.selectOneApproveInstance", new Object[]{param});
    }

    @Override
    public void startApproveInstance(ApproveInstance approveInstance) throws BusinessException {
        Map<String, Object> param = new HashMap<String, Object>();
        BaseUtils.copyMap(param, approveInstance);

        this.getDao().insert("approve.addApproveInstance", new Object[]{param});
    }

    @Override
    public void updateApproveInstance(ApproveInstance approveInstance) throws BusinessException {
        Map<String, Object> param = new HashMap<String, Object>();
        BaseUtils.copyMap(param, approveInstance);

        this.getDao().update("approve.updateApproveInstance", new Object[]{param});
    }

    @Override
    public void saveApproveHistory(ApproveHistory approveHistory) throws BusinessException {
        Map<String, Object> param = new HashMap<String, Object>();
        BaseUtils.copyMap(param, approveHistory);

        this.getDao().insert("approve.addApproveHistory", new Object[]{param});
    }

    @Override
    public PageVO<ApproveInstance> queryApproveInstance(int pageNo, int pageSize, ApproveInstance approveInstance) throws BusinessException {
        Map<String, Object> param = new HashMap<String, Object>();
        BaseUtils.copyMap(param, approveInstance);

        return this.getDao().pagedQuery("approve.selectApproveInstance", pageNo, pageSize, new Object[]{param});
    }

    @Override
    public List<ApproveHistoryVo> queryApproveHistory(ApproveHistory approveHistory) throws BusinessException {
        Map<String, Object> param = new HashMap<String, Object>();
        BaseUtils.copyMap(param, approveHistory);

        return this.getDao().selectList("approve.selectApproveHistory", new Object[]{param});
    }

    @Override
    public ApproveHistory selectOneHistory(ApproveHistory approveHistory) throws BusinessException {
        Map<String, Object> param = new HashMap<String, Object>();
        BaseUtils.copyMap(param, approveHistory);

        return this.getDao().selectOne("approve.selectOneApproveHistory", new Object[]{param});
    }

    @Override
    public PageVO<VettingVo> queryVettingList(int pageNo, int pageSize, VettingVo vettingVo) throws BusinessException {
        Map<String, Object> param = new HashMap<String, Object>();
        BaseUtils.copyMap(param, vettingVo);

        List<String> types = new ArrayList<String>();
        types.add("ORI");
        types.add("PRO");
        types.add("END");
        param.put("busiType", types);

        return this.getDao().pagedQuery("approve.selectVetting", pageNo, pageSize, new Object[]{param});
    }

    @Override
    public PageVO<VettingVo> queryVettedList(int pageNo, int pageSize, VettingVo vettingVo) throws BusinessException {
        Map<String, Object> param = new HashMap<String, Object>();
        BaseUtils.copyMap(param, vettingVo);

        List<String> types = new ArrayList<String>();
        types.add("ORI");
        types.add("PRO");
        types.add("END");
        param.put("busiType", types);

        return this.getDao().pagedQuery("approve.selectVetted", pageNo, pageSize, new Object[]{param});
    }

    @Override
    public PageVO<VettingVo> queryTopicVettingList(int pageNo, int pageSize, VettingVo vettingVo) throws BusinessException {
        Map<String, Object> param = new HashMap<String, Object>();
        BaseUtils.copyMap(param, vettingVo);

        List<String> types = new ArrayList<String>();
        types.add("DRA");
        param.put("busiType", types);

        return this.getDao().pagedQuery("approve.selectVetting", pageNo, pageSize, new Object[]{param});
    }

    @Override
    public PageVO<VettingVo> queryTopicVettedList(int pageNo, int pageSize, VettingVo vettingVo) throws BusinessException {
        Map<String, Object> param = new HashMap<String, Object>();
        BaseUtils.copyMap(param, vettingVo);

        List<String> types = new ArrayList<String>();
        types.add("DRA");
        param.put("busiType", types);

        return this.getDao().pagedQuery("approve.selectVetted", pageNo, pageSize, new Object[]{param});
    }

    @Override
    public String startWorkFlow(ResourceInfoVo resourceInfoVo) {
        String result = "0";        //默认返回失败

        ApproveDefinition approveDefinition = new ApproveDefinition();
        approveDefinition.setFlowType(resourceInfoVo.getResourceType());

        approveDefinition = this.getApproveDefinition(approveDefinition);       //获取流程定义信息

        if(approveDefinition != null) {
            ApproveInstance approveInstance = new ApproveInstance();        //流程实例
            String appInstanceId = UUIDUtils.getUUID();                     //流程实例id

            String flowDefJson = approveDefinition.getFlowDef();            //获取流程定义json

            List<Map<String, Object>> flowDefList = JSONUtil.json2List(flowDefJson);        //流程定义转换为list对象
            if (flowDefList != null && flowDefList.size() > 0) {
                String startToNode = "";                                        //保存开始节点下一节点

                for (Map<String, Object> data : flowDefList) {
                    if (StringUtils.equals("" + data.get("index"), "start")) {      //开始节点, 保存开始审批意见
                        ApproveHistory approveHistory = new ApproveHistory();
                        approveHistory.setId(UUIDUtils.getUUID());
                        approveHistory.setApproveUserId(resourceInfoVo.getCreateUserId());
                        approveHistory.setApproveUserName(resourceInfoVo.getCreateUserName());
                        approveHistory.setTappInstanceId(appInstanceId);
                        approveHistory.setBusiId(resourceInfoVo.getId());
                        approveHistory.setBusiType(resourceInfoVo.getResourceType());
                        approveHistory.setTaskStartTime(new Date());
                        approveHistory.setTaskEndTime(new Date());
                        approveHistory.setTaskIndex("" + data.get("index"));
                        approveHistory.setNodeName("" + data.get("node"));
                        approveHistory.setOperateType("app");
                        approveHistory.setOpinion(resourceInfoVo.getAppriveDesc());
                        approveHistory.setIsPass("pass");
                        this.saveApproveHistory(approveHistory);            //保存历史审批意见

                        startToNode = "" + data.get("to");            //获取开始节点的下一节点

                        continue;
                    } else if (StringUtils.equals("" + data.get("index"), startToNode)) {     //第二节点

                        approveInstance.setId(appInstanceId);
                        approveInstance.settApproveDefId(approveDefinition.getId());
                        approveInstance.setBusiType(resourceInfoVo.getResourceType());
                        approveInstance.setBusiId(resourceInfoVo.getId());
                        approveInstance.setCreateTime(new Date());
                        approveInstance.setIsEdit(""+data.get("isEdit"));
                        approveInstance.setCurrentNode("" + data.get("index"));
                        approveInstance.setCurrentNodeName("" + data.get("node"));
                        approveInstance.setFlowDef(flowDefJson);
                        approveInstance.setFromUserId(resourceInfoVo.getCreateUserId());
                        approveInstance.setFromUserName(resourceInfoVo.getCreateUserName());
                        approveInstance.setCreateUserId(resourceInfoVo.getCreateUserId());
                        approveInstance.setCreateUserName(resourceInfoVo.getCreateUserName());

                        approveInstance.setState("1");
                        if(StringUtils.equals(resourceInfoVo.getResourceType(), "DRA")) {           //如果类型为发稿
                            String roleId = "" + data.get("roleId");      //获取节点角色id

                            String subjectId = resourceInfoVo.getSubjectId();

                            User user = this.getIdleRoleUser(roleId, subjectId, resourceInfoVo.getLoginUserId());   //根据角色id系统自动获取用户对象
                            if (user != null) {          //如果用户不为空
                                approveInstance.setAppUserId(user.getId());
                                approveInstance.setAppUserName(user.getUsername());
                            }
                        } else {
                            approveInstance.setAppUserId(resourceInfoVo.getApproveUserId());
                            approveInstance.setAppUserName(resourceInfoVo.getApproveUserName());
                        }

                       approveInstance.setUpdateTime(new Date());
                       this.startApproveInstance(approveInstance);         //启动流程

                       resourceInfoVo.setState("2");                       //审核中
                       resourceInfoVo.setApproverId(approveInstance.getAppUserId());
                       resourceInfoVo.setApprover(approveInstance.getAppUserName());

                        resourceInfoVo = createResourceCode(resourceInfoVo);        //生成编号
                       resourceInfoService.updateResourceInfo(resourceInfoVo);     //更新资源信息状态
                    }
                }
            }

            result = "1";
        }

        return result;
    }

    /**
     * 生成资源编号
     * @param resourceInfoVo
     * @return
     */
    public ResourceInfoVo createResourceCode(ResourceInfoVo resourceInfoVo) {

        if(StringUtils.equals(resourceInfoVo.getResourceType(), "END")) {           //成品文件
            if(StringUtils.isNotBlank(resourceInfoVo.getResourceFileCode())) {      //如果资源编号不为空则说明使用编号
                return resourceInfoVo;
            }
        }

        String resourceCode = codeManageService.getCodeGenerator(resourceInfoVo.gettResourceCode(), ModelUtil.getResourceType(resourceInfoVo.getResourceType()));
        if(StringUtils.equals(resourceInfoVo.getResourceType(), "DRA")) {       //发稿编号
            if(StringUtils.isNotBlank(resourceInfoVo.getResourceFileCode())) {      //如果资源编号不为空则说明使用编号
                return resourceInfoVo;
            } else{
                resourceInfoVo.setResourceTopicCode(resourceCode);                          //设置选题编号
                resourceInfoVo.setResourceFileCode(resourceCode);
            }
        } else {
            resourceInfoVo.setResourceFileCode(resourceCode);                           //设置资源编号
        }

        return resourceInfoVo;
    }


    @Override
    public String submitTask(ApproveInstanceVo approveInstanceVo) throws BusinessException {
        ApproveInstance approveInstance = new ApproveInstance();
        approveInstance.setBusiId(approveInstanceVo.getBusiId());
        approveInstance.setBusiType(approveInstanceVo.getBusiType());
        approveInstance.setId(approveInstanceVo.getId());

        approveInstance = this.getOneApproveInstance(approveInstance);          //获取流程实例信息
        BaseUtils.copyNonNullProperties(approveInstanceVo, approveInstance);    //将数据库获取内容copy至vo中

        String isPass = approveInstanceVo.getIsPass();          //获取审批意见是否同意

        ResourceInfoVo resourceInfo = new ResourceInfoVo();
        resourceInfo.setId(approveInstanceVo.getBusiId());

        String appUserId = "";
        String appUserName = "";

        if(StringUtils.equals(isPass, "pass")) {       //如果同意就进入下一环节，如果不同意就直接退回承办人

            Map<String, Object> nextMap = getNextTask(approveInstanceVo);           //下一环节

            this.addApproveHistory(approveInstanceVo, "app");      //保存历史审批意见
            if(StringUtils.equals("end", ""+nextMap.get("index"))) {                //如果下一环节为结束环节
                approveInstance.setState("2");      //审批结束

                resourceInfo.setState("3");         //设置业务状态为审批通过

            } else {
                Map<String, Object> map = new HashMap<>();
                map.put("id", approveInstanceVo.getBusiId());
                String subjectId = this.getDao().selectOne("approve.getSubIdByBusiId", new Object[]{map});
                User user = getNextTaskApproveUser(approveInstanceVo, subjectId, nextMap);     //获取下一节点审批人
                if(user==null || StringUtils.isBlank(user.getId())) {
                    return "2";         //无审批人
                }
                approveInstance.setState("1");
                approveInstance.setFromUserId(approveInstance.getAppUserId());
                approveInstance.setFromUserName(approveInstance.getAppUserName());

                appUserId = user.getId();
                appUserName = user.getUsername();
                approveInstance.setAppUserId(appUserId);
                approveInstance.setAppUserName(appUserName);
                approveInstance.setCurrentNode(""+nextMap.get("index"));
                approveInstance.setCurrentNodeName(""+nextMap.get("node"));

                resourceInfo.setApprover(appUserName);
                resourceInfo.setApproverId(appUserId);

                resourceInfo.setState("2");         //设置业务状态为审批中
            }
        } else if(StringUtils.equals(isPass, "nopass")) {        //如果不同意,同时设置业务状态为审批不通过

            this.addApproveHistory(approveInstanceVo, "app");      //保存历史审批意见

            approveInstance.setFromUserId(approveInstance.getAppUserId());
            approveInstance.setFromUserName(approveInstance.getAppUserName());
            resourceInfo.setState("4");         //设置业务状态为审批不通过

            approveInstance.setState("3");      //退回状态
            approveInstance.setCurrentNode("start");            //返回开始节点
            approveInstance.setCurrentNodeName("初审人");       //返回初始节点
        }
        resourceInfoService.updateResourceInfo(resourceInfo);       //更新业务数据

        approveInstance.setUpdateTime(new Date());
        this.updateApproveInstance(approveInstance);                //更新审批流程

        return null;
    }

    /**
     * 批量退回
     * @param approveInstanceVo
     * @return
     * @throws BusinessException
     */
    @Override
    public String batchGoBack(ApproveInstanceVo approveInstanceVo) throws BusinessException {
        String reslut = "";
        if(StringUtils.isNotBlank(approveInstanceVo.getGoBackIds())) {

            String[] goBacks = StringUtils.split(approveInstanceVo.getGoBackIds(), ",");

            for (String goBack: goBacks) {
                approveInstanceVo = new ApproveInstanceVo();
                approveInstanceVo.setIsPass("nopass");
                approveInstanceVo.setId(goBack);

                reslut = this.submitTask(approveInstanceVo);
            }
        }

        reslut = "1";
        return reslut;
    }

    /**
     * 获取下一节点审批人
     * @param approveInstanceVo
     * @param taskMap
     * @return
     */
    public User getNextTaskApproveUser(ApproveInstanceVo approveInstanceVo, String subjectId, Map<String, Object> taskMap) {
        User user = new User();

        if(StringUtils.isBlank(approveInstanceVo.getBusiId())) {
            user = getIdleRoleUser(""+taskMap.get("roleId"), subjectId, approveInstanceVo.getLoginUserId());
            return user;
        }

        ApproveHistory approveHistory = new ApproveHistory();
        approveHistory.setBusiId(approveInstanceVo.getBusiId());
        approveHistory.setBusiType(approveInstanceVo.getBusiType());
        approveHistory.setTaskIndex(""+taskMap.get("index"));
        approveHistory = this.selectOneHistory(approveHistory);

        if(approveHistory!=null && StringUtils.isNotBlank(approveHistory.getApproveUserId())) {     //如果历史审批中已经存在，则下一环节为原来的审批人
            user.setId(approveHistory.getApproveUserId());
            user.setUsername(approveHistory.getApproveUserName());
        } else {            //否则根据角色查找最闲审批人
            user = getIdleRoleUser(""+taskMap.get("roleId"), subjectId, approveInstanceVo.getLoginUserId());
        }

        return user;
    }

    /**
     * 获取节点信息
     * @param approveInstanceVo
     * @param index
     * @return
     */
    public Map<String, Object> getTask(ApproveInstanceVo approveInstanceVo, String index) {
        Map<String, Object> data = null;
        if(StringUtils.isNotBlank(approveInstanceVo.getFlowDef())) {
            List<Map<String, Object>> taskList = JSONUtil.json2List(approveInstanceVo.getFlowDef());
            if (taskList != null && taskList.size() > 0) {
                for (Map<String, Object> _data : taskList) {
                    if(StringUtils.equals(index, ""+_data.get("index"))) {
                        data = _data;
                    }
                }
            }
        }

        return data;
    }

    /**
     * 获取下一节点信息
     * @param approveInstanceVo
     * @return
     */
    public Map<String, Object> getNextTask(ApproveInstanceVo approveInstanceVo) {
        Map<String, Object> data = new HashMap<String, Object>();

        if(StringUtils.isNotBlank(approveInstanceVo.getFlowDef())) {
            List<Map<String, Object>> taskList = JSONUtil.json2List(approveInstanceVo.getFlowDef());

            if(taskList!=null && taskList.size()>0) {
                String nextTask = "";

                for (Map<String, Object> _data : taskList) {

                    if(StringUtils.equals(approveInstanceVo.getCurrentNode(), ""+_data.get("index"))) {         //如果是当前环节
                        nextTask = ""+_data.get("to");      //下一环节

                        if(StringUtils.equals(nextTask, "end")) {       //如果下一环节为结束节点
                            data.put("index", "end");
                            break;
                        }
                    } else if(StringUtils.equals(nextTask, ""+_data.get("index"))) {                //如果下一环节
                        data = _data;
                        break;
                    }
                }
            }

            return data;
        }

        return data;
    }

    /**
     * 添加审批记录
     * @param approveInstanceVo
     * @param appType   操作类型 app：审批， trans：转发
     */
    @Transactional
    public void addApproveHistory(ApproveInstanceVo approveInstanceVo, String appType) {
        ApproveHistory approveHistory = new ApproveHistory();
        approveHistory.setId(UUIDUtils.getUUID());

        if(StringUtils.equals(approveInstanceVo.getCurrentNode(), "start")) {       //如果是发起节点
            approveHistory.setApproveUserId(approveInstanceVo.getCreateUserId());
            approveHistory.setApproveUserName(approveInstanceVo.getCreateUserName());
        } else {
            approveHistory.setApproveUserId(approveInstanceVo.getAppUserId());
            approveHistory.setApproveUserName(approveInstanceVo.getAppUserName());
        }

        approveHistory.setBusiType(approveInstanceVo.getBusiType());
        approveHistory.setBusiId(approveInstanceVo.getBusiId());
        approveHistory.setTaskIndex(approveInstanceVo.getCurrentNode());
        approveHistory.setNodeName(approveInstanceVo.getCurrentNodeName());

        approveHistory.setOperateType(appType);
        approveHistory.setTappInstanceId(approveInstanceVo.getId());

        if(StringUtils.equals(appType, "app")) {        //如果是审批操作则保存审批意见
            approveHistory.setIsPass(approveInstanceVo.getIsPass());
            approveHistory.setOpinion(approveInstanceVo.getApproveOpinion());
        }

        approveHistory.setTaskStartTime(approveInstanceVo.getUpdateTime());
        approveHistory.setTaskEndTime(new Date());

        this.saveApproveHistory(approveHistory);

    }

    @Override
    public User getIdleRoleUser(String roleId, String subjectId, String loginUserid) throws BusinessException {
        HashMap<String, Object> data = new HashMap<String, Object>();
        data.put("roleId", roleId);
        data.put("subjectId", subjectId);
        data.put("loginUserId", loginUserid);

        User user = null;

        HashMap<String, Object> reslut = this.getDao().selectOne("approve.selectRoleUserIdle", new Object[]{data});
        if(reslut != null) {
            user = new User();

            if(reslut.get("username") != null) {
                user.setUsername(""+reslut.get("username"));
            }
            if(reslut.get("userId") != null) {
                user.setId(""+reslut.get("userId"));
            }
        }

        return user;
    }

    @Override
    public User getIdelResourceApp(ResourceInfoVo resourceInfoVo) throws BusinessException {
        User user = null;

        ApproveInstanceVo approveInstanceVo = new ApproveInstanceVo();
        approveInstanceVo.setBusiId(resourceInfoVo.getId());
        approveInstanceVo.setBusiType(resourceInfoVo.getResourceType());

        approveInstanceVo.setLoginUserId(resourceInfoVo.getLoginUserId());

        ApproveDefinition approveDefinition = new ApproveDefinition();
        approveDefinition.setFlowType(resourceInfoVo.getResourceType());

        approveDefinition = this.getApproveDefinition(approveDefinition);       //获取流程定义信息

        if(approveDefinition != null) {
            List<Map<String, Object>> flowDefList = JSONUtil.json2List(approveDefinition.getFlowDef());        //流程定义转换为list对象
            if (flowDefList != null && flowDefList.size() > 0) {
                String startToNode = "";                                        //保存开始节点下一节点

                for (Map<String, Object> data : flowDefList) {
                    if (StringUtils.equals("" + data.get("index"), "start")) {      //开始节点
                        startToNode = "" + data.get("to");
                        continue;
                    } else if (StringUtils.equals("" + data.get("index"), startToNode)) {
                        user = this.getNextTaskApproveUser(approveInstanceVo, resourceInfoVo.getSubjectId(), data);        //获取下一环节审批人
                    }
                }
            }
        }

        return user;
    }

    @Override
    public void transpondTask(ApproveInstanceVo approveInstanceVo) throws BusinessException {
        ApproveInstance approveInstance = new ApproveInstance();
        BaseUtils.copyNonNullProperties(approveInstance, approveInstanceVo);
        approveInstance = this.getOneApproveInstance(approveInstance);

        BaseUtils.copyNonNullProperties(approveInstanceVo, approveInstance);
        this.addApproveHistory(approveInstanceVo, "trans");         //保存审批历史记录

        approveInstance.setAppUserId(approveInstanceVo.getToUserId());
        approveInstance.setAppUserName(approveInstanceVo.getToUserName());
        approveInstance.setUpdateTime(new Date());
        approveInstance.setCreateTime(new Date());
        this.updateApproveInstance(approveInstance);                //更新流程信息

        ResourceInfoVo resourceInfoVo = new ResourceInfoVo();
        resourceInfoVo.setId(approveInstance.getBusiId());

        ResourceInfo resourceInfo = null;
        if(StringUtils.equals(approveInstance.getBusiType(), "DRA")) {      //如果是发稿
            Map<String, Object> params = new HashMap<>();
            params.put("id", approveInstance.getBusiId());
            resourceInfo = selectTopicService.querySelectTopicById(new Object[]{params});
        } else {
            resourceInfo = resourceInfoService.queryResourceInfoById(resourceInfoVo);
        }
        resourceInfo.setApproverId(approveInstanceVo.getToUserId());
        resourceInfo.setApprover(approveInstanceVo.getToUserName());

        BaseUtils.copyNonNullProperties(resourceInfoVo, resourceInfo);
        resourceInfoService.updateResourceInfo(resourceInfoVo);     //更新业务信息内容
    }

    @Override
    public List<User> selectCurrentAppUsers(ApproveInstanceVo approveInstanceVo,String catagorId) throws BusinessException {

        ApproveInstance approveInstance = new ApproveInstance();
        approveInstance.setId(approveInstanceVo.getId());

        approveInstance = this.getOneApproveInstance(approveInstance);
        BaseUtils.copyNonNullProperties(approveInstanceVo, approveInstance);

        Map<String, Object> taskInfo = this.getTask(approveInstanceVo, approveInstance.getCurrentNode());       //获取当前节点信息

        Map<String, Object> data = new HashMap<String, Object>();
        data.put("roleId", taskInfo.get("roleId"));
        data.put("currentUserId", approveInstanceVo.getAppUserId());
        data.put("userName", approveInstanceVo.getToUserName());
        data.put("catagorId",catagorId);

        return this.getDao().selectList("approve.selectTaskRoleUsers", new Object[]{data});
    }
}