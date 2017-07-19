package com.jsrm.base.common;

import org.apache.log4j.Logger;

public final class MySQLDialect extends AbstractDialect
{
  private final Logger logger = Logger.getLogger(getClass());

  public String getPaginationString(String sql, int begin, int end)
  {
    sql = trim(sql);

    StringBuffer stringbuffer = new StringBuffer(sql);
    stringbuffer.append(" LIMIT ").append(begin).append(" , ").append(end);

    this.logger.debug("MySQLDialect execute sql:" + stringbuffer.toString());

    return stringbuffer.toString();
  }
}