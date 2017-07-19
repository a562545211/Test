package com.jsrm.base.common;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public final class PageVO<T>
implements Serializable
{
private static final long serialVersionUID = -4106030982324955419L;
private int start;
private int pageSize = 20;

private List<T> data = new ArrayList<T>(0);
private int totalCount;
private int totalPageCount;
private int currentPageNo;
private boolean hasNextPage;
private boolean hasPreviousPage;
private boolean isStartPage;
private boolean isEndPage;

public PageVO()
{
  this(0, 0, 20, new ArrayList<T>());
}

public PageVO(int start, int totalSize, int pageSize, List<T> data)
{
  this.pageSize = pageSize;
  this.start = start;
  this.totalCount = totalSize;
  this.data = data;
  init();
}

public int getTotalCount()
{
  return this.totalCount;
}

public int getPageSize()
{
  return this.pageSize;
}

public List<T> getResult()
{
  return this.data;
}

public void setResult(List<T> result)
{
  this.data = result;
}

public int getCurrentPageNo()
{
  return this.currentPageNo;
}

public boolean isHasNextPage()
{
  return this.hasNextPage;
}

public boolean isHasPreviousPage()
{
  return this.hasPreviousPage;
}

public int getStart()
{
  return this.start;
}

public int getTotalPageCount()
{
  return this.totalPageCount;
}

public boolean isEndPage()
{
  return this.isEndPage;
}

public boolean isStartPage()
{
  return this.isStartPage;
}

protected void init()
{
  if (this.totalCount % this.pageSize == 0)
    this.totalPageCount = (this.totalCount / this.pageSize);
  else {
    this.totalPageCount = (this.totalCount / this.pageSize + 1);
  }

  this.currentPageNo = (this.start / this.pageSize + 1);

  this.hasNextPage = (this.currentPageNo < this.totalPageCount);

  this.hasPreviousPage = (this.currentPageNo > 1);

  this.isStartPage = (this.currentPageNo == 1);

  this.isEndPage = (this.currentPageNo == this.totalPageCount);
}

public void setStart(int start) {
  this.start = start;
}

public void setPageSize(int pageSize) {
  this.pageSize = pageSize;
}

public void setTotalCount(int totalCount) {
  this.totalCount = totalCount;
}

public void setTotalPageCount(int totalPageCount) {
  this.totalPageCount = totalPageCount;
}

public void setCurrentPageNo(int currentPageNo) {
  this.currentPageNo = currentPageNo;
}

public void setHasNextPage(boolean hasNextPage) {
  this.hasNextPage = hasNextPage;
}

public void setHasPreviousPage(boolean hasPreviousPage) {
  this.hasPreviousPage = hasPreviousPage;
}

public void setStartPage(boolean isStartPage) {
  this.isStartPage = isStartPage;
}

public void setEndPage(boolean isEndPage) {
  this.isEndPage = isEndPage;
}

public static int getStartOfPage(int pageNo)
{
  return getStartOfPage(pageNo, 20);
}

public static int getStartOfPage(int pageNo, int pageSize)
{
  return (pageNo - 1) * pageSize;
}
}
