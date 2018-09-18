
//****************************** */
var useHttps;
var gonggaoUrl = "loginjs/brocastServer.php?v12";
var selectServerUrl = "loginjs/selectServer.php";
var serversUrl = "loginjs/servers.php";
var role = "banben";

var maxZoneid = 30;//最大区
var ip = null;
var port;
var zoneid;
var alias;
var state = 1;
var version = "";
var whitelist = false;
var zoneDic = null;  // 
var recentServers = null; //最近服务器列表
var formalServers = null; //服务器列表
var serverData = null;  // 选服接口返回的服务器列表数据
var isNewRole = false;
var isClickEnter = false;
var isLoadEgret = false;
var isLoadMain = false;

function showgonggao(e) {
    if (loginArg) {
        showgg()
        var url;
        if (DEBUGM) {
            url = gonggaoUrl;
        } else {
            url = loginArg.serverHttpUrl + "?";
            url += "&randnum=" + Math.random();
            url += "&cmd=102";
            url += "&pf=" + loginArg.platform;
            if (isTest) {//内测
                url += "&testserver=1";
            }
        }

        loadHttp(url, function (data) {
            $('#ggcontent').html("" + data);
        });
    }
}
function showGame() {
    $('.goplay').click(function () {
        if (!ip || !loginArg) {
            return;
        }
         if (state == 0 && !whitelist) {//不是白名单
            if ($("#alert").length <= 0) {
                createAlert();

                // var url = "http://192.168.34.20:7001?cmd=109&type=3&pf=quick&zoneid=1";
                // loadHttp(url, function (data) {
                // });
                    $('.alertContent').html("维护时间：<br>3月31日 10:30-11:30");
            }
            showAlert();
            return;
        }
        role = $('.newname').text();
        $("#gg").remove();
        $('#choose').remove();
        $("#slist").remove();
        $("#popbg").remove();
        // $('#choose').addClass('choose_none');
        // $('#choose').removeClass('choose choose_webkit');

        $('#loading').addClass('loading loading_webkit');
        $('#loading').removeClass('loading_none');
        isClickEnter = true;
        bodyOnLoad();
        // runEgretMain();
        // showLoadProgress("加载中", 10, 0);
    })
    //公告
    $('#ggbtn').click(showgonggao);
    $('#ggclose,#ggtopclose').click(function (e) { hidegg() });
    //选服页交互
    $('.servername').click(function (e) {
        if (loginArg) {
            // if (!isGetServer) {
            //     isGetServer = true;
            //     if (DEBUGM) {
            //         var url = serversUrl;
            //     } else {
            //         var url = loginArg.serverHttpUrl + "?";
            //         url += "randnum=" + Math.random();
            //         url += "&cmd=101";
            //         url += "&pf=" + loginArg.platform;
            //         url += "&account=" + loginArg.account;
            //         url += "&type=2";
            //         if (isTest) {//内测
            //             url += "&testserver=1";
            //         }
            //     }
            //     loadHttp(url, function (data) {
            //         serverData = JSON.parse(data);
            //         initServerData();
            //     });
            // }
            initServerData();
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
    // initLoginData();
    // bodyOnLoad();
}

function initData() {
    if (loginArg) {
        var url = loginArg.serverHttpUrl + "?";
        url += "randnum=" + Math.random();
        url += "&cmd=101";
        url += "&pf=" + loginArg.platform;
        url += "&account=" + loginArg.account;
        url += "&type=4";
        if (isTest) {//内测
            url += "&testserver=1";
        }
        loadHttp(url, function (data) {
            var info = JSON.parse(data);
            var last = info.last;
            var max = info.max;

            ip = last.ip;
            port = last.port;
            zoneid = last.zoneid;
            alias = last.alias;
            state = last.state;
            if (!isTest) {
                version = last.v;
            }
            whitelist = last.whitelist;
            if (state == 0) {
                $('.servername').html(alias + "&nbsp;&nbsp;&nbsp;<font color='#18FF00'>维护中</font>");
            } else {
                $('.servername').html(alias + "&nbsp;&nbsp;&nbsp;<font color='#18FF00'>选服></font>");
            }
            $('.newname').html("最新服&nbsp;&nbsp;<font color='#18FF00'>" + max.alias + "</font>");
        });
    } else {
        setTimeout(function () {
            initData();
        }, 50);
    }
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
            $('.servername').html(alias + "&nbsp;&nbsp;&nbsp;<font color='#18FF00'>选服></font>");
            initNewServer();
        } else {
            var url = "";
            if (DEBUGM) {
                url = selectServerUrl;
            } else {
                url = loginArg.serverHttpUrl + "?";
                url += "randnum=" + Math.random();
                url += "&cmd=101";
                url += "&pf=" + loginArg.platform;
                url += "&account=" + loginArg.account;
                url += "&type=1";
                if (isTest) {//内测
                    url += "&testserver=1";
                }
            }

            loadHttp(url, function (data) {
                selectD = JSON.parse(data);
                ip = selectD.ip;
                port = selectD.port;
                zoneid = selectD.zoneid;
                alias = selectD.alias;
                state = selectD.state;
                if (state == 0) {
                    $('.servername').html(alias + "&nbsp;&nbsp;&nbsp;<font color='#00FF00'>维护中</font>");
                } else {
                    $('.servername').html(alias + "&nbsp;&nbsp;&nbsp;<font color='#00FF00'>选服></font>");
                }
                initNewServer();
            });
        }
        if (getPlatformType() == 1) {//赛博自动弹出公告
            showgonggao();
        }
    } else {
        setTimeout(function () {
            initLoginData();
        }, 100);
    }
}

//平台类型
function getPlatformType() {
    if (!loginArg) {
        return 0;
    }
    if (loginArg.platform && loginArg.platform.indexOf("cdsb-") >= 0) {
        return 1;
    }
}

function initNewServer() {
    if (DEBUGM) {
        if (window.localStorage.account) {
            role = window.localStorage.account;
        }
        $('.newname').html(role);
    } else {
        var url = "";
        url = loginArg.serverHttpUrl + "?";
        url += "randnum=" + Math.random();
        url += "&cmd=101";
        url += "&pf=" + loginArg.platform;
        url += "&account=" + loginArg.account;
        url += "&type=3";
        if (isTest) {//内测
            url += "&testserver=1";
        }
        loadHttp(url, function (data) {
            var serverData = JSON.parse(data);
            $('.newname').html("最新服&nbsp;&nbsp;<font color='#00FF00'>" + serverData.alias + "</font>");
        });
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
function initServerData() {
     if (isInitBetween) {
        return;
    }
    isInitBetween = true;

    zoneListData = [];

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
    $('.serversel>div').addClass('servernoselect');
    $('.serversel').append(str);

    $('.serversel>div').click(function (e) {
        // 调样式
        // $('.serversel>div').addClass('servernoselect');
        // $('.serversel>div').removeClass('serverselect');
        // $(this).removeClass('servernoselect');
        // $(this).addClass('serverselect');
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
            $('.servername').html(alias + "&nbsp;&nbsp;&nbsp;<font color='#18FF00'>维护中</font>");
        } else {
            $('.servername').html(alias + "&nbsp;&nbsp;&nbsp;<font color='#18FF00'>选服></font>");
        }
    });
}

function loadHttp(url, callback, data) {
    $.ajax(
        {
            type: "get",
            url: url,
            data: data,
            success: function (result) {
                callback && callback(result);
                // $("#div1").html(result);
            },
            error: function () {
                callback && callback(null);
            }
        }
    );

    return;

    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActionXObject("Microsoft.XMLHTTP");
    }

    if (useHttps) {
        url = url.replace(/^http\:\/\//i, "https://");
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.responseType = "text";

    xmlhttp.onerror = function (e) {
        console.log("[" + xmlhttp.status + "]" + xmlhttp.statusText + ":" + xmlhttp.responseURL);
        callback && callback(null);
    }
    xmlhttp.onload = function (e) {
        if (xmlhttp.status === 200 || xmlhttp.status === 204 || xmlhttp.status === 0) {
            //与服务器通讯
            callback && callback(xmlhttp.responseText);
        } else {
            console.log("[" + xmlhttp.status + "]" + xmlhttp.statusText + ":" + xmlhttp.responseURL);
        }
    }
    xmlhttp.send();
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
var netSt;
function showLoadProgress(text, pro, st) {
    if (!isClickEnter) {
        return;
    }
    if(netSt > 0) {
        return;
    }
    netSt = st;
    if (!proInter) {
        proInter = setInterval(runProgress, 40);
        pro1 = document.getElementById("pro_line1");
        star1 = document.getElementById("star1");
        pro2 = document.getElementById("pro_line2");
        star2 = document.getElementById("star2");
        if (isNewRole) {
            $('#proalert1').html("加载至<font color='#1EFF00'>80%</font>可领取<font color='#f7e801'>10万金币</font>");
        } else {
            $('#proalert1').html("首次加载会比较慢，请耐心等待");
        }
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


    var w = (pro / 100) * 13;
    // var w = 5;
    pro1.style.width = w + "rem";
    if (pro >= 95) {
        pro2.style.width = 13 + "rem";
        clearTimeout(proInter);
        proInter = 0;
    }

}

var pro2num = 0;
var isChanged = false;
function runProgress() {
    if (pro2num == 13) {
        pro2num = 0;
    }
    pro2num += 0.5;
    if (pro2num > 13) {
        pro2num = 13;
    }
    if(!isChanged){
        isChanged = true;
        $('#backDiv').css({"background-image":"url(loginres/loading02.jpg)"});
    }
    pro2.style.width = pro2num + "rem";
}

var loadList = [
    { "src": "egretLib.min.js", "label": "引擎", "total": 15, "skip": false, "next": 1, "callback": onEngineLoaded },
    { "src": "main.min.js", "label": "游戏主程序", "total": 20, "skip": false, "next": 0, "callback": loadJsComplete }
];

function bodyOnLoad() {
    if (loginArg) {
        if (DEBUGM) {
            loadDebugXml();
        } else {
            showLoadProgress("加载游戏引擎", 15, 0);
            loadNextRes();
        }
    } else {
        setTimeout(bodyOnLoad, 50);
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
        url = version + "/" + url;
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


var loadSingleScript = function (src, callback) {
    var s = document.createElement('script');
    s.async = false;
    s.src = src;
    s.addEventListener('load', function () {
        s.parentNode.removeChild(s);
        s.removeEventListener('load', arguments.callee, false);
        callback();
    }, false);
    document.body.appendChild(s);
};

var loadScript = function (list, callback) {
    var loaded = 0;
    var maxLoadnum = 10;
    var len = 0;

    var loadNext = function () {
        if (list.length - loaded - maxLoadnum > 0) {
            len = maxLoadnum;
        } else {
            len = list.length - loaded;
        }

        var starLoad = loaded;
        for (var i = 0; i < len; i++) {
            loadSingleScript(list[loaded + i], function () {
                loaded++;
                if (loaded >= list.length) {
                    callback();
                    // onEngineLoaded();
                    loadJsComplete();
                }
                showLoadProgress("加载游戏代码中", (loaded / list.length) * 100, 0);

                if (loaded >= starLoad + len) {
                    loadNext();
                }
            })
        }
    };
    loadNext();
};

function loadDebugXml() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './manifest.json?v=' + Math.random(), true);
    xhr.addEventListener("load", function () {
        var manifest = JSON.parse(xhr.response);
        var list = manifest.initial.concat(manifest.game);
        loadScript(list, function () {
            scriptLoading = false;
        });
    });
    xhr.send(null);
}

function onEngineLoaded() {
    isLoadEgret = true;
    showLoadProgress("加载主程序", 20, 0);
    runEgretMain();
}

function loadJsComplete() {
    if (DEBUGM) {
        isLoadEgret = true;
    }
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

        serverData.newuser = 0; //这里设置为旧玩家
        window.localStorage.selectDate = JSON.stringify(serverData);
        loginArg.binVersion = version;
        if (DEBUGM) {
            loginArg.cdn = loginArg.zipcdn = loginArg.binVersion = null;
            // loginArg.binVersion = "";
            loginArg.account = role;
            console.log(role);
            loginArg.uid = loginArg.account;
            loginArg.pf = "aiwan";
            loginArg.platform = "bansu";
        }
        window.localStorage.account = loginArg.account;

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
    $("#backDiv").remove();
    $("#fcmtext").remove();
    if (proInter > 0) {
        clearTimeout(proInter);
        proInter = 0;
    }
}

function setLoadVis(v) {
    if (v) {
        $('#backDiv').removeClass('server_none');
        $('#backDiv').addClass('backDiv');
        $('#server').removeClass('server_none');
        $('#server').addClass('server server_webkit');
        $("#fcmtext").removeClass('server_none');
        $("#fcmtext").addClass('fcmtext');
    } else {
        $('#server').removeClass('server server_webkit');
        $('#server').addClass('server_none');
        $('#backDiv').removeClass('backDiv');
        $('#backDiv').addClass('server_none');
        $("#fcmtext").removeClass('fcmtext');
        $("#fcmtext").addClass('server_none');
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

showGame();