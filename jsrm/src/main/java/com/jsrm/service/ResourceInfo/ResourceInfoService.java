package com.jsrm.service.ResourceInfo;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.common.PageVO;
import com.jsrm.base.service.BaseService;
import com.jsrm.model.resourceInfo.ResourceInfo;
import com.jsrm.web.vo.ResourceInfoVo.ResourceInfoVo;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;


/**
 * 资源service
 * Created by wdCao on 2016/10/13.
 */
public interface ResourceInfoService extends BaseService {

    /**
     * 资源查询列表
     * @param pageNo
     * @param pageSize
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public PageVO<ResourceInfo> queryResourceList(int pageNo, int pageSize, Object[] parameArrayList) throws BusinessException;

    /**
     * 全部资源查询列表
     * @param pageNo
     * @param pageSize
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public PageVO<ResourceInfo> queryAllResourceList(int pageNo, int pageSize, Object[] parameArrayList) throws BusinessException;/**

    /** 全部资源查询列表
     * @return
     * @throws BusinessException
     */
    public List<ResourceInfo> getNewResourceList(Map<String, Object> map) throws BusinessException;

    /**
     * 查询资源列表
     * @param pageNo
     * @param pageSize
     * @param resourceInfoVo
     * @return
     * @throws BusinessException
     */
    public PageVO<ResourceInfo> queryAllResourceList(int pageNo, int pageSize, ResourceInfoVo resourceInfoVo) throws BusinessException;

    /**
     * 根据id获取资源信息
     * @return
     * @throws BusinessException
     */
    public ResourceInfo queryResourceInfoById(ResourceInfoVo resourceInfoVo) throws BusinessException;

    public ResourceInfoVo queryResourceInfoById2(ResourceInfoVo resourceInfoVo) throws BusinessException;

    /**
     * 新增资源信息
     * @param resourceInfoVo
     * @throws BusinessException
     */
    @Transactional
    public void saveResourceInfo(ResourceInfoVo resourceInfoVo) throws BusinessException;

    /**
     * 更新资源信息
     * @param resourceInfoVo
     * @throws BusinessException
     */
    @Transactional
    public void updateResourceInfo(ResourceInfoVo resourceInfoVo) throws BusinessException;

    /**
     * 删除操作
     * @param resourceInfoVo
     * @throws BusinessException
     */
    @Transactional
    public void deleteResources(ResourceInfoVo resourceInfoVo) throws BusinessException;

    /**
     * 保存中间表
     * @param busiId 业务id
     * @param tCategoriesIds 目录id带逗号的字符串,自己拆了
     * @return
     * @throws Exception
     */
    @Transactional
    public Integer saveResourceMidCategories(String busiId, String tCategoriesIds) throws BusinessException;

    /**
     * 删除中间表
     * @param busiId 业务id
     * @return
     * @throws Exception
     */
    @Transactional
    public Integer deleteResourceMidCategories(String busiId) throws BusinessException;

    /**
     * 下载
     * @param response
     * @param id
     * @return
     * @throws Exception
     */
    public void download(HttpServletRequest request, HttpServletResponse response, String id) throws Exception;

    public List<ResourceInfo> selectOldResourceInfo() throws Exception;

    public List<ResourceInfoVo> selectResourceInfoVo() throws Exception;

    public List<ResourceInfo> selectStorage() throws Exception;

}
