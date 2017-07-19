package com.jsrm.service.resourceManage.impl;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.common.PageVO;
import com.jsrm.base.service.impl.BaseSupportServiceImpl;
import com.jsrm.base.utils.BaseUtils;
import com.jsrm.model.resourceInfo.ResourceInfo;
import com.jsrm.service.resourceManage.ResourceManageService;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by jichao on 2016/10/19.
 */
@Service
public class ResourceManageServiceImpl extends BaseSupportServiceImpl implements ResourceManageService {
    @Override
    public Integer saveProFileMessage(Object[] param) throws BusinessException {
        return this.getDao().insert("resourceManage.saveFileMessage", param);
    }

    @Override
    public Integer updateProFileMessage(Object[] param) throws BusinessException {
        return this.getDao().update("resourceManage.updateProFileMessage", param);
    }

    @Override
    public Integer saveEndFileMessage(Object[] param) throws BusinessException {
        return this.getDao().insert("resourceManage.saveFileMessage", param);
    }

    @Override
    public Integer updateEndFileMessage(Object[] param) throws BusinessException {
        return this.getDao().update("resourceManage.updateProFileMessage", param);
    }

    @Override
    public PageVO<ResourceInfo> selectResourceManageListForPageAsRecycle(int pageNo, int pageSize, Object[] param) throws BusinessException {
        return this.getDao().pagedQuery("resourceManage.selectResourceManageListForPageAsRecycle", pageNo, pageSize, param);
    }

    @Override
    public ResourceInfo selectResourceManageById(Object[] param) throws BusinessException {
        return this.getDao().selectOne("resourceManage.selectResourceManageById", param);
    }

    @Override
    public Integer onShelvesById(Object[] param) throws BusinessException {
        return this.getDao().update("resourceManage.onShelvesById", param);
    }
}
