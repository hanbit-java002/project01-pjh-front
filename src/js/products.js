require([
	"section",
], function(section) {
	/* section.productsSection("products");*/
	/* function geturl() {
		var Code = document.location.href;
		console.log(Element);
		return Element;
	}*/

	function getQuerystring(code) {
		var tempURL = location.search.substring(1);
		var tempUnitURL=tempURL.split("&");
		for (var count=0; count<tempUnitURL.length; count++) {
			var tempValueURL=tempUnitURL[count].split("=");
			if (tempValueURL[0] === code) {
				return tempValueURL[1];
			}
		}
	}

	section.productsSection(getQuerystring("code"));
	console.log(getQuerystring("code"));
});
