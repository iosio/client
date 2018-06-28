(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.index = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Client = exports.Client = function Client(api_url) {
        var _this = this;

        _classCallCheck(this, Client);

        this.get = function (params) {
            return fetch('' + _this.api_url + (params ? params : '')).then(function (response) {
                return _this.handleError(response);
            }).then(function (response) {
                return response.json();
            });
        };

        this.handleError = function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        };

        this.post = function (url, data) {
            return fetch('' + _this.api_url + (url ? url : ''), {
                mode: 'cors',
                method: 'POST',
                body: JSON.stringify(data)
            }).then(function (response) {
                console.log(response);
                return _this.handleError(response);
            }).then(function (response) {
                return response.json();
            });
        };

        this.api_url = api_url;
    };
});