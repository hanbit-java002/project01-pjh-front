define([
	"bootstrap",
], function() {
	$("#header-logo, #scrolled-logo").on("click", function() {
		location.href = "/";
	});

	$( window ).resize(function(event) {
		cartshow(event), togglerHeader(event);
	});

	function cartshow() {
		var windowWidth = $( window ).width();
		if(windowWidth < 1025) {
			$(".cart-account").hide();
			$(".cart-account-icon").show();
		}
		else {
			$(".cart-account").show();
			$(".cart-account-icon").hide();
			$("#icon-bar-nav").hide();
		}
	};

	function togglerHeader() {
		var windowWidth = $( window ).width();
		if (document.body.scrollTop>=150 || windowWidth < 1025) {
			$("header").hide();
			$("#scrolled-header").show();
		}
		else{
			$("#scrolled-header").hide();
			$("header").show();
		}
	}

	function handleEvents() {
		$(window).on("scroll", function() {
			togglerHeader();
		});
	}

	$("#popup-box").on("click", function(event) {
		event.stopPropagation();
	});
	$(".follow").on("click", function(event) {
		showpopupLayer(event);
	});
	$(".popup-exit, .popup-layer").on("click", function(event) {
		event.stopPropagation();
		hidepopupLayer();
	});
	$(".cart-account-icon").on("click", function(event) {
		showiconnav(event);
	});

	function showiconnav() {
		if ($("#icon-bar-nav").css("display") === "none") {
			$("#icon-bar-nav").css("display", "block");
		}
		else{
			$("#icon-bar-nav").css("display", "none");
		}
	}


	function showpopupLayer(event) {
	$(".popup-layer").show();
	$("body").css("overflow", "hidden");
	};
	function hidepopupLayer() {
	$(".popup-layer").hide();
	$("body").css("overflow", "");
	};

	$("#login-box").on("click", function(event) {
		event.stopPropagation();
	});
	$(".login").on("click", function(event) {
		showloginLayer(event);
	});
	$(".login-exit, .login-layer").on("click", function(event) {
		event.stopPropagation();
		hideloginLayer();
	});

	$("#id-btn, #password-btn").on("click", function() {
		clearKeywords();
	});

	function clearKeywords() {
		$("#id-btn, #password-btn").val("");
	};
	function showloginLayer(event) {
		event.stopPropagation();
		$(".login-layer").show();
		$("body").css("overflow", "hidden");
	};
	function hideloginLayer() {
		$(".login-layer").hide();
		$("body").css("overflow", "");
	};

	togglerHeader();
	handleEvents();
});
