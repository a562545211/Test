package com.jsrm.base.utils;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public  final class SqlUtils
{
  public static String removeSelect(String sql)
  {
    int beginPos = sql.toLowerCase().indexOf("from");

    return sql.substring(beginPos);
  }

  public static String removeOrders(String sql)
  {
    Pattern pattern = Pattern.compile("ORDER\\s+by", 2);

    Matcher matcher = pattern.matcher(sql);

    int i = 0;
    while (matcher.find()) {
      i = matcher.start();
    }
    String sql1 = sql.substring(0, i);
    String sql2 = sql.substring(i);
    StringBuffer stringBuffer = new StringBuffer();
    stringBuffer.append(sql1);

    Pattern pattern2 = Pattern.compile("ORDER\\s*by[\\w|\\W|\\s|\\S]*", 2);

    Matcher matcher2 = pattern2.matcher(sql2);
    if (matcher2.find()) {
      matcher2.appendReplacement(stringBuffer, "");
    }

    matcher2.appendTail(stringBuffer);
    return stringBuffer.toString();
  }


}