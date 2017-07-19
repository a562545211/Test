package com.jsrm.base.common;

import org.apache.log4j.Logger;

public final class OracleDialect extends AbstractDialect
{
  private final Logger logger = Logger.getLogger(getClass());

  public String getPaginationString(String sql, int begin, int end)
  {
    sql = trim(sql);

    StringBuffer stringbuffer = new StringBuffer();
    stringbuffer.append("SELECT * FROM (  SELECT HIKESOFT_SQL_.*, ROWNUM AS ROWNUM_ FROM (");
    stringbuffer.append(sql);
    stringbuffer.append(" ) HIKESOFT_SQL_ WHERE ROWNUM <= " + (begin + end) + 
      " ) WHERE ROWNUM_ > " + begin);

    this.logger.debug("OracleDialect execute sql:" + stringbuffer.toString());

    return stringbuffer.toString();
  }
}