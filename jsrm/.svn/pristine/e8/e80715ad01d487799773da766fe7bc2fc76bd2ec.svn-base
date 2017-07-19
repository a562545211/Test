package com.jsrm.base.common;

import org.apache.log4j.Logger;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public final class DerbyDialect extends AbstractDialect
{
  private final Logger logger = Logger.getLogger(getClass());

  public String getPaginationString(String sql, int begin, int end)
  {
    sql = trim(sql);

    StringBuffer stringbuffer = new StringBuffer();
    stringbuffer.append("SELECT HIKESOFT_SQL_B__.* FROM (SELECT HIKESOFT_SQL_A_.*, ROW_NUMBER() OVER(");

    String s1 = null;

    Pattern pattern = Pattern.compile("ORDER\\s+by", 2);

    Matcher matcher = pattern.matcher(sql);

    int i = 0;
    while (matcher.find()) {
      i = matcher.start();
    }

    String sqlBeforeLastOrder = sql.substring(0, i);
    String sqlLastOrder = sql.substring(i);

    StringBuffer stringBuffer = new StringBuffer();
    stringBuffer.append(sqlBeforeLastOrder);

    Pattern pattern2 = Pattern.compile("ORDER\\s*by[\\w|\\W|\\s|\\S]*", 2);

    Matcher matcher2 = pattern2.matcher(sqlLastOrder);
    if (matcher2.find())
    {
      s1 = sqlLastOrder;
      sql = sqlBeforeLastOrder;
    } else {
      s1 = "ORDER BY (SELECT 0)";
    }

    stringbuffer.append(s1);
    stringbuffer.append(") AS RN_ FROM ( ");
    stringbuffer.append(sql);
    stringbuffer.append(" ) HIKESOFT_SQL_A_) HIKESOFT_SQL_B__ WHERE HIKESOFT_SQL_B__.RN_ BETWEEN ");

    stringbuffer.append(begin + 1).append(" AND ").append(end + begin);

    this.logger.debug("DerbyDialect execute sql:" + stringbuffer.toString());

    return stringbuffer.toString();
  }
}