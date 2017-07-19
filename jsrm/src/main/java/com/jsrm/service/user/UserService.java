package com.jsrm.service.user;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.common.PageVO;
import com.jsrm.base.service.BaseService;
import com.jsrm.model.resourceInfo.ResourceInfo;
import com.jsrm.model.user.User;

import java.util.List;
import java.util.Map;


/**
 * 用户service
 * Created by wdCao on 2016/10/17.
 */
public interface UserService extends BaseService {

    /**
     *获取登录用户信息
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public List<User> getLogin(Object[] parameArrayList) throws BusinessException;




}
