package com.jsrm.web.restController.catalog.category;

import com.jsrm.base.common.BaseRestController;
import com.jsrm.base.common.BusinessException;
import com.jsrm.base.utils.BaseUtils;
import com.jsrm.base.utils.JExcel;
import com.jsrm.base.utils.LevelType;
import com.jsrm.model.catalog.Category;
import com.jsrm.model.catalog.Icategory;
import com.jsrm.service.catalog.category.CategoryService;
import com.jsrm.service.user.UserManagerService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.lang3.StringUtils;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 目录体系
 * <p/>
 * Created by kingsj.yuan@foxmail.com on 2016/10/25.
 */

@RestController
@RequestMapping("/category")
public class CategoryCtrl extends BaseRestController {

    @Resource
    private CategoryService categoryService;
    @Resource
    private UserManagerService userManagerService;

    @RequestMapping("/getCategorySeq")
    @ResponseBody
    public String getCategorySeq() {
        String categoryId = this.categoryService.getSeq();
        return categoryId;
    }

    @RequestMapping("/updateCategoryName")
    public String updateCategoryName(Category category) {
        Map<String, Object> parms = new HashMap<String, Object>();
        try {
            this.categoryService.saveOrUpdateCategory(category);
            parms.put("id", category.getId());
            parms.put("name", category.getName());
            userManagerService.updateUserDataAuthority(new Object[]{parms});
        } catch (BusinessException e) {
            return this.error(e.getMessage());
        }
        return this.success("操作成功！");
    }

    @RequestMapping("/insertCategoryByExcel")
    public String insertCategoryByExcel(MultipartFile file) {
        try {
            FileInputStream fileInputStream = null;
            InputStream inputStream = file.getInputStream();
//            if (inputStream instanceof FileInputStream) {
//                fileInputStream = (FileInputStream) file.getInputStream();
//            } else {
//                return this.error("该文件类型转换失败，请重新下载模版导入");
//            }

            List<Map<String, Object>> data = JExcel.getExcelData(inputStream);
            String parentId = "";
            String ideep = "";

            Icategory icategory = new Icategory();
            String levelCode = "";
            for (Map<String, Object> map : data) {

                String name = map.get("name").toString();
                String deep = map.get("deep").toString();

                if (deep.equals("1")) {
                    parentId = "00";
                }
                if (Integer.valueOf(deep) <= 4) {
                    if (deep.equals("1")) {
                        levelCode += name;
                        icategory.setLevel1(levelCode);
                        continue;
                    }
                    if (deep.equals("2")) {
                        levelCode += "-" + name;
                        icategory.setLevel2(levelCode);
                        continue;
                    }
                    if (deep.equals("3")) {
                        levelCode += "-" + name;
                        icategory.setLevel3(levelCode);
                        continue;
                    }
                    if (deep.equals("4")) {
                        levelCode += "-" + name;
                        String seqCode = this.categoryService.getSeqCode();
                        icategory.setLevel4(levelCode);
                        icategory.setCode(seqCode);
                    }
                    try {
                        Icategory icategoryByStr = this.categoryService.getIcategoryByStr(levelCode);
                        if (icategoryByStr == null) {
                            this.categoryService.saveCategoryRelation(icategory);
                        } else {
                            icategory.setCode(icategoryByStr.getCode());
                            return this.error("已存在有相同的前四级的目录，请到结构目录中修改");
                        }
                    } catch (BusinessException e) {
                        return this.error("请检查前四级是否正确");
                    }
                } else {
                    Category category = new Category();
                    category.setName(name);
                    category.setDeep(deep);
                    String categoryId = this.categoryService.getSeq();
                    if (!ideep.equals(deep) && ideep != "") { // 得到同级parentId
                        for (; ; ) {
                            Category cg = this.categoryService.getCategoryById(parentId);
                            if (cg != null) {
                                if (cg.getDeep().equals(deep)) {
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
                    category.setId(categoryId);
                    if (deep.equals("5")) {
                        parentId = icategory.getCode();
                    }
                    category.setParentId(parentId);
                    this.categoryService.saveOrUpdateCategory(category);
                    parentId = categoryId;
                    ideep = String.valueOf((Integer.valueOf(deep) + 1));
                }

            }
        } catch (BusinessException e) {
            return this.error(e.getMessage());
        } catch (IOException e) {
            return this.error("该文件类型转换失败，请重新下载模版导入");
        }
        return this.success("操作成功！");
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
                String level5 = icategory.getCode();
                String level2 = icategory.getLevel2();
                String level3 = icategory.getLevel3();
                String level4 = icategory.getLevel4();

                if (ifSameNode(jsonArray, level2, code, "2")) {
                    JSONObject jobj2 = new JSONObject();
                    jobj2.put("id", level2);
                    jobj2.put("pId", code);
                    String code2 = "";
                    try {
                        code2 = level2.split("-")[1];
                        jobj2.put("name", this.categoryService.getCategoryDictNameByCode(code2).getName());
                    } catch (Exception e) {
                        return this.doError("该code编码 " + code2 + " 在目录字典表不存在");
                    }
                    jobj2.put("deep", "2");
                    jsonArray.add(jobj2);
                }

                if (ifSameNode(jsonArray, level3, level2, "3")) {
                    JSONObject jobj3 = new JSONObject();
                    jobj3.put("id", level3);
                    jobj3.put("pId", level2);
                    String code3 = "";
                    try {
                        code3 = level3.split("-")[2];
                        jobj3.put("name", this.categoryService.getCategoryDictNameByCode(code3).getName());
                    } catch (Exception e) {
                        return this.doError("该code编码 " + code3 + " 在目录字典表不存在");
                    }
                    jobj3.put("deep", "3");
                    jsonArray.add(jobj3);
                }

                if (ifSameNode(jsonArray, level5, level3, "4")) {
                    JSONObject jobj4 = new JSONObject();
                    jobj4.put("id", level5);
                    jobj4.put("pId", level3);
                    String code4 = "";
                    try {
                        code4 = level4.split("-")[3];
                        String name4 = this.categoryService.getCategoryDictNameByCode(code4).getName();
                        jobj4.put("name", name4);
                    } catch (Exception e) {
                        return this.doError("该code编码 " + code4 + " 在目录字典表不存在");
                    }
                    jobj4.put("deep", "4");
                    jsonArray.add(jobj4);
                }

            }
        }

        map.clear();
        if (BaseUtils.isNotBlank(deep)) {
            map.put("deep", deep);
        }
        List<Category> categoryList = this.categoryService.getCategoryList(map);
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


    @RequestMapping("/delete")
    public String delete(String id) {
        try {
            this.categoryService.deleteCategory(id);
        } catch (BusinessException e) {
            return this.error(e.getMessage());
        }
        return this.success("操作成功！");
    }

    @RequestMapping(value = "/getCategoriesByCascade", method = RequestMethod.POST)
    @ResponseBody
    public String getCategoriesByCascade(String parentId, String deep) {

        Integer ideep = Integer.valueOf(deep);
        String level = LevelType.level1.name();
        JSONArray jsonArray = new JSONArray();
        if (ideep <= 4) {
            if (ideep == 2) level = LevelType.level2.name();
            if (ideep == 3) level = LevelType.level3.name();
            if (ideep == 4) level = LevelType.level4.name();
            List<Map<String, Object>> mapList = this.categoryService.getICategoryByParentCode(parentId, level);
            for (Map<String, Object> map : mapList) {
                String code = map.get("code").toString();
                String name = map.get("name").toString();
                JSONObject jobj = new JSONObject();
                jobj.put("id", code);
                jobj.put("pId", parentId);
                jobj.put("deep", deep);
                jobj.put("name", name);
                jsonArray.add(jobj);
            }
        } else {

            if (ideep == 5 && parentId.split("-").length > 1) {
                Icategory icategory = this.categoryService.getIcategoryByCodeOrLeve4(null, parentId);
                parentId = icategory.getCode();
            }

            List<Category> categories = this.categoryService.getCategoriesByCascade(parentId, deep);
            for (Category category : categories) {
                JSONObject jobj = new JSONObject();
                jobj.put("id", category.getId());
                jobj.put("pId", category.getParentId());
                jobj.put("deep", category.getDeep());
                jobj.put("name", category.getName());
                jsonArray.add(jobj);
            }
        }

        return this.doSuccess("操作成功", jsonArray);
    }


    @RequestMapping(value = "/getCategoriesByIds", method = RequestMethod.POST)
    @ResponseBody
    public String getCategoriesByIds(String ids[]) {
        List listIds = CollectionUtils.arrayToList(ids);
        Integer num = 0;
        JSONArray jsonArray = new JSONArray();
        if(listIds.size()>=4){
            num=4;
        }else{
            num = listIds.size();
        }
        for (int i = 0; i < num; i++) {
            String id = listIds.get(i).toString();
            if (id.equals("null")) {
                return this.doSuccess("操作成功", jsonArray);
            }
            String parentId = "00";
            String code = listIds.get(0).toString();
            if (i > 0) {
                parentId = listIds.get(i - 1).toString();
                code = StringUtils.substringAfter(id, parentId + "-");
            }
            String name = this.categoryService.getCategoryDictNameByCode(code).getName();
            JSONObject jobj = new JSONObject();
            jobj.put("id", id);
            jobj.put("pId", parentId);
            jobj.put("deep", i + 1);
            jobj.put("name", name);
            jsonArray.add(jobj);
        }
        if(listIds.size()>=4) {
            List<Category> categories = this.categoryService.getCategoriesByIds(listIds.subList(3, ids.length));
            for (Category category : categories) {
                JSONObject jobj = new JSONObject();
                jobj.put("id", category.getId());
                jobj.put("pId", category.getParentId());
                jobj.put("deep", category.getDeep());
                jobj.put("name", category.getName());
                jsonArray.add(jobj);
            }
        }
        return this.doSuccess("操作成功", jsonArray);
    }

}
