package com.jsrm.base.utils;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

@SuppressWarnings("all")
public class ReflectionToStringBuilderExt extends ReflectionToStringBuilder
{
  private static final List<Class<?>> PrimitiveClasses = new ArrayList() { } ;

  public static final boolean isPrimitive(Class<?> cls)
  {
    return (cls.isPrimitive()) || (PrimitiveClasses.contains(cls));
  }

  public ReflectionToStringBuilderExt(Object object)
  {
    super(object);
  }

  public ReflectionToStringBuilderExt(Object object, ToStringStyle style, StringBuffer buffer, Class<?> reflectUpToClass, boolean outputTransients, boolean outputStatics)
  {
    super(object, style, buffer, reflectUpToClass, outputTransients, outputStatics);
  }

  protected boolean accept(Field field)
  {
    return (isPrimitive(field.getType())) && (super.accept(field));
  }

  protected void appendFieldsIn(Class clazz)
  {
    super.appendFieldsIn(clazz);
  }
}