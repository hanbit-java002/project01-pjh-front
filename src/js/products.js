require([
	"cart",
], function(cart) {
	$("#product-cartin-btn").on("click", function() {
		var	CartAccount = $("#product-cartin-btn").val();
		cart.initCartItems("cart", CartAccount);
		location.href = "cart.html";
	});
/* $("#product-cartin-btn").on("click", function() {
	document.cookie = "cartAccount = 1";
	gocart();
});
function gocart() {
	var cookie = document.cookie;
	$("#input-qtt-box").val(cookie);
	location.href = "cart.html";
}*/

	/* document.cookie = "CartAccount=; path=/";
	$("#product-cartin-btn").on("click", function() {
	CartAccount = $("#product-cartin-btn").val();
	section.initSection("cart");
	location.href = "cart.html";
	});

	function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(";");
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == " ") {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
	return "";
	}

	function checkCookie() {
	var user = getCookie("username");
		if (user != "") {
			alert("Welcome again " + user);
		}
		else {
			user = prompt("Please enter your name:", "");
			if (user != "" && user != null) {
				setCookie("username", user, 365);
			}
		}
	}
	checkCookie();*/
});
