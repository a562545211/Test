package com.jsrm.web.restController.user;

import com.jsrm.base.common.BaseRestController;
import com.jsrm.base.common.BusinessException;
import com.jsrm.base.common.ModelUtil;
import com.jsrm.base.common.PageVO;
import com.jsrm.base.utils.BaseUtils;
import com.jsrm.base.utils.MD5;
import com.jsrm.model.resourceInfo.ResourceInfo;
import com.jsrm.model.role.Role;
import com.jsrm.model.user.User;
import com.jsrm.service.ResourceInfo.ResourceInfoService;
import com.jsrm.service.roleManageService.RoleManageService;
import com.jsrm.service.user.UserService;
import com.jsrm.web.vo.ResourceInfoVo.ResourceInfoVo;
import com.jsrm.web.vo.user.UserVo;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.commons.logging.impl.ServletContextCleaner;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 用户
 * Created by wdCao on 2016/10/17.
 */
@RestController()
@RequestMapping("/userRest")
public class UserRestController extends BaseRestController {
    public static final Log log = LogFactory.getLog(UserRestController.class);      //log对象

    @Resource
    private UserService userService;

    @Resource
    private RoleManageService roleManageService;

    /**
     * 页面获取session
     * @param request
     * @return
     */
    @RequestMapping(method ={RequestMethod.GET, RequestMethod.POST}, value = "/getSession", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String getSession(HttpServletRequest request){
        Map<String, Object> data = new HashMap<String, Object>();
        try{
            User user = (User) request.getSession().getAttribute("UserBean");
            data.put("createUserName", user.getUsername());
            data.put("createTime", new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
            return this.doSuccess("获取用户信息成功", data);
        }catch (Exception e){
            e.printStackTrace();
            return this.doError("获取用户信息失败");
        }
    }
    /**
     * 登录
     * @return
     */
    @RequestMapping("/login")
    @ResponseBody
    private Map<String,Object> login(HttpServletRequest request, HttpServletResponse response,User user) {
        Map<String,Object> result = new HashMap<String,Object>();
        Map<String,Object> params = new HashMap<String,Object>();
        params.put("loginName", user.getLoginName().trim());
//        params.put("password", user.getPassword());
        HttpSession session = request.getSession(true);
        List<User> loginUser=userService.getLogin(new Object[]{params});
        if(loginUser.size() > 0){
            User userSer = loginUser.get(0);
            String md5 = MD5.getstrs(user.getPassword().trim());
            if(MD5.getstrs(user.getPassword().trim()).equals(userSer.getPassword())){
                session.setAttribute("UserBean",loginUser.get(0) );
                result.put("data",userSer);
                result.put("status",0);
            }else{
                result.put("status",1);
            }
            return result;
        }else{
            result.put("status",1);
            return result;
        }
    }

    /**
     * 登出
     * @return
     */
    @RequestMapping("/logout")
    @ResponseBody
    private Map<String,Object> logout(HttpServletRequest request, HttpServletResponse response,User user) {
        Map<String,Object> result = new HashMap<String,Object>();
        try {
        HttpSession session = request.getSession(false);//防止创建Session
        if(session == null){
            //response.sendRedirect("/static/login/login.html");
            result.put("status",1);
            return  result;
        }
        session.removeAttribute("UserBean");
        //response.sendRedirect("/static/login/login.html");
        result.put("status",0);
        } catch (Exception e) {
            e.printStackTrace();
            result.put("stats",1);
        }
        return  result;
    }

    /**
     * 获取登录用户信息
     * @param request
     * @return
     */
    @RequestMapping("/getUserInfo")
    @ResponseBody
    private String getLoginUserInfo(HttpServletRequest request) {

        UserVo userVo = new UserVo();

        User user = ModelUtil.getUser(request);
        if(user != null) {

            BaseUtils.copyNonNullProperties(userVo, user);

            Map<String,Object> map = new HashMap<String,Object>();      //获取用户角色
            map.put("userId", user.getId());
            List<Role> roles = roleManageService.queryRoleOne(new Object[]{map});

            Role role = null;
            if(roles.size() > 0){
                role = roles.get(0);
            }

            if(role != null) {
                userVo.setRoleCode(role.getRoleCode());
            }
        }

        Map<String, Object> data = new HashMap<String, Object>();
        data.put("data", userVo);

        return this.doSuccess("success", data);
    }

}
