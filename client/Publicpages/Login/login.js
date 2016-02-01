Template.login.events({
    'submit #loginfrm': function(event, template){
        event.preventDefault();
        var Username = event.target.inputUsername.value;
        var password = event.target.inputPassword.value;

        Meteor.loginWithPassword(Username, password, function(error) {
            if(error) {
                Session.setTemp('errorMessage', 'Incorrect username/password! Please contact our administrator!');
                Router.go('login');
            } else {
                var accountStatus = Meteor.user().profile.status;
                var accountRole = Meteor.user().profile.roles;
                if (accountRole == "Admin") {
                    Session.setAuth('adminId', Username);
                    Router.go('AdminHome');
                } else {
                    Session.setAuth('facilityId', Username);
                    Router.go('FacilityHome');
                }
            }
        });
    }
});

Template.login.helpers({
  errorMessage: function() {
    return Session.get('errorMessage');
  }
});
