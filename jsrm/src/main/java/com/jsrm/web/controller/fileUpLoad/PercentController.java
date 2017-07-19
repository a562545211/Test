package com.jsrm.web.controller.fileUpLoad;

import com.jsrm.base.utils.UploadPercent;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by jichao on 2017/1/11.
 */
@Controller()
@RequestMapping("percent")
public class PercentController {
    Log log = LogFactory.getLog(PercentController.class);

    @RequestMapping("/calculatePercent")
    @ResponseBody
    public Integer calculatePercent(String resourceId) {
        Integer percent = 50;
        Integer thisPercent = UploadPercent.thisPercent.get(resourceId);
        Integer totalPercent = UploadPercent.totalPercent.get(resourceId);
        System.out.println("thisPercent:" + thisPercent);
        System.out.println("totalPercent" + totalPercent);
        if(thisPercent != null && totalPercent != null){
            percent += (int) Math.ceil(thisPercent * 100 / totalPercent / 2);
        }
        return percent;
    }
}
