define([
	"bootstrap",
], 	function() {
	document.cookie = "CartAccount=; path=/";
	function attachEvents() {
		$( ".item-img" ).off("mouseenter");
		$( ".item-img" ).on("mouseenter", function() {
			$( this ).fadeTo( "fast", 0.6 );
		});

		$( ".item-img" ).off("mouseleave");
		$( ".item-img" ).on("mouseleave", function() {
			$( this ).fadeTo( "fast", 1 );
		});
	}

	var popupCssSelector = "";

	function closeLayerPopup() {
		$(popupCssSelector).hide();

		$(".block-layer").remove();
		$("body").css("overflow", "");

		popupCssSelector = "";
	}
	function openAjaxPopup(layerName) {
		$.ajax({
			url: "/layers/" + layerName + ".html",
			success: function(html) {
				$("body").css("overflow", "hidden");

				var blockLayerHTML = "<div class='block-layer ajax'></div>";
				$("body").append(blockLayerHTML);

				$("body").append(html);

				$("#sign-btn-container>input:first-child").focus();

				attachPopupEvents(layerName);
			},
		});
	}
	function closeAjaxPopup() {
		$(".block-layer.ajax").remove();

		if ($(".block-layer").length === 0) {
			$("body").css("overflow", "");
		}

		$(".layer-popup").remove();
	}
	function attachPopupEvents(layerName) {
		if (layerName === "sign-up") {
			$("#member-sign-up").on("click", function() {
				signUp();
			});

			$("#reset").on("click", function() {
				$("#user-id").val("");
				$("#user-password").val("");
				$("#user-password-crm").val("");

				$("#user-id").focus();
			});
		}
		else if (layerName === "sign-in") {
			$("#log-in-btn").on("click", function() {
				signIn();
			});
			$("#sign-up-btn").on("click", function() {
				openAjaxPopup("sign-up");
				hideloginLayer();
			});
		}
		else if (layerName === "member-info") {
			$("#member-info-update").on("click", function() {
				updateMemberInfo();
			});

			$("#reset").on("click", function() {
				$("#id-btn").val("");
				$("#password-btn").val("");
				$("#password-crm-btn").val("");

				$("#id-btn").focus();
			});
		}

		$(".block-layer.ajax, .popup-close, .exit").on("click", function() {
			closeAjaxPopup();
		});
	}

	attachPopupEvents();

	function signUp() {
		var userId = $("#user-id").val();
		var userPw = $("#user-password").val();
		var userPwCfm = $("#user-password-crm").val();

		if (userId === undefined || userId === "") {
			alert("아이디를 입력하세요.");
			$("#user-id").focus();
			return;
		}
		else if (userPw === undefined || userPw === "") {
			alert("비밀번호를 입력하세요.");
			$("#user-password").focus();
			return;
		}
		else if (userPw !== userPwCfm) {
			alert("비밀번호 확인을 동일하게 입력하세요.");
			$("#user-password-crm").focus();
			return;
		}

		$.ajax({
			url: "api/member/signup",
			method: "POST",
			data: {
				userId: userId,
				userPw: userPw,
			},
			success: function(data) {
				if (data.result === "ok") {
					alert(userId + "님 환영합니다.");
					closeAjaxPopup();
				}
				else {
					alert("정상적으로 가입되지 않았습니다.");
				}
			},
			error: function(jqXHR) {
				alert(jqXHR.responseJSON.message);
			},
		});
	}

	function signIn() {
		var userId = $("#id-btn").val();
		var userPw = $("#password-btn").val();

		if (userId === undefined || userId === "") {
			alert("아이디를 입력하세요.");
			$("#user-id").focus();
			return;
		}
		else if (userPw === undefined || userPw === "") {
			alert("비밀번호를 입력하세요.");
			$("#user-pw").focus();
			return;
		}

		$.ajax({
			url: "api/member/signin",
			method: "POST",
			data: {
				userId: userId,
				userPw: userPw,
			},
			success: function(data) {
				if (data.result === "ok") {
					alert(userId + "님 환영합니다.");
					closeAjaxPopup();

					$(".login").hide();
					$("#member-info, #logout").show();
					$("#member-info, #logout").css("display", "inline-block");
				}
				else {
					alert("정상적으로 로그인되지 않았습니다.");
				}
			},
			error: function(jqXHR) {
				alert(jqXHR.responseJSON.message);
			},
		});
	}
	function checkSignedIn() {
		$.ajax({
			url: "api/member/signedin",
			success: function(data) {
				if (data.result === "yes") {
					$(".login").hide();
					$("#member-info").show();
					$("#logout").show();
					$("#member-info, #logout").css("display", "inline-block");
				}
				else {
					$(".login").show();
					$("#member-info").hide();
					$("#logout").hide();
				}
			},
		});
	}
	function updateMemberInfo() {
		var userPw = $("#password-btn").val();
		var userPwCfm = $("#password-crm-btn").val();

		if (userPw === undefined || userPw === "") {
			alert("비밀번호를 입력하세요.");
			$("#password-btn").focus();
			return;
		}
		else if (userPw !== userPwCfm) {
			alert("비밀번호 확인을 동일하게 입력하세요.");
			$("#password-crm-btn").focus();
			return;
		}

		$.ajax({
			url: "api/member/update",
			method: "POST",
			data: {
				userPw: userPw,
			},
			success: function(data) {
				if (data.result === "ok") {
					alert("정상적으로 수정되었습니다.");
					closeAjaxPopup();
				}
				else {
					alert("정상적으로 수정되지 않았습니다.");
				}
			},
			error: function(jqXHR) {
				alert(jqXHR.responseJSON.message);
			},
		});
	}

	$(".login").on("click", function() {
		openAjaxPopup("sign-in");
	});

	$("#member-info").on("click", function() {
		openAjaxPopup("member-info");
	});
	$(".block-layer").on("click", function() {
		closeLayerPopup();
	});
	$("#logout").on("click", function() {
		$.ajax({
			url: "api/member/signout",
			success: function() {
				$(".login").show();
				$("#member-info, #logout").hide();
			},
		});
	});
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
			$(".item-box").css("width", "100%");
			$(".item-box").css("margin", "0% 0% 7% 0%");
		}
		else {
			$(".cart-account").show();
			$(".cart-account-icon").hide();
			$("#icon-bar-nav").hide();
			$(".item-box").css("width", "31%");
			$(".item-box").css("margin", "0% 2% 5% 0%");
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
		$(".block-layer").hide();
		$("body").css("overflow", "");
	};

	togglerHeader();
	handleEvents();
	checkSignedIn();

	return {
		attachEvents: attachEvents,
	};
});
