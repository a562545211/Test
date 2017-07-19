package com.jsrm.service.sysdict.impl;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.service.impl.BaseSupportServiceImpl;
import com.jsrm.base.utils.BaseUtils;
import com.jsrm.model.sysdict.SysDict;
import com.jsrm.service.sysdict.SysdictService;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by wdCao on 2016/11/2.
 */
@Service
public class SysdictServiceImpl extends BaseSupportServiceImpl implements SysdictService {

    @Override
    public List<SysDict> querySysdict(SysDict sysDict) throws BusinessException {
        Map<String, Object> data = new HashMap<String, Object>();
        BaseUtils.copyMap(data, sysDict);

        return this.getDao().selectList("sysdict.selectDictByCode", new Object[]{data});
    }
}
