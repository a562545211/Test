package com.jsrm.web.vo.statisticalAnalysis;

/**
 * Created by li on 2016/11/17.
 */
public class ResourceAudit {
//    private String name;
//    private String phase;;
//    private String subject;
    private Integer vettedNumber;
    private Integer uploadvetted;
    private Integer topicvetted;

//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getPhase() {
//        return phase;
//    }
//
//    public void setPhase(String phase) {
//        this.phase = phase;
//    }
//
//    public String getSubject() {
//        return subject;
//    }
//
//    public void setSubject(String subject) {
//        this.subject = subject;
//    }


    public Integer getVettedNumber() {
        return vettedNumber;
    }

    public void setVettedNumber(Integer vettedNumber) {
        this.vettedNumber = vettedNumber;
    }

    public Integer getUploadvetted() {
        return uploadvetted;
    }

    public void setUploadvetted(Integer uploadvetted) {
        this.uploadvetted = uploadvetted;
    }

    public Integer getTopicvetted() {
        return topicvetted;
    }

    public void setTopicvetted(Integer topicvetted) {
        this.topicvetted = topicvetted;
    }
}
