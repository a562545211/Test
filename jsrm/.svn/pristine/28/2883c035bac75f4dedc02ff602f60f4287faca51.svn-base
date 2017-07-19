package com.jsrm.service.catalog.category;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.service.BaseService;
import com.jsrm.model.catalog.Category;
import com.jsrm.model.catalog.CategoryDict;
import com.jsrm.model.catalog.Icategory;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * 目录体系 接口
 * <p>
 * Created by kingsj.yuan@foxmail.com on 2016/10/25.
 */
public interface CategoryService extends BaseService {

    /**
     * 增加或修改目录
     *
     * @param category
     */
    @Transactional
    void saveOrUpdateCategory(Category category) throws BusinessException;

    /**
     * 得到数据库主键序列
     *
     * @return
     * @throws BusinessException
     */
    String getSeq() throws BusinessException;

    /**
     * 查看所有目录
     *
     * @param map
     * @return list
     * @throws BusinessException
     */
    List<Category> getCategoryList(Map<String, Object> map) throws BusinessException;

    /**
     * 删除目录节点
     *
     * @param id
     */
    @Transactional
    void deleteCategory(String id) throws BusinessException;

    /**
     * 级联查询
     *
     * @param parentId
     * @param deep
     * @return list
     * @throws BusinessException
     */
    List<Category> getCategoriesByCascade(String parentId, String deep) throws BusinessException;

    /**
     * 根据id批量查询
     *
     * @param ids
     * @return list
     * @throws BusinessException
     */
    List<Category> getCategoriesByIds(List<String> ids) throws BusinessException;
    /**
     * 根据id批量查询
     *
     * @param ids
     * @return list
     * @throws BusinessException
     */
    List<CategoryDict>getCategoryDictsByIds(List<String> ids)throws BusinessException;

    /**
     * 根据Id查询
     *
     * @param id
     * @return
     * @throws BusinessException
     */
    Category getCategoryById(String id) throws BusinessException;

    /**
     * 根据条件查询
     *
     * @param map
     * @return
     * @throws BusinessException
     */
    List<Category> getCategoryByMap(Map<String, Object> map) throws BusinessException;

    /**
     * 根据条件查询--唯一、无下级
     *
     * @param map
     * @return
     * @throws BusinessException
     */
    List<Category> getiCategory(Map<String, Object> map) throws BusinessException;

    /**
     * 得到数据库主键序列
     * table --- t_base_categories_relation
     *
     * @return
     * @throws BusinessException
     */
    String getSeqCode() throws BusinessException;

    /**
     * 增加目录关系表
     *
     * @param icategory
     */
    @Transactional
    void saveCategoryRelation(Icategory icategory) throws BusinessException;

    /**
     * 过滤目录级别属性
     * @param level
     * @return
     * @throws BusinessException
     */
    List<Map<String, Object>> getCategoryRelations(String level) throws BusinessException;

    /**
     * 过滤目录级别下级
     * @return
     * @throws BusinessException
     */
    List<Map<String, Object>> getICategoryByParentCode(String code, String nextLevel) throws BusinessException;

    /**
     * 查询目录字典表
     *
     * @param code
     * @return
     * @throws BusinessException
     */
    CategoryDict getCategoryDictNameByCode(String code) throws BusinessException;

    /**
     * 根据级别拼接字符串获取关系表实体
     *
     * @param level1234
     * @return
     * @throws BusinessException
     */
    Icategory getIcategoryByStr(String level1234) throws BusinessException;

    /**
     * 根据级别和code查询关系表list
     * @param level
     * @param code
     * @return
     * @throws BusinessException
     */
    List<Icategory> getIcategoriesByILevelAndCode(String level, String code) throws BusinessException;

    /**
     * @param code
     * @param level4
     * @return
     * @throws BusinessException
     */
    Icategory getIcategoryByCodeOrLeve4(String code, String level4) throws BusinessException;

    List<String> getLevelByDeep(String levelp) throws Exception;


}
