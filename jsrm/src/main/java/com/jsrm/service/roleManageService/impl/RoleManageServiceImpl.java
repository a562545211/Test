package com.jsrm.service.roleManageService.impl;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.common.PageVO;
import com.jsrm.base.service.impl.BaseSupportServiceImpl;
import com.jsrm.model.role.RoleItem;
import com.jsrm.model.role.RoleOperate;
import org.springframework.stereotype.Service;

import com.jsrm.model.role.Role;
import com.jsrm.service.roleManageService.RoleManageService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jsrm.web.vo.item.ItemVo;
import com.jsrm.web.vo.sysAuthority.Item_Operate_Tree;
import com.jsrm.web.vo.sysAuthority.Oper_Type;
/**
 * Created by hero on 2016/10/21.
 */
@Service
public class RoleManageServiceImpl  extends BaseSupportServiceImpl implements RoleManageService {

	@Override
	public List<Oper_Type> queryOperationList(Object[] parameArrayList) {
		// TODO Auto-generated method stub
        return this.getDao().selectList("authority.getOperateByType",parameArrayList);
	}

	@Override
	public List<ItemVo> queryItemList(Object[] parameArrayList) {
		// TODO Auto-generated method stub
        return this.getDao().selectList("authority.getItem",parameArrayList);
	}

	@Override
	public List<ItemVo> queryItem2List(Object[] parameArrayList) {
		// TODO Auto-generated method stub
        return this.getDao().selectList("authority.getItem2",parameArrayList);
	}

	@Override
	public PageVO queryRole(Object[] parameArrayList,int pageNo,int pageSize) {
		// TODO Auto-generated method stub
		 return this.getDao().pagedQuery("authority.queryRole", pageNo, pageSize, parameArrayList);
	}

	@Override
	public Map<String ,Object>  getTreeList(Object[] parameArrayList) {
		// TODO Auto-generated method stub
        return this.getDao().selectOne("authority.getTreeList",parameArrayList);
	}

	@Override
	public List<Role> queryRole(Object[] parameArrayList) {
		return this.getDao().selectList("authority.queryRole",parameArrayList);
	}

	@Override
	public List<RoleItem> getItemRoleToUpdate(Object[] parameArrayList) {
		return this.getDao().selectList("authority.getItemRoleToUpdate",parameArrayList);
	}

	@Override
	public List<RoleOperate> getOperateRoleToUpdate(Object[] parameArrayList) {
		return this.getDao().selectList("authority.getOperateRoleToUpdate",parameArrayList);
	}

	@Override
	public Integer saveRoleItem(Object[] parameArrayList) throws BusinessException {
		int insert = this.getDao().insert("authority.saveRoleItem", parameArrayList);
		return insert;
	}

	@Override
	public Integer saveRoleOperate(Object[] parameArrayList) throws BusinessException {
		int insert = this.getDao().insert("authority.saveRoleOperate", parameArrayList);
		return insert;
	}

	@Override
	public Integer saveRole(Object[] parameArrayList) throws BusinessException {
		int insert = this.getDao().insert("authority.saveRole", parameArrayList);
		return insert;
	}

	@Override
	public Integer updateRole(Object[] parameArrayList) throws BusinessException {
		int update = this.getDao().update("authority.updateRole", parameArrayList);
		return update;
	}

	@Override
	public Integer delRoleItem(Object[] parameArrayList) throws BusinessException {
		int del = this.getDao().delete("authority.delRoleItem", parameArrayList);
		return del;
	}

	@Override
	public Integer delRoleOperate(Object[] parameArrayList) throws BusinessException {
		int del = this.getDao().delete("authority.delRoleOperate", parameArrayList);
		return del;
	}

	@Override
	public Integer delRole(Object[] parameArrayList) throws BusinessException {
		// TODO Auto-generated method stub
		int del = this.getDao().delete("authority.updateRoleByIds", parameArrayList);
		return del;
	}

	@Override
	public List<Role> queryRoleOne(Object[] parameArrayList) throws BusinessException {
		return this.getDao().selectList("authority.queryRoleOne",parameArrayList);
	}


}
