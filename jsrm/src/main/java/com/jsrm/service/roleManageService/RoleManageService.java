package com.jsrm.service.roleManageService;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.common.PageVO;
import com.jsrm.base.service.BaseService;
import com.jsrm.model.role.Role;
import com.jsrm.model.role.RoleItem;
import com.jsrm.model.role.RoleOperate;
import com.jsrm.web.vo.item.ItemVo;
import com.jsrm.web.vo.sysAuthority.Item_Operate_Tree;
import com.jsrm.web.vo.sysAuthority.Oper_Type;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by xiongxiao on 2016/10/20.
 */
public interface RoleManageService extends BaseService {
	public List<Oper_Type> queryOperationList(Object[] parameArrayList);
	public List<ItemVo> queryItemList(Object[] parameArrayList);
	public List<ItemVo> queryItem2List(Object[] parameArrayList);
	public PageVO queryRole(Object[] parameArrayList,int pageNo,int pageSize) ;
	public Map<String ,Object>  getTreeList(Object[] parameArrayList);

	/**
	 * 获取角色信息
	 * @param parameArrayList
	 * @return
     */
	public List<Role> queryRole(Object[] parameArrayList);

	/**
	 * 获取角色菜单
	 * @param parameArrayList
     * @return
     */
	public List<RoleItem> getItemRoleToUpdate(Object[] parameArrayList);

	/**
	 * 获取角色操作
	 * @param parameArrayList
     * @return
     */
	public List<RoleOperate> getOperateRoleToUpdate(Object[] parameArrayList);

	/**
	 * 新增角色菜单关系
	 * @param parameArrayList
	 * @return
	 * @throws BusinessException
     */
	@Transactional
	public Integer saveRoleItem (Object[] parameArrayList) throws BusinessException;

	/**
	 * 新增角色操作关系
	 * @param parameArrayList
	 * @return
	 * @throws BusinessException
     */
	@Transactional
	public Integer saveRoleOperate (Object[] parameArrayList) throws BusinessException;

	/**
	 * 新增角色
	 * @param parameArrayList
	 * @return
	 * @throws BusinessException
     */
	@Transactional
	public Integer saveRole (Object[] parameArrayList) throws BusinessException;

	/**
	 * 修改角色
	 * @param parameArrayList
	 * @return
	 * @throws BusinessException
     */
	@Transactional
	public Integer updateRole (Object[] parameArrayList) throws BusinessException;

	/**
	 * 删除角色菜单
	 * @param parameArrayList
	 * @return
	 * @throws BusinessException
     */
	public Integer delRoleItem (Object[] parameArrayList) throws BusinessException;

	/**
	 *删除角色操作
	 * @param parameArrayList
	 * @return
	 * @throws BusinessException
     */
	public Integer delRoleOperate (Object[] parameArrayList) throws BusinessException;
	
	public Integer delRole (Object[] parameArrayList) throws BusinessException;

	/**
	 * 查询登录人角色
	 * @param parameArrayList
	 * @return
	 * @throws BusinessException
     */
	public List<Role> queryRoleOne(Object[] parameArrayList) throws BusinessException;



}
