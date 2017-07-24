/**
 * FunctionServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package webService.test;

public class FunctionServiceLocator extends org.apache.axis.client.Service implements webService.test.FunctionService {

    public FunctionServiceLocator() {
    }


    public FunctionServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public FunctionServiceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for FunctionPort
    private java.lang.String FunctionPort_address = "http://localhost:8080/service/function";

    public java.lang.String getFunctionPortAddress() {
        return FunctionPort_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String FunctionPortWSDDServiceName = "FunctionPort";

    public java.lang.String getFunctionPortWSDDServiceName() {
        return FunctionPortWSDDServiceName;
    }

    public void setFunctionPortWSDDServiceName(java.lang.String name) {
        FunctionPortWSDDServiceName = name;
    }

    public webService.test.Function getFunctionPort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(FunctionPort_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getFunctionPort(endpoint);
    }

    public webService.test.Function getFunctionPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            webService.test.FunctionPortBindingStub _stub = new webService.test.FunctionPortBindingStub(portAddress, this);
            _stub.setPortName(getFunctionPortWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setFunctionPortEndpointAddress(java.lang.String address) {
        FunctionPort_address = address;
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (webService.test.Function.class.isAssignableFrom(serviceEndpointInterface)) {
                webService.test.FunctionPortBindingStub _stub = new webService.test.FunctionPortBindingStub(new java.net.URL(FunctionPort_address), this);
                _stub.setPortName(getFunctionPortWSDDServiceName());
                return _stub;
            }
        }
        catch (java.lang.Throwable t) {
            throw new javax.xml.rpc.ServiceException(t);
        }
        throw new javax.xml.rpc.ServiceException("There is no stub implementation for the interface:  " + (serviceEndpointInterface == null ? "null" : serviceEndpointInterface.getName()));
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(javax.xml.namespace.QName portName, Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        if (portName == null) {
            return getPort(serviceEndpointInterface);
        }
        java.lang.String inputPortName = portName.getLocalPart();
        if ("FunctionPort".equals(inputPortName)) {
            return getFunctionPort();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://test.webService/", "FunctionService");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://test.webService/", "FunctionPort"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("FunctionPort".equals(portName)) {
            setFunctionPortEndpointAddress(address);
        }
        else 
{ // Unknown Port Name
            throw new javax.xml.rpc.ServiceException(" Cannot set Endpoint Address for Unknown Port" + portName);
        }
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(javax.xml.namespace.QName portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        setEndpointAddress(portName.getLocalPart(), address);
    }

}
