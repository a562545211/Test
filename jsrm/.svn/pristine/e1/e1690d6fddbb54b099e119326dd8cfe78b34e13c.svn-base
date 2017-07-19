package com.jsrm.base.service;


import com.jsrm.base.common.PageVO;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public abstract interface SqlDao {
	
	  public abstract <T> PageVO<T> pagedQuery(String paramString, int paramInt1, int paramInt2, Object[] paramArrayOfObject);

	  public abstract <T> List<T> selectPage(String paramString, int paramInt1, int paramInt2, Object[] paramArrayOfObject);

	  public abstract int selectCount(String paramString, Object[] paramArrayOfObject);

	  public abstract <T> List<T> selectList(String paramString, Object[] paramArrayOfObject);

	  public abstract <T> T selectOne(String paramString, Object[] paramArrayOfObject);

	  public abstract int insert(String paramString, Object[] paramArrayOfObject);

	  public abstract int update(String paramString, Object[] paramArrayOfObject);

	  public abstract int delete(String paramString, Object[] paramArrayOfObject);
	  
	  
	  	public abstract int execJDBC(final String sql) throws SQLException;
		
		public abstract int execJDBC(final String sql, String[] param) throws SQLException;
		
		public abstract int[] execBatchJDBC(final List<String> sqls) throws SQLException;
		
		public abstract int insertJDBC(final String table, Map<String, Object> bean) throws SQLException;
		
		public abstract int[] insertBatchJDBC(final String table, List<Map<String, Object>> records) throws SQLException;
		
		public abstract int deleteJDBC(final String table, final String where) throws SQLException;
		
		public abstract int deleteJDBC(final String table, final String where, final String[] param) throws SQLException;
		
		public abstract int[] deleteBatchJDBC(final String table, final List<String> wheres)	throws SQLException;
		
		public abstract int updateJDBC(final String table, final String where, Map<String, Object> record) throws SQLException;
		
		public abstract int updateJDBC(final String table, final String where, Map<String, Object> record, final String versionField, final String versionValue) throws SQLException;
		
		public abstract <T> T selectOneJDBC(Class<T> resultClass, final String sql)throws SQLException;
		
		public abstract <T> T selectOneJDBC(Class<T> resultClass, final String sql, final String[] param) throws SQLException;
		
		public abstract <T> List<T> selectListJDBC(Class<T> resultClass, final String sql) throws SQLException;
		
		public abstract <T> List<T> selectListJDBC(Class<T> resultClass, final String sql, final String[] param)throws SQLException;
		
		public abstract int countJDBC(final String csql) throws SQLException;
		
		public abstract int countJDBC(final String csql, final String[] param) throws SQLException;
		
		public abstract <T> PageVO<T> pageQueryJDBC(final Class<T> resultClass, final String sql, int pageNo, int pageSize) throws SQLException;
		
		public abstract <T> PageVO<T> pageQueryJDBC(final Class<T> resultClass, final String sql, String[] param, int pageNo, int pageSize) throws SQLException;
		
		public abstract  String getSeq(String bz, String table, String pk);
		
		public abstract String getUUID();
	  

}
