package com.jsrm.web.restController.resourceFile;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import com.iflytek.cycore.converter.client.model.TaskStatus;
import com.jsrm.base.utils.UploadPercent;
import com.jsrm.service.ResourceInfo.ResourceInfoService;
import com.jsrm.web.vo.ResourceInfoVo.ResourceInfoVo;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.jsrm.base.utils.UUIDUtils;
import com.jsrm.model.resourceCode.ResourceCode;
import com.jsrm.model.resourceFile.ResourceFile;
import com.jsrm.model.user.User;
import com.jsrm.service.fileUpload.FileUploadCycoreService;
import com.jsrm.service.fileUpload.impl.FileUploadCycoreServiceImpl;
import com.jsrm.service.resourceCode.ResourceCodeService;
import com.jsrm.service.resourceFile.ResourceFileService;
import com.jsrm.web.restController.resourceCode.ResourceCodeController;
import com.jsrm.web.vo.fileUpload.FileInfoVo;
import com.jsrm.web.vo.resourceCodeVo.ResourceCodeVo;
import com.jsrm.base.common.BaseRestController;

/**
 * <p>Title: ResourceFileController</p>
 * <p>Description: </p>
 * <p>Company: </p> 
 * @author laijindan
 * @date 2016-12-20 上午11:03:36
 */
@RestController()
@RequestMapping("resourceFile")
public class ResourceFileController extends BaseRestController {
	private static final Log log = LogFactory.getLog(ResourceCodeController.class);
    @Resource
    private ResourceFileService resourceFileServiceImpl;
    
    @Resource
    private FileUploadCycoreService fileUploadCycoreServiceImpl;

    @Resource
    private ResourceInfoService resourceInfoServiceImpl;

	@RequestMapping(method ={RequestMethod.GET, RequestMethod.POST}, value = "/saveResourceFile", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public synchronized String saveResourceFile(HttpServletRequest request){
        Map<String, Object> data = new HashMap<String, Object>();
        Map<String, Object> param = new HashMap<String, Object>();
        ResourceFile resourceFile = new ResourceFile();
        String result = "";
        try{
        	Integer i = 0;
        	InputStream in = FileUploadCycoreServiceImpl.class.getClassLoader().getResourceAsStream("config/application.properties");
        	BufferedReader bf = new BufferedReader(new InputStreamReader(in, "utf-8"));
	        Properties properties = new Properties();
	        properties.load(bf);
	        
	        String outDestination = properties.getProperty("file.outDestination");
	        Integer videoStart = Integer.valueOf(properties.getProperty("file.videoStart"));
	        Integer videoEnd = Integer.valueOf(properties.getProperty("file.videoEnd"));
        	String fileFormat = request.getParameter("fileFormat");
        	String resourceCode = request.getParameter("resourceCode");
        	String resourceId = request.getParameter("resourceId");
            String urlFile = request.getParameter("download");
            String id = UUIDUtils.getUUID();

        	resourceFile.setCreateDate(new Date());
            resourceFile.setState("2");
            resourceFile.setFileType("1");
            resourceFile.settResourceId(resourceId);
//            resourceFile.setFilePath(update_url);

            resourceFileServiceImpl.deleteResourceFile(resourceId);
            
            if(".docx".equals(fileFormat) || ".doc".equals(fileFormat) ){
            	resourceFile.setId(id);
            	param.put("fileType", 1);
				param.put("tResourceId", resourceId);
            	List<ResourceFile> resourceFileList = resourceFileServiceImpl.selectResourceFile(new Object[]{param});
            	if (resourceFileList.size() < 1) {
            		i = resourceFileServiceImpl.saveResourceFile(new Object[]{resourceFile});
				}

            	param.put("fileType", 2);
				param.put("tResourceId", resourceId);
            	resourceFileList = resourceFileServiceImpl.selectResourceFile(new Object[]{param});
            	if (resourceFileList.size() < 1) {
					id = UUIDUtils.getUUID();
	                resourceFile.setId(id);
	                resourceFile.setFileType("2");
	                i = resourceFileServiceImpl.saveResourceFile(new Object[]{resourceFile});
				}

                param.put("fileType", 3);
                param.put("tResourceId", resourceId);
                resourceFileList = resourceFileServiceImpl.selectResourceFile(new Object[]{param});
                if (resourceFileList.size() < 1) {
                    id = UUIDUtils.getUUID();
                    resourceFile.setId(id);
                    resourceFile.setFileType("3");
                    i = resourceFileServiceImpl.saveResourceFile(new Object[]{resourceFile});
                }

                fileUploadCycoreServiceImpl.file2imgConvert(urlFile, outDestination + "/" + resourceCode + "/" + UUIDUtils.getUUID() + ".jpg", resourceId, "word2img");
                fileUploadCycoreServiceImpl.file2swfConvert(urlFile, outDestination + "/"+ resourceCode + "/"+ UUIDUtils.getUUID() + ".swf", resourceId, "word2swf");
                fileUploadCycoreServiceImpl.file2swfConvert(urlFile, outDestination + "/"+ resourceCode + "/"+ UUIDUtils.getUUID() + ".swf", resourceId, "word2swf", 1, 5);
            }else if (".xls".equals(fileFormat) || ".xlsx".equals(fileFormat)) {
                resourceFile.setId(id);
                param.put("fileType", 1);
                param.put("tResourceId", resourceId);
                List<ResourceFile> resourceFileList = resourceFileServiceImpl.selectResourceFile(new Object[]{param});
                if (resourceFileList.size() < 1) {
                    i = resourceFileServiceImpl.saveResourceFile(new Object[]{resourceFile});
                }

                param.put("fileType", 2);
                param.put("tResourceId", resourceId);
                resourceFileList = resourceFileServiceImpl.selectResourceFile(new Object[]{param});
                if (resourceFileList.size() < 1) {
                    id = UUIDUtils.getUUID();
                    resourceFile.setId(id);
                    resourceFile.setFileType("2");
                    i = resourceFileServiceImpl.saveResourceFile(new Object[]{resourceFile});
                }

                param.put("fileType", 3);
                param.put("tResourceId", resourceId);
                resourceFileList = resourceFileServiceImpl.selectResourceFile(new Object[]{param});
                if (resourceFileList.size() < 1) {
                    id = UUIDUtils.getUUID();
                    resourceFile.setId(id);
                    resourceFile.setFileType("3");
                    i = resourceFileServiceImpl.saveResourceFile(new Object[]{resourceFile});
                }

                //fileUploadCycoreServiceImpl.file2imgConvert(urlFile, outDestination + "/"+ resourceCode + "/"+ UUIDUtils.getUUID() + ".jpg", resourceId, "excel2img");
                fileUploadCycoreServiceImpl.file2swfConvert(urlFile, outDestination + "/"+ resourceCode + "/"+ UUIDUtils.getUUID() + ".swf", resourceId, "excel2swf");
                //fileUploadCycoreServiceImpl.file2swfConvert(urlFile, outDestination + "/"+ resourceCode + "/"+ UUIDUtils.getUUID() + ".swf", resourceId, "excel2swf", 1, 2);
			}else if(".pptx".equals(fileFormat)|| ".ppt".equals(fileFormat) ){
                resourceFile.setId(id);
                param.put("fileType", 1);
                param.put("tResourceId", resourceId);
                List<ResourceFile> resourceFileList = resourceFileServiceImpl.selectResourceFile(new Object[]{param});
                if (resourceFileList.size() < 1) {
                    i = resourceFileServiceImpl.saveResourceFile(new Object[]{resourceFile});
                }

                param.put("fileType", 2);
                param.put("tResourceId", resourceId);
                resourceFileList = resourceFileServiceImpl.selectResourceFile(new Object[]{param});
                if (resourceFileList.size() < 1) {
                    id = UUIDUtils.getUUID();
                    resourceFile.setId(id);
                    resourceFile.setFileType("2");
                    i = resourceFileServiceImpl.saveResourceFile(new Object[]{resourceFile});
                }

                param.put("fileType", 3);
                param.put("tResourceId", resourceId);
                resourceFileList = resourceFileServiceImpl.selectResourceFile(new Object[]{param});
                if (resourceFileList.size() < 1) {
                    id = UUIDUtils.getUUID();
                    resourceFile.setId(id);
                    resourceFile.setFileType("3");
                    i = resourceFileServiceImpl.saveResourceFile(new Object[]{resourceFile});
                }

                fileUploadCycoreServiceImpl.file2imgConvert(urlFile, outDestination + "/"+ resourceCode + "/"+ UUIDUtils.getUUID() + ".jpg", resourceId, "ppt2img");
                fileUploadCycoreServiceImpl.file2swfConvert(urlFile, outDestination + "/"+ resourceCode + "/"+ UUIDUtils.getUUID() + ".swf", resourceId, "ppt2swf");
                fileUploadCycoreServiceImpl.file2swfConvert(urlFile, outDestination + "/"+ resourceCode + "/"+ UUIDUtils.getUUID() + ".swf", resourceId, "ppt2swf", 1, 5);
            }else if(".pdf".equals(fileFormat)){
                resourceFile.setId(id);
                param.put("fileType", 1);
                param.put("tResourceId", resourceId);
                List<ResourceFile> resourceFileList = resourceFileServiceImpl.selectResourceFile(new Object[]{param});
                if (resourceFileList.size() < 1) {
                    i = resourceFileServiceImpl.saveResourceFile(new Object[]{resourceFile});
                }

                param.put("fileType", 2);
                param.put("tResourceId", resourceId);
                resourceFileList = resourceFileServiceImpl.selectResourceFile(new Object[]{param});
                if (resourceFileList.size() < 1) {
                    id = UUIDUtils.getUUID();
                    resourceFile.setId(id);
                    resourceFile.setFileType("2");
                    i = resourceFileServiceImpl.saveResourceFile(new Object[]{resourceFile});
                }

                param.put("fileType", 3);
                param.put("tResourceId", resourceId);
                resourceFileList = resourceFileServiceImpl.selectResourceFile(new Object[]{param});
                if (resourceFileList.size() < 1) {
                    id = UUIDUtils.getUUID();
                    resourceFile.setId(id);
                    resourceFile.setFileType("3");
                    i = resourceFileServiceImpl.saveResourceFile(new Object[]{resourceFile});
                }

                fileUploadCycoreServiceImpl.file2imgConvert(urlFile, outDestination + "/"+ resourceCode + "/"+ UUIDUtils.getUUID() + ".jpg", resourceId, "pdf2img");
                fileUploadCycoreServiceImpl.file2swfConvert(urlFile, outDestination + "/"+ resourceCode + "/"+ UUIDUtils.getUUID() + ".swf", resourceId, "pdf2swf");
                fileUploadCycoreServiceImpl.file2swfConvert(urlFile, outDestination + "/"+ resourceCode + "/"+ UUIDUtils.getUUID() + ".swf", resourceId, "pdf2swf", 1, 5);
            }else if(".txt".equals(fileFormat)){
                resourceFile.setId(id);
                param.put("fileType", 1);
                param.put("tResourceId", resourceId);
                List<ResourceFile> resourceFileList = resourceFileServiceImpl.selectResourceFile(new Object[]{param});
                if (resourceFileList.size() < 1) {
                    i = resourceFileServiceImpl.saveResourceFile(new Object[]{resourceFile});
                }

                param.put("fileType", 2);
                param.put("tResourceId", resourceId);
                resourceFileList = resourceFileServiceImpl.selectResourceFile(new Object[]{param});
                if (resourceFileList.size() < 1) {
                    id = UUIDUtils.getUUID();
                    resourceFile.setId(id);
                    resourceFile.setFileType("2");
                    i = resourceFileServiceImpl.saveResourceFile(new Object[]{resourceFile});
                }

                param.put("fileType", 3);
                param.put("tResourceId", resourceId);
                resourceFileList = resourceFileServiceImpl.selectResourceFile(new Object[]{param});
                if (resourceFileList.size() < 1) {
                    id = UUIDUtils.getUUID();
                    resourceFile.setId(id);
                    resourceFile.setFileType("3");
                    i = resourceFileServiceImpl.saveResourceFile(new Object[]{resourceFile});
                }

                fileUploadCycoreServiceImpl.file2imgConvert(urlFile, outDestination + "/"+ resourceCode + "/"+ UUIDUtils.getUUID() + ".jpg", resourceId, "txt2img");
                fileUploadCycoreServiceImpl.file2swfConvert(urlFile, outDestination + "/"+ resourceCode + "/"+ UUIDUtils.getUUID() + ".swf", resourceId, "txt2swf");
                fileUploadCycoreServiceImpl.file2swfConvert(urlFile, outDestination + "/"+ resourceCode + "/"+ UUIDUtils.getUUID() + ".swf", resourceId, "txt2swf", 1, 5);
            } else if (".mp4".equals(fileFormat)|| ".3gp".equals(fileFormat) || ".asf".equals(fileFormat) || ".avi".equals(fileFormat) ||
            		".rmvb".equals(fileFormat) || ".mpeg".equals(fileFormat) || ".wmv".equals(fileFormat) || ".rm".equals(fileFormat) || 
            		".mpeg4".equals(fileFormat) || ".mov".equals(fileFormat) || ".flv".equals(fileFormat) || ".vob".equals(fileFormat) || 
            		".mkv".equals(fileFormat) || ".asf".equals(fileFormat) || ".mpg".equals(fileFormat) ) {
                resourceFile.setId(id);
                param.put("fileType", 1);
                param.put("tResourceId", resourceId);
                List<ResourceFile> resourceFileList = resourceFileServiceImpl.selectResourceFile(new Object[]{param});
                if (resourceFileList.size() < 1) {
                    i = resourceFileServiceImpl.saveResourceFile(new Object[]{resourceFile});
                }

                param.put("fileType", 2);
                param.put("tResourceId", resourceId);
                resourceFileList = resourceFileServiceImpl.selectResourceFile(new Object[]{param});
                if (resourceFileList.size() < 1) {
                    id = UUIDUtils.getUUID();
                    resourceFile.setId(id);
                    resourceFile.setFileType("2");
                    i = resourceFileServiceImpl.saveResourceFile(new Object[]{resourceFile});
                }

                param.put("fileType", 3);
                param.put("tResourceId", resourceId);
                resourceFileList = resourceFileServiceImpl.selectResourceFile(new Object[]{param});
                if (resourceFileList.size() < 1) {
                    id = UUIDUtils.getUUID();
                    resourceFile.setId(id);
                    resourceFile.setFileType("3");
                    i = resourceFileServiceImpl.saveResourceFile(new Object[]{resourceFile});
                }

                fileUploadCycoreServiceImpl.file2imgConvert(urlFile, outDestination + "/"+ resourceCode + "/"+ UUIDUtils.getUUID() + ".jpg", resourceId, "video2img");
                fileUploadCycoreServiceImpl.video2videoConvert(urlFile, outDestination + "/"+ resourceCode + "/"+ UUIDUtils.getUUID() + ".mp4", resourceId, null, null, "video2video", 2);
            	fileUploadCycoreServiceImpl.video2videoConvert(urlFile, outDestination + "/"+ resourceCode + "/"+ UUIDUtils.getUUID() + ".mp4", resourceId, videoStart, videoEnd, "video2video", 3);
    		}else if (".jpg".equals(fileFormat) || ".jpeg".equals(fileFormat) || ".gif".equals(fileFormat) ||
                      ".png".equals(fileFormat) || ".bmp".equals(fileFormat) || ".dib".equals(fileFormat) ||
                      ".jpe".equals(fileFormat) || ".jfif".equals(fileFormat) || ".tif".equals(fileFormat) || ".tiff".equals(fileFormat)){

                String update_url = "";
                if(urlFile != null && urlFile != ""){
                    update_url = urlFile;
                    for(int k = 0; k < 3; k++){
                        update_url = update_url.substring(update_url.indexOf("/") + 1);
                    }
                    update_url = "/" + update_url;
                }

                resourceFile.setFilePath(update_url);
                resourceFile.setId(id);
                resourceFile.setState("3");

                param.put("fileType", 1);
                param.put("tResourceId", resourceId);
                List<ResourceFile> resourceFileList = resourceFileServiceImpl.selectResourceFile(new Object[]{param});
                if (resourceFileList.size() < 1) {
                    i = resourceFileServiceImpl.saveResourceFile(new Object[]{resourceFile});
                }
                param.put("fileType", 3);
                param.put("tResourceId", resourceId);
                resourceFileList = resourceFileServiceImpl.selectResourceFile(new Object[]{param});
                if (resourceFileList.size() < 1) {
                    id = UUIDUtils.getUUID();
                    resourceFile.setId(id);
                    resourceFile.setFileType("3");
                    i = resourceFileServiceImpl.saveResourceFile(new Object[]{resourceFile});
                }

                //更新记录的保存路径
                ResourceInfoVo riv = new ResourceInfoVo();
                riv.setId(resourceId);
                riv.setFilePath(update_url);
                resourceInfoServiceImpl.updateResourceInfo(riv);

                UploadPercent.thisPercent.put(resourceId, 1);
                UploadPercent.totalPercent.put(resourceId, 1);
            }
            //urlFile.substring(beginIndex)
            String url = urlFile.replace("http://", "");
            param.put("cyFilePath", url.substring(url.indexOf("/")));
            param.put("relateId", resourceId);
            resourceFileServiceImpl.updateTFileCycorePath(new Object[]{param});
            data.put("data", i);
            if(i > 0) {
                result = "操作成功";
            }else {
                result = "操作失败";
            }
            return this.doSuccess(result, data);
        }catch(Exception e){
            e.printStackTrace();
            result = "出错了";
            return this.doError(result);
        }
    }

}
