package com.jsrm.base.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by jichao on 2016/10/20.
 */
public class DateUtil {

    public static Date changeStringToDate(String dateString) throws ParseException {
        if (dateString != null && !dateString.equals("")){
            dateString = dateString.trim();
            String format = dateString.contains(" ") ? "yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd";
            return new SimpleDateFormat(format).parse(dateString);
        }else{
            return null;
        }
    }

}
