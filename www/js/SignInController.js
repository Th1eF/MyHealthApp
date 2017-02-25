/**
 * Created by KalleKauranen on 2017-02-22.
 */

var SignIn = SignIn || {};

SignIn.SignInController = function () {
    this.$signInPage = null;
    this.$btnSubmit = null;
    this.$txtEmailAddress = null;
    this.$txtPassword = null;
    this.$keepSignedIn = null;
    this.$ctnErr = null;
    this.mainMenuPageId = null;
};

SignIn.SignInController.prototype.init = function () {
    this.$signInPage = $("#sign-in");
    this.mainMenuPageId = "#mainPage";
    this.$btnSubmit = $("#submitButton", this.$signInPage);
    this.$ctnErr = $("#errCtn", this.$signInPage);
    this.$txtEmailAddress = $("#emailAddress", this.$signInPage);
    this.$txtPassword = $("#passwordTxt", this.$signInPage);
    this.$keepSignedIn = $("#signed-in", this.$signInPage);

};

SignIn.SignInController.prototype.emailAddressIsValid = function (email) {

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);

};

SignIn.SignInController.prototype.resetSignIn = function () {
    var invisibleStyle = "bi-invisible",
        invalidInputStyle = "bi-invalid-input";

    this.$ctnErr.html("");
    this.$ctnErr.removeClass().addClass(invisibleStyle);
    this.$txtEmailAddress.removeClass(invalidInputStyle);
    this.$txtPassword.removeClass(invalidInputStyle);
    this.$txtEmailAddress.val("");
    this.$txtPassword.val("");
    this.$keepSignedIn.prop("checked", false);
};

SignIn.SignInController.prototype.onSignIn = function () {

    var user = this,
        emailAddress = me.$txtEmailAddress.val().trim(),
        password = me.$txtPassword.val().trim(),
        invalidInput = false,
        invisibleStyle = "bi-invisible",
        invalidInputStyle = "bi-invalid-input";

    user.$ctnErr.removeClass().addClass(invisibleStyle);
    user.$txtEmailAddress.removeClass(invalidInputStyle);
    user.$txtPassword.removeClass(invalidInputStyle);

    if (emailAddress.length === 0) {
        user.$txtEmailAddress.addClass(invalidInputStyle);
        invalidInput = true;
    }

    if (password.length === 0) {
        user.$txtPassword.addClass(invalidInputStyle);
        invalidInput = true;
    }

    if (invalidInput) {
        user.$ctnErr.html("<p>Please enter all the required fields.</p>");
        user.$ctnErr.addClass("bi-ctn-err").slideDown();
        return;
    }

    if (!user.emailAddressIsValid(emailAddress)) {
        user.$ctnErr.html("<p>Please enter a valid email address.</p>");
        user.$ctnErr.addClass("bi-ctn-err").slideDown();
        user.$txtEmailAddress.addClass(invalidInputStyle);
        return;
    }

    $.mobile.loading("show");
};