package com.jsrm.service.fileUpload.impl;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.service.impl.BaseSupportServiceImpl;
import com.jsrm.base.utils.BaseUtils;
import com.jsrm.model.fileUpload.FileInfo;
import com.jsrm.service.fileUpload.FileUploadService;
import com.jsrm.web.vo.fileUpload.FileInfoVo;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * 文件service
 * Created by wdCao on 2016/10/19.
 */
@Service
public class FileUploadServiceImpl extends BaseSupportServiceImpl implements FileUploadService  {

    @Override
    public void addFileUpload(FileInfoVo fileInfoVo) throws BusinessException {
        Map<String, Object> data = new HashMap<String, Object>();
        BaseUtils.copyMap(data, fileInfoVo);

        this.getDao().insert("fileUpload.addFile", new Object[]{data});
    }

    @Override
    public void updateFileUpload(FileInfoVo fileInfoVo) throws BusinessException {
        Map<String, Object> data = new HashMap<String, Object>();
        BaseUtils.copyMap(data, fileInfoVo);

        this.getDao().update("fileUpload.updateFile", new Object[]{data});
    }

    @Override
    public FileInfo getFileInfo(FileInfoVo fileInfoVo) throws BusinessException {
        Map<String, Object> data = new HashMap<String, Object>();
        BaseUtils.copyMap(data, fileInfoVo);

        return this.getDao().selectOne("fileUpload.selectOneFileInfo", new Object[]{data});
    }
}
