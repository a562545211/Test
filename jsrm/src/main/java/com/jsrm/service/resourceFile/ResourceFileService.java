package com.jsrm.service.resourceFile;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.jsrm.base.common.BusinessException;
import com.jsrm.model.resourceFile.ResourceFile;

/**
 * <p>Title: ResourceFileService</p>
 * <p>Description: </p>
 * <p>Company: </p> 
 * @author laijindan
 * @date 2016-12-20 上午10:47:25
 */
public interface ResourceFileService {

	/**
	 * @Title: saveResourceFile 
	 * @Description: 插入文件内容 
	 * @param @param param
	 * @param @return
	 * @param @throws BusinessException   
	 * @return 成功：1，失败：0  
	 * @throws
	 * @author laijindan
	 * @date 2016-12-20
	 */
	@Transactional
    public Integer saveResourceFile(Object[] param) throws BusinessException;
	
	/**
	 * @Title: updateResourceCode 
	 * @Description: 更新路径
	 * @param @param param
	 * @param @return
	 * @param @throws BusinessException   
	 * @return Integer  
	 * @throws
	 * @author laijindan
	 * @date 2016-12-20
	 */
	@Transactional
    public Integer updateResourceFile(Object[] param) throws BusinessException;
	
	/**
	 * @Title: selectResourceFile 
	 * @Description: 通过资源Id获取资源列表
	 * @param @param param
	 * @param @return
	 * @param @throws BusinessException   
	 * @return List<ResourceFile>  
	 * @throws
	 * @author laijindan
	 * @date 2016-12-21
	 */
	@Transactional
    public List<ResourceFile> selectResourceFile(Object[] param) throws BusinessException;
	
	/**
	 * @Title: updateTFileCycorePath 
	 * @Description: 更新TFile表Cycore路径
	 * @param @param param
	 * @param @return
	 * @param @throws BusinessException   
	 * @return Integer  
	 * @throws
	 * @author laijindan
	 * @date 2016-12-21
	 */
	@Transactional
    public Integer updateTFileCycorePath(Object[] param) throws BusinessException;

	/**
	 * 根据资源id删除记录
	 * @param tResourceId
	 * @return
	 * @throws Exception
     */
	public Integer deleteResourceFile(String tResourceId) throws Exception;

	public List<ResourceFile> selectStorage() throws Exception;

	public Integer updateResourceFilePath(ResourceFile resourceFile) throws Exception;
	
}
