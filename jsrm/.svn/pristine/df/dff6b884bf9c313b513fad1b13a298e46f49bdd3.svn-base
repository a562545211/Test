package com.jsrm.base.service.impl;


import com.jsrm.base.common.*;
import com.jsrm.base.utils.BaseUtils;
import com.jsrm.base.utils.SqlUtils;
import com.jsrm.base.service.SqlDao;
import com.jsrm.base.utils.UUIDUtils;
import org.apache.commons.beanutils.BeanUtilsBean;
import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.SqlSessionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.beans.PropertyDescriptor;
import java.math.BigDecimal;
import java.sql.*;
import java.util.*;
import java.util.Date;

/** 
* 数据库基本操作封装
*/
@SuppressWarnings("all")
public class BaseSupportDaoImpl implements SqlDao {
	private static final Logger logger = LoggerFactory.getLogger(BaseSupportDaoImpl.class);
	
	private String dialect;
	
	private SqlSessionTemplate sqlSessionTemplate;
	
	
	public BaseSupportDaoImpl(final SqlSessionTemplate sqlSessionTemplate, final String dialect){
		this.dialect=dialect;
		this.sqlSessionTemplate=sqlSessionTemplate;
		this.sqlSessionTemplate.getConfiguration().addInterceptor(new OffsetLimitInterceptor(dialect));
	}
	
	/**
	 * 原生sql封装
	 * **/
	public int execJDBC(String sql) throws SQLException {
		return execJDBC(sql,null);
	}

	public int execJDBC(String sql, String[] param) throws SQLException {
		 SqlSession conn = SqlSessionUtils.getSqlSession(
				sqlSessionTemplate.getSqlSessionFactory(), sqlSessionTemplate.getExecutorType(),
				sqlSessionTemplate.getPersistenceExceptionTranslator());
		try{
			PreparedStatement tmt=conn.getConnection().prepareStatement(sql);
			if(param!=null&&param.length>0){
				for(int i=0,len=param.length;i<len;i++){
					tmt.setString(i+1, param[i]);
				}
			}
			int result=tmt.executeUpdate();
			tmt.close();
			tmt=null;
			logger.debug("SQL:" + sql);
			return result;
		}finally {
			if (conn != null) {
				SqlSessionUtils.closeSqlSession(conn, sqlSessionTemplate.getSqlSessionFactory());
		   }
		}
			
	}

	public int[] execBatchJDBC(List<String> sqls) throws SQLException {
		    SqlSession conn = SqlSessionUtils.getSqlSession(
					sqlSessionTemplate.getSqlSessionFactory(), sqlSessionTemplate.getExecutorType(),
					sqlSessionTemplate.getPersistenceExceptionTranslator());
			try{
				if (sqls != null) {
					Statement tmt = conn.getConnection().createStatement();
					for (String sql : sqls) {
						tmt.addBatch(sql);
					}
					int[] result=tmt.executeBatch();
					tmt.close();
					tmt=null;
					return result;
				}
				return null;
			}finally {
				if (conn != null) {
					SqlSessionUtils.closeSqlSession(conn, sqlSessionTemplate.getSqlSessionFactory());
			   }
			}
		
	}

	public int insertJDBC(String table, Map<String, Object> bean) throws SQLException {
		SqlSession conn = SqlSessionUtils.getSqlSession(
					sqlSessionTemplate.getSqlSessionFactory(), sqlSessionTemplate.getExecutorType(),
					sqlSessionTemplate.getPersistenceExceptionTranslator());
		try{
			if (bean == null) {
				logger.error("bean is null");
				throw new SQLException("bean is null");
			}
			String[] column = new String[bean.size()];
			String sql = "INSERT INTO " + table + "($field$) VALUES($value$)";
			String fields = "";
			String values = "";
			Iterator<String> it = bean.keySet().iterator();
			int i = 0;
			while (it.hasNext()) {
				String key = (String) it.next();
				fields += "," + key;
				values += "," + "?";
				column[i] = key;
				i++;
			}
			if ("".equals(fields)) {
				logger.error("bean is empty");
				throw new SQLException("bean is empty");
			}
			sql = sql.replace("$field$", fields.substring(1, fields.length()));
			sql = sql.replace("$value$", values.substring(1, values.length()));
			PreparedStatement tmt = conn.getConnection().prepareStatement(sql);
			for (int j = 0,len=column.length; j < len; j++) {
				Object obj = bean.get(column[j]);
				if (obj instanceof Integer) {
					Integer value = (Integer) obj;
					tmt.setInt(j + 1, value != null ? value.intValue() : null);
				} else if (obj instanceof String) {
					String value = (String) obj;
					tmt.setString(j + 1, value);
				} else if (obj instanceof Double) {
					Double value = (Double) obj;
					tmt.setDouble(j + 1, value != null ? value.doubleValue() : null);
				} else if (obj instanceof Float) {
					Float value = (Float) obj;
					tmt.setFloat(j + 1, value != null ? value.floatValue() : null);
				} else if (obj instanceof Long) {
					Long value = (Long) obj;
					tmt.setLong(j + 1, value != null ? value.longValue() : null);
				} else if (obj instanceof Boolean) {
					Boolean value = (Boolean) obj;
					tmt.setBoolean(j + 1, value != null ? value.booleanValue()
							: null);
				} else if (obj instanceof Date) {
					Date value = (Date) obj;
					tmt.setString(j + 1, value != null ? BaseUtils.formatDate(value, "yyyy-MM-dd HH:mm:ss"): null);
//					tmt.setDate(j + 1,
//							value != null ? new java.sql.Date(value.getTime())
//									: null);
				}else{
					tmt.setString(j+1, null);
				}
			}
			int result=tmt.executeUpdate();
			tmt.close();
			tmt=null;
			logger.debug("SQL:" + sql);
			return result;
		}finally {
			if (conn != null) {
				SqlSessionUtils.closeSqlSession(conn, sqlSessionTemplate.getSqlSessionFactory());
		   }
		}
	}

	public int[] insertBatchJDBC(String table, List<Map<String, Object>> records) throws SQLException {
		SqlSession conn = SqlSessionUtils.getSqlSession(
				sqlSessionTemplate.getSqlSessionFactory(), sqlSessionTemplate.getExecutorType(),
				sqlSessionTemplate.getPersistenceExceptionTranslator());
		try{
			if (records != null && records.size() > 0) {
				Map<String, Object> bean = records.get(0);
				if (bean == null) {
					logger.error("bean is null");
					throw new SQLException("bean is null");
				}
				String[] column = new String[bean.size()];
				;
				String sql = "INSERT INTO " + table + "($field$) VALUES($value$)";
				String fields = "";
				String values = "";
				Iterator<String> it = bean.keySet().iterator();
				int i = 0;
				while (it.hasNext()) {
					String key = (String) it.next();
					column[i] = key;
					if ("".equalsIgnoreCase(fields)) {
						fields = key;
						values = "?";
					} else {
						fields += "," + key;
						values += "," + "?";
					}
					i++;
				}
				if ("".equals(fields)) {
					logger.error("bean is empty");
					throw new SQLException("bean is empty");
				}
				sql = sql.replace("$field$", fields);
				sql = sql.replace("$value$", values);

				PreparedStatement tmt = conn.getConnection().prepareStatement(sql);
				for (Map<String, Object> o : records) {
					for (int j = 0,len=column.length; j < len; j++) {
						Object obj = o.get(column[j]);
						if (obj instanceof Integer) {
							Integer value = (Integer) obj;
							tmt.setInt(j + 1, value != null ? value.intValue()
									: null);
						} else if (obj instanceof String) {
							String value = (String) obj;
							tmt.setString(j + 1, value);
						} else if (obj instanceof Double) {
							Double value = (Double) obj;
							tmt.setDouble(j + 1,
									value != null ? value.doubleValue() : null);
						} else if (obj instanceof Float) {
							Float value = (Float) obj;
							tmt.setFloat(j + 1, value != null ? value.floatValue()
									: null);
						} else if (obj instanceof Long) {
							Long value = (Long) obj;
							tmt.setLong(j + 1, value != null ? value.longValue()
									: null);
						} else if (obj instanceof Boolean) {
							Boolean value = (Boolean) obj;
							tmt.setBoolean(j + 1,
									value != null ? value.booleanValue() : null);
						} else if (obj instanceof Date) {
							Date value = (Date) obj;
							tmt.setString(j + 1, value != null ? BaseUtils.formatDate(value, "yyyy-MM-dd HH:mm:ss"): null);
//							tmt.setDate(j + 1, value != null ? new java.sql.Date(
//									value.getTime()) : null);
						}else{
							tmt.setString(j+1, null);
						}
					}
					tmt.addBatch();
				}
				int[] result=tmt.executeBatch();
				tmt.close();
				tmt=null;
				return result;
			}
			return null;
		}finally {
			if (conn != null) {
				SqlSessionUtils.closeSqlSession(conn, sqlSessionTemplate.getSqlSessionFactory());
		   }
		}
	}

	public int deleteJDBC(String table, String where) throws SQLException {
		return deleteJDBC(table,where,null);
	}

	public int deleteJDBC(String table, String where, String[] param) throws SQLException {
		String sql = "DELETE FROM " + table.toLowerCase() + " WHERE ?where?";
		if (BaseUtils.isNotBlank(where)) {
			sql = sql.replace("?where?", where);
		}
		logger.debug("SQL:" + sql);
		return this.execJDBC( sql,param);
	}

	public int[] deleteBatchJDBC(String table, List<String> wheres) throws SQLException {
		SqlSession conn = SqlSessionUtils.getSqlSession(
				sqlSessionTemplate.getSqlSessionFactory(), sqlSessionTemplate.getExecutorType(),
				sqlSessionTemplate.getPersistenceExceptionTranslator());
	  try{
		  if (wheres != null) {
				Statement tmt = conn.getConnection().createStatement();
				for (String where : wheres) {
					String sql = "DELETE FROM " + table + " WHERE ?where?";
					if (BaseUtils.isNotBlank(where)) {
						sql = sql.replace("?where?", where);
					}
					tmt.addBatch(sql);
				}
				int[] result=tmt.executeBatch();
				tmt.close();
				tmt=null;
				return result;
			}
			return null;
	  }finally {
		if (conn != null) {
			SqlSessionUtils.closeSqlSession(conn, sqlSessionTemplate.getSqlSessionFactory());
	   }
	}
	}

	public int updateJDBC(String table, String where, Map<String, Object> record) throws SQLException {
		return updateJDBC(table,where,record,null,null);
	}

	public int updateJDBC(String table, String where, Map<String, Object> record, String versionField, String versionValue)
			throws SQLException {
		SqlSession conn = SqlSessionUtils.getSqlSession(
				sqlSessionTemplate.getSqlSessionFactory(), sqlSessionTemplate.getExecutorType(),
				sqlSessionTemplate.getPersistenceExceptionTranslator());
		try{
			if (record == null) {
				logger.error("bean is null");
				throw new SQLException("bean is null");
			}
			
			boolean locked=false;
			if(versionField!=null&&!"".equalsIgnoreCase(versionField)&&versionValue!=null&&!"".equalsIgnoreCase(versionValue)){
				record.remove(versionField);
				locked=true;
			}
			
			String[] column = new String[record.size()];
			String sql = "UPDATE " + table + " SET $values$ WHERE " + where;
			String fields = "";
			String values = "";
			
			if(locked){
				sql+=" and "+versionField+"='"+versionValue+"' ";
			}
			
			Iterator<String> it = record.keySet().iterator();
			int i=0;
			while (it.hasNext()) {
				String key = (String) it.next();
				column[i] = key;
					if ("".equalsIgnoreCase(fields)) {
						fields = key;
						values = key + "=?";
					} else {
						fields += "," + key;
						values += "," + key + "=?";
					}
					i++;
			}
			if ("".equals(fields)) {
				logger.error("bean is empty");
				throw new SQLException("bean is empty");
			}
			
			if(locked){
				fields+=","+versionField+"="+versionField+"+1";
			}
			sql = sql.replace("$values$", values);
			PreparedStatement tmt = conn.getConnection().prepareStatement(sql);
			for (int j = 0,len=column.length; j < len; j++) {
				Object obj = record.get(column[j]);
				if (obj instanceof Integer) {
					Integer value = (Integer) obj;
					tmt.setInt(j + 1, value != null ? value.intValue() : null);
				} else if (obj instanceof String) {
					String value = (String) obj;
					tmt.setString(j + 1, value);
				} else if (obj instanceof Double) {
					Double value = (Double) obj;
					tmt.setDouble(j + 1, value != null ? value.doubleValue() : null);
				} else if (obj instanceof Float) {
					Float value = (Float) obj;
					tmt.setFloat(j + 1, value != null ? value.floatValue() : null);
				} else if (obj instanceof Long) {
					Long value = (Long) obj;
					tmt.setLong(j + 1, value != null ? value.longValue() : null);
				} else if (obj instanceof Boolean) {
					Boolean value = (Boolean) obj;
					tmt.setBoolean(j + 1, value != null ? value.booleanValue()
							: null);
				} else if (obj instanceof Date) {
					Date value = (Date) obj;
					tmt.setString(j + 1, value != null ? BaseUtils.formatDate(value, "yyyy-MM-dd HH:mm:ss"): null);
//					tmt.setDate(j + 1,
//							value != null ? new java.sql.Date(value.getTime())
//									: null);
				}else{
					tmt.setString(j+1, null);
				}
			}
			int result=tmt.executeUpdate();
			tmt.close();
			tmt=null;
			logger.debug("SQL:" + sql);
			if(locked&&result==0){
				throw new SQLException("更新失败，数据已经过期。");
		    }
			return result;
		}finally {
			if (conn != null) {
				SqlSessionUtils.closeSqlSession(conn, sqlSessionTemplate.getSqlSessionFactory());
		   }
		}
	}

	public <T> T selectOneJDBC(Class<T> resultClass, String sql) throws SQLException {
		return selectOneJDBC(resultClass,sql,null);
	}

	public <T> T selectOneJDBC(Class<T> resultClass, String sql, String[] param) throws SQLException {
		SqlSession conn = SqlSessionUtils.getSqlSession(
				sqlSessionTemplate.getSqlSessionFactory(), sqlSessionTemplate.getExecutorType(),
				sqlSessionTemplate.getPersistenceExceptionTranslator());
		try{
			Object t = null;
			PreparedStatement tmt=conn.getConnection().prepareStatement(sql);
			if(param!=null&&param.length>0){
				for(int i=0;i<param.length;i++){
					tmt.setString(i+1, param[i]);
				}
			}
			ResultSet rs = tmt.executeQuery();
			if (rs.next()) {
				try {
					if(resultClass==String.class){
						t=rs.getString(1);
					} else if(resultClass==Map.class||resultClass==HashMap.class){
						t=new HashMap<String,String>();
						ResultSetMetaData   metaDate=rs.getMetaData();
						for(int i=0,len=metaDate.getColumnCount();i<len;i++){
							 try{
							((Map<String,String>)t).put(metaDate.getColumnLabel(i+1), rs.getString(metaDate.getColumnLabel(i+1)));
							 }catch(Exception ex){
							 }
						}
					}else{
						t = resultClass.newInstance();
						PropertyDescriptor[] descriptors = BeanUtilsBean.getInstance().getPropertyUtils().getPropertyDescriptors(t);
						 for (int i = 0,len=descriptors.length; i < len; i++){
							 PropertyDescriptor field=descriptors[i];
							 String name = field.getName();
							 if (("class".equals(name)) || (! BeanUtilsBean.getInstance().getPropertyUtils().isWriteable(t, name))){
								 continue;
							 }else{
								 try{
									 Object rvalue=null;
									 if(field.getPropertyType()==String.class){
										 rvalue=rs.getString(name);
									 }else if(field.getPropertyType()==Integer.class){
										 rvalue=Integer.valueOf(rs.getString(name));
									 }else if(field.getPropertyType()==Double.class){
										 rvalue=Double.valueOf(rs.getString(name));
									 }else if(field.getPropertyType()==Float.class){
										 rvalue=Float.valueOf(rs.getString(name));
									 }else if(field.getPropertyType()==Long.class){
										 rvalue=Long.valueOf(rs.getString(name));
									 }else if(field.getPropertyType()==Boolean.class){
										 rvalue=Boolean.valueOf(rs.getString(name));
									 }else if(field.getPropertyType()==Date.class){
										 Timestamp tm=rs.getTimestamp(name);
										 if(tm!=null){
											 rvalue=new Date(tm.getTime());
										 }
									 }else if(field.getPropertyType()==Clob.class){
										 Clob clob=rs.getClob(name);
										 if(clob!=null){
											 rvalue=clob.getSubString((long)1,(int)clob.length());
										 }
									 }
								    BeanUtilsBean.getInstance().copyProperty(t, name,rvalue);
								 }catch(Exception ex){
								 }
							 }
						 }
					}
					
				} catch (Exception e) {
					throw new SQLException(e.getMessage());
				}
			}
			rs.close();
			rs = null;
			tmt.close();
			tmt=null;
			return (T) t;
		}finally {
			if (conn != null) {
				SqlSessionUtils.closeSqlSession(conn, sqlSessionTemplate.getSqlSessionFactory());
		   }
		}
	}

	public <T> List<T> selectListJDBC(Class<T> resultClass, String sql) throws SQLException {
		return selectListJDBC(resultClass,sql,null);
	}
	
	public <T> List<T> selectListJDBC(Class<T> resultClass, final String sql,final String[] param)
			throws SQLException {
		SqlSession conn = SqlSessionUtils.getSqlSession(
				sqlSessionTemplate.getSqlSessionFactory(), sqlSessionTemplate.getExecutorType(),
				sqlSessionTemplate.getPersistenceExceptionTranslator());
		try{
			List<T> list = new ArrayList<T>();
			PreparedStatement tmt=conn.getConnection().prepareStatement(sql);
			if(param!=null&&param.length>0){
				for(int i=0,len=param.length;i<len;i++){
					tmt.setString(i+1, param[i]);
				}
			}
			ResultSet rs = tmt.executeQuery();
			while (rs.next()) {
				try {
					if(resultClass==String.class){
						list.add((T)rs.getString(1));
					}else if(resultClass==Map.class||resultClass==HashMap.class){
						Map<String,String> t = new HashMap<String,String>();
						ResultSetMetaData   metaDate=rs.getMetaData();
						for(int i=0,len=metaDate.getColumnCount();i<len;i++){
							 try{
							  t.put(metaDate.getColumnLabel(i+1), rs.getString(metaDate.getColumnLabel(i+1)));
							 }catch(Exception ex){
								 ex.printStackTrace();
							 }
						}
						list.add((T)t);
					}else{
						T t = resultClass.newInstance();
						PropertyDescriptor[] descriptors = BeanUtilsBean.getInstance().getPropertyUtils().getPropertyDescriptors(t);
						 for (int i = 0,len=descriptors.length; i < len; i++){
							 PropertyDescriptor field=descriptors[i];
							 String name = field.getName();
							 if (("class".equals(name)) || (! BeanUtilsBean.getInstance().getPropertyUtils().isWriteable(t, name))){
								 continue;
							 }else{
								 try{
									 Object rvalue=null;
									 if(field.getPropertyType()==String.class){
										 rvalue=rs.getString(name);
									 }else if(field.getPropertyType()==Integer.class){
										 rvalue=Integer.valueOf(rs.getString(name));
									 }else if(field.getPropertyType()==Double.class){
										 rvalue=Double.valueOf(rs.getString(name));
									 }else if(field.getPropertyType()==Float.class){
										 rvalue=Float.valueOf(rs.getString(name));
									 }else if(field.getPropertyType()==Long.class){
										 rvalue=Long.valueOf(rs.getString(name));
									 }else if(field.getPropertyType()==Boolean.class){
										 rvalue=Boolean.valueOf(rs.getString(name));
									 }else if(field.getPropertyType()==Date.class){
										 Timestamp tm=rs.getTimestamp(name);
										 if(tm!=null){
											 rvalue=new Date(tm.getTime());
										 }
									 }else if(field.getPropertyType()==Clob.class){
										 Clob clob=rs.getClob(name);
										 if(clob!=null){
											 rvalue=clob.getSubString((long)1,(int)clob.length());
										 }
									 }
								    BeanUtilsBean.getInstance().copyProperty(t, name,rvalue);
								 }catch(Exception ex){
								 }
							 }
						 }
						 list.add(t);
					}
				} catch (Exception e) {
					throw new SQLException(e.getMessage());
				}
			}
			rs.close();
			rs = null;
			tmt.close();
			tmt=null;
			return list;
		}finally {
			if (conn != null) {
				SqlSessionUtils.closeSqlSession(conn, sqlSessionTemplate.getSqlSessionFactory());
		   }
		}
	}

	public int countJDBC(String csql) throws SQLException {
		return countJDBC(csql,null);
	}

	public int countJDBC(String csql, String[] param) throws SQLException {
		SqlSession conn = SqlSessionUtils.getSqlSession(
				sqlSessionTemplate.getSqlSessionFactory(), sqlSessionTemplate.getExecutorType(),
				sqlSessionTemplate.getPersistenceExceptionTranslator());
		try{
			String sql = "SELECT COUNT(*) AS t "
					+ SqlUtils.removeOrders(SqlUtils.removeSelect(csql));
			int result = 0;
			PreparedStatement tmt=conn.getConnection().prepareStatement(sql);
			if(param!=null&&param.length>0){
				for(int i=0,len=param.length;i<len;i++){
					tmt.setString(i+1, param[i]);
				}
			}
			ResultSet rs=tmt.executeQuery();
			if (rs.next()) {
				result = rs.getInt("t");
			}
			rs.close();
			rs = null;
			tmt.close();
			tmt=null;
			return result;
		}finally {
			if (conn != null) {
				SqlSessionUtils.closeSqlSession(conn, sqlSessionTemplate.getSqlSessionFactory());
		   }
		}
	}

	public <T> PageVO<T> pageQueryJDBC(Class<T> resultClass, String sql, int pageNo, int pageSize) throws SQLException {
		return pageQueryJDBC(resultClass,sql,null,pageNo,pageSize);
	}

	public <T> PageVO<T> pageQueryJDBC(Class<T> resultClass, String sql, String[] param, int pageNo, int pageSize)
			throws SQLException {
		SqlSession conn = SqlSessionUtils.getSqlSession(
				sqlSessionTemplate.getSqlSessionFactory(), sqlSessionTemplate.getExecutorType(),
				sqlSessionTemplate.getPersistenceExceptionTranslator());
		try{
			List<T> result = new ArrayList<T>(0);
			int total = countJDBC(sql);
			if (total < 1)
				return new PageVO<T>();

			if (pageNo < 1) {
				pageNo = 1;
			}
			if (pageSize < 1) {
				pageSize = total;
			}
			int startIndex = PageVO.getStartOfPage(pageNo, pageSize);

			if (total > 0) {
				IDialect dialectImp = new SQLServer2005Dialect();
				if ("DB2".equalsIgnoreCase(dialect)) {
					dialectImp = new DB2Dialect();
				} else if ("DERBY".equalsIgnoreCase(dialect)) {
					dialectImp = new DerbyDialect();
				} else if ("MYSQL".equalsIgnoreCase(dialect)) {
					dialectImp = new MySQLDialect();
				} else if ("ORACLE".equalsIgnoreCase(dialect)) {
					dialectImp = new OracleDialect();
				} else if ("SQLSERVER".equalsIgnoreCase(dialect)) {
					dialectImp = new SQLServer2005Dialect();
				}
				String csql = dialectImp.getPaginationString(sql, startIndex,
						pageSize);
				result = selectListJDBC(resultClass, csql,param);
			}
			return new PageVO<T>(startIndex, total, pageSize, result);
		}finally {
			if (conn != null) {
				SqlSessionUtils.closeSqlSession(conn, sqlSessionTemplate.getSqlSessionFactory());
		   }
		}
	}

	public synchronized String getSeq(String bz, String table, String pk) {
		SqlSession conn = SqlSessionUtils.getSqlSession(
				sqlSessionTemplate.getSqlSessionFactory(), sqlSessionTemplate.getExecutorType(),
				sqlSessionTemplate.getPersistenceExceptionTranslator());
		try{
			int seq=1;
			String date=BaseUtils.formatDate(new Date(), "yyyyMMddHHmmss");
			try {
				String sql="SELECT TOP 1 "+pk+" as pk FROM "+table+" WHERE "+pk+" LIKE '"+bz+date+"%' ORDER BY "+pk+" DESC";
				if ("DB2".equalsIgnoreCase(dialect)) {
					sql="SELECT  "+pk+" AS pk FROM "+table+" WHERE "+pk+" LIKE '"+bz+date+"%' ORDER BY "+pk+" DESC FETCH FIRST 1 ROWS ONLY";
				} else if ("DERBY".equalsIgnoreCase(dialect)) {
					sql="SELECT "+pk+" AS pk FROM "+table+" WHERE "+pk+" LIKE '"+bz+date+"%' ORDER BY "+pk+" DESC LIMIT 1";
				} else if ("MYSQL".equalsIgnoreCase(dialect)) {
					sql="SELECT "+pk+" AS pk FROM "+table+" WHERE "+pk+" LIKE '"+bz+date+"%' ORDER BY "+pk+" DESC LIMIT 1";
				} else if ("ORACLE".equalsIgnoreCase(dialect)) {
					sql="SELECT * FROM ( SELECT "+pk+" AS pk FROM "+table+" WHERE "+pk+" LIKE '"+bz+date+"%' ORDER BY "+pk+" DESC) WHERE ROWNUM=1";
				} else if ("SQLSERVER".equalsIgnoreCase(dialect)) {
					sql="SELECT TOP 1 "+pk+" AS pk FROM "+table+" WHERE "+pk+" LIKE '"+bz+date+"%' ORDER BY "+pk+" DESC";
				}
				String zj=this.selectOneJDBC(String.class, sql);
				if(zj==null){
					seq=0;
				}else{
					zj=zj.substring((bz+date).length(),zj.length()-3);
					if("".equalsIgnoreCase(zj)){
					seq=0;	
					}else{
					seq=Integer.parseInt(zj);
					}
				}
				if(seq==0){
					seq=1;
				}else{
					seq++;
				}
			} catch (SQLException e) {
			}
			
			String sseq="";
			if(seq<10){
				sseq="00"+seq;
			}else if(seq<100){
				sseq="0"+seq;
			}else{
				sseq=seq+"";
			}
			
			String rnd="";
			Random  r=new Random((int)(Math.random()*100));
			int rint=r.nextInt(100);
			if(rint<10){
				rnd="00"+rint;
			}else if(rint<100){
				rnd="0"+rint;
			}else{
				rnd=rint+"";
			}
			return bz+date+sseq+rnd;
		}finally {
			if (conn != null) {
				SqlSessionUtils.closeSqlSession(conn, sqlSessionTemplate.getSqlSessionFactory());
		   }
		}
	}

	public String getUUID() {
		return UUIDUtils.getUUID();
	}
	
	/**
	 * mybatis封装
	 * **/
	public <T> PageVO<T> pagedQuery(String sqlMappingName, int pageNo, int pageSize,
			Object[] value) {
		List<T> result = new ArrayList<T>(0);

		int total = selectCount(sqlMappingName, value);

		if (total < 1)
			return new PageVO<T>();

		int startIndex = PageVO.getStartOfPage(pageNo, pageSize);
		
		if (total > 0) {
			result = selectPage(sqlMappingName, startIndex, pageSize, value);
		}

		return new PageVO<T>(startIndex, total, pageSize, result);
	}

	public <T> List<T> selectPage(String sqlMappingName, int begin, int end,
			Object[] value) {
		List list = null;

		if ((value != null) && (value.length > 0)) {
			list = this.sqlSessionTemplate.selectList(sqlMappingName, value[0],
					new RowBounds(begin, end));
		} else {
			list = this.sqlSessionTemplate.selectList(sqlMappingName, null,
					new RowBounds(begin, end));
		}
		return list;
	}

	public int selectCount(String sqlMappingName, Object[] value) {
		List list = null;

		if ((value != null) && (value.length > 0)) {
			list = this.sqlSessionTemplate.selectList(sqlMappingName, value[0],
					new RowBounds(-1000, -1000));
		} else {
			list = this.sqlSessionTemplate.selectList(sqlMappingName, null,
					new RowBounds(-1000, -1000));
		}

		Object rcount=((Map) list.get(0)).get("COUNTNUM");
		int intCount=0;
		if(rcount instanceof String){ 
			intCount=Integer.parseInt((String)rcount);
		}else if(rcount instanceof Integer){
			intCount=((Integer) rcount).intValue();
		}else if(rcount instanceof Float){
			intCount=Float.floatToIntBits((Float)rcount);
		}else if(rcount instanceof BigDecimal){
			intCount=((BigDecimal)rcount).intValue();
		}else if(rcount instanceof Long){
			intCount=((Long)rcount).intValue();
		}
		return intCount;
	}

	public <T> List<T> selectList(String sqlMappingName, Object[] value) {
		List list = null;

		if ((value != null) && (value.length > 0)) {
			list = this.sqlSessionTemplate.selectList(sqlMappingName, value[0]);
		} else {
			list = this.sqlSessionTemplate.selectList(sqlMappingName);
		}
		return list;
	}

	public <T> T selectOne(String sqlMappingName, Object[] value) {
		Object t = null;

		if ((value != null) && (value.length > 0)) {
			t = this.sqlSessionTemplate.selectOne(sqlMappingName, value[0]);
		} else {
			t = this.sqlSessionTemplate.selectOne(sqlMappingName);
		}

		return (T)t;
	}

	public int insert(String sqlMappingName, Object[] value) {
		if ((value != null) && (value.length > 0)) {
			return this.sqlSessionTemplate.insert(sqlMappingName, value[0]);
		}

		return this.sqlSessionTemplate.insert(sqlMappingName);
	}

	public int update(String sqlMappingName, Object[] value) {
		if ((value != null) && (value.length > 0)) {
			return this.sqlSessionTemplate.update(sqlMappingName, value[0]);
		}

		return this.sqlSessionTemplate.update(sqlMappingName);
	}

	public int delete(String sqlMappingName, Object[] value) {
		if ((value != null) && (value.length > 0)) {
			return this.sqlSessionTemplate.delete(sqlMappingName, value[0]);
		}

		return this.sqlSessionTemplate.delete(sqlMappingName);
	}
	
	
	
	
	
	

}
