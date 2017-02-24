require.config({
    baseUrl: "js",

    paths: {
        "async"         : "/plugins/requirejs/async",

        "jquery"        : "/plugins/jquery/jquery.min",
        "bootstrap"     : "/plugins/bootstrap/js/bootstrap.min",
        "clipboard"     : "/plugins/clipboard/clipboard.min",

        "common"        : "common",
		"section"       : "section",
    },

    shim: {
        "bootstrap": {
            deps: ["jquery"],
        },
    },

    deps: [],
});
