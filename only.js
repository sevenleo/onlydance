
// Put event listeners into place
window.addEventListener("DOMContentLoaded", function() {
	// Grab elements, create settings, etc.
    var canvas = document.getElementById('webcam_freeze');
    var context = canvas.getContext('2d');
    var webcam = document.getElementById('webcam_original');
    var mediaConfig =  { video: true };
    var errBack = function(e) {
    	console.log('An error has occurred!', e)
    };

	// Put webcam listeners into place
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(mediaConfig).then(function(stream) {
			//webcam.src = window.URL.createObjectURL(stream);
			webcam.srcObject = stream;
            webcam.play();
        });
    }

    // Legacy code below! 
    else if(navigator.getUserMedia) { // Standard
		navigator.getUserMedia(mediaConfig, function(stream) {
			webcam.src = stream;
			webcam.play();
		}, errBack);
	} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
		navigator.webkitGetUserMedia(mediaConfig, function(stream){
			webcam.src = window.webkitURL.createObjectURL(stream);
			webcam.play();
		}, errBack);
	} else if(navigator.mozGetUserMedia) { // Mozilla-prefixed
		navigator.mozGetUserMedia(mediaConfig, function(stream){
			webcam.src = window.URL.createObjectURL(stream);
			webcam.play();
		}, errBack);
	}

	// Trigger photo take
	document.getElementById('button_freeze').addEventListener('click', function() {
		//context.drawImage(webcam, 0, 0, 100, 100);
		context.drawImage(webcam, 0, 0, canvas.width, canvas.height)

	});
}, false);




function PauseEverything() {
	$("#PauseEverything").hide();
	$("#ResumeEverything").show();
	//$(".webcamsource").hide();
	$(".webcam").css("filter", "blur(1px) grayscale(100%)");
	$('#bgndVideo').YTPToggleFilter('blur', 3);
	$('#bgndVideo').YTPToggleFilter('grayscale', 100);
	$('#bgndVideo').YTPPause();
}

function ResumeEverything() {
	$("#PauseEverything").show();
	$("#ResumeEverything").hide();
	//$(".webcamsource").show();
	$(".webcam").css("filter", "blur(0px) grayscale(0%)");
	$('#bgndVideo').YTPToggleFilter('blur', 0);
	$('#bgndVideo').YTPToggleFilter('grayscale', 100);
	$('#bgndVideo').YTPPlay();
}


function changevideo(URL){
	$("#PauseEverything").show();
	$("#ResumeEverything").hide();
	$(".webcam").css("filter", "");
	$('#bgndVideo').YTPChangeVideo({videoURL: URL, mute:false, addRaster:false});
	$('#bgndVideo').YTPToggleFilter('blur', 0);
	$('#bgndVideo').YTPToggleFilter('grayscale', 100);
}
