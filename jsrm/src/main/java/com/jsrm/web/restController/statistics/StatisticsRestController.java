package com.jsrm.web.restController.statistics;

import com.jsrm.base.common.BaseRestController;
import com.jsrm.model.user.User;
import com.jsrm.service.statistics.StatisticsService;
import com.jsrm.service.user.UserService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.*;

/**
 * 首页数据统计
 * Created by wdCao on 2016/10/20.
 */
@RestController()
@RequestMapping("/statistics")
public class StatisticsRestController extends BaseRestController {
    public static final Log log = LogFactory.getLog(StatisticsRestController.class);      //log对象

    @Resource
    private StatisticsService statisticsService;

    /**
     *个人中心(上传管理)
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/statisticsUpload")
    @ResponseBody
    private Map<String,Object> statisticsUpload(HttpServletRequest request, HttpServletResponse response) {
        Map<String,Object> result = new HashMap<String,Object>();
        Map<String,Object> params = new HashMap<String,Object>();
        Map<String,Object> num = new LinkedHashMap<String,Object>();
        try {
            HttpSession session = request.getSession(true);
            //从session里取的用户信息
            User userSession = (User) session.getAttribute("UserBean");
            if(userSession != null){
                params.put("userId",userSession.getId());
                //上传管理待提交数量
                Integer pendingSubmissionUploadNum = statisticsService.pendingSubmissionUpload(new Object[]{params});
                //上传管理待审核数量
                Integer pendingApprovalUploadNum = statisticsService.pendingApprovalUpload(new Object[]{params});
                //上传管理不通过数量
                Integer auditDoesNotPassUploadNum = statisticsService.auditDoesNotPassUpload(new Object[]{params});

                num.put("pendingSubmissionUploadNum",pendingSubmissionUploadNum);
                num.put("pendingApprovalUploadNum",pendingApprovalUploadNum);
                num.put("auditDoesNotPassUploadNum",auditDoesNotPassUploadNum);

                result.put("stats",0);
                result.put("data",num);
            }

        }catch (Exception e){
            e.printStackTrace();
            result.put("stats",1);
        }
        return result;
    }

    /**
     *个人中心(选题发稿)
     * @param request
     * @param response
     * @param user
     * @return
     */
    @RequestMapping("/statisticsDwraft")
    @ResponseBody
    private Map<String,Object> statisticsDwraft(HttpServletRequest request, HttpServletResponse response,User user) {
        Map<String,Object> result = new HashMap<String,Object>();
        Map<String,Object> params = new HashMap<String,Object>();
        Map<String,Object> num = new LinkedHashMap<String,Object>();
        try {
            HttpSession session = request.getSession(true);
            //从session里取的用户信息
            User userSession = (User) session.getAttribute("UserBean");
            if(userSession != null) {
                params.put("userId", userSession.getId());
                //选题发稿待提交数量
                Integer pendingSubmissionDraft = statisticsService.pendingSubmissionDraft(new Object[]{params});
                //选题发稿待审核数量
                Integer pendingApprovalDraft = statisticsService.pendingApprovalDraft(new Object[]{params});
                //选题发稿待终审数量
                Integer finalJudgmentDwraft = statisticsService.finalJudgmentDwraft(new Object[]{params});
                //选题发稿已退回数量
                Integer pendingBackDraft =statisticsService.pendingBackDraft(new Object[]{params});

                num.put("pendingSubmissionDraftNum", pendingSubmissionDraft);
                num.put("pendingApprovalDraftNum", pendingApprovalDraft);
                num.put("finalJudgmentDwraftNum", finalJudgmentDwraft);
                num.put("pendingBackDraftNum", pendingBackDraft);

                result.put("stats", 0);
                result.put("data", num);
            }
        }catch (Exception e){
            e.printStackTrace();
            result.put("stats",1);
        }
        return result;
    }

    /**
     *个人中心(资源审核)
     * @param request
     * @param response
     * @param user
     * @return
     */
    @RequestMapping("/statisticsResource")
    @ResponseBody
    private Map<String,Object> statisticsResource(HttpServletRequest request, HttpServletResponse response,User user) {
        Map<String,Object> result = new HashMap<String,Object>();
        Map<String,Object> params = new HashMap<String,Object>();
        Map<String,Object> num = new LinkedHashMap<String,Object>();
        try {
            HttpSession session = request.getSession(true);
            //从session里取的用户信息
            User userSession = (User) session.getAttribute("UserBean");
            if(userSession != null) {
                params.put("userId", userSession.getId());
                //资源审核上传待审核数量
                Integer uploadpendingApprovalResource = statisticsService.uploadpendingApprovalResource(new Object[]{params});
                //资源审核发稿待审核数量
                Integer dwraftPendingApprovalResource = statisticsService.dwraftPendingApprovalResource(new Object[]{params});
                //资源审核发稿待终审数量
                Integer dwraftFinalJudgmentResource = statisticsService.dwraftFinalJudgmentResource(new Object[]{params});

                num.put("uploadpendingApprovalResourceNum", uploadpendingApprovalResource);
                num.put("dwraftPendingApprovalResourceNum", dwraftPendingApprovalResource);
                num.put("dwraftFinalJudgmentResourceNum", dwraftFinalJudgmentResource);

                result.put("stats", 0);
                result.put("data", num);
            }
        }catch (Exception e){
            e.printStackTrace();
            result.put("stats",1);
        }
        return result;
    }

}
