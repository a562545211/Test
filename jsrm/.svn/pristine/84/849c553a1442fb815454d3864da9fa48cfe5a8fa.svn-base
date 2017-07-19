package com.jsrm.service.statisticalAnalysis;

import java.util.List;
import java.util.Map;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.service.BaseService;

public interface CreateWorkloadRedisService extends BaseService{
	
    /**
     * 定时任务
     * @throws BusinessException
     */
    public void createWorkloadRedis() throws BusinessException;
    
    /**
     * 获取指定level内容，已做去重操作
     * @param columnName
     * @return
     * @throws BusinessException
     */
    List<Map> getPhaseAndSubject(String columnName) throws BusinessException;
    
    /**
     * 获取sessionId
     * @return
     * @throws BusinessException
     */
    List<Map> getSessionId() throws BusinessException;
    
    /**
     * 获取指定登录人的工作统计的记录总数
     * @param id
     * @return
     * @throws BusinessException
     */
    Integer getTotalCount(String id)throws BusinessException;


}
