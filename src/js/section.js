define([
	"common",
], 	function(common) {
	var sectionInfo = {
		"recent_store": {
			items: [],
			itemsPerPage: 3,
		},
		"recent_post": {
			items: [],
			itemsPerPage: 3,
		},
		"store": {
			items: [],
			itemsPerPage: 24,
		},
		"journal": {
			items: [],
			itemsPerPage: 24,
		},
		"publications": {
			items: [],
			itemsPerPage: 24,
		},
		"digital": {
			items: [],
			itemsPerPage: 24,
		},
		"pero": {
			items: [],
			itemsPerPage: 24,
		},
		"products": {
			items: [],
			itemsPerPage: 1,
		},
		"cart": {
			items: [],
		},
	};

	function addSectionItems(sectionCode, page, items) {
		if (items) {
			sectionInfo[sectionCode].items = items;
		}
		else {
			items = sectionInfo[sectionCode].items;
		}
		var itemsPerPage = sectionInfo[sectionCode].itemsPerPage;

		var startIndex = (page - 1) * itemsPerPage;
		var endIndex = Math.min(startIndex + itemsPerPage, items.length);

		var i;
		var item;
		var sectionHTML = "";
		if (sectionCode==="store" || sectionCode==="digital" || sectionCode==="pero" || sectionCode==="recent_store") {
			$(".item-box-layer").empty();
			for (i = startIndex; i < endIndex; i++) {
				item = items[i];

				sectionHTML += "<div class='item-box'>";
				sectionHTML += "<img class='item-img' src='" + item.product_img + "'>";
				sectionHTML += "<ul>";
				sectionHTML += "<li class='item-name'>" + item.product_title + "</li>";
				sectionHTML += "<li>" + item.product_description + "</li>";
				sectionHTML += "<li>" + item.product_price + " USD" + "</li>";
				sectionHTML += "</ul>";
				sectionHTML += "</div>";
			}
			$(".item-box-layer").html(sectionHTML);
			$(".item-box").on("click", function() {
				location.href = "products.html";
			});
		}
		else if (sectionCode === "journal") {
			$(".item-box-layer").empty();
			for (i = startIndex; i < endIndex; i++) {
				item = items[i];

				sectionHTML += "<div class='item-box'>";
				sectionHTML += "<img class='item-img' src='" + item.jou_img + "'>";
				sectionHTML += "<ul>";
				sectionHTML += "<li class='item-name'>" + item.jou_title + "</li>";
				sectionHTML += "<li>" + item.jou_date + "</li>";
				sectionHTML += "</ul>";
				sectionHTML += "</div>";
			}
			$(".item-box-layer").html(sectionHTML);
			$(".item-box").on("click", function() {
				location.href = "journal-list.html";
			});
		}
		else if (sectionCode === "recent_post") {
			$(".item-box-layer01").empty();
			for (i = startIndex; i < endIndex; i++) {
				item = items[i];

				sectionHTML += "<div class='item-box'>";
				sectionHTML += "<img class='item-img' src='" + item.jou_img + "'>";
				sectionHTML += "<ul>";
				sectionHTML += "<li class='item-name'>" + item.jou_title + "</li>";
				sectionHTML += "<li>" + item.jou_date + "</li>";
				sectionHTML += "</ul>";
				sectionHTML += "</div>";
			}
			$(".item-box-layer01").html(sectionHTML);
			$(".item-box-layer01>div").on("click", function() {
				location.href = "journal-list.html";
			});
		}
		else if (sectionCode === "publications") {
			for (i = startIndex; i < endIndex; i++) {
				$(".item-box-layer").empty();
				item = items[i];

				sectionHTML += "<div class='item-box'>";
				sectionHTML += "<img class='item-img' src='" + item.public_img + "'>";
				sectionHTML += "<ul>";
				sectionHTML += "<li class='item-name'>" + item.public_title + "</li>";
				sectionHTML += "<li>" + item.public_description + "</li>";
				sectionHTML += "<li></li>";
				sectionHTML += "</ul>";
				sectionHTML += "</div>";
			}
			$(".item-box-layer").html(sectionHTML);
			$(".item-box").on("click", function() {
				location.href = "public-list.html";
			});
		}
		else if (sectionCode === "products") {
			$(".products-info").empty();
			for (i = startIndex; i < endIndex; i++) {
				item = items[i];
				sectionHTML += "<div id='info-text'>";
				sectionHTML += "<ul>";
				sectionHTML += "<li>" + item.product_title + "</li>";
				sectionHTML += "<li>" + item.product_description + "</li>";
				sectionHTML += "<li><p>We are proud to announce the release of Nourished Journal Edition Four.</p>";
				sectionHTML += "<p>Some features include April Gargiulo from Vintner’s Daughter, Lacy Philips from" +
					" Free + Native shares her manifestation practice, Jacqui Lewis from The Broad Place talks" +
					" travel, recipe for a warming turmeric bread from Sweet Laurel, a beginners guide to Ayurveda," +
					" Zen & Bunni from Zenbunni, understanding your dreams, Kari Jansen from Poppy and Someday, the" +
					" importance of getting grounded and we visit the iconic Californian retreat Esalen.</p>";
				sectionHTML += "<p>Nourished Journal is a bi-annual lifestyle publication. The aim of the Journal" +
					" is not only to create an inspiring publication, but also to be a platform for readers and" +
					" contributors alike to share, learn and connect. Featuring interviews with inspiring " +
					"individuals, uplifting and informative editorial, recipes, travel stories and practical " +
					"information on health and wellbeing. We believe in taking a holistic view on life, which you " +
					"will see reflected throughout the journal.</p>";
				sectionHTML += "<br><p>Product Notes<br>";
				sectionHTML += "Free shipping worldwide from Berlin, Germany.<p></li>";
				sectionHTML += "</ul>";
				sectionHTML += "<div>";
				sectionHTML += "<div id='USD'>" + item.product_price + "</div>";
				sectionHTML += "<div id='qtt'>Quantity</div>";
				sectionHTML += "<input id='product-qtt-btn' type='text' value='1'>";
				sectionHTML += "<input id='product-cartin-btn' type='submit' value='Add To Cart'>";
				sectionHTML += "</div>";
			}
			$(".products-info").html(sectionHTML);
			common.qtt();
		}
		else if (sectionCode === "cart") {
			var cartQuantity = common.getCookie("quantity");
			item = items[1];
			sectionHTML += "<div id='cart-item'>";
			sectionHTML += "<div id='alpha'>" + item.product_title + "</div>";
			sectionHTML += "<div class='num' id='delta'>" + item.product_price + "</div>";
			sectionHTML += "<div class='num' id='gamma'>" + item.product_price + "</div>";
			sectionHTML += "<div class='num' id='beta'><input id='input-qtt-box' type='number' value=''></div>";
			sectionHTML += "</div>";
			$("#cart-contents").append(sectionHTML);
			$("#input-qtt-box").val(cartQuantity);
		}
	}
	function initSection(sectionCode) {
		var url = "";
		url += "/api/main/section/" + sectionCode + "/items";
		$.ajax({
			url: url,
			success: function(items) {
				addSectionItems(sectionCode, 1, items);
				common.attachEvents();
			},
		});
	}
	/* function addCartItems(items) {
		if (items) {
			sectionInfo[sectionCode].items = items;
		}
		else {
			items = sectionInfo[sectionCode].items;
		}
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
	function initCartItems(sectionCode) {
		var url = "";
		url += "/api/main/section/" + sectionCode + "/items";
		$.ajax({
			url: url,
			success: function(items) {
				addCartItems(items);
			},
		});
	}*/

	return {
		initSection: initSection,
	};
});
