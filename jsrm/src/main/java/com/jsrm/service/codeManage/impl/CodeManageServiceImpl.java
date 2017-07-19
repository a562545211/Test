package com.jsrm.service.codeManage.impl;

import com.jsrm.base.service.impl.BaseSupportServiceImpl;
import com.jsrm.base.utils.ResourceType;
import com.jsrm.service.codeManage.CodeManageService;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by kingsj.yuan@foxmail.com on 2016/11/4.
 */
@Service
public class CodeManageServiceImpl extends BaseSupportServiceImpl implements CodeManageService {

    @Override
    public String getCodeGenerator(String resourceCode, ResourceType resourceType) {
        Map<String, Object> map = new HashMap<>();
        map.put("tResourceCode", resourceCode);
        map.put("resourceType", resourceType.name());
        String seq = this.getDao().selectOne("resourceInfo.getResourceCodeSeq", new Object[]{map}).toString();
        String flag = ResourceType.getText(resourceType.name());
        if (seq.length() < 4) {
            Integer iseq = Integer.valueOf(seq);
            iseq += 1;
            String str = iseq.toString();
            String scode = "";
            for (int i = 0; i < 3-str.length(); i++) {
                scode += "0";
            }
            seq = scode + iseq;
        }
        if(flag.equals("G"))
            seq = "000";
        String code = resourceCode + flag + seq;
        return code;
    }
}
