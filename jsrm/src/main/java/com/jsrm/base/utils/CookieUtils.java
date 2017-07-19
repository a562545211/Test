package com.jsrm.base.utils;

import org.apache.commons.lang.StringUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public final class CookieUtils {

	public static void addCookie(HttpServletResponse response, String name, String value, int age) {
		addCookie(response,name,value,age,null);
	}
	
	public static void addCookie(HttpServletResponse response, String name, String value, int age, String domain) {
		try{
		Cookie cookies = new Cookie(name, value);
		cookies.setPath("/");
		// cookies.setMaxAge(-1);//设置cookie经过多长秒后被删除。如果0，就说明立即删除。如果是负数就表明当浏览器关闭时自动删除。
		cookies.setMaxAge(age);
		if(domain!=null){
		cookies.setDomain(domain);
		}
		response.addCookie(cookies);
		}catch(Exception e){
			e.printStackTrace();
		}
	}

	public static String getCookieValue(HttpServletRequest request, String cookieName) {
		try{
		if (cookieName != null) {
			Cookie cookie = getCookie(request,cookieName);
			if (cookie != null) {
				return cookie.getValue();
			}
		}
		}catch(Exception e){
			e.printStackTrace();
		}
		return "";
	}

	public static Cookie getCookie(HttpServletRequest request, String cookieName) {
		Cookie[] cookies = request.getCookies();
		try {
			if (cookies != null && cookies.length > 0) {
				for (int i = 0; i < cookies.length; i++) {
					Cookie cookie = cookies[i];
					if (cookie.getName().equals(cookieName)) {
						return cookie;
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public static void deleteCookie(HttpServletRequest request, HttpServletResponse response, String cookieName) {
		deleteCookie(request,response,cookieName,null);
	}
	
	public static void deleteCookie(HttpServletRequest request, HttpServletResponse response, String cookieName, String domain) {
		try{
		if (cookieName != null) {
			Cookie cookie = getCookie(request,cookieName);
			if (cookie != null) {
				cookie.setMaxAge(0);// 如果0，就说明立即删除
				if(domain!=null){
				cookie.setDomain(domain);
				}
				cookie.setPath("/");// 不要漏掉
				response.addCookie(cookie);
			}
		}
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	/**
	 * 将所有变量输出到一个cookie值里面 
	 * **/
	public  static  void superAdd(HttpServletResponse response, String name, Map<String,String> maps, int age, String superKey){
		superAdd(response,name,maps,age,null,superKey);
	}
	
	public  static  void superAdd(HttpServletResponse response, String name, Map<String,String> maps, int age, String domain, String superKey){
		try{
			String str="";
			if(maps!=null){
				Iterator<String> it=maps.keySet().iterator();
				while(it.hasNext()){
					String key=it.next();
					if(maps.get(key)!=null){
						  if("".equalsIgnoreCase(str)){
							  str=key+"="+maps.get(key);
						  }else{
							  str+="#WTCOOKIE#"+key+"="+maps.get(key);
						  }
					}
				}
			}
			str=DesUtil.encrypt(str, superKey);
			addCookie(response,name,str,age,domain);
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	public static Map<String,String> superRead(HttpServletRequest request, String cookieName, String superKey){
		Map<String,String> map=new HashMap<String,String>();
		try{
			String str=getCookieValue(request,cookieName);
			str=DesUtil.decrypt(str, superKey);
			if(StringUtils.isNotBlank(str)){
				String[] str1=str.split("#WTCOOKIE#");
				for(String tempStr:str1){
					String[] str2=tempStr.split("=");
					map.put(str2[0],str2[1]);
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return map;
	}

	
}
