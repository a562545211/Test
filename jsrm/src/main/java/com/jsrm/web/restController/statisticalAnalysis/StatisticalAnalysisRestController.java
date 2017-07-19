package com.jsrm.web.restController.statisticalAnalysis;

import com.jsrm.base.common.BaseRestController;
import com.jsrm.base.common.PageVO;
import com.jsrm.base.utils.BaseUtils;
import com.jsrm.base.utils.LevelType;
import com.jsrm.base.utils.RedisUtil;
import com.jsrm.model.catalog.BaseKnowledge;
import com.jsrm.model.catalog.Category;
import com.jsrm.model.catalog.Icategory;
import com.jsrm.model.system.UserDataAuthority;
import com.jsrm.model.user.User;
import com.jsrm.service.catalog.category.CategoryService;
import com.jsrm.service.catalog.knowledge.KnowledgeService;
import com.jsrm.service.statisticalAnalysis.StatisticalAnalysisService;
import com.jsrm.service.user.UserManagerService;
import com.jsrm.web.vo.catalog.BaseKnowledgeVo;
import com.jsrm.web.vo.statisticalAnalysis.*;
import com.jsrm.web.vo.user.UserVo;
import net.sf.json.JSON;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 统计分析
 * Created by liguoxiang on 2016/11/14.
 */
@RestController()
@RequestMapping("/statisticalAnalysis")
public class StatisticalAnalysisRestController extends BaseRestController {
    public static final Log log = LogFactory.getLog(StatisticalAnalysisRestController.class);      //log对象

    @Resource
    private StatisticalAnalysisService statisticalAnalysisService;
    @Resource
    private UserManagerService userManagerService;
    @Resource
    private CategoryService categoryService;

    /**
     *资源分类统计(资源类型)
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/queryResourceTypeNum")
    @ResponseBody
    private String queryResourceTypeNum(HttpServletRequest request, HttpServletResponse response,String endTime,String startTime,String categoriesId,String userId) {
        Map<String,Object> params = new HashMap<String,Object>();
        List<StatisticalVo> listRescource = new ArrayList<StatisticalVo>();
        try {
            HttpSession session = request.getSession(true);
            //从session里取的用户信息
            User userSession = (User) session.getAttribute("UserBean");
            if(userSession != null){
                if(userId !=null&&!"".equals(userId)){
                    params.put("userId",userId);
                }
                if(startTime != null&&!"".equals(startTime)) {
                    params.put("startTime",startTime);
                }
                if(endTime != null&&!"".equals(endTime)) {
                    params.put("endTime", endTime);
                }
                if(categoriesId != null && !"".equals(categoriesId)) {
                    List<Map<String, Object>> listCate = JSONArray.fromObject(categoriesId);
                    if (listCate.size() > 0) {
                        for (int i = 0; i < listCate.size(); i++) {
                            System.out.println();
                            if ("1".equals(listCate.get(i).get("deep").toString())) {
                                params.put("phaseId", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                            if ("2".equals(listCate.get(i).get("deep").toString())) {
                                params.put("subjectId", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                            if ("3".equals(listCate.get(i).get("deep").toString())) {
                                params.put("version", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                            if ("4".equals(listCate.get(i).get("deep").toString())) {
                                params.put("sakuji", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                        }
                    }
                }
                //params.put("categoriesId",getCategoriesIdFinal(categoriesId));
                String key = getKey("queryResourceTypeNum", params);
                String jsonResult = RedisUtil.get(key);
                if(StringUtils.isNotEmpty(jsonResult)){
                    listRescource = JSONArray.toList(JSONArray.fromObject(jsonResult), new HashMap<String, Object>(), new JsonConfig());
                }else{
                    listRescource = statisticalAnalysisService.queryResourceTypeNum(new Object[]{params});
                    RedisUtil.set(key, JSONArray.fromObject(listRescource).toString());
                }

            }
            return this.doSuccess("查询成功", listRescource);
        }catch (Exception e){
            e.printStackTrace();
            return this.doError("查询失败");
        }
    }

    /**
     *资源分类统计(资源类型总量)
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/queryResourceTypeNumTotal")
    @ResponseBody
    private String queryResourceTypeNumTotal(HttpServletRequest request, HttpServletResponse response,String categoriesId) {
        Map<String,Object> params = new HashMap<String,Object>();
        List<StatisticalVo> listRescource = new ArrayList<StatisticalVo>();
        try {
            HttpSession session = request.getSession(true);
            //从session里取的用户信息
            User userSession = (User) session.getAttribute("UserBean");
            if(userSession != null){
                if(categoriesId != null && !"".equals(categoriesId)) {
                    List<Map<String, Object>> listCate = JSONArray.fromObject(categoriesId);
                    if (listCate.size() > 0) {
                        for (int i = 0; i < listCate.size(); i++) {
                            if ("1".equals(listCate.get(i).get("deep").toString())) {
                                params.put("phaseId", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                            if ("2".equals(listCate.get(i).get("deep").toString())) {
                                params.put("subjectId", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                            if ("3".equals(listCate.get(i).get("deep").toString())) {
                                params.put("version", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                            if ("4".equals(listCate.get(i).get("deep").toString())) {
                                params.put("sakuji", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                        }
                    }
                }
                //params.put("categoriesId",getCategoriesIdFinal(categoriesId));
//                listRescource = statisticalAnalysisService.queryResourceTypeNumTotal(new Object[]{params});
                String key = getKey("queryResourceTypeNumTotal", params);
                String jsonResult = RedisUtil.get(key);
                if(StringUtils.isNotEmpty(jsonResult)){
                    listRescource = JSONArray.toList(JSONArray.fromObject(jsonResult), new HashMap<String, Object>(), new JsonConfig());
                }else{
                    listRescource = statisticalAnalysisService.queryResourceTypeNumTotal(new Object[]{params});
                    RedisUtil.set(key, JSONArray.fromObject(listRescource).toString());
                }
            }
            return this.doSuccess("查询成功", listRescource);
        }catch (Exception e){
            e.printStackTrace();
            return this.doError("查询失败");
        }
    }

    /**
     *个人上传总量
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/queryUploadNumber")
    @ResponseBody
    private String queryUploadNumber(HttpServletRequest request, HttpServletResponse response,String endTime,String startTime,String categoriesId,String userId) {
        Map<String,Object> params = new HashMap<String,Object>();
        List<UploadNumber> listRescource = new ArrayList<UploadNumber>();
        try {
            HttpSession session = request.getSession(true);
            //从session里取的用户信息。
            User userSession = (User) session.getAttribute("UserBean");
            if(userSession != null){
                if(userId !=null&&!"".equals(userId)){
                    params.put("userId",userId);
                }
                if(startTime != null&&!"".equals(startTime)) {
                    params.put("startTime",startTime);
                }
                if(endTime != null&&!"".equals(endTime)) {
                    params.put("endTime", endTime);
                }
                if(categoriesId != null && !"".equals(categoriesId)) {
                    List<Map<String, Object>> listCate = JSONArray.fromObject(categoriesId);
                    if (listCate.size() > 0) {
                        for (int i = 0; i < listCate.size(); i++) {
                            if ("1".equals(listCate.get(i).get("deep").toString())) {
                                params.put("phaseId", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                            if ("2".equals(listCate.get(i).get("deep").toString())) {
                                params.put("subjectId", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                            if ("3".equals(listCate.get(i).get("deep").toString())) {
                                params.put("version", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                            if ("4".equals(listCate.get(i).get("deep").toString())) {
                                params.put("sakuji", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                        }
                    }
                }
                //params.put("categoriesId",getCategoriesIdFinal(categoriesId));
//                    listRescource = statisticalAnalysisService.queryUploadNumber(new Object[]{params});
                String key = getKey("queryUploadNumber", params);
                String jsonResult = RedisUtil.get(key);
                if(StringUtils.isNotEmpty(jsonResult)){
                    listRescource = JSONArray.toList(JSONArray.fromObject(jsonResult), new HashMap<String, Object>(), new JsonConfig());
                }else{
                    listRescource = statisticalAnalysisService.queryUploadNumber(new Object[]{params});
                    RedisUtil.set(key, JSONArray.fromObject(listRescource).toString());
                }
            }
            return this.doSuccess("查询成功", listRescource);
        }catch (Exception e){
            e.printStackTrace();
            return this.doError("查询失败");
        }
    }
//    /**
//     *资源分类统计(资源统计)
//     * @param request
//     * @param response
//     * @return
//     */
//    @RequestMapping("/getResourceClassificationStatic")
//    @ResponseBody
//    private String getResourceClassificationStatic(HttpServletRequest request, HttpServletResponse response,String json,String jsonOne,String endTime,String startTime) {
//        Map<String,Object> params = new HashMap<String,Object>();
//        List<StatisticalVo> listRescource = new ArrayList<StatisticalVo>();
//        try {
//            HttpSession session = request.getSession(true);
//            //从session里取的用户信息
//            User userSession = (User) session.getAttribute("UserBean");
//            if(userSession != null){
//                params.put("userId",userSession.getId());
//                params.put("categoresCode",json);
//                params.put("categoresCodeOne",jsonOne);
//                if(startTime != null&&!"".equals(startTime)) {
//                    params.put("startTime", startTime);
//                }
//                if(endTime != null&&!"".equals(endTime)) {
//                    params.put("endTime", endTime);
//                }
//                listRescource = statisticalAnalysisService.getResourceClassificationStatic(new Object[]{params});
//            }
//            return this.doSuccess("查询成功", listRescource);
//        }catch (Exception e){
//            e.printStackTrace();
//            return this.doError("查询失败");
//        }
//    }

    /**
     *资源形式统计(资源格式)
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/getResourceFormNum")
    @ResponseBody
    private String getResourceFormNum(HttpServletRequest request, HttpServletResponse response,String endTime,String startTime,String categoriesId,String userId) {
        Map<String,Object> params = new HashMap<String,Object>();
        List<ResourceForm> listRescource = new ArrayList<ResourceForm>();
        try {
            HttpSession session = request.getSession(true);
            //从session里取的用户信息
            User userSession = (User) session.getAttribute("UserBean");
            if(userSession != null){
                if(userId !=null&&!"".equals(userId)){
                    params.put("userId",userId);
                }
                if(startTime != null&&!"".equals(startTime)) {
                    params.put("startTime", startTime);
                }
                if(endTime != null&&!"".equals(endTime)) {
                    params.put("endTime", endTime);
                }
                if(categoriesId != null && !"".equals(categoriesId)) {
                    List<Map<String, Object>> listCate = JSONArray.fromObject(categoriesId);
                    if (listCate.size() > 0) {
                        for (int i = 0; i < listCate.size(); i++) {
                            if ("1".equals(listCate.get(i).get("deep").toString())) {
                                params.put("phaseId", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                            if ("2".equals(listCate.get(i).get("deep").toString())) {
                                params.put("subjectId", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                            if ("3".equals(listCate.get(i).get("deep").toString())) {
                                params.put("version", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                            if ("4".equals(listCate.get(i).get("deep").toString())) {
                                params.put("sakuji", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                        }
                    }
                }
                //params.put("categoriesId",getCategoriesIdFinal(categoriesId));
//                listRescource = statisticalAnalysisService.getResourceFormNum(new Object[]{params});
                String key = getKey("getResourceFormNum", params);
                String jsonResult = RedisUtil.get(key);
                if(StringUtils.isNotEmpty(jsonResult)){
                    listRescource = JSONArray.toList(JSONArray.fromObject(jsonResult), new HashMap<String, Object>(), new JsonConfig());
                }else{
                    listRescource = statisticalAnalysisService.getResourceFormNum(new Object[]{params});
                    RedisUtil.set(key, JSONArray.fromObject(listRescource).toString());
                }
            }
            return this.doSuccess("查询成功", listRescource);
        }catch (Exception e){
            e.printStackTrace();
            return this.doError("查询失败");
        }
    }

    /**
     *资源形式统计(资源格式总量)
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/getResourceFormNumTotal")
    @ResponseBody
    private String getResourceFormNumTotal(HttpServletRequest request, HttpServletResponse response,String categoriesId) {
        Map<String,Object> params = new HashMap<String,Object>();
        List<ResourceForm> listRescource = new ArrayList<ResourceForm>();
        try {
            HttpSession session = request.getSession(true);
            //从session里取的用户信息
            User userSession = (User) session.getAttribute("UserBean");
            if(userSession != null){
                if(categoriesId != null && !"".equals(categoriesId)) {
                    List<Map<String, Object>> listCate = JSONArray.fromObject(categoriesId);
                    if (listCate.size() > 0) {
                        for (int i = 0; i < listCate.size(); i++) {
                            if ("1".equals(listCate.get(i).get("deep").toString())) {
                                params.put("phaseId", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                            if ("2".equals(listCate.get(i).get("deep").toString())) {
                                params.put("subjectId", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                            if ("3".equals(listCate.get(i).get("deep").toString())) {
                                params.put("version", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                            if ("4".equals(listCate.get(i).get("deep").toString())) {
                                params.put("sakuji", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                        }
                    }
                }
                //params.put("categoriesId",getCategoriesIdFinal(categoriesId));
//                listRescource = statisticalAnalysisService.getResourceFormNumTotal(new Object[]{params});
                String key = getKey("getResourceFormNumTotal", params);
                String jsonResult = RedisUtil.get(key);
                if(StringUtils.isNotEmpty(jsonResult)){
                    listRescource = JSONArray.toList(JSONArray.fromObject(jsonResult), new HashMap<String, Object>(), new JsonConfig());
                }else{
                    listRescource = statisticalAnalysisService.getResourceFormNumTotal(new Object[]{params});
                    RedisUtil.set(key, JSONArray.fromObject(listRescource).toString());
                }
            }
            return this.doSuccess("查询成功", listRescource);
        }catch (Exception e){
            e.printStackTrace();
            return this.doError("查询失败");
        }
    }

    /**
     *资源形式统计(资源统计)
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/getResourceFormStatic")
    @ResponseBody
    private String getResourceFormStatic(HttpServletRequest request, HttpServletResponse response,String json,String jsonOne,String endTime,String startTime) {
        Map<String,Object> params = new HashMap<String,Object>();
        List<ResourceForm> listRescource = new ArrayList<ResourceForm>();
        try {
            HttpSession session = request.getSession(true);
            //从session里取的用户信息
            User userSession = (User) session.getAttribute("UserBean");
            if(userSession != null){
//                params.put("userId",userSession.getId());
                params.put("categoresCode",json);
                params.put("categoresCodeOne",jsonOne);
                if(startTime != null&&!"".equals(startTime)) {
                    params.put("startTime", startTime);
                }
                if(endTime != null&&!"".equals(endTime)) {
                    params.put("endTime",endTime);
                }
                listRescource = statisticalAnalysisService.getResourceFormStatic(new Object[]{params});
            }
            return this.doSuccess("查询成功", listRescource);
        }catch (Exception e){
            e.printStackTrace();
            return this.doError("查询失败");
        }
    }

    /**
     * 选题发稿统计
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/getSelectedTopic")
    @ResponseBody
    private String getSelectedTopic(HttpServletRequest request, HttpServletResponse response,String endTime,String startTime,String categoriesId,String userId) {
        Map<String,Object> params = new HashMap<String,Object>();
        List<SelectedTopic> listRescource = new ArrayList<SelectedTopic>();
        try {
            HttpSession session = request.getSession(true);
            //从session里取的用户信息
            User userSession = (User) session.getAttribute("UserBean");
            if(userSession != null){
                if(userId !=null&&!"".equals(userId)){
                    params.put("userId",userId);
                }
                if(startTime != null&&!"".equals(startTime)) {
                    params.put("startTime", startTime);
                }
                if(endTime != null&&!"".equals(endTime)) {
                    params.put("endTime", endTime);
                }
                if(categoriesId != null && !"".equals(categoriesId)) {
                    List<Map<String, Object>> listCate = JSONArray.fromObject(categoriesId);
                    if (listCate.size() > 0) {
                        for (int i = 0; i < listCate.size(); i++) {
                            if ("1".equals(listCate.get(i).get("deep").toString())) {
                                params.put("phaseId", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                            if ("2".equals(listCate.get(i).get("deep").toString())) {
                                params.put("subjectId", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                            if ("3".equals(listCate.get(i).get("deep").toString())) {
                                params.put("version", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                            if ("4".equals(listCate.get(i).get("deep").toString())) {
                                params.put("sakuji", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                        }
                    }
                }
                //params.put("categoriesId",getCategoriesIdFinal(categoriesId));
//                listRescource = statisticalAnalysisService.getSelectedTopic(new Object[]{params});
                String key = getKey("getSelectedTopic", params);
                String jsonResult = RedisUtil.get(key);
                if(StringUtils.isNotEmpty(jsonResult)){
                    listRescource = JSONArray.toList(JSONArray.fromObject(jsonResult), new HashMap<String, Object>(), new JsonConfig());
                }else{
                    listRescource = statisticalAnalysisService.getSelectedTopic(new Object[]{params});
                    RedisUtil.set(key, JSONArray.fromObject(listRescource).toString());
                }
            }
            return this.doSuccess("查询成功", listRescource);
        }catch (Exception e){
            e.printStackTrace();
            return this.doError("查询失败");
        }
    }
    /**
     * 资源审核统计
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/getResourceAudit")
    @ResponseBody
    private String getResourceAudit(HttpServletRequest request, HttpServletResponse response,String endTime,String startTime,String userId) {
        Map<String,Object> params = new HashMap<String,Object>();
        List<ResourceAudit> listRescource = new ArrayList<ResourceAudit>();
        try {
            HttpSession session = request.getSession(true);
            //从session里取的用户信息
            User userSession = (User) session.getAttribute("UserBean");
            if(userSession != null){
                if(userId !=null&&!"".equals(userId)){
                    params.put("userId",userId);
                }
                if(startTime != null&&!"".equals(startTime)) {
                    params.put("startTime", startTime);
                }
                if(endTime != null&&!"".equals(endTime)) {
                    params.put("endTime", endTime);
                }
                listRescource = statisticalAnalysisService.getResourceAudit(new Object[]{params});
            }
            return this.doSuccess("查询成功", listRescource);
        }catch (Exception e){
            e.printStackTrace();
            return this.doError("查询失败");
        }
    }

    /**
     * 资源统计（审核统计-个人审核数量,上传审核数量,发稿审核数量）
     * @param request
     * @param response
     * @param endTime
     * @param startTime
     * @return
     */
    @RequestMapping("/queryResourceAuditNum")
    @ResponseBody
    private String queryResourceAuditNum(HttpServletRequest request, HttpServletResponse response,String endTime,String startTime,String categoriesId,String userId) {
        Map<String,Object> params = new HashMap<String,Object>();
        List<ResourceAudit> listRescource = new ArrayList<ResourceAudit>();
        try {
            HttpSession session = request.getSession(true);
            //从session里取的用户信息
            User userSession = (User) session.getAttribute("UserBean");
            if(userSession != null){
                if(userId !=null&&!"".equals(userId)){
                    params.put("userId",userId);
                }
                if(startTime != null&&!"".equals(startTime)) {
                    params.put("startTime", startTime);
                }
                if(endTime != null&&!"".equals(endTime)) {
                    params.put("endTime", endTime);
                }
                if(categoriesId != null && !"".equals(categoriesId)) {
                    List<Map<String, Object>> listCate = JSONArray.fromObject(categoriesId);
                    if (listCate.size() > 0) {
                        for (int i = 0; i < listCate.size(); i++) {
                            if ("1".equals(listCate.get(i).get("deep").toString())) {
                                params.put("phaseId", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                            if ("2".equals(listCate.get(i).get("deep").toString())) {
                                params.put("subjectId", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                            if ("3".equals(listCate.get(i).get("deep").toString())) {
                                params.put("version", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                            if ("4".equals(listCate.get(i).get("deep").toString())) {
                                params.put("sakuji", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                        }
                    }
                }
                //params.put("categoriesId",getCategoriesIdFinal(categoriesId));
//                listRescource = statisticalAnalysisService.queryResourceAuditNum(new Object[]{params});
                String key = getKey("queryResourceAuditNum", params);
                String jsonResult = RedisUtil.get(key);
                if(StringUtils.isNotEmpty(jsonResult)){
                    listRescource = JSONArray.toList(JSONArray.fromObject(jsonResult), new HashMap<String, Object>(), new JsonConfig());
                }else{
                    listRescource = statisticalAnalysisService.queryResourceAuditNum(new Object[]{params});
                    RedisUtil.set(key, JSONArray.fromObject(listRescource).toString());
                }
            }
            return this.doSuccess("查询成功", listRescource);
        }catch (Exception e){
            e.printStackTrace();
            return this.doError("查询失败");
        }
    }

    /**
     * 资源统计（审核统计-发稿复审）
     * @param request
     * @param response
     * @param endTime
     * @param startTime
     * @return
     */
    @RequestMapping("/queryReappAuditNum")
    @ResponseBody
    private String queryReappAuditNum(HttpServletRequest request, HttpServletResponse response,String endTime,String startTime,String categoriesId,String userId) {
        Map<String,Object> params = new HashMap<String,Object>();
        List<ReappAudit> listRescource = new ArrayList<ReappAudit>();
        try {
            HttpSession session = request.getSession(true);
            //从session里取的用户信息
            User userSession = (User) session.getAttribute("UserBean");
            if(userSession != null){
                if(userId !=null&&!"".equals(userId)){
                    params.put("userId",userId);
                }
                if(startTime != null&&!"".equals(startTime)) {
                    params.put("startTime", startTime);
                }
                if(endTime != null&&!"".equals(endTime)) {
                    params.put("endTime", endTime);
                }
                if(categoriesId != null && !"".equals(categoriesId)) {
                    List<Map<String, Object>> listCate = JSONArray.fromObject(categoriesId);
                    if (listCate.size() > 0) {
                        for (int i = 0; i < listCate.size(); i++) {
                            if ("1".equals(listCate.get(i).get("deep").toString())) {
                                params.put("phaseId", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                            if ("2".equals(listCate.get(i).get("deep").toString())) {
                                params.put("subjectId", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                            if ("3".equals(listCate.get(i).get("deep").toString())) {
                                params.put("version", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                            if ("4".equals(listCate.get(i).get("deep").toString())) {
                                params.put("sakuji", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                        }
                    }
                }
                //params.put("categoriesId",getCategoriesIdFinal(categoriesId));
//                listRescource = statisticalAnalysisService.queryReappAuditNum(new Object[]{params});
                String key = getKey("queryReappAuditNum", params);
                String jsonResult = RedisUtil.get(key);
                if(StringUtils.isNotEmpty(jsonResult)){
                    listRescource = JSONArray.toList(JSONArray.fromObject(jsonResult), new HashMap<String, Object>(), new JsonConfig());
                }else{
                    listRescource = statisticalAnalysisService.queryReappAuditNum(new Object[]{params});
                    RedisUtil.set(key, JSONArray.fromObject(listRescource).toString());
                }
            }
            return this.doSuccess("查询成功", listRescource);
        }catch (Exception e){
            e.printStackTrace();
            return this.doError("查询失败");
        }
    }

    /**
     * 资源统计（审核统计-发稿终审）
     * @param request
     * @param response
     * @param endTime
     * @param startTime
     * @return
     */
    @RequestMapping("/queryFinalAuditNum")
    @ResponseBody
    private String queryFinalAuditNum(HttpServletRequest request, HttpServletResponse response,String endTime,String startTime,String categoriesId,String userId) {
        Map<String,Object> params = new HashMap<String,Object>();
        List<FinalAudit> listRescource = new ArrayList<FinalAudit>();
        try {
            HttpSession session = request.getSession(true);
            //从session里取的用户信息
            User userSession = (User) session.getAttribute("UserBean");
            if(userSession != null){
                if(userId !=null&&!"".equals(userId)){
                    params.put("userId",userId);
                }
                if(startTime != null&&!"".equals(startTime)) {
                params.put("startTime", startTime);
                }
                if(endTime != null&&!"".equals(endTime)) {
                    params.put("endTime", endTime);
                }
                if(categoriesId != null && !"".equals(categoriesId)) {
                    List<Map<String, Object>> listCate = JSONArray.fromObject(categoriesId);
                    if (listCate.size() > 0) {
                        for (int i = 0; i < listCate.size(); i++) {
                            if ("1".equals(listCate.get(i).get("deep").toString())) {
                                params.put("phaseId", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                            if ("2".equals(listCate.get(i).get("deep").toString())) {
                                params.put("subjectId", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                            if ("3".equals(listCate.get(i).get("deep").toString())) {
                                params.put("version", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                            if ("4".equals(listCate.get(i).get("deep").toString())) {
                                params.put("sakuji", getCategoriesIdFinal(listCate.get(i).get("id").toString()));
                            }
                        }
                    }
                }
                //params.put("categoriesId",getCategoriesIdFinal(categoriesId));
//                listRescource = statisticalAnalysisService.queryFinalAuditNum(new Object[]{params});
                String key = getKey("queryFinalAuditNum", params);
                String jsonResult = RedisUtil.get(key);
                if(StringUtils.isNotEmpty(jsonResult)){
                    listRescource = JSONArray.toList(JSONArray.fromObject(jsonResult), new HashMap<String, Object>(), new JsonConfig());
                }else{
                    listRescource = statisticalAnalysisService.queryFinalAuditNum(new Object[]{params});
                    RedisUtil.set(key, JSONArray.fromObject(listRescource).toString());
                }
            }
            return this.doSuccess("查询成功", listRescource);
        }catch (Exception e){
            e.printStackTrace();
            return this.doError("查询失败");
        }
    }

    /**
     * 知识点统计
     * @param request
     * @param response
     * @param endTime
     * @param startTime
     * @return
     */
    @RequestMapping("/queryKnowledgeNum")
    @ResponseBody
    private synchronized String queryKnowledgeNum(HttpServletRequest request, HttpServletResponse response,String endTime,String startTime,String categoriesId,String json) {
        Map<String,Object> params = new HashMap<String,Object>();
        List<KnowledgeStatisticalVo> listRescource = new ArrayList<KnowledgeStatisticalVo>();
        try {
            HttpSession session = request.getSession(true);
            //从session里取的用户信息
            User userSession = (User) session.getAttribute("UserBean");
            if(userSession != null){
                //params.put("userId",userSession.getId());
                if(startTime != null&&!"".equals(startTime)) {
                    params.put("startTime", startTime);
                }
                if(endTime != null&&!"".equals(endTime)) {
                    params.put("endTime", endTime);
                }
                params.put("categoriesId",getCategoriesIdFinal(categoriesId));
                params.put("json",json);
                listRescource = statisticalAnalysisService.queryKnowledgeNum(new Object[]{params});
            }
            return this.doSuccess("查询成功", listRescource);
        }catch (Exception e){
            e.printStackTrace();
            return this.doError("查询失败");
        }
    }

//    /**
//     * 目录信息
//     * @param request
//     * @param response
//     * @return
//     */
//    @RequestMapping("/getCategory")
//    @ResponseBody
//    private String getCategory(HttpServletRequest request, HttpServletResponse response) {
//        Map<String,Object> params = new HashMap<String,Object>();
//        List<Category> listCategory = new ArrayList<Category>();
//        List<Category> listCategoryNew = new ArrayList<Category>();
//        try {
//            HttpSession session = request.getSession(true);
//            //从session里取的用户信息
//            User userSession = (User) session.getAttribute("UserBean");
//            if(userSession != null){
//                params.put("userId",userSession.getId());
//                listCategory = statisticalAnalysisService.getCategory(new Object[]{params});
//                for (int i = 0;i<listCategory.size();i++){
//                    listCategoryNew.add(listCategory.get(i));
//                }
//            }
//            return this.doSuccess("查询成功", listCategory);
//        }catch (Exception e){
//            e.printStackTrace();
//            return this.doError("查询失败");
//        }
//    }
    @RequestMapping(value = "/getCategory")
    @ResponseBody
    public String getCategory(HttpServletRequest request, HttpServletResponse response,String deep) {
        Map<String, Object> params = new HashMap<>();

        JSONArray jsonArray = new JSONArray();
        HttpSession session = request.getSession(true);
        //从session里取的用户信息
        User userSession = (User) session.getAttribute("UserBean");
        if(userSession != null){
            params.put("level", LevelType.level1.name());
            params.put("userId",userSession.getId());
        List<Map<String, Object>> leve1s = this.statisticalAnalysisService.getCategoryRelations(new Object[]{params});
        for (Map<String, Object> level1 : leve1s) {
            String code = level1.get("code").toString();
            String name = level1.get("name").toString();

            JSONObject jobj1 = new JSONObject();
            jobj1.put("id", code);
            jobj1.put("parentId", "00");
            jobj1.put("name", name);
            jobj1.put("deep", "1");
            jsonArray.add(jobj1);

            List<Icategory> icategories = this.categoryService.getIcategoriesByILevelAndCode(LevelType.level1.name(), code);
            for (Icategory icategory : icategories) {
                String level5 = icategory.getCode();
                String level2 = icategory.getLevel2();
                String level3 = icategory.getLevel3();
                String level4 = icategory.getLevel4();

                if (ifSameNode(jsonArray, level2, code, "2")) {
                    JSONObject jobj2 = new JSONObject();
                    jobj2.put("id", level2);
                    jobj2.put("parentId", code);
                    jobj2.put("name", this.categoryService.getCategoryDictNameByCode(level2.split("-")[1]).getName());
                    jobj2.put("deep", "2");
                    jsonArray.add(jobj2);
                }

                if (ifSameNode(jsonArray, level3, level2, "3")) {
                    JSONObject jobj3 = new JSONObject();
                    jobj3.put("id", level3);
                    jobj3.put("parentId", level2);
                    jobj3.put("name", this.categoryService.getCategoryDictNameByCode(level3.split("-")[2]).getName());
                    jobj3.put("deep", "3");
                    jsonArray.add(jobj3);
                }

                if (ifSameNode(jsonArray, level4, level3, "4")) {
                    JSONObject jobj4 = new JSONObject();
                    jobj4.put("id", level4);
                    jobj4.put("parentId", level3);
                    jobj4.put("name", this.categoryService.getCategoryDictNameByCode(level4.split("-")[3]).getName());
                    jobj4.put("deep", "4");
                    jsonArray.add(jobj4);
                }

            }
        }
        }
        return this.doSuccess("操作成功", jsonArray);
    }
    protected boolean ifSameNode(JSONArray jsonArray, String id, String pId, String deep) {
        for (Object o : jsonArray) {
            JSONObject jobj = (JSONObject) o;
            String jdeep = jobj.get("deep").toString();
            String jid = jobj.get("id").toString();
            String jpId = jobj.get("parentId").toString();
            if (jid.equals(id) && jpId.equals(pId) && jdeep.equals(deep)) {
                return false;
            }
        }
        return true;
    }
    @RequestMapping("/queryUserDataAuthority")
    @ResponseBody
    private String queryUserDataAuthority(HttpServletRequest request, HttpServletResponse response, String userId) {
        Map<String,Object> params = new HashMap<String,Object>();
        Map<String, Object> data = new HashMap<String, Object>();
        List<UserDataAuthority> userDataAuthorities = new ArrayList<UserDataAuthority>();
        try {  HttpSession session = request.getSession(true);
            //从session里取的用户信息
            User userSession = (User) session.getAttribute("UserBean");
            if(userSession != null) {
                if(userId != null&&!"".equals(userId)){
                    params.put("id", userId);
                }else {
                    params.put("id", userSession.getId());
                }
                userDataAuthorities = userManagerService.queryUserDataAuthority(new Object[]{params});
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return this.doSuccess("获取数据权限信息成功！",userDataAuthorities);
    }

    /**
     * 统计分析-工作量统计（角色：boss or 角色：主管）
     * @param request
     * @param response
     * @param pageNo 当前页
     * @param pageSize 每页数
     * @param phaseId 学段id
     * @param subjectId 学科
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @param createUserName 人员名称
     * @return
     */
    @RequestMapping("/getWorkload")
    @ResponseBody
    private String getWorkload(HttpServletRequest request,
                               HttpServletResponse response,
                               @RequestParam(value = "pageNo", required = false, defaultValue = "1") Integer pageNo,
                               @RequestParam(value = "pageSize", required = false, defaultValue = "10") Integer pageSize,
                               String phaseId, String subjectId, String startTime, String endTime, String createUserName){
        User userSession = (User) request.getSession().getAttribute("UserBean");
        try {
            PageVO<Workload> workload = statisticalAnalysisService.getWorkload(pageNo, pageSize, phaseId, subjectId, startTime, endTime, createUserName, userSession.getId());
            Map<String, Object> data = new HashMap<String, Object>();
            data.put("data", workload);
            return this.doSuccess("查询成功", data);
        } catch (Exception e) {
            e.printStackTrace();
            return this.doError("查询失败");
        }
    }

    /**
     * 一级二级资源分类统计
     * @param createUserId 用户id
     * @param phaseId 一级id
     * @param subjectId 二级id
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @return
     */
    @RequestMapping("/getResourceStatistics")
    @ResponseBody
    private String getResourceStatistics(HttpServletRequest request, String createUserId, String phaseId, String subjectId, String versionId, String booksId, String startTime, String endTime){
//        User userSession = (User) request.getSession().getAttribute("UserBean");
//        if(createUserId == null && "".equals(createUserId)){
//            createUserId = userSession.getId();
//        }

        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();

        try {
            String key = "getResourceStatistics";
            if(StringUtils.isNotEmpty(phaseId)) key += "-" + phaseId;
            if(StringUtils.isNotEmpty(subjectId)) key += "-" + subjectId;
            if(StringUtils.isNotEmpty(versionId)) key += "-" + versionId;
            if(StringUtils.isNotEmpty(booksId)) key += "-" + booksId;
            if(StringUtils.isNotEmpty(createUserId)) key += "-" + createUserId;
            if(StringUtils.isNotEmpty(startTime)) key += "-s" + startTime;
            if(StringUtils.isNotEmpty(endTime)) key += "-e" + endTime;

            String jsonResult = RedisUtil.get(key);
            if(StringUtils.isNotEmpty(jsonResult)){
                list = JSONArray.toList(JSONArray.fromObject(jsonResult), new HashMap<String, Object>(), new JsonConfig());
            }else{
                list = statisticalAnalysisService.getResourceStatistics(createUserId, phaseId, subjectId, versionId, booksId, startTime, endTime);
                RedisUtil.set(key, JSONArray.fromObject(list).toString());
            }

//            List<Map<String, Object>> list = statisticalAnalysisService.getResourceStatistics(createUserId, phaseId, subjectId, versionId, booksId, startTime, endTime);
            return this.doSuccess("查询成功", list);
        } catch (Exception e) {
            e.printStackTrace();
            return this.doError("查询失败");
        }
    }

    /**
     * 获取知识点
     * @return
     */
    @RequestMapping("/getKnowledge")
    @ResponseBody
    private Map<String,Object> getKnowledge(HttpServletRequest request, HttpServletResponse response,String subjectId,String phaseId) {
        Map<String,Object> result = new HashMap<String,Object>();
        Map<String,Object> params = new HashMap<String,Object>();

        params.put("subjectId",subjectId);
        params.put("phaseId",phaseId);
        List<BaseKnowledge> knowledge = statisticalAnalysisService.getKnowledge(new Object[]{params});

        if(knowledge.size() > 0){
            result.put("status",0);
            result.put("data",knowledge);
        }
        return  result;
    }


    /**
     * 字符串转换成日期
     * @param str
     * @return date
     */
    public static Date StrToDate(String str) {

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = null;
        try {
                date = format.parse(str);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }

    private static String  getCategoriesIdFinal(String categoriesId){
        String newCategoriesId = "";
        if(categoriesId !=null&&!"".equals(categoriesId)){
            if(categoriesId.indexOf("-") == -1){
                newCategoriesId = categoriesId;
            }else{
                String[] split = categoriesId.split("-");
                newCategoriesId = split[split.length-1];
            }
        }else{
            newCategoriesId = categoriesId;
        }
        return newCategoriesId;
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

    public static void main(String[] args){
        StatisticalAnalysisRestController s = new StatisticalAnalysisRestController();
        Map<String, Object> map = new HashMap<String, Object>();
        String result = s.getKey("ok", map);
        System.out.println(result);
    }
}
