package com.jsrm.service.user.impl;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.common.PageVO;
import com.jsrm.base.service.impl.BaseSupportServiceImpl;
import com.jsrm.model.role.Role;
import com.jsrm.model.sysdict.SysDict;
import com.jsrm.model.system.UserDataAuthority;
import com.jsrm.model.user.User;
import com.jsrm.service.user.UserManagerService;
import com.jsrm.service.user.UserService;
import com.jsrm.web.vo.user.UserVo;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 用户service实现
 * Created by wdCao on 2016/10/17.
 */
@Service
public class UserManagerServiceImpl extends BaseSupportServiceImpl implements UserManagerService {


    @Override
    public PageVO<UserVo> selectUserListForPage(int pageNo, int pageSize, Object[] param) throws BusinessException {
        return this.getDao().pagedQuery("userManager.selectUserListForPage", pageNo, pageSize, param);
    }

    @Override
    public List<UserVo> selectUserOne(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectList("userManager.selectUserOne",parameArrayList);
    }

    @Override
    public List<UserVo> selectUserByLoginName(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectList("userManager.selectUserByLoginName",parameArrayList);
    }

    @Override
    public List<UserVo> selectUserByLoginNameAndId(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectList("userManager.selectUserByLoginNameAndId",parameArrayList);
    }

    @Override
    public List<UserDataAuthority> queryUserDataAuthority(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectList("userManager.queryUserDataAuthority",parameArrayList);
    }

    @Override
    public List<UserDataAuthority> queryUserDataAuthorityByPhaseId(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectList("userManager.queryUserDataAuthorityByPhaseId",parameArrayList);
    }

    @Override
    public List<Role> queryRole(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectList("userManager.queryRole",parameArrayList);
    }

    @Override
    public List<SysDict> queryDict(Object[] parameArrayList) throws BusinessException {
        return this.getDao().selectList("userManager.queryDict",parameArrayList);
    }

    @Override
    public Integer saveUserManager(Object[] parameArrayList) throws BusinessException {
        int insert = this.getDao().insert("userManager.saveUserManager", parameArrayList);
        return insert;
    }

    @Override
    public Integer saveUserRole(Object[] parameArrayList) throws BusinessException {
        int insert = this.getDao().insert("userManager.saveUserRole", parameArrayList);
        return insert;
    }

    @Override
    public Integer saveUserDataAuthority(Object[] parameArrayList) throws BusinessException {
        int insert = this.getDao().insert("userManager.saveUserDataAuthority", parameArrayList);
        return insert;
    }

    @Override
    public Integer updateUser(Object[] parameArrayList) throws BusinessException {
        int update = this.getDao().update("userManager.updateUser", parameArrayList);
        return update;
    }

    @Override
    public Integer updateUserRole(Object[] parameArrayList) throws BusinessException {
        int update = this.getDao().update("userManager.updateUserRole", parameArrayList);
        return update;
    }

    @Override
    public Integer resetPassword(Object[] parameArrayList) throws BusinessException {
        int update = this.getDao().update("userManager.resetPassword", parameArrayList);
        return update;
    }

    @Override
    public Integer modifyPass(Object[] parameArrayList) throws BusinessException {
        int update = this.getDao().update("userManager.modifyPass", parameArrayList);
        return update;
    }

    @Override
    public Integer deleteUser(Object[] parameArrayList) throws BusinessException {
        int update = this.getDao().update("userManager.deleteUser", parameArrayList);
        return update;
    }

    @Override
    public Integer delUserByIds(Object[] parameArrayList) throws BusinessException {
        int update = this.getDao().update("userManager.delUserByIds", parameArrayList);
        return update;
    }

    @Override
    public Integer resetPasswordByids(Object[] parameArrayList) throws BusinessException {
        int update = this.getDao().update("userManager.resetPasswordByids", parameArrayList);
        return update;
    }

    @Override
    public Integer delUserDataAuthority(Object[] parameArrayList) throws BusinessException {
        int delete = this.getDao().delete("userManager.delUserDataAuthority", parameArrayList);
        return delete;
    }

    @Override
    public Integer updateUserDataAuthority(Object[] parameArrayList) throws BusinessException {
        int update = this.getDao().delete("userManager.updateUserDataAuthority", parameArrayList);
        return update;
    }
}
