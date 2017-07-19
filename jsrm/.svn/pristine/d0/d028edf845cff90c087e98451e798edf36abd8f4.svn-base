package com.jsrm.service.statisticalAnalysis.impl;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.jsrm.service.statisticalAnalysis.CreateWorkloadRedisService;
import com.jsrm.service.statisticalAnalysis.TaskService;
import com.jsrm.service.statisticalAnalysis.TimerService;

@Service
public class TimerServiceImpl  implements TimerService{
	
	public static final Log log=LogFactory.getLog(TimerServiceImpl.class);
	
	@Resource
	private CreateWorkloadRedisService createWorkloadRedisServiceImpl;
	
	@Resource
	private TaskService taskServiceImpl;

	@Scheduled(cron="0 0 0 * * ?")
	@Override
	public void taskJob() {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		log.info("定时任务调用:"+df.format(new Date()));
		taskServiceImpl.deleteRedis();
		taskServiceImpl.intoRedis();
		createWorkloadRedisServiceImpl.createWorkloadRedis();
		
	}

}
