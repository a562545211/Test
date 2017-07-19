package com.jsrm.service.selectTopic.impl;

import com.jsrm.base.common.BusinessException;
import com.jsrm.base.common.PageVO;
import com.jsrm.base.service.impl.BaseSupportServiceImpl;
import com.jsrm.base.utils.DateUtil;
import com.jsrm.model.catalog.Category;
import com.jsrm.model.catalog.CategoryDict;
import com.jsrm.model.resourceInfo.ResourceInfo;
import com.jsrm.service.ResourceInfo.ResourceInfoService;
import com.jsrm.service.catalog.category.CategoryService;
import com.jsrm.service.selectTopic.SelectTopicService;
import com.jsrm.web.vo.ResourceInfoVo.ResourceInfoVo;
import com.jsrm.web.vo.approve.ApproveHistoryVo;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import javax.annotation.Resource;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.HashSet;
import java.util.List;

/**
 * Created by jichao on 2016/10/17.
 */
@Service
class SelectTopicServiceImpl extends BaseSupportServiceImpl implements SelectTopicService {

    @Resource
    private CategoryService categoryService;
    @Resource
    private ResourceInfoService resourceInfoService;

    @Override
    public PageVO<ResourceInfo> querySelectTopicListForPage(int pageNo, int pageSize, Object[] param) throws BusinessException {
        return this.getDao().pagedQuery("selectTopic.querySelectTopicListForPage", pageNo, pageSize, param);
    }

    @Override
    public ResourceInfo querySelectTopicById(Object[] param) throws BusinessException {
        return this.getDao().selectOne("selectTopic.querySelectTopic", param);
    }

    @Override
    public Integer saveSelectTopic(Object[] param) throws BusinessException {
        Integer integer = 0, insert = 0;
        ResourceInfoVo resourceInfoVo = (ResourceInfoVo) param[0];
        String busiId = resourceInfoVo.getId();
        String tCategoriesIds = resourceInfoVo.getCategoresCode();
        insert = resourceInfoService.saveResourceMidCategories(busiId, tCategoriesIds);
        //if(insert > 0){
            integer = this.getDao().insert("selectTopic.saveSelectTopic", param);
        //}
        return integer;
    }

    @Override
    public Integer updateSelectTopic(Object[] param) throws BusinessException {
        Integer delete = 0, integer = 0, insert = 0;
        ResourceInfoVo resourceInfoVo = (ResourceInfoVo) param[0];
        String busiId = resourceInfoVo.getId();
        String tCategoriesIds = resourceInfoVo.getCategoresCode();
        delete = resourceInfoService.deleteResourceMidCategories(busiId);
        //if(delete > 0){
            insert = resourceInfoService.saveResourceMidCategories(busiId, tCategoriesIds);
            //if(insert > 0){
                integer = this.getDao().update("selectTopic.updateSelectTopic", param);
            //}
        //}
        return integer;
    }

    @Override
    public List<ResourceInfo> selectSelectTopicList(Object[] param) throws BusinessException {
        return this.getDao().selectList("selectTopic.selectSelectTopicList", param);
    }

    @Override
    public ResourceInfo selectSelectTopicById(Object[] param) throws BusinessException {
        return this.getDao().selectOne("selectTopic.selectSelectTopicById", param);
    }

    @Override
    public byte[] getExcelForDownload(ResourceInfo resourceInfo, List<ApproveHistoryVo> list) throws Exception {

        ByteArrayOutputStream out = null;
        XSSFWorkbook xwb = null;
        try{
            //真吭啊
            String categoresCode = resourceInfo.getCategoresCode();
            String[] ids = null;
            if(categoresCode.indexOf(",") > 0){
                ids = categoresCode.split(",");
            }else{
                ids = categoresCode.split("");
            }
            List listIds = CollectionUtils.arrayToList(ids);
                       
            //取出前四级
            String[] dc=new String[4];
            for(int i=0;i<=3;i++){
            	dc[i]=(String) listIds.get(i);
            }
            //分割数组dc
            String[] idc=new String[4];           
            idc=dc[dc.length-1].split("-");
            	
            //前四级形成list
            List listdc = CollectionUtils.arrayToList(idc);
            //查询出前四级对应的CategoryDict                       
            List<CategoryDict> categoryDicts=categoryService.getCategoryDictsByIds(listdc);
            while(categoryDicts.size()<=4){
            	CategoryDict d=new CategoryDict();
            	d.setName("");
            	categoryDicts.add(d);
            }
            List<Category> categories = categoryService.getCategoriesByIds(listIds);
            while(categories.size() <= 4){
                Category c = new Category();
                c.setName("");
                categories.add(c);
            }

            out = new ByteArrayOutputStream();
            // 第一步，创建一个webbook，对应一个Excel文件
            xwb = new XSSFWorkbook();
            // 第二步，在webbook中添加一个sheet,对应Excel文件中的sheet
            XSSFSheet sheet = xwb.createSheet("sheet1");
            // 第三步，在sheet中添加表头第0行,注意老版本poi对Excel的行数列数有限制short
            XSSFRow row = sheet.createRow(0);
            // 第四步，创建单元格，并设置值表头 设置表头居中
            XSSFCellStyle style = xwb.createCellStyle();
            style.setAlignment(XSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式
            //放入数据
            insertCell(sheet, 0, 0, "选题编号");
            insertCell(sheet, 0, 1, resourceInfo.gettResourceCode());
            insertCell(sheet, 1, 0, "资源名称");
            insertCell(sheet, 1, 1, resourceInfo.getResourceName());
            insertCell(sheet, 2, 0, "发版类型");
            insertCell(sheet, 2, 1, resourceInfo.getDraftTypeValue());
            insertCell(sheet, 3, 0, "版次");
            insertCell(sheet, 3, 1, resourceInfo.getEdition());
            insertCell(sheet, 4, 0, "ISBN");
            insertCell(sheet, 4, 1, resourceInfo.getISBN());
            insertCell(sheet, 5, 0, "责任编辑");
            insertCell(sheet, 5, 1, resourceInfo.getCreateUserName());
            insertCell(sheet, 6, 0, "资源属性");
            insertCell(sheet, 6, 1, "");
            insertCell(sheet, 7, 0, "学段");
            insertCell(sheet, 7, 1, categoryDicts.get(0).getName());
            insertCell(sheet, 8, 0, "学科");
            insertCell(sheet, 8, 1, categoryDicts.get(1).getName());
            insertCell(sheet, 9, 0, "版本");
            insertCell(sheet, 9, 1, categoryDicts.get(2).getName());
            insertCell(sheet, 10, 0, "册次");
            insertCell(sheet, 10, 1, categoryDicts.get(3).getName());
            insertCell(sheet, 11, 0, "章");
            insertCell(sheet, 11, 1, categories.get(0).getName());
            insertCell(sheet, 12, 0, "节");
            insertCell(sheet, 12, 1, categories.get(1).getName());
            insertCell(sheet, 13, 0, "目");
            insertCell(sheet, 13, 1, categories.get(2).getName());
            insertCell(sheet, 14, 0, "课时");
            insertCell(sheet, 14, 1, categories.get(3).getName());
            insertCell(sheet, 15, 0, "资源类别");
            insertCell(sheet, 15, 1, resourceInfo.getResourceTypeOneLevelValue());
            insertCell(sheet, 16, 0, "类别二级");
            insertCell(sheet, 16, 1, resourceInfo.getResourceTypeTwoLevelValue());
            insertCell(sheet, 17, 0, "资源格式");
            insertCell(sheet, 17, 1, resourceInfo.getResourceFormatValue());
            insertCell(sheet, 18, 0, "资源描述");
            insertCell(sheet, 18, 1, resourceInfo.getResourceDes());
            insertCell(sheet, 19, 0, "资源制作者");
            insertCell(sheet, 19, 1, resourceInfo.getResourceMaker());
            insertCell(sheet, 20, 0, "作者简介");
            insertCell(sheet, 20, 1, resourceInfo.getMakerIntro());
            insertCell(sheet, 21, 0, "使用对象");
            insertCell(sheet, 21, 1, check(resourceInfo.getUseTarget()));
            insertCell(sheet, 22, 0, "资源来源");
            insertCell(sheet, 22, 1, resourceInfo.getResourceSource());
            insertCell(sheet, 23, 0, "版权");
            insertCell(sheet, 23, 1, checkCopyright(resourceInfo.getCopyright()));
            insertCell(sheet, 24, 0, "年份");
            insertCell(sheet, 24, 1, resourceInfo.getYearMonth());
            insertCell(sheet, 25, 0, "独家资源");
            insertCell(sheet, 25, 1, resourceInfo.getIsAloneRes().equals("0")?"是":"否");
            insertCell(sheet, 26, 0, "原创资源");
            insertCell(sheet, 26, 1, resourceInfo.getIsOriginal().equals("0")?"是":"否");
            insertCell(sheet, 27, 0, "文种");
            insertCell(sheet, 27, 1, resourceInfo.getIsChinese().equals("0") ? "中文" : "外文");
            insertCell(sheet, 28, 0, "资源等级");
            insertCell(sheet, 28, 1, resourceInfo.getResourceLevel().equals("0")?"精品":"普通");
            insertCell(sheet, 29, 0, "价格");
            insertCell(sheet, 29, 1, resourceInfo.getIsFree().equals("0") ? "免费" : resourceInfo.getCost());

            int count = 31;

            if(list != null && list.size() > 0){
                insertCell(sheet, count, 0, "审核结果");
                count = count + 2;
                for (int i = 0; i < list.size(); i++) {
                    ApproveHistoryVo approveHistoryVo = list.get(i);
                    insertCell(sheet, count, 0, approveHistoryVo.getNodeName());
                    insertCell(sheet, count, 1, approveHistoryVo.getApproveUserName());
                    count++;
                    insertCell(sheet, count, 0, "审核结果");
                    insertCell(sheet, count, 1, approveHistoryVo.getIsPass().equals("pass") ? "通过" : "不通过");
                    count++;
                    insertCell(sheet, count, 0, "审核日期");
                    insertCell(sheet, count, 1, new SimpleDateFormat("yyyy-MM-dd HH-mm-ss").format(approveHistoryVo.getTaskEndTime()));
                    count++;
                    insertCell(sheet, count, 0, "审核意见");
                    insertCell(sheet, count, 1, approveHistoryVo.getOpinion());
                    count = count + 2;
                }
            }

            xwb.write(out);

            return out.toByteArray();
        } finally{
            xwb.close();
            out.close();
        }
    }

    private void insertCell(XSSFSheet sheet, int rowNum, int colNum, Object object){
        XSSFRow row = sheet.getRow(rowNum);
        row = row == null ? sheet.createRow(rowNum) : row;
        //sheet.createRow(rowNum);
        if(object == null){
            row.createCell(colNum).setCellValue("");
        }else{
            row.createCell(colNum).setCellValue(object.toString());
        }

    }

    private String check(String target){

        if(target != null && !"".equals(target)){
            switch (target) {
                case "teacher":
                    return "老师";
                case "student":
                    return "学生";
                default:
                    return "老师和学生";
            }

        }else{
            return "";
        }

    }
   private String checkCopyright(String copyright){
	   if(copyright!=null){
		   switch(copyright){
		   case "forever":
			   return "永久";
		   case "deadline":
			   return "限期";
		   case "none":
		       return "无";
		   default:
			   return "";
		   }
	   }else{
		   return "";
	   }
   }
    
}
