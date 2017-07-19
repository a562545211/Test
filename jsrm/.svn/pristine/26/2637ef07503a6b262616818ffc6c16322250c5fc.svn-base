package com.jsrm.service.statisticalAnalysis.impl;

import com.jsrm.base.service.impl.BaseSupportServiceImpl;
import com.jsrm.base.utils.RedisUtil;
import com.jsrm.service.catalog.category.CategoryService;
import com.jsrm.service.statisticalAnalysis.StatisticalAnalysisService;
import com.jsrm.service.statisticalAnalysis.TaskService;
import com.jsrm.web.vo.statisticalAnalysis.ResourceAudit;
import com.jsrm.web.vo.statisticalAnalysis.StatisticalVo;
import net.sf.json.JSONArray;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;

/**
 * Created by jichao on 2017/5/4.
 */
@Service
public class TaskServiceImpl extends BaseSupportServiceImpl implements TaskService {

    @Resource
    private CategoryService categoryServiceImpl;
    @Resource
    private StatisticalAnalysisService statisticalAnalysisService;

    private List<Map<String, Object>> getLevel() throws Exception {
        List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();

        resultList.add(new HashMap<String, Object>());

        List<String> level1 = categoryServiceImpl.getLevelByDeep("level1");
        List<String> level2 = categoryServiceImpl.getLevelByDeep("level2");
        List<String> level3 = categoryServiceImpl.getLevelByDeep("level3");
        List<String> level4 = categoryServiceImpl.getLevelByDeep("level4");

        Iterator<String> i1 = level1.iterator();
        while(i1.hasNext()){
            String next = i1.next();
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("phaseId", next);
            resultList.add(map);
        }

        Iterator<String> i2 = level2.iterator();
        while (i2.hasNext()){
            String next = i2.next();
            String[] split = next.split("-");
            if(split.length == 2){
                Map<String, Object> map = new HashMap<String, Object>();
                map.put("phaseId", split[0]);
                map.put("subjectId", split[1]);
                resultList.add(map);
            }
        }

        Iterator<String> i3 = level3.iterator();
        while (i3.hasNext()){
            String next = i3.next();
            String[] split = next.split("-");
            if(split.length == 3){
                Map<String, Object> map = new HashMap<String, Object>();
                map.put("phaseId", split[0]);
                map.put("subjectId", split[1]);
                map.put("version", split[2]);
                resultList.add(map);
            }
        }

        Iterator<String> i4 = level4.iterator();
        while (i4.hasNext()){
            String next = i4.next();
            String[] split = next.split("-");
            if(split.length == 4){
                if(!split[3].equals("wu")){
                    Map<String, Object> map = new HashMap<String, Object>();
                    map.put("phaseId", split[0]);
                    map.put("subjectId", split[1]);
                    map.put("version", split[2]);
                    map.put("sakuji", split[3]);
                    resultList.add(map);
                }
            }
        }

        return resultList;
    }

    private String getKey(String prefix, Map<String, Object> params){
        String result = prefix;

        String phaseId = (String) params.get("phaseId");
        String subjectId = (String) params.get("subjectId");
        String version = (String) params.get("version");
        String sakuji = (String) params.get("sakuji");
        String userId = (String) params.get("userId");
        String startTime = (String) params.get("startTime");
        String endTime = (String) params.get("endTime");

        if(StringUtils.isNotEmpty(phaseId)) result += "-" + phaseId;
        if(StringUtils.isNotEmpty(subjectId)) result += "-" + subjectId;
        if(StringUtils.isNotEmpty(version)) result += "-" + version;
        if(StringUtils.isNotEmpty(sakuji)) result += "-" + sakuji;
        if(StringUtils.isNotEmpty(userId)) result += "-" + userId;
        if(StringUtils.isNotEmpty(startTime)) result += "-s" + startTime;
        if(StringUtils.isNotEmpty(endTime)) result += "-e" + endTime;

        return result;

    }

    @Override
    public String intoRedis(){
        List<Map<String, Object>> level = null;
        try {
            level = this.getLevel();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("参数获取失败，方法结束");
            return "error";
        }

        System.out.println("一共：" + level.size() + "条");

        Iterator<Map<String, Object>> it = level.iterator();

        int i = 0;

        while (it.hasNext()){
            Map<String, Object> params = it.next();
            try {
                List<ResourceAudit> resourceAuditList = statisticalAnalysisService.queryResourceAuditNum(new Object[]{params});
                List<StatisticalVo> statisticalVoList = statisticalAnalysisService.queryResourceTypeNumTotal(new Object[]{params});
                List<Map<String, Object>> resourceStatisticList = statisticalAnalysisService.getResourceStatistics(null, (String) params.get("phaseId"), (String) params.get("subjectId"), (String) params.get("version"), (String) params.get("sakuji"), null, null);

                RedisUtil.set(getKey("queryResourceAuditNum", params), JSONArray.fromObject(resourceAuditList).toString());
                RedisUtil.set(getKey("queryResourceTypeNumTotal", params), JSONArray.fromObject(statisticalVoList).toString());
                RedisUtil.set(getKey("getResourceStatistics", params), JSONArray.fromObject(resourceStatisticList).toString());
                System.out.println("这是第" + i++ + "条");
            } catch (Exception e) {
                e.printStackTrace();
                System.out.println("向redis赋值出错");
            }
        }

        System.out.println("方法结束");

        return "success";
    }

    @Override
    public int deleteRedis() {
        Set<String> keySet = new HashSet<String>();

        String[] keyPrefixArray = new String[]{"queryResourceTypeNum*", "queryResourceTypeNumTotal*", "queryUploadNumber*", "getResourceFormNum*", "getResourceFormNumTotal*", "getSelectedTopic*", "queryResourceAuditNum*", "queryReappAuditNum*", "queryFinalAuditNum*", "getResourceStatistics*","all-*","final-*"};

        for (int i = 0; i < keyPrefixArray.length; i++) {
            Set<String> keys = RedisUtil.getKeys(keyPrefixArray[i]);
            keySet.addAll(keys);
        }

        String[] keyArray = keySet.toArray(new String[]{});

        int del = RedisUtil.del(keyArray).intValue();

//        for (int i = 0; i < keyArray.length; i++) {
//            System.out.println(keyArray[i]);
//        }

        return del;
    }

    public static void main(String[] args){
        List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
        Map<String, Object> map = new HashMap<String, Object>();

        map.put("aaa", 111);
        resultList.add(map);

        //map.clear();

        System.out.println(resultList.get(0).get("aaa"));
    }
}
