package com.jsrm.service.resourceManage;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.common.PageVO;
import com.jsrm.model.resourceInfo.ResourceInfo;
import com.jsrm.web.vo.ResourceInfoVo.ResourceInfoVo;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by jichao on 2016/10/19.
 * 资源管理：上传工程文件，上传成品文件，回收站列表按条件查询
 * 实体类用共用resourceInfo
 * 文件上传，资源属性、知识点字段  暂未实现
 */
public interface ResourceManageService {

    /**
     * 保存工程文件信息
     * @param param 需要保存的实体类，resourceInfo对象
     * @return 成功：1，失败：0
     * @throws BusinessException
     */
    @Transactional
    public Integer saveProFileMessage(Object[] param) throws BusinessException;

    /**
     * 编辑工程文件信息
     * @param param
     * @return
     * @throws BusinessException
     */
    @Transactional
    public Integer updateProFileMessage(Object[] param) throws BusinessException;

    /**
     * 保存成品文件信息
     * @param param 需要保存的实体类，resourceInfo对象
     * @return 成功：1，失败：0
     * @throws BusinessException
     */
    @Transactional
    public Integer saveEndFileMessage(Object[] param) throws BusinessException;

    /**
     * 更新成品文件信息
     * @param param 需要保存的实体类，resourceInfoVo对象
     * @return 成功：1，失败：0
     * @throws BusinessException
     */
    @Transactional
    public Integer updateEndFileMessage(Object[] param) throws BusinessException;

    /**
     * 回收站列表按条件查询
     * @param pageNo 当前页
     * @param pageSize 每页记录数
     * @param param 参数集合：资源编号、资源名称、上传者、资源分类、资源属性、知识点、上传开始时间，上传结束时间、状态
     * @return
     * @throws BusinessException
     */
    public PageVO<ResourceInfo> selectResourceManageListForPageAsRecycle(int pageNo, int pageSize, Object[] param) throws BusinessException;

    /**
     * 根据id搜索资源的详细信息
     * @param param 资源id
     * @return 资源对象
     * @throws BusinessException
     */
    public ResourceInfo selectResourceManageById(Object[] param) throws BusinessException;

    /**
     * 回收站上架
     * @param param 资源id
     * @return 成功：1，失败：0
     * @throws BusinessException
     */
    @Transactional
    public Integer onShelvesById(Object[] param) throws BusinessException;

}
