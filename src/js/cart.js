define([
	"common",
], function() {
	var sectionInfo = {
		"cart": {
			items: [],
		},
	};
	function addCartItems(sectionCode, items, CartAccount) {
		sectionInfo[sectionCode].items = items;
		var sectionHTML = "";
		sectionHTML += "<div id='cart-item'>";
		sectionHTML += "<div id='alpha'>" + item.product_title + "</div>";
		sectionHTML += "<div class='num' id='delta'>" + item.product_price + "</div>";
		sectionHTML += "<div class='num' id='gamma'>00</div>";
		sectionHTML += "<div class='num' id='beta'><input id='input-qtt-box' type='number' value=''></div>";
		sectionHTML += "</div>";
		document.getElementById("#input-qtt-box").value = CartAccount;
		$("#cart-contents").append(sectionHTML);
	}

	function initCartItems(sectionCode, CartAccount) {
		var url = "";
		url += "/api/main/section/" + sectionCode + "/items";
		$.ajax({
			url: url,
			success: function(items) {
				addCartItems(items, CartAccount);
			},
		});
	}
	initCartItems();
	return {
		initCartItems: initCartItems,
	};
});
