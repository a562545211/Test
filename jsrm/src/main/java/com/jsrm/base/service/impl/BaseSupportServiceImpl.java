package com.jsrm.base.service.impl;

import com.jsrm.base.service.BaseService;
import com.jsrm.base.service.SqlDao;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;

import javax.annotation.Resource;

/**
 * 业务类基础封装
 */
public class BaseSupportServiceImpl implements BaseService {

	@Resource
	private SqlDao defaultSqlDao;
	
	@Resource
	private MessageSource messageSource;

	public SqlDao getDao() {
		return defaultSqlDao;
	}

	public String getMessage(String msgStr) {
		return getMessage(msgStr,null);
	}

	public String getMessage(String msgStr,Object[] args) {
		return messageSource.getMessage(msgStr, args, LocaleContextHolder.getLocale());
	}

}
