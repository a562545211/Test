package com.jsrm.web.restController.resourceCode;

import com.jsrm.base.common.BaseRestController;
import com.jsrm.base.common.ModelUtil;
import com.jsrm.base.common.PageVO;
import com.jsrm.base.utils.DateUtil;
import com.jsrm.base.utils.UUIDUtils;
import com.jsrm.model.resourceCode.ResourceCode;
import com.jsrm.model.user.User;
import com.jsrm.service.resourceCode.ResourceCodeService;
import com.jsrm.web.vo.resourceCodeVo.ResourceCodeVo;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by jichao on 2016/10/25.
 */
@RestController()
@RequestMapping("resourceCode")
public class ResourceCodeController extends BaseRestController {
    private static final Log log = LogFactory.getLog(ResourceCodeController.class);
    @Resource
    private ResourceCodeService resourceCodeServiceImpl;

    /**
     * 分页查询编号管理列表
     * @param pageNo
     * @param pageSize
     * @param resourceCodeVo
     * @return
     */
    @RequestMapping(method ={RequestMethod.GET, RequestMethod.POST}, value = "/selectResourceCodeListForPage", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String selectResourceCodeListForPage(HttpServletRequest request, @RequestParam(value = "pageNo", required = false, defaultValue = "1") Integer pageNo, @RequestParam(value = "pageSize", required = false, defaultValue = "10") Integer pageSize, ResourceCodeVo resourceCodeVo){
        try{
            User user = (User) request.getSession().getAttribute("UserBean");
            Map<String, Object> params = new HashMap<>();
            params.put("id", user.getId());
            params.put("code", resourceCodeVo.getCode());
            params.put("name", resourceCodeVo.getName());
            params.put("startTime", DateUtil.changeStringToDate(resourceCodeVo.getStartTime()));
            params.put("endTime", DateUtil.changeStringToDate(resourceCodeVo.getEndTime()));
            PageVO<ResourceCode> dataList = resourceCodeServiceImpl.selectResourceCodeListForPage(pageNo, pageSize, new Object[]{params});

            Map<String, Object> data = new HashMap<String, Object>();
            data.put("data", dataList);
            data.put("userId", user.getId());
            log.info("获取编号管理列表");
            return this.doSuccess("获取编号管理列表成功", data);
        } catch(Exception e) {
            e.printStackTrace();
            log.error("获取编号管理列表失败："  + e.getMessage());
            return this.doError("获取编号管理列表失败");
        }
    }

    @RequestMapping(method ={RequestMethod.GET, RequestMethod.POST}, value = "/selectResourceCodeById", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String selectResourceCodeById(@RequestParam String id){
        try{
            Map<String, Object> params = new HashMap<>();
            params.put("id", id);
            ResourceCode resourceCode = resourceCodeServiceImpl.selectResourceCodeById(new Object[]{params});
            Map<String, Object> data = new HashMap<String, Object>();
            data.put("data", resourceCode);
            return this.doSuccess("获取编号对象成功", data);
        }catch(Exception e){
            e.printStackTrace();
            return this.doError("获取编号对象失败");
        }
    }

    @RequestMapping(method ={RequestMethod.GET, RequestMethod.POST}, value = "/saveResourceCode", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public synchronized String saveResourceCode(ResourceCodeVo resourceCodeVo, HttpServletRequest request){
        Map<String, Object> data = new HashMap<String, Object>();
        Map<String, Object> param = new HashMap<String, Object>();
        String result = "";
        String code = "";
        try{
            param.put("name",resourceCodeVo.getName());
            List<ResourceCode> resourceCodes = resourceCodeServiceImpl.selectRepeatResourceName(new Object[]{param});
            if(resourceCodes.size() > 0){
                return loginNameError("资源名称重复！");
            }
            //生成id
            String id = UUIDUtils.getUUID();
            resourceCodeVo.setId(id);
            //创建时间
            resourceCodeVo.setCreateTime(new Date());
            //只有提交的时候生成资源编号
            if(resourceCodeVo.getState().equals("2")){
                String maxCode = resourceCodeServiceImpl.getCode();
                if(StringUtils.isNotBlank(maxCode)){
                    String newCode = Integer.toString(Integer.parseInt(maxCode) + 1);
                    Integer length = 8 - newCode.length();
                    for (int i = 0; i < length; i++) {
                        code += "0";
                    }
                    code += newCode;
                }else{
                    code = "00000001";
                }
                //资源编号
                resourceCodeVo.setCode(code);
            }
            //用户id，姓名
            User user = (User) request.getSession().getAttribute("UserBean");
            resourceCodeVo.setCreateUserId(user.getId().toString());
            resourceCodeVo.setCreateUserName(user.getUsername());

            Integer i = resourceCodeServiceImpl.saveResourceCode(new Object[]{resourceCodeVo});
            data.put("data", i);
            if(i > 0) {
                result = "操作成功";
            }else {
                result = "操作失败";
            }
            return this.doSuccess(result, data);
        }catch(Exception e){
            e.printStackTrace();
            result = "出错了";
            return this.doError(result);
        }
    }

    @RequestMapping(method ={RequestMethod.GET, RequestMethod.POST}, value = "/updateResourceCode", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String updateResourceCode(ResourceCodeVo resourceCodeVo, HttpServletRequest request){
        Map<String, Object> data = new HashMap<String, Object>();
        Map<String, Object> param = new HashMap<String, Object>();
        List<ResourceCode> resourceCode = new ArrayList<ResourceCode>();
        String result = "";
        String code = "";
        try{
            param.put("name",resourceCodeVo.getName());
            param.put("id",resourceCodeVo.getId());
            List<ResourceCode> resourceCodes = resourceCodeServiceImpl.selectRepeatResourceName(new Object[]{param});
            if (resourceCodes.size() == 0){
                param.clear();
                param.put("name",resourceCodeVo.getName());
                resourceCode = resourceCodeServiceImpl.selectRepeatResourceName(new Object[]{param});
            }
            if(resourceCode.size()>0){
                return this.loginNameError("资源名称重复!");
            }
            resourceCodeVo.setCreateTime(new Date());
            resourceCodeVo.setUpdateTime(new Date());
            User user = (User) request.getSession().getAttribute("UserBean");
            resourceCodeVo.setCreateUserId(user.getId().toString());
            resourceCodeVo.setCreateUserName(user.getUsername());
            //只有提交的时候生成资源编号
            if(resourceCodeVo.getState().equals("2")){
                String maxCode = resourceCodeServiceImpl.getCode();
                if(StringUtils.isNotBlank(maxCode)){
                    String newCode = Integer.toString(Integer.parseInt(maxCode) + 1);
                    Integer length = 8 - newCode.length();
                    for (int i = 0; i < length; i++) {
                        code += "0";
                    }
                    code += newCode;
                }else{
                    code = "00000001";
                }
                //资源编号
                resourceCodeVo.setCode(code);
            }
            Integer i = resourceCodeServiceImpl.updateResourceCode(new Object[]{resourceCodeVo});
            data.put("data", i);
            if(i > 0) {
                result = "操作成功";
            }else {
                result = "操作失败";
            }
            return this.doSuccess(result, data);
        }catch(Exception e){
            e.printStackTrace();
            result = "出错了";
            return this.doError(result);
        }
    }

    @RequestMapping(method ={RequestMethod.GET, RequestMethod.POST}, value = "/getSession", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String getSession(HttpServletRequest request){
        Map<String, Object> data = new HashMap<String, Object>();
        try{
            User user = ModelUtil.getUser(request);
            data.put("createUserName", user.getUsername());
            data.put("createTime", new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
            return this.doSuccess("获取用户信息成功", data);
        }catch (Exception e){
            e.printStackTrace();
            return this.doError("获取用户信息失败");
        }
    }

    @RequestMapping(method ={RequestMethod.GET, RequestMethod.POST}, value = "/selectResourceCodeList", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String selectResourceCodeList(HttpServletRequest request, ResourceCodeVo resourceCodeVo){
        try{
            User user = (User)request.getSession().getAttribute("UserBean");
            Map<String, Object> params = new HashMap<>();
            params.put("id", user.getId());
            params.put("code", resourceCodeVo.getCode());//资源编号（选题编号）
            params.put("name", resourceCodeVo.getName());//资源名称
            List<ResourceCode> dataList = resourceCodeServiceImpl.selectResourceCodeList(new Object[]{params});
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

    /**
     * 根据资源编号查询关联目录id
     * @param code
     * @return
     */
    @RequestMapping(method ={RequestMethod.GET, RequestMethod.POST}, value = "/selectCategoresCodeByCode", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String selectCategoresCodeByCode(@RequestParam String code){
        try{
            Map<String, Object> params = new HashMap<>();
            params.put("code", code);
            String categoresCode =  resourceCodeServiceImpl.selectCategoresCodeByCode(new Object[]{params});
            Map<String, Object> data = new HashMap<String, Object>();
            data.put("data", categoresCode);
            return this.doSuccess("成功", data);
        }catch(Exception e){
            e.printStackTrace();
            return this.doError("出错了");
        }


    }

    /**
     *
     * 根据code搜索resource info中是否存在工程文件的记录，code + G000
     *
     */
    @RequestMapping(method ={RequestMethod.GET, RequestMethod.POST}, value = "/checkSelectUsed", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String checkSelectUsed(String code, String id){
        Integer integer = resourceCodeServiceImpl.checkSelectUsed(code, id);
        try{
            return this.doSuccess("success", integer);
        }catch(Exception e){
            e.printStackTrace();
            return this.doError("error");
        }
    }

}
