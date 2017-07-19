package com.jsrm.base.utils;

import org.apache.log4j.Logger;
import org.springframework.context.ApplicationContext;

@SuppressWarnings("all")
public class SpringContextHolder
{
  private static ApplicationContext applicationContext = null;

  private static final Logger logger = Logger.getLogger(SpringContextHolder.class);

  public void setApplicationContext(ApplicationContext applicationContext)
  {
    logger.debug("注入ApplicationContext到SpringContextHolder:" + applicationContext);
    SpringContextHolder.applicationContext = applicationContext;
  }

  public void destroy()
    throws Exception
  {
    clear();
  }

  public static ApplicationContext getApplicationContext()
  {
    assertContextInjected();
    return applicationContext;
  }

  public static <T> T getBean(String name)
  {
    assertContextInjected();
    return (T) applicationContext.getBean(name);
  }

  public static <T> T getBean(String name, Class<T> requiredType)
  {
    assertContextInjected();
    return applicationContext.getBean(name, requiredType);
  }

  public static void clear()
  {
    logger.debug("清除SpringContextHolder中的ApplicationContext:" + applicationContext);
    applicationContext = null;
  }

  private static void assertContextInjected()
  {
    if (applicationContext == null)
      throw new IllegalStateException("applicaitonContext未注入,请在applicationContext.xml中定义SpringContextHolder");
  }
}
