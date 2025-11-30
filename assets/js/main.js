(function() {
	"use strict";

	// Core Utils
	var on = function(element, event, handler) {
		element.addEventListener(event, handler);
	};

	// Vars
	var body = document.body;

	// Disable animations/transitions until everything's loaded.
	body.classList.add('is-loading');

	on(window, 'load', function() {
		// Remove loading class
		// 약간의 딜레이를 주어 부드럽게 전환되도록 함
		setTimeout(function() {
			body.classList.remove('is-loading');
		}, 100);
	});

})();
