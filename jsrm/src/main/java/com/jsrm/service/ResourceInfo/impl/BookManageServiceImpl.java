package com.jsrm.service.ResourceInfo.impl;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.common.PageVO;
import com.jsrm.base.service.impl.BaseSupportServiceImpl;
import com.jsrm.base.utils.BaseUtils;
import com.jsrm.base.utils.UUIDUtils;
import com.jsrm.model.catalog.Icategory;
import com.jsrm.model.resourceInfo.ResourceInfo;
import com.jsrm.model.resourceInfo.ResourceMidCategories;
import com.jsrm.service.ResourceInfo.BookManageService;
import com.jsrm.service.ResourceInfo.ResourceInfoService;
import com.jsrm.web.vo.ResourceInfoVo.ElectronVo;
import com.jsrm.web.vo.ResourceInfoVo.ResourceInfoVo;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 资源service实现
 * Created by wdCao on 2016/10/13.
 */
@Service
public class BookManageServiceImpl extends BaseSupportServiceImpl implements BookManageService {

    @Override
    public PageVO<ElectronVo> queryResourceList(int pageNo, int pageSize, Object[] parameArrayList) throws BusinessException {
        return this.getDao().pagedQuery("bookManage.selectAllRes", pageNo, pageSize,parameArrayList);
    }

    @Override
    public Integer updateOutputState(Object[] parameArrayList) throws BusinessException {
        int update = this.getDao().update("bookManage.updateOutputState", parameArrayList);
        return update;
    }

    @Override
    public Integer updateOutputStateByIds(Object[] parameArrayList) throws BusinessException {
        int update = this.getDao().update("bookManage.updateOutputStateByIds", parameArrayList);
        return update;
    }

    @Override
    public List<Icategory> getIcategoriesByILevelAndCode(String level, String code) throws BusinessException {
        Map<String, Object> map = new HashMap<>();
        map.put("iLevel", level);
        map.put("iCode", code);
        return this.getDao().selectList("bookManage.getCategoryRelations", new Object[]{map});
    }

}
