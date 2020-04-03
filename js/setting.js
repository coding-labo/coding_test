/************************************************************************************************************

 Smart rollover 外部ファイル無し
 
************************************************************************************************************/

function smartRollover() {
	if(document.getElementsByTagName) {
		var images = document.getElementsByTagName("img");

		for(var i=0; i < images.length; i++) {
			if(images[i].getAttribute("src").match("_off."))
			{
				images[i].onmouseover = function() {
					this.setAttribute("src", this.getAttribute("src").replace("_off.", "_on."));
				}
				images[i].onmouseout = function() {
					this.setAttribute("src", this.getAttribute("src").replace("_on.", "_off."));
				}
			}
		}
	}
}

if(window.addEventListener) {
	window.addEventListener("load", smartRollover, false);
}
else if(window.attachEvent) {
	window.attachEvent("onload", smartRollover);
}

/******************************************************

 local navigation current　外部ファイル無し
 
*****************************************************/

(function($){

	$(function(){ globalNavAction(); });
	
	function globalNavAction(){	
		
		var PID=$('body').attr('id');
		$('nav li.'+PID+' a img').attr('src','images/nav/nav_'+PID+'_on.jpg');
		
	}

})(jQuery);


/************************************************************************************************************

 open new window　外部ファイル無し
 
************************************************************************************************************/

(function($){
	$(function(){ OpenNewWindow(); });
	
	function OpenNewWindow() {
		
		$.extend($.expr[':'],{
			newWindow: function(a,i,m) {
				if(!a.href) { return false; }
				return a.hostname && a.hostname !== window.location.hostname;
			}
		});
		 
		$(function(){			
			$('a[href^="map.html"], a[href^="outline.html"]').addClass('newWindow').click(function(){
				window.open(this.href,'popupWindow', 'width=780, height=650, menubar=yes, toolbar=yes, scrollbars=yes, resizable=yes, location=yes');
				return false;
			});
			
			
		});
	}
})(jQuery);


/************************************************************************************************************

smooth scroll　外部ファイル無し
 
************************************************************************************************************/

function smoothscroll(){
		$("a[href*=#]:not(.noroll),area[href*=#]:not(.noroll)").not(".list a").click(function(){
			$(this).scrollTo(600);
			
			return false;
		});
}
jQuery.fn.extend({
	scrollTo : function(speed, easing){
		if(!$(this)[0].hash || $(this)[0].hash == "#"){
			return false;
		}
		return this.each(function() {
			var targetOffset = $($(this)[0].hash).offset().top;
			$('html,body').animate({scrollTop: targetOffset}, speed, easing);
		});
	}
});
$(document).ready(smoothscroll);


/******************************************************

フロート　ナビ　外部ファイル無し
 
*****************************************************/

var name = "#floatMenu";
    var menuYloc = null;
     
        $(document).ready(function(){
            menuYloc = parseInt($(name).css("top").substring(0,$(name).css("top").indexOf("px")))
            $(window).scroll(function () { 
                offset = menuYloc+$(window).scrollTop()+"px";
                $(name).animate({top:offset},{duration:100,queue:false});
            });
        }); 
        
/******************************************************

leanModal　外部ファイル要
 
*****************************************************/
// leanModal v1.1 by Ray Stone - http://finelysliced.com.au
// Dual licensed under the MIT and GPL

(function($){$.fn.extend({leanModal:function(options){var defaults={top:100,overlay:0.5,closeButton:null};var overlay=$("<div id='lean_overlay'></div>");$("body").append(overlay);options=$.extend(defaults,options);return this.each(function(){var o=options;$(this).click(function(e){var modal_id=$(this).attr("href");$("#lean_overlay").click(function(){close_modal(modal_id)});$(o.closeButton).click(function(){close_modal(modal_id)});var modal_height=$(modal_id).outerHeight();var modal_width=$(modal_id).outerWidth();
$("#lean_overlay").css({"display":"block",opacity:0});$("#lean_overlay").fadeTo(200,o.overlay);$(modal_id).css({"display":"block","position":"fixed","opacity":0,"z-index":11000,"left":50+"%","margin-left":-(modal_width/2)+"px","top":o.top+"px"});$(modal_id).fadeTo(200,1);e.preventDefault()})});function close_modal(modal_id){$("#lean_overlay").fadeOut(200);$(modal_id).css({"display":"none"})}}})})(jQuery);


/******************************************************

タブ 　外部ファイル無し
 
*****************************************************/

$(function() {
    $(".inNavTab li").click(function() {
        var tab = $(this).closest('.navgirl');
        var num = tab.find(".inNavTab li").index(this);
        tab.find(".inNavPannel").addClass('noDisp');

        var nowTab = tab.find(".inNavPannel").eq(num);
        nowTab.removeClass('noDisp');
        var bgDiv = nowTab.closest("section").find("div:first");
        tab.find(".inNavTab li").removeClass('select');
        bgDiv.removeClass().addClass("bg"+$(this).attr("class"));
        $(this).addClass('select')
    });


/************************************************************************************************************

 bxslider jquery　外部ファイル要
 
************************************************************************************************************/


$(document).ready(function(){
	$('.items3').bxSlider({
		auto: false,
		pause:	5000,
		speed: 1000,
		pager: false,
		minSlides: 3,
		maxSlides: 3,
		moveSlides:3,
		slideWidth:240,
		slideMargin:60,
		nextSelector: '#items3-next',
		prevSelector: '#items3-prev',
		prevText: '<img src="img/common/btn_left.png" width="29" height="30" alt="左へ" />',
		nextText: '<img src="img/common/btn_right.png" width="29" height="30" alt="左へ" />'
	});
	
	count = 0;
	$("#customPager img").each(function() {
		$(this).wrap('<a data-slide-index="' + count + '" href="javascript:void(0);" class="icon">');
		count++;
	});
	$('.collectionSlid').bxSlider({
		auto: false,
		pause:	5000,
		speed: 1000,
		pager : true ,
		minSlides: 1,
		maxSlides: 1,
		moveSlides:1,
		slideWidth:195,
		slideMargin:0,
		onSlideBefore: function(element,beforeIndex,nextIndex){
			$('#customPager img').attr('src','img/univers/slide_dcurrent.gif');
			$('#customPager img').eq(nextIndex).attr('src','img/univers/slide_current.gif');
		},
		pagerCustom : '#customPager',
		nextSelector: '#collectionSlid-next',
		prevSelector: '#collectionSlid-prev',
		prevText: '<img src="img/common/btn_left.png" width="29" height="30" alt="左へ" />',
		nextText: '<img src="img/common/btn_right.png" width="29" height="30" alt="左へ" />'
	});
});

/************************************************************************************************************

 selectbox　カスタムセレクトjquery　外部ファイル要
 
************************************************************************************************************/

$(document).ready(function(){
$('.fmselect').customSelect();
});
});

