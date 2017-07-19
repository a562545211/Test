package com.jsrm.base.utils;

import java.io.File;
import java.io.FileFilter;
import java.io.IOException;
import java.net.JarURLConnection;
import java.net.URL;
import java.net.URLDecoder;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

public final class ClassScanUtils {

	public static Set<Class<?>> getClasses(String pack) {
		Set<Class<?>> classes = new LinkedHashSet<Class<?>>();
		try {
			boolean recursive = true;
			String packageName = pack;
			String packageDirName = packageName.replace('.', '/');
			Enumeration<URL> dirs;
			dirs = Thread.currentThread().getContextClassLoader()
					.getResources(packageDirName);
			while (dirs.hasMoreElements()) {
				URL url = dirs.nextElement();
				String protocol = url.getProtocol();
				if ("file".equals(protocol)) {
					String filePath = URLDecoder.decode(url.getFile(), "UTF-8");
					findAndAddClassesInPackageByFile(packageName, filePath, recursive, classes);  
				} else if ("jar".equals(protocol)) {
					JarFile jar;
					try {
						jar = ((JarURLConnection) url.openConnection())
								.getJarFile();
						Enumeration<JarEntry> entries = jar.entries();
						while (entries.hasMoreElements()) {
							JarEntry entry = entries.nextElement();
							String name = entry.getName();
							if (name.charAt(0) == '/') {
								// 获取后面的字符串
								name = name.substring(1);
								if (name.startsWith(packageDirName)) {
									int idx = name.lastIndexOf('/');
									// 如果以"/"结尾 是一个包
									if (idx != -1) {
										// 获取包名 把"/"替换成"."
										packageName = name.substring(0, idx)
												.replace('/', '.');
									}
									// 如果可以迭代下去 并且是一个包
									if ((idx != -1) || recursive) {
										// 如果是一个.class文件 而且不是目录
										if (name.endsWith(".class")
												&& !entry.isDirectory()) {
											// 去掉后面的".class" 获取真正的类名
											String className = name.substring(
													packageName.length() + 1,
													name.length() - 6);
											try {
												// 添加到classes
												classes.add(Class
														.forName(packageName
																+ '.'
																+ className));
											} catch (ClassNotFoundException e) {
												// log
												// .error("添加用户自定义视图类错误 找不到此类的.class文件");
												e.printStackTrace();
											}
										}
									}
								}
							}

						}

					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}

		} catch (IOException e) {
			e.printStackTrace();
		}
		return classes;
	}

	public static void findAndAddClassesInPackageByFile(String packageName,
			String packagePath, final boolean recursive, Set<Class<?>> classes) {
		// 获取此包的目录 建立一个File
		File dir = new File(packagePath);
		// 如果不存在或者 也不是目录就直接返回
		if (!dir.exists() || !dir.isDirectory()) {
			// log.warn("用户定义包名 " + packageName + " 下没有任何文件");
			return;
		}
		// 如果存在 就获取包下的所有文件 包括目录
		File[] dirfiles = dir.listFiles(new FileFilter() {
			// 自定义过滤规则 如果可以循环(包含子目录) 或则是以.class结尾的文件(编译好的java类文件)
			public boolean accept(File file) {
				return (recursive && file.isDirectory())
						|| (file.getName().endsWith(".class"));
			}
		});
		// 循环所有文件
		for (File file : dirfiles) {
			// 如果是目录 则继续扫描
			if (file.isDirectory()) {
				findAndAddClassesInPackageByFile(
						packageName + "." + file.getName(),
						file.getAbsolutePath(), recursive, classes);
			} else {
				// 如果是java类文件 去掉后面的.class 只留下类名
				String className = file.getName().substring(0,
						file.getName().length() - 6);
				try {
					// 添加到集合中去
					// classes.add(Class.forName(packageName + '.' +
					// className));
					// 经过回复同学的提醒，这里用forName有一些不好，会触发static方法，没有使用classLoader的load干净
					classes.add(Thread.currentThread().getContextClassLoader()
							.loadClass(packageName + '.' + className));
				} catch (ClassNotFoundException e) {
					// log.error("添加用户自定义视图类错误 找不到此类的.class文件");
					e.printStackTrace();
				}
			}
		}
	}
	
	public static Set<Class<?>> getClassByAntPath(String root,String antPath){
		Set<Class<?>> list=getClasses(root);
		Set<Class<?>> newList=new LinkedHashSet<Class<?>>();
		AntPathMatcher ant=new AntPathMatcher();
		if(list!=null&&list.size()>0){
			Iterator<Class<?>> it=list.iterator();
			while(it.hasNext()){
				Class<?> cls=it.next();
				if(ant.doMatch(antPath, cls.getName(), true)){
					newList.add(cls);
				}
			}
		}
		return newList;
	}
	
	

//	/**
//	 * @param args
//	 */
//	public static void main(String[] args) {
////		AntPathMatcher ant=new AntPathMatcher();
////		if(ant.doMatch("com.hikeSoft.war.gwt.**.server.*ServiceImp", "com.hikeSoft.war.gwt.hk.server.HKServiceImp.class", true)){
////			System.out.println("y");
////		}else{
////			System.out.println("N");
////		}
//		
////		if(ant.doMatch("com.hikeSoft.rais4.gwt.*ServiceImp", "com.hikeSoft.rais4.gwt.DemoServiceImp", true)){
////		System.out.println("y");
////	    }else{
////		System.out.println("N");
////	     }
//		
//		Set<Class<?>> list=getClassByAntPath("com.hikeSoft","com.hikeSoft.**.*");
//		//Set<Class<?>> list=getClassByAntPath("org.aopalliance","com.smartclient.**.*");
//		Iterator<Class<?>> it=list.iterator();
//		while(it.hasNext()){
//			Class<?> cls=it.next();
//			System.out.println(cls.getSimpleName());
//		}
////		try {
////			GwtServerFactory.setClass(list);
////			Object o=GwtServerFactory.getService("demo");
////			System.out.println("XXXXXXXXXXXXXXXX:"+o.getClass().getName());
////		} catch (Exception e) {
////			e.printStackTrace();
////		}
//		
////		String uri="/main/greet";
////		  String[] uris=uri.split("/");
////		  System.out.println(uris[uris.length-1]);
//	}

}
