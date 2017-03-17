require([
	"section",
], function(section) {
	$(".all").on("click", function() {
		section.initSection("store");
	});

	$(".digital").on("click", function() {
		section.initSection("digital");
	});

	$(".pero").on("click", function() {
		section.initSection("pero");
	});

	$(".item-box").on("click", function() {
		section.productsSection($(this).attr("item-box"));
	});

	section.initSection("store");
});
