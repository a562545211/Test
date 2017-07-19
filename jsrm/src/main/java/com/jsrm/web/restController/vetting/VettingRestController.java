package com.jsrm.web.restController.vetting;

import com.jsrm.base.common.BaseRestController;
import com.jsrm.base.common.ModelUtil;
import com.jsrm.base.common.PageVO;
import com.jsrm.base.utils.BaseUtils;
import com.jsrm.model.approve.ApproveHistory;
import com.jsrm.model.resourceInfo.ResourceInfo;
import com.jsrm.model.system.UserDataAuthority;
import com.jsrm.model.user.User;
import com.jsrm.service.ResourceInfo.ResourceInfoService;
import com.jsrm.service.approve.ApproveService;
import com.jsrm.service.selectTopic.SelectTopicService;
import com.jsrm.service.user.UserManagerService;
import com.jsrm.web.vo.ResourceInfoVo.ResourceInfoVo;
import com.jsrm.web.vo.approve.ApproveHistoryVo;
import com.jsrm.web.vo.approve.ApproveInstanceVo;
import com.jsrm.web.vo.vetting.VettingVo;
import org.apache.commons.lang.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 资源审核controller
 * Created by wdCao on 2016/10/31.
 */
@RestController
@RequestMapping("/vettingRest")
public class VettingRestController extends BaseRestController {

    /**
     * 资源审核service
     */
    @Resource
    ApproveService approveService;

    /**
     * 资源service
     */
    @Resource
    ResourceInfoService resourceInfoService;

    @Resource
    SelectTopicService selectTopicServiceImpl;
    @Resource
    UserManagerService userManagerService;


    /**
     * 获取资源审核列表
     * @return
     */
    @RequestMapping("/queryResourceVetting")
    @ResponseBody
    public String getResourceVetting(HttpServletRequest request, VettingVo vettingVo, @RequestParam(value = "pageNo", required = false, defaultValue = "1") Integer pageNo,
                                     @RequestParam(value = "pageSize", required = false, defaultValue = "10") Integer pageSize) {
        User user = ModelUtil.getUser(request);     //获取session用户信息

        if(user != null) {
            vettingVo.setApproveUserId(user.getId());
            //vettingVo.setFlowState("1");        //流程为审批中的
            PageVO<VettingVo> list = approveService.queryVettingList(pageNo, pageSize, vettingVo);

            Map<String, Object> data = new HashMap<String, Object>();
            data.put("data", list);

            return this.doSuccess("success", data);
        }

        return null;
    }

    @RequestMapping("/queryResourceVetted")
    @ResponseBody
    public String getResourceVetted(HttpServletRequest request, VettingVo vettingVo, @RequestParam(value = "pageNo", required = false, defaultValue = "1") Integer pageNo,
                                    @RequestParam(value = "pageSize", required = false, defaultValue = "10") Integer pageSize) {
        User user = ModelUtil.getUser(request);     //获取session用户信息

        if(user != null) {
            vettingVo.setApproveUserId(user.getId());
            //vettingVo.setFlowState("1");        //流程为审批中的
            PageVO<VettingVo> list = approveService.queryVettedList(pageNo, pageSize, vettingVo);

            Map<String, Object> data = new HashMap<String, Object>();
            data.put("data", list);

            return this.doSuccess("success", data);
        }

        return null;
    }

    /**
     * 获取发稿审批信息
     * @param request
     * @param vettingVo
     * @param pageNo
     * @param pageSize
     * @return
     */
    @RequestMapping("/queryTopicVetting")
    @ResponseBody
    public String getTopicVetting(HttpServletRequest request, VettingVo vettingVo, @RequestParam(value = "pageNo", required = false, defaultValue = "1") Integer pageNo,
                                  @RequestParam(value = "pageSize", required = false, defaultValue = "10") Integer pageSize) {
        User user = ModelUtil.getUser(request);     //获取session用户信息

        if(user != null) {
            vettingVo.setApproveUserId(user.getId());
            PageVO<VettingVo> list = approveService.queryTopicVettingList(pageNo, pageSize, vettingVo);

            Map<String, Object> data = new HashMap<String, Object>();
            data.put("data", list);

            return this.doSuccess("success", data);
        }
        return null;
    }

    /**
     * 获取发稿已审批信息
     * @param request
     * @param vettingVo
     * @param pageNo
     * @param pageSize
     * @return
     */
    @RequestMapping("/queryTopicVetted")
    @ResponseBody
    public String getTopicVetted(HttpServletRequest request, VettingVo vettingVo, @RequestParam(value = "pageNo", required = false, defaultValue = "1") Integer pageNo,
                                  @RequestParam(value = "pageSize", required = false, defaultValue = "10") Integer pageSize) {
        User user = ModelUtil.getUser(request);     //获取session用户信息

        if(user != null) {
            vettingVo.setApproveUserId(user.getId());
            PageVO<VettingVo> list = approveService.queryTopicVettedList(pageNo, pageSize, vettingVo);

            Map<String, Object> data = new HashMap<String, Object>();
            data.put("data", list);

            return this.doSuccess("success", data);
        }
        return null;
    }

    @RequestMapping("/getVettingHistory")
    @ResponseBody
    public String getVettingHistory(ResourceInfoVo resourceInfoVo) {
        ApproveHistory approveHistory = new ApproveHistory();
        approveHistory.setBusiId(resourceInfoVo.getId());
        approveHistory.setBusiType(resourceInfoVo.getResourceType());

        List<ApproveHistoryVo> list = approveService.queryApproveHistory(approveHistory);
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("data", list);

        return this.doSuccess("success", data);
    }

    /**
     * 获取下一节点审批人
     * @param resourceInfoVo
     * @return
     */
    @RequestMapping("/getIdleResourceApp")
    @ResponseBody
    public String getIdleResourceApp(HttpServletRequest request, ResourceInfoVo resourceInfoVo) {
        User loginUser = ModelUtil.getUser(request);

        resourceInfoVo.setLoginUserId(loginUser.getId());

        User user = approveService.getIdelResourceApp(resourceInfoVo);
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("data", user);

        return this.doSuccess("success", data);
    }

    /**
     * 发起审批流程
     * @param resourceInfoVo
     * @return
     */
    @RequestMapping("/startWorkFlow")
    @ResponseBody
    public String startWorkFlow(HttpServletRequest request, ResourceInfoVo resourceInfoVo) {
        ResourceInfo resourceInfo = null;

        String resourceFileCode = resourceInfoVo.getResourceFileCode();

        User user = ModelUtil.getUser(request);         //获取当前登录人session用户

        if(StringUtils.equals(resourceInfoVo.getResourceType(), "DRA")) {       //如果如果是发稿类型
            Map<String, Object> params = new HashMap<>();
            params.put("id", resourceInfoVo.getId());

            resourceInfo = selectTopicServiceImpl.querySelectTopicById(new Object[]{params});
        } else {
            resourceInfoVo.setResourceFileCode(null);
            resourceInfo = resourceInfoService.queryResourceInfoById(resourceInfoVo);

        }
        if (resourceInfo.getResourceFileCode() != null) {
            resourceFileCode = resourceInfo.getResourceFileCode();
        }

        BaseUtils.copyNonNullProperties(resourceInfoVo, resourceInfo);      //获取资源信息

        resourceInfoVo.setLoginUserId(user.getId());

        resourceInfoVo.setResourceFileCode(resourceFileCode);
        String result = approveService.startWorkFlow(resourceInfoVo);               //发起流程
        if(StringUtils.equals(result, "1")) {       //启动流程成功
            return this.doSuccess("success", null);
        } else {
            return this.doError("error");
        }
    }

    /**
     * 提交流程
     * @param approveInstanceVo
     * @return
     */
    @RequestMapping("/submitTask")
    @ResponseBody
    public String submitTask(HttpServletRequest request, ApproveInstanceVo approveInstanceVo) {
        User user = ModelUtil.getUser(request);         //获取当前登陆人id

        approveInstanceVo.setLoginUserId(user.getId());
        return this.doSuccess("success", approveService.submitTask(approveInstanceVo));
    }


    @RequestMapping("/batchGoBack")
    @ResponseBody
    public String batchGoBack(ApproveInstanceVo approveInstanceVo) {

        return this.doSuccess("success", approveService.batchGoBack(approveInstanceVo));
    }


    /**
     * 转发流程
     * @param approveInstanceVo
     * @return
     */
    @RequestMapping("/transpondTask")
    @ResponseBody
    public String transpondTask(ApproveInstanceVo approveInstanceVo) {

        approveService.transpondTask(approveInstanceVo);

        return this.doSuccess("success", null);
    }


    /**
     * 获取当前流程节点可审批人
     * @param approveInstanceVo
     * @return
     */
    @RequestMapping("/getTaskApproveUsers")
    @ResponseBody
    public String getTaskApproveUsers(HttpServletRequest request, HttpServletResponse response,ApproveInstanceVo approveInstanceVo) {
        Map<String,Object> params = new HashMap<String,Object>();
        String catagorId = "";
        HttpSession session = request.getSession(true);
        //从session里取的用户信息
        User userSession = (User) session.getAttribute("UserBean");
        if(userSession != null) {
            params.put("id",userSession.getId());
            List<UserDataAuthority> userDataAuthorities = userManagerService.queryUserDataAuthority(new Object[]{params});
            for (int i = 0 ;i < userDataAuthorities.size();i++){
                if("2".equals(userDataAuthorities.get(i).getDeep().trim())){
                    catagorId +="'"+userDataAuthorities.get(i).getDataAuthorityId()+"',";
                }
            }
        }
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("data", approveService.selectCurrentAppUsers(approveInstanceVo,catagorId.substring(0,catagorId.length()-1)));

        return this.doSuccess("success", data);
    }
}
