package com.jsrm.service.fileUpload;

import com.iflytek.cycore.converter.client.model.TaskStatus;
import com.jsrm.model.resourceFile.ResourceFile;
import com.jsrm.web.vo.fileUpload.FileInfoVo;

import cn.cycore.cystorage.sdk.models.BeforeInfo;
import cn.cycore.cystorage.sdk.models.ChunkInfo;
import cn.cycore.cystorage.sdk.models.FileInfo;
import cn.cycore.cystorage.sdk.models.PrepareInfo;

public interface FileUploadCycoreService {

	/**
	 * 文件预备上传
	 * @param localFilePath
	 * @return
	 */
	public PrepareInfo uploadPrepare(String localFilePath, String resourceId, String fileFormat, String resourceCode, Integer fileType);
	
	/**
	 * 预备上传接口（已抛弃）
	 * @param localFilePath
	 * @return
	 */
	public BeforeInfo uploadFileOnBefore(String localFilePath, String resourceId, String fileFormat, String resourceCode, Integer fileType);
	
	/**
	 * 文件分片上传
	 * @param prepareInfo
	 * @param localFilePath
	 */
	public ChunkInfo uploadChunk(PrepareInfo prepareInfo, String localFilePath, String resourceId, String fileFormat, String resourceCode, Integer fileType);
	
	/**
	 * 完成文件上传
	 * @param localFilePath
	 * @return
	 */
	public FileInfo completeUpload(String localFilePath, String resourceId, String fileFormat, String resourceCode, Integer fileType);

	/**
	 * 上传到swift
	 * @param localPath 本地文件路径
     * @return
     */
	public FileInfo uploadToSwift(String localPath);
	
	/**
	 * word转swf文件
	 * @param urlFile		word文件路径（例如：http://221.239.44.228/zzzz/111.docx）
	 * @param outFile		转换后的swf文件（例如：/zzzz/3m.swf）
	 * @return
	 * @throws Exception
	 */
	public TaskStatus file2swfConvert(String urlFile, String outFile, String resourceId, String fileFormatAction) throws Exception;

	public TaskStatus file2swfConvert(String urlFile, String outFile, String resourceId, String fileFormatAction, Integer start, Integer end) throws Exception;
	
	/**
	 * word截取图片
	 * @param urlFile					word文档（例如：http://221.239.44.228/zzzz/111.docx）
	 * @param outDestination			截取图片存放位置（例如：/zzzz/）
	 * @param pageFrom					从第几页
	 * @param pageTo					到第几页
	 * @return
	 * @throws Exception
	 */
	public TaskStatus file2imgConvert(String urlFile, String outDestination, String resourceId, String fileFormatAction) throws Exception;
	
	/**
	 * 截取部分视频
	 * @param urlFile					视频路径（例如：http://221.239.44.228/zzzz/1.mp4）
	 * @param outDestination			截取视频存放位置（例如：/zzzz/fff1.mp4）
	 * @param start						开始时间
	 * @param end						结束时间
	 * @return
	 * @throws Exception
	 */
	public TaskStatus video2videoConvert(String urlFile, String outDestination, String resourceId, Integer start, Integer end, String fileFormatAction, Integer type) throws Exception;
}
