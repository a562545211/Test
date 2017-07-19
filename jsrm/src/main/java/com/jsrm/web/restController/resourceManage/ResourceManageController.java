package com.jsrm.web.restController.resourceManage;

import com.alibaba.fastjson.JSON;
import com.jsrm.base.common.BaseRestController;
import com.jsrm.base.common.BusinessException;
import com.jsrm.base.common.PageVO;
import com.jsrm.base.utils.BaseUtils;
import com.jsrm.base.utils.DateUtil;
import com.jsrm.base.utils.ResourceType;
import com.jsrm.base.utils.UUIDUtils;
import com.jsrm.model.resourceInfo.ResourceInfo;
import com.jsrm.model.user.User;
import com.jsrm.service.ResourceInfo.ResourceInfoService;
import com.jsrm.service.resourceCode.ResourceCodeService;
import com.jsrm.service.resourceManage.ResourceManageService;
import com.jsrm.web.vo.ResourceInfoVo.ResourceInfoVo;
import net.sf.json.JSONObject;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by jichao on 2016/10/19.
 * 资源管理模块：上传工程文件，成品文件，回收站
 */
@RestController
@RequestMapping("resourceManage")
public class ResourceManageController extends BaseRestController {
    private static final Log log = LogFactory.getLog(ResourceManageController.class);

    @Resource
    private ResourceManageService resourceManageServiceImpl;
    @Resource
    private ResourceInfoService resourceInfoService;
    @Resource
    private ResourceCodeService resourceCodeServiceImpl;

    /**
     * 保存工程文件
     *
     * @param resourceInfoVo
     * @return
     */
    @RequestMapping(method = {RequestMethod.GET, RequestMethod.POST}, value = "/saveProFileMessage", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String saveProFileMessage(ResourceInfoVo resourceInfoVo, HttpServletRequest request) {
        String result = "";
        try {

            Integer integer = resourceCodeServiceImpl.checkSelectUsed(resourceInfoVo.gettResourceCode(), null);
            if(integer > 0){
                result = "1";
                return this.doError(result);
            }

            String id = UUIDUtils.getUUID();
            resourceInfoVo.setId(id);
            resourceInfoVo.setCreateDateTime(new Date());

            User user = (User) request.getSession().getAttribute("UserBean");
            resourceInfoVo.setCreateUserId(user.getId().toString());
            resourceInfoVo.setCreateUserName(user.getUsername());
            resourceInfoVo.setState("1");
            resourceInfoVo.setResourceType(ResourceType.PRO.name());

            String busiId = resourceInfoVo.getId();
            String tCategoriesIds = resourceInfoVo.getCategoresCode();
            resourceInfoService.saveResourceMidCategories(busiId, tCategoriesIds);
            Integer i = resourceManageServiceImpl.saveProFileMessage(new Object[]{resourceInfoVo});

            Map<String, Object> data = new HashMap<String, Object>();
            data.put("data", i);

            log.info("保存结果：" + i);
            data.put("data", i);
            data.put("id", id);
            data.put("type", ResourceType.PRO.name());
            if (i > 0) {
                result = "保存成功";
            } else {
                result = "保存失败";
            }
            return this.doSuccess(result, data);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("保存失败：" + e.getMessage());
            result = "出错了";
            return this.doError(result);
        }
    }

    /**
     * 保存成品文件
     * @param resourceInfoVo
     * @return
     */
    @RequestMapping("/saveEndFile")
    @ResponseBody
    public String saveEndFile(ResourceInfoVo resourceInfoVo, HttpServletRequest request) {
        String result = "";
        try {
            String id = UUIDUtils.getUUID();
            resourceInfoVo.setId(id);
            resourceInfoVo.setCreateDateTime(new Date());

            User user = (User) request.getSession().getAttribute("UserBean");
            resourceInfoVo.setCreateUserId(user.getId().toString());
            resourceInfoVo.setCreateUserName(user.getUsername());
            resourceInfoVo.setState("1");
            resourceInfoVo.setResourceType(ResourceType.END.name());

            String busiId = resourceInfoVo.getId();
            String tCategoriesIds = resourceInfoVo.getCategoresCode();
            resourceInfoService.saveResourceMidCategories(busiId, tCategoriesIds);
            Integer i = resourceManageServiceImpl.saveEndFileMessage(new Object[]{resourceInfoVo});

            Map<String, Object> data = new HashMap<String, Object>();
            data.put("data", i);

            log.info("保存结果：" + i);
            data.put("data", i);
            data.put("id", id);
            data.put("type", ResourceType.END.name());
            if (i > 0) {
                result = "保存成功";
            } else {
                result = "保存失败";
            }
            return this.doSuccess(result, data);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("保存失败：" + e.getMessage());
            result = "出错了";
            return this.doError(result);
        }
    }

    /**
     * 更新工程文件
     *
     * @param resourceInfoVo
     * @param request
     * @return
     */
    @RequestMapping(method = {RequestMethod.GET, RequestMethod.POST}, value = "/updateProFileMessage", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String updateProFileMessage(ResourceInfoVo resourceInfoVo, HttpServletRequest request) {
        String result = "";
        try {

            Integer integer = resourceCodeServiceImpl.checkSelectUsed(resourceInfoVo.gettResourceCode(), resourceInfoVo.getId());
            if(integer > 0){
                result = "1";
                return this.doError(result);
            }

            User user = (User) request.getSession().getAttribute("UserBean");
            resourceInfoVo.setCreateUserId(user.getId().toString());
            resourceInfoVo.setCreateUserName(user.getUsername());
            resourceInfoVo.setState("1");
            resourceInfoVo.setResourceType("PRO");
            resourceInfoVo.setUpdateDateTime(new Date());

            String busiId = resourceInfoVo.getId();
            String tCategoriesIds = resourceInfoVo.getCategoresCode();
            resourceInfoService.deleteResourceMidCategories(busiId);
            resourceInfoService.saveResourceMidCategories(busiId, tCategoriesIds);
            Integer i = resourceManageServiceImpl.updateProFileMessage(new Object[]{resourceInfoVo});

            Map<String, Object> data = new HashMap<String, Object>();
            data.put("data", i);

            log.info("编辑结果：" + i);
            data.put("data", i);
            data.put("id", resourceInfoVo.getId());
            data.put("type", "PRO");
            if (i > 0) {
                result = "编辑成功";
            } else {
                result = "编辑失败";
            }
            return this.doSuccess(result, data);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("编辑失败：" + e.getMessage());
            result = "出错了";
            return this.doError(result);
        }
    }

    /**
     * 更新成品文件
     *
     * @param resourceInfoVo
     * @param request
     * @return
     */
    @RequestMapping(method = {RequestMethod.GET, RequestMethod.POST}, value = "/updateEndFileMessage", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String updateEndFileMessage(ResourceInfoVo resourceInfoVo, HttpServletRequest request) {
        String result = "";
        try {
            User user = (User) request.getSession().getAttribute("UserBean");
            resourceInfoVo.setCreateUserId(user.getId().toString());
            resourceInfoVo.setCreateUserName(user.getUsername());
            resourceInfoVo.setState("1");
            resourceInfoVo.setResourceType(ResourceType.END.name());
            resourceInfoVo.setUpdateDateTime(new Date());

            String busiId = resourceInfoVo.getId();
            String tCategoriesIds = resourceInfoVo.getCategoresCode();
            resourceInfoService.deleteResourceMidCategories(busiId);
            resourceInfoService.saveResourceMidCategories(busiId, tCategoriesIds);
            Integer i = resourceManageServiceImpl.updateEndFileMessage(new Object[]{resourceInfoVo});

            Map<String, Object> data = new HashMap<String, Object>();
            data.put("data", i);

            log.info("编辑结果：" + i);
            data.put("data", i);
            data.put("id", resourceInfoVo.getId());
            data.put("resourceType", ResourceType.END.name());
            if (i > 0) {
                result = "编辑成功";
            } else {
                result = "编辑失败";
            }
            return this.doSuccess(result, data);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("编辑失败：" + e.getMessage());
            result = "出错了";
            return this.doError(result);
        }
    }

    /**
     * 回收站列表搜索
     *
     * @param pageNo
     * @param pageSize
     * @param resourceInfoVo
     * @return
     */
    @RequestMapping(method = {RequestMethod.GET, RequestMethod.POST}, value = "/selectResourceManageListForPageAsRecycle", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String selectResourceManageListForPageAsRecycle(HttpServletRequest request, @RequestParam(value = "pageNo", required = false, defaultValue = "1") Integer pageNo, @RequestParam(value = "pageSize", required = false, defaultValue = "10") Integer pageSize, ResourceInfoVo resourceInfoVo) {
        try {
            //查询的条件
            User user = (User)request.getSession().getAttribute("UserBean");

            Map<String, Object> params = new HashMap<>();
            params.put("resourceFileCode", resourceInfoVo.getResourceFileCode());
            params.put("resourceName", resourceInfoVo.getResourceName());
            params.put("createUserName", resourceInfoVo.getCreateUserName());
            params.put("resourceType", resourceInfoVo.getResourceType());
            params.put("startTime", DateUtil.changeStringToDate(resourceInfoVo.getStartTime()));
            params.put("endTime", DateUtil.changeStringToDate(resourceInfoVo.getEndTime()));
            params.put("state", 0);
            params.put("createUserId", user.getId());
            params.put("categoresCode", resourceInfoVo.getCategoresCode());
            params.put("knowledgeCode", resourceInfoVo.getKnowledgeCode());
            PageVO<ResourceInfo> dataList = resourceManageServiceImpl.selectResourceManageListForPageAsRecycle(pageNo, pageSize, new Object[]{params});

            Map<String, Object> data = new HashMap<String, Object>();
            data.put("data", dataList);
            log.info("获取回收站列表成功");
            return this.doSuccess("获取回收站列表成功", data);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取回收站列表失败：" + e.getMessage());
            return this.doError("获取回收站列表失败");
        }
    }

    /**
     * 回收站单个资源根据id搜索
     *
     * @param id
     * @return
     */
    @RequestMapping(method = {RequestMethod.GET, RequestMethod.POST}, value = "/selectResourceManageById", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String selectResourceManageById(@RequestParam String id) {
        JSONObject json = new JSONObject();
        Map<String, Object> params = new HashMap<>();
        params.put("id", id);
        try {
            ResourceInfo resourceInfo = resourceManageServiceImpl.selectResourceManageById(new Object[]{params});
            json.put("status", 0);
            json.put("data", JSON.toJSONStringWithDateFormat(resourceInfo, "yyyy-MM-dd"));
            log.info("查询对应数据成功");
            return json.toString();
        } catch (Exception e) {
            e.printStackTrace();
            log.error("查询对应数据失败：" + e.getMessage());
            json.put("status", 1);
            return json.toString();
        }
    }

    /**
     * 回收站单个资源上架
     *
     * @param id
     * @return
     */
    @RequestMapping(method = {RequestMethod.GET, RequestMethod.POST}, value = "/onShelvesById", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String onShelvesById(@RequestParam String id) {
        Map<String, Object> data = new HashMap<String, Object>();
        String result = "";
        if (id.equals("")) {
            result = "请选择需要上架的资源";
            return this.doError(result);
        }
        Map<String, Object> params = new HashMap<>();
        params.put("id", id);
        try {
            Integer i = resourceManageServiceImpl.onShelvesById(new Object[]{params});
            log.info("上架结果：" + i);
            data.put("data", i);
            if (i > 0) {
                result = "上架成功";
            } else {
                result = "上架失败";
            }
            return this.doSuccess(result, data);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("上架失败：" + e.getMessage());
            result = "出错了";
            return this.doError(result);
        }
    }


    /**
     * 查询所有未关联
     * @param tResourceCode
     * @param resourceFileCode
     * @param resourceName
     * @return
     */
    @RequestMapping("/getNewResourceList")
    @ResponseBody
    public String getNewResourceList(String tResourceCode, String resourceFileCode, String resourceName) {
        Map<String, Object> map = new HashMap<>();
        if (BaseUtils.isNotBlank(tResourceCode)) {
            map.put("tResourceCode", tResourceCode);
        }
        if (BaseUtils.isNotBlank(resourceFileCode)) {
            map.put("resourceFileCode", resourceFileCode);
        }
        if (BaseUtils.isNotBlank(resourceName)) {
            map.put("resourceName", resourceName);
        }
        List<ResourceInfo> list = null;
        try {
            list = this.resourceInfoService.getNewResourceList(map);
        } catch (BusinessException e) {
            return this.doError("查询出错");
        }
        return this.doSuccess("操作成功", list);
    }

    /**
     * 判断发稿编号是否进行了成品文件上传
     * @param resourceFileCode
     * @return
     */
    @RequestMapping("/validateResourceCode")
    @ResponseBody
    public String validateResourceCode(String resourceFileCode) {
        String flag = "1";
        ResourceInfoVo vo = new ResourceInfoVo();
        vo.setResourceFileCode(resourceFileCode);
        vo.setResourceType(ResourceType.END.name());
        ResourceInfo resourceInfo = this.resourceInfoService.queryResourceInfoById(vo);
        if (resourceInfo.getId() == null) {
            flag = "0";
        }
        return this.doSuccess("操作成功", flag);
    }



}
