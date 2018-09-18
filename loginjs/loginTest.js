var useHttps;
var gonggaoUrl = "loginjs/brocastServer.php?v12";
var selectServerUrl = "loginjs/selectServer.php";
var serversUrl = "loginjs/servers.php";

var ip;
var port;
var zoneid;
var alias;
var state;
var zoneDic = null;  // 
var recentServers = null; //最近服务器列表
var formalServers = null; //服务器列表
var serverData = null;  // 选服接口返回的服务器列表数据
var isGetServer = false;
var isNewRole = false;
var isEnter = 0;

function showgonggao(e) {
    if (loginArg) {
        showgg()
        var servUrl;
        if (DEBUGM) {
            servUrl = gonggaoUrl;
        } else {
            var servUrl = loginArg.serverHttpUrl + "?";
            servUrl += "&randnum=" + Math.random();
            servUrl += "&cmd=102";
            servUrl += "&pf=" + loginArg.platform;
            servUrl += "&testserver=1";
        }

        loadHttp(servUrl, function (data) {
            $('#ggcontent').html("" + data);
        });
    }
}
$(document).ready(function (e) {
    $('.goplay').click(function () {
        if(!ip) {
            return;
        }
        $('#choose').addClass('choose_none');
        $('#choose').removeClass('choose choose_webkit');

        $('#loading').addClass('loading loading_webkit');
        $('#loading').removeClass('loading_none');
        isEnter |= 1;
        showLoadProgress("加载中", 10, 0);
        if (preRes.length <= preIn) {
            runEgretMain();
        }
    })
    //公告
    $('#ggbtn').click(showgonggao);
    $('#ggclose,#ggtopclose').click(function (e) { hidegg() });
    //选服页交互
    $('.servername').click(function (e) {
        if (loginArg) {
            if (!isGetServer) {
                isGetServer = true;
                var servUrl;
                if (DEBUGM) {
                    servUrl = serversUrl;
                } else {
                    var servUrl = loginArg.serverHttpUrl + "?";
                    servUrl += "randnum=" + Math.random();
                    servUrl += "&cmd=101";
                    servUrl += "&pf=" + loginArg.platform;
                    servUrl += "&account=" + loginArg.account;
                    servUrl += "&type=2";
                    servUrl += "&testserver=1";
                }
                loadHttp(servUrl, function (data) {
                    serverData = JSON.parse(data);
                    initServerData();
                });
            }
            showslist();
        }

    });

    $('#sclosetitle,#sclose').click(function (e) {
        showchoose();
    });

    initLoginData();

});


function initLoginData() {
    if (loginArg) {
        var selectD;
        if (window.localStorage.selectDate) {
            selectD = JSON.parse(window.localStorage.selectDate);
            ip = selectD.ip;
            port = selectD.port;
            zoneid = selectD.zoneid;
            alias = selectD.alias
            $('.servername').html(alias + "&nbsp;&nbsp;&nbsp;<font color='#00FF00'>选服></font>");
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
                url += "&testserver=1";
            }

            loadHttp(url, function (data) {
                selectD = JSON.parse(data);
                ip = selectD.ip;
                port = selectD.port;
                zoneid = selectD.zoneid;
                alias = selectD.alias
                $('.servername').html(alias + "&nbsp;&nbsp;&nbsp;<font color='#00FF00'>选服></font>");
            });
        }
    } else {
        setTimeout(function () {
            initLoginData();
        }, 100);
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

function initServerData() {
    if (!serverData)
        return;
    zoneDic = {};
    zoneListData = [];

    recentServers = serverData.recent;
    formalServers = serverData.formal;

    for (var i = 0, n = recentServers.length; i < n; i++) {
        var data = recentServers[i];
        if (zoneDic["最近登录"]) {
            zoneDic["最近登录"].push(data);
        } else {
            zoneDic["最近登录"] = [data];
        }
    }

    var zoneGap = 10;
    for (i = 0, n = formalServers.length; i < n; i++) {
        var data = formalServers[i];
        var count = (i / zoneGap) >> 0;
        var zoneName = "正式服" + (1 + zoneGap * count) + "-" + ((count + 1) * zoneGap);

        if (zoneDic[zoneName]) {
            zoneDic[zoneName].push(data);
        } else {
            zoneDic[zoneName] = [data];
            zoneListData.push(zoneName);
        }
    }

    zoneListData.reverse();
    // var dvi = "";
    // if (recentServers.length > 0) {

    // zoneListData.splice(0, 0, "最近登录");
    // }
    var div = '<div class="between_sel">最近登录</div>';
    var len = zoneListData.length;

    for (var i = 0; i < len; i++) {
        div += '<div class="between_nosel">' + zoneListData[i] + '</div>';
    }
    $('.between').append(div);

    $('.between>div:first').addClass('between_sel');
    $('.between>div').click(function (e) {
        $('.between>div').removeClass('between_sel');
        $('.between>div').addClass('between_nosel');
        $(this).addClass('between_sel');
        $(this).removeClass('between_nosel');
        updateSerList($(this).html());
    });

    var server_div = '<div class="serversel serverindex" style="overflow-y:overlay;">';
    // for (var i = 0; i < recentServers.length; i++) {
    //         var data = recentServers[i];
    //         // var str = "";
    //         server_div += GetServerSelDiv(data.alias, data.state, data.ip, data.port, data.zoneid);
    //     };
    server_div += '</div>';
    $('.slist').append(server_div);

    $('.serversel>div').addClass('servernoselect');

    updateSerList("最近登录");
}

function updateSerList(str) {
    var server_div = '';
    $('.serversel').empty();
    if (str == "最近登录") {
        if (recentServers) {
            for (var i = 0, len = recentServers.length; i < len; i++) {
                var data = recentServers[i];
                var str = JSON.stringify(data);
                server_div += GetServerSelDiv(data.alias, data.state, data.ip, data.port, data.zoneid);
            }
        }
    } else {
        var sp = str.split('-');
        var first = sp[0];
        var last = sp[1];
        first = Number(first.substring(3, first.length));
        if (formalServers) {
            for (var i = first - 1; i < last; i++) {
                var data = formalServers[i];
                if (!data) {
                    break;
                }
                var str = JSON.stringify(data);
                server_div += GetServerSelDiv(data.alias, data.state, data.ip, data.port, data.zoneid);
            }
        }
    }
    $('.serversel').append(server_div);

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
        $('.servername').html(alias + "&nbsp;&nbsp;&nbsp;<font color='#00FF00'>选服></font>");
    });
}

function loadHttp(url, callback) {
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
function GetServerSelDiv(servername, status, ip, port, zoneid) {
    if (status == 0 && !gmLevel) {
        return ""
    }
    var tag = "<span ></span>"
    if (status == 1 || status == 3) {
        tag = '<span class="new-tag"></span>'
    } else if (status == 2 || status == 4) {
        tag = '<span class="hot-tag"></span>'
    }
    return '<div ip=' + ip + ' port=' + port + ' alias=' + servername + ' zoneid=' + zoneid + ' state=' + status + ' class="servernoselect">' + servername + tag + '</div>'
}

var pro1;
var star1;
var pro2;
var star2;
var proInter;
function showLoadProgress(text, pro, st) {
    if (!(isEnter & 1)) {
        return;
    }
    if (!proInter) {
        proInter = setInterval(runProgress, 20);
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
        $('#proalert2').html(text + "  <font color='#FF0000'>点击刷新</font>");
        $('#server').click(reLoginWeb);
    } else {
        $('#proalert2').html(text);
    }


    var w = (pro / 100) * 7.65;
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

function diposeLoadView() {
    var div = document.getElementById("server");
    if (div.parentElement) {
        div.parentElement.removeChild(div);
    }
    var div = document.getElementById("popbg");
    if (div.parentElement) {
        div.parentElement.removeChild(div);
    }
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