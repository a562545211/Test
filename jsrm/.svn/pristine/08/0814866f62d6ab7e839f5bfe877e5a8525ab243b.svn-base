package com.jsrm.service.user;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.common.PageVO;
import com.jsrm.base.service.BaseService;
import com.jsrm.model.resourceCode.ResourceCode;
import com.jsrm.model.role.Role;
import com.jsrm.model.sysdict.SysDict;
import com.jsrm.model.system.UserDataAuthority;
import com.jsrm.model.user.User;
import com.jsrm.web.vo.catalog.BaseKnowledgeVo;
import com.jsrm.web.vo.user.UserVo;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


/**
 * 用户service
 * Created by liguoxiang on 2016/10/31.
 */
public interface UserManagerService extends BaseService {

    /**
     * 分页查询用户信息
     * @param pageNo 当前页
     * @param pageSize 每页记录数
     * @param param 参数集合：选题编号，资源名称，创建时间间隔——开始时间and结束时间
     * @return 分页对象——资源编号对象集合
     * @throws BusinessException
     */
    public PageVO<UserVo> selectUserListForPage(int pageNo, int pageSize, Object[] param) throws BusinessException;

    /**
     * 用户ID查询用户信息
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public List<UserVo> selectUserOne(Object[] parameArrayList) throws BusinessException;

    /**
     *查询重复用户名
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public List<UserVo> selectUserByLoginName(Object[] parameArrayList) throws BusinessException;

    /**
     *查询重复用户名By ID
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public List<UserVo> selectUserByLoginNameAndId(Object[] parameArrayList) throws BusinessException;

    /**
     * 用户ID查询数据权限
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public List<UserDataAuthority> queryUserDataAuthority(Object[] parameArrayList) throws BusinessException;

    /**
     *
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public List<UserDataAuthority> queryUserDataAuthorityByPhaseId(Object[] parameArrayList) throws BusinessException;

    /**
     * 角色List
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public List<Role> queryRole(Object[] parameArrayList) throws BusinessException;

    /**
     * 审核角色List
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public List<SysDict> queryDict(Object[] parameArrayList) throws BusinessException;

    /**
     * 新增用户
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    @Transactional
    public Integer saveUserManager (Object[] parameArrayList) throws BusinessException;

    /**
     * 新增用户角色
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    @Transactional
    public Integer saveUserRole (Object[] parameArrayList) throws BusinessException;

    /**
     * 新增数据权限
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public Integer saveUserDataAuthority (Object[] parameArrayList) throws BusinessException;

    /**
     * 修改用户
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    @Transactional
    public Integer updateUser (Object[] parameArrayList) throws BusinessException;

    /**
     * 修改用户角色
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    @Transactional
    public Integer updateUserRole (Object[] parameArrayList) throws BusinessException;

    /**
     * 重置密码
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    @Transactional
    public Integer resetPassword (Object[] parameArrayList) throws BusinessException;

    /**
     * 修改密码
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public Integer modifyPass (Object[] parameArrayList) throws BusinessException;

    /**
     * 删除用户
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    @Transactional
    public Integer deleteUser (Object[] parameArrayList) throws BusinessException;

    /**
     * 批量删除
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    @Transactional
    public Integer delUserByIds (Object[] parameArrayList) throws BusinessException;

    /**
     * 批量重置密码
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    @Transactional
    public Integer resetPasswordByids (Object[] parameArrayList) throws BusinessException;

    /**
     * 删除用户数据权限
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    @Transactional
    public Integer delUserDataAuthority (Object[] parameArrayList) throws BusinessException;

    /**
     * 修改用户关联学科学段名称
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public Integer updateUserDataAuthority (Object[] parameArrayList) throws BusinessException;




}
