package com.jsrm.base.common;

import com.alibaba.fastjson.JSON;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author 万涛 E-mail:hnck2000@126.com
 * @version 创建时间：2016年4月7日 下午12:11:53 rest控制器基础抽象类
 */
@SuppressWarnings("all")
public abstract class BaseRestController {
	
	@Resource
	private MessageSource messageSource;

	public String success(String msg) {
		JSONObject json = new JSONObject();
		json.put("result", 0);
		json.put("message", msg);
		return json.toString();
	}

	public String error(String msg) {
		JSONObject json = new JSONObject();
		json.put("result", 1);
		json.put("message", msg);
		return json.toString();
	}
	public String loginNameError(String msg) {
		JSONObject json = new JSONObject();
		json.put("result", 2);
		json.put("message", msg);
		return json.toString();
	}

	public String oldPassError(String msg) {
		JSONObject json = new JSONObject();
		json.put("result", 3);
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
		String listStr = JSON.toJSONStringWithDateFormat(list, "yyyy-MM-dd HH:mm:ss");
		json.put("rows", listStr);
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
	
	public String doSuccess(String message,Object jsonObject){
		JSONObject json = new JSONObject();
		json.put("status", 0);
		json.put("message", message);
		message = JSON.toJSONStringWithDateFormat(jsonObject, "yyyy-MM-dd HH:mm:ss");
		json.put("data", message);
		return json.toString();
	}

	public String doError(String message){
		JSONObject json = new JSONObject();
		json.put("status", 1);
		json.put("message", message);
		return json.toString();
	}
}
