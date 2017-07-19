package com.jsrm.web.controller.fileUpLoad;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jsrm.service.ResourceInfo.ResourceInfoService;
import com.jsrm.web.vo.ResourceInfoVo.ResourceInfoVo;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.jsrm.base.common.BaseRestController;
import com.jsrm.base.utils.UUIDUtils;
import com.jsrm.model.resourceFile.ResourceFile;
import com.jsrm.service.fileUpload.FileUploadCycoreService;
import com.jsrm.service.fileUpload.impl.FileUploadCycoreServiceImpl;
import com.jsrm.service.resourceFile.ResourceFileService;
import com.jsrm.web.restController.resourceCode.ResourceCodeController;

@Controller
@RequestMapping("/callBack")
public class CallBackController extends BaseRestController{
	
	private static final Log log = LogFactory.getLog(ResourceCodeController.class);
    @Autowired
    private ResourceFileService resourceFileService;
    
    @Autowired
    private FileUploadCycoreService fileUploadCycoreServiceImpl;

	@Resource
	private ResourceInfoService resourceInfoServiceImpl;

	@RequestMapping(method ={RequestMethod.GET, RequestMethod.POST}, value = "/convertCallBack", produces = {"application/json;charset=UTF-8"})
	@ResponseBody
    public synchronized String convertCallBack(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> param = new HashMap<String, Object>();
        String result = "";
		try{
			String args = request.getParameter("args");
			String status = request.getParameter("status");
			JSONObject argsObject = JSONObject.parseObject(args);
			JSONObject callback = argsObject.getJSONObject("callback");
			JSONObject params = callback.getJSONObject("params");
			String resourceId = params.getString("resourceId");
			String action = argsObject.getString("action");
			String destination = argsObject.getString("destination");
			String source = argsObject.getString("source");
			
			if("SUCCESS".equals(status)){
				String resultString = request.getParameter("result");
				JSONObject resultObject = JSONObject.parseObject(resultString);
				String filepath = resultObject.getString("filepath");
				String downloadHost = resultObject.getString("downloadHost");
				String downLoadUrl = downLoadFromUrl(downloadHost+filepath,UUIDUtils.getUUID()+".swf");
				fileUploadCycoreServiceImpl.completeUpload(downLoadUrl, resourceId, null, null, 2);
				log.info("转换SWF成功");
			}else {
				param.put("fileType", 2);
				param.put("tResourceId", resourceId);
				param.put("state", 4);
				resourceFileService.updateResourceFile(new Object[]{param});
				List<ResourceFile> resourceFileList = resourceFileService.selectResourceFile(new Object[]{param});
				if (resourceFileList.get(0).getCount()<2) {
					fileUploadCycoreServiceImpl.file2swfConvert(source, destination, resourceId, action);
					log.info("转换swf失败，重新转换");
				}else {
					log.info("转换swf失败，超过转换次数");
				}
			}
		}catch(Exception e){
            e.printStackTrace();
            result = "出错了";
            return this.doError(result);
        }
		return result;
    }

	@RequestMapping(method ={RequestMethod.GET, RequestMethod.POST}, value = "/convertCallBack2", produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public synchronized String convertCallBack2(HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> param = new HashMap<String, Object>();
		String result = "";
		try{
			String args = request.getParameter("args");
			String status = request.getParameter("status");
			JSONObject argsObject = JSONObject.parseObject(args);
			JSONObject callback = argsObject.getJSONObject("callback");
			JSONObject params = callback.getJSONObject("params");
			String resourceId = params.getString("resourceId");
			String action = argsObject.getString("action");
			String destination = argsObject.getString("destination");
			String source = argsObject.getString("source");

			if("SUCCESS".equals(status)){
				String resultString = request.getParameter("result");
				JSONObject resultObject = JSONObject.parseObject(resultString);
				String filepath = resultObject.getString("filepath");
				String downloadHost = resultObject.getString("downloadHost");
				String downLoadUrl = downLoadFromUrl(downloadHost+filepath,UUIDUtils.getUUID()+".swf");
				fileUploadCycoreServiceImpl.completeUpload(downLoadUrl, resourceId, null, null, 3);
				log.info("转换小样成功");
			}else {
				param.put("fileType", 3);
				param.put("tResourceId", resourceId);
				param.put("state", 4);
				resourceFileService.updateResourceFile(new Object[]{param});
				List<ResourceFile> resourceFileList = resourceFileService.selectResourceFile(new Object[]{param});
				if (resourceFileList.get(0).getCount()<2) {
					fileUploadCycoreServiceImpl.file2swfConvert(source, destination, resourceId, action, 1, 2);
					log.info("转换小样失败，重新转换");
				}else {
					log.info("转换小样失败，超过转换次数");
				}
			}
		}catch(Exception e){
			e.printStackTrace();
			result = "出错了";
			return this.doError(result);
		}
		return result;
	}
	
	@RequestMapping(method ={RequestMethod.GET, RequestMethod.POST},value = "/convertThumbnailCallBack", produces = {"application/json;charset=UTF-8"})
	@ResponseBody
    public synchronized String convertThumbnailCallBack(HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> data = new HashMap<String, Object>();
        Map<String, Object> param = new HashMap<String, Object>();
        String result = "";
		try{
			String args = request.getParameter("args");
			String status = request.getParameter("status");
			JSONObject argsObject = JSONObject.parseObject(args);
			JSONObject callback = argsObject.getJSONObject("callback");
			JSONObject params = callback.getJSONObject("params");
			String resourceId = params.getString("resourceId");
			String action = argsObject.getString("action");
			String destination = argsObject.getString("destination");
			String source = argsObject.getString("source");
			
			if("SUCCESS".equals(status)){
				String resultString = request.getParameter("result");
				JSONObject resultObject = JSONObject.parseObject(resultString);
				String filepath = resultObject.getString("filepath");
				String downloadHost = resultObject.getString("downloadHost");
				String downLoadUrl = downLoadFromUrl(downloadHost+filepath,UUIDUtils.getUUID()+".jpg");
				fileUploadCycoreServiceImpl.completeUpload(downLoadUrl, resourceId, null, null, 1);
				log.info("转换图片成功");
			}else {
				param.put("fileType", 1);
				param.put("tResourceId", resourceId);
				//param.put("filePath", null);
				param.put("state", 4);
				resourceFileService.updateResourceFile(new Object[]{param});
				List<ResourceFile> resourceFileList = resourceFileService.selectResourceFile(new Object[]{param});
				if (resourceFileList.get(0).getCount()<2) {
					fileUploadCycoreServiceImpl.file2imgConvert(source, destination, resourceId, action);
					log.info("转换小样失败，重新转换");
				}else {
					log.info("转换小样失败，超过转换次数");
				}
			}
		}catch(Exception e){
            e.printStackTrace();
            result = "出错了";
            return this.doError(result);
        }
		return result;		
    }
	
	@RequestMapping(method ={RequestMethod.GET, RequestMethod.POST},value = "/convertSampleCallBack", produces = {"application/json;charset=UTF-8"})
	@ResponseBody
    public synchronized String convertSampleCallBack(HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> data = new HashMap<String, Object>();
        Map<String, Object> param = new HashMap<String, Object>();
        String result = "";
		try{
			String args = request.getParameter("args");
			String status = request.getParameter("status");
			JSONObject argsObject = JSONObject.parseObject(args);
			JSONObject callback = argsObject.getJSONObject("callback");
			JSONObject params = callback.getJSONObject("params");
			String resourceId = params.getString("resourceId");

			Integer type = Integer.parseInt(params.getString("type"));
			String sstart = params.getString("start");
			String send = params.getString("end");

			Integer start = null, end = null;

			if(sstart != null){
				start = Integer.parseInt(sstart);
			}
			if(send != null){
				end = Integer.parseInt(send);
			}

			String action = argsObject.getString("action");
			String destination = argsObject.getString("destination");
			String source = argsObject.getString("source");
			if("SUCCESS".equals(status)){
				String resultString = request.getParameter("result");
				JSONObject resultObject = JSONObject.parseObject(resultString);
				String filepath = resultObject.getString("filepath");
				String downloadHost = resultObject.getString("downloadHost");
				String downLoadUrl = downLoadFromUrl(downloadHost+filepath,UUIDUtils.getUUID()+".mp4");
				fileUploadCycoreServiceImpl.completeUpload(downLoadUrl, resourceId, null, null, type);
				log.info("转换mp4成功");
			}else {
				param.put("fileType", 3);
				param.put("tResourceId", resourceId);
				param.put("state", 4);
				resourceFileService.updateResourceFile(new Object[]{param});
				List<ResourceFile> resourceFileList = resourceFileService.selectResourceFile(new Object[]{param});
				if (resourceFileList.get(0).getCount()<2) {
					fileUploadCycoreServiceImpl.video2videoConvert(source, destination, resourceId, start, end, action, type);
					log.info("转换小样失败，重新转换");
				}else {
					log.info("转换小样失败，超过转换次数");
				}
			}
		}catch(Exception e){
            e.printStackTrace();
            result = "出错了";
            return this.doError(result);
        }
		return result;		
    }
	
	/** 
     * 从网络Url中下载文件 
     * @param urlStr 
     * @param fileName
     * @throws IOException 
     */  
    public String  downLoadFromUrl(String urlStr,String fileName) throws IOException{  
        URL url = new URL(urlStr);    
        HttpURLConnection conn = (HttpURLConnection)url.openConnection();    
                //设置超时间为3秒  
        conn.setConnectTimeout(3*1000);  
        //防止屏蔽程序抓取而返回403错误  
        conn.setRequestProperty("User-Agent", "Mozilla/4.0 (compatible; MSIE 5.0; Windows NT; DigExt)");  
  
        InputStream in = FileUploadCycoreServiceImpl.class.getClassLoader().getResourceAsStream("config/application.properties");
		BufferedReader bf = new BufferedReader(new InputStreamReader(in, "utf-8"));
        Properties properties = new Properties();
        properties.load(bf);
        String savePath = properties.getProperty("file.tempPath");
        
        //得到输入流  
        InputStream inputStream = conn.getInputStream();    
        //获取自己数组  
        byte[] getData = this.readInputStream(inputStream);      
  
        //文件保存位置  
        File saveDir = new File(savePath);  
        if(!saveDir.exists()){  
            saveDir.mkdir();  
        }  
        
        File file = new File(saveDir+File.separator+fileName);      
        FileOutputStream fos = new FileOutputStream(file);       
        fos.write(getData);   
        if(fos!=null){  
            fos.close();    
        }  
        if(inputStream!=null){  
            inputStream.close();  
        }  
  
        return file.getPath();
    } 
    
    /** 
     * 从输入流中获取字节数组 
     * @param inputStream 
     * @return 
     * @throws IOException 
     */  
    public byte[] readInputStream(InputStream inputStream) throws IOException {    
        byte[] buffer = new byte[1024];    
        int len = 0;    
        ByteArrayOutputStream bos = new ByteArrayOutputStream();    
        while((len = inputStream.read(buffer)) != -1) {    
            bos.write(buffer, 0, len);    
        }    
        bos.close();    
        return bos.toByteArray();    
    }
	
	@RequestMapping(method ={RequestMethod.GET, RequestMethod.POST},value = "/convertUploadCallBack", produces = {"application/json;charset=UTF-8"})
	@ResponseBody
    public synchronized String convertUploadCallBack(HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> param = new HashMap<String, Object>();
		String result = "";
		try{
			String urlFile = request.getParameter("download");
			String resourceId = request.getParameter("resourceId");
			String fileType = request.getParameter("fileType");
	        param.put("fileType", fileType);
			param.put("tResourceId", resourceId);
			String url = urlFile.replace("http://", "");
            param.put("filePath", url.substring(url.indexOf("/")));

			param.put("state", 3);
			
			resourceFileService.updateResourceFile(new Object[]{param});

//			if("2".equals(fileType)){
//				ResourceInfoVo r = new ResourceInfoVo();
//				r.setId(resourceId);
//				r.setFilePath(url.substring(url.indexOf("/")));
//				resourceInfoServiceImpl.updateResourceInfo(r);
//			}

            result = "成功了";
		}catch (Exception e) {
			e.printStackTrace();
            result = "出错了";
		}
		return result;
	}
	
	@RequestMapping(method ={RequestMethod.GET, RequestMethod.POST},value = "/convertBack", produces = {"application/json;charset=UTF-8"})
	@ResponseBody
    public synchronized String convertBack(HttpServletRequest request, HttpServletResponse response,
    		String localFilePath,String resourceId,String fileFormat,String resourceCode) {
		fileUploadCycoreServiceImpl.completeUpload(localFilePath, resourceId, fileFormat, resourceCode,null);
		return null;
	}
}
