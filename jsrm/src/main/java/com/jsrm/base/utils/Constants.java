/**
 * 
 */
package com.jsrm.base.utils;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * @author yaoz
 * 
 */
public class Constants {

	// 分页大小
	public final static String PAGE_LIMIT_DEFAULT = "10";
	public final static String PAGE_LIMIT_SYSCOLUMN = PAGE_LIMIT_DEFAULT;
	public final static String PAGE_LIMIT_TASK = PAGE_LIMIT_DEFAULT;
	public final static String PAGE_LIMIT_TEATASK = "6";
	public final static String PAGE_LIMIT_SELF = "10";
	public final static String PAGE_LIMIT_COURSE = "10";

    public  static String REDIS_IP;
    public  static int REDIS_PORT;
    public  static String REDIS_AUTH;
    
    public  static String REDIS_IP1;
    public  static int REDIS_PORT1;
    public  static String REDIS_AUTH1;
    
//    public static String UPLOAD_PATH;
//    
//    public static String SYS_KEY; //系统key
//    
//    public static String SCHOOL_ID;
//    
//    public static String SCORE;
	
	static {
		Properties prop = new Properties();
		InputStream in = null;
		try {

			in = Constants.class.getResourceAsStream("/config.properties");
			prop.load(in);

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			try {
				in.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		REDIS_IP=prop.getProperty("redis_ip");
		REDIS_PORT=Integer.valueOf(prop.getProperty("redis_port"));
		REDIS_AUTH=prop.getProperty("redis_auth");
		
		
		REDIS_IP1=prop.getProperty("redis_ip1");
		REDIS_PORT1=Integer.valueOf(prop.getProperty("redis_port1"));
		REDIS_AUTH1=prop.getProperty("redis_auth1");
		//sampleURL = prop.getProperty("sampleURL");
		
//		UPLOAD_PATH = prop.getProperty("UPLOAD_PATH");
//		SYS_KEY=prop.getProperty("SYS_KEY");
//		SCHOOL_ID = prop.getProperty("SCHOOL_ID");
//		SCORE = prop.getProperty("SCORE");
	}
	
	/**
	 * 有效性：有效1
	 */
	public static final String ENABLE = "1";
	
	/**
	 * 有效性：无效0
	 */
	public static final String DISENABLE = "0";
	
	
		
	
	
}
