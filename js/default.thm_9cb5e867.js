window.skins={};
function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
    __.prototype = b.prototype;
    d.prototype = new __();
};
window.generateEUI = {};
generateEUI.paths = {};
generateEUI.styles = undefined;
generateEUI.skins = {"eui.Button":"resource/eui_skins/ButtonSkin.exml","eui.CheckBox":"resource/eui_skins/CheckBoxSkin.exml","eui.HScrollBar":"resource/eui_skins/HScrollBarSkin.exml","eui.HSlider":"resource/eui_skins/HSliderSkin.exml","eui.Panel":"resource/eui_skins/PanelSkin.exml","eui.TextInput":"resource/eui_skins/TextInputSkin.exml","eui.ProgressBar":"resource/eui_skins/ProgressBarSkin.exml","eui.RadioButton":"resource/eui_skins/RadioButtonSkin.exml","eui.Scroller":"resource/eui_skins/ScrollerSkin.exml","eui.ToggleSwitch":"resource/eui_skins/ToggleSwitchSkin.exml","eui.VScrollBar":"resource/eui_skins/VScrollBarSkin.exml","eui.VSlider":"resource/eui_skins/VSliderSkin.exml","eui.ItemRenderer":"resource/eui_skins/ItemRendererSkin.exml"}
generateEUI.paths['resource/eui_skins/ButtonSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
	__extends(ButtonSkin, _super);
	function ButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = ButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return ButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/CheckBoxSkin.exml'] = window.skins.CheckBoxSkin = (function (_super) {
	__extends(CheckBoxSkin, _super);
	function CheckBoxSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_disabled_png")
				])
		];
	}
	var _proto = CheckBoxSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "checkbox_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return CheckBoxSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HScrollBarSkin.exml'] = window.skins.HScrollBarSkin = (function (_super) {
	__extends(HScrollBarSkin, _super);
	function HScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = HScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 8;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.verticalCenter = 0;
		t.width = 30;
		return t;
	};
	return HScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HSliderSkin.exml'] = window.skins.HSliderSkin = (function (_super) {
	__extends(HSliderSkin, _super);
	function HSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = HSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.height = 6;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_sb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.source = "thumb_png";
		t.verticalCenter = 0;
		return t;
	};
	return HSliderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ItemRendererSkin.exml'] = window.skins.ItemRendererSkin = (function (_super) {
	__extends(ItemRendererSkin, _super);
	function ItemRendererSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data"],[0],this.labelDisplay,"text")
	}
	var _proto = ItemRendererSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.fontFamily = "Tahoma";
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	return ItemRendererSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/PanelSkin.exml'] = window.skins.PanelSkin = (function (_super) {
	__extends(PanelSkin, _super);
	function PanelSkin() {
		_super.call(this);
		this.skinParts = ["titleDisplay","moveArea","closeButton"];
		
		this.minHeight = 230;
		this.minWidth = 450;
		this.elementsContent = [this._Image1_i(),this.moveArea_i(),this.closeButton_i()];
	}
	var _proto = PanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(2,2,12,12);
		t.source = "border_png";
		t.top = 0;
		return t;
	};
	_proto.moveArea_i = function () {
		var t = new eui.Group();
		this.moveArea = t;
		t.height = 45;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image2_i(),this.titleDisplay_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "header_png";
		t.top = 0;
		return t;
	};
	_proto.titleDisplay_i = function () {
		var t = new eui.Label();
		this.titleDisplay = t;
		t.fontFamily = "Tahoma";
		t.left = 15;
		t.right = 5;
		t.size = 20;
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 0;
		t.wordWrap = false;
		return t;
	};
	_proto.closeButton_i = function () {
		var t = new eui.Button();
		this.closeButton = t;
		t.bottom = 5;
		t.horizontalCenter = 0;
		t.label = "close";
		return t;
	};
	return PanelSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ProgressBarSkin.exml'] = window.skins.ProgressBarSkin = (function (_super) {
	__extends(ProgressBarSkin, _super);
	function ProgressBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.minHeight = 18;
		this.minWidth = 30;
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = ProgressBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_pb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.percentHeight = 100;
		t.source = "thumb_pb_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.horizontalCenter = 0;
		t.size = 15;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return ProgressBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/RadioButtonSkin.exml'] = window.skins.RadioButtonSkin = (function (_super) {
	__extends(RadioButtonSkin, _super);
	function RadioButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_disabled_png")
				])
		];
	}
	var _proto = RadioButtonSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "radiobutton_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return RadioButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ScrollerSkin.exml'] = window.skins.ScrollerSkin = (function (_super) {
	__extends(ScrollerSkin, _super);
	function ScrollerSkin() {
		_super.call(this);
		this.skinParts = ["horizontalScrollBar","verticalScrollBar"];
		
		this.minHeight = 20;
		this.minWidth = 20;
		this.elementsContent = [this.horizontalScrollBar_i(),this.verticalScrollBar_i()];
	}
	var _proto = ScrollerSkin.prototype;

	_proto.horizontalScrollBar_i = function () {
		var t = new eui.HScrollBar();
		this.horizontalScrollBar = t;
		t.bottom = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.verticalScrollBar_i = function () {
		var t = new eui.VScrollBar();
		this.verticalScrollBar = t;
		t.percentHeight = 100;
		t.right = 0;
		return t;
	};
	return ScrollerSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TextInputSkin.exml'] = window.skins.TextInputSkin = (function (_super) {
	__extends(TextInputSkin, _super);
	function TextInputSkin() {
		_super.call(this);
		this.skinParts = ["textDisplay","promptDisplay"];
		
		this.minHeight = 40;
		this.minWidth = 300;
		this.elementsContent = [this._Image1_i(),this._Rect1_i(),this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("textDisplay","textColor",0xff0000)
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
			,
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
		];
	}
	var _proto = TextInputSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.height = 24;
		t.left = "10";
		t.right = "10";
		t.size = 20;
		t.textColor = 0x000000;
		t.verticalCenter = "0";
		t.percentWidth = 100;
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.height = 24;
		t.left = 10;
		t.right = 10;
		t.size = 20;
		t.textColor = 0xa9a9a9;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	return TextInputSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ToggleSwitchSkin.exml'] = window.skins.ToggleSwitchSkin = (function (_super) {
	__extends(ToggleSwitchSkin, _super);
	function ToggleSwitchSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
		];
	}
	var _proto = ToggleSwitchSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "on_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = -18;
		t.source = "handle_png";
		t.verticalCenter = 0;
		return t;
	};
	return ToggleSwitchSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VScrollBarSkin.exml'] = window.skins.VScrollBarSkin = (function (_super) {
	__extends(VScrollBarSkin, _super);
	function VScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 20;
		this.minWidth = 8;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = VScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 30;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.width = 8;
		return t;
	};
	return VScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VSliderSkin.exml'] = window.skins.VSliderSkin = (function (_super) {
	__extends(VSliderSkin, _super);
	function VSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 30;
		this.minWidth = 25;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = VSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_png";
		t.width = 7;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.horizontalCenter = 0;
		t.source = "thumb_png";
		return t;
	};
	return VSliderSkin;
})(eui.Skin);generateEUI.paths['resource/skin/battle/SkinBattleCard.exml'] = window.SkinBattleCard = (function (_super) {
	__extends(SkinBattleCard, _super);
	function SkinBattleCard() {
		_super.call(this);
		this.skinParts = ["head","bg","type","costType","cost"];
		
		this.elementsContent = [this._Image1_i(),this.head_i(),this.bg_i(),this.type_i(),this.costType_i(),this.cost_i()];
	}
	var _proto = SkinBattleCard.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.alpha = 0.8;
		t.height = 80;
		t.horizontalCenter = 0;
		t.source = "back_11_png";
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.width = 80;
		return t;
	};
	_proto.head_i = function () {
		var t = new eui.Image();
		this.head = t;
		t.horizontalCenter = 0;
		t.source = "head_json.tb_tx_caocao";
		t.touchEnabled = false;
		t.verticalCenter = 0;
		return t;
	};
	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.height = 90;
		t.source = "stage_map_guild_frame_png";
		t.touchEnabled = false;
		t.width = 90;
		return t;
	};
	_proto.type_i = function () {
		var t = new eui.Image();
		this.type = t;
		t.height = 25;
		t.right = 7;
		t.source = "tb_gb_png";
		t.top = 8;
		t.touchEnabled = false;
		t.width = 25;
		return t;
	};
	_proto.costType_i = function () {
		var t = new eui.Image();
		this.costType = t;
		t.bottom = 5;
		t.left = 8;
		t.scaleX = 0.5;
		t.scaleY = 0.5;
		t.source = "gouyu_png";
		t.touchEnabled = false;
		return t;
	};
	_proto.cost_i = function () {
		var t = new eui.Label();
		this.cost = t;
		t.bottom = 7;
		t.horizontalCenter = -5;
		t.size = 14;
		t.text = "200";
		t.textColor = 0xea2cd3;
		t.touchEnabled = false;
		return t;
	};
	return SkinBattleCard;
})(eui.Skin);generateEUI.paths['resource/skin/battle/SkinCenterKillTips.exml'] = window.SkinCenterKillTips = (function (_super) {
	__extends(SkinCenterKillTips, _super);
	function SkinCenterKillTips() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 100;
		this.width = 250;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this._Image6_i()];
	}
	var _proto = SkinCenterKillTips.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.alpha = 0.8;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(104,11,10,10);
		t.source = "battle_tips_json.img_bg_tips";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 65;
		t.left = 15;
		t.source = "head_json.tb_tx_daqiao";
		t.verticalCenter = 0;
		t.width = 65;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 65;
		t.right = 15;
		t.source = "head_json.tb_tx_diaochan";
		t.verticalCenter = 0;
		t.width = 65;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.height = 65;
		t.left = 15;
		t.source = "battle_tips_json.tb_tx_k_01";
		t.verticalCenter = 0;
		t.width = 65;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.height = 65;
		t.right = 15;
		t.source = "battle_tips_json.tb_tx_k_00";
		t.verticalCenter = 0;
		t.width = 65;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "battle_tips_json.img_text_kill";
		t.verticalCenter = 0;
		return t;
	};
	return SkinCenterKillTips;
})(eui.Skin);generateEUI.paths['resource/skin/battle/SkinRightKillTips.exml'] = window.SkinRightKillTips = (function (_super) {
	__extends(SkinRightKillTips, _super);
	function SkinRightKillTips() {
		_super.call(this);
		this.skinParts = ["bg","leftIcon","rightIcon","leftFrame","rightFrame"];
		
		this.height = 80;
		this.width = 200;
		this.elementsContent = [this.bg_i(),this.leftIcon_i(),this.rightIcon_i(),this.leftFrame_i(),this.rightFrame_i(),this._Image1_i()];
	}
	var _proto = SkinRightKillTips.prototype;

	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.alpha = 0.7;
		t.height = 80;
		t.scale9Grid = new egret.Rectangle(14,2,91,19);
		t.source = "battle_tips_json.img_bg_green";
		t.width = 200;
		return t;
	};
	_proto.leftIcon_i = function () {
		var t = new eui.Image();
		this.leftIcon = t;
		t.height = 65;
		t.left = 10;
		t.source = "head_json.tb_tx_luxun";
		t.verticalCenter = 0;
		t.width = 65;
		return t;
	};
	_proto.rightIcon_i = function () {
		var t = new eui.Image();
		this.rightIcon = t;
		t.height = 65;
		t.right = 10;
		t.source = "head_json.tb_tx_dianwei";
		t.verticalCenter = 0;
		t.width = 65;
		return t;
	};
	_proto.leftFrame_i = function () {
		var t = new eui.Image();
		this.leftFrame = t;
		t.height = 70;
		t.left = 10;
		t.source = "battle_tips_json.tb_tx_k_01";
		t.verticalCenter = 0;
		t.width = 70;
		return t;
	};
	_proto.rightFrame_i = function () {
		var t = new eui.Image();
		this.rightFrame = t;
		t.height = 70;
		t.right = 10;
		t.source = "battle_tips_json.tb_tx_k_00";
		t.verticalCenter = 0;
		t.width = 70;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 30;
		t.horizontalCenter = 0;
		t.source = "battle_tips_json.img_kill_icon";
		t.verticalCenter = 0;
		t.width = 30;
		return t;
	};
	return SkinRightKillTips;
})(eui.Skin);generateEUI.paths['resource/skin/componments/FkComButton.exml'] = window.SkinFkComButton = (function (_super) {
	__extends(SkinFkComButton, _super);
	function SkinFkComButton() {
		_super.call(this);
		this.skinParts = ["bg","lb"];
		
		this.elementsContent = [this.bg_i(),this.lb_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.icon"],[0],this.bg,"source")
		eui.Binding.$bindProperties(this, ["hostComponent.textSize"],[0],this.lb,"size")
		eui.Binding.$bindProperties(this, ["hostComponent.text"],[0],this.lb,"text")
		eui.Binding.$bindProperties(this, ["hostComponent.color"],[0],this.lb,"textColor")
	}
	var _proto = SkinFkComButton.prototype;

	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.lb_i = function () {
		var t = new eui.Label();
		this.lb = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return SkinFkComButton;
})(eui.Skin);generateEUI.paths['resource/skin/componments/SkinHpBar.exml'] = window.SkinHpBar = (function (_super) {
	__extends(SkinHpBar, _super);
	function SkinHpBar() {
		_super.call(this);
		this.skinParts = ["imgBgBar","imgCountBar"];
		
		this.elementsContent = [this.imgBgBar_i(),this.imgCountBar_i()];
	}
	var _proto = SkinHpBar.prototype;

	_proto.imgBgBar_i = function () {
		var t = new eui.Image();
		this.imgBgBar = t;
		t.height = 15;
		t.scale9Grid = new egret.Rectangle(81,5,1,1);
		t.source = "battle_tips_json.img_bg_hp_bar";
		t.width = 200;
		return t;
	};
	_proto.imgCountBar_i = function () {
		var t = new eui.Image();
		this.imgCountBar = t;
		t.height = 15;
		t.scale9Grid = new egret.Rectangle(81,5,1,1);
		t.source = "battle_tips_json.img_hp_bar_g";
		t.width = 196;
		t.x = 2;
		t.y = 0;
		return t;
	};
	return SkinHpBar;
})(eui.Skin);generateEUI.paths['resource/skin/main/SkinMainBuildingButton.exml'] = window.SkinMainBuildingButton = (function (_super) {
	__extends(SkinMainBuildingButton, _super);
	function SkinMainBuildingButton() {
		_super.call(this);
		this.skinParts = ["bg","titleicon","lb"];
		
		this.elementsContent = [this.bg_i(),this.titleicon_i(),this.lb_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.icon"],[0],this.bg,"source")
		eui.Binding.$bindProperties(this, ["hostComponent.offLeft"],[0],this.titleicon,"left")
		eui.Binding.$bindProperties(this, ["hostComponent.title"],[0],this.titleicon,"source")
		eui.Binding.$bindProperties(this, ["hostComponent.offTop"],[0],this.titleicon,"top")
		eui.Binding.$bindProperties(this, ["hostComponent.textSize"],[0],this.lb,"size")
		eui.Binding.$bindProperties(this, ["hostComponent.text"],[0],this.lb,"text")
		eui.Binding.$bindProperties(this, ["hostComponent.color"],[0],this.lb,"textColor")
	}
	var _proto = SkinMainBuildingButton.prototype;

	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.titleicon_i = function () {
		var t = new eui.Image();
		this.titleicon = t;
		return t;
	};
	_proto.lb_i = function () {
		var t = new eui.Label();
		this.lb = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return SkinMainBuildingButton;
})(eui.Skin);generateEUI.paths['resource/skin/main/SkinMainView.exml'] = window.SkinMainView = (function (_super) {
	__extends(SkinMainView, _super);
	function SkinMainView() {
		_super.call(this);
		this.skinParts = ["bg","build_dating","build_celuefu","build_jiaochang","build_jiuguan","build_jumin","build_nongtian","build_shangdian","build_tiejiang","build_youxiang","build_tongkuang","build_bingying"];
		
		this.height = 720;
		this.elementsContent = [this.bg_i(),this.build_dating_i(),this.build_celuefu_i(),this.build_jiaochang_i(),this.build_jiuguan_i(),this.build_jumin_i(),this.build_nongtian_i(),this.build_shangdian_i(),this.build_tiejiang_i(),this.build_youxiang_i(),this.build_tongkuang_i(),this.build_bingying_i()];
	}
	var _proto = SkinMainView.prototype;

	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		return t;
	};
	_proto.build_dating_i = function () {
		var t = new MainBuildingButton();
		this.build_dating = t;
		t.height = 199;
		t.icon = "building_json.zhc_dating";
		t.skinName = "SkinMainBuildingButton";
		t.title = "building_json.zhc_name_dating";
		t.width = 250;
		t.x = 380;
		t.y = 150;
		return t;
	};
	_proto.build_celuefu_i = function () {
		var t = new MainBuildingButton();
		this.build_celuefu = t;
		t.height = 153;
		t.icon = "building_json.zhc_celuefu";
		t.skinName = "SkinMainBuildingButton";
		t.title = "building_json.zhc_name_celuefu";
		t.width = 208;
		t.x = 840;
		t.y = 210;
		return t;
	};
	_proto.build_jiaochang_i = function () {
		var t = new MainBuildingButton();
		this.build_jiaochang = t;
		t.height = 166;
		t.icon = "building_json.zhc_jiaochang";
		t.skinName = "SkinMainBuildingButton";
		t.title = "building_json.zhc_name_jiaochang";
		t.width = 171;
		t.x = 630;
		t.y = 120;
		return t;
	};
	_proto.build_jiuguan_i = function () {
		var t = new MainBuildingButton();
		this.build_jiuguan = t;
		t.height = 154;
		t.icon = "building_json.zhc_jiuguan";
		t.skinName = "SkinMainBuildingButton";
		t.title = "building_json.zhc_name_jiuguan";
		t.width = 166;
		t.x = 640;
		t.y = 355;
		return t;
	};
	_proto.build_jumin_i = function () {
		var t = new MainBuildingButton();
		this.build_jumin = t;
		t.height = 154;
		t.icon = "building_json.zhc_jumin";
		t.skinName = "SkinMainBuildingButton";
		t.title = "building_json.zhc_name_jumin";
		t.width = 166;
		t.x = 785;
		t.y = 490;
		return t;
	};
	_proto.build_nongtian_i = function () {
		var t = new MainBuildingButton();
		this.build_nongtian = t;
		t.height = 127;
		t.icon = "building_json.zhc_nongtian";
		t.skinName = "SkinMainBuildingButton";
		t.title = "building_json.zhc_name_nongtian";
		t.width = 199;
		t.x = 840;
		t.y = 585;
		return t;
	};
	_proto.build_shangdian_i = function () {
		var t = new MainBuildingButton();
		this.build_shangdian = t;
		t.height = 106;
		t.icon = "building_json.zhc_shangdian";
		t.offLeft = -25;
		t.offTop = -25;
		t.skinName = "SkinMainBuildingButton";
		t.title = "building_json.zhc_name_shangpu";
		t.width = 131;
		t.x = 570;
		t.y = 570;
		return t;
	};
	_proto.build_tiejiang_i = function () {
		var t = new MainBuildingButton();
		this.build_tiejiang = t;
		t.height = 148;
		t.icon = "building_json.zhc_tiejiang";
		t.skinName = "SkinMainBuildingButton";
		t.title = "building_json.zhc_name_tiejiangpu";
		t.width = 193;
		t.x = 400;
		t.y = 453;
		return t;
	};
	_proto.build_youxiang_i = function () {
		var t = new MainBuildingButton();
		this.build_youxiang = t;
		t.height = 126;
		t.icon = "building_json.zhc_youxiang";
		t.offLeft = -25;
		t.offTop = -25;
		t.skinName = "SkinMainBuildingButton";
		t.title = "building_json.zhc_name_youxiang";
		t.width = 116;
		t.x = 1030;
		t.y = 120;
		return t;
	};
	_proto.build_tongkuang_i = function () {
		var t = new MainBuildingButton();
		this.build_tongkuang = t;
		t.height = 190;
		t.icon = "building_json.tongkuang";
		t.skinName = "SkinMainBuildingButton";
		t.title = "building_json.zhc_name_kuangchang";
		t.width = 226;
		t.x = 160;
		t.y = 260;
		return t;
	};
	_proto.build_bingying_i = function () {
		var t = new MainBuildingButton();
		this.build_bingying = t;
		t.height = 158;
		t.icon = "building_json.zhc_bingying";
		t.skinName = "SkinMainBuildingButton";
		t.title = "building_json.zhc_name_bingying";
		t.width = 216;
		t.x = 1000;
		t.y = 300;
		return t;
	};
	return SkinMainView;
})(eui.Skin);