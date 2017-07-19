package com.jsrm.base.common;





public final class BusinessException extends RuntimeException {

	private static final long serialVersionUID = 1721891525581654383L;

	public BusinessException(){
		super();
	}
	
	public BusinessException(String msg){
		super(msg);
	}
	
	public String getMessage() {
		return super.getMessage();
	}

	

}