package com.jsrm.service.catalog.knowledge;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.service.BaseService;
import com.jsrm.model.catalog.BaseKnowledge;
import com.jsrm.model.catalog.Category;
import com.jsrm.model.user.User;
import com.jsrm.web.vo.catalog.BaseKnowledgeVo;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;


/**
 * 用户service
 * Created by wdCao on 2016/10/25.
 */
public interface KnowledgeService extends BaseService {

    /**
     * 获取知识点
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public List<BaseKnowledgeVo> getKnowledge(Object[] parameArrayList) throws BusinessException;

    /**
     * 单个新增知识点
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    @Transactional
    public Integer saveKnowledge (Object[] parameArrayList) throws BusinessException;

    /**
     * 修改知识点
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    @Transactional
    public Integer updateKnowledge (Object[] parameArrayList) throws BusinessException;

    /**
     * 删除知识点
     * @param id
     */
    @Transactional
    void deleteKnowledge(String id) throws BusinessException;

    /**
     * 新增知识点
     * @param parameArrayList
     * @throws BusinessException
     */
    @Transactional
    public Integer addKnowledge (Object[] parameArrayList) throws BusinessException;

    /**
     *
     * @param parentId
     * @param deep
     * @return
     * @throws BusinessException
     */
    public List<BaseKnowledge> getKnowledgeByCascade(String parentId, String deep,String phaseId, String subjectId) throws BusinessException;

    /**
     * 获取单个知识点
     * @param id
     * @return
     * @throws BusinessException
     */
    public BaseKnowledge getKnowledge(String id) throws BusinessException;

    /**
     *
     * @return
     * @throws BusinessException
     */
    public String getSeq() throws BusinessException;

    /**
     * 查看所有目录
     * @param map
     * @return list
     * @throws BusinessException
     */
    List<Category> getCategoryList(Map<String, Object> map) throws BusinessException;


    /**
     * 级联查询
     * @param parentId
     * @param deep
     * @return list
     * @throws BusinessException
     */
    List<BaseKnowledgeVo> getKnowledgesByCascade(String parentId, String deep) throws BusinessException;

    /**
     * 根据id批量查询
     * @param ids
     * @return list
     * @throws BusinessException
     */
    List<BaseKnowledgeVo> getKnowledgesByIds(List<String> ids) throws BusinessException;





}
