var loadList = [
	{ "src": "egretLib.min.js", "label": "引擎", "total": 15, "skip": false, "next": 1, "callback": onEngineLoaded },
	{ "src": "main.min.js", "label": "游戏主程序", "total": 20, "skip": false, "next": 0, "callback": loadJsComplete }
];

function bodyOnLoad() {
	if (window.loginArg) {
		if (DEBUGM) {
			loadDebugXml();
		} else {
			loadNextRes();
		}
	} else {
		setTimeout(bodyOnLoad, 50);
	}
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
	if (loginArg.binVersion) {
		url = loginArg.binVersion + "/" + url;
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
	showLoadProgress("加载主程序", 30, 0);
}

function loadJsComplete() {
	isEnter |= 2;
	runEgretMain();
}

function runEgretMain() {
	if (isEnter >= 3) {

		var serverData = {};

		loginArg.ip = serverData.ip = ip;
		loginArg.port = serverData.port = port;
		loginArg.zoneid = serverData.zoneid = "" + zoneid;
		loginArg.serverName = serverData.alias = alias;
		loginArg.state = serverData.state = state;

		serverData.newuser = 0; //这里设置为旧玩家
		window.localStorage.selectDate = JSON.stringify(serverData);
		if (DEBUGM) {
			loginArg.cdn = loginArg.zipcdn = loginArg.binVersion;
			loginArg.binVersion = "";
			loginArg.account = $('.newname').html();
			loginArg.uid = loginArg.account;
			loginArg.pf = "aiwan";
			loginArg.platform = "bansu";
			loginArg.openGM = true;
		}
		window.localStorage.account = loginArg.account;

		showLoadProgress("(加载游戏资源)", 20, 0);
		/**
		* {
		* "renderMode":, //Engine rendering mode, "canvas" or "webgl"
		* "audioType": 0 //Use the audio type, 0: default, 2: web audio, 3: audio
		* "antialias": //Whether the anti-aliasing is enabled in WebGL mode, true: on, false: off, defaults to false
		* "retina": //Whether the canvas is based on the devicePixelRatio
		* }
		**/
		var mb = myBrowser();
		if (mb == "IE") {
			egret.runEgret({ renderMode: "canvas", audioType: 0 });
		} else {
			egret.runEgret({ renderMode: "webgl", audioType: 0 });
		}
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