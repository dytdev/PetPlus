Template.Header.events({
    'click .logout': function(event) {
      event.preventDefault();
      Session.clear('facilityId');
      Session.clearAuth('facilityId');
      Meteor.logout();
      Router.go('/');
    }
});
