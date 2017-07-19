package com.jsrm.base.common;

import org.apache.log4j.Logger;

public final class DB2Dialect extends AbstractDialect
{
  private final Logger logger = Logger.getLogger(getClass());

  public String getPaginationString(String sql, int begin, int end)
  {
    sql = trim(sql);

    StringBuffer stringbuffer = new StringBuffer();

    stringbuffer.append("SELECT * FROM (  SELECT HIKESOFT_SQL_.*, ROWNUMBER() OVER() AS RN FROM (");

    stringbuffer.append(sql);
    stringbuffer.append(" ) HIKESOFT_SQL_ )  WHERE RN <= " + (
      begin + end) + " AND RN > " + begin);

    this.logger.debug("DB2Dialect execute sql:" + stringbuffer.toString());

    return stringbuffer.toString();
  }
}