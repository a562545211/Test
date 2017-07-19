package com.jsrm.base.utils;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.LineNumberReader;

public final class NetUtils {

	/**
	 * 获取目标ip的mac地址
	 * @param remotePcIp 目标IP地址
	 * ***/
	public static String getMacAddressIP(String remotePcIP) {
		String str = "";
		String macAddress = "";
		try {
			Process pp = Runtime.getRuntime().exec("nbtstat -A " + remotePcIP);
			InputStreamReader ir = new InputStreamReader(pp.getInputStream(),"GBK");
			LineNumberReader input = new LineNumberReader(ir);
			for (int i = 1; i < 100; i++) {
				str = input.readLine();
				if (str != null) {
					if (str.indexOf("MAC Address") > 1) {
						macAddress = str.substring(
								str.indexOf("MAC Address") + 14, str.length());
						break;
					}
					if (str.indexOf("MAC 地址") > 1) {
						macAddress = str.substring(
								str.indexOf("MAC 地址") + 8, str.length());
						break;
					}
				}
			}
		} catch (IOException ex) {
		}
		return macAddress;
	}
	
//	 public static void main(String[] args)
//	  {
//		 System.out.println(NetUtils.getMacAddressIP("192.168.2.102"));
//	  }

}
