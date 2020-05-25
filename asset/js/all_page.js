AOS.init({
  duration: 1200,
})

$(function() {
	$("#goto_top_bttn").hide();
	var mybutton = document.getElementById("goto_top_bttn");
	window.onscroll = function() {scrollFunction()};
	function scrollFunction() {
	  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
	    // mybutton.style.display = "block";
	    $("#goto_top_bttn").show(500);
	  } else {
	    mybutton.style.display = "none";
	  }
	}

	$("#goto_top_bttn").on("click", function(){
		topFunction();
	});

	function topFunction() {
	  /*document.body.scrollTop = 0;
	  document.documentElement.scrollTop = 0;*/
	  // $("html, body").animate({ scrollTop: 0 }, "slow");
	  $("html, body").animate({ scrollTop: 0 }, 960);
	}

	$("#goto_down_bttn").on('click', function(){
		downFunction();
	});

	function downFunction() {
		// document.body.scrollTop = 500;
		// document.documentElement.scrollTop = 600;
		$("html, body").animate({ scrollTop: 600 }, 1500, 'linear');
	}
});


/*Viewer counter*/
//http://localhost/sites/myportfolio_api/viewers.php
$(function() {
	$.ajax({
		url: 'https://mybestblogs.000webhostapp.com/gitsitejssource/viewers.php',
		metod: 'POST',
		dataType: 'json',
	})
});
