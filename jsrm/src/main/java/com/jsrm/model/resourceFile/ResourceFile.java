package com.jsrm.model.resourceFile;

import java.util.Date;

/**
 * <p>Title: ResourceFile</p>
 * <p>Description: </p>
 * <p>Company: </p> 
 * @author laijindan
 * @date 2016-12-20 上午10:21:29
 */
public class ResourceFile {
	
	private String id;
	private String tResourceId;
	private String fileType;
	private String fileName;
	private String  filePath;
	private Date createDate;
	private String state;
	private Integer count;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String gettResourceId() {
		return tResourceId;
	}
	public void settResourceId(String tResourceId) {
		this.tResourceId = tResourceId;
	}
	public String getFileType() {
		return fileType;
	}
	public void setFileType(String fileType) {
		this.fileType = fileType;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public Integer getCount() {
		return count;
	}
	public void setCount(Integer count) {
		this.count = count;
	}
	
}
