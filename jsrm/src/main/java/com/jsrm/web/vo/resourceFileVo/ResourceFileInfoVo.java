package com.jsrm.web.vo.resourceFileVo;

/**
 * Created by jichao on 2017/3/1.
 */
public class ResourceFileInfoVo {

    private String tResourceId;
    private String fileType;
    private String createDate;
    private String state;

    private String resourceName;
    private String createUserName;

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

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getResourceName() {
        return resourceName;
    }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }

    public String getCreateUserName() {
        return createUserName;
    }

    public void setCreateUserName(String createUserName) {
        this.createUserName = createUserName;
    }
}
