package com.jsrm.service.statisticalAnalysis.impl;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.service.impl.BaseSupportServiceImpl;
import com.jsrm.base.utils.RedisUtil;
import com.jsrm.service.statisticalAnalysis.CreateWorkloadRedisService;
import com.jsrm.service.statisticalAnalysis.StatisticalAnalysisService;

import net.sf.json.JSONObject;

@Service
public class CreateWorkloadRedisServiceImpl extends BaseSupportServiceImpl implements CreateWorkloadRedisService {
	public static final Log log=LogFactory.getLog(CreateWorkloadRedisServiceImpl.class);

	@Resource
	private StatisticalAnalysisService statisticalAnalysisService;


	/**
	 * 定时任务
	 */
	@Override
	public void createWorkloadRedis() {
		Integer pageNo = 1;   //页号
		Integer pageSize = 10; //默认每页记录数
		String phase = "";     //学段
		String subject = "";   //学科
		String startTime = ""; //开始时间
		String endTime = "";   //结束时间
		String createUserName = ""; //人员名称
		String sessionId = "";      //登录人id
		

		List<Map> level1List = this.getPhaseAndSubject("level1"); // 获取level1内容
		List<Map> level2List = this.getPhaseAndSubject("level2"); // 获取level2内容
		List<Map> sessionIdList = this.getSessionId(); // 获取sessionId
		
		// 没有选择学段和学科条件
		log.info("循环1开始...");
		for (Map map3 : sessionIdList) {
			JSONObject jobj3 = new JSONObject();
			jobj3.put("sessionId", map3.get("id"));

			Integer totalCount = this.getTotalCount(jobj3.getString("sessionId"));// 获取工作统计的记录总数
			if (totalCount % pageSize == 0) {
				pageNo = totalCount / pageSize;
			} else {
				pageNo = totalCount / pageSize + 1;
			}

			for (Integer i = 1; i <= pageNo; i++) {
				try {
					statisticalAnalysisService.getWorkload(i, pageSize, phase, subject, startTime, endTime,
							createUserName, jobj3.getString("sessionId"));
				} catch (Exception e) {
					e.printStackTrace();
				}

			}
		}
		log.info("循环1完毕");

		// 只有学段条件
		log.info("循环2开始...");
		for (Map map : level1List) {
			JSONObject jobj = new JSONObject();
			jobj.put("level1", map.get("level1"));
			for (Map map3 : sessionIdList) {
				JSONObject jobj3 = new JSONObject();
				jobj3.put("sessionId", map3.get("id"));

				Integer totalCount = this.getTotalCount(jobj3.getString("sessionId"));// 获取工作统计的记录总数
				if (totalCount % pageSize == 0) {
					pageNo = totalCount / pageSize;
				} else {
					pageNo = totalCount / pageSize + 1;
				}

				for (Integer i = 1; i <= pageNo; i++) {
					try {
						statisticalAnalysisService.getWorkload(i, pageSize, jobj.getString("level1"), subject,
								startTime, endTime, createUserName, jobj3.getString("sessionId"));
					} catch (Exception e) {
						e.printStackTrace();
					}

				}
			}
		}
		log.info("循环2完毕");

		// 有学段和学科条件
		log.info("循环3开始...");
		for (Map map : level1List) {
			JSONObject jobj = new JSONObject();
			jobj.put("level1", map.get("level1"));
			for (Map map2 : level2List) {
				JSONObject jobj2 = new JSONObject();
				jobj2.put("level2", map2.get("level2"));
				
				if(!StringUtils.contains(map2.get("level2").toString(), map.get("level1").toString())){		//判断学科是否在所在学段下，如果不在则进入下次循环
					continue;
				}

				for (Map map3 : sessionIdList) {
					JSONObject jobj3 = new JSONObject();
					jobj3.put("sessionId", map3.get("id"));

					Integer totalCount = this.getTotalCount(jobj3.getString("sessionId"));// 获取工作统计的记录总数
					if (totalCount % pageSize == 0) {
						pageNo = totalCount / pageSize;
					} else {
						pageNo = totalCount / pageSize + 1;
					}

					for (Integer i = 1; i <= pageNo; i++) {
						try {
							statisticalAnalysisService.getWorkload(i, pageSize, jobj.getString("level1"),
									jobj2.getString("level2"), startTime, endTime, createUserName,
									jobj3.getString("sessionId"));
						} catch (Exception e) {
							e.printStackTrace();
						}

					}
				}
			}

		}
		log.info("循环3完毕");
	}

	@Override
	public List<Map> getPhaseAndSubject(String columnName) throws BusinessException {
		Map<String, Object> dataMap = new HashMap<>();
		dataMap.put("columnName", columnName);

		return this.getDao().selectList("category.getPhaseAndSubject", new Object[] { dataMap });
	}

	@Override
	public List<Map> getSessionId() throws BusinessException {
		return this.getDao().selectList("category.getSessionId", new Object[] {});
	}

	@Override
	public Integer getTotalCount(String id) throws BusinessException {
		Map<String, Object> dataMap = new HashMap<>();
		dataMap.put("id", id);
		return this.getDao().selectCount("category.getTotalCount", new Object[] { dataMap });
	}

}
