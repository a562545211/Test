package com.jsrm.service.catalog.knowledge.impl;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.service.impl.BaseSupportServiceImpl;
import com.jsrm.base.utils.BaseUtils;
import com.jsrm.model.catalog.BaseKnowledge;
import com.jsrm.model.catalog.Category;
import com.jsrm.service.catalog.knowledge.KnowledgeService;
import com.jsrm.web.vo.catalog.BaseKnowledgeVo;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 用户service实现
 * Created by wdCao on 2016/10/17.
 */
@Service
public class KnowledgeServiceImpl extends BaseSupportServiceImpl implements KnowledgeService {

    @Override
    public List<BaseKnowledgeVo> getKnowledge(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectList("knowledge.getKnowledge",parameArrayList);
    }

    @Override
    public Integer saveKnowledge(Object[] parameArrayList) throws BusinessException {
        int insert = this.getDao().insert("knowledge.saveKnowledge", parameArrayList);
        return insert;
    }

    @Override
    public Integer updateKnowledge(Object[] parameArrayList) throws BusinessException {
        int update = this.getDao().update("knowledge.updateKnowledge", parameArrayList);
        return update;
    }

    @Override
    public void deleteKnowledge(String id) {
        try {
            Map<String, Object> map = new HashMap<>();
            map.put("id", id);
            map.put("flag","0");
            BaseKnowledge cg = this.getDao().selectOne("knowledge.getKnowledgeAll", new Object[]{map});
            if (cg != null) {
                Map<String,Object> mapOne = new HashMap<String,Object>();
                mapOne.put("id", id);
                mapOne.put("flag", "1");
                this.getDao().update("knowledge.deleteKnowledge", new Object[]{mapOne});
            }
            map.clear();
            map.put("parentId", id);
            map.put("flag","0");
            List<BaseKnowledge> baseKnowledges = this.getDao().selectList("knowledge.getKnowledgeAll", new Object[]{map});
            if (baseKnowledges.size() > 0) {
                for (BaseKnowledge Knowledge : baseKnowledges) {
                    map.clear();
                    String knowledgeId = Knowledge.getId();
                    Map<String,Object> mapOne = new HashMap<String,Object>();
                    mapOne.put("id", knowledgeId);
                    mapOne.put("flag", "1");
                    this.getDao().update("knowledge.deleteKnowledge", new Object[]{mapOne});
                    deleteKnowledge(knowledgeId);
                }
            }
        } catch (Exception e) {
            throw new BusinessException(e.getMessage());
        }
    }

    @Override
    public Integer addKnowledge(Object[] parameArrayList) throws BusinessException {
        int insert = this.getDao().insert("knowledge.addKnowledge", parameArrayList);
        return insert;
    }

    @Override
    public String getSeq() throws BusinessException {
        String seq = this.getDao().getSeq("1", "t_base_knowledge", "id");
        return seq;
    }

    @Override
    public List<BaseKnowledge> getKnowledgeByCascade(String parentId, String deep,String phaseId, String subjectId) throws BusinessException {
        Map<String, Object> map = new HashMap<>();
        map.put("deep", deep);
        if (BaseUtils.isNotBlank(parentId)) {
            map.put("parentId", parentId);
        }
        map.put("phaseId",phaseId);
        map.put("subjectId",subjectId);
        List<BaseKnowledge> baseKnowledge = this.getDao().selectList("knowledge.getKnowledgeAll", new Object[]{map});
        return baseKnowledge;
    }

    @Override
    public BaseKnowledge getKnowledge(String id) throws BusinessException {
        Map<String,Object> map  = new HashMap<String,Object>();
        map.put("id",id);

        return this.getDao().selectOne("knowledge.getKnowledgeAll",new Object[]{map});
    }

    @Override
    public List<Category> getCategoryList(Map<String, Object> map) throws BusinessException {
        map.put("flag", "0");
        List<Category> categories = this.getDao().selectList("knowledge.getCategoriesBydeep", new Object[]{map});
        return categories;
    }

    @Override
    public List<BaseKnowledgeVo> getKnowledgesByCascade(String parentId, String deep) throws BusinessException {
        Map<String, Object> map = new HashMap<>();
        map.put("deep", deep);
        if (BaseUtils.isNotBlank(parentId)) {
            map.put("parentId", parentId);
        }
        List<BaseKnowledgeVo> baseKnowledgeVo = this.getDao().selectList("knowledge.getKnowledges", new Object[]{map});
        return baseKnowledgeVo;
    }

    @Override
    public List<BaseKnowledgeVo> getKnowledgesByIds(List<String> ids) throws BusinessException {
        Map<String, Object> map = new HashMap<>();
        map.put("ids", ids);
        List<BaseKnowledgeVo> baseKnowledgeVo = this.getDao().selectList("knowledge.getKnowledges", new Object[]{map});
        return baseKnowledgeVo;
    }



}
