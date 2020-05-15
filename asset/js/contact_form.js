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
			message: "required"
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
			message: "Message is blank. Please enter some message"
		},
		submitHandler: function(form) {
			// form.submit();
			/*let form_values = $("form[name='contact-with-me']").serialize();
			console.log(form_values);*/

			let full_name = $('#full_name').val();
			let email_id = $('#email_id').val();
			let subject = $('#subject').val();
			let message = $('#message').val();

			datainput = {
				"full_name": full_name,
				"email_id": email_id,
				"subject": subject,
				"message": message
			};

			// console.log(datainput);

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