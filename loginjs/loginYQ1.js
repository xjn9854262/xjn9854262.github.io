
//****************************** */
var useHttps;
var gonggaoUrl = "loginjs/brocastServer.php?v12";
var selectServerUrl = "loginjs/selectServer.php";
var serversUrl = "loginjs/servers.php";

var maxZoneid = 100;//最大区
var ip = null;
var port;
var zoneid;
var alias;
var state = 1;
var version = "V26";
var whitelist;
var zoneDic = null;  // 
var recentServers = null; //最近服务器列表
var formalServers = null; //服务器列表
var serverData = null;  // 选服接口返回的服务器列表数据
var isGetServer = false;
var isNewRole = 0;
var isClickEnter = false;
var isLoadEgret = false;
var isLoadMain = false;
var versionFn = "gameVer";

var isGG = false;//是否打开过公告

function showgonggao(e) {

    if (loginArg) {
        showgg()
        if (!isGG) {
            isGG = true;
            var url;
            url = loginArg.serverHttpUrl + "?";
            var data = {};
            data.randnum = Math.random();
            data.cmd = 102;
            data.pf = loginArg.platform;
            if (isTest) {//内测
                data.testserver = 1;
            }

            loadHttp(url, function (result) {
                $('#ggcontent').html("" + result);
            }, data);
        }
    }
}
$(document).ready(function (e) {
    if (isTest) {
        version = testVesion;
    }
    $('.goplay').click(function () {
        if (!ip || !loginArg) {
            return;
        }
        if (state == 0 && !whitelist) {//不是白名单
            if ($("#alert").length <= 0) {
                createAlert();
                //维护时间
                var url = loginArg.serverHttpUrl;
                var data = {};
                data.randnum = Math.random();
                data.cmd = 110;
                data.pf = loginArg.platform;
                data.zoneid = zoneid;
                loadHttp(url, function (ret) {
                    $('.alertContent').html("维护时间：<br>" + ret);
                }, data);
            }
            showAlert();
            return;
        }
        $("#gg").remove();
        $('#choose').remove();
        $("#slist").remove();
        $("#popbg").remove();

        $('#loading').addClass('loading loading_webkit');
        $('#loading').removeClass('loading_none');
        isClickEnter = true;
        sendLoginMsg();
        bodyOnLoad();
    })
    //公告
    $('#ggbtn').click(showgonggao);
    $('#ggclose,#ggtopclose').click(function (e) { hidegg() });
    //选服页交互
    $('.servername').click(function (e) {
        if (loginArg) {
            if (!isGetServer) {
                isGetServer = true;
                // var url = loginArg.serverHttpUrl;
                // var data = {};
                // data.randnum = Math.random();
                // data.cmd = 101;
                // data.pf = loginArg.platform;
                // data.account = loginArg.account;
                // data.type = 2;
                // if (isTest) {//内测
                //     data.testserver = 1;
                // }

                // loadHttp(url, function (result) {
                //     serverData = JSON.parse(result);
                //     initServerData();
                // }, data);
                initServerData();
            }
            showslist();
        }

    });

    $('#sclosetitle,#sclose').click(function (e) {
        showchoose();
    });

    if (isTest || DEBUGM) {
        initLoginData();
    } else {
        initData();
    }
});

function initData() {
    if (loginArg) {
        var url = loginArg.serverHttpUrl;
        var data = {};
        data.randnum = Math.random();
        data.cmd = 101;
        data.pf = loginArg.platform;
        data.account = loginArg.account;
        data.type = 4;

        loadHttp(url, function (result) {
            var info = JSON.parse(result);
            var last = info.last;
            var max = info.max;
            maxZoneid = max.zoneid;
            ip = last.ip;
            port = last.port;
            zoneid = last.zoneid;
            alias = last.alias;
            state = last.state;
            isNewRole = last.newuser;
            version = last.v;
            whitelist = last.whitelist;
            if (state == 0) {
                $('.servername').html(alias + "&nbsp;&nbsp;&nbsp;<font color='#00FF00'>维护中</font>");
            } else {
                $('.servername').html(alias + "&nbsp;&nbsp;&nbsp;<font color='#00FF00'>选服></font>");
            }
            $('.newname').html("最新服&nbsp;&nbsp;<font color='#00FF00'>" + max.alias + "</font>");
        }, data);

        if (getPlatformType() == 1) {//赛博自动弹出公告
            showgonggao();
        }
    } else {
        setTimeout(function () {
            initData();
        }, 50);
    }
}

//平台类型
function getPlatformType() {
    if (!loginArg || !loginArg.platform) {
        return 0;
    }
    if (loginArg.platform.indexOf("cdsb-") >= 0) {//赛博
        return 1;
    }
    if (loginArg.platform.indexOf("shxy-") >= 0) {//深海
        return 2;
    }
    if (loginArg.platform.indexOf("sqxy-") >= 0) {//手趣
        return 3;
    }

    return 999;
}


function initLoginData() {
    if (loginArg) {
        var selectD;
        if (window.localStorage.selectDate && DEBUGM) {
            selectD = JSON.parse(window.localStorage.selectDate);
            ip = selectD.ip;
            port = selectD.port;
            zoneid = selectD.zoneid;
            alias = selectD.alias
            $('.servername').html(alias + "&nbsp;&nbsp;&nbsp;<font color='#00FF00'>选服></font>");
            initNewServer();
        } else {
            var url = "";
            var data = {};
            if (DEBUGM) {
                url = selectServerUrl;
            } else {
                url = loginArg.serverHttpUrl;
                data.randnum = Math.random();
                data.cmd = 101;
                data.pf = loginArg.platform;
                data.account = loginArg.account;
                data.type = 1;
                if (isTest) {//内测
                    data.testserver = 1;
                }
            }

            loadHttp(url, function (result) {
                console.log(result);
                selectD = JSON.parse(result);
                ip = selectD.ip;
                port = selectD.port;
                zoneid = selectD.zoneid;
                alias = selectD.alias;
                state = selectD.state;
                isNewRole = selectD.newuser;
                if (state == 0) {
                    $('.servername').html(alias + "&nbsp;&nbsp;&nbsp;<font color='#00FF00'>维护中</font>");
                } else {
                    $('.servername').html(alias + "&nbsp;&nbsp;&nbsp;<font color='#00FF00'>选服></font>");
                }
                initNewServer();
            }, data);
        }
    } else {
        setTimeout(function () {
            initLoginData();
        }, 100);
    }
}

function initNewServer() {
    if (DEBUGM) {
    } else {
        var url = "";
        url = loginArg.serverHttpUrl;
        var data = {};
        data.randnum = Math.random();
        data.cmd = 101;
        data.pf = loginArg.platform;
        data.account = loginArg.account;
        data.type = 3;
        if (isTest) {//内测
            data.testserver = 1;
        }

        loadHttp(url, function (result) {
            var serverData = JSON.parse(result);
            $('.newname').html("最新服&nbsp;&nbsp;<font color='#00FF00'>" + serverData.alias + "</font>");
        }, data);
    }
}

function showgg() {
    $('#choose').addClass('choose_none');
    $('#choose').removeClass('choose choose_webkit');
    $('#gg').addClass('gg gg_webkit');
    $('#gg').removeClass('gg_none');
    $('#popbg').show();
}

function hidegg() {
    $('#choose').addClass('choose choose_webkit');
    $('#choose').removeClass('choose_none');
    $('#gg').addClass('gg_none');
    $('#gg').removeClass('gg gg_webkit');
    $('#popbg').hide();
}

function showchoose() {
    $('#choose').addClass('choose choose_webkit');
    $('#choose').removeClass('choose_none');
    $('#slist').addClass('slist_none');
    $('#slist').removeClass('slist slist_webkit');
    $('#popbg').hide();
}
function showslist() {
    $('#choose').addClass('choose_none');
    $('#choose').removeClass('choose choose_webkit');
    $('#slist').addClass('slist slist_webkit');
    $('#slist').removeClass('slist_none');
    $('#popbg').show();
}

function showAlert() {
    $('#choose').addClass('choose_none');
    $('#choose').removeClass('choose choose_webkit');
    $('#alert').addClass('alert alert_webkit');
    $('#alert').removeClass('alert_none');
    $('#popbg').show();
}
function hideAlert() {
    $('#choose').addClass('choose choose_webkit');
    $('#choose').removeClass('choose_none');
    $('#alert').addClass('alert_none');
    $('#alert').removeClass('alert alert_webkit');
    $('#popbg').hide();
}
function createAlert() {
    var str = "<div id='alert' class='alert_none'><div class='alertContent'>维护时间：</div></div>";
    $('#server').append(str);
    $('#alert').click(function (e) { hideAlert() });
}
var isInitBetween;
//服务器列表
function initServerData() {
    if (isInitBetween) {
        return;
    }
    isInitBetween = true;
    // if (!serverData)
    //     return;
    var zoneListData = [];

    // recentServers = serverData.recent;
    // formalServers = serverData.formal;

    var zoneGap = 20;
    var len = maxZoneid;
    var count = Math.ceil(len / zoneGap);
    for (var i = 0; i < count; i++) {
        var zoneName = "正式服" + (1 + zoneGap * i) + "-" + ((i + 1) * zoneGap);
        zoneListData.push(zoneName);
    }
    zoneListData = zoneListData.reverse();
    var div = '<div class="between_sel" num="0">最近登录</div>';
    var len = zoneListData.length;

    for (var i = 0; i < len; i++) {
        div += '<div class="between_nosel" num="' + (len - i) + '">' + zoneListData[i] + '</div>';
    }
    $('.between').append(div);

    $('.between>div:first').addClass('between_sel');
    $('.between>div').click(function (e) {
        $('.between>div').removeClass('between_sel');
        $('.between>div').addClass('between_nosel');
        $(this).addClass('between_sel');
        $(this).removeClass('between_nosel');
        updateSerList($(this).attr('num'));
    });

    var server_div = '<div class="serversel serverindex" style="overflow-y:overlay;">';
    server_div += '</div>';
    $('#slist').append(server_div);

    $('.serversel>div').addClass('servernoselect');

    updateSerList(0);
}
//显示服务器列表
function updateSerList(num) {
    var server_div = '';
    num = parseInt(num);
    if (num == 0 && recentServers) {
        for (var i = recentServers.length - 1; i >= 0; i--) {
            var data = recentServers[i];
            server_div += GetServerSelDiv(data.alias, data.state, data.ip, data.port, data.zoneid, data.v);
        }
        showServerList(server_div);
    } else {
        var url = "";
        var data = {};
        if (DEBUGM) {
            url = "loginjs/servers" + num + ".php";
        } else {
            url = loginArg.serverHttpUrl;
        }
        data.randnum = Math.random();
        data.cmd = 101;
        data.pf = loginArg.platform;
        data.account = loginArg.account;
        data.type = 2;
        if (num > 0) {
            data.min = (num - 1) * 20 + 1;
        } else {
            data.min = 0;
        }
        data.max = num * 20;
        loadHttp(url, function (ret) {
            var info = JSON.parse(ret).list;
            if (num == 0) {
                recentServers = info;
            }
            for (var i = info.length - 1; i >= 0; i--) {
                var item = info[i];
                server_div += GetServerSelDiv(item.alias, item.state, item.ip, item.port, item.zoneid, item.v);
            }
            showServerList(server_div);
        }, data);
    }
}

function showServerList(str) {
    $('.serversel').empty();

    $('.serversel').append(str);

    $('.serversel>div').click(function (e) {
        // 调样式
        $('.serversel>div').addClass('servernoselect');
        $('.serversel>div').removeClass('serverselect');
        $(this).removeClass('servernoselect');
        $(this).addClass('serverselect');
        // 选服
        showchoose();
        // 记录选择信息
        ip = $(this).attr('ip');
        port = $(this).attr('port');
        zoneid = $(this).attr('zoneid');
        alias = $(this).attr('alias');
        state = $(this).attr('state');
        if (!isTest) {
            version = $(this).attr('version');
        }
        if (state == 0) {
            $('.servername').html(alias + "&nbsp;&nbsp;&nbsp;<font color='#00FF00'>维护中</font>");
        } else {
            $('.servername').html(alias + "&nbsp;&nbsp;&nbsp;<font color='#00FF00'>选服></font>");
        }
    });
}

//http请求数据
function loadHttp(url, callback, data) {
    $.ajax(
        {
            type: "get",
            url: url,
            data: data,
            success: function (result) {
                callback && callback(result);
            },
            error: function () {
                callback && callback(null);
            }
        }
    );
}

//{"zoneid":1,"alias":"版本服","state":2,"port":8001,"ip":"192.168.34.55"}
function GetServerSelDiv(servername, status, ip, port, zoneid, version) {
    var tag = "<span ></span>"
    if (status == 1 || status == 3) {
        tag = '<span class="new-tag"></span>'
    } else if (status == 2 || status == 4) {
        tag = '<span class="hot-tag"></span>'
    }
    if (status == 0) {
        servername += " 维护中";
    }
    return '<div ip=' + ip + ' port=' + port + ' alias=' + servername + ' zoneid=' + zoneid + ' state=' + status + ' version=' + version + ' class="servernoselect">' + servername + tag + '</div>'
}

var pro1;
var star1;
var pro2;
var star2;
var proInter;
//进度条
function showLoadProgress(text, pro, st) {
    if (!isClickEnter) {
        return;
    }
    if (!proInter) {
        proInter = setInterval(runProgress, 40);
        pro1 = document.getElementById("pro_line1");
        star1 = document.getElementById("star1");
        pro2 = document.getElementById("pro_line2");
        star2 = document.getElementById("star2");

        $('#proalert1').html("首次加载会比较慢，请耐心等待");
    }
    if (st > 0) {
        clearTimeout(proInter);
        proInter = 0;
        pro2.style.width = 0 + "rem";
        $('#proalert2').html(text + "  <font color='#FF0000'>点击刷新</font>");
        $('#server').click(reLoginWeb);
    } else {
        $('#proalert2').html(text);
    }


    var w = (pro / 100) * 7.65;
    // var w = 5;
    pro1.style.width = w + "rem";
    if (pro >= 95) {
        pro2.style.width = 7.65 + "rem";
        clearTimeout(proInter);
        proInter = 0;
    }

}

var pro2num = 0;
function runProgress() {
    if (pro2num == 7.56) {
        pro2num = 0;
    }
    pro2num += 0.5;
    if (pro2num > 7.56) {
        pro2num = 7.56;
    }
    pro2.style.width = pro2num + "rem";
}
//
function sendLoginMsg() {
    var st = isNewUser();
    if (st != 1) return;

    var url = "";
    url = "https://" + ip + ":" + (parseInt(port) + 1000) + "?";
    url += "&cmd=108";
    url += "&zoneid=" + zoneid;
    url += "&account=" + loginArg.account;
    url += "&pf=" + loginArg.platform;
    loadHttp(url, function (data) {
    });
}
//是否新用户
function isNewUser() {
    if (recentServers) {//是否在最近登录列表中
        for (var i = recentServers.length - 1; i >= 0; i--) {
            var data = recentServers[i];
            if (parseInt(zoneid) == parseInt(data.zoneid)) {
                return 0;
            }
        }
        return 1;
    } else {
        return isNewRole;
    }
}

var loadList = [
    { "src": "egretLib.min.js", "label": "引擎", "total": 15, "skip": false, "next": 1, "callback": onEngineLoaded },
    { "src": "main.min.js", "label": "游戏主程序", "total": 20, "skip": false, "next": 0, "callback": loadJsComplete }
];
//加载引擎和主文件
function bodyOnLoad() {
    if (loginArg) {
        showLoadProgress("加载游戏引擎", 15, 0);
        loadNextRes();
    } else {
        setTimeout(bodyOnLoad, 50);
    }
}
//加版本号
function getResVersion(url) {
    if (url == "egretLib.min.js") {
        return "egretLib.min.js";
    } else if (url == "main.min.js") {
        return "main.min_" + version + ".js";
    } else {
        return url;
    }
}

var loadIndex = 0;
function loadNextRes() {
    if (loadIndex >= loadList.length)
        return;
    var data = loadList[loadIndex++];
    if (data.skip) {
        var skip = !!data.skip;
        if ((typeof data.skip) == 'string') {
            skip = eval(data.skip);
        }
        if (skip) {
            if (data.next) {
                loadNextRes();
            }
        }
    }
    if (!data.src) {
        data.callback && data.callback();
        if (data.next) {
            loadNextRes();
            return;
        }
    }
    var url = data.src.match(/\.js$/i) ? data.src : window[data.src];
    if (version) {
        url = getResVersion(url);
        url = versionFn + "/" + url;
    }

    if (loginArg.zipcdn) {
        url = loginArg.zipcdn + url;
    }
    if (data.useRandom) {
        url += "?v=" + Math.random();
    }
    loadScriptRes(url, function () {
        if (data.callback != null) {
            data.callback();
        }
        if (data.next) {
            loadNextRes();
        }
    }, data.label, data.total);
}

function onEngineLoaded() {
    isLoadEgret = true;
    showLoadProgress("加载主程序", 20, 0);
    runEgretMain();
}

function loadJsComplete() {
    isLoadMain = true;
    runEgretMain();
}

function runEgretMain() {
    if (isClickEnter && isLoadEgret && isLoadMain) {

        var serverData = {};

        loginArg.ip = serverData.ip = ip;
        loginArg.port = serverData.port = port;
        loginArg.zoneid = serverData.zoneid = "" + zoneid;
        loginArg.serverName = serverData.alias = alias;
        loginArg.state = serverData.state = state;
        loginArg.versionFn = versionFn;
        loginArg.binVersion = version;

        //serverData.newuser = 0; //这里设置为旧玩家
        //window.localStorage.selectDate = JSON.stringify(serverData);
        //window.localStorage.account = loginArg.account;
        // if (DEBUGM) {
        //     loginArg.cdn = loginArg.zipcdn = loginArg.binVersion;
        //     loginArg.binVersion = "";
        //     // loginArg.account = "xxl01";
        //     loginArg.uid = loginArg.account;
        //     loginArg.pf = "aiwan";
        //     loginArg.platform = "bansu";
        // }

        showLoadProgress("(加载游戏资源)", 30, 0);
		/**
		* {
		* "renderMode":, //Engine rendering mode, "canvas" or "webgl"
		* "audioType": 0 //Use the audio type, 0: default, 2: web audio, 3: audio
		* "antialias": //Whether the anti-aliasing is enabled in WebGL mode, true: on, false: off, defaults to false
		* "retina": //Whether the canvas is based on the devicePixelRatio
		* }
		**/
        egret.runEgret({ renderMode: "webgl", audioType: 0 });
        // var mb = myBrowser();
        // if (mb == "IE") {
        // } else {
        // 	egret.runEgret({ renderMode: "webgl", audioType: 0 });
        // }
        //egret.ImageLoader.crossOrigin = 'anonymous';
        // setTimeout(initInputEvent, 1000);
    }
}

function myBrowser() {
    try {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Presto") > -1;
        if (isOpera) {//判断是否Opera内核
            return "Opera"
        }
        if (userAgent.indexOf("Firefox") > -1) {//判断是否Firefox内核
            return "FF";
        }
        if (userAgent.indexOf("AppleWebKit") > -1) {//判断是否谷歌内核
            return "Chrome";
        }
        if (userAgent.indexOf("Safari") > -1) {//判断是否Safari内核
            return "Safari";
        }
        if (userAgent.indexOf("Trident") > -1) {//判断是否IE内核
            return "IE";
        }
        if (userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1) {
            return "Android";
        }
        if (userAgent.indexOf('iPhone') > -1) {
            return "iPhone";
        }
        if (userAgent.indexOf('iPad') > -1) {
            return "iPad";
        }
    } catch (err) {
    }
    return "Other";
}

function diposeLoadView() {
    $("#server").remove();
    if (proInter > 0) {
        clearTimeout(proInter);
        proInter = 0;
    }
}

function setLoadVis(v) {
    if (v) {
        $('#server').removeClass('server_none');
        $('#server').addClass('server server_webkit');
    } else {
        $('#server').removeClass('server server_webkit');
        $('#server').addClass('server_none');
    }
}

function reLoginWeb() {
    window.location.reload();
}

function getLoginArg() {
    return loginArg;
}

//打开登录
function func_login() {
    whalePbSDK.login();
}

//调起支付页面
function func_paypay(orderInfo) {
    whalePbSDK.pay(orderInfo, function (payStatusObject) {
        //游戏业务页面UI显示
        console.log('支付结果通知' + payStatusObject);
    });
}

//退登
function func_logout() {
    whalePbSDK.logout();
}