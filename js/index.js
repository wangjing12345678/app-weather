
	let tianqi
	$.ajax({
		type:"get",
		url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=吉林",
		dataType:"jsonp",
		success:function(obj){
			tianqi=obj.data;
			console.log(tianqi);
			//获取当前城市
			updata(tianqi);
			
		}
	})



	//封装函数一周天气以及每日天气等
	function updata(tianqi){
       $(".province").html(tianqi.city);
       $(".air div").html(tianqi.weather.quality_level);
       $(".temper").html(tianqi.weather.current_temperature+"°");
       $(".condition").html(tianqi.weather.current_condition);
       $(".humidity span").html(tianqi.weather.wind_direction);

       //今天天气
       $(".jintian>span:nth-child(2)").html(tianqi.weather.dat_low_temperature+"/"+tianqi.weather.dat_high_temperature+"℃");
       $(".jintian-ico span").html(tianqi.weather.dat_condition);
       $(".jintian-ico img").attr("src","./img/"+tianqi.weather.dat_weather_icon_id+".png");

       //明天天气
      
       $(".mingtian>span:nth-child(2)").html(tianqi.weather.tomorrow_low_temperature+"/"+tianqi.weather.tomorrow_high_temperature+"℃")
       $(".mingtian-ico span").html(tianqi.weather.tomorrow_condition);
       $(".mingtian-ico img").attr("src","./img/"+tianqi.weather.tomorrow_weather_icon_id+".png");


       // 未来24小时
       let hweather=tianqi.weather.hourly_forecast;
       console.log(hweather);
       hweather.forEach(function(v){
       	// let li=document.creatElement("li");
       	// $(".everytime ul").append(li);
       	// $(".everytime ul li").append("<div>"+v.hour+"</div>");
       	let str=`
       		<li>
				<div class="hour">${v.hour}:00</div>
				<img src="./img/${v.weather_icon_id}.png">
				<div class="du">${v.temperature}℃</div>
			</li>

       	`
       	$(".everytime ul").append(str);

       	
       })


       // 一周天气
       let weekweather=tianqi.weather.forecast_list;
       console.log(weekweather);
       weekweather.forEach(function(v){
       	let str4=`
       		<li>
				<p>${(v.date).slice(5,7)}/${(v.date).slice(8,10)}</p>
				<div>${v.condition}</div>
				<img src="./img/${v.weather_icon_id}.png">
			</li>
       	`
       	$(".weekup").append(str4);
       		let str5=`
       		<li>
				<img src="./img/${v.weather_icon_id}.png">
				<div>${v.condition}</div>
				<p>${v.wind_direction}</p>
				<p>${v.wind_level}级</p>
			</li>

       	`
       	$(".weekdown").append(str5);

       })

	}


    // 点击搜索
	$(".province").click(function(){
		$(".select").css({"display":"block"});
		$(".everytime").css({"display":"none"});
		$(".aweek").css({"display":"none"});
		$(".tips").css({"display":"none"});
		$(".footer").css({"display":"none"});
	})
	$(".cancel").click(function(){
		$(".select").css({"display":"none"});
		$(".everytime").css({"display":"block"});
		$(".aweek").css({"display":"block"});
		$(".tips").css({"display":"flex"});
		$(".footer").css({"display":"block"});
	})
	let city;
	$.ajax({
		type:"get",
		url:"https://www.toutiao.com/stream/widget/local_weather/city/",
		dataType:"jsonp",
		success:function(obj){
			city=obj.data;
			console.log(city);
			updataCity(city);
		}
	})
	// function updataCity(city){
 //       for(let i in city){
 //       	// console.log(i);
 //       	let str2=`
 //       	<li class="name1">${i}</li>

 //       	`
 //       	$(".hotcity-ul").append(str2);
 //       	for(let j in city[i]){
 //       		// console.log(j);
 //       		let str3=`
 //       		<li class="name2">${j}</li>

 //       		`
 //       		$(".hotcsenery-ul").append(str3);
 //       	}

 //       }
	// }

  let k=0;
	function updataCity(city){
		for(let i in city){
       	// console.log(i);
       	
       	let str6=`
            	<div class="location-title hotcity">${i}</div>
				<ul class="location hotcity-ul">
				</ul> 

       	`
       	$(".remen").append(str6);
       	for(let j in city[i]){
       		let str7=`
                <li class="name1">${j}</li>

       		`
       		$(".hotcity-ul").eq(k).append(str7);


       }
       k++;
	}
}


 window.onload=function(){
 	//点击每个城市的时候
   	$(".name1").click(function(){
   		$(".select").css({"display":"none"});
		$(".everytime").css({"display":"block"});
		$(".aweek").css({"display":"block"});
		$(".tips").css({"display":"flex"});
		$(".footer").css({"display":"block"});
   		let con=$(this).html();
   		ajaxs(con);
   	})
   	function ajaxs(tianqi1){
   		let url1=`https://www.toutiao.com/stream/widget/local_weather/data/?city=${tianqi1}`;
   	    $.ajax({
   	    	type:"get",
   	    	url:url1,
   	    	dataType:"jsonp",
   	    	success:function(obj){
   	    		let tianqi2=obj.data;
   	    		$(".everytime ul").html("");
   	    		$(".weekup").html("");
				$(".weekdown").html("");
   	    		updata(tianqi2);

   	    	}
   	    })
   	}


   	 //在搜索框内输入内容 取消变成搜索
     $(".search-text input").focus(function(){
     	$(".cancel").html("搜索");
     })
      
     $(".cancel").click(function(){
      if($(".cancel").html()=="搜索"){
          $(".select").css({"display":"none"});
          $(".everytime").css({"display":"block"});
          $(".aweek").css({"display":" block"});
          $(".tips").css({"display":"flex"});
          $(".footer").css({"display":"block"});
      let text=$(".search-text input").val();
      ajaxs(text);
      }
     

   		
     })

   }


