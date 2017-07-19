package com.jsrm.web.restController.user;

import com.jsrm.base.common.BaseRestController;
import com.jsrm.base.common.PageVO;
import com.jsrm.base.utils.MD5;
import com.jsrm.base.utils.UUIDUtils;
import com.jsrm.model.role.Role;
import com.jsrm.model.sysdict.SysDict;
import com.jsrm.model.system.UserDataAuthority;
import com.jsrm.model.system.UserRole;
import com.jsrm.model.user.User;
import com.jsrm.service.user.UserManagerService;
import com.jsrm.web.vo.user.UserVo;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.*;

/**
 * 用户
 * Created by wdCao on 2016/10/17.
 */
@RestController()
@RequestMapping("/userManager")
public class UserManagerRestController extends BaseRestController {
    public static final Log log = LogFactory.getLog(UserManagerRestController.class);      //log对象

    @Resource
    private UserManagerService userManagerService;

    /**
     * 分页查询用户管理列表
     * @param pageNo
     * @param pageSize
     * @param userVo
     * @return
     */
    @RequestMapping(method ={RequestMethod.GET, RequestMethod.POST}, value = "/selectUserListForPage", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String selectUserListForPage(@RequestParam(value = "pageNo", required = false, defaultValue = "1") Integer pageNo, @RequestParam(value = "pageSize", required = false, defaultValue = "10") Integer pageSize, UserVo userVo){
        JSONObject json = new JSONObject();
        try{
            Map<String, Object> params = new HashMap<>();
            params.put("roleId", userVo.getRoleId());
            params.put("loginName", userVo.getLoginName());
            params.put("roleName",userVo.getRoleName());
            params.put("username",userVo.getUsername());
            PageVO<UserVo> dataList = userManagerService.selectUserListForPage(pageNo, pageSize, new Object[]{params});

            Map<String, Object> data = new HashMap<String, Object>();
            data.put("data", dataList);
            log.info("获取编号管理列表");
            return this.doSuccess("获取编号管理列表成功", data);
        } catch(Exception e) {
            e.printStackTrace();
            log.error("获取编号管理列表失败："  + e.getMessage());
            return this.doError("获取编号管理列表失败");
        }
    }

    @RequestMapping("/selectUserOne")
    @ResponseBody
    private String selectUserOne(HttpServletRequest request, HttpServletResponse response, String id) {
        Map<String,Object> result = new HashMap<String,Object>();
        Map<String,Object> params = new HashMap<String,Object>();
        Map<String, Object> data = new HashMap<String, Object>();
        try {
            params.put("id",id);
            List<UserVo> userVo = userManagerService.selectUserOne(new Object[]{params});
            if(userVo.size() > 0){
                List<UserDataAuthority> userDataAuthorities =  userManagerService.queryUserDataAuthority(new Object[]{params});
                data.put("user", userVo.get(0));
                data.put("userDataAut",userDataAuthorities);
            }
            result.put("data",data);
        }catch (Exception e){
            e.printStackTrace();
        }
        return this.doSuccess("获取角色信息成功！",data);
    }

    /**
     * 校验用户名重复
     * @param request
     * @param response
     * @param loginName
     * @return
     */
    @RequestMapping("/selectUserByLoginName")
    @ResponseBody
    private String selectUserByLoginName(HttpServletRequest request, HttpServletResponse response, String loginName) {
        Map<String,Object> result = new HashMap<String,Object>();
        Map<String,Object> params = new HashMap<String,Object>();
        Map<String, Object> data = new HashMap<String, Object>();
        try {
            params.put("loginName",loginName);
            List<UserVo> userVo = userManagerService.selectUserOne(new Object[]{params});
            if(userVo.size() > 0){
                data.put("isTautonomy",0);
            }else{
                data.put("isTautonomy",1);
            }

        }catch (Exception e){
            e.printStackTrace();
        }
        return this.doSuccess("获取角色信息成功！",data);
    }

    /**
     * 查询用户所属学段 学科
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/queryUserDataAuthority")
    @ResponseBody
    private String queryUserDataAuthority(HttpServletRequest request, HttpServletResponse response) {
        Map<String,Object> params = new HashMap<String,Object>();
        Map<String, Object> data = new HashMap<String, Object>();
        HttpSession session = request.getSession(true);
        User user = (User)session.getAttribute("UserBean");
        try {
            if(user != null ){
                params.put("id",user.getId());
                List<UserDataAuthority> userDataAuthorities =  userManagerService.queryUserDataAuthority(new Object[]{params});
                data.put("userDataAut",userDataAuthorities);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return this.doSuccess("获取角色信息成功！",data);
    }

    /**
     * 查询用户所属学段 学科ID List
     * @param request
     * @param parentId
     * @return
     */
    @RequestMapping("/queryUserDataAuthorityByPhaseId")
    @ResponseBody
    private String queryUserDataAuthorityByPhaseId(HttpServletRequest request,String parentId) {
        Map<String,Object> params = new HashMap<String,Object>();
        Map<String, Object> result = new HashMap<String, Object>();
        HttpSession session = request.getSession(true);
        User user = (User)session.getAttribute("UserBean");
        List<UserDataAuthority> userDataAuthorities = null;
        try {
            if(user != null ){
                params.put("id",user.getId());
                params.put("parentId",parentId);
                userDataAuthorities = userManagerService.queryUserDataAuthorityByPhaseId(new Object[]{params});
            }
        }catch (Exception e){
            return this.error(e.getMessage());
        }
        return this.doSuccess("获取成功",userDataAuthorities);
    }

    /**
     * 获取角色列表
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/queryRole")
    @ResponseBody
    private String queryRole(HttpServletRequest request, HttpServletResponse response) {
        Map<String,Object> result = new HashMap<String,Object>();
        Map<String,Object> params = new HashMap<String,Object>();
        Map<String, Object> data = new HashMap<String, Object>();
        try {
            List<Role> role = userManagerService.queryRole(new Object[]{params});
            data.put("data", role);
        }catch (Exception e){
            e.printStackTrace();
        }
        return this.doSuccess("获取角色信息成功！",data);
    }

    /**
     * 获取审核角色列表
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/queryDict")
    @ResponseBody
    private String queryDict(HttpServletRequest request, HttpServletResponse response) {
        Map<String,Object> result = new HashMap<String,Object>();
        Map<String,Object> params = new HashMap<String,Object>();
        Map<String, Object> data = new HashMap<String, Object>();
        try {
            List<SysDict> role = userManagerService.queryDict(new Object[]{params});
            data.put("data", role);
        }catch (Exception e){
            e.printStackTrace();
        }
        return this.doSuccess("获取角色信息成功！",data);
    }

    /**
     * 新增用户
     * @param request
     * @param response
     * @param userVo
     * @return
     */
    @RequestMapping("/saveUserManager")
    @ResponseBody
    private String saveUserManager(HttpServletRequest request, HttpServletResponse response, UserVo userVo) {
        Map<String,Object> result = new HashMap<String,Object>();
        Map<String,Object> params = new HashMap<String,Object>();
        Integer flag = 0;
        String dictCode = "";
        try {
            params.put("loginName",userVo.getLoginName());
            List<UserVo> userVo1 = userManagerService.selectUserByLoginName(new Object[]{params});
            if(userVo1.size()>0){
                return this.loginNameError("用户名重复!");
            }else{
                userVo.setId(UUIDUtils.getUUID());
                userVo.setCreatetime(new Date());
                userVo.setState("1");
                userVo.setPassword(MD5.getstrs("000000"));
                JSONArray jsonArray1 = JSONArray.fromObject(userVo.getDictCode());
                List<String> ListDict = (List<String>)jsonArray1;
                for(int i = 0;i < ListDict.size();i++){
                    dictCode +=ListDict.get(i)+",";
                }
                userVo.setDictCode(dictCode);
                flag = userManagerService.saveUserManager(new Object[]{userVo});
                if(flag == 1){
                    UserRole userRole = new UserRole();
                    userRole.setId(UUIDUtils.getUUID());
                    userRole.setRoleId(userVo.getRoleId());
                    userRole.setUserId(userVo.getId());
                    flag = userManagerService.saveUserRole(new Object[]{userRole});
                }
                if(flag == 1){
                    JSONArray jsonArray = JSONArray.fromObject(userVo.getJson());
                    List<Map<String,Object>> mapListJson = (List)jsonArray;
                    for(int i = 0;i<mapListJson.size();i++){
                        if("null".equals(mapListJson.get(i).get("parentId").toString())){
                            mapListJson.get(i).put("parentId",-1);
                        }
                        mapListJson.get(i).put("id",UUIDUtils.getUUID());
                        mapListJson.get(i).put("userId",userVo.getId());
                    }
                    flag = userManagerService.saveUserDataAuthority(new Object[]{mapListJson});
                }

                if(flag > 0){
                    return this.success("用户保存成功！");
                }else{
                    return this.error("用户保存失败！");
                }
            }
        }catch (Exception e){
            e.printStackTrace();
            return this.error("用户保存失败！");
        }
    }

    /**
     * 修改用户
     * @param request
     * @param response
     * @param userVo
     * @return
     */
    @RequestMapping("/updateUserManager")
    @ResponseBody
    private String updateUserManager(HttpServletRequest request, HttpServletResponse response, UserVo userVo) {
        Map<String,Object> result = new HashMap<String,Object>();
        Map<String,Object> params = new HashMap<String,Object>();
        List<UserVo> userVo1 = new ArrayList<UserVo>();
        Integer flag = 0;
        Integer flag1 = 0;
        String dictCode = "";
        try {
            params.put("loginName",userVo.getLoginName());
            params.put("id",userVo.getId());
            List<UserVo> userName= userManagerService.selectUserByLoginNameAndId(new Object[]{params});
            if (userName.size() == 0){
                userVo1 = userManagerService.selectUserByLoginName(new Object[]{params});
            }
            if(userVo1.size()>0){
                return this.loginNameError("用户名重复!");
            }else{
                userVo.setCreatetime(new Date());
                JSONArray jsonArray1 = JSONArray.fromObject(userVo.getDictCode());
                List<String> ListDict = (List<String>)jsonArray1;
                for(int i = 0;i < ListDict.size();i++){
                    dictCode +=ListDict.get(i)+",";
                }
                userVo.setDictCode(dictCode);
                flag = userManagerService.updateUser(new Object[]{userVo});
                if(flag == 1){
                    flag = userManagerService.updateUserRole(new Object[]{userVo});
                }
                if(flag == 1){
                    flag1 = userManagerService.delUserDataAuthority(new Object[]{userVo});
                    if(flag1 >=0){
                        JSONArray jsonArray = JSONArray.fromObject(userVo.getJson());
                        List<Map<String,Object>> mapListJson = (List)jsonArray;
                        for(int i = 0;i<mapListJson.size();i++){
                            if("null".equals(mapListJson.get(i).get("parentId").toString())){
                                mapListJson.get(i).put("parentId",-1);
                            }
                            mapListJson.get(i).put("id",UUIDUtils.getUUID());
                            mapListJson.get(i).put("userId",userVo.getId());
                        }
                        flag = userManagerService.saveUserDataAuthority(new Object[]{mapListJson});
                    }
                }
                if(flag >= 0){
                    return this.success("用户修改成功！");
                }else{
                    return this.error("用户修改失败！");
                }
            }
        }catch (Exception e){
            e.printStackTrace();
            return this.error("用户修改失败！");
        }
    }

    /**
     * 重置密码
     * @param request
     * @param response
     * @param userVo
     * @return
     */
    @RequestMapping("/resetPassword")
    @ResponseBody
    private String resetPassword(HttpServletRequest request, HttpServletResponse response, UserVo userVo) {
        Map<String,Object> result = new HashMap<String,Object>();
        Map<String,Object> params = new HashMap<String,Object>();
        Integer flag = 0;
        try {
            userVo.setPassword(MD5.getstrs("000000"));
            flag = userManagerService.resetPassword(new Object[]{userVo});
            if(flag == 1){
                return this.success("密码重置成功！");
            }else{
                return this.error("密码重置失败！");
            }
        }catch (Exception e){
            e.printStackTrace();
            return this.error("密码重置失败！");
        }
    }

    /**
     *修改密码
     * @param request
     * @param response
     * @param newPass
     * @param id
     * @return
     */
    @RequestMapping("/modifyPass")
    @ResponseBody
    private String modifyPass(HttpServletRequest request, HttpServletResponse response, String newPass,String id,String oldPass) {
        Map<String,Object> result = new HashMap<String,Object>();
        Map<String,Object> params = new HashMap<String,Object>();
        Integer flag = 0;
        try {
            HttpSession session = request.getSession(true);
            User user = (User)session.getAttribute("UserBean");
            if(user!=null){
                params.put("id",user.getId());
                List<UserVo> oldList = userManagerService.selectUserByLoginNameAndId(new Object[]{params});
                if(oldList.get(0).getPassword().equals(MD5.getstrs(oldPass))){
                    params.put("password",MD5.getstrs(newPass));
                    flag = userManagerService.modifyPass(new Object[]{params});
                }else{
                    return this.oldPassError("原密码不正确！");
                }

            }
            if(flag == 1){
                return this.success("密码修改成功！");
            }else{
                return this.error("密码修改失败！");
            }
        }catch (Exception e){
            e.printStackTrace();
            return this.error("密码修改失败！");
        }
    }

    /**
     * 批量重置密码
     * @param request
     * @param response
     * @param json
     * @return
     */
    @RequestMapping("/resetPasswordByids")
    @ResponseBody
    private String resetPasswordByids(HttpServletRequest request, HttpServletResponse response, String json) {
        int flag = 0;
        Map<String,Object> params = new HashMap<String,Object>();
        HttpSession session = request.getSession(true);
        User user = (User)session.getAttribute("UserBean");
        List list = new ArrayList();
        if(user!=null){
            JSONArray jasonObject = JSONArray.fromObject(json);
            List jsonList = (List)jasonObject;
            flag = userManagerService.resetPasswordByids(new Object[]{jsonList});

            if(flag >= 1 ){
                return this.success("修改成功！");
            }else{
                return this.error("修改失败！");
            }

        }else{
            return this.error("修改失败！");
        }
    }

    /**
     * 删除用户
     * @param request
     * @param response
     * @param userVo
     * @return
     */
    @RequestMapping("/deleteUser")
    @ResponseBody
    private String deleteUser(HttpServletRequest request, HttpServletResponse response, UserVo userVo) {
        Map<String,Object> result = new HashMap<String,Object>();
        Map<String,Object> params = new HashMap<String,Object>();
        Integer flag = 0;
        try {
            userVo.setState("0");
            flag = userManagerService.deleteUser(new Object[]{userVo});
            if(flag == 1){
                return this.success("密码重置成功！");
            }else{
                return this.error("密码重置失败！");
            }
        }catch (Exception e){
            e.printStackTrace();
            return this.error("密码重置失败！");
        }
    }
    /**
     * 批量删除用户
     * @param request
     * @param response
     * @param json
     * @return
     */
    @RequestMapping("/delUserByIds")
    @ResponseBody
    private String delUserByIds(HttpServletRequest request, HttpServletResponse response, String json) {
        int flag = 0;
        Map<String,Object> params = new HashMap<String,Object>();
        HttpSession session = request.getSession(true);
        User user = (User)session.getAttribute("UserBean");
        List list = new ArrayList();
        if(user!=null){
            JSONArray jasonObject = JSONArray.fromObject(json);
            List jsonList = (List)jasonObject;
            flag = userManagerService.delUserByIds(new Object[]{jsonList});

            if(flag >= 1 ){
                return this.success("修改成功！");
            }else{
                return this.error("修改失败！");
            }

        }else{
            return this.error("修改失败！");
        }
    }
}
