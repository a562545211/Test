package com.jsrm.service.ResourceInfo.impl;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.common.PageVO;
import com.jsrm.base.service.impl.BaseSupportServiceImpl;
import com.jsrm.base.utils.BaseUtils;
import com.jsrm.base.utils.UUIDUtils;
import com.jsrm.model.resourceInfo.ResourceInfo;
import com.jsrm.model.resourceInfo.ResourceMidCategories;
import com.jsrm.service.ResourceInfo.ResourceInfoService;
import com.jsrm.web.vo.ResourceInfoVo.ResourceInfoVo;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 资源service实现
 * Created by wdCao on 2016/10/13.
 */
@Service
public class ResourceInfoServiceImpl extends BaseSupportServiceImpl implements ResourceInfoService {

    @Value("${file.downloadFile}")
    private String host;

    @Override
    public PageVO<ResourceInfo> queryResourceList(int pageNo, int pageSize, Object[] parameArrayList) throws BusinessException {
        return this.getDao().pagedQuery("resourceInfo.selectAll", pageNo, pageSize,parameArrayList);
    }

    @Override
    public PageVO<ResourceInfo> queryAllResourceList(int pageNo, int pageSize, Object[] parameArrayList) throws BusinessException {
        return this.getDao().pagedQuery("resourceInfo.selectAllRes", pageNo, pageSize,parameArrayList);
    }

    @Override
    public List<ResourceInfo> getNewResourceList(Map<String, Object> map) throws BusinessException {
        return this.getDao().selectList("resourceInfo.getNewResourceList",new Object[]{map});
    }

    @Override
    public PageVO<ResourceInfo> queryAllResourceList(int pageNo, int pageSize, ResourceInfoVo resourceInfoVo) throws BusinessException {
        Map<String, Object> data = new HashMap<String, Object>();
        BaseUtils.copyMap(data, resourceInfoVo);

//        List<String> types = new ArrayList<String>();
//        types.add("ORI");
//        types.add("PRO");
//        types.add("END");
//        data.put("resourceType", types);

        return this.getDao().pagedQuery("resourceInfo.selectAllRes", pageNo, pageSize, new Object[]{data});
    }

    /**
     * 根据资源id查询资源信息
     * @param resourceInfoVo
     * @return
     * @throws BusinessException
     */
    @Override
    public ResourceInfo queryResourceInfoById(ResourceInfoVo resourceInfoVo) throws BusinessException {

        ResourceInfo resourceInfo = null;
        Map<String, Object> data = new HashMap<String, Object>();
        try {
            BaseUtils.copyMap(data, resourceInfoVo);
            resourceInfo = this.getDao().selectOne("resourceInfo.selectOne", new Object[]{data});
        } catch (Exception e) {
            throw new BusinessException(e.getMessage());
        }

        return resourceInfo;
    }

    @Override
    public ResourceInfoVo queryResourceInfoById2(ResourceInfoVo resourceInfoVo) throws BusinessException {
        ResourceInfoVo resourceInfo = null;
        Map<String, Object> data = new HashMap<String, Object>();
        try {
            BaseUtils.copyMap(data, resourceInfoVo);
            resourceInfo = this.getDao().selectOne("resourceInfo.selectOne2", new Object[]{data});
        } catch (Exception e) {
            throw new BusinessException(e.getMessage());
        }

        return resourceInfo;
    }

    @Override
    public void saveResourceInfo(ResourceInfoVo resourceInfoVo) throws BusinessException {
        ResourceInfo resourceInfo = new ResourceInfo();
        BaseUtils.copyProperties(resourceInfo, resourceInfoVo);

        this.getDao().insert("resourceInfo.saveResourceInfo", new Object[]{resourceInfo});
    }

    @Override
    public void updateResourceInfo(ResourceInfoVo resourceInfoVo) throws BusinessException {
        Map<String, Object> data = new HashMap<String, Object>();
        BaseUtils.copyMap(data, resourceInfoVo);
        this.getDao().update("resourceInfo.updateResourceInfo", new Object[]{data});
    }

    @Override
    public void deleteResources(ResourceInfoVo resourceInfoVo) throws BusinessException {
        if(StringUtils.isNotBlank(resourceInfoVo.getDeleteIds())) {
            String[] ids = StringUtils.split(resourceInfoVo.getDeleteIds(), ",");
            List<String> sqls = new ArrayList<String>();

            String sql;
            for(String id : ids) {
                sql = "UPDATE t_resource_info SET deleteState=state,state='0' WHERE id='" + id + "'";
                sqls.add(sql);
            }

            if(sqls.size() > 0) {
                try {
                    this.getDao().execBatchJDBC(sqls);
                } catch (SQLException e) {
                    throw new BusinessException(e.getMessage());
                }
            }
        }
    }

    @Override
    public Integer saveResourceMidCategories(String busiId, String tCategoriesIds) throws BusinessException {
        List<ResourceMidCategories> list = new ArrayList<ResourceMidCategories>();
        String[] split = tCategoriesIds.split(",");
        for (int i = 0; i < split.length; i++) {
            ResourceMidCategories rmc = new ResourceMidCategories();
            rmc.setId(UUIDUtils.getUUID());
            rmc.setBusiId(busiId);
            String tCategoriesId = null;
            if(i < 4){
                tCategoriesId = split[i].split("-")[i];
            }else{
                tCategoriesId = split[i];
            }
            rmc.settCategoriesId(tCategoriesId);
            rmc.setCategDeep(String.valueOf(i + 1));
            list.add(rmc);
        }
        return this.getDao().insert("resourceInfo.saveResourceMidCategories", new Object[]{list});
    }

    @Override
    public Integer deleteResourceMidCategories(String busiId) throws BusinessException {
        return this.getDao().delete("resourceInfo.deleteResourceMidCategories", new Object[]{busiId});
    }

    @Override
    public void download(HttpServletRequest request, HttpServletResponse response, String id) throws Exception {
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("id", id);
        ResourceInfo resourceInfo = this.getDao().selectOne("resourceInfo.selectOne", new Object[]{param});
        if(resourceInfo != null){
            String flieUrl = host + resourceInfo.getFilePath();
            String fileName = resourceInfo.getFileName().replaceAll(" ", "");
            //fileName = URLEncoder.encode(fileName,"GBK");
            //String fileName = new String(resourceInfo.getFileName().replaceAll(" ", "").getBytes(), "utf-8");
            int bytesum = 0;
            int byteread = 0;
            URL url;
            InputStream inStream = null;
            ServletOutputStream fs = null;
            try {
                url = new URL(flieUrl);
                String userAgent = request.getHeader("User-Agent");
                boolean isMSIE = userAgent != null && (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("like Gecko") > -1);
                if (isMSIE) {
                    fileName= URLEncoder.encode(fileName, "UTF8");
                } else {
                    fileName= new String(fileName.getBytes("UTF-8"), "ISO-8859-1");
                }
                response.setHeader("Content-Disposition", "attachment;fileName=" + fileName);
                URLConnection conn = url.openConnection();
                inStream = conn.getInputStream();
                fs = response.getOutputStream();
                byte[] buffer = new byte[2048];
                while ((byteread = inStream.read(buffer)) != -1) {
                    bytesum += byteread;
                    System.out.println(bytesum);
                    fs.write(buffer, 0, byteread);
                }
            } finally {
                if(inStream != null){

                        inStream.close();

                }
                if(fs != null){

                        fs.close();

                }
            }
        }
    }

    @Override
    public List<ResourceInfo> selectOldResourceInfo() throws Exception {
        return this.getDao().selectList("resourceInfo.selectOldResourceInfo", null);
    }

    @Override
    public List<ResourceInfoVo> selectResourceInfoVo() throws Exception {
        return this.getDao().selectList("resourceFileInfo.selectResourceInfoVo", null);
    }

    @Override
    public List<ResourceInfo> selectStorage() throws Exception {
        return this.getDao().selectList("resourceInfo.selectStorage", null);
    }

    public static void main(String args[]){
        String aaa = "111-22";
        String[] split = aaa.split(",");
        System.out.println(split[0]);
    }
}
