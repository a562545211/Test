package com.jsrm.service.fileUpload;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.service.BaseService;
import com.jsrm.model.fileUpload.FileInfo;
import com.jsrm.web.vo.fileUpload.FileInfoVo;
import org.springframework.transaction.annotation.Transactional;

/**
 * 附件上传接口
 * Created by wdCao on 2016/10/19.
 */
public interface FileUploadService extends BaseService {

    /**
     * 上传附件
     * @param fileInfoVo
     * @throws BusinessException
     */
    @Transactional
    public void addFileUpload(FileInfoVo fileInfoVo) throws BusinessException;

    /**
     * 更新上传文件内容
     * @param fileInfoVo
     * @throws BusinessException
     */
    public void updateFileUpload(FileInfoVo fileInfoVo) throws BusinessException;

    /**
     * 获取上传文件信息
     * @param fileInfoVo
     * @return
     * @throws BusinessException
     */
    public FileInfo getFileInfo(FileInfoVo fileInfoVo) throws BusinessException;

}
