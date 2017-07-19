package com.jsrm.web.restController.statisticalAnalysis;

import com.jsrm.service.statisticalAnalysis.TaskService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * Created by jichao on 2017/5/5.
 */
@RestController()
@RequestMapping("/taskController")
public class TaskController {

    @Resource
    private TaskService taskServiceImpl;

    @RequestMapping("/taskIntoRedis")
    @ResponseBody
    public void taskIntoRedis(){
        taskServiceImpl.intoRedis();
    }

    @RequestMapping("/deleteRedis")
    @ResponseBody
    public void deleteRedis(){
        taskServiceImpl.deleteRedis();
    }
}
