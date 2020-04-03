/*HTML内記述
	
<script>
$(function(){
$(".box-patent>.box-child").heightLine();
});
</script>



maxWidthオプション

ウィンドウ幅640px以下の場合のみ高さを揃えたい場合はmaxWidthオプションを指定します。

$(".box1>div").heightLine({
    maxWidth:640
});
minWidthオプション

ウィンドウ幅640px以上の場合のみ高さを揃えたい場合はminWidthオプションを指定します。

$(".box2>div").heightLine({
    minWidth:640
});
maxWidthオプション / minWidthオプション

ウィンドウ幅500px以上、700px以下の場合のみ高さを揃えたい場合はminWidthオプションとmaxWidthオプションの両方を指定します。

$(".box3>div").heightLine({
    maxWidth:700,
    minWidth:500
});
fontSizeCheckオプション

fontSizeCheckオプションを指定するとフォントサイズが変更された際も高さを再設定します。

$(".box4>div").heightLine({
    fontSizeCheck:true
});
destroyメソッド

設定されたheightLineを取り除きたい場合はdestroyメソッドを利用します。

$(".box0>div").heightLine("destroy");
refreshメソッド

コンテンツの内部が変更された場合などはrefreshメソッドで再度高さの設定が可能です。

$(".box0>div").heightLine("refresh");

*/



/*!--------------------------------------------------------------------------*
 *  
 *  jquery.heightLine.js
 *  
 *  MIT-style license. 
 *  
 *  2013 Kazuma Nishihata 
 *  http://www.to-r.net
 *  
 *--------------------------------------------------------------------------*/
;(function($){
	$.fn.heightLine = function(){
		var target = this,fontSizeChangeTimer,windowResizeId= Math.random();
		var heightLineObj = {
			op : {
				"maxWidth" : 10000,
				"minWidth" : 0,
				"fontSizeCheck" : false
			},
			setOption : function(op){
				this.op = $.extend(this.op,op);
			},
			destroy : function(){
				target.css("height","");
			},
			create : function(op){
				var self = this,
					maxHeight = 0,
					windowWidth = $(window).width();
				self.setOption(op);
				if( windowWidth<=self.op.maxWidth && windowWidth>=self.op.minWidth ){
					target.each(function(){
						if($(this).outerHeight()>maxHeight){
							maxHeight = $(this).outerHeight();
						}
					}).each(function(){
						var height = maxHeight
								   - parseInt($(this).css("padding-top"))
								   - parseInt($(this).css("padding-bottom"));
						$(this).height(height);
					});
				}
			},
			refresh : function(op){
				this.destroy();
				this.create(op);
			},
			removeEvent :function(){
				$(window).off("resize."+windowResizeId);
				target.off("destroy refresh");
				clearInterval(fontSizeChangeTimer);
			}
		}
		if(typeof arguments[0] === "string" && arguments[0] === "destroy"){
			target.trigger("destroy");
		}else if(typeof arguments[0] === "string" && arguments[0] === "refresh"){
			target.trigger("refresh");
		}else{
			heightLineObj["create"](arguments[0]);
			
			$(window).on("resize."+windowResizeId,function(){
				heightLineObj["refresh"]();
			});

			target.on("destroy",function(){
				heightLineObj["removeEvent"]();
				heightLineObj["destroy"]();
			}).on("refresh",function(){
				heightLineObj["refresh"]();
			});

			if(heightLineObj.op.fontSizeCheck){
				
				if($("#fontSizeChange").length<=0){
					var fontSizeChange = $("<span id='fontSizeChange'></span>").css({
						width:0,
						height:"1em",
						position:"absolute",
						left:0,
						top:0
					}).appendTo("body");
				}
				var defaultFontSize = $("#fontSizeChange").height();
				fontSizeChangeTimer = setInterval(function(){
					if(defaultFontSize != $("#fontSizeChange").height()){
						heightLineObj["refresh"]();
					}
				},100);
			}
		}
		return target;
	}
})(jQuery);