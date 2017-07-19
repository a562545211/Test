package com.jsrm.web.controller.selectTopic;

import com.jsrm.base.common.BaseRestController;
import com.jsrm.base.common.BusinessException;
import com.jsrm.base.common.PageVO;
import com.jsrm.base.utils.DateUtil;
import com.jsrm.base.utils.UUIDUtils;
import com.jsrm.model.approve.ApproveHistory;
import com.jsrm.model.resourceInfo.ResourceInfo;
import com.jsrm.model.system.UserDataAuthority;
import com.jsrm.model.user.User;
import com.jsrm.service.approve.ApproveService;
import com.jsrm.service.selectTopic.SelectTopicService;
import com.jsrm.service.user.UserManagerService;
import com.jsrm.web.vo.ResourceInfoVo.ResourceInfoVo;
import com.jsrm.web.vo.approve.ApproveHistoryVo;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Created by jichao on 2016/10/17.
 * 选题发稿模块，按条件列表查询，单一记录查询，新增记录，编辑记录
 */
@Controller
@RequestMapping("selectTopic")
public class SelectTopicController extends BaseRestController {
    private static final Log log = LogFactory.getLog(SelectTopicController.class);
    @Resource
    private SelectTopicService selectTopicServiceImpl;
    @Resource
    private UserManagerService userManagerService;
    @Resource
    ApproveService approveService;

    /**
     * 按条件列表查询
     * @param pageNo 当前页
     * @param pageSize 每页记录数
     * @param resourceInfoVo 公用的vo，发稿详细内容的pojo
     * @return json数组，status：状态 success or error，data：查询的结果
     */
    @RequestMapping(method ={RequestMethod.GET, RequestMethod.POST}, value = "/querySelectTopicListForPage", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String querySelectTopicListForPage(HttpServletRequest request, @RequestParam(value = "pageNo", required = false, defaultValue = "1") Integer pageNo, @RequestParam(value = "pageSize", required = false, defaultValue = "10") Integer pageSize, ResourceInfoVo resourceInfoVo) {
        try{

            User user = (User)request.getSession().getAttribute("UserBean");

            Map<String,Object> params = new HashMap<String,Object>();
            //查询的条件
            params.put("state", resourceInfoVo.getState());     //审核状态
            params.put("startTime", DateUtil.changeStringToDate(resourceInfoVo.getStartTime()));       //发稿日期：开始时间
            params.put("endTime", DateUtil.changeStringToDate(resourceInfoVo.getEndTime()));               //发稿日期：结束时间
            params.put("resourceFileCode", resourceInfoVo.getResourceFileCode());//资源编号（选题编号）
            params.put("resourceName", resourceInfoVo.getResourceName());//资源名称
            params.put("createUserName", resourceInfoVo.getCreateUserName());//发稿人
            params.put("id", user.getId());

            PageVO<ResourceInfo> dataList = selectTopicServiceImpl.querySelectTopicListForPage(pageNo, pageSize, new Object[]{params});
            Map<String, Object> data = new HashMap<String, Object>();
            data.put("data", dataList);
            data.put("userId", user.getId());
            log.info("获取文件列表成功");
            return this.doSuccess("获取文件列表成功", data);
        } catch (Exception e){
            e.printStackTrace();
            log.error("获取文件列表失败："  + e.getMessage());
            return this.doError("获取文件列表失败");
        }
    }

    /**
     * 根据id搜索资源
     * @param id 发稿主键
     * @return 发稿的json对象
     */
    @RequestMapping(method ={RequestMethod.GET, RequestMethod.POST}, value = "/querySelectTopic", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String querySelectTopic(@RequestParam String id) {
        Map<String, Object> params = new HashMap<>();
        params.put("id", id);
        try{
            ResourceInfo resourceInfo = selectTopicServiceImpl.querySelectTopicById(new Object[]{params});
            Map<String, Object> data = new HashMap<String, Object>();
            data.put("data", resourceInfo);
            return this.doSuccess("获取对象成功", data);
        } catch(Exception e){
            e.printStackTrace();
            log.error("获取对象失败："  + e.getMessage());
            return this.doError("获取对象失败");
        }
    }

    /**
     * 保存发稿
     * @param resourceInfoVo 发稿对象
     * @return 成功：1，失败：0
     */
    @RequestMapping(method ={RequestMethod.GET, RequestMethod.POST}, value = "/saveSelectTopic", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String saveSelectTopic(HttpServletRequest request, HttpServletResponse response,ResourceInfoVo resourceInfoVo){
        Map<String, Object> data = new HashMap<String, Object>();
        String result = "";
        HttpSession session = request.getSession(true);
        User user = (User)session.getAttribute("UserBean");
        try{
            if(user != null) {
                String id = UUIDUtils.getUUID();
                resourceInfoVo.setId(id);
                if(resourceInfoVo.getState().equals("2") && resourceInfoVo.getCreateTime() == null){
                    resourceInfoVo.setCreateDateTime(new Date());
                }
                resourceInfoVo.setCreateUserId(user.getId());
                resourceInfoVo.setCreateUserName(user.getUsername());
                Integer i = selectTopicServiceImpl.saveSelectTopic(new Object[]{resourceInfoVo});
                log.info("增加结果：" + i);
                data.put("data", resourceInfoVo);
                if (i > 0) {
                    result = "保存成功";
                } else {
                    result = "保存失败";
                }
                return this.doSuccess(result, data);
            }else{
                return this.doError(result);
            }
        } catch(Exception e){
            e.printStackTrace();
            log.error("保存失败："  + e.getMessage());
            result = "出错了";
            return this.doError(result);
        }
    }

    /**
     * 修改发稿
     * @param resourceInfoVo 发稿对象
     * @return 成功：1，失败：0
     */
    @RequestMapping(method ={RequestMethod.GET, RequestMethod.POST}, value = "/updateSelectTopic", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String updateSelectTopic(ResourceInfoVo resourceInfoVo){
        Map<String, Object> data = new HashMap<String, Object>();
        String result = "";
        try{
            if(resourceInfoVo.getState().equals("2") && resourceInfoVo.getCreateTime() == null){
                resourceInfoVo.setCreateDateTime(new Date());
            }
            Integer i = selectTopicServiceImpl.updateSelectTopic(new Object[]{resourceInfoVo});
            log.info("修改结果：" + i);
            data.put("data", i);
            if(i > 0) {
                result = "编辑成功";
            }else {
                result = "编辑失败";
            }
            return this.doSuccess(result, data);
        } catch(Exception e){
            e.printStackTrace();
            log.error("修改失败："  + e.getMessage());
            result = "出错了";
            return this.doError(result);
        }
    }

    /**
     * 选择选题编号
     * @param resourceInfoVo
     * @return
     */
    @RequestMapping(method ={RequestMethod.GET, RequestMethod.POST}, value = "/selectSelectTopicList", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String selectSelectTopicList(ResourceInfoVo resourceInfoVo){
        try{
            Map<String, Object> params = new HashMap<>();
            params.put("tResourceCode", resourceInfoVo.gettResourceCode());//资源编号（选题编号）
            params.put("resourceName", resourceInfoVo.getResourceName());//资源名称
            List<ResourceInfo> dataList = selectTopicServiceImpl.selectSelectTopicList(new Object[]{params});
            Map<String, Object> data = new HashMap<String, Object>();
            data.put("data", dataList);
            log.info("获取选题编号列表成功");
            return this.doSuccess("获取选题编号列表成功", data);
        } catch(Exception e){
            e.printStackTrace();
            log.error("获取选题编号列表失败："  + e.getMessage());
            return this.doError("获取选题编号列表");
        }
    }


    @RequestMapping("/getResourceInfoByTopicCode")
    @ResponseBody
    public String getResourceInfoByTopicCode(String resourceTopicCode) {
        Map<String, Object> params = new HashMap<>();
        params.put("resourceTopicCode", resourceTopicCode);
        try {
            ResourceInfo resourceInfo = this.selectTopicServiceImpl.querySelectTopicById(new Object[]{params});
            return this.doSuccess("操作成功", resourceInfo);
        } catch (BusinessException e) {
            return this.error(e.getMessage());
        }

    }

    @RequestMapping(value = "/downloadExcel", method = RequestMethod.GET,  produces = {"application/vnd.ms-excel;charset=UTF-8"})
    @ResponseBody
    public void downloadExcel(String id, HttpServletResponse response) {
        Map<String, Object> params = new HashMap<>();
        params.put("id", id);
        ResourceInfo resourceInfo = selectTopicServiceImpl.selectSelectTopicById(new Object[]{params});
        //下载需要添加审批记录
        ApproveHistory approveHistory = new ApproveHistory();
        approveHistory.setBusiId(id);
        List<ApproveHistoryVo> list = approveService.queryApproveHistory(approveHistory);
        byte[] bytes = null;
        try {
            byte[] fileNameByte = resourceInfo.getResourceName().getBytes("GBK");
            String filename = new String(fileNameByte, "ISO8859-1");
            bytes = selectTopicServiceImpl.getExcelForDownload(resourceInfo, list);
            response.setContentType("application/x-msdownload");
            response.setContentLength(bytes.length);
            response.setHeader("Content-Disposition", "attachment;filename=" + filename + ".xlsx");
            response.getOutputStream().write(bytes);
        } catch (Exception e) {
            e.printStackTrace();
            try {
                response.getWriter().write("<script>alert('读取文件失败');</script>");
            } catch (IOException e1) {
                e1.printStackTrace();
            }
        }

    }

}
