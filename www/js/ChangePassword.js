/**
 * Created by KalleKauranen on 2017-03-07.
 */

var SignIn = SignIn || {};

SignIn.ChangePassword = function() {
    this.$oldPassword = null;
    this.$newPassword = null;
    this.$newPasswordConfirm = null;
    this.$confirmBtn = null;
    this.$errmsg = null;
};

SignIn.ChangePassword.prototype.init = function() {

  this.$oldPassword = $('#old-password');
  this.$newPassword = $('#new-password');
  this.$newPasswordConfirm = $('#new-password-confirm');
  this.$confirmBtn = $('#submitNewPass');
  this.$errmsg = $('#err-msg');
};

SignIn.ChangePassword.prototype.resetSettings = function(){
    var invisibleStyle = "bi-invisible",
        invalidInputStyle = "bi-invalid-input";

    this.$oldPassword.val("");
    this.$oldPassword.removeClass(invalidInputStyle);
    this.$newPassword.val("");
    this.$newPassword.removeClass(invalidInputStyle);
    this.$newPasswordConfirm.val("");
    this.$newPasswordConfirm.removeClass(invalidInputStyle);
    this.$errmsg.html("");
    this.$errmsg.removeClass().addClass(invisibleStyle);

};

SignIn.ChangePassword.prototype.onPassChange = function () {
    var user = this,
        oldPassword = this.$oldPassword.val().trim(),
        newPassword = this.$newPassword.val().trim(),
        newPasswordConfirm = this.$newPasswordConfirm.val().trim(),
        invalidInput = false,
        invisibleStyle = "bi-invisible",
        invalidInputStyle = "bi-invalid-input";

    user.$errmsg.html("");
    user.$ctnErr.removeClass().addClass(invisibleStyle);
    user.$newPasswordConfirm.removeClass(invalidInputStyle);
    user.$newPassword.removeClass(invalidInputStyle);
    user.$oldPassword.removeClass(invalidInputStyle);

    if (newPassword.length < 8) {
        this.$newPassword.addClass(invalidInputStyle);
        this.$errmsg.html("<p>Password must be at least 8 characters</p>");
        this.$errmsg.addClass("bi-ctn-err").slideDown();
        return;
    }

    if (!/[A-Z]/.test(newPassword)) {
        this.$newPassword.addClass(invalidInputStyle);
        this.$errmsg.html("<p>Password must contain at least one uppercase letter</p>");
        this.$errmsg.addClass("bi-ctn-err").slideDown();
        return;
    }

    if (!/[a-z]/.test(newPassword)) {
        this.$newPassword.addClass(invalidInputStyle);
        this.$errmsg.html("<p>Password must contain at least one lowercase letter</p>");
        this.$errmsg.addClass("bi-ctn-err").slideDown();
        return;
    }

    if (!/\d/.test(newPassword)) {
        this.$newPassword.addClass(invalidInputStyle);
        this.$errmsg.html("<p>Password must contain at least one number</p>");
        this.$errmsg.addClass("bi-ctn-err").slideDown();
        return;
    }

    if(newPassword === newPasswordConfirm){
        console.log(oldPassword);
        console.log(newPassword);
        console.log(newPasswordConfirm);
        $.ajax({
            type: 'POST',
            url: 'http://138.197.130.124/setNewPassword.php',
            data: {
                oldPassword: oldPassword,
                newPassword: newPassword,
                auth: Config.authToken
            },
            success: function(){
                console.log("New password set successfully");
                user.$errmsg.html("<p>New Password Set Successfully</p>");
                user.$errmsg.addClass("bi-ctn-err").slideDown();
                this.ChangePassword().resetSettings();
            },
            error: function(xhr, ajaxOptions, thrownError){
                console.log("Error Code: " + xhr.status);
                console.log("Error Response: " + xhr.responseText);
                console.log("Thrown Error: " + thrownError);
                user.$ctnErr.html("<p>Error</p>");
                user.$ctnErr.addClass("bi-ctn-err").slideDown();
                user.$EmailAddress.addClass(invalidInputStyle);
                user.$newPassword.addClass(invalidInputStyle);
                user.$newPasswordConfirm.addClass(invalidInputStyle);
            }
        });
    }else{
        user.$errmsg.html("<p>Passwords Don't Match</p>");
        user.$errmsg.addClass("bi-ctn-err").slideDown();
        user.$newPassword.addClass(invalidInputStyle);
        user.$newPasswordConfirm.addClass(invalidInputStyle);

    }
};