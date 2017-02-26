/**
 * Created by KalleKauranen on 2017-02-22.
 */
var SignIn = SignIn || {};

SignIn.SignUpController = function () {
    this.$ctnErr = null;
    this.$FirstName = null;
    this.$LastName = null;
    this.$EmailAddress = null;
    this.$Password = null;
    this.$PasswordConfirm = null;
    this.$Submit = null;
};

SignIn.SignUpController.prototype.init = function () {
    this.$ctnErr = $("#ctn-err");
    this.$FirstName = $("#txt-first-name");
    this.$LastName = $("#txt-last-name");
    this.$EmailAddress = $("#txt-email-address");
    this.$Password = $("#txt-password");
    this.$PasswordConfirm = $("#txt-password-confirm");
    this.$Submit = $("#submit");
};

SignIn.SignUpController.prototype.onSignUp = function () {
    console.log("Test signup button");
    var user = this,
        firstName = this.$FirstName.val().trim(),
        lastName = this.$LastName.val().trim(),
        emailAddress = this.$EmailAddress.val().trim(),
        password = this.$Password.val().trim(),
        passwordConfirm = this.$PasswordConfirm.val().trim(),
        invalidInput = false,
        invisibleStyle = "bi-invisible",
        invalidInputStyle = "bi-invalid-input";

    this.$ctnErr.html("");
    this.$ctnErr.removeClass().addClass(invisibleStyle);
    this.$EmailAddress.removeClass(invalidInputStyle);
    this.$Password.removeClass(invalidInputStyle);
    this.$PasswordConfirm.removeClass(invalidInputStyle);
    this.$FirstName.removeClass(invalidInputStyle);
    this.$LastName.removeClass(invalidInputStyle);


    if (emailAddress.length === 0) {
        this.$EmailAddress.addClass(invalidInputStyle);
        invalidInput = true;
    }

    if (password.length === 0) {
        this.$Password.addClass(invalidInputStyle);
        invalidInput = true;
    }

    if (firstName.length === 0) {
        this.$FirstName.addClass(invalidInputStyle);
        invalidInput = true;
    }

    if (lastName.length === 0) {
        this.$LastName.addClass(invalidInputStyle);
        invalidInput = true;
    }

    if (passwordConfirm.length === 0) {
        this.$PasswordConfirm.addClass(invalidInputStyle);
        invalidInput = true;
    }

    if (invalidInput) {
        this.$ctnErr.html("<p>Please enter all the required fields.</p>");
        this.$ctnErr.addClass("bi-ctn-err").slideDown();
        return;
    }

    if (!this.emailAddressIsValid(emailAddress)) {
        this.$ctnErr.html("<p>Please enter a valid email address.</p>");
        this.$ctnErr.addClass("bi-ctn-err").slideDown();
        this.$EmailAddress.addClass(invalidInputStyle);
        return;
    }

    if (!this.passwordsMatch(password,passwordConfirm)) {
        this.$ctnErr.html("<p>Passwords do not match</p>");
        this.$ctnErr.addClass("bi-ctn-err").slideDown();
        this.$Password.addClass(invalidInputStyle);
        this.$PasswordConfirm.addClass(invalidInputStyle);
    }

    if(this.passwordsMatch(password, passwordConfirm) && this.emailAddressIsValid(emailAddress)){
        console.log("Passwords match and email is valid");
        console.log("Attempting to create new user in database...");
        $.ajax({
            type: 'POST',
            url: 'http://138.197.130.124/createNewUser.php',
            data: {
                firstName: firstName,
                lastName: lastName,
                emailAddress: emailAddress,
                password: password
            },
            success: function(e){
                console.log(e);
                console.log("Created new user successfully");
                $.mobile.navigate("#sign-in", {transition: "slideup"});

            },
            error: function(xhr, ajaxOptions, thrownError){
                console.log("Error Code: " + xhr.status);
                console.log("Error Response: " + xhr.responseText);
                console.log("Thrown Error: " + thrownError);
                user.$ctnErr.html("<p>User already exists</p>");
                user.$ctnErr.addClass("bi-ctn-err").slideDown();
                user.$EmailAddress.addClass(invalidInputStyle);
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

