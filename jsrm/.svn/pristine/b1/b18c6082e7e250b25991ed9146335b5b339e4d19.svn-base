package com.jsrm.service.example;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.service.BaseService;
import com.jsrm.model.example.Demo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by Administrator on 2016/10/11.
 */
public interface DemoService extends BaseService{
    @Transactional
    public void save(final Demo obj) throws BusinessException;

    public List<Demo> list() throws BusinessException;
}
