package com.jsrm.service.catalog.category.impl;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.service.impl.BaseSupportServiceImpl;
import com.jsrm.base.utils.BaseUtils;
import com.jsrm.base.utils.MsgUtils;
import com.jsrm.model.catalog.Category;
import com.jsrm.model.catalog.CategoryDict;
import com.jsrm.model.catalog.Icategory;
import com.jsrm.service.catalog.category.CategoryService;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 目录体系接口实现
 * Created by kingsj.yuan@foxmail.com on 2016/10/25.
 */
@Service
public class CategoryServiceImpl extends BaseSupportServiceImpl implements CategoryService {

    @Override
    public void saveOrUpdateCategory(Category category) throws BusinessException {

        Map<String, Object> map = new HashMap<>();
        String categoryId = category.getId();
        category.setFlag("0");
        map.put("id", categoryId);
        Category icg = this.getDao().selectOne("category.getCategories", new Object[]{map});
        if (icg != null) { //修改
            map.clear();
            BaseUtils.copyNonNullMap(map, category, new String[]{"id"});
            try {
                this.getDao().updateJDBC("t_base_categories", "id = '" + categoryId + "'", map);
            } catch (SQLException e) {
                throw new BusinessException(e.getMessage());
            }
        } else { //新增
            map.clear();
            String deep = category.getDeep();
            category.setDeepCode(getDeepCode(deep));
            BaseUtils.copyMap(map, category);
            try {
                this.getDao().insertJDBC("t_base_categories", map);
            } catch (SQLException e) {
                throw new BusinessException(e.getMessage());
            }
        }
    }

    @Override
    public String getSeq() throws BusinessException {
        String seq = this.getDao().getSeq("1", "t_base_categories", "id");
        return seq;
    }

    @Override
    public List<Category> getCategoryList(Map<String, Object> map) throws BusinessException {
        map.put("flag", "0");
        List<Category> categories = this.getDao().selectList("category.getCategories", new Object[]{map});
        return categories;
    }

    @Override
    public void deleteCategory(String id) {
        try {
            Map<String, Object> map = new HashMap<>();
            map.put("id", id);
            Category cg = this.getDao().selectOne("category.getCategories", new Object[]{map});
            if (cg != null) {
                cg.setFlag("1");
                BaseUtils.copyNonNullMap(map, cg, new String[]{"id"});
                this.getDao().updateJDBC("t_base_categories", "id = '" + id + "'", map);
            }
            map.clear();
            map.put("parentId", id);
            List<Category> categories = this.getDao().selectList("category.getCategories", new Object[]{map});
            if (categories.size() > 0) {
                for (Category category : categories) {
                    map.clear();
                    category.setFlag("1");
                    BaseUtils.copyNonNullMap(map, category, new String[]{"id"});
                    String categoryId = category.getId();
                    this.getDao().updateJDBC("t_base_categories", "id = '" + categoryId + "'", map);
                    deleteCategory(categoryId);
                }
            }
        } catch (SQLException e) {
            throw new BusinessException(e.getMessage());
        }
    }

    @Override
    public List<Category> getCategoriesByCascade(String parentId, String deep) throws BusinessException {
        Map<String, Object> map = new HashMap<>();
        map.put("deep", deep);
        if (BaseUtils.isNotBlank(parentId)) {
            map.put("parentId", parentId);
        }
        List<Category> categories = this.getDao().selectList("category.getCategories", new Object[]{map});
        return categories;
    }

    @Override
    public List<Category> getCategoriesByIds(List<String> ids) throws BusinessException {
        Map<String, Object> map = new HashMap<>();
        map.put("ids", ids);
        List<Category> categories = this.getDao().selectList("category.getCategories", new Object[]{map});
        return categories;
    }

    @Override
    public Category getCategoryById(String id) throws BusinessException {
        Map<String, Object> map = new HashMap<>();
        map.put("id", id);
        Category category = this.getDao().selectOne("category.getCategories", new Object[]{map});
        return category;
    }

    @Override
    public List<Category> getCategoryByMap(Map<String, Object> map) throws BusinessException {
        return this.getDao().selectList("category.getCategories", new Object[]{map});
    }

    @Override
    public List<Category> getiCategory(Map<String, Object> map) throws BusinessException {
        return this.getDao().selectList("category.getiCategory", new Object[]{map});
    }

    @Override
    public String getSeqCode() throws BusinessException {
        String code = this.getDao().getSeq("1", "t_base_categories_relation", "id");
        return code;
    }

    @Override
    public void saveCategoryRelation(Icategory icategory) throws BusinessException {
        Map<String, Object> map = new HashMap<>();
        BaseUtils.copyMap(map, icategory);
        try {
            this.getDao().insertJDBC("t_base_categories_relation", map);
        } catch (SQLException e) {
            throw new BusinessException(e.getMessage());
        }
    }

    @Override
    public List<Map<String, Object>> getCategoryRelations(String level) throws BusinessException {
        Map<String, Object> map = new HashMap<>();
        map.put("level", level);
        return this.getDao().selectList("category.getCategoryRelationLevels", new Object[]{map});
    }

    @Override
    public List<Map<String, Object>> getICategoryByParentCode(String code, String nextLevel) throws BusinessException {
        Map<String, Object> map = new HashMap<>();
        map.put("iLevel", nextLevel);
        map.put("parentCode", code);
        return this.getDao().selectList("category.getICategoryByParentCode", new Object[]{map});
    }

    @Override
    public CategoryDict getCategoryDictNameByCode(String code) throws BusinessException {
        return this.getDao().selectOne("category.getCategoryDictNameByCode", new Object[]{code});
    }

    @Override
    public Icategory getIcategoryByStr(String level1234) throws BusinessException {
        Icategory icategory = this.getDao().selectOne("category.getIcategoryByStr", new Object[]{level1234});
        return icategory;
    }

    @Override
    public List<Icategory> getIcategoriesByILevelAndCode(String level, String code) throws BusinessException {
        Map<String, Object> map = new HashMap<>();
        map.put("iLevel", level);
        map.put("iCode", code);
        return this.getDao().selectList("category.getCategoryRelations", new Object[]{map});
    }

    @Override
    public Icategory getIcategoryByCodeOrLeve4(String code, String level4) throws BusinessException {
        Map<String, Object> map = new HashMap<>();
        if (BaseUtils.isNotBlank(code)) {
            map.put("code", code);
        }
        if (BaseUtils.isNotBlank(level4)) {
            map.put("level4", level4);
        }
        return this.getDao().selectOne("category.getIcategoryByCodeOrLeve4", new Object[]{map});
    }

    @Override
    public List<String> getLevelByDeep(String levelp) throws Exception {
        Map<String, Object> map = new HashMap<>();
        map.put("levelp", levelp);
        return this.getDao().selectList("category.getLevelByDeep", new Object[]{map});
    }

    protected String getDeepCode(String deep) {
        return MsgUtils.getText("category.level_" + deep);
    }

	@Override
	public List<CategoryDict> getCategoryDictsByIds(List<String> ids) throws BusinessException {
		Map<String, Object> map = new HashMap<>();
        map.put("ids", ids);
        List<CategoryDict> categoryDict = this.getDao().selectList("category.getCategoryDicts", new Object[]{map});
        return categoryDict;
	}
}
