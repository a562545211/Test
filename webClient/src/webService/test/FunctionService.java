/**
 * FunctionService.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package webService.test;

public interface FunctionService extends javax.xml.rpc.Service {
    public java.lang.String getFunctionPortAddress();

    public webService.test.Function getFunctionPort() throws javax.xml.rpc.ServiceException;

    public webService.test.Function getFunctionPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException;
}
