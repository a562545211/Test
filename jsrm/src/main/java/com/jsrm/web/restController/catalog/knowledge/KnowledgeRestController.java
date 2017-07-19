package com.jsrm.web.restController.catalog.knowledge;

import com.jsrm.base.common.BaseRestController;
import com.jsrm.base.common.BusinessException;
import com.jsrm.base.utils.JExcel;
import com.jsrm.base.utils.LevelType;
import com.jsrm.model.catalog.BaseKnowledge;
import com.jsrm.model.catalog.Category;
import com.jsrm.model.catalog.Icategory;
import com.jsrm.service.catalog.category.CategoryService;
import com.jsrm.service.catalog.knowledge.KnowledgeService;
import com.jsrm.web.vo.catalog.BaseKnowledgeVo;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

/**
 * 用户
 * Created by wdCao on 2016/10/17.
 */
@RestController()
@RequestMapping("/knowledge")
public class KnowledgeRestController extends BaseRestController {
    public static final Log log = LogFactory.getLog(KnowledgeRestController.class);      //log对象

    @Resource
    private KnowledgeService knowledgeService;
    @Resource
    private CategoryService categoryService;

    /**
     * 获取知识点
     * @return
     */
    @RequestMapping("/getKnowledge")
    @ResponseBody
    private Map<String,Object> getKnowledge(HttpServletRequest request, HttpServletResponse response,BaseKnowledgeVo knowledgeVo) {
        Map<String,Object> result = new HashMap<String,Object>();
        Map<String,Object> params = new HashMap<String,Object>();

        BaseKnowledgeVo baseKnowledgeVo = new BaseKnowledgeVo();
        baseKnowledgeVo.setId("0");
        baseKnowledgeVo.setpId("-1");
        baseKnowledgeVo.setName("京师知识点体系");
        baseKnowledgeVo.setOpen("true");

        if("2".equals(knowledgeVo.getCategoryDeep().trim())){
            params.put("subjectId",knowledgeVo.getCategoryId());
        }else{
            params.put("phaseId",knowledgeVo.getCategoryId());
        }
        List<BaseKnowledgeVo> knowledge = knowledgeService.getKnowledge(new Object[]{params});
        knowledge.add(baseKnowledgeVo);

        if(knowledge.size() > 0){
            result.put("status",0);
            result.put("data",knowledge);
        }
         return  result;
     }
    /**
     * 新增知识点
     * @return
     */
    @RequestMapping("/saveOrUpdateKnowledge")
    @ResponseBody
    private String saveOrUpdateKnowledge(HttpServletRequest request, HttpServletResponse response, BaseKnowledgeVo baseKnowledgeVo) {
        Map<String,Object> result = new HashMap<String,Object>();
        Map<String,Object> params = new HashMap<String,Object>();
        Integer back = 0;
        BaseKnowledge knowledge = knowledgeService.getKnowledge(baseKnowledgeVo.getId());
        if(knowledge != null){
            back = knowledgeService.updateKnowledge(new Object[]{baseKnowledgeVo});
        }else{
            baseKnowledgeVo.setFlag("0");
            back = knowledgeService.saveKnowledge(new Object[]{baseKnowledgeVo});
        }

        if(back == 1){
            return this.success("操作成功！");
        }else{
            return this.error("操作失败！");
        }

    }

    @RequestMapping("/delete")
    public String delete(String id) {
        try {
            this.knowledgeService.deleteKnowledge(id);
        } catch (BusinessException e) {
            return this.error(e.getMessage());
        }
        return this.success("操作成功！");
    }
     /**
     * 新增知识点
     * @return
     */
    @RequestMapping("/addKnowledge")
    @ResponseBody
    private Map<String,Object> addKnowledge(HttpServletRequest request, HttpServletResponse response, String json) {
        String jsonArrayData="[{\"id\": \"02\", \"pId\": \"0\",\"name\": \"一级知识点2\"}, {\"id\": \"0201\",\"pId\": \"02\",\"name\": \"二级知识点2\"},{\"id\": \"020101\",\"pId\": \"0201\",\"name\": \"三级知识点2\"}]";
        Map<String,Object> result = new HashMap<String,Object>();
        Map<String,Object> params = new HashMap<String,Object>();
        JSONArray jsonArray = JSONArray.fromObject(jsonArrayData);
        List<Map<String,Object>> mapListJson = (List)jsonArray;
        Integer integer = knowledgeService.addKnowledge(new Object[]{mapListJson});
        return  result;
    }

    /**
     *
     * @return
     */
    @RequestMapping("/getKnowledgeSeq")
    @ResponseBody
    public String getKnowledgeSeq() {
        String categoryId = this.knowledgeService.getSeq();
        return categoryId;
    }

    /**
     *
     * @param parentId
     * @param deep
     * @return
     */
    @RequestMapping(value = "/getKnowledgeByCascade", method= RequestMethod.POST)
    @ResponseBody
    public String getKnowledgeByCascade(String parentId, String deep) {
        List<BaseKnowledge> baseKnowledge = this.knowledgeService.getKnowledgeByCascade(parentId, deep,"","");
        JSONArray jsonArray = new JSONArray();
        for (BaseKnowledge BaseKnowledge : baseKnowledge) {
            JSONObject jobj = new JSONObject();
            jobj.put("id", BaseKnowledge.getId());
            jobj.put("pId", BaseKnowledge.getParentId());
            jobj.put("deep", BaseKnowledge.getDeep());
            jobj.put("name", BaseKnowledge.getName());
            jsonArray.add(jobj);
        }
        return this.doSuccess("操作成功", jsonArray);
    }

    @RequestMapping(value = "/categoryList")
    @ResponseBody
    public String categoryList() {
        HashMap<String, Object> map = new HashMap<>();
        List<Category> categoryList = this.knowledgeService.getCategoryList(map);
        JSONArray jsonArray = new JSONArray();
        JSONObject topObj = new JSONObject();
        topObj.put("id","00"); //初始化顶级node
        topObj.put("pId", "-1");
        topObj.put("name", "京师目录体系");
        topObj.put("deep", "0");
        topObj.put("deepCode", "jsxf");
        topObj.put("open", "true");
        jsonArray.add(topObj);
        for (Category category : categoryList) {
            JSONObject obj = new JSONObject();
            obj.put("id", category.getId());
            obj.put("pId", category.getParentId());
            obj.put("name", category.getName());
            obj.put("deep", category.getDeep());
            obj.put("deepCode", category.getDeepCode());
            jsonArray.add(obj);
        }
        return this.doSuccess("操作成功", jsonArray);
    }

    @RequestMapping(value = "/list")
    @ResponseBody
    public String categoryList(String deep) {
        Map<String, Object> map = new HashMap<>();

        JSONArray jsonArray = new JSONArray();
        JSONObject topObj = new JSONObject();
        topObj.put("id", "00"); //初始化顶级node
        topObj.put("pId", "-1");
        topObj.put("name", "京师目录体系");
        topObj.put("deep", "0");
        topObj.put("deepCode", "jsxf");
        topObj.put("open", "true");
        jsonArray.add(topObj);

        List<Map<String, Object>> leve1s = this.categoryService.getCategoryRelations(LevelType.level1.name());
        for (Map<String, Object> level1 : leve1s) {
            String code = level1.get("code").toString();
            String name = level1.get("name").toString();

            JSONObject jobj1 = new JSONObject();
            jobj1.put("id", code);
            jobj1.put("pId", "00");
            jobj1.put("name", name);
            jobj1.put("deep", "1");
            jsonArray.add(jobj1);

            List<Icategory> icategories = this.categoryService.getIcategoriesByILevelAndCode(LevelType.level1.name(), code);
            for (Icategory icategory : icategories) {
                String level2 = icategory.getLevel2();

                if (ifSameNode(jsonArray, level2, code, "2")) {
                    JSONObject jobj2 = new JSONObject();
                    jobj2.put("id", level2);
                    jobj2.put("pId", code);
                    jobj2.put("name", this.categoryService.getCategoryDictNameByCode(level2.split("-")[1]).getName());
                    jobj2.put("deep", "2");
                    jsonArray.add(jobj2);
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

    @RequestMapping(value = "/getKnowledgesByCascade", method= RequestMethod.POST)
    @ResponseBody
    public String getKnowledgesByCascade(String parentId, String deep,String phaseId, String subjectId) {
        List<BaseKnowledge> baseKnowledge = this.knowledgeService.getKnowledgeByCascade(parentId, deep,phaseId,subjectId);
        JSONArray jsonArray = new JSONArray();
        for (BaseKnowledge knowledge : baseKnowledge) {
            JSONObject jobj = new JSONObject();
            jobj.put("id", knowledge.getId());
            jobj.put("pId", knowledge.getParentId());
            jobj.put("deep", knowledge.getDeep());
            jobj.put("name", knowledge.getName());
            jsonArray.add(jobj);
        }
        return this.doSuccess("操作成功", jsonArray);
    }


    @RequestMapping(value = "/getdgeKnowlesByIds", method= RequestMethod.POST)
    @ResponseBody
    public String getdgeKnowlesByIds(String ids) {
        List<JSONArray> result = new ArrayList<>();
        Map<String,Object> mapId = new HashMap<String,Object>();
        String [] idss = ids.split(";");
        for(int i = 0;i<idss.length;i++) {
            List listIds = CollectionUtils.arrayToList(idss[i].split(","));
            List<BaseKnowledgeVo> baseKnowledge = this.knowledgeService.getKnowledgesByIds(listIds);
            JSONArray jsonArray = new JSONArray();
            for (BaseKnowledgeVo knowledge : baseKnowledge) {
                JSONObject jobj = new JSONObject();
                jobj.put("id", knowledge.getId());
                jobj.put("pId", knowledge.getParentId());
                jobj.put("deep", knowledge.getDeep());
                jobj.put("name", knowledge.getName());
                jsonArray.add(jobj);
//                result.add(jobj);
            }

//            mapId.put("groupIds"+(i+1),jsonArray);
            result.add(jsonArray);
        }

        return this.doSuccess("操作成功", result);
    }

    @RequestMapping("/insertKnowledgeByExcel")
    public String insertKnowledgeByExcel(MultipartFile file) {
        try {
//            FileInputStream fileInputStream = null;
            InputStream inputStream = file.getInputStream();
//            if (inputStream instanceof FileInputStream) {
//                fileInputStream = (FileInputStream) file.getInputStream();
//            } else {
//                return this.error("该文件类型转换失败，请重新下载模版导入");
//            }

            List<Map<String, Object>> data = JExcel.getExcelData(inputStream);
            String parentId = "";
            String ideep = "";
            String subjectId = "";
            String phaseId = "";

            Icategory icategory = new Icategory();
            String levelCode = "";
            for (Map<String, Object> map : data) {

                String name = map.get("name").toString();
                String deep = map.get("deep").toString();
                String newDeep = String.valueOf(Integer.parseInt( map.get("deep").toString().trim())-4);
                if(deep.equals("1")){
                    phaseId = map.get("name").toString();
                    continue;
                }
                if(deep.equals("2")){
                    subjectId =phaseId+"-"+map.get("name").toString();
                    continue;
                }
                if (deep.equals("5")) {
                    parentId = "0";
                }
                BaseKnowledge baseKnowledge = new BaseKnowledge();
                baseKnowledge.setFlag("0");
                baseKnowledge.setPhaseId(phaseId);
                baseKnowledge.setSubjectId(subjectId);
                baseKnowledge.setName(name);
                baseKnowledge.setDeep(newDeep);
                String knowledgeId = this.knowledgeService.getSeq();
                if (!ideep.equals(newDeep) && ideep != "") { // 得到同级parentId
                    for (; ; ) {
                        BaseKnowledge cg = this.knowledgeService.getKnowledge(parentId);
                        if (cg != null) {
                            if (cg.getDeep().equals(newDeep)) {
                                parentId = cg.getParentId();
                                break;
                            } else {
                                parentId = cg.getParentId();
                                continue;
                            }
                        } else {
                            break;
                        }
                    }
                }
                baseKnowledge.setId(knowledgeId);
                baseKnowledge.setParentId(parentId);
                this.knowledgeService.saveKnowledge(new Object[]{baseKnowledge});
                parentId = knowledgeId;
                ideep = String.valueOf((Integer.valueOf(newDeep)+1));
            }
        } catch (BusinessException e) {
            return this.error(e.getMessage());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return this.success("操作成功！");
    }
}
