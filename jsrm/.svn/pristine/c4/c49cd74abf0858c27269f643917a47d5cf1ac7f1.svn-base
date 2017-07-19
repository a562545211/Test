package com.jsrm.service.resourceFileInfo.impl;

import com.jsrm.base.common.PageVO;
import com.jsrm.base.service.impl.BaseSupportServiceImpl;
import com.jsrm.service.resourceFileInfo.ResourceFileInfoService;
import com.jsrm.web.vo.resourceFileVo.ResourceFileInfoVo;
import org.springframework.stereotype.Service;

/**
 * Created by jichao on 2017/3/1.
 */
@Service
public class ResourceFileInfoServiceImpl extends BaseSupportServiceImpl implements ResourceFileInfoService {

    @Override
    public PageVO<ResourceFileInfoVo> selectListForPage(int pageNo, int pageSize, Object[] params) throws Exception {
        return this.getDao().pagedQuery("resourceFileInfo.selectListForPage", pageNo, pageSize, params);
    }
}
