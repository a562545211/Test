package com.jsrm.service.codeManage;

import com.jsrm.base.service.BaseService;
import com.jsrm.base.utils.ResourceType;

/**
 * 资源编号管理 接口
 * Created by kingsj.yuan@foxmail.com on 2016/11/4.
 */
public interface CodeManageService extends BaseService {

    /**
     * 编号生成
     * @param resourceCode
     * @param resourceType
     * @return
     */
    String getCodeGenerator(String resourceCode, ResourceType resourceType);
}
