package com.jsrm.web.restController.resourceInfo;

import com.jsrm.base.common.BaseRestController;
import com.jsrm.base.common.BusinessException;
import com.jsrm.base.common.ModelUtil;
import com.jsrm.base.common.PageVO;
import com.jsrm.base.utils.LevelType;
import com.jsrm.base.utils.UUIDUtils;
import com.jsrm.model.catalog.Icategory;
import com.jsrm.model.resourceInfo.ResourceInfo;
import com.jsrm.model.user.User;
import com.jsrm.service.ResourceInfo.BookManageService;
import com.jsrm.service.ResourceInfo.ResourceInfoService;
import com.jsrm.service.catalog.category.CategoryService;
import com.jsrm.service.statisticalAnalysis.StatisticalAnalysisService;
import com.jsrm.service.user.UserManagerService;
import com.jsrm.web.vo.ResourceInfoVo.ElectronVo;
import com.jsrm.web.vo.ResourceInfoVo.ResourceInfoVo;
import com.jsrm.web.vo.user.UserVo;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
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
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 资源
 * Created by wdCao on 2016/10/13.
 */
@RestController()
@RequestMapping("/bookManage")
public class BookManageRestController extends BaseRestController {
    public static final Log log = LogFactory.getLog(BookManageRestController.class);      //log对象

    @Resource
    BookManageService bookManageService;
    @Resource
    private StatisticalAnalysisService statisticalAnalysisService;
    @Resource
    private CategoryService categoryService;
    /**
     * 获取全部文件列表
     * @param pageNo
     * @param pageSize
     * @param resourceInfoVo
     * @return
     */
    @RequestMapping("/queryAllResourceList")
    private String queryAllResourceList(@RequestParam(value = "pageNo", required = false, defaultValue = "1") Integer pageNo,
                                        @RequestParam(value = "pageSize", required = false, defaultValue = "10") Integer pageSize, ElectronVo electronVo,
                                        HttpServletRequest request) {
        Map<String, Object> params = new HashMap<String, Object>();
        try {
            User user = (User)request.getSession().getAttribute("UserBean");
            electronVo.setUserId(user.getId());//传入当前用户id
            PageVO<ElectronVo> dataList = bookManageService.queryResourceList(pageNo, pageSize, new Object[]{electronVo});      //查询原始文件列表
            Map<String, Object> data = new HashMap<String, Object>();
            data.put("data", dataList);
            data.put("userId", user.getId());
            log.info("获取原始文件列表操作成功");
            return this.doSuccess("success", data);
        } catch (BusinessException e) {
            log.error("获取原始文件列表失败："  + e.getMessage());

            return this.doError("fail");
        }
    }

    /**
     * 获取全部文件列表
     * @param pageNo
     * @param pageSize
     * @param resourceInfoVo
     * @return
     */
    @RequestMapping("/updateOutput")
    private String updateOutput(HttpServletRequest request, HttpServletResponse response, ElectronVo electronVo) {
        Map<String, Object> params = new HashMap<String, Object>();
        try {
            Integer flag = bookManageService.updateOutputState(new Object[]{electronVo});      //查询原始文件列表
            if (flag >= 0) {
                return this.success("修改成功！");
            }else{
                return this.error("修改失败！");
            }
        } catch (BusinessException e) {
            e.printStackTrace();
            return this.error("fail");
        }
    }

    /**
     * 获取全部文件列表
     * @param pageNo
     * @param pageSize
     * @param resourceInfoVo
     * @return
     */
    @RequestMapping("/updateOutputAll")
    private String updateOutputAll(HttpServletRequest request, HttpServletResponse response, ElectronVo electronVo) {
        Map<String, Object> params = new HashMap<String, Object>();

        try {
            JSONArray jasonObject = JSONArray.fromObject(electronVo.getIds());
            List jsonList = (List)jasonObject;
            Integer flag = bookManageService.updateOutputStateByIds(new Object[]{jsonList});      //查询原始文件列表
            if (flag >= 0) {
                return this.success("修改成功！");
            }else{
                return this.error("修改失败！");
            }
        } catch (BusinessException e) {
            e.printStackTrace();
            return this.error("fail");
        }
    }

    @RequestMapping(value = "/getCategory")
    @ResponseBody
    public String getCategory(HttpServletRequest request, HttpServletResponse response,String deep,String parentId) {
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
                if("1".equals(deep.trim())) {
                    JSONObject jobj1 = new JSONObject();
                    jobj1.put("id", code);
                    jobj1.put("pId", "00");
                    jobj1.put("name", name);
                    jobj1.put("deep", "1");
                    jsonArray.add(jobj1);
                }else{
                    String levelName="";
                    if("2".equals(deep)){
                        levelName = LevelType.level1.name();
                    }else if("3".equals(deep)){
                        levelName = LevelType.level2.name();
                    }else if("4".equals(deep)){
                        levelName = LevelType.level3.name();
                    }else if("5".equals(deep)){
                        levelName = LevelType.level4.name();
                    }
                List<Icategory> icategories = this.bookManageService.getIcategoriesByILevelAndCode(levelName, parentId);
                for (Icategory icategory : icategories) {
                    String level = "";
                    if("2".equals(deep)){
                        level = icategory.getLevel2();
                    }else if("3".equals(deep)){
                        level = icategory.getLevel3();
                    }else if("4".equals(deep)){
                        level = icategory.getLevel4();
                    }
                    if(Integer.parseInt(deep) < 5){
                    if (ifSameNode(jsonArray, level, parentId, deep)) {
                        JSONObject jobj2 = new JSONObject();
                        jobj2.put("id", level);
                        jobj2.put("pId", parentId);
                        jobj2.put("name", this.categoryService.getCategoryDictNameByCode(level.split("-")[Integer.parseInt(deep)-1]).getName());
                        jobj2.put("deep", deep);
                        jsonArray.add(jobj2);
                    }
                    }
//                    if("3".equals(deep.trim())) {
//                        if (ifSameNode(jsonArray, level3, level2, "3")) {
//                            JSONObject jobj3 = new JSONObject();
//                            jobj3.put("id", level3);
//                            jobj3.put("pId", level2);
//                            jobj3.put("name", this.categoryService.getCategoryDictNameByCode(level3.split("-")[2]).getName());
//                            jobj3.put("deep", "3");
//                            jsonArray.add(jobj3);
//                        }
//                    }
//                    if("4".equals(deep.trim())) {
//                        if (ifSameNode(jsonArray, level4, level3, "4")) {
//                            JSONObject jobj4 = new JSONObject();
//                            jobj4.put("id", level4);
//                            jobj4.put("pId", level3);
//                            jobj4.put("name", this.categoryService.getCategoryDictNameByCode(level4.split("-")[3]).getName());
//                            jobj4.put("deep", "4");
//                            jsonArray.add(jobj4);
//                        }
//                    }

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
            String jpId = jobj.get("pId").toString();
            if (jid.equals(id) && jpId.equals(pId) && jdeep.equals(deep)) {
                return false;
            }
        }
        return true;
    }
}
