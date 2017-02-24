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
				sectionHTML += "<li>" + item.product_price + "</li>";
				sectionHTML += "</ul>";
				sectionHTML += "</div>";
			}
			$(".item-box-layer").html(sectionHTML);
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

	return {
		initSection: initSection,
	};
});
