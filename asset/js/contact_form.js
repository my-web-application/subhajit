/*Captcha*/

class Captcha{
	constructor(a=0, b=0){
		this.a = a;
		this.b = b;
	}

	getcaptcha(){
		var a = 0;
		var b = 0;
		$.ajax({
			url: "http://localhost/sites/myportfolio_api/captcha.php",
			method: "GET",
			dataType: 'json',
			async: false,
			success: function(e){
				// console.log(e);
				a = e[0];
				b = e[1];
				$(".captcha_question").text(a+"+"+b);
			},
			error: function(e){
				console.log(e);
			}
		});
		return [a,b];
	}

	verify(calculate){
		const ans = this.a + this.b;
		// console.log(calculate);
		return (calculate == ans);
	}
}

var obj;

$(function(){
	let resp = Captcha.prototype.getcaptcha();
	obj = new Captcha(resp[0], resp[1]);
	/*	https://javascript.info/class	*/
	$(".captcha_refresh").on("click", function(){
		resetCaptcha();
	});
	// obj.verify();
});

function resetCaptcha(){
	resp = Captcha.prototype.getcaptcha();
	obj = new Captcha(resp[0], resp[1]);
}

function captchaCheck(calculate){
	// console.log(obj);
	return obj.verify(calculate);
}

/*Captcha end*/



$(function() {

	$(".loader").hide(500);

	jQuery.validator.addMethod("lettersonly", function(value, element) {
		return this.optional(element) || /^[a-zA-Z ]+$/i.test(value);
	}, "Letters only please"); 

	$("form[name='contact-with-me']").validate({
		rules: {
			full_name: {
				required: true,
				lettersonly: true
			},
			email_id: {
				required: true,
				email: true
			},
			subject: "required",
			message: "required",
			captcha_answer: {
				required: true,
				number: true
			}
		},

		messages: {
			full_name: {
				required: "Please enter your name",
				lettersonly: "Please enter valid name"
			},
			email_id: {
				required: "Please enter your mail id",
				email: "Please enter valid mail id"
			},
			subject: "Please enter specific subject",
			message: "Message is blank. Please enter some message",
			captcha_answer: {
				required: "Please enter the captcha answer",
				number: "Only number accepct"
			}
		},
		submitHandler: function(form) {
			// form.submit();
			/*let form_values = $("form[name='contact-with-me']").serialize();
			console.log(form_values);*/

			let full_name = $('#full_name').val();
			let email_id = $('#email_id').val();
			let subject = $('#subject').val();
			let message = $('#message').val();
			let calculate = $('#captcha_answer').val();

			datainput = {
				"full_name": full_name,
				"email_id": email_id,
				"subject": subject,
				"message": message
			};

			// console.log(datainput);
			if(!captchaCheck(calculate)){
				// console.log("Come false");
				$("#captcha_answer-error").show();
				$("#captcha_answer-error").html("Captcha answer error");
				resetCaptcha();
				return false;
			}

			// url: "http://192.168.2.12/sites/myportfolio_api/contact_api.php",

			$(".loader").show();

			setTimeout(function(){
				$.ajax({
					url: "https://mybestblogs.000webhostapp.com/gitsitejssource/contact_api.php",
					method: "POST",
					data: datainput,
					dataType: "json",
					success: function(e){
						// console.log(e);
						if(e.message === "Data store")
						{
							$("#status-message-success").text("Thank you for contact with me. Please check your mail to my response");
							$("#status-message-success").show(1000);
							$(".loader").hide(500);
							setTimeout(function(){
								$("#status-message-success").slideUp(1000);
							}, 3000);
						}
						return false;
					},
					statusCode: {
						500: function(e){
							// console.log(e);
							// console.log("Server error");
							$("#status-message-error").text("Something was error. Please try again after some time. Or contact with me. Contact details bllow");
							$("#status-message-error").show(1000);
							$(".loader").hide(500);
							setTimeout(function(){
								$("#status-message-error").slideUp(1000);
							}, 3000);
						}
					}
				});				
			}, 3000);

			return false;
		}
	});
});


//https://www.sitepoint.com/basic-jquery-form-validation-tutorial/
