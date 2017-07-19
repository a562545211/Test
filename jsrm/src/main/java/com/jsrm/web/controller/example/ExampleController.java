package com.jsrm.web.controller.example;

import com.jsrm.base.common.BaseController;
import com.jsrm.model.example.Demo;
import com.jsrm.service.example.DemoService;
import com.jsrm.web.vo.demo.DemoVo;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;

/** 
* springmvc测试控制器
*/
@Controller
@RequestMapping("example")
public class ExampleController extends BaseController {

	@Resource
	DemoService demoService;
	
	@RequestMapping(value="base")
	public String base() {
		return "example/base";
	}
	
	@RequestMapping("view/{id}")
	public ModelAndView view(@PathVariable("id") String id, Model model) {
		Map<String,String> obj=new HashMap<String,String>();
		obj.put("id", id);
		obj.put("title", "测试");
		return new ModelAndView("example/view", "obj", obj);
	}

	@RequestMapping("/addDemo")
	public String addDemo(DemoVo demoVo) {

		Demo demo = new Demo();
		try {
			BeanUtils.copyProperties(demo, demoVo);

			demoService.save(demo);
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		}

		return "example/base";
	}
}
