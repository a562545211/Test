package com.jsrm.service.selectTopic;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.common.PageVO;
import com.jsrm.model.resourceInfo.ResourceInfo;
import com.jsrm.web.vo.approve.ApproveHistoryVo;
import org.springframework.transaction.annotation.Transactional;

import java.io.OutputStream;
import java.util.List;

/**
 * Created by jichao on 2016/10/17.
 * 选题发稿
 */
public interface SelectTopicService {

    /**
     * 根据条件查询选题发稿list
     * @param pageNo 当前页
     * @param pageSize 每页记录数
     * @param param 参数集合：审核状态、发稿日期：开始时间、发稿日期：结束时间、资源编号（选题编号）、资源名称
     * @return 分页的对象
     * @throws BusinessException
     */
    public PageVO<ResourceInfo> querySelectTopicListForPage(int pageNo, int pageSize, Object[] param) throws BusinessException;

    /**
     * 根据id搜索资源
     * @param param 参数集合：发稿主键
     * @return 发稿对象
     * @throws BusinessException
     */
    public ResourceInfo querySelectTopicById(Object[] param) throws BusinessException;

    /**
     * 保存发稿
     * @param param 参数集合：发稿对象
     * @return success：1，error：0
     * @throws BusinessException
     */
    @Transactional
    public Integer saveSelectTopic(Object[] param) throws BusinessException;

    /**
     * 修改发稿
     * @param param 参数集合：发稿对象
     * @return success：1，error：0
     * @throws BusinessException
     */
    @Transactional
    public Integer updateSelectTopic(Object[] param) throws BusinessException;

    /**
     * 选择选题编号
     * @param param 选题编号，选题名称
     * @return
     * @throws BusinessException
     */
    public List<ResourceInfo> selectSelectTopicList(Object[] param) throws BusinessException;

    public ResourceInfo selectSelectTopicById(Object[] param) throws BusinessException;

    public byte[] getExcelForDownload(ResourceInfo resourceInfo, List<ApproveHistoryVo> list) throws Exception;

}
