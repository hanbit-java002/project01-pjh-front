define([
	"bootstrap",
], function() {
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

		$("#sign-box").remove();
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
			$("#hp-member-sign-in").on("click", function() {
				signIn();
			});
		}
		else if (layerName === "member-info") {
			$("#hp-member-info-update").on("click", function() {
				updateMemberInfo();
			});

			$(".hp-reset").on("click", function() {
				$("#hp-user-pw").val("");
				$("#hp-user-pw-cfm").val("");

				$("#hp-user-pw").focus();
			});
		}

		$(".block-layer.ajax, .sign-exit").on("click", function() {
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
			url: global.root + "/api2/member/signup",
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
		var userId = $("#user-id").val();
		var userPw = $("#user-password").val();

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
			url: global.root + "/api2/member/signin",
			method: "POST",
			data: {
				userId: userId,
				userPw: userPw,
			},
			success: function(data) {
				if (data.result === "ok") {
					alert(userId + "님 환영합니다.");
					closeAjaxPopup();

					$(".hp-sign-up").hide();
					$(".hp-sign-in").hide();
					$(".hp-member-info").show();
					$(".hp-sign-out").show();
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

	function updateMemberInfo() {
		var userPw = $("#hp-user-pw").val();
		var userPwCfm = $("#hp-user-pw-cfm").val();

		if (userPw === undefined || userPw === "") {
			alert("비밀번호를 입력하세요.");
			$("#hp-user-pw").focus();
			return;
		}
		else if (userPw !== userPwCfm) {
			alert("비밀번호 확인을 동일하게 입력하세요.");
			$("#hp-user-pw-cfm").focus();
			return;
		}

		$.ajax({
			url: global.root + "/api2/member/update",
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

	$("#sign-up-btn").on("click", function() {
		openAjaxPopup("sign-up");
		hideloginLayer();
	});
	$(".block-layer").on("click", function() {
		closeLayerPopup();
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
