    var whalePbFunc = {
        getQueryString:function(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        },
        isMobile:function(){
            return navigator.userAgent.match(/android|iphone|ipad|ipod|blackberry|meego|symbianos|windowsphone|ucbrowser/i);
        },
        isIos:function(){
            return navigator.userAgent.match(/iphone|ipod|ios|ipad/i);
        },
        isAndroid:function(){
            return navigator.userAgent.match(/android/i);
        },
        isWeixin:function(){
            var ua = navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i)=="micromessenger") {
            return true;
            } else {
            return false;
            }
        },
        getOsType:function(){
            var ostype = 'other';
            if(this.isMobile()){
                if(this.isIos()){
                    ostype = 'ios';
                }else if(this.isAndroid()){
                    ostype = 'android';
                }
            }
            return ostype;
        }
    };

    var whalePbSDK = {
        userInfo:new Object(),
        productCode:'43149786904116483855343168011346',
        productKey:'75073832',
        channelName:'quick-test',
        //初始化
        init:function(callback){
            QuickSDK.init(this.productCode,this.productKey,true);
            //console.log(QuickSDK.getUserInfo());
            QuickSDK.getUserInfo(function(callbackData){
                //console.log(callbackData);
                if(callbackData.status){
                    whalePbSDK.userInfo.uid = callbackData.data.uid;
                    whalePbSDK.userInfo.account = callbackData.data.username;
                    whalePbSDK.userInfo.isLogin = callbackData.data.isLogin;
                    whalePbSDK.userInfo.platform = whalePbSDK.channelName;
                    whalePbSDK.userInfo.ostype = whalePbFunc.getOsType();
                    callback(true);
                }else{
                    console.log(callbackData.message);
                    callback(false);
                }
            }
            );
	    },
        //调起登录
        login:function(){
            QuickSDK.login(function(callbackData){
                if(callbackData.status){
                    this.userInfo.uid = callbackData.data.uid;
                    this.userInfo.account = callbackData.data.username;
                    this.userInfo.platform = this.channelName;
                    this.userInfo.ostype = whalePbFunc.getOsType();
                }
            });
        },
        //获取用户信息
        getuser:function(){
            return this.userInfo;
        },
        //调起支付页面
        pay:function(orderInfo,callback){
            var postInfo = new Object();
            postInfo.productCode = this.productCode;
            postInfo.uid = orderInfo.uid;
            postInfo.userRoleId = orderInfo.role_id;
            postInfo.userRoleName = orderInfo.role_name;
            postInfo.userServer = orderInfo.server_name;
            postInfo.userLevel = orderInfo.role_level;
            postInfo.cpOrderNo = orderInfo.cp_order_code;
            postInfo.amount = orderInfo.amount;
            postInfo.subject = orderInfo.subject;
            postInfo.desc = orderInfo.desc;
            postInfo.callbackUrl = '';
            postInfo.extrasParams = orderInfo.extras_params;
            postInfo.goodsId = orderInfo.goods_id;
            postInfo.count = orderInfo.count;
            postInfo.quantifier = orderInfo.quantifier;
                    
            var orderInfoJson = JSON.stringify(postInfo);
            QuickSDK.pay(orderInfoJson,function(payStatusObject){
                console.log('GameDemo:下单通知' + JSON.stringify(payStatusObject));
                callback(JSON.stringify(payStatusObject));
            });

        },
        //角色创建
        rolecreate:function(roleInfo,callback){
            roleInfo.is_create_role = true;
            this.roleupload(roleInfo,callback);
        },
        //角色更新
        roleupdate:function(roleInfo,callback){
            roleInfo.is_create_role = false;
            this.roleupload(roleInfo,callback);
        },
        //角色上传
        roleupload:function(roleInfo,callback){
            var postInfo = new Object();
            postInfo.isCreateRole = roleInfo.is_create_role;
            postInfo.uid = roleInfo.uid;
            postInfo.username = roleInfo.username;
            postInfo.roleCreateTime = roleInfo.role_create_time;
            postInfo.serverId = roleInfo.server_id;
            postInfo.serverName = roleInfo.server_name;
            postInfo.userRoleName = roleInfo.role_name;
            postInfo.userRoleId = roleInfo.role_id;
            postInfo.userRoleBalance = roleInfo.role_balance;
            postInfo.vipLevel = roleInfo.vip_level;
            postInfo.userRoleLevel = roleInfo.role_level;
            postInfo.partyId = roleInfo.party_id;
            postInfo.partyName = roleInfo.party_name;
            postInfo.gameRoleGender = roleInfo.role_gender;
            postInfo.gameRolePower = roleInfo.role_power;
            postInfo.partyRoleId = roleInfo.party_role_id;
            postInfo.partyRoleName = roleInfo.party_role_name;
            postInfo.professionId = roleInfo.fession_id;
            postInfo.profession = roleInfo.fession;
            postInfo.friendlist = roleInfo.friendlist;

            var roleInfoJson = JSON.stringify(postInfo);
            QuickSDK.uploadGameRoleInfo(roleInfoJson,function(response){
                var ret = new Object();
                if(response.status){
                    ret.status = true;
                }else{
                    ret.status = false;
                    ret.message = response.message;
                }
                callback(ret);
            });
        },
        //退出登录
        logout:function(){
            QuickSDK.logout(function(logoutObject){console.log('Game:成功退出游戏');})
        }
    };