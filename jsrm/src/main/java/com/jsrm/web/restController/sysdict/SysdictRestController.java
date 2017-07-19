package com.jsrm.web.restController.sysdict;

import com.jsrm.base.common.BaseRestController;
import com.jsrm.model.sysdict.SysDict;
import com.jsrm.service.sysdict.SysdictService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by wdCao on 2016/11/2.
 */
@RestController
@RequestMapping("/sysdict")
public class SysdictRestController extends BaseRestController {
    @Resource
    private SysdictService sysdictService;

    @RequestMapping("/querySysdict")
    @ResponseBody
    public String querySysdict(SysDict sysDict) {
        Map<String, Object> data = new HashMap<String, Object>();

        data.put("data", sysdictService.querySysdict(sysDict));
        return  this.doSuccess("success", data);
    }
}
