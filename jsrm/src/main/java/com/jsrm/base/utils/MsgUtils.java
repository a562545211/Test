package com.jsrm.base.utils;

import java.io.IOException;
import java.io.InputStream;
import java.text.MessageFormat;
import java.util.*;


public final class MsgUtils {
	/**
	 * 存储 消息的国际化属性文件
	 */
	private static final Map<String, ResourceBundle> MESSAGE_BUNDLE_DATA = new HashMap<String, ResourceBundle>();

	
	
	/**
	 * 根据 国际化locale得到消息属性文件
	 * 
	 * @param fileName 指定资源文件名称
	 * @param locale
	 * @return
	 */
	public static ResourceBundle getMessageBundle(String fileName,Locale locale) {

		if(fileName==null||"".equalsIgnoreCase(fileName)){
			fileName="configuration/i18n/messages";
		}else{
			fileName="configuration/i18n/messages_"+fileName;
		}
		ResourceBundle rb = MESSAGE_BUNDLE_DATA.get(fileName+"_"+locale.toString());

		if (rb == null) {
			rb = ResourceBundle.getBundle(fileName, locale);
			MESSAGE_BUNDLE_DATA.put(fileName+"_"+locale.toString(), rb);
		}
		return rb;
	}
	
	public static String getText(String fileName,String msgKey, Object[] args){
		
		Locale locale = Locale.getDefault();
		ResourceBundle rb=getMessageBundle(fileName,locale);
		  String message;
			try {
				message = rb.getString(msgKey);
			} catch (MissingResourceException mse) {
				message = "未能找到匹配的资源文件: " + msgKey;
			}
			if(args!=null){
			    message = MessageFormat.format(message,args);
			}
			return message;
	}
	
	public static String getText(String fileName,String msgKey, String arg) {
		return getText(fileName,msgKey, new Object[] { arg });
	}
	
	public static String getText(String fileName,String msgKey, String[] arg) {
		return getText(fileName,msgKey, new Object[] { arg });
	}
	
	public static String getText(String fileName,String msgKey) {
		return getText(fileName,msgKey, new Object[] {});
	}
	
//	public static void main (String args[]){
//		System.out.print(MsgUtils.getText(null, "process.loading"));
//	}

	public static String getProperties(String fileName, String key) {
		if(fileName==null||"".equalsIgnoreCase(fileName)){
			fileName="/config/application.properties";
		}else{
			fileName="/config/"+fileName;
		}
		InputStream inputStream = MsgUtils.class.getResourceAsStream(fileName);
		Properties properties = new Properties();
		String value = null;
		try {
			properties.load(inputStream);
			value = properties.getProperty(key);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return value;
	}

	public static String getText(String key) {
		return getProperties(null, key);
	}

}
