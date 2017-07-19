package com.jsrm.web.vo.statisticalAnalysis;

/**
 * Created by jichao on 2016/11/30.
 */
public class Workload {

    private String id;                  //用户id
    private String nameNumber;          //编号
    private String createUserName;      //人员名称
    private String description;         //描述
    private Integer uploadNumber;       //个人上传数量
    private Integer topicNumber;        //个人发稿数量
    private Integer vettedNumber;       //个人审核数量

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNameNumber() {
        return nameNumber;
    }

    public void setNameNumber(String nameNumber) {
        this.nameNumber = nameNumber;
    }

    public String getCreateUserName() {
        return createUserName;
    }

    public void setCreateUserName(String createUserName) {
        this.createUserName = createUserName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getUploadNumber() {
        return uploadNumber;
    }

    public void setUploadNumber(Integer uploadNumber) {
        this.uploadNumber = uploadNumber;
    }

    public Integer getTopicNumber() {
        return topicNumber;
    }

    public void setTopicNumber(Integer topicNumber) {
        this.topicNumber = topicNumber;
    }

    public Integer getVettedNumber() {
        return vettedNumber;
    }

    public void setVettedNumber(Integer vettedNumber) {
        this.vettedNumber = vettedNumber;
    }
}
