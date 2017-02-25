/**
 * Created by KalleKauranen on 2017-02-22.
 */
var SignIn = SignIn || {};

SignIn.SignUpController = function () {
    this.$ErrorCtn = null;
    this.$FirstName = null;
    this.$LastName = null;
    this.$EmailAddress = null;
    this.$Password = null;
    this.$PasswordConfirm = null;
    this.$Submit = null;
};

SignIn.SignUpController.prototype.init = function () {
    this.$ErrorCtn = $("#ctn-err");
    this.$FirstName = $("#txt-first-name");
    this.$LastName = $("#txt-last-name");
    this.$EmailAddress = $("#txt-email-address");
    this.$Password = $("#txt-password");
    this.$PasswordConfirm = $("#txt-password-confirm");
    this.$Submit = $("#submit");
};

SignIn.SignUpController.prototype.onSignUp = function () {
    console.log("Test signup button");
    var firstName = $txtFirstName.val().trim(),
        lastName = $txtLastName.val().trim(),
        emailAddress = $txtEmailAddress.val().trim(),
        password = $txtPassword.val().trim(),
        passwordConfirm = $txtPasswordConfirm.val().trim(),
        invalidInput = false,
        invisibleStyle = "bi-invisible",
        invalidInputStyle = "bi-invalid-input";

    if(SignIn.passwordsMatch(password, passwordConfirm) && SignIn.emailAddressIsValid(emailAddress)){
        console.log("Passwords match and email is valid");
        console.log("Creating new user in database");
        $.ajax({
            type: 'POST',
            url: 'http://138.197.130.124/createNewUser.php',
            data: {
                firstName: firstName,
                lastName: lastName,
                emailAddress: emailAddress,
                password: password
            },
            success: function(){
                console.log("Created new user successfully");
                console.log("testing second user success");
            },
            error: function(xhr, ajaxOptions, thrownError){
                console.log("Error Code: " + xhr.status);
                console.log("Error Response: " + xhr.responseText);
                console.log("Thrown Error: " + thrownError);
                callback(false);
            }
        });
    }
};

SignIn.SignUpController.prototype.resetSignUp = function () {
    $ctnErr.removeClass().addClass(invisibleStyle);
    $txtFirstName.removeClass(invalidInputStyle);
    $txtLastName.removeClass(invalidInputStyle);
    $txtEmailAddress.removeClass(invalidInputStyle);
    $txtPassword.removeClass(invalidInputStyle);
    $txtPasswordConfirm.removeClass(invalidInputStyle);
};

SignIn.SignUpController.prototype.emailAddressIsValid = function (email) {

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);

};

SignIn.SignUpController.prototype.passwordsMatch = function (password, passwordConfirm) {
    return password === passwordConfirm;
};

SignIn.SignUpController.prototype.passwordComplexity = function (password) {
    return true;
};

