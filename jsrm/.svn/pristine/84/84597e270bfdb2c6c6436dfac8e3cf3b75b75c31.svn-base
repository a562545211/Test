package com.jsrm.base.common;

import com.jsrm.base.utils.ResourceType;
import com.jsrm.model.user.User;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

/**
 *   登录用户信息封装类
 */
public final class ModelUtil {

    /**
     * 获取用户信息
     * @param request
     * @return
     */
    public static User getUser(HttpServletRequest request) {
        User user = null;

        HttpSession session = request.getSession();
        user = (User) session.getAttribute("UserBean");

        return user;
    }

    /**
     * 获取资源类型枚举
     * @param key
     * @return
     */
    public static ResourceType getResourceType(String key) {
        Map<String, Object> resourceTypeMap = new HashMap<String, Object>();
        resourceTypeMap.put("ORI", ResourceType.ORI);
        resourceTypeMap.put("PRO", ResourceType.PRO);
        resourceTypeMap.put("END", ResourceType.END);
        resourceTypeMap.put("DRA", ResourceType.DRA);

        return (ResourceType) resourceTypeMap.get(key);

    }
}
