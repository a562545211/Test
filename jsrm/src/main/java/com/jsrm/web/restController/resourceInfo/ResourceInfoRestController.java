package com.jsrm.web.restController.resourceInfo;

import com.jsrm.base.common.BaseRestController;
import com.jsrm.base.common.BusinessException;
import com.jsrm.base.common.ModelUtil;
import com.jsrm.base.common.PageVO;
import com.jsrm.base.utils.UUIDUtils;
import com.jsrm.model.resourceInfo.ResourceInfo;
import com.jsrm.model.user.User;
import com.jsrm.service.ResourceInfo.ResourceInfoService;
import com.jsrm.web.vo.ResourceInfoVo.ResourceInfoVo;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * 资源
 * Created by wdCao on 2016/10/13.
 */
@RestController()
@RequestMapping("/resourceInfoRest")
public class ResourceInfoRestController extends BaseRestController {
    public static final Log log = LogFactory.getLog(ResourceInfoRestController.class);      //log对象

    @Resource
    ResourceInfoService resourceInfoService;
    /**
     * 获取全部文件列表
     * @param pageNo
     * @param pageSize
     * @param resourceInfoVo
     * @return
     */
    @RequestMapping("/queryAllResourceList")
    private String queryAllResourceList(@RequestParam(value = "pageNo", required = false, defaultValue = "1") Integer pageNo,
                                        @RequestParam(value = "pageSize", required = false, defaultValue = "10") Integer pageSize, ResourceInfoVo resourceInfoVo,
                                        HttpServletRequest request) {
//        Map<String, Object> params = new HashMap<String, Object>();
//        params.put("tResourceCode", resourceInfoVo.gettResourceCode());     //选题编号
//        params.put("resourceName", resourceInfoVo.getResourceName());       //资源名称
//        params.put("approver", resourceInfoVo.getApprover());               //审批人
//        params.put("createUserName", resourceInfoVo.getCreateUserName());   //创建者
//        params.put("resourceType", resourceInfoVo.getResourceType());       //资源类型
//        params.put("startTime", resourceInfoVo.getStartTime());             //上传开始时间
//        params.put("endTime", resourceInfoVo.getEndTime());                 //上传结束时间
//        params.put("resourceType", resourceInfoVo.getResourceType());       //资源类型

        try {
            User user = (User)request.getSession().getAttribute("UserBean");
            resourceInfoVo.setUserId(user.getId());//传入当前用户id
            PageVO<ResourceInfo> dataList = resourceInfoService.queryAllResourceList(pageNo, pageSize, resourceInfoVo);      //查询原始文件列表
            Map<String, Object> data = new HashMap<String, Object>();
            data.put("data", dataList);
            data.put("userId", user.getId());
            log.info("获取原始文件列表操作成功");
            return this.doSuccess("success", data);
        } catch (BusinessException e) {
            log.error("获取原始文件列表失败："  + e.getMessage());
            e.printStackTrace();
            return this.doError("fail");
        }
    }

    /**
     * 根据资源id获取资源信息
     * @param resourceInfoVo
     * @return
     */
    @RequestMapping("/getResourceInfo")
    @ResponseBody
    private String queryResourceInfo(ResourceInfoVo resourceInfoVo) {
        ResourceInfo resourceInfo = resourceInfoService.queryResourceInfoById(resourceInfoVo);
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("data", resourceInfo);
        return  this.doSuccess("success", data);
    }

    @RequestMapping("/getResourceInfo2")
    @ResponseBody
    private String queryResourceInfo2(ResourceInfoVo resourceInfoVo) {
        ResourceInfoVo resourceInfo = resourceInfoService.queryResourceInfoById2(resourceInfoVo);
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("data", resourceInfo);
        return  this.doSuccess("success", data);
    }

    /**
     * 保存资源信息
     * @param resourceInfoVo
     * @return
     */
    @RequestMapping("/saveResourceInfo")
    @ResponseBody
    private String saveResourceInfo(HttpServletRequest request,ResourceInfoVo resourceInfoVo) {
        User user = ModelUtil.getUser(request);

        resourceInfoVo.setCreateDateTime(new Date());
        resourceInfoVo.setCreateUserId(user.getId());
        resourceInfoVo.setCreateUserName(user.getUsername());
        resourceInfoVo.setState("1");       //待提交状态
        resourceInfoVo.setId(UUIDUtils.getUUID());

        String busiId = resourceInfoVo.getId();
        String tCategoriesIds = resourceInfoVo.getCategoresCode();
        resourceInfoService.saveResourceMidCategories(busiId, tCategoriesIds);
        resourceInfoService.saveResourceInfo(resourceInfoVo);

        Map<String, Object> data = new HashMap<String, Object>();
        data.put("data", resourceInfoVo);

        return  this.doSuccess("success", data);
    }

    /**
     * 根据资源id获取资源信息
     * @param resourceInfoVo
     * @return
     */
    @RequestMapping("/updateResourceInfo")
    @ResponseBody
    private String updateResourceInfo(ResourceInfoVo resourceInfoVo) {
        Map<String, Object> data = new HashMap<String, Object>();

        String busiId = resourceInfoVo.getId();
        String tCategoriesIds = resourceInfoVo.getCategoresCode();
        resourceInfoService.deleteResourceMidCategories(busiId);
        resourceInfoService.saveResourceMidCategories(busiId, tCategoriesIds);
        resourceInfoService.updateResourceInfo(resourceInfoVo);

        data.put("data", resourceInfoVo);
        return  this.doSuccess("success", data);
    }

    /**
     * 获取原始文件列表
     * @param pageNo
     * @param pageSize
     * @param resourceInfoVo
     * @return
     */
    @RequestMapping("/queryOrgResourceList")
    private String queryOrgResourceList(@RequestParam(value = "curPage", required = false, defaultValue = "1") Integer pageNo,
                                        @RequestParam(value = "pageSize", required = false, defaultValue = "10") Integer pageSize, ResourceInfoVo resourceInfoVo) {

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("resourceType", "ORI");      //原始文件

        try {
            PageVO<ResourceInfo> dataList = resourceInfoService.queryResourceList(pageNo, pageSize, new Object[]{params});      //查询原始文件列表

            Map<String, Object> data = new HashMap<String, Object>();
            data.put("data", dataList);

            log.info("获取原始文件列表操作成功");
            return this.doSuccess("success", data);
        } catch (BusinessException e) {
            log.error("获取原始文件列表失败："  + e.getMessage());

            return this.doError("fail");
        }
    }

    @RequestMapping("/deleteResources")
    @ResponseBody
    private String deleteResources(ResourceInfoVo resourceInfoVo) {
        resourceInfoService.deleteResources(resourceInfoVo);
        return this.doSuccess("success", null);
    }

    /**
     * 获取资源uuid
     * @return
     */
    @RequestMapping("/getResourceUUID")
    @ResponseBody
    public String getResourceUUID() {
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("id", UUIDUtils.getUUID());
        return this.doSuccess("success", data);
    }

    /**
     * 在线评比下载文件，contribute表下载
     * @param response
     * @param id
     */
    @RequestMapping("/download")
    public void download(HttpServletRequest request, HttpServletResponse response, String id){
        try {
            resourceInfoService.download(request, response, id);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
