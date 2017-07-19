package com.jsrm.base.common;

public abstract interface IDialect
{
  public abstract String getPaginationString(String paramString, int paramInt1, int paramInt2);

  public abstract String getCountString(String paramString);
}