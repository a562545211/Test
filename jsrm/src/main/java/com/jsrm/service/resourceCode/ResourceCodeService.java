package com.jsrm.service.resourceCode;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.common.PageVO;
import com.jsrm.model.resourceCode.ResourceCode;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by jichao on 2016/10/25.
 * 编目管理——编号管理
 */
public interface ResourceCodeService {

    /**
     * 分页查询资源编号
     * @param pageNo 当前页
     * @param pageSize 每页记录数
     * @param param 参数集合：选题编号，资源名称，创建时间间隔——开始时间and结束时间
     * @return 分页对象——资源编号对象集合
     * @throws BusinessException
     */
    public PageVO<ResourceCode> selectResourceCodeListForPage(int pageNo, int pageSize, Object[] param) throws BusinessException;

    /**
     * 根据id查询资源编号
     * @param param id
     * @return 资源编号对象
     * @throws BusinessException
     */
    public ResourceCode selectResourceCodeById(Object[] param) throws BusinessException;

    /**
     * 保存资源编号
     * @param param 资源编号对象
     * @return 成功：1，失败：0
     * @throws BusinessException
     */
    @Transactional
    public Integer saveResourceCode(Object[] param) throws BusinessException;

    /**
     * 修改资源编号
     * @param param 资源编号对象
     * @return 成功：1，失败：0
     * @throws BusinessException
     */
    @Transactional
    public Integer updateResourceCode(Object[] param) throws BusinessException;

    /**
     * 得到最新的code值，当前数据库最大值+1，不能重复
     * @return code的值，000000001开始递增
     * @throws BusinessException
     */
    public String getCode() throws BusinessException;

    public List<ResourceCode> selectResourceCodeList(Object[] param) throws BusinessException;

    /**
     * 根据资源编号查询关联目录id
     * @param param
     * @return
     */
    public String selectCategoresCodeByCode(Object[] param) throws BusinessException;

    public Integer checkSelectUsed(String code, String id) throws BusinessException;

    /**
     * 查询重复资源名称
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public List<ResourceCode> selectRepeatResourceName(Object[] parameArrayList) throws BusinessException;

}
