package com.jsrm.service.resourceFile.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jsrm.base.utils.BaseUtils;
import org.springframework.stereotype.Service;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.service.impl.BaseSupportServiceImpl;
import com.jsrm.model.resourceFile.ResourceFile;
import com.jsrm.service.resourceCode.ResourceCodeService;
import com.jsrm.service.resourceFile.ResourceFileService;
import com.jsrm.web.vo.resourceCodeVo.ResourceCodeVo;

/**
 * <p>Title: ResourceFileServiceImpl</p>
 * <p>Description: </p>
 * <p>Company: </p> 
 * @author laijindan
 * @date 2016-12-20 上午10:47:42
 */
@Service
public class ResourceFileServiceImpl extends BaseSupportServiceImpl implements ResourceFileService {
	
	@Override
    public Integer saveResourceFile(Object[] param)  throws BusinessException {
        Integer integer = 0;
            integer = this.getDao().insert("resourceFile.saveResourceFile", param);
        return integer;
    }

	@Override
	public Integer updateResourceFile(Object[] param) throws BusinessException {
		Integer integer = 0;
			integer = this.getDao().update("resourceFile.updateResourceFile", param);
		return integer;
	}

	@Override
	public List<ResourceFile> selectResourceFile(Object[] param)
			throws BusinessException {
		List<ResourceFile> resourceFileList = this.getDao().selectList("resourceFile.selectResourceFile", param);
		return resourceFileList;
	}

	@Override
	public Integer updateTFileCycorePath(Object[] param)
			throws BusinessException {
		Integer integer = 0;
		integer = this.getDao().update("resourceFile.updateTFileCycorePath", param);
		return integer;
	}

	@Override
	public Integer deleteResourceFile(String tResourceId) throws Exception {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("tResourceId", tResourceId);
		return this.getDao().update("resourceFile.deleteResourceFile", new Object[]{param});
	}

	@Override
	public List<ResourceFile> selectStorage() throws Exception {
		return this.getDao().selectList("resourceFile.selectStorage", null);
	}

	@Override
	public Integer updateResourceFilePath(ResourceFile resourceFile) throws Exception {
		Map<String, Object> param = new HashMap<String, Object>();
		BaseUtils.copyMap(param, resourceFile);
		return this.getDao().update("resourceFile.updateResourceFilePath", new Object[]{param});
	}

}
