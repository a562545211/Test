package com.jsrm.service.statisticalAnalysis.impl;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.common.PageVO;
import com.jsrm.base.service.impl.BaseSupportServiceImpl;
import com.jsrm.base.utils.DateUtil;
import com.jsrm.base.utils.RedisUtil;
import com.jsrm.model.catalog.BaseKnowledge;
import com.jsrm.model.catalog.Category;
import com.jsrm.model.role.Role;
import com.jsrm.service.roleManageService.RoleManageService;
import com.jsrm.service.statisticalAnalysis.StatisticalAnalysisService;
import com.jsrm.service.statistics.StatisticsService;
import com.jsrm.web.vo.statisticalAnalysis.*;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

import java.text.Format;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 用户service实现
 * Created by liguoxiang on 2016/11/14.
 */
@Service
public class StatisticalAnalysisServiceImpl extends BaseSupportServiceImpl implements StatisticalAnalysisService {
	 public static final Log log = LogFactory.getLog(StatisticalAnalysisServiceImpl.class);

    @Resource
    private RoleManageService roleManageService;
    
    @Value("${redis.switch}")
    private String redisSwitch;

    private String getRedis(String key){
        if(redisSwitch.equals("on"))
            return RedisUtil.get(key);
        else
            return "";
    }
    
    private void setRedis(String key, String value) {
    	if(redisSwitch.equals("on")){
    		RedisUtil.set(key, value);
    	}
    }
    

    @Override
    public List<StatisticalVo> queryResourceTypeNum(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectList("statisticalAnalysis.queryResourceTypeNum",parameArrayList);
    }

    @Override
    public List<StatisticalVo> queryResourceTypeNumTotal(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectList("statisticalAnalysis.queryResourceTypeNumTotal",parameArrayList);
    }

    @Override
    public List<UploadNumber> queryUploadNumber(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectList("statisticalAnalysis.queryUploadNumber",parameArrayList);
    }

    @Override
    public List<ResourceForm> getResourceFormNum(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectList("statisticalAnalysis.getResourceFormNum",parameArrayList);
    }

    @Override
    public List<ResourceForm> getResourceFormNumTotal(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectList("statisticalAnalysis.getResourceFormNumTotal",parameArrayList);
    }

    @Override
    public List<SelectedTopic> getSelectedTopic(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectList("statisticalAnalysis.getSelectedTopic",parameArrayList);
    }

    @Override
    public List<ResourceAudit> getResourceAudit(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectList("statisticalAnalysis.getResourceAudit",parameArrayList);
    }

    @Override
    public List<ResourceAudit> queryResourceAuditNum(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectList("statisticalAnalysis.queryResourceAuditNum",parameArrayList);
    }

    @Override
    public List<ReappAudit> queryReappAuditNum(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectList("statisticalAnalysis.queryReappAuditNum",parameArrayList);
    }

    @Override
    public List<KnowledgeStatisticalVo> queryKnowledgeNum(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectList("statisticalAnalysis.queryKnowledgeNum",parameArrayList);
    }

    @Override
    public List<FinalAudit> queryFinalAuditNum(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectList("statisticalAnalysis.queryFinalAuditNum",parameArrayList);
    }

    @Override
    public List<StatisticalVo> getResourceClassificationStatic(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectList("statisticalAnalysis.getResourceClassificationStatic",parameArrayList);
    }

    @Override
    public List<ResourceForm> getResourceFormStatic(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectList("statisticalAnalysis.getResourceFormStatic",parameArrayList);
    }

    @Override
    public List<StatisticalVo> getSubjectAllNum(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectList("statisticalAnalysis.getSubjectAllNum",parameArrayList);
    }

    @Override
    public List<Category> getCategory(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectList("statisticalAnalysis.getCategory",parameArrayList);
    }

    @Override
    public PageVO<Workload> getWorkload(Integer pageNo, Integer pageSize, String phase, String subject, String startTime, String endTime, String createUserName, String sessionId) throws Exception {
        String roleCode = null;
        if(subject != null && !"".equals(subject)){
            if(subject.indexOf("-") > -1)
                subject = subject.split("-")[1];
        }
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("userId", sessionId);
        List<Role> roles = roleManageService.queryRoleOne(new Object[]{map});
        if(roles.size() > 0){
            roleCode = roles.get(0).getRoleCode().toUpperCase();
        }
        
        String redisKey = getRedisKey(phase, subject, startTime, endTime, roleCode, ""+pageNo, sessionId);		//reids key值
        
        String data = this.getRedis(redisKey);		//在redis中根据key值获取内容
        if(StringUtils.isNotBlank(data)) {		//如果存在内容直接返回	
        	Map<String, Class> classMap = new HashMap<String, Class>();
        	classMap.put("result", Workload.class);
        	PageVO<Workload> workload = (PageVO<Workload>) JSONObject.toBean(JSONObject.fromObject(data), PageVO.class, classMap);
        	return workload;
        } else {
        	Map<String,Object> params = new HashMap<String,Object>();
            params.put("phase", phase);
            params.put("subject", subject);
            params.put("startTime", DateUtil.changeStringToDate(startTime));
            params.put("endTime", DateUtil.changeStringToDate(endTime));
            params.put("createUserName", createUserName);
            params.put("userId", sessionId);
            //学科编辑；主管或者boss不需要这个判断字段
            if("ZG".equals(roleCode) || "BOSS".equals(roleCode))
                params.put("bj", null);
            else
                params.put("bj", "notNone");
            

            PageVO<Workload> pageVo = this.getDao().pagedQuery("statisticalAnalysis.getWorkload", pageNo, pageSize, new Object[]{params});
            if(pageVo != null) {
            	JSONObject jsonObject = JSONObject.fromObject(pageVo);
            	
            	setRedis(redisKey, jsonObject.toString());
            	log.info("创建缓存【key】="+redisKey+"【value】="+jsonObject.toString());
            	
            }
            return pageVo;
        }
    }
    
    /**
     * 根据查询条件生成redis key值
     * @param phase
     * @param subject
     * @param startTime
     * @param endTime
     * @param roleCode
     * @return
     */
    private String getRedisKey(String phase, String subject, String startTime, String endTime, String roleCode, String pageNo, String sessionId) {
    	String key = "";
    	
    	Format dataForm = new SimpleDateFormat("yyyy-mm-dd");
    	
    	if(StringUtils.isNotBlank(roleCode)) {
    		if("ZG".equals(roleCode) || "BOSS".equals(roleCode)) {			//如果用户是主管或者boss是可以查看所有人的工作量
    			key += "all-";						//全部
    		} else {
    			key += "final-"+sessionId+"-";		//个人
    		}
    	}
    	
    	if(StringUtils.isNotBlank(pageNo)) {		//分页信息
    		key += pageNo + "-";
    	}
    	
    	if(StringUtils.isNotBlank(phase)) {
    		key += phase + "-";
    	}
    	if(StringUtils.isNotBlank(subject)) {
    		key += subject + "-";
    	}
    	if(StringUtils.isNotBlank(startTime)) {
    		key += dataForm.format(startTime) + "-";
    	}
    	if(StringUtils.isNotBlank(endTime)) {
    		key += dataForm.format(endTime) + "-";
    	}
    	
    	return key;
    }

    @Override
    public List<Map<String, Object>> getResourceStatistics(String createUserId, String phase, String subject, String version, String books, String startTime, String endTime) throws Exception {
        if(subject != null && !"".equals(subject)){
            if(subject.indexOf("-") > -1)
                subject = subject.split("-")[1];
        }
        if(version != null && !"".equals(version)){
            if(version.indexOf("-") > -1)
                version = version.split("-")[2];
        }
        if(books != null && !"".equals(books)){
            if(books.indexOf("-") > -1)
                books = books.split("-")[3];
        }

        Map<String,Object> params = new HashMap<String,Object>();
        params.put("createUserId", createUserId);
        params.put("startTime", DateUtil.changeStringToDate(startTime));
        params.put("endTime", DateUtil.changeStringToDate(endTime));
        //params.put("categoriesId", categoriesId);
        params.put("phase", phase);
        params.put("subject", subject);
        params.put("version", version);
        params.put("books", books);
        return this.getDao().selectList("statisticalAnalysis.getResourceStatistics", new Object[]{params});
    }

    @Override
    public List<BaseKnowledge> getKnowledge(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectList("statisticalAnalysis.getKnowledge",parameArrayList);
    }

    @Override
    public List<Map<String, Object>> getCategoryRelations(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectList("statisticalAnalysis.getCategoryRelationLevels", parameArrayList);
    }

}
