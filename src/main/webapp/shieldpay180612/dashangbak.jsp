<%@ page import="com.smile.azxx.util.RandomGUID" %><%--
  Created by IntelliJ IDEA.
  User: smile
  Date: 2018/5/9
  Time: 12:58
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>打赏</title>
    <meta charset="utf-8">
    <%@ include file="/pages/common/base.jsp" %>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="smile">
    <meta name="author" content="smile">
    <meta name="keyword" content="smile">
    <link href="${bootstrapCss}" rel="stylesheet">
    <link href="dashang.css" rel="stylesheet">
</head>
<%
    String safeDomain = request.getParameter("safeDomain");
    String linkId = request.getParameter("linkId");
    String appId = request.getParameter("appId");
    String ldDomain = request.getParameter("ldDomain");
    String price = request.getParameter("price");
    String type = request.getParameter("type");
    String randStr = new RandomGUID().getUUID32().substring(0,5);
%>
<body>
<div style="display: none;">
    《我喜欢你是寂静的》
    作者：【智利】聂鲁达
    朗诵：篁竹瑾

    我喜欢你是寂静的，仿佛你消失了一样，
    你从远处聆听我，我的声音却无法触及你。
    好像你的双眼已经飞离去，如同一个吻，封缄了你的嘴。
    如同所有的事物充满了我的灵魂，
    你从所有的事物中浮现，充满了我的灵魂。
    你像我的灵魂，一只梦的蝴蝶。你如同忧郁这个词。
    我喜欢你是寂静的，好像你已远去。
    你听起来像在悲叹，,一只如鸽悲鸣的蝴蝶。
    你从远处听见我，我的声音无法触及你：
    让我在你的沉默中安静无声。
    并且让我借你的沉默与你说话，
    你的沉默明亮如灯，简单如指环，
    你就像黑夜，拥有寂寞与群星。
    你的沉默就是星星的沉默，遥远而明亮。
    我喜欢你是寂静的，仿佛你消失了一样，
    遥远而且哀伤，仿佛你已经死了。
    彼时，一个字，一个微笑，已经足够。
    而我会觉得幸福，因那不是真的而觉得幸福。
</div>
<div id="background" style="position:absolute;z-index:-1;width:100%;height:100%;top:0px;left:0px;"><img
        src="5.jpg" width="100%" height="100%"></div>
<p class="sheng"><a onclick="da()">打赏观看</a></p>
<div class="content">
    <div class="nav" style="opacity:0.7"><img src="redbg.png">
        <p class="p1" style="font-size: 13px;"><a onclick="dj()"
                                                  style="position: absolute; top: 0px; left: 4%;font-size:20px;color:#9d2129;">×</a></p>
        <p class="p3"><%=price%><span style="font-size:12px;">元</span></p>
        <%--<p class="p2">打赏看视频，金额随机</p>--%>
        <p class="p5">(内容由用户发布,并非平台提供,赏金归发布者)</p>
        <div class="reward" style="">
            <div class="button" style="width:100%;font-size:15px;height:40px;line-height:40px;"><a onclick="wxpay()" style="background:#fae2b2;border-radius:10px; color:#d35b4d;display:inline-block;width:100%;height:40px;font-weight:bold;margin-left:1px">打赏</a>
                &nbsp;</div>
            <a href="#" onclick="showInfo();">
                <button type="button" class="submit1">我也要赚钱</button>
            </a></div>
        <div style="text-align:center; color:#fff; font-size:14px; margin-top:8px; padding:10px; "></div>
    </div>
</div>
<div class="daxiao"><span>视频大小：</span>
    <span id="filesize">0</span>
    <span>M，时长：</span>
    <span id="timelength">0</span></div>
<div class="footer"><a href="ts.jsp">   &nbsp;&nbsp;&nbsp;投诉</a></div>
<div style="width:100%;height:100%;background:#000;position:fixed;top:0; filter:alpha(opacity=50); -moz-opacity:0.5; -khtml-opacity: 0.5; opacity:0.5;"
     id="touming"></div>
<div class="erwei" style="display:none;">
    <div class="erweima"
         style="width:200px;height:160px;background:#fff;margin:0 auto;position:relative;border-radius:10px;margin-top:55%;">
        <p style="border-bottom:1px solid #ccc;padding:0 10px; height:30px; line-height: 30px;"><a onclick="gb()"style="position: absolute; top: 0; right: 4%;">×</a>请联系获取邀请码
        </p>
        <div style="padding: 10px;">稳定打赏大平台招募代理中 具体加微信咨询<br><br>微信:000</div>
    </div>
</div>
<div class="modal" id="infoModal" tabindex="-1" role="dialog" data-backdrop="static">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">提示</h4>
            </div>
            <div class="modal-body">"微信号：smiel;<br><br>QQ：1111111";</div>
            <div class="modal-footer" style="text-align: center;">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
</body>
<script type="text/javascript" src="${jqueryJs}"></script>
<script type="text/javascript" src="${bootstrapJs}"></script>
<script type="text/javascript" src="${jsDir}/common/Utils.js"></script>
<script type="text/javascript">
    function dj() {
        $('.nav').css('display', 'none');
        $('.sheng').css('display', 'block');
    }
    function da() {
        $('.nav').css('display', 'block');
        $('.sheng').css('display', 'none');
    }
    function dianji() {
        $('.erwei').css('display', 'block');
    }
    function gb() {
        $('.erwei').css('display', 'none');
    }
    function wxpay() {
        var _loading = '<div class="_loading" style="position:fixed;left:50%;top:40%;margin-left:-40px;width:90px;height:80px;border-radius:5%;background:#000;opacity:0.8;background:#000 url(loading.gif) center 12px no-repeat;background-size:25px;z-index:99999;color:#000000;text-align:center;font-size:12px;"><br><br><br>正在提交订单...</div>';
        $('body').append(_loading);
        <%--alert("jumptips.jsp?linkId="+"<%=linkId%>");--%>
        window.location.href = "jumptips.jsp?linkId="+"<%=linkId%>&type=<%=type%>";
    }
    //    setInterval(getNo, 5000);
    function getNo() {
        $.ajax({
            type: "post",
            url: "ip.php",
            datatype: "json",
            async: true,
            data: {},
            timeout: 10000,
            success: function (data) {
                var obj = eval("(" + data + ")");
                if (obj.status == "1") {
                    $.message('来自' + obj.ip + '用户打赏了 5.4 元看了视频');
                }
            },
            error: function () {
            },
        });
    }
    setInfo();
    function showInfo() {
        $("#infoModal").modal("show");
    }
    function setInfo() {
        $.ajax({
            type: "post",
            url: smile.baseURL() + "/wxpay/getVideoInfo",
            data: {
                linkId: "<%=linkId%>"
            },
            dataType: "json",
            success: function (data) {
                if (data != null && data.success == 'true') {
                    $("#filesize").text(data.data.fileSize);
                    $("#timelength").text(data.data.timeLength);
                }
            }
        })
    }
    function toOrder2() {
        <%--alert("<%=safeDomain%>/reward/wxpay/toOrder2.jsp?safeDomain=<%=safeDomain%>&appId=<%=appId%>&linkId=<%=linkId%>");--%>
//        document.location = "http://www.isspark.com/reward/wxpay/toOrder2.jsp";
        if (paytype == "weixin") {
            document.location = "http://<%=safeDomain%>/reward/wxpay/toOrder2.jsp?safeDomain=<%=safeDomain%>&appId=<%=appId%>&linkId=<%=linkId%>&ldDomain=<%=ldDomain%>";
        } else {
            <%--document.location = "http://<%=randStr%>.<%=safeDomain%>/reward/wxpay/toOrder2.jsp?safeDomain=<%=safeDomain%>&appId=<%=appId%>&linkId=<%=linkId%>&ldDomain=<%=ldDomain%>";--%>
            document.location = "http://<%=safeDomain%>/reward/wxpay/toOrder2.jsp?safeDomain=<%=safeDomain%>&appId=<%=appId%>&linkId=<%=linkId%>&ldDomain=<%=ldDomain%>";
        }
    }
</script>
</html>
