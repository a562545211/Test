package com.jsrm.web.restController.roleManager;

import java.util.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.jsrm.base.utils.UUIDUtils;
import com.jsrm.model.role.RoleItem;
import com.jsrm.model.role.RoleOperate;
import com.jsrm.web.vo.role.RoleVo;
import com.jsrm.web.vo.user.UserVo;
import net.sf.json.JSONObject;
import net.sf.json.JSONArray;  

import org.apache.commons.collections.map.HashedMap;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.jsrm.base.common.BaseRestController;
import com.jsrm.base.common.PageVO;
import com.jsrm.model.role.Role;
import com.jsrm.model.user.User;
import com.jsrm.service.roleManageService.RoleManageService;
import com.jsrm.web.restController.resourceInfo.ResourceInfoRestController;
import com.jsrm.web.vo.item.ItemVo;
import com.jsrm.web.vo.sysAuthority.Item_Operate_Tree;
import com.jsrm.web.vo.sysAuthority.Oper_Type;
/**
 * 权限角色
 * Created by pengwang on 2016/10/25.
 */

@RestController()
@RequestMapping("/roleManagerRest")
public class RoleManagerController extends BaseRestController {
	public static final Log log = LogFactory.getLog(ResourceInfoRestController.class);      //log对象
	
	@Resource
	RoleManageService roleManageService;
	
    @RequestMapping("/queryOperationList")
    @ResponseBody
    private List<Oper_Type> queryOperationList(HttpServletRequest request, HttpServletResponse response,@RequestParam String itemid ,@RequestParam String type ){
         Map<String,Object> params = new HashMap<String,Object>();
         HttpSession session = request.getSession(true);
         User user = (User)session.getAttribute("UserBean");
         if(user!=null){
        	   params.put("uid", user.getId());
               params.put("operatetypevalue",type );
               params.put("id", itemid);
               return roleManageService.queryOperationList(new Object[]{params});
         }else{
        	 return null;
         }
    }
    @RequestMapping("/queryItemList")
    @ResponseBody
    private List<ItemVo> queryItemList(HttpServletRequest request, HttpServletResponse response){
    	Map<String,Object> params = new HashMap<String,Object>();
        HttpSession session = request.getSession(true);
        User user = (User)session.getAttribute("UserBean");
        if(user!=null){
       	   params.put("uid", user.getId());
           return roleManageService.queryItemList(new Object[]{params});
        }else{
       	 return null;
        }
    }
    @RequestMapping("/queryItem2List")
    @ResponseBody
    private List<ItemVo> queryItem2List(HttpServletRequest request, HttpServletResponse response,@RequestParam String itemId ){
    	Map<String,Object> params = new HashMap<String,Object>();
        HttpSession session = request.getSession(true);
        User user = (User)session.getAttribute("UserBean");
        if(user!=null){
       	   params.put("uid", user.getId());
       	  params.put("itemId", itemId);
           return roleManageService.queryItem2List(new Object[]{params});
        }else{
       	 return null;
        }
    }
    @RequestMapping("/queryRole")
    @ResponseBody
    private String queryRole(HttpServletRequest request, HttpServletResponse response,@RequestParam(value = "pageNo", required = false, defaultValue = "1") Integer pageNo, @RequestParam(value = "pageSize", required = false, defaultValue = "10") Integer pageSize, Role role){
    	Map<String,Object> params = new HashMap<String,Object>();
        HttpSession session = request.getSession(true);
        User user = (User)session.getAttribute("UserBean");
        if(user!=null){
       	    params.put("rolename", role.getRoleName().trim());
            PageVO<Role> roleList =  roleManageService.queryRole(new Object[]{params}, pageNo,pageSize);
            Map<String, Object> data = new HashMap<String, Object>();
            data.put("data", roleList);
            log.info("获取编号管理列表");
            return this.doSuccess("获取编号管理列表成功", data);
        }else{
       	 return null;
        }
    }
    @RequestMapping("/queryTreeList")
    private Map<String ,Object> queryTreeList(HttpServletRequest request, HttpServletResponse response){
    	Map<String,Object> params = new HashMap<String,Object>();
        HttpSession session = request.getSession(true);
        User user = (User)session.getAttribute("UserBean");
        if(user!=null){
       	  params.put("pid", "p1");
           return roleManageService.getTreeList(new Object[]{params});
        }else{
       	 return null;
        }
    }

    @RequestMapping("/saveRole")
    @ResponseBody
    private String saveRole(HttpServletRequest request, HttpServletResponse response, String json, RoleVo roleVo){
        int flag = 0;
        Map<String,Object> params = new HashMap<String,Object>();
        HttpSession session = request.getSession(true);
        User user = (User)session.getAttribute("UserBean");
        List<RoleItem> roleItems = new ArrayList<RoleItem>();
        List<RoleOperate> roleOperates = new ArrayList<RoleOperate>();

        if(user!=null){
            JSONObject jasonObject = JSONObject.fromObject(json);
            Map map = (Map)jasonObject;

            roleVo.setId(UUIDUtils.getUUID());
            roleVo.setCreateDate(new Date());
            roleVo.setCreateUserId(user.getId());
            roleVo.setCreateUserName(user.getUsername());
            roleVo.setUpdateDate(new Date());
            roleVo.setUpdateUserId(user.getId());
            roleVo.setUpdateUserName(user.getUsername());
            roleVo.setDelFlag(0);
            flag = roleManageService.saveRole(new Object[]{roleVo});
            if(flag == 1){
                //获取菜单ID
                List<String> ilist = (List<String>)map.get("ilist");
                if(ilist.size()>0) {
                    for (int i = 0; i < ilist.size(); i++) {
                        RoleItem roleItem = new RoleItem();
                        roleItem.setId(UUIDUtils.getUUID());
                        roleItem.setItemId(ilist.get(i));
                        roleItem.setRoleId(roleVo.getId());
                        roleItems.add(roleItem);
                    }
                    flag = roleManageService.saveRoleItem(new Object[]{roleItems});
                }
                if(flag >= 1){
                    List<Map<String,String>> olist = (List<Map<String,String>>)map.get("olist");
                    if(olist.size()>0){
                        for (int j = 0;j < olist.size();j++){
                            RoleOperate operate = new RoleOperate();
                            operate.setId(UUIDUtils.getUUID());
                            operate.setRoleId(roleVo.getId());
                            operate.setItemRoleId(olist.get(j).get("itemid"));
                            operate.setOperateId(olist.get(j).get("id"));
                            roleOperates.add(operate);
                        }
                        roleManageService.saveRoleOperate(new Object[]{roleOperates});
                    }
                }
            }
            if(flag >= 1 ){
                return this.success("保存成功！");
            }else{
                return this.error("保存失败！");
            }

        }else{
            return this.error("保存失败！");
        }
    }

    @RequestMapping("/queryRoleUpdate")
    @ResponseBody
    private String queryRoleUpdate(HttpServletRequest request, HttpServletResponse response, RoleVo roleVo){
        int flag = 0;
        Map<String,Object> params = new HashMap<String,Object>();
        HttpSession session = request.getSession(true);
        User user = (User)session.getAttribute("UserBean");
        List<Map<String,String>> result = new ArrayList<Map<String,String>>();
        Map<String,Object> resultBack = new HashMap<String,Object>();
        if(user!=null){
            params.put("roleId",roleVo.getId());
            List<Role> role = roleManageService.queryRole(new Object[]{params});
            if(role.size()>0){
                resultBack.put("roleId",role.get(0).getId());
                resultBack.put("roleName",role.get(0).getRoleName());
                resultBack.put("roleCode",role.get(0).getRoleCode());
                resultBack.put("des",role.get(0).getDes());
            }
            List<RoleItem> roleItems = roleManageService.getItemRoleToUpdate(new Object[]{params});
            if(roleItems.size()>0){
                for(int i = 0;i < roleItems.size();i++){
                    Map<String,String> itemMap = new HashMap<String,String>();
                    String itemId = "item-"+roleItems.get(i).getItemId();
                    itemMap.put("id",itemId);
                    result.add(itemMap);
                }
            }
            List<RoleOperate> roleOperates = roleManageService.getOperateRoleToUpdate(new Object[]{params});
            if(roleOperates.size()>0){
                for (int i = 0;i < roleOperates.size();i++){
                    Map<String,String> itemOperate = new HashMap<String,String>();
                    String operateId = "operate-"+roleOperates.get(i).getOperateId();
                    itemOperate.put("id",operateId);
                    result.add(itemOperate);
                }
            }
            resultBack.put("itemList",result);
            return this.doSuccess("查询成功",resultBack);

        }else{
            return this.error("保存失败！");
        }
    }

    @RequestMapping("/updateRole")
    @ResponseBody
    private String updateRole(HttpServletRequest request, HttpServletResponse response, String json, RoleVo roleVo){
        int flag = 0;
        Map<String,Object> params = new HashMap<String,Object>();
        HttpSession session = request.getSession(true);
        User user = (User)session.getAttribute("UserBean");
        List<RoleItem> roleItems = new ArrayList<RoleItem>();
        List<RoleOperate> roleOperates = new ArrayList<RoleOperate>();

        if(user!=null){
            params.put("roleId",roleVo.getId());
            JSONObject jasonObject = JSONObject.fromObject(json);
            Map map = (Map)jasonObject;

            roleVo.setUpdateDate(new Date());
            roleVo.setUpdateUserId(user.getId());
            roleVo.setUpdateUserName(user.getUsername());
            flag = roleManageService.updateRole(new Object[]{roleVo});
            if(flag == 1){
                flag = roleManageService.delRoleItem(new Object[]{params});
                if(flag >= 0){
                    //获取菜单ID
                    List<String> ilist = (List<String>)map.get("ilist");
                    if(ilist.size()>0) {
                        for (int i = 0; i < ilist.size(); i++) {
                            RoleItem roleItem = new RoleItem();
                            roleItem.setId(UUIDUtils.getUUID());
                            roleItem.setItemId(ilist.get(i));
                            roleItem.setRoleId(roleVo.getId());
                            roleItems.add(roleItem);
                        }
                        flag = roleManageService.saveRoleItem(new Object[]{roleItems});
                    }
                }
                if(flag >= 0){
                    flag = roleManageService.delRoleOperate(new Object[]{params});
                    if(flag >= 0){
                        List<Map<String,String>> olist = (List<Map<String,String>>)map.get("olist");
                        if(olist.size()>0) {
                            for (int j = 0; j < olist.size(); j++) {
                                RoleOperate operate = new RoleOperate();
                                operate.setId(UUIDUtils.getUUID());
                                operate.setRoleId(roleVo.getId());
                                operate.setItemRoleId(olist.get(j).get("itemid"));
                                operate.setOperateId(olist.get(j).get("id"));
                                roleOperates.add(operate);
                            }
                            flag = roleManageService.saveRoleOperate(new Object[]{roleOperates});
                        }
                    }

                }
            }
            if(flag >= 0 ){
                return this.success("修改成功！");
            }else{
                return this.error("修改失败！");
            }

        }else{
            return this.error("修改失败！");
        }
    }
    
    @RequestMapping("/deleteRole")
    @ResponseBody
    private String deleteRole(HttpServletRequest request, HttpServletResponse response, String json){
        int flag = 0;
        Map<String,Object> params = new HashMap<String,Object>();
        HttpSession session = request.getSession(true);
        User user = (User)session.getAttribute("UserBean");
        List list = new ArrayList();
        if(user!=null){
        	JSONArray jasonObject = JSONArray.fromObject(json); 
        	List jsonList = (List)jasonObject;
//
//            roleVo.setUpdateDate(new Date());
//            roleVo.setUpdateUserId(user.getId());
//            roleVo.setUpdateUserName(user.getUsername());
            flag = roleManageService.delRole(new Object[]{jsonList});
           
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
