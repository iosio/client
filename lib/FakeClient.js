(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', '@iosio/utils/lib/crud_operations'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('@iosio/utils/lib/crud_operations'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.crud_operations);
        global.FakeClient = mod.exports;
    }
})(this, function (exports, _crud_operations) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Client = exports.FakeClient = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var delay = function delay(cb, del) {
        setTimeout(function () {
            cb && cb();
        }, del ? del : 300);
    };

    var delayPromise = function delayPromise(data, del) {
        return new Promise(function (resolve, reject) {
            var stringified = JSON.stringify(data, null, 4);
            delay(function () {
                return resolve({ data: data, stringified: stringified });
            }, del);
        });
    };

    var FakeClient = exports.FakeClient = function FakeClient(api_url, data) {
        var _this = this;

        _classCallCheck(this, FakeClient);

        this.get = function (data_key, del) {
            return delayPromise(_this.data[data_key], del);
        };

        this.post = function (data_key, item, del) {
            _this.data[data_key].push(item);
            return delayPromise(_this.data[data_key], del);
        };

        this.updateByItemById = function (data_key, item, del) {
            console.log('item to be updated on list', item);
            _this.data[data_key] = (0, _crud_operations.updateItemInObjArrById)(_this.data[data_key], 'id', item.id, item);
            return delayPromise(_this.data[data_key], del);
        };

        this.deleteItemById = function (data_key, item_id, del) {
            _this.data[data_key] = (0, _crud_operations.removeItemFromObjArrById)(_this.data[data_key], 'id', item_id);
            return delayPromise(_this.data[data_key], del);
        };

        this.getItemById = function (data_key, item_id, del) {
            var item = (0, _crud_operations.findByIdInObjArr)(_this.data[data_key], 'id', item_id);
            return delayPromise(item, del);
        };

        this.requestAccess = function () {
            var should_not_login = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
            var del = arguments[1];


            var user = should_not_login ? { granted: false } : { user: 'Joe Dirt', granted: true };

            return delayPromise(user, del);
        };

        this.api_url = api_url;
        this.fake_options = fake_options;
        this.data = data ? data : {};
    };

    var Client = exports.Client = function Client(api_url) {
        var _this2 = this;

        _classCallCheck(this, Client);

        this.get = function (params) {
            return fetch('' + _this2.api_url + (params ? params : '')).then(function (response) {
                return _this2.handleError(response);
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
            return fetch('' + _this2.api_url + (url ? url : ''), {
                mode: 'cors',
                method: 'POST',
                body: JSON.stringify(data)
            }).then(function (response) {
                console.log(response);
                return _this2.handleError(response);
            }).then(function (response) {
                return response.json();
            });
        };

        this.api_url = api_url;
    };
});