package com.jsrm.web.controller.resourceFileInfo;

import com.jsrm.base.common.BaseRestController;
import com.jsrm.base.common.PageVO;
import com.jsrm.base.utils.UUIDUtils;
import com.jsrm.model.resourceInfo.ResourceInfo;
import com.jsrm.service.ResourceInfo.ResourceInfoService;
import com.jsrm.service.fileUpload.FileUploadCycoreService;
import com.jsrm.service.fileUpload.impl.FileUploadCycoreServiceImpl;
import com.jsrm.service.resourceFile.ResourceFileService;
import com.jsrm.service.resourceFileInfo.ResourceFileInfoService;
import com.jsrm.web.vo.ResourceInfoVo.ResourceInfoVo;
import com.jsrm.web.vo.resourceFileVo.ResourceFileInfoVo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.*;

/**
 * Created by jichao on 2017/3/1.
 */
@Controller()
@RequestMapping("/resourceFileInfo")
public class ResourceFileInfoController extends BaseRestController {

    @Resource
    private ResourceFileInfoService resourceFileInfoServiceImpl;

    @Resource
    private ResourceInfoService resourceInfoServiceImpl;

    @Resource
    private FileUploadCycoreService fileUploadCycoreServiceImpl;

    @Resource
    private ResourceFileService resourceFileServiceImpl;


    @RequestMapping(method ={RequestMethod.GET, RequestMethod.POST}, value = "/selectListForPage", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String selectListForPage(@RequestParam(value = "pageNo", required = false, defaultValue = "1") Integer pageNo,
                                    @RequestParam(value = "pageSize", required = false, defaultValue = "10") Integer pageSize,
                                    String resourceName) {
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("resourceName", resourceName);
            PageVO<ResourceFileInfoVo> dataList = resourceFileInfoServiceImpl.selectListForPage(pageNo, pageSize, new Object[]{params});
            Map<String, Object> data = new HashMap<String, Object>();
            data.put("data", dataList);
            return this.doSuccess("success", data);
        } catch (Exception e) {
            e.printStackTrace();
            return this.doError("error");
        }
    }

    @RequestMapping(method ={RequestMethod.GET, RequestMethod.POST}, value = "/transform", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String transform(String id, Integer fileType) {

        try{
            InputStream in = FileUploadCycoreServiceImpl.class.getClassLoader().getResourceAsStream("config/application.properties");
            BufferedReader bf = new BufferedReader(new InputStreamReader(in, "utf-8"));
            Properties properties = new Properties();
            properties.load(bf);

            String outDestination = properties.getProperty("file.outDestination");
            Integer videoStart = Integer.valueOf(properties.getProperty("file.videoStart"));
            Integer videoEnd = Integer.valueOf(properties.getProperty("file.videoEnd"));
            String url = properties.getProperty("file.downloadFile");

            ResourceInfoVo resourceInfoVo = new ResourceInfoVo();
            resourceInfoVo.setId(id);
            ResourceInfo resourceInfo = resourceInfoServiceImpl.queryResourceInfoById(resourceInfoVo);

            String resourceCode = resourceInfo.gettResourceCode();
            String filePath = resourceInfo.getFilePath();
            String fileFormat = filePath.substring(filePath.lastIndexOf("."));

            String urlFile = url + filePath;

            if(".docx".equals(fileFormat) || ".doc".equals(fileFormat) ){
                if(fileType == 1) fileUploadCycoreServiceImpl.file2imgConvert(urlFile, outDestination + "/" + resourceCode + "/" + UUIDUtils.getUUID() + ".jpg", id, "word2img");
                else if(fileType == 2) fileUploadCycoreServiceImpl.file2swfConvert(urlFile, outDestination + "/"+ resourceCode + "/"+ UUIDUtils.getUUID() + ".swf", id, "word2swf");
                else if(fileType == 3) fileUploadCycoreServiceImpl.file2swfConvert(urlFile, outDestination + "/"+ resourceCode + "/"+ UUIDUtils.getUUID() + ".swf", id, "word2swf", 1, 5);
            }else if (".xls".equals(fileFormat) || ".xlsx".equals(fileFormat)) {
                if(fileType == 2) fileUploadCycoreServiceImpl.file2swfConvert(urlFile, outDestination + "/"+ resourceCode + "/"+ UUIDUtils.getUUID() + ".swf", id, "excel2swf");
            }else if(".pptx".equals(fileFormat)|| ".ppt".equals(fileFormat) ){
                if(fileType == 1) fileUploadCycoreServiceImpl.file2imgConvert(urlFile, outDestination + "/"+ resourceCode + "/"+ UUIDUtils.getUUID() + ".jpg", id, "ppt2img");
                else if(fileType == 2) fileUploadCycoreServiceImpl.file2swfConvert(urlFile, outDestination + "/"+ resourceCode + "/"+ UUIDUtils.getUUID() + ".swf", id, "ppt2swf");
                else if(fileType == 3) fileUploadCycoreServiceImpl.file2swfConvert(urlFile, outDestination + "/"+ resourceCode + "/"+ UUIDUtils.getUUID() + ".swf", id, "ppt2swf", 1, 5);
            }else if(".pdf".equals(fileFormat)){
                if(fileType == 1) fileUploadCycoreServiceImpl.file2imgConvert(urlFile, outDestination + "/"+ resourceCode + "/"+ UUIDUtils.getUUID() + ".jpg", id, "pdf2img");
                else if(fileType == 2) fileUploadCycoreServiceImpl.file2swfConvert(urlFile, outDestination + "/"+ resourceCode + "/"+ UUIDUtils.getUUID() + ".swf", id, "pdf2swf");
                else if(fileType == 3) fileUploadCycoreServiceImpl.file2swfConvert(urlFile, outDestination + "/"+ resourceCode + "/"+ UUIDUtils.getUUID() + ".swf", id, "pdf2swf", 1, 5);
            }else if (".txt".equals(fileFormat)) {
                if (fileType == 1)
                    fileUploadCycoreServiceImpl.file2imgConvert(urlFile, outDestination + "/" + resourceCode + "/" + UUIDUtils.getUUID() + ".jpg", id, "txt2img");
                else if (fileType == 2)
                    fileUploadCycoreServiceImpl.file2swfConvert(urlFile, outDestination + "/" + resourceCode + "/" + UUIDUtils.getUUID() + ".swf", id, "txt2swf");
                else if (fileType == 3)
                    fileUploadCycoreServiceImpl.file2swfConvert(urlFile, outDestination + "/" + resourceCode + "/" + UUIDUtils.getUUID() + ".swf", id, "txt2swf", 1, 5);
            }else if (".mp4".equals(fileFormat)|| ".3gp".equals(fileFormat) || ".asf".equals(fileFormat) || ".avi".equals(fileFormat) ||
                    ".rmvb".equals(fileFormat) || ".mpeg".equals(fileFormat) || ".wmv".equals(fileFormat) || ".rm".equals(fileFormat) ||
                    ".mpeg4".equals(fileFormat) || ".mov".equals(fileFormat) || ".flv".equals(fileFormat) || ".vob".equals(fileFormat) ||
                    ".mkv".equals(fileFormat) || ".asf".equals(fileFormat) || ".mpg".equals(fileFormat) ) {
                if(fileType == 1) fileUploadCycoreServiceImpl.file2imgConvert(urlFile, outDestination + "/"+ resourceCode + "/"+ UUIDUtils.getUUID() + ".jpg", id, "video2img");
                else if(fileType == 2) fileUploadCycoreServiceImpl.video2videoConvert(urlFile, outDestination + "/"+ resourceCode + "/"+ UUIDUtils.getUUID() + ".mp4", id, null, null, "video2video", 2);
                else if(fileType == 3) fileUploadCycoreServiceImpl.video2videoConvert(urlFile, outDestination + "/"+ resourceCode + "/"+ UUIDUtils.getUUID() + ".mp4", id, videoStart, videoEnd, "video2video", 3);
            }

            Map<String, Object> param = new HashMap<String, Object>();
            param.put("cyFilePath", filePath);
            param.put("relateId", id);
            Integer i = resourceFileServiceImpl.updateTFileCycorePath(new Object[]{param});

            Map<String, Object> data = new HashMap<String, Object>();
            data.put("data", i);
            return this.doSuccess(null, data);

        } catch(Exception e){
            e.printStackTrace();
            return this.doError(null);
        }

    }

    @RequestMapping(method ={RequestMethod.GET, RequestMethod.POST}, value = "/transformAll", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public void transformAll() {

        try {
            InputStream in = FileUploadCycoreServiceImpl.class.getClassLoader().getResourceAsStream("config/application.properties");
            BufferedReader bf = new BufferedReader(new InputStreamReader(in, "utf-8"));
            Properties properties = new Properties();
            properties.load(bf);

            String outDestination = properties.getProperty("file.outDestination");
            Integer videoStart = Integer.valueOf(properties.getProperty("file.videoStart"));
            Integer videoEnd = Integer.valueOf(properties.getProperty("file.videoEnd"));
            String url = properties.getProperty("file.downloadFile");

            List<ResourceInfoVo> list = resourceInfoServiceImpl.selectResourceInfoVo();
            Iterator<ResourceInfoVo> it = list.iterator();
            while (it.hasNext()) {
                ResourceInfoVo resourceInfo = it.next();
                String resourceCode = resourceInfo.gettResourceCode();
                String filePath = resourceInfo.getFilePath();
                String fileFormat = filePath.substring(filePath.lastIndexOf("."));

                Integer fileType = resourceInfo.getFileType();
                String id = resourceInfo.getId();

                String urlFile = url + filePath;

                if (".docx".equals(fileFormat) || ".doc".equals(fileFormat)) {
                    if (fileType == 1)
                        fileUploadCycoreServiceImpl.file2imgConvert(urlFile, outDestination + "/" + resourceCode + "/" + UUIDUtils.getUUID() + ".jpg", id, "word2img");
                    else if (fileType == 2)
                        fileUploadCycoreServiceImpl.file2swfConvert(urlFile, outDestination + "/" + resourceCode + "/" + UUIDUtils.getUUID() + ".swf", id, "word2swf");
                    else if (fileType == 3)
                        fileUploadCycoreServiceImpl.file2swfConvert(urlFile, outDestination + "/" + resourceCode + "/" + UUIDUtils.getUUID() + ".swf", id, "word2swf", 1, 5);
                } else if (".xls".equals(fileFormat) || ".xlsx".equals(fileFormat)) {
                    if (fileType == 2)
                        fileUploadCycoreServiceImpl.file2swfConvert(urlFile, outDestination + "/" + resourceCode + "/" + UUIDUtils.getUUID() + ".swf", id, "excel2swf");
                } else if (".pptx".equals(fileFormat) || ".ppt".equals(fileFormat)) {
                    if (fileType == 1)
                        fileUploadCycoreServiceImpl.file2imgConvert(urlFile, outDestination + "/" + resourceCode + "/" + UUIDUtils.getUUID() + ".jpg", id, "ppt2img");
                    else if (fileType == 2)
                        fileUploadCycoreServiceImpl.file2swfConvert(urlFile, outDestination + "/" + resourceCode + "/" + UUIDUtils.getUUID() + ".swf", id, "ppt2swf");
                    else if (fileType == 3)
                        fileUploadCycoreServiceImpl.file2swfConvert(urlFile, outDestination + "/" + resourceCode + "/" + UUIDUtils.getUUID() + ".swf", id, "ppt2swf", 1, 5);
                } else if (".pdf".equals(fileFormat)) {
                    if (fileType == 1)
                        fileUploadCycoreServiceImpl.file2imgConvert(urlFile, outDestination + "/" + resourceCode + "/" + UUIDUtils.getUUID() + ".jpg", id, "pdf2img");
                    else if (fileType == 2)
                        fileUploadCycoreServiceImpl.file2swfConvert(urlFile, outDestination + "/" + resourceCode + "/" + UUIDUtils.getUUID() + ".swf", id, "pdf2swf");
                    else if (fileType == 3)
                        fileUploadCycoreServiceImpl.file2swfConvert(urlFile, outDestination + "/" + resourceCode + "/" + UUIDUtils.getUUID() + ".swf", id, "pdf2swf", 1, 5);
                }else if (".txt".equals(fileFormat)) {
                    if (fileType == 1)
                        fileUploadCycoreServiceImpl.file2imgConvert(urlFile, outDestination + "/" + resourceCode + "/" + UUIDUtils.getUUID() + ".jpg", id, "txt2img");
                    else if (fileType == 2)
                        fileUploadCycoreServiceImpl.file2swfConvert(urlFile, outDestination + "/" + resourceCode + "/" + UUIDUtils.getUUID() + ".swf", id, "txt2swf");
                    else if (fileType == 3)
                        fileUploadCycoreServiceImpl.file2swfConvert(urlFile, outDestination + "/" + resourceCode + "/" + UUIDUtils.getUUID() + ".swf", id, "txt2swf", 1, 5);
                } else if (".mp4".equals(fileFormat) || ".3gp".equals(fileFormat) || ".asf".equals(fileFormat) || ".avi".equals(fileFormat) ||
                        ".rmvb".equals(fileFormat) || ".mpeg".equals(fileFormat) || ".wmv".equals(fileFormat) || ".rm".equals(fileFormat) ||
                        ".mpeg4".equals(fileFormat) || ".mov".equals(fileFormat) || ".flv".equals(fileFormat) || ".vob".equals(fileFormat) ||
                        ".mkv".equals(fileFormat) || ".asf".equals(fileFormat) || ".mpg".equals(fileFormat)) {
                    if (fileType == 1)
                        fileUploadCycoreServiceImpl.file2imgConvert(urlFile, outDestination + "/" + resourceCode + "/" + UUIDUtils.getUUID() + ".jpg", id, "video2img");
                    else if (fileType == 2)
                        fileUploadCycoreServiceImpl.video2videoConvert(urlFile, outDestination + "/" + resourceCode + "/" + UUIDUtils.getUUID() + ".mp4", id, null, null, "video2video", 2);
                    else if (fileType == 3)
                        fileUploadCycoreServiceImpl.video2videoConvert(urlFile, outDestination + "/" + resourceCode + "/" + UUIDUtils.getUUID() + ".mp4", id, videoStart, videoEnd, "video2video", 3);
                }

                Map<String, Object> param = new HashMap<String, Object>();
                param.put("cyFilePath", filePath);
                param.put("relateId", id);
                resourceFileServiceImpl.updateTFileCycorePath(new Object[]{param});

            }

            System.out.println("now over");


        } catch (Exception e) {
            e.printStackTrace();
        }

    }

}
