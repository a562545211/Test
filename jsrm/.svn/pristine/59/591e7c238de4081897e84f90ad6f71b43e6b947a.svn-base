package com.jsrm.base.filter;

import com.jsrm.model.user.User;
import net.sf.json.JSONObject;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by liguoxiang on 2016/10/24.
 */
public class SessionFilter implements Filter {

    // 不拦截的url
    String[] notFilter = new String[] {"/login.html","/js", "/css", "/image", "selectExiteUser","/userRest/login","/resourceFile/saveResourceFile", "/callBack/convertCallBack", "/callBack/convertThumbnailCallBack", "/callBack/convertSampleCallBack", "/callBack/convertUploadCallBack"};

    public void init(FilterConfig filterConfig) throws ServletException {
        System.out.print("----------------------过滤器启动------------------");
    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        // 请求的url
        String url = req.getRequestURI();
        if(chek(notFilter,url)) {       //验证url是否拦截

            HttpSession session = req.getSession(true);
            //从session里取的用户名信息
            User user = (User) session.getAttribute("UserBean");
            //判断如果没有取到用户信息,就跳转到登陆页面
            if ((user == null)) {            //跳转到登陆页面

                if(isAjaxRequest(request)){     //判断是否为ajax请求
                    JSONObject json = new JSONObject();
                    json.put("status", "-9");
                    json.put("message", "请重新登录!");

                    PrintWriter writer = response.getWriter();
                    writer.write(json.toString());
                    writer.flush();
                    writer.close();

                    throw new IOException("session失效，请重新登录!");
                } else {
                    res.sendRedirect("/static/html/login/login.html");
                }
            } else {            //已经登陆,继续此次请求
                chain.doFilter(req, res);
            }
        }else {            //已经登陆,继续此次请求
            chain.doFilter(req, res);
        }
    }

    /**
     * @param notFilter 不拦截的url
     * @param url ：请求的url
     * @return false：不拦截
     *         true：拦截
     */
    public boolean chek(String[] notFilter,String url){
        //url以css和js结尾的不进行拦截
        if(url.endsWith(".css") || url.endsWith(".js")){
            return false;
        }
        //含有notFilter中的任何一个则不进行拦截
        for (String s : notFilter) {
            if (url.indexOf(s) != -1) {
                return false;
            }
        }
        return true;
    }

    public void destroy() {
        System.out.print("-----------------------销毁-----------------------------");
    }

    /**
     * 判断请求是否为ajax请求
     * @param request
     * @return
     */
    protected boolean isAjaxRequest(ServletRequest request) {
        HttpServletRequest httpRequest = (HttpServletRequest) request;

        String requestType = httpRequest.getHeader("X-Requested-With");
        if(requestType!=null && requestType.equals("XMLHttpRequest")) {
            return true;
        }

        return false;
    }
}
