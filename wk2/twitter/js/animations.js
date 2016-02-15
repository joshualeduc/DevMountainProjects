$(document).ready(function() {
	// compose tweet box part 1-4
	$('#tweet-content > .tweet-compose').focus(function(){
		$('#tweet-controls').show();
		$(this).css("height", "5em");
	});
	$('#tweet-content > .tweet-compose').focusout(function(){
		var isHovered=$('#dashboard').is(":hover");
		if(isHovered=false){
			$('#tweet-controls').hide();
			$(this).css("height", "2.5em");
		};
	});
	$('.tweet-compose').keyup(function(){
		var max = 140;
		var length = $(this).val().length;
		if(length >= (max - 10)){
			$('#char-count').css("color", "red");
		}else {
			$('#char-count').css("color", "#999");
		};
		if(length > max){
			$('#tweet-submit').hide()
		}else {
			$('#tweet-submit').show()
		};
		var char = max - length;
		$('#char-count').text(char);
		
	});
	// new tweet part 5
	$('.button').click(function(){
		var newTweet = '<div class="tweet">'+
							'<div class="content">'+
								'<img class="avatar" src="img/alagoon.jpg"/>'+
								'<strong class="fullname">Your Name Here</strong>'+
								'<span class="username">@yourname</span>'+
								'<p class="tweet-text">'+$('#tweet-content > .tweet-compose').val()+'</p>'+
							'</div>'+
						'</div>'
		$('#stream').prepend(newTweet);
	});
	//stream part 6 and 7
	$('.tweet').hover(function(){
			$(this).find('.tweet-actions').show();
		},function(){
			$(this).find('.tweet-actions').hide();
		});
	$('.tweet').click(function(){
			$(this).find('.stats').show();
	});
});
