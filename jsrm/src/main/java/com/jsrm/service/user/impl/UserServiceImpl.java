package com.jsrm.service.user.impl;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.common.PageVO;
import com.jsrm.base.service.impl.BaseSupportServiceImpl;
import com.jsrm.model.resourceInfo.ResourceInfo;
import com.jsrm.model.user.User;
import com.jsrm.service.ResourceInfo.ResourceInfoService;
import com.jsrm.service.user.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * 用户service实现
 * Created by wdCao on 2016/10/17.
 */
@Service
public class UserServiceImpl extends BaseSupportServiceImpl implements UserService {

    @Override
    public List<User> getLogin(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectList("user.getLogin",parameArrayList);
    }

}
