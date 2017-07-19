package com.jsrm.service.fileUpload.impl;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.UUID;

import com.jsrm.base.utils.UploadPercent;
import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.springframework.stereotype.Service;
import com.iflytek.cycore.converter.client.MultimediaFormatConvertService;
import com.iflytek.cycore.converter.client.model.Callback;
import com.iflytek.cycore.converter.client.model.ConvertOption;
import com.iflytek.cycore.converter.client.model.TaskStatus;
import com.jsrm.model.resourceFile.ResourceFile;
import com.jsrm.service.fileUpload.FileUploadCycoreService;
import com.jsrm.web.vo.fileUpload.FileInfoVo;
import com.mashape.unirest.http.Unirest;
import cn.cycore.cystorage.sdk.CyStorage;
import cn.cycore.cystorage.sdk.Options;
import cn.cycore.cystorage.sdk.enums.Option;
import cn.cycore.cystorage.sdk.models.BeforeInfo;
import cn.cycore.cystorage.sdk.models.ChunkInfo;
import cn.cycore.cystorage.sdk.models.FileInfo;
import cn.cycore.cystorage.sdk.models.PrepareInfo;

@Service
public class FileUploadCycoreServiceImpl implements FileUploadCycoreService {

	private String cystorage_host;
	private String cystorage_appKey;
	private String cyStorage_appSecret;
	private Integer cyStorage_chunkSize;
	private String convert_server;
	private String callBack_server;
	private Integer slicingSize;
	private MultimediaFormatConvertService multimediaFormatConvertService;
	
	//普通初始化
	{
		try {
			InputStream in = FileUploadCycoreServiceImpl.class.getClassLoader().getResourceAsStream("config/application.properties");
			BufferedReader bf = new BufferedReader(new InputStreamReader(in, "utf-8"));
	        Properties properties = new Properties();
	        properties.load(bf);
	        cystorage_host = properties.getProperty("cystorage.host");
			cystorage_appKey = properties.getProperty("cystorage.appKey");
			cyStorage_appSecret = properties.getProperty("cyStorage.appSecret");
			cyStorage_chunkSize = Integer.parseInt(properties.getProperty("cyStorage.chunkSize"));
			convert_server = properties.getProperty("convert.server");
	        callBack_server = properties.getProperty("callBack.server");
	        slicingSize = Integer.parseInt(properties.getProperty("file.slicingSize"));
	        this.multimediaFormatConvertService = new MultimediaFormatConvertService(convert_server);
		} catch(Exception e) {
			e.printStackTrace();
		}
		
	}
	
	/**
	 * 文件预备上传
	 * @param localFilePath
	 * @return
	 */
	@Override
	public PrepareInfo uploadPrepare(String localFilePath,String resourceId,String fileFormat,String resourceCode,Integer fileType) {
		PrepareInfo prepareInfo = null;
		try {
			//CyStorage参数设置
			CyStorage.setHost(cystorage_host);
	        CyStorage.setAppKey(cystorage_appKey);
	        CyStorage.setAppSecret(cyStorage_appSecret);
			
	        String urlFileName = String.format("%s.%s", UUID.randomUUID(), localFilePath.substring(localFilePath.indexOf(".") + 1));
	        HashMap<String, Object> params = new HashMap<String, Object>();
	        params.put("filePath", String.format("%s/%s", Options.getOption(Option.APPKEY), urlFileName));
	        
	        //业务的回调
	        params.put("callbackMethod", "GET");
	        if(fileType == null){
		        params.put("callbackUrl",callBack_server.substring(callBack_server.lastIndexOf("//") + 2) + "resourceFile/saveResourceFile");
		        params.put("callbackParams", "resourceId=" + resourceId+"&fileFormat=" + fileFormat + "&resourceCode=" + resourceCode);
	        }else {
	        	params.put("callbackUrl", callBack_server.substring(callBack_server.lastIndexOf("//") + 2) + "callBack/convertUploadCallBack");
	        	params.put("callbackParams", "resourceId=" + resourceId + "&fileType=" + fileType );
	        }
	        params.put("callbackProtocol", "HTTP");
	        
	        System.out.println("urlFileName=="+urlFileName);
	        long fileLength = new File(localFilePath).length();
	        int chunks = (int) Math.ceil(1.0 * fileLength / cyStorage_chunkSize);

			//放入map中
			UploadPercent.totalPercent.put(resourceId, chunks);
	       
	        params.put("chunks", chunks);
	        Unirest.setTimeouts(200000,2000000000);
	        prepareInfo = CyStorage.apis().prepare(params);
//        	System.out.print(prepareInfo.getStatus());
		} catch(Exception e) {
			e.printStackTrace();
		}
        return prepareInfo;
    }
	
	/**
	 * 预备上传接口（已抛弃）
	 * @param localFilePath
	 * @return
	 */
	@Override
	public BeforeInfo uploadFileOnBefore(String localFilePath,String resourceId,String fileFormat,String resourceCode,Integer fileType) {
		BeforeInfo beforeInfo = null;
		try {
			//CyStorage参数设置
			CyStorage.setHost(cystorage_host);
	        CyStorage.setAppKey(cystorage_appKey);
	        CyStorage.setAppSecret(cyStorage_appSecret);
			
			Unirest.setTimeouts(100000,500000);
	        String urlFileName = String.format("%s.%s", UUID.randomUUID(), localFilePath.substring(localFilePath.indexOf(".") + 1));
	        HashMap<String, Object> params = new HashMap<String, Object>();
	        params.put("filePath", String.format("%s/%s", Options.getOption(Option.APPKEY), urlFileName));
	        
	        //业务的回调
	        params.put("callbackMethod", "GET");
	        if(fileType == null){
	        	params.put("callbackUrl", callBack_server.substring(callBack_server.lastIndexOf("//") + 2) + "resourceFile/saveResourceFile");
	        	params.put("callbackParams", "resourceId=" + resourceId + "&fileFormat=" + fileFormat + "&resourceCode=" + resourceCode);
	        }else {
	        	params.put("callbackUrl", callBack_server.substring(callBack_server.lastIndexOf("//") + 2) + "callBack/convertUploadCallBack");
	        	params.put("callbackParams", "resourceId=" + resourceId + "&fileType=" + fileType );
	        }
	        params.put("callbackProtocol", "HTTP");
	        
	        beforeInfo = CyStorage.apis().uploadFileOnBefore(params);
		} catch(Exception e) {
			e.printStackTrace();
		}
		return beforeInfo;
    }
	
	/**
	 * 文件分片上传
	 * @param prepareInfo
	 * @param localFilePath
	 */
	@Override
	public ChunkInfo uploadChunk(PrepareInfo prepareInfo, String localFilePath,String resourceId,String fileFormat,String resourceCode,Integer convertId) {

		ChunkInfo chunkInfo = null;
        if (prepareInfo == null) {
        	prepareInfo = this.uploadPrepare(localFilePath, resourceId,fileFormat,resourceCode,convertId);
        }
        
        Unirest.setTimeouts(100000000,100000000);
        try (FileInputStream in = new FileInputStream(localFilePath)) {
            try (FileChannel fcin = in.getChannel()) {
                ByteBuffer buffer = ByteBuffer.allocate(cyStorage_chunkSize);
                int chunk = 0;
                while (true) {
					//放入map中
					UploadPercent.thisPercent.put(resourceId, chunk);
                    buffer.clear();
                    int flag = fcin.read(buffer);
                    if (flag == -1) {
                        break;
                    }
                    buffer.flip();

                    byte[] bytes = new byte[buffer.remaining()];
                    buffer.get(bytes, 0, bytes.length);

                    chunkInfo = CyStorage.apis().uploadChunk(prepareInfo.getContextId(), chunk, bytes);
                    System.out.println(chunkInfo.getContextId() + "  " + chunkInfo.getChunkNo() + "  " + chunkInfo.getLength());
                    chunk += 1;
                }

				//FileInfo fileInfo = CyStorage.apis().complete(prepareInfo.getContextId());

                fcin.close();
            }
            in.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return chunkInfo;
    }
	
	/**
	 * 完成文件上传
	 * @param localFilePath
	 * @return
	 */
	@Override
	public FileInfo completeUpload(String localFilePath,String resourceId,String fileFormat,String resourceCode,Integer fileType) {
		FileInfo fileInfo = null;
		PrepareInfo prepareInfo = null;
		try {

			if (prepareInfo == null) {
				//文件预备上传
				prepareInfo = this.uploadPrepare(localFilePath,resourceId,fileFormat,resourceCode,fileType);
				//文件分片上传
				this.uploadChunk(prepareInfo, localFilePath,resourceId,fileFormat,resourceCode,fileType);
			}
			fileInfo = CyStorage.apis().complete(prepareInfo.getContextId());

		} catch(Exception e) {
			e.printStackTrace();
		}

		if(fileInfo != null){
			Integer status = fileInfo.getStatus();
			if(status == 2){
				//删除文件
				File f = new File(localFilePath);
				if(f.exists()) f.delete();
			}
		}

		return fileInfo;
    }

	@Override
	public FileInfo uploadToSwift(String localPath) {
		FileInfo fileInfo = null;
		PrepareInfo prepareInfo = null;
		try {

			if (prepareInfo == null) {
				//文件预备上传
				prepareInfo = this.prepareToSwift(localPath);
				//文件分片上传
				this.chunkToSwift(prepareInfo, localPath);
			}

			fileInfo = CyStorage.apis().complete(prepareInfo.getContextId());

		} catch(Exception e) {
			e.printStackTrace();
		}

		if(fileInfo != null){
			Integer status = fileInfo.getStatus();
			if(status == 2){
				//删除文件
				File f = new File(localPath);
				if(f.exists()) f.delete();
			}
		}

		return fileInfo;

	}

	/**
	 * 上传到swift的准备，回调函数
	 * @param localPath 本地文件路径
     * @return
     */
	private PrepareInfo prepareToSwift(String localPath){
		PrepareInfo prepareInfo = null;
		try {
			//CyStorage参数设置
			CyStorage.setHost(cystorage_host);
			CyStorage.setAppKey(cystorage_appKey);
			CyStorage.setAppSecret(cyStorage_appSecret);

			//文件后缀名
			String urlFileName = String.format("%s.%s", UUID.randomUUID(), localPath.substring(localPath.indexOf(".") + 1));
			HashMap<String, Object> params = new HashMap<String, Object>();
			params.put("filePath", String.format("%s/%s", Options.getOption(Option.APPKEY), urlFileName));

			//好像不需要回调。。。
//			//业务的回调
//			params.put("callbackMethod", "GET");
//
//			params.put("callbackUrl",callBack_server.substring(callBack_server.lastIndexOf("//") + 2) + "resourceFile/updateSwiftUrl");
//			params.put("callbackParams", "id=" + id);
//
//			params.put("callbackProtocol", "HTTP");

			System.out.println("urlFileName=="+urlFileName);
			long fileLength = new File(localPath).length();
			int chunks = (int) Math.ceil(1.0 * fileLength / cyStorage_chunkSize);

			params.put("chunks", chunks);
			Unirest.setTimeouts(200000,2000000000);
			prepareInfo = CyStorage.apis().prepare(params);
//        	System.out.print(prepareInfo.getStatus());
		} catch(Exception e) {
			e.printStackTrace();
		}
		return prepareInfo;
	}

	/**
	 * 分片上传swift
	 * @param prepareInfo
	 * @param localPath
     */
	private void chunkToSwift(PrepareInfo prepareInfo, String localPath){
		ChunkInfo chunkInfo = null;
		if (prepareInfo == null) {
			prepareInfo = this.prepareToSwift(localPath);
		}

		Unirest.setTimeouts(100000000,100000000);
		try (FileInputStream in = new FileInputStream(localPath)) {
			try (FileChannel fcin = in.getChannel()) {
				ByteBuffer buffer = ByteBuffer.allocate(cyStorage_chunkSize);
				int chunk = 0;
				while (true) {
					buffer.clear();
					int flag = fcin.read(buffer);
					if (flag == -1) {
						break;
					}
					buffer.flip();

					byte[] bytes = new byte[buffer.remaining()];
					buffer.get(bytes, 0, bytes.length);

					chunkInfo = CyStorage.apis().uploadChunk(prepareInfo.getContextId(), chunk, bytes);
					System.out.println(chunkInfo.getContextId() + "  " + chunkInfo.getChunkNo() + "  " + chunkInfo.getLength());
					chunk += 1;
				}
				fcin.close();
			}
			in.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	/**
	 * word转swf文件
	 * @param urlFile		word文件路径（例如：http://221.239.44.228/zzzz/111.docx）
	 * @param outFile		转换后的swf文件（例如：/zzzz/3m.swf）
	 * @return
	 * @throws Exception
	 */
	@Override
	public TaskStatus file2swfConvert(String urlFile, String outFile,String resourceId,
			String fileFormatAction) throws Exception {
		Map map =new HashMap();
		TaskStatus status = null;
		try {
			//回调业务
			Callback callbackObject = new Callback();
			callbackObject.setCallbackUrl(callBack_server + "callBack/convertCallBack");
			
			//回调业务参数
			List<NameValuePair> formparams = new ArrayList<NameValuePair>();
			formparams.add(new BasicNameValuePair("resourceId",resourceId));
			callbackObject.setCallbackParams(formparams);
			
			ConvertOption option = new ConvertOption.Builder()
	                .appkey("test1")
	                .action(fileFormatAction)
	                //中文, 空格
	                .source(urlFile)
	                .destination(outFile)
	                .callback(callbackObject)
	                .build();
			
			String taskId = multimediaFormatConvertService.convert(option);
			System.out.println("taskId=" + taskId);
			status = multimediaFormatConvertService.getTaskStatus(taskId);
		} catch(Exception e) {
			e.printStackTrace();
		}
		return status;
    }

	@Override
	public TaskStatus file2swfConvert(String urlFile, String outFile, String resourceId, String fileFormatAction, Integer start, Integer end) throws Exception {
		Map map =new HashMap();
		map.put("pageFrom", start);
		map.put("pageTo", end);
		TaskStatus status = null;
		try {
			//回调业务
			Callback callbackObject = new Callback();
			callbackObject.setCallbackUrl(callBack_server + "callBack/convertCallBack2");

			//回调业务参数
			List<NameValuePair> formparams = new ArrayList<NameValuePair>();
			formparams.add(new BasicNameValuePair("resourceId",resourceId));
			callbackObject.setCallbackParams(formparams);

			ConvertOption option = new ConvertOption.Builder()
					.appkey("test1")
					.action(fileFormatAction)
					//中文, 空格
					.source(urlFile)
					.destination(outFile)
					.callback(callbackObject)
					.parameters(map)
					.build();

			String taskId = multimediaFormatConvertService.convert(option);
			System.out.println("taskId=" + taskId);
			status = multimediaFormatConvertService.getTaskStatus(taskId);
		} catch(Exception e) {
			e.printStackTrace();
		}
		return status;
	}

	/**
	 * word截取图片
	 * @param urlFile					word文档（例如：http://221.239.44.228/zzzz/111.docx）
	 * @param outDestination			截取图片存放位置（例如：/zzzz/）
	 * @return
	 * @throws Exception
	 */
	@Override
	public TaskStatus file2imgConvert(String urlFile, String outDestination,String resourceId,
			String fileFormatAction) throws Exception {
		Map map =new HashMap();
		if(fileFormatAction.equals("video2img")){
			map.put("format", "jpg");
			map.put("startTime", "5");
			//map.put("multiOutput", false);
			map.put("size", "120 * 90");
		}
		TaskStatus status = null;
		try {
			
			//回调业务
			Callback callbackObject = new Callback();
			callbackObject.setCallbackUrl(callBack_server + "callBack/convertThumbnailCallBack");
			
			//回调业务参数
			List<NameValuePair> formparams = new ArrayList<NameValuePair>();
			formparams.add(new BasicNameValuePair("resourceId",resourceId));
			callbackObject.setCallbackParams(formparams);
			
			ConvertOption option = new ConvertOption.Builder()
	                .appkey("test1")
	                .action(fileFormatAction)
	                .source(urlFile)      //中文, 空格
	                .destination(outDestination)
	                .callback(callbackObject)
					//.parameters(map)
	                .build();

			if(fileFormatAction.equals("video2img")){
				option.setParameters(map);
			}
			
			String taskId = multimediaFormatConvertService.convert(option);
			System.out.println("taskId=" + taskId);
			status = multimediaFormatConvertService.getTaskStatus(taskId);
		} catch(Exception e) {
			e.printStackTrace();
		}
       return status;
	}	
	
	/**
	 * 截取部分视频
	 * @param urlFile					视频路径（例如：http://221.239.44.228/zzzz/1.mp4）
	 * @param outDestination			截取视频存放位置（例如：/zzzz/fff1.mp4）
	 * @param start						开始时间
	 * @param end						结束时间
	 * @return
	 * @throws Exception
	 */
	@Override
	public TaskStatus video2videoConvert(String urlFile, String outDestination, String resourceId,
			Integer start, Integer end, String fileFormatAction, Integer type) throws Exception {
		TaskStatus status = null;
		try {
			Map map =new HashMap();
			map.put("format", "mp4");
			if(start != null){
				map.put("startTime", start);
			}
			if(end != null){
				map.put("duration", end);
			}

			//回调业务
			Callback callbackObject = new Callback();
			callbackObject.setCallbackUrl(callBack_server + "callBack/convertSampleCallBack");
			
			//回调业务参数
			List<NameValuePair> formparams = new ArrayList<NameValuePair>();
			formparams.add(new BasicNameValuePair("resourceId",resourceId));
			formparams.add(new BasicNameValuePair("type", type.toString()));
			if(start != null){
				formparams.add(new BasicNameValuePair("start", start.toString()));
			}
			if(end != null){
				formparams.add(new BasicNameValuePair("end", end.toString()));
			}
			callbackObject.setCallbackParams(formparams);
			
			ConvertOption option = new ConvertOption.Builder()
	                .appkey("test1")
	                .action(fileFormatAction)
	                .source(urlFile)      //中文, 空格
	                .destination(outDestination)
	                .parameters(map)
	                .callback(callbackObject)
	                .build();

	        String taskId = multimediaFormatConvertService.convert(option);
	        System.out.println("taskId=" + taskId);
	        status = multimediaFormatConvertService.getTaskStatus(taskId);
		} catch(Exception e) {
			e.printStackTrace();
		}
		return status;
	}

}
