package com.jsrm.service.resourceCode.impl;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.common.PageVO;
import com.jsrm.base.service.impl.BaseSupportServiceImpl;
import com.jsrm.model.resourceCode.ResourceCode;
import com.jsrm.service.ResourceInfo.ResourceInfoService;
import com.jsrm.service.resourceCode.ResourceCodeService;
import com.jsrm.web.vo.resourceCodeVo.ResourceCodeVo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by jichao on 2016/10/25.
 */
@Service
public class ResourceCodeServiceImpl extends BaseSupportServiceImpl implements ResourceCodeService {

    @Resource
    private ResourceInfoService resourceInfoService;

    @Override
    public PageVO<ResourceCode> selectResourceCodeListForPage(int pageNo, int pageSize, Object[] param) throws BusinessException {
        return this.getDao().pagedQuery("resourceCode.selectResourceCodeListForPage", pageNo, pageSize, param);
    }

    @Override
    public ResourceCode selectResourceCodeById(Object[] param) throws BusinessException {
        return this.getDao().selectOne("resourceCode.selectResourceCodeById", param);
    }

    @Override
    public Integer saveResourceCode(Object[] param) throws BusinessException {
        Integer integer = 0, insert = 0;
        ResourceCodeVo resourceCodeVo = (ResourceCodeVo) param[0];
        String busiId = resourceCodeVo.getId();
        String tCategoriesIds = resourceCodeVo.getCategoresCode();
        insert = resourceInfoService.saveResourceMidCategories(busiId, tCategoriesIds);
        //if(insert > 0){
            integer = this.getDao().insert("resourceCode.saveResourceCode", param);
        //}
        return integer;
    }

    @Override
    public Integer updateResourceCode(Object[] param) throws BusinessException {
        Integer delete = 0, integer = 0, insert = 0;
        ResourceCodeVo resourceCodeVo = (ResourceCodeVo) param[0];
        String busiId = resourceCodeVo.getId();
        String tCategoriesIds = resourceCodeVo.getCategoresCode();
        delete = resourceInfoService.deleteResourceMidCategories(busiId);
        //if(delete > 0){
            insert = resourceInfoService.saveResourceMidCategories(busiId, tCategoriesIds);
            //if(insert > 0){
                integer = this.getDao().update("resourceCode.updateResourceCode", param);
            //}
        //}
        return integer;
    }

    @Override
    public String getCode() throws BusinessException {
        return this.getDao().selectOne("resourceCode.getCode", null);
    }

    @Override
    public List<ResourceCode> selectResourceCodeList(Object[] param) throws BusinessException {
        return this.getDao().selectList("resourceCode.selectResourceCodeList", param);
    }

    @Override
    public String selectCategoresCodeByCode(Object[] param) throws BusinessException {
        return this.getDao().selectOne("resourceCode.selectCategoresCodeByCode", param);
    }

    @Override
    public Integer checkSelectUsed(String code, String id) throws BusinessException {
        code = code + "G000";
        Map<String, Object> params = new HashMap<>();
        params.put("code", code);
        params.put("id", id);
        return this.getDao().selectCount("resourceCode.checkSelectUsed", new Object[]{params});
    }

    @Override
    public List<ResourceCode> selectRepeatResourceName(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectList("resourceCode.selectRepeatResourceName", parameArrayList);
    }
}
