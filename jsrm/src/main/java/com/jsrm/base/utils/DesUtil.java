package com.jsrm.base.utils;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import javax.crypto.spec.IvParameterSpec;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

/**
 * 
 * DES算法
 */

public final class DesUtil {

	/**
	 * 
	 * 
	 * 
	 * @return DES算法密钥
	 */

	public static byte[] generateKey() {

		try {

			// DES算法要求有一个可信任的随机数源

			SecureRandom sr = new SecureRandom();

			// 生成一个DES算法的KeyGenerator对象

			KeyGenerator kg = KeyGenerator.getInstance("DES");

			kg.init(sr);

			// 生成密钥

			SecretKey secretKey = kg.generateKey();

			// 获取密钥数据

			byte[] key = secretKey.getEncoded();

			return key;

		} catch (NoSuchAlgorithmException e) {

			//System.err.println("DES算法，生成密钥出错!");

			//e.printStackTrace();

		}

		return null;

	}

	/**
	 * 
	 * 加密函数
	 * 
	 * 
	 * 
	 * @param data
	 * 
	 *            加密数据
	 * 
	 * @param key
	 * 
	 *            密钥
	 * 
	 * @return 返回加密后的数据
	 */

	public static byte[] encrypt(byte[] data, byte[] key) {

		try {

			// DES算法要求有一个可信任的随机数源

			SecureRandom sr = new SecureRandom();

			// 从原始密钥数据创建DESKeySpec对象

			DESKeySpec dks = new DESKeySpec(key);

			// 创建一个密匙工厂，然后用它把DESKeySpec转换成

			// 一个SecretKey对象

			SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");

			SecretKey secretKey = keyFactory.generateSecret(dks);

			// using DES in ECB mode

			Cipher cipher = Cipher.getInstance("DES/ECB/PKCS5Padding");

			// 用密匙初始化Cipher对象

			cipher.init(Cipher.ENCRYPT_MODE, secretKey, sr);

			// 执行加密操作

			byte encryptedData[] = cipher.doFinal(data);

			return encryptedData;

		} catch (Exception e) {

			//System.err.println("DES算法，加密数据出错!");

			//e.printStackTrace();

		}

		return null;

	}
	
	public static String encrypt(String str,String key) {
		String enStr=null;
		try{
		byte[] data=DesUtil.encrypt(str.getBytes(), key.getBytes());
		enStr=byteArr2HexStr(data);
		}catch(Exception e){
			//e.printStackTrace();
		}
		return enStr;
	}

	/**
	 * 
	 * 解密函数
	 * 
	 * 
	 * 
	 * @param data
	 * 
	 *            解密数据
	 * 
	 * @param key
	 * 
	 *            密钥
	 * 
	 * @return 返回解密后的数据
	 */

	public static byte[] decrypt(byte[] data, byte[] key) {

		try {

			// DES算法要求有一个可信任的随机数源

			SecureRandom sr = new SecureRandom();

			// byte rawKeyData[] = /* 用某种方法获取原始密匙数据 */;

			// 从原始密匙数据创建一个DESKeySpec对象

			DESKeySpec dks = new DESKeySpec(key);

			// 创建一个密匙工厂，然后用它把DESKeySpec对象转换成

			// 一个SecretKey对象

			SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");

			SecretKey secretKey = keyFactory.generateSecret(dks);

			// using DES in ECB mode

			Cipher cipher = Cipher.getInstance("DES/ECB/PKCS5Padding");

			// 用密匙初始化Cipher对象

			cipher.init(Cipher.DECRYPT_MODE, secretKey, sr);

			// 正式执行解密操作

			byte decryptedData[] = cipher.doFinal(data);

			return decryptedData;

		} catch (Exception e) {

			//System.err.println("DES算法，解密出错。");

			//e.printStackTrace();

		}

		return null;

	}
	
	public static String decrypt(String str,String key) {
		String enStr=null;
		try{
		byte[] data=DesUtil.decrypt(hexStr2ByteArr(str), key.getBytes());
		enStr=new String(data);
		}catch(Exception e){
			//e.printStackTrace();
		}
		return enStr;
	}

	/**
	 * 
	 * 加密函数
	 * 
	 * 
	 * 
	 * @param data
	 * 
	 *            加密数据
	 * 
	 * @param key
	 * 
	 *            密钥
	 * 
	 * @return 返回加密后的数据
	 */

	public static byte[] CBCEncrypt(byte[] data, byte[] key, byte[] iv) {

		try {

			// 从原始密钥数据创建DESKeySpec对象

			DESKeySpec dks = new DESKeySpec(key);

			// 创建一个密匙工厂，然后用它把DESKeySpec转换成

			// 一个SecretKey对象

			SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");

			SecretKey secretKey = keyFactory.generateSecret(dks);

			// Cipher对象实际完成加密操作

			Cipher cipher = Cipher.getInstance("DES/CBC/PKCS5Padding");

			// 若采用NoPadding模式，data长度必须是8的倍数

			// Cipher cipher = Cipher.getInstance("DES/CBC/NoPadding");

			// 用密匙初始化Cipher对象

			IvParameterSpec param = new IvParameterSpec(iv);

			cipher.init(Cipher.ENCRYPT_MODE, secretKey, param);

			// 执行加密操作

			byte encryptedData[] = cipher.doFinal(data);

			return encryptedData;

		} catch (Exception e) {

			//System.err.println("DES算法，加密数据出错!");

			//e.printStackTrace();

		}

		return null;

	}
	
	
	
	public static String CBCEncrypt(String str,String key,String iv) {
		String enStr="";
		try{
		byte[] data=DesUtil.CBCEncrypt(str.getBytes(), key.getBytes(),iv.getBytes());
		enStr=byteArr2HexStr(data);
		}catch(Exception e){
			//e.printStackTrace();
		}
		return enStr;
	}

	/**
	 * 
	 * 解密函数
	 * 
	 * 
	 * 
	 * @param data
	 * 
	 *            解密数据
	 * 
	 * @param key
	 * 
	 *            密钥
	 * 
	 * @return 返回解密后的数据
	 */

	public static byte[] CBCDecrypt(byte[] data, byte[] key, byte[] iv) {

		try {

			// 从原始密匙数据创建一个DESKeySpec对象

			DESKeySpec dks = new DESKeySpec(key);

			// 创建一个密匙工厂，然后用它把DESKeySpec对象转换成

			// 一个SecretKey对象

			SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");

			SecretKey secretKey = keyFactory.generateSecret(dks);

			// using DES in CBC mode

			Cipher cipher = Cipher.getInstance("DES/CBC/PKCS5Padding");

			// 若采用NoPadding模式，data长度必须是8的倍数

			// Cipher cipher = Cipher.getInstance("DES/CBC/NoPadding");

			// 用密匙初始化Cipher对象

			IvParameterSpec param = new IvParameterSpec(iv);

			cipher.init(Cipher.DECRYPT_MODE, secretKey, param);

			// 正式执行解密操作

			byte decryptedData[] = cipher.doFinal(data);

			return decryptedData;

		} catch (Exception e) {

			//System.err.println("DES算法，解密出错。");

			//e.printStackTrace();

		}

		return null;

	}
	
	
	public static String CBCDecrypt(String str,String key,String iv) {
		String enStr=null;
		try{
		byte[] data=DesUtil.CBCDecrypt(hexStr2ByteArr(str), key.getBytes(),iv.getBytes());
		enStr=new String(data);
		}catch(Exception e){
			//e.printStackTrace();
		}
		return enStr;
	}

	/**
	 * 将byte数组转换为表示16进制值的字符串， 如：byte[]{8,18}转换为：0813， 和public static byte[]
	 * hexStr2ByteArr(String strIn) 互为可逆的转换过程
	 * 
	 * 
	 * @param arrB
	 *            需要转换的byte数组
	 * 
	 * @return 转换后的字符串
	 * @throws Exception
	 *             本方法不处理任何异常，所有异常全部抛出
	 */
	public static String byteArr2HexStr(byte[] arrB) throws Exception {
		int iLen = arrB.length;
		// 每个byte用两个字符才能表示，所以字符串的长度是数组长度的两倍

		StringBuffer sb = new StringBuffer(iLen * 2);
		for (int i = 0; i < iLen; i++) {
			int intTmp = arrB[i];
			// 把负数转换为正数
			while (intTmp < 0) {
				intTmp = intTmp + 256;
			}
			// 小于0F的数需要在前面补0
			if (intTmp < 16) {
				sb.append("0");
			}
			sb.append(Integer.toString(intTmp, 16));
		}
		return sb.toString();
	}

	/**
	 * 将表示16进制值的字符串转换为byte数组， 和public static String byteArr2HexStr(byte[] arrB)
	 * 互为可逆的转换过程
	 * 
	 * 
	 * @param strIn
	 *            需要转换的字符串
	 * @return 转换后的byte数组
	 * 
	 * @throws Exception
	 *             本方法不处理任何异常，所有异常全部抛出
	 */
	public static byte[] hexStr2ByteArr(String strIn) throws Exception {
		byte[] arrB = strIn.getBytes();
		int iLen = arrB.length;

		// 两个字符表示一个字节，所以字节数组长度是字符串长度除以2
		byte[] arrOut = new byte[iLen / 2];
		for (int i = 0; i < iLen; i = i + 2) {
			String strTmp = new String(arrB, i, 2);
			arrOut[i / 2] = (byte) Integer.parseInt(strTmp, 16);
		}
		return arrOut;
	}

//	public static void main(String[] args) {
//
//		try {
//
//			String key = "hnck2000";
//
//			String iv = "52733626";
//
//			String data = DesUtil.encrypt("ebc mode test", key);
//
//			System.out.print("EBC mode:");
//			System.out.println(data);
//			System.out.println(new String(DesUtil.decrypt(
//					data, key)));
//
//			System.out.print("CBC mode:");
//
//			data = DesUtil.CBCEncrypt("cbc mode test", key, iv);
//			System.out.println(data);
//			System.out.println(new String(DesUtil.CBCDecrypt(data, key, iv)));
//
//		} catch (Exception e) {
//
//			e.printStackTrace();
//
//		}
//
//	}

}
