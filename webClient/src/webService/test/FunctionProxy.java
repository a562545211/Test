package webService.test;

public class FunctionProxy implements webService.test.Function {
  private String _endpoint = null;
  private webService.test.Function function = null;
  
  public FunctionProxy() {
    _initFunctionProxy();
  }
  
  public FunctionProxy(String endpoint) {
    _endpoint = endpoint;
    _initFunctionProxy();
  }
  
  private void _initFunctionProxy() {
    try {
      function = (new webService.test.FunctionServiceLocator()).getFunctionPort();
      if (function != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)function)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)function)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
    catch (javax.xml.rpc.ServiceException serviceException) {}
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (function != null)
      ((javax.xml.rpc.Stub)function)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public webService.test.Function getFunction() {
    if (function == null)
      _initFunctionProxy();
    return function;
  }
  
  public java.lang.String transWords(java.lang.String arg0) throws java.rmi.RemoteException{
    if (function == null)
      _initFunctionProxy();
    return function.transWords(arg0);
  }
  
  
}