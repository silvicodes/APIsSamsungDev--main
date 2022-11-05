'use strict';

if (window.File && window.FileReader && window.FileList) {
	alert("API's verificadas");
	function handleFileSelect(evt) {
		let file = evt.target.files[0];
		if (!file.type.match('video.*')) {
			return;
		}
		let reader = new FileReader();
		reader.onload = (function (File) {
			return function (e) {
				let videoDiv = document.getElementsByClassName('video-container');
				if (videoDiv[0] != null) {
					videoDiv[0].parentNode.removeChild(videoDiv[0]);
				}
				let div = document.createElement('div');
				div.id = "div-video";
				div.className = "video-container";
				div.innerHTML = '<video controls id="video" class="thumbnail" src="' + e.target.result + '" title="' + escape(File.name) + '"/>';
				document
					.getElementById('video-output')
					.insertBefore(div, null);
				let loadingMessage = document.createElement('p');
				loadingMessage.id = "loading";
				loadingMessage.className = "loading-message";
				loadingMessage.innerHTML = 'Cargando video';
				document
					.getElementById('video-output')
					.insertBefore(loadingMessage, null);
				let playButton = document.getElementById('play');
				let pauseButton = document.getElementById('pause');
				let volumeUp = document.getElementById('up');
				let volumeDown = document.getElementById('down');
				playButton.addEventListener('click', () => {
					document.getElementById('video').play();
				});
				pauseButton.addEventListener('click', () => {
					document.getElementById('video').pause();
				})
				volumeUp.addEventListener('click', () => {
					document.getElementById('video').volume += 0.2;
				})
				volumeDown.addEventListener('click', () => {
					document.getElementById('video').volume -= 0.2;
				})
				document.getElementById('video').addEventListener('canplay', () => {
					let loadingMessage = document.getElementById('loading');
					document
						.getElementById('video-output')
						.removeChild(loadingMessage);
					document
						.getElementById('video')
						.style.visibility = "visible";
					playButton
						.style.visibility = "visible";
					pauseButton
						.style.visibility = "visible";
					volumeUp
						.style.visibility = "visible";
					volumeDown
						.style.visibility = "visible";
				});
			}
		})(file);
		reader
			.readAsDataURL(file);
	}
	document
		.getElementById('file')
		.addEventListener('change', handleFileSelect, false);
} else {
	alert('API no soportada por el navegador')
}