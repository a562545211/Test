package com.jsrm.base.utils;

import jxl.Workbook;
import jxl.format.Border;
import jxl.format.BorderLineStyle;
import jxl.format.Colour;
import jxl.write.*;
import jxl.write.Number;
import jxl.write.biff.RowsExceededException;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.*;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 配合 jxl.jar,apache.log4j使用
 */
@SuppressWarnings("all")
public final class JExcel {

    protected final Logger logger = Logger.getLogger(getClass());
    private SimpleDateFormat fmtrq = new SimpleDateFormat("MMM-dd-yy",
            Locale.ENGLISH);

    /**
     * 写Excel文件
     *
     * @param OutputStream    os            输入流
     * @param String          sheetName     工作空间名
     * @param List<Integer[]> merge         合并行坐标   (左列，左行，右列，右行) 注意必须:右行>左行,右列>左列
     * @param String          header        第一行大标题
     * @param int             titleSize     列名数
     * @param List            content       (列名数据) 标题行必须String型 其他行自动转换类型
     *                        <包含类型为:String, Integer,BigDecimal,Float,Long,Date>
     */
    public void writeExcel(OutputStream os, String sheetName, List<Integer[]> merge, String header,
                           int titleSize, List content) {

        if (os != null && titleSize != 0 && content != null && content.size() != 0) {
            WritableWorkbook wwb = null;
            try {

                /**
                 *
                 *  String   filePath
                 *  文件路径File f = new File(filePath);
                 *  f.createNewFile();
                 *  wwb = Workbook.createWorkbook(f);
                 *
                 **/

                wwb = Workbook.createWorkbook(os);

                // 创建Excel工作表
                WritableSheet ws = wwb.createSheet(sheetName, 0);// 创建sheet

                // 合并单元格(左列，左行，右列，右行)从第1行到第1列,第3列到第2行 0,0,2,1
                if (merge != null && merge.size() != 0) {
                    for (Integer[] i : merge) {
                        ws.mergeCells(i[0], i[1], i[2], i[3]);
                    }
                }

                // Label(列,行,头,头样式)
                Label labelHeader = new Label(0, 0, header, setHeader());

                ws.addCell(labelHeader);// 写入头

                int j = 2;
                for (int i = 0; i < content.size(); i++) {
                    if (i != 0 && i % titleSize == 0) {
                        j++;
                    }

                    Object obj = content.get(i);
                    if (obj == null) {
                        obj = "";
                    }
                    if (j == 2 && obj instanceof String) //标题行
                    {
                        // 标题样式
                        labelHeader = new Label(i % titleSize, j, (String) obj, setTitle());
                        ws.addCell(labelHeader);
                    }
                    if (j != 2) // 第2行为标题行 不是第2行 就是内容样式
                    {
                        WritableCellFormat wcfDF = new WritableCellFormat();//列格式
                        if (obj instanceof String) {
                            labelHeader = new Label(i % titleSize, j, (String) obj, setNormolCell(wcfDF));
                            ws.addCell(labelHeader);
                        } else if (obj instanceof Integer) {
                            Number number = new Number(i % titleSize, j, (Integer) obj, setNormolCell(wcfDF));
                            ws.addCell(number);
                        } else if (obj instanceof BigDecimal) {
                            BigDecimal big = (BigDecimal) obj;
                            Number number = new Number(i % titleSize, j, big.doubleValue(), setNormolCell(wcfDF));
                            ws.addCell(number);
                        } else if (obj instanceof Float) {
                            Number number = new Number(i % titleSize, j, (Float) obj, setNormolCell(wcfDF));
                            ws.addCell(number);
                        } else if (obj instanceof Long) {
                            Number number = new Number(i % titleSize, j, (Long) obj, setNormolCell(wcfDF));
                            ws.addCell(number);
                        } else if (obj instanceof Date) {
                            DateFormat df = new DateFormat("yyyy-mm-dd hh:mm:ss");
                            wcfDF = setNormolCell(new WritableCellFormat(df));
                            DateTime labelDT = new DateTime(i % titleSize, j, (Date) obj, wcfDF);
                            ws.addCell(labelDT);
                        }
                    }


                    ws.setColumnView(i, 20);// 设置列宽
                    ws.setRowView(i, 400);// 设置行高
                }

                // 输出流
                wwb.write();
                logger.info("写入成功！\n");

            } catch (ClassCastException e) {
                logger.error("类型转换异常！\n");
                e.printStackTrace();
            } catch (RowsExceededException e) {

                e.printStackTrace();
            } catch (WriteException e) {
                logger.error("写入异常！\n");
                e.printStackTrace();
            } catch (IOException e) {
                logger.error("IO异常！\n");
                e.printStackTrace();
            } finally {
                // 关闭流
                try {
                    if (wwb != null) {
                        wwb.close();
                    }
                    if (os != null) {
                        os.close();
                    }
                } catch (WriteException e) {
                    logger.error("写入异常！\n");
                    e.printStackTrace();
                } catch (IOException ex) {
                    logger.error("IO异常！\n");
                    ex.printStackTrace();
                }
            }

        }
    }


    /**
     * 设置头的样式
     *
     * @return
     */
    private WritableCellFormat setHeader() {
        WritableFont font = new WritableFont(WritableFont.TIMES, 11,
                WritableFont.BOLD);// 定义字体
        WritableCellFormat format = new WritableCellFormat();
        try {
            font.setColour(Colour.WHITE);// 蓝色字体
            format.setFont(font);
            format.setAlignment(jxl.format.Alignment.LEFT);// 左右居中
            format.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);// 上下居中
            format.setBorder(Border.ALL, BorderLineStyle.THIN, Colour.BLACK);// 黑色边框
            format.setBackground(Colour.ORANGE);// 黄色背景
        } catch (WriteException e) {
            logger.error(" 设置头的样式异常！\n");
            e.printStackTrace();
        }
        return format;
    }


    private WritableCellFormat setDateRow() {
        WritableFont font = new WritableFont(WritableFont.TIMES, 11,
                WritableFont.BOLD);// 定义字体
        WritableCellFormat format = new WritableCellFormat();
        try {
            font.setColour(Colour.BLUE);// 蓝色字体
            format.setFont(font);
            format.setAlignment(jxl.format.Alignment.LEFT);// 左右居中
            format.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);// 上下居中
            format.setBorder(Border.ALL, BorderLineStyle.THIN, Colour.BLACK);// 黑色边框
            format.setBackground(Colour.WHITE);// 黄色背景
        } catch (WriteException e) {
            logger.error(" 设置头的样式异常！\n");
            e.printStackTrace();
        }
        return format;
    }


    /**
     * 设置标题样式
     *
     * @return
     */
    private WritableCellFormat setTitle() {
        WritableFont font = new WritableFont(WritableFont.TIMES, 10);
        WritableCellFormat format = new WritableCellFormat();
        try {
            font.setColour(Colour.WHITE);// 蓝色字体
            format.setFont(font);
            format.setAlignment(jxl.format.Alignment.CENTRE);
            format.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);
            format.setBorder(Border.ALL, BorderLineStyle.THIN, Colour.BLACK);
            format.setBackground(Colour.ORANGE);
        } catch (WriteException e) {
            logger.error(" 设置标题样式异常！\n");
            e.printStackTrace();
        }
        return format;
    }

    public WritableCellFormat setNormolCell(WritableCellFormat format) {
        // 12号字体,上下左右居中,带黑色边框
        WritableFont font = new WritableFont(WritableFont.TIMES, 10);
        try {
            format.setFont(font);
            format.setAlignment(jxl.format.Alignment.LEFT);
            format.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);
            format.setBorder(Border.ALL, BorderLineStyle.THIN, Colour.BLACK);
        } catch (WriteException e) {
            logger.error("  设置其他单元格样式异常！\n");
            e.printStackTrace();
        }
        return format;
    }

    /***
     *
     *   setBorder(Border.NONE, BorderLineStyle.THIN); // 线条
     *   setVerticalAlignment(VerticalAlignment.CENTRE); // 垂直对齐
     *   setAlignment(Alignment.CENTRE); // 水平对齐
     *   setWrap(true); // 是否换行
     *   getSettings().setRightMargin(0.5); //设置页边距
     *   setFooter("", "", "测试页脚");//设置页脚
     *
     * ***/

    /**
     *
     *      web应用时 在控制层需配置
     *  	response.setContentType("application/x-msdownload");
     *      response.setHeader("content-disposition", "attachment; filename=test.xls");
     *
     * **/

    /***************************************************************************
     * 测试 要求 1.列数 2.列名和数据顺序添加到List
     **************************************************************************/

    public static List<Map<String, Object>> getExcelData(InputStream is) {
        List<Map<String, Object>> mlist = new ArrayList<>();
        try {
            String[][] data = getData(is, 1);
            for (int i = 0; i < data.length; i++) {
                for (int j = 0; j < data[i].length; j++) {
                    Map<String, Object> map = new HashMap<>();
                    if (StringUtils.isNotBlank(data[i][j])) {
                        String name = data[i][j];
                        Integer deep = j + 1;
                        if (i > 0) {
                            deep = j + 5;
                        }
                        name = name.indexOf("$") > 0 ? name.split("\\$")[1].trim() : name;
                        map.put("name", name);
                        map.put("deep", deep);
                        mlist.add(map);
                    }
                }
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
         return mlist;
    }

    public static void main(String[] args) {

    }

    /**
     * 写Excel文件
     *
     * @param OutputStream    os            输入流
     * @param String          sheetName     工作空间名
     * @param List<Integer[]> merge         合并行坐标   (左列，左行，右列，右行) 注意必须:右行>左行,右列>左列
     * @param String          header        第一行大标题
     * @param int             titleSize     列名数
     * @param List            content       (列名数据) 标题行必须String型 其他行自动转换类型
     *                        <包含类型为:String, Integer,BigDecimal,Float,Long,Date>
     * @param String          queryCondition
     * @param String          period
     */
    public void writeExcel(OutputStream os, String sheetName, List<Integer[]> merge, String header,
                           int titleSize, List content, String queryCondition, String period) {

        if (os != null && titleSize != 0 && content != null && content.size() != 0) {
            WritableWorkbook wwb = null;
            try {

                /**
                 *
                 *  String   filePath
                 *  文件路径File f = new File(filePath);
                 *  f.createNewFile();
                 *  wwb = Workbook.createWorkbook(f);
                 *
                 **/

                wwb = Workbook.createWorkbook(os);

                // 创建Excel工作表
                WritableSheet ws = wwb.createSheet(sheetName, 0);// 创建sheet

                // 合并单元格(左列，左行，右列，右行)从第1行到第1列,第3列到第2行 0,0,2,1
                if (merge != null && merge.size() != 0) {
                    for (Integer[] i : merge) {
                        ws.mergeCells(i[0], i[1], i[2], i[3]);
                    }
                }

                // Label(列,行,头,头样式)
                //$$=====================Modified by lx 2010-01-14 将 content.size()-1改成titleSize-1 START==========================$$//
                ws.mergeCells(0, 0, titleSize - 1, 0);
                Label labelHeader = new Label(0, 0, header, setHeader());
                ws.addCell(labelHeader);// 写入标题头

                ws.mergeCells(0, 1, titleSize - 1, 0);
                Label labGeneratedDate = new Label(0, 1, "Generated date:" + fmtrq.format(new Date()), setDateRow());
                ws.addCell(labGeneratedDate);

                ws.mergeCells(0, 2, titleSize - 1, 0);
                Label labForPeriod = new Label(0, 2, "For Period:" + period + "      " + queryCondition, setDateRow());
                ws.addCell(labForPeriod);

                WritableCellFormat wcfDF = new WritableCellFormat();//列格式
                wcfDF = setNormolCell(wcfDF);
                DateFormat df = new DateFormat("yyyy-mm-dd hh:mm:ss");
                WritableCellFormat wcfDateF = setNormolCell(new WritableCellFormat(df));

                //$$=====================Modified by lx 2010-01-14 将 content.size()-1改成titleSize-1 END==========================$$//

                int j = 3;
                for (int i = 0; i < content.size(); i++) {

                    if (i != 0 && i % titleSize == 0) {
                        j++;

                    }
                    Object obj = content.get(i);
                    if (obj == null) {
                        obj = "";
                        //continue;
                    }
                    if (j == 3 && obj instanceof String) //标题行
                    {
                        // 标题样式
                        labelHeader = new Label(i % titleSize, j, (String) obj, setTitle());
                        ws.addCell(labelHeader);
                    }
                    if (j != 3) // 第2行为标题行 不是第2行 就是内容样式
                    {

                        if (obj instanceof String) {
                            labelHeader = new Label(i % titleSize, j, (String) obj, wcfDF);

                            ws.addCell(labelHeader);
                        } else if (obj instanceof Integer) {
                            Number number = new Number(i % titleSize, j, (Integer) obj, wcfDF);
                            ws.addCell(number);
                        } else if (obj instanceof BigDecimal) {
                            BigDecimal big = (BigDecimal) obj;
                            Number number = new Number(i % titleSize, j, big.doubleValue(), wcfDF);
                            ws.addCell(number);
                        } else if (obj instanceof Float) {
                            Number number = new Number(i % titleSize, j, (Float) obj, wcfDF);
                            ws.addCell(number);
                        } else if (obj instanceof Long) {
                            Number number = new Number(i % titleSize, j, (Long) obj, wcfDF);
                            ws.addCell(number);
                        } else if (obj instanceof Date) {

                            DateTime labelDT = new DateTime(i % titleSize, j, (Date) obj, wcfDateF);
                            ws.addCell(labelDT);
                        }
                    }


                    ws.setColumnView(i, 20);// 设置列宽
                    ws.setRowView(i, 400);// 设置行高

                }

                // 输出流
                wwb.write();
                logger.info("写入成功！\n");

            } catch (ClassCastException e) {
                logger.error("类型转换异常！\n");
                e.printStackTrace();
            } catch (RowsExceededException e) {

                e.printStackTrace();
            } catch (WriteException e) {
                logger.error("写入异常！\n");
                e.printStackTrace();
            } catch (IOException e) {
                logger.error("IO异常！\n");
                e.printStackTrace();
            } catch (Exception e) {
                e.printStackTrace();

            } finally {
                // 关闭流
                try {
                    if (wwb != null) {
                        wwb.close();
                    }
                    if (os != null) {
                        os.close();
                    }
                } catch (WriteException e) {
                    logger.error("写入异常！\n");
                    e.printStackTrace();
                } catch (IOException ex) {
                    logger.error("IO异常！\n");
                    ex.printStackTrace();
                }
            }

        }
    }

    /**
     * 读取Excel的内容，第一维数组存储的是一行中格列的值，二维数组存储的是多少个行
     *
     * @param file       读取数据的源Excel
     * @param ignoreRows 读取数据忽略的行数，比喻行头不需要读入 忽略的行数为1
     * @return 读出的Excel中数据的内容
     * @throws FileNotFoundException
     * @throws IOException
     */

    public static String[][] getData(InputStream inputStream, int ignoreRows)

            throws FileNotFoundException, IOException {

        List<String[]> result = new ArrayList<String[]>();

        int rowSize = 0;

        XSSFWorkbook wb = new XSSFWorkbook(inputStream);

        XSSFCell cell = null;

        int numberOfSheets = wb.getNumberOfSheets() > 1 ? 1 : 1;

        for (int sheetIndex = 0; sheetIndex < numberOfSheets; sheetIndex++) {

            XSSFSheet st = wb.getSheetAt(sheetIndex);

            // 第一行为标题，不取

            for (int rowIndex = ignoreRows; rowIndex <= st.getLastRowNum(); rowIndex++) {

                XSSFRow row = st.getRow(rowIndex);

                if (row == null) {
                    continue;
                }

                int tempRowSize = row.getLastCellNum() + 1;

                if (tempRowSize > rowSize) {
                    rowSize = tempRowSize;
                }

                String[] values = new String[rowSize];

                Arrays.fill(values, "");

                boolean hasValue = false;

                for (short columnIndex = 0; columnIndex <= row.getLastCellNum(); columnIndex++) {

                    String value = "";

                    cell = row.getCell(columnIndex);

                    if (cell != null) {

                        // 注意：一定要设成这个，否则可能会出现乱码
                        //cell.setEncoding(HSSFCell.ENCODING_UTF_16);

                        switch (cell.getCellType()) {

                            case HSSFCell.CELL_TYPE_STRING:

                                value = cell.getStringCellValue().trim();

                                break;

                            case HSSFCell.CELL_TYPE_NUMERIC:

                                if (HSSFDateUtil.isCellDateFormatted(cell)) {

                                    Date date = cell.getDateCellValue();
                                    if (date != null) {

                                        if (cell.getCellStyle().getDataFormat() == HSSFDataFormat.getBuiltinFormat("h:mm")) {
                                            value = new SimpleDateFormat("HH:mm").format(date);
                                        } else {// 日期
                                            value = new SimpleDateFormat("yyyy-MM-dd").format(date);
                                        }
                                    } else {
                                        value = "";
                                    }

                                } else {
                                    value = new DecimalFormat("0").format(cell.getNumericCellValue());
                                }

                                break;
                            case HSSFCell.CELL_TYPE_FORMULA:

                                // 导入时如果为公式生成的数据则无值

                                if (!cell.getStringCellValue().equals("")) {

                                    value = cell.getStringCellValue();

                                } else {

                                    value = cell.getNumericCellValue() + "";

                                }

                                break;

                            case HSSFCell.CELL_TYPE_BLANK:

                                break;

                            case HSSFCell.CELL_TYPE_ERROR:

                                value = "";

                                break;

                            case HSSFCell.CELL_TYPE_BOOLEAN:

                                value = (cell.getBooleanCellValue() == true ? "Y" : "N");

                                break;

                            default:

                                value = "";

                        }

                    }

//                    if (columnIndex == 0 && value.trim().equals("")) {
//
//                        break;
//
//                    }

                    values[columnIndex] = rightTrim(value);

                    hasValue = true;

                }


                if (hasValue) {

                    result.add(values);

                }

            }

        }

        inputStream.close();

        String[][] returnArray = new String[result.size()][rowSize];

        for (int i = 0; i < returnArray.length; i++) {

            returnArray[i] = (String[]) result.get(i);

        }

        return returnArray;

    }

    /**
     * 去掉字符串右边的空格
     *
     * @param str 要处理的字符串
     * @return 处理后的字符串
     */

    public static String rightTrim(String str) {

        if (str == null) {

            return "";

        }

        int length = str.length();

        for (int i = length - 1; i >= 0; i--) {

            if (str.charAt(i) != 0x20) {

                break;

            }

            length--;

        }

        return str.substring(0, length);
    }

}