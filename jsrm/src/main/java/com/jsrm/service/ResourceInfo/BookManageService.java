package com.jsrm.service.ResourceInfo;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.common.PageVO;
import com.jsrm.base.service.BaseService;
import com.jsrm.model.catalog.Icategory;
import com.jsrm.model.resourceInfo.ResourceInfo;
import com.jsrm.web.vo.ResourceInfoVo.ElectronVo;
import com.jsrm.web.vo.ResourceInfoVo.ResourceInfoVo;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;


/**
 * 资源service
 * Created by wdCao on 2016/10/13.
 */
public interface BookManageService extends BaseService {

    /**
     * 资源查询列表
     * @param pageNo
     * @param pageSize
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public PageVO<ElectronVo> queryResourceList(int pageNo, int pageSize, Object[] parameArrayList) throws BusinessException;

    /**
     * 更新是否取消状态
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public Integer updateOutputState(Object[] parameArrayList) throws BusinessException;

    /**
     * 批量更新状态
     * @param parameArrayList
     * @return
     * @throws BusinessException
     */
    public Integer updateOutputStateByIds(Object[] parameArrayList) throws BusinessException;

    /**
     * 根据级别和code查询关系表list
     * @param level
     * @param code
     * @return
     * @throws BusinessException
     */
    List<Icategory> getIcategoriesByILevelAndCode(String level, String code) throws BusinessException;
}
