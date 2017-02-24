/**
 * Created by KalleKauranen on 2017-02-22.
 */

var SignIn = SignIn || {};

SignIn.Session = (function () {
    var instance;

    function init() {
        var idKey = "signup-session";

        return {
            set: function (sessionData) {
                window.localStorage.setItem(idKey, JSON.stringify(sessionData));
            },
            get: function () {
                var result = null;
                try {
                    result = JSON.parse(window.localStorage.getItem(idKey));
                } catch (e){}
                return result;
            }
        };
    }
    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
}());

