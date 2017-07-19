package com.jsrm.base.utils;

/**
 * 资源类型
 * Created by kingsj.yuan@foxmail.com on 2016/11/4.
 */
public enum ResourceType {

    //资源类型：ORI 原始  PRO 工程 END 成品  DRA 发稿
    ORI("ORI","Y"), PRO("PRO","G"), END("END", "C"), DRA("DRA","C");

    private String name;
    private String text;

    ResourceType(String name, String text) {
        this.name = name;
        this.text = text;
    }

    public static String getText(String name) {
        ResourceType resourceType = ResourceType.valueOf(name);
        return resourceType.text;
    }

}
