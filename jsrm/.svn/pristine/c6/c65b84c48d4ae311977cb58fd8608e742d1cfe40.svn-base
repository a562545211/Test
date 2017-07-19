package com.jsrm.web.controller.fileUpLoad;

import cn.cycore.cystorage.sdk.models.FileInfo;
import com.jsrm.base.common.BaseRestController;
import com.jsrm.model.resourceFile.ResourceFile;
import com.jsrm.model.resourceInfo.ResourceInfo;
import com.jsrm.service.ResourceInfo.ResourceInfoService;
import com.jsrm.service.fileUpload.FileUploadCycoreService;
import com.jsrm.service.resourceFile.ResourceFileService;
import com.jsrm.web.vo.ResourceInfoVo.ResourceInfoVo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.io.File;
import java.util.Iterator;
import java.util.List;

/**
 * Created by jichao on 2017/1/21.
 */
@Controller()
@RequestMapping("/temporary")
public class TemporaryController extends BaseRestController {

    @Value("${file.basepath}")
    private String oldUrl;

    @Value("${file.storageFile}")
    private String storageUrl;

    @Resource
    private ResourceInfoService resourceInfoServiceImpl;

    @Resource
    private FileUploadCycoreService fileUploadCycoreServiceImpl;

    @Resource
    private ResourceFileService resourceFileServiceImpl;

    @Resource
    private CallBackController callBackController;

    @RequestMapping(method ={RequestMethod.GET, RequestMethod.POST}, value = "/uploadToServer", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public void uploadToServer() {
        try {
            List<ResourceInfo> list = resourceInfoServiceImpl.selectOldResourceInfo();
            Iterator<ResourceInfo> it = list.iterator();
            int i = 0;
            while (it.hasNext()){
                ResourceInfo resourceInfo = it.next();
                String filePath = resourceInfo.getFilePath();
                String suffix = filePath.substring(filePath.lastIndexOf("."));
                File file = new File(oldUrl + resourceInfo.getFilePath());
                FileInfo fileInfo = fileUploadCycoreServiceImpl.completeUpload(file.getAbsolutePath(), resourceInfo.getId(), suffix, resourceInfo.gettResourceCode(), null);

                String update_url = fileInfo.getUrl();
                if(update_url != null && update_url != ""){
                    for(int k = 0; k < 3; k++){
                        update_url = update_url.substring(update_url.indexOf("/") + 1);
                    }
                    update_url = "/" + update_url;
                }

                ResourceInfoVo resourceInfoVo = new ResourceInfoVo();
                resourceInfoVo.setId(resourceInfo.getId());
                resourceInfoVo.setFilePath(update_url);
                resourceInfoServiceImpl.updateResourceInfo(resourceInfoVo);
                System.out.println("====================" + i++);

            }
            System.out.println("complete upload!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 转换成swift路径
     */
    @RequestMapping(method ={RequestMethod.GET, RequestMethod.POST}, value = "/toSwift", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public void toSwift() {

        int total = 0, infoTotal = 0, fileTotal = 0, listTotal = 0;

        try {
            //1.查询info表和file表的id，filepath
            //info表
            List<ResourceInfo> infoList = resourceInfoServiceImpl.selectStorage();
            //file表
            List<ResourceFile> fileList = resourceFileServiceImpl.selectStorage();

            listTotal = infoList.size() + fileList.size();

            System.out.println("!!!!!!!!一共有" + listTotal + "条记录!!!!!!!!");

            Iterator<ResourceInfo> infoIterator = infoList.iterator();
            while(infoIterator.hasNext()){
                ResourceInfo info = infoIterator.next();
                String id = info.getId();
                String filePath = info.getFilePath();
                String fileName = filePath.split("/storageAdd/")[1];
                //下载到本地的路径
                String localPath = callBackController.downLoadFromUrl(storageUrl + filePath, fileName);
                //上传本地文件到swift
                FileInfo fileInfo = fileUploadCycoreServiceImpl.uploadToSwift(localPath);
                if(fileInfo != null){
                    String swiftUrl = fileInfo.getUrl();
                    swiftUrl = formatUrl(swiftUrl);
                    ResourceInfoVo resourceInfoVo = new ResourceInfoVo();
                    resourceInfoVo.setId(id);
                    resourceInfoVo.setFilePath(swiftUrl);
                    resourceInfoServiceImpl.updateResourceInfo(resourceInfoVo);
                    System.out.println("@@@@@@@@info表更新了" + ++infoTotal + "条记录@@@@@@@@");
                    total++;
                }
            }

            Iterator<ResourceFile> fileIterator = fileList.iterator();
            while(fileIterator.hasNext()){
                ResourceFile file = fileIterator.next();
                String id = file.getId();
                String filePath = file.getFilePath();
                String fileName = filePath.split("/storageAdd/")[1];
                //下载到本地的路径
                String localPath = callBackController.downLoadFromUrl(storageUrl + filePath, fileName);
                //上传本地文件到swift
                FileInfo fileInfo = fileUploadCycoreServiceImpl.uploadToSwift(localPath);
                if(fileInfo != null){
                    String swiftUrl = fileInfo.getUrl();
                    swiftUrl = formatUrl(swiftUrl);
                    ResourceFile resourceFile = new ResourceFile();
                    resourceFile.setId(id);
                    resourceFile.setFilePath(swiftUrl);
                    resourceFileServiceImpl.updateResourceFilePath(resourceFile);
                    System.out.println("########file表更新了" + ++fileTotal + "条记录########");
                    total++;
                }
            }

            System.out.println("$$$$$$$$一共更新了" + total + "条记录$$$$$$$$");

        } catch (Exception e) {
            e.printStackTrace();
        }
        //2.下载这些文件到本地目录

        //3.调用上传到swift——成功后，通过id修改filepath为swift的存储路径
    }

    public String formatUrl(String url){
        if(url != null && !"".equals(url)){
            for(int k = 0; k < 3; k++){
                url = url.substring(url.indexOf("/") + 1);
            }
            url = "/" + url;
        }
        return url;
    }

    public static void main(String[] args){
        String aaa = "/storageAdd/sadfsxczvzcxv.doc";
        System.out.println(aaa.split("/storageAdd/")[1]);
    }


}
