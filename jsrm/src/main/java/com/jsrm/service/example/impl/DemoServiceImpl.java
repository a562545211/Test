package com.jsrm.service.example.impl;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.service.impl.BaseSupportServiceImpl;
import com.jsrm.base.utils.BaseUtils;
import com.jsrm.model.example.Demo;
import com.jsrm.service.example.DemoService;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by wdCao on 2016/10/11.
 */
@Service
public class DemoServiceImpl extends BaseSupportServiceImpl implements DemoService {

    @Override
    public void save(Demo obj) throws BusinessException {
        try{
            Map<String,Object> bean=new HashMap<String,Object>();
            BaseUtils.copyMap(bean, obj);
            this.getDao().insertJDBC("demo", bean);
        }catch(SQLException ex){
            throw new BusinessException(ex.getMessage());
        }
    }

    @Override
    public List<Demo> list() throws BusinessException {
        return this.getDao().selectList("demo.selectAll", new Object[]{});
    }
}
