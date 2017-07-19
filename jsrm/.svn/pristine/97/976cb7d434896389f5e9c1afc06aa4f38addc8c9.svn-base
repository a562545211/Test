package com.jsrm.base.common;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;

import javax.annotation.Resource;
import java.util.List;

/** 
* @author 万涛 E-mail:hnck2000@126.com 
* @version 创建时间：2016年4月11日 下午1:14:26 
* spring mvc基础控制类 
*/
@SuppressWarnings("all")
public abstract class BaseController {
	
	@Resource
	private MessageSource messageSource;

	public String success(String msg) {
		JSONObject json = new JSONObject();
		json.put("result", Boolean.valueOf(true));
		json.put("message", msg);
		return json.toString();
	}

	public String error(String msg) {
		JSONObject json = new JSONObject();
		json.put("result", Boolean.valueOf(false));
		json.put("message", msg);
		return json.toString();
	}

	public String doPageJson(long total, List list) {
		JSONObject json = new JSONObject();
		json.put("total", total);
		json.put("rows", list);
		return json.toString();
	}

	public String doListJson(List list) {
		JSONObject json = new JSONObject();
		json.put("rows", list);
		return json.toString();
	}

	public String doSimpleList(List list) {
		JSONArray json = JSONArray.fromObject(list);
		return json.toString();
	}
	
	
	public String getMessage(String msgStr) {
		return getMessage(msgStr,null);
	}
	
	public String getMessage(String msgStr,Object[] args) {
		return messageSource.getMessage(msgStr, args, LocaleContextHolder.getLocale());
	}

}
