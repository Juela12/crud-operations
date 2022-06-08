sap.ui.define([], function () {
	"use strict";
	return {
		mstoTime: function (ms) {
            var date = new Date(ms);
			return date.toTimeString();
		}
	};
});