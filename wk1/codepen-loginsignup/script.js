/*

############## API ##############

codepen.api.signup(user_object)
	description: to sign up a new user
	parameters: user object, which contains properties: name, email, username, password
	returns: response object

codepen.api.login(user_object)
	description: to login an existing user
	parameters: user object, which contains properties: username, password
	returns: response object


Reponse Objects:

{
	success: true/false,
	error: (string)
}


##users already signed up (can log in)
	('suzy', 'I@msoawesome')
	('conan', 'gingertastic')
	('jerry', '@#!$%@')

*/

// Part 1
$('document').ready(function() {
	$('.signup-form-btn').click(function() {
		$('.signup-form').show();
		$('.login-form').hide();
		$('.signup-form-btn').attr('class', 'signup-form-btn active');
		$('.login-form-btn').attr('class', 'login-form-btn');
	});
	$('.login-form-btn').click(function() {
		$('.login-form').show();
		$('.signup-form').hide();
		$('.signup-form-btn').attr('class', 'signup-form-btn');
		$('.login-form-btn').attr('class', 'login-form-btn active');
	});
	// Part 2
	$('.btn-login').click(function() {
		var user = {
			username:$('#login-username-field').val(),
			password:$('#login-password-field').val()
		};
		$(function() {
			var answer = codepen.api.login(user);
			if(answer.success){
				alert("Login Works");
			}else{
				alert(answer.error);
			}
		});
	});
	// Part 3
	$('.btn-signup').click(function() {
		var newUser = {
			name:$('#signup-name-field').val(),
			email:$('#signup-email-field').val(),
			username:$('#signup-username-field').val(),
			password:$('#signup-password-field').val()
		};
		$(function() {
			var answer = codepen.api.signup(newUser);
			if(answer.success) {
				alert("SignUp Works")
			}else{
				alert(answer.error);
			}
		});
	});
});
