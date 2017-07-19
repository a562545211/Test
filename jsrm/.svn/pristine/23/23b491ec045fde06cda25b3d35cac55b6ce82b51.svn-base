package com.jsrm.web.controller.fileUpLoad;

import com.jsrm.base.common.BaseController;
import com.jsrm.base.common.BusinessException;
import com.jsrm.base.utils.BaseUtils;
import com.jsrm.base.utils.UUIDUtils;
import com.jsrm.base.utils.UploadPercent;
import com.jsrm.model.fileUpload.FileInfo;
import com.jsrm.model.resourceInfo.ResourceInfo;
import com.jsrm.service.ResourceInfo.ResourceInfoService;
import com.jsrm.service.fileUpload.FileUploadCycoreService;
import com.jsrm.service.fileUpload.FileUploadService;
import com.jsrm.web.vo.ResourceInfoVo.ResourceInfoVo;
import com.jsrm.web.vo.fileUpload.FileInfoVo;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * 文件上传
 * Created by wdCao on 2016/10/10.
 */
@Controller()
@RequestMapping("fileUpload")
public class FileUploadController extends BaseController {

    Log log = LogFactory.getLog(FileUploadController.class);        //log对象

    @Value("${file.basepath}")
    private String fileBasePath;

    @Resource
    private FileUploadService fileUploadService;

    @Resource
    private ResourceInfoService resourceInfoService;

    @Autowired
    private FileUploadCycoreService fileUploadCycoreServiceImpl;

    /**
     * 获取上传文件信息
     * @param fileInfoVo
     * @return
     */
    @RequestMapping("/getUploadFileInfo")
    @ResponseBody
    public Map getUploadFileInfo(FileInfoVo fileInfoVo) {
        FileInfo fileInfo = fileUploadService.getFileInfo(fileInfoVo);

        Map<String, Object> dataMap = new HashMap<String, Object>();
        BaseUtils.copyMap(dataMap, fileInfo);

        return dataMap;
    }

    /**
     * 获取已上传的文件大小
     * @param request
     */
    @RequestMapping("/getChunkedFileSize")
    @ResponseBody
    public Map getChunkedFileSize(HttpServletRequest request, FileInfoVo fileInfoVo) {
        Map<String, Object> result = new HashMap<String, Object>();
        fileInfoVo.setFileLength("-1");

        try {
            File file = new File(fileBasePath + fileInfoVo.getFilePath() + fileInfoVo.getFileReName() + "." + fileInfoVo.getRelateId());
            if(file.exists()){

                if(file.length() != 0) {
                    fileInfoVo.setFileLength(""+file.length());
                }
            }
        } catch (Exception e) {
            log.error("获取已上传的文件大小失败!" + e.getMessage());
        }

        BaseUtils.copyMap(result, fileInfoVo);
        return result;
    }

    /**
     * 创建文件信息
     * @return
     */
    @RequestMapping("/getFileInfo")
    @ResponseBody
    public Map getFileInfo(FileInfoVo fileInfoVo) throws Exception {
        fileInfoVo = getFileReNameByFileInfo(fileInfoVo);       //重命名文件及创建文件目录

        File filePath = new File(fileBasePath + fileInfoVo.getFilePath());
        if(!filePath.exists()) {        //如果目录不存在，则先创建目录
            filePath.mkdirs();
        }

        RandomAccessFile randomAccessfile = new RandomAccessFile(fileBasePath + fileInfoVo.getFilePath() +  fileInfoVo.getFileReName() + "." + fileInfoVo.getRelateId(), "rw");
        randomAccessfile.close();
        randomAccessfile = null;


        fileInfoVo.setState("1");
        fileInfoVo.setId(UUIDUtils.getUUID());
        fileUploadService.addFileUpload(fileInfoVo);            //插入附件表

        HashMap<String, Object> result = new HashMap<String, Object>();
        BaseUtils.copyMap(result, fileInfoVo);

        return result;
    }

    /**
     * 断点文件上传 1.先判断断点文件是否存在 2.存在直接流上传 3.不存在直接新创建一个文件 4.上传完成以后设置文件名称
     */
    @RequestMapping("/appendUpload2Server")
    public void appendUpload2Server(HttpServletRequest request, HttpServletResponse response, FileInfoVo fileInfoVo) {
        PrintWriter print = null;
        try {
            request.setCharacterEncoding("utf-8");
            print = response.getWriter();
            long totalSize = Long.parseLong(fileInfoVo.getFileSize());
            RandomAccessFile randomAccessfile = null;
            long currentFileLength = 0;         //记录当前文件大小，用于判断文件是否上传完成
            File file = new File(fileBasePath + fileInfoVo.getFilePath() +  fileInfoVo.getFileReName() + "." + fileInfoVo.getRelateId());

            if(file.exists()){      // 如果文件存在
                randomAccessfile = new RandomAccessFile(fileBasePath + fileInfoVo.getFilePath() +  fileInfoVo.getFileReName() + "." + fileInfoVo.getRelateId(), "rw");

                InputStream in = request.getInputStream();      // 开始文件传输
                randomAccessfile.seek(randomAccessfile.length());
                byte b[] = new byte[1024];
                int n;
                while ((n = in.read(b)) != -1) {
                    randomAccessfile.write(b, 0, n);
                }

                currentFileLength = randomAccessfile.length();

                closeRandomAccessFile(randomAccessfile);    // 关闭文件
                randomAccessfile = null;

                if (currentFileLength == totalSize) {       // 整个文件上传完成,修改文件后缀

                    ResourceInfoVo resourceInfo = new ResourceInfoVo();
                    resourceInfo.setId(fileInfoVo.getRelateId());
                    ResourceInfo ri = resourceInfoService.queryResourceInfoById(resourceInfo);
                    if(ri == null) {
                        return;
                    }

                    fileInfoVo.setResourceCode(ri.gettResourceCode());

                    File oldFile = new File(fileBasePath + fileInfoVo.getFilePath() +  fileInfoVo.getFileReName()+ "." + fileInfoVo.getRelateId());
                    File newFile = new File(fileBasePath + fileInfoVo.getFilePath() +  fileInfoVo.getFileReName() + fileInfoVo.getFileFormat());
                    if(!oldFile.exists()){
                        return;             //重命名文件不存在
                    }

                    if(!oldFile.renameTo(newFile)){
                        oldFile.delete();
                    }

                    cn.cycore.cystorage.sdk.models.FileInfo fileInfo = fileUploadCycoreServiceImpl.completeUpload(newFile.getAbsolutePath(), fileInfoVo.getRelateId(), fileInfoVo.getFileFormat(), fileInfoVo.getResourceCode(), null);

                    String update_url = fileInfo.getUrl();
                    if(update_url != null && update_url != ""){
                        for(int k = 0; k < 3; k++){
                            update_url = update_url.substring(update_url.indexOf("/") + 1);
                        }
                        update_url = "/" + update_url;
                    }

                    fileInfoVo.setFilePath(update_url);

                    updateResourceFileInfo(fileInfoVo);

                }

                print.print(currentFileLength);
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new BusinessException(e.getMessage());
        }
    }

    /**
     * 关闭随机访问文件
     */
    public void closeRandomAccessFile(RandomAccessFile rfile) {
        if (null != rfile) {
            try {
                rfile.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 获取附件别名及filePath
     * @param fileInfoVo
     * @return
     */
    public FileInfoVo getFileReNameByFileInfo(FileInfoVo fileInfoVo) {

        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        String[] dateFomat = format.format(new Date()).split("-");

        String path = File.separatorChar + dateFomat[0] + File.separatorChar + dateFomat[1] + File.separatorChar + dateFomat[2] + File.separatorChar;
        fileInfoVo.setFilePath(path);
        if(StringUtils.isNotBlank(fileInfoVo.getFileName())) {
            String fileName = fileInfoVo.getFileName();
            fileInfoVo.setFileFormat(fileName.substring(fileName.lastIndexOf(".")));
        }

        fileInfoVo.setFileReName(UUIDUtils.getUUID());

        return fileInfoVo;
    }

    /**
     * 更新资源信息
     * @param fileInfoVo
     */
    public void updateResourceFileInfo(FileInfoVo fileInfoVo) {
        if(StringUtils.equals(fileInfoVo.getRelateType(), "ORI") || StringUtils.equals(fileInfoVo.getRelateType(), "PRO") || StringUtils.equals(fileInfoVo.getRelateType(), "END")) {       //如果是资源相关附件，则更新附件表信息
            ResourceInfoVo resourceInfoVo = new ResourceInfoVo();
            resourceInfoVo.setId(fileInfoVo.getRelateId());
            resourceInfoVo.setFilePath(fileInfoVo.getFilePath()+fileInfoVo.getFileReName() + fileInfoVo.getFileFormat());
            resourceInfoVo.settFileId(fileInfoVo.getId());
            resourceInfoVo.setFileSize(fileInfoVo.getFileSize());
            resourceInfoVo.setFileName(fileInfoVo.getFileName());
            resourceInfoVo.setFilePath(fileInfoVo.getFilePath());

            resourceInfoService.updateResourceInfo(resourceInfoVo);     //更新资源信息
        }
    }

}
