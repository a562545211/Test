package com.jsrm.base.utils;

import com.jsrm.base.common.PageVO;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.processors.DefaultValueProcessor;
import net.sf.json.util.JSONUtils;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;

import java.util.*;


/**
 * model 转化为 ext 需要的json字符串
 * 
 * @author wantao
 * 
 */
public final class JSONUtil {

	/**
	 * 获取JsonConfig
	 * 
	 * @return
	 */
	private static JsonConfig getDefaultJsonConfig() {
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.registerDefaultValueProcessor(Integer.class,
				new NumberDefaultValueProcessor());
		jsonConfig.registerDefaultValueProcessor(Double.class,
				new NumberDefaultValueProcessor());
		jsonConfig.registerDefaultValueProcessor(Long.class,
				new NumberDefaultValueProcessor());
		return jsonConfig;
	}

	/**
	 * 将单个对象转成json回应字符串，包含全部属性字段
	 * 
	 * @param obj
	 * @return
	 */
	public static String object2Json(Object obj) {
		return object2Json(obj, null);
	}

	/**
	 * 将单个对象转成json回应字符串，同时指定忽略输出的属性字段列表
	 * 
	 * @param obj
	 * @param excludes
	 *            忽略输出的属性字段列表
	 * @return
	 */
	public static String object2Json(Object obj, String[] excludes) {

		return object2Json(obj, excludes, null);

	}

	/**
	 * 将单个对象转成json回应字符串，同时指定忽略输出的属性字段列表和扩展字段表达式列表
	 * 
	 * @param obj
	 * @param excludes
	 * @param extPropertys
	 *            扩展字段表达式列表 每个string形如<br>
	 *            "sheetInfoId:sheetInfo.id"
	 * @return
	 */
	public static String object2Json(Object obj, String[] excludes,
			String[] extPropertys) {

		String beginStr = "";
		String endStr = "";
		StringBuffer sb = new StringBuffer();
		sb.append(beginStr);
		sb.append(object2JsonStr(obj, excludes, extPropertys));
		sb.append(endStr);

		return sb.toString();

	}

	/**
	 * 拼装单个json对象的{}部分
	 * 
	 * @param obj
	 * @param excludes
	 *            忽略输出的属性字段列表
	 * @param extPropertys
	 *            扩展字段表达式列表 每个string形如<br>
	 *            "sheetInfoId:sheetInfo.id" 这个方法还有点问题，反射这里不能直接调用
	 * @return
	 */
	private static String object2JsonStr(Object obj, String[] excludes,
			String[] extPropertys) {

		StringBuffer sb = new StringBuffer();
		JsonConfig jsonConfig = getDefaultJsonConfig();
		if (excludes != null) {
			jsonConfig.setExcludes(excludes);
		}
		sb.append(JSONObject.fromObject(obj, jsonConfig));

		if (extPropertys != null) {
			String fieldName = "";// json属性字段名
			String propertyExpr = "";// 对象属性表达式

			String preStr = StringUtils.removeEnd(sb.toString(), "}");
			sb.delete(0, sb.length());
			sb.append(preStr);

			for (String item : extPropertys) {

				String value = "";
				sb.append(",");
				fieldName = StringUtils.substringBefore(item, ":");
				propertyExpr = StringUtils.substringAfter(item, ":");
				try {
					value = obj != null ? BaseUtils.htmlEscape(itarorObj(obj,
							propertyExpr)) : null;

				} catch (Exception e) {
					e.printStackTrace();
				}
				sb.append("\"" + fieldName + "\":\"").append(value)
						.append("\"");

			}
			sb.append("}");
		}

		return sb.toString();

	}

	private static String itarorObj(Object obj, String propertyExpr)
			throws Exception {
		String value = "";
		int dotPlace = propertyExpr.indexOf(".");
		if (dotPlace != -1) {
			String objName = propertyExpr.substring(0, dotPlace);
			String propertyExprExt = propertyExpr.substring(dotPlace + 1,
					propertyExpr.length());
			return itarorObj(BaseUtils.getPrivateProperty(obj, objName),
					propertyExprExt);
		} else {
			value = obj != null ? BeanUtils.getProperty(obj, propertyExpr) : "";
			return value;
		}
	}

	/**
	 * 将list对象转化成json字符串
	 * 
	 * @param list
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static String list2Json(List list) {
		return list2Json(list, null);
	}

	/**
	 * 将list对象转成json字符串,同时指定忽略输出的属性字段列表
	 * 
	 * @param list
	 * @param excludes
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static String list2Json(List list, String[] excludes) {
		return list2Json(list, excludes, null);
	}

	/**
	 * 将list对象转成json字符串,同时指定忽略输出的属性字段列表、需要的字段
	 * 
	 * @param list
	 * @param excludes
	 * @param extPropertys
	 *            映射的字段
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static String list2Json(List list, String[] excludes,
			String[] extPropertys) {
		StringBuffer sb = new StringBuffer();
		sb.append("{totalProperty:" + list.size() + ",root:");
		sb.append("[");
		for (int i = 0; i < list.size(); i++) {
			if (i > 0) {
				sb.append(",");
			}
			sb.append(object2JsonStr(list.get(i), excludes, extPropertys));
		}
		sb.append("]");
		sb.append("}");
		return sb.toString();
	}

	/**
	 * 将page对象转成json字符串
	 * 
	 * @param page
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static String page2Json(PageVO page) {
		return page2Json(page, null, null);
	}

	/**
	 * 将page对象转成json字符串
	 * 
	 * @param page
	 * @param excludes
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static String page2Json(PageVO page, String[] excludes) {
		return page2Json(page, excludes, null);
	}

	/**
	 * 将page对象转成json字符串,同时指定忽略输出的属性字段列表
	 * 
	 * @param page
	 *            page对象
	 * @param String
	 *            [] excludes 忽略输出的属性字段列表
	 * @param String
	 *            [] extPropertys 包含列表
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static String page2Json(PageVO page, String[] excludes,
			String[] extPropertys) {
		StringBuffer sb = new StringBuffer();
		List list = page.getResult();
		sb.append("{totalPage:" + page.getTotalPageCount() + ",");
		sb.append("totalRecord:" + page.getTotalCount() + ",root:");
		sb.append("[");
		for (int i = 0; i < list.size(); i++) {
			if (i > 0) {
				sb.append(",");
			}
			sb.append(object2JsonStr(list.get(i), excludes, extPropertys));
		}
		sb.append("]");
		sb.append("}");
		return sb.toString();

	}

	public JSONObject json2Java(final String s) {
		return JSONObject.fromObject(s);
	}

	@SuppressWarnings("unchecked")
	public static Map<String, Object> json2Map(final String s) {
		Map<String, Object> map = new HashMap<String, Object>();
		JSONObject json = JSONObject.fromObject(s);
		Iterator<String> keys = json.keys();
		while (keys.hasNext()) {
			String key = (String) keys.next();
			String value = json.get(key).toString();
			if (value.startsWith("{") && value.endsWith("}")) {
				map.put(key, json2Map(json.get(key).toString()));
			} else {
				if (JSONUtils.isNull(json.get(key))) {
					map.put(key, null);
				} else {
					map.put(key, value);
				}
			}

		}
		return map;
	}

	@SuppressWarnings("unchecked")
	public static List<Map<String, Object>> json2List(final String s) {
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		JSONArray jsons = JSONArray.fromObject(s);
		for (int i = 0; i < jsons.size(); i++) {
			JSONObject json = jsons.getJSONObject(i);
			Map<String, Object> map = new HashMap<String, Object>();
			Iterator<String> keys = json.keys();
			while (keys.hasNext()) {
				String key = (String) keys.next();
				String value = json.get(key).toString();
				if (value.startsWith("{") && value.endsWith("}")) {
					map.put(key, json2Map(value));
				} else {
					if (JSONUtils.isNull(json.get(key))) {
						map.put(key, null);
					} else {
						map.put(key, value);
					}
				}
			}
			list.add(map);
		}

		return list;
	}

	static public class NumberDefaultValueProcessor implements
			DefaultValueProcessor {
		@SuppressWarnings("rawtypes")
		public Object getDefaultValue(Class clazz) {
			return "";
		}

	}

//	@SuppressWarnings({ "rawtypes", "unchecked" })
//	public static void main(String[] args) {
//		Map data = new HashMap();
//		data.put("a", "bbbbb");
//		List<Map> subList = new ArrayList<Map>();
//		Map sub = new HashMap();
//		sub.put("bbb", "cccc");
//		subList.add(sub);
//		data.put("sub", subList);
//		System.out.println(JSONUtil.object2Json(data));
//	}

}
