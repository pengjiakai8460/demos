$(document).ready(function(){
	/*
	 *计算总价需要先将单价乘以100，再除以100.直接进行乘法运算会报NaN语法错误
	 */
	//全选
	$("#all").change(function(){
		if($(this).prop("checked")){
			$(".selectd").prop("checked",true);
			getTotalPrice();
		}else{
			$(".selectd").prop("checked",false);
			getTotalPrice();
		}
	});
	//取消选择
	$(".selectd").each(function(){
		$(this).change(function(){
			if($(this).prop("checked")){
				$(this).prop("checked",true);
				getTotalPrice();
			}else{
				$(this).prop("checked",false);
				getTotalPrice();
			}
		})
	});
	//输入框输入商品数量
	$(".nums").keyup(function(){
		var nums = $(this).val();
		if(!(/^[1-9]*$/.test(nums))){
			$(this).val("");
			$(this).focus();
		}else{
			var one_price = $(this).parent().siblings(".one-price").text() * 100;
			if(nums >= 1){
				getPrice($(this),nums,one_price);
			} 
		}
		
	})
	//商品数量加减
	$(".add").click(function(){
		var nums = $(this).siblings(".nums").val();
		nums++;
		$(this).siblings(".nums").val(nums);
		var one_price = $(this).parent().siblings(".one-price").text() * 100;
		getPrice($(this),nums,one_price);
	});
	$(".reduce").click(function(){
		var nums = $(this).siblings(".nums").val();
		if(nums > 0) nums--;
		$(this).siblings(".nums").val(nums);
		var one_price = $(this).parent().siblings(".one-price").text() * 100;
		getPrice($(this),nums,one_price);
	});
	//发送订单
	$(".checks").click(function(){
		var nums = $(".total-nums").text();
		if(nums > 0){
			alert("订单可以发送！！！");
			//ajax发送数据
		}else{
			alert("没有商品被选中！！！");
		}
	})
	//初始化
	getTotalPrice();
	//选项卡\
	$(".title > span").each(function(){
		$(this).click(function(){
			var index = $(".title > span").index(this);
			$(this).addClass("active").removeClass("no-active").siblings().addClass("no-active").removeClass("active");
			$(".body > div").eq(index).slideDown().siblings().slideUp();
		})
	});
	$("#rotate").click(function(){
		$(this).css({"transform":"rotateY(180deg)"});
	})
});
//计算单个商品总价
function getPrice(obj,nums,one_price){
	var price = parseInt(nums) * parseInt(one_price);
	obj.parent().siblings(".total").text(floatTwo(price / 100));
	getTotalPrice();
}
//计算总价
function getTotalPrice(){
	var price = 0,nums = 0,price_one = '', nums_one = '';
	$(".goods .selectd").each(function(){
		if($(this).prop("checked") == true){
			price_one = $(this).parent().siblings(".total").text() * 100;
			nums_one  = $(this).parent().siblings().find(".nums").val();
			nums 	  += parseInt(nums_one);
			price     += price_one;
		}else{
			price_one = 0;
			nums_one  = 0;
			nums      += parseInt(nums_one);
			price     += price_one;
		}
		
		$(".total-nums").text(nums);
		$(".total-price").text(floatTwo(price / 100));
	});
}
//保留小数点两位
function floatTwo(x) {
    var f_x = parseFloat(x);
    if (isNaN(f_x)) {
        return false;
    }
    var f_x = Math.round(x * 100) / 100;
    var s_x = f_x.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
    }
    return s_x;
}
$(function(){
		var len = $(".img-box > img").length;
		
		var index = 0;
		var times;
		$(".img-box > img").mouseover(function(){
			index  =   $(".img-box > img").index(this);
			showImg(index);
		}).eq(0).mouseover();
		$(".img-box").hover(function(){
			clearInterval(times);
		},function(){
			times = setInterval(function(){
				showImg(index);
				index ++;
				if(index == len) index = 0;
			},2000);
		}).trigger("mouseleave");
	});
	function showImg(index){
		var height = $(".img-box").height();
		
		$("img-box").stop(true,false).animate({bottom : -height * index},1000);
	}