package com.jsrm.base.utils;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

import java.util.List;
import java.util.Map;
import java.util.Set;


public class RedisUtil {
	 //Redis服务器IP
    private static String ADDR = Constants.REDIS_IP;
    
    //Redis的端口号
    private static int PORT = Constants.REDIS_PORT;
    
    //访问密码
    private static String AUTH = Constants.REDIS_AUTH;
    
    //可用连接实例的最大数目，默认值为8；
    //如果赋值为-1，则表示不限制；如果pool已经分配了maxActive个jedis实例，则此时pool的状态为exhausted(耗尽)。
    private static int MAX_ACTIVE = 1024;
    
    //控制一个pool最多有多少个状态为idle(空闲的)的jedis实例，默认值也是8。
    private static int MAX_IDLE = 200;
    
    //等待可用连接的最大时间，单位毫秒，默认值为-1，表示永不超时。如果超过等待时间，则直接抛出JedisConnectionException；
    private static int MAX_WAIT = 10000;
    
    private static int TIMEOUT = 10000;
    
    //在borrow一个jedis实例时，是否提前进行validate操作；如果为true，则得到的jedis实例均是可用的；
    private static boolean TEST_ON_BORROW = true;
    
    private static JedisPool jedisPool = null;
    
    /**
     * 初始化Redis连接池
     */
    static {
        try {
            JedisPoolConfig config = new JedisPoolConfig();
            
            config.setMaxTotal(MAX_ACTIVE);
            config.setMaxIdle(MAX_IDLE);
            config.setMaxWaitMillis(MAX_WAIT);
            config.setTestOnBorrow(TEST_ON_BORROW);
            jedisPool = new JedisPool(config, ADDR, PORT, TIMEOUT, AUTH);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    /**
     * 获取Jedis实例
     * @return
     */

    public synchronized static Jedis getJedis() {
    	Jedis resource=null;
        try {
            if (jedisPool != null) {
                resource = jedisPool.getResource();
                return resource;
            } 
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }finally{
        	returnResource(resource);  
        }
        return resource;
    }
    
    /**
     * 释放jedis资源
     * @param jedis
     */
    public static void returnResource(final Jedis jedis) {
        if (jedis != null) {
            jedisPool.returnResource(jedis);
        }
    }

    public static Set<String> getKeys(String patten){
        Jedis jedis = null;
        Set<String> keys = null;
        try {
            jedis = jedisPool.getResource();
            keys = jedis.keys(patten);
        } catch (Exception e) {
            returnResource(jedis);
            e.printStackTrace();
        } finally {
            returnResource(jedis);
        }
        return keys;
    }

    /**
     * 
     * @param   key
     * @return 成功返回value，失败返回null
     */
    public  static String get(String key){
    	Jedis jedis = null;

        String value = null; 
        try {

            jedis = jedisPool.getResource();

            value = jedis.get(key);

        } catch (Exception e) {

            returnResource(jedis);

            e.printStackTrace();

        } finally {

            if(null != jedisPool) {

                returnResource(jedis);

            }

        }

        return value; 
    }
    /**
     * 
     * @param key 键
     * @param value 与key对应的值
     * @return 成功返回“OK”，失败返回“0”
     */
    public static String set(String key,String value){

        Jedis jedis = null;

        try {

            jedis = jedisPool.getResource();

            return jedis.set(key, value);

        } catch (Exception e) {

            returnResource(jedis);

            e.printStackTrace();

            return "0";

        } finally {

            if(null != jedisPool) {

                returnResource(jedis);

            }

        }

    } 
    /**
     * 判断key是否存在
     * @param key  键
     * @return  true  or  false
     */
    public static Boolean exists(String key){
        Jedis jedis = null;
        try {
          jedis =jedisPool.getResource();
          return jedis.exists(key);
        } catch (Exception e) {
            returnResource(jedis);
            e.printStackTrace();
          
        } finally {
            returnResource(jedis);
        }
        return false;
      }

    /**
     * 设置key value并制定这个键值的有效期
     * @param key  键
     * @param value  值
     * @param seconds 有效期  单位：秒
     * @return  成功返回OK 失败和异常返回null
     */
    public static String setex(String key,String value,int seconds){
        Jedis jedis = null;
        String res = null;
        try {
          jedis = jedisPool.getResource();
          res = jedis.setex(key, seconds, value);
        } catch (Exception e) {
            returnResource(jedis);
            e.printStackTrace();
        } finally {
            returnResource(jedis);
        }
        return res;
      }
    /**
     * 通过key同时设置 hash的多个field
     * @param key
     * @param hash
     * @return  返回OK 异常返回null
     */
    public static String hmset(String key,Map<String, String> hash){
        Jedis jedis = null;
        String res = null;
        try {
          jedis = jedisPool.getResource();
          res = jedis.hmset(key, hash);
        } catch (Exception e) {
            returnResource(jedis);
            e.printStackTrace();
        } finally {
            returnResource(jedis);
        }
        return res;
      }
    /**
     * 通过key同时设置 hash的多个field 设置过期时间 单位秒
     * @param key
     * @param hash
     * @param seconds 过期时间 （秒）
     * @return  返回OK 异常返回null
     */
    public static String hmsetx(String key,Map<String, String> hash,int seconds){
        Jedis jedis = null;
        String res = null;
        try {
          jedis = jedisPool.getResource();
          res = jedis.hmset(key, hash);
          jedis.expire(key, seconds);
        } catch (Exception e) {
            returnResource(jedis);
            e.printStackTrace();
        } finally {
            returnResource(jedis);
        }
        return res;
      }
    /**
     * 通过key获取所有的field和value
     * @param key
     * @return 没有返回null
     */
    public static Map<String, String> hgetall(String key){
        Jedis jedis = null;
        Map<String, String> res = null;
        try {
          jedis = jedisPool.getResource();
          res = jedis.hgetAll(key);
        } catch (Exception e) {
            returnResource(jedis);
            e.printStackTrace();
        } finally {
            returnResource(jedis);
        }
        return res;
      }
    /**
     * 通过key 和 field 获取指定的 value
     * @param key
     * @param field
     * @return 没有返回null
     */
    public static String hget(String key, String field){
        Jedis jedis = null;
        String res = null;
        try {
          jedis = jedisPool.getResource();
          res = jedis.hget(key, field);
        } catch (Exception e) {
            returnResource(jedis);
            e.printStackTrace();
        } finally {
            returnResource(jedis);
        }
        return res;
      }
    
    /**
     * 通过key 和 fields 获取指定的value 如果没有对应的value则返回null
     * @param key
     * @param fields 可以使 一个String 也可以是 String数组
     * @return
     */
    public static List<String> hmget(String key,String...fields){
        Jedis jedis = null;
        List<String> res = null;
        try {
          jedis = jedisPool.getResource();
          res = jedis.hmget(key, fields);
        } catch (Exception e) {
            returnResource(jedis);
            e.printStackTrace();
        } finally {
            returnResource(jedis);
        }
        return res;
      }
    
    /**
     * 删除指定的key,也可以传入一个包含key的数组
     * @param keys  一个key  也可以使 string 数组
     * @return  返回删除成功的个数 
     */
    public static Long del(String...keys){
        Jedis jedis = null;
        try {
          jedis = jedisPool.getResource();
          return jedis.del(keys);
        } catch (Exception e) {
            returnResource(jedis);
            e.printStackTrace();
            return 0L;
        } finally {
            returnResource(jedis);
        }
      }
    
    /**
     * 通过key设置过期时间 单位秒
     * @param key
     * @param seconds 过期时间 （秒）
     * @return  
     */
    public static void expire(String key,int seconds){
        Jedis jedis = null;
        try {
          jedis = jedisPool.getResource();
          jedis.expire(key, seconds);
        } catch (Exception e) {
            returnResource(jedis);
            e.printStackTrace();
        } finally {
            returnResource(jedis);
        }

    }
}
