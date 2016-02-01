Router.map(function() {
  this.route('Home', {
    path: '/',
  });
  this.route('About', {
    path: '/about',
  });
  this.route('Services', {
    path: '/services',
  });
  this.route('Clients', {
    path: '/clients',
  });
  this.route('contact', {
    path: '/Contact',
  });
  this.route('FacilityRegistration', {
    path: '/Register',
  });
  this.route('FacilityRegistrationStatus', {
    path: '/FacilityRegStatus'
  });
  this.route('AdminRegistration', {
      path: '/AdminRegister',
    });
  this.route('login', {
    path: '/login',
  });
  this.route('userprofile', {
      path: '/profile',
    });
  this.route('AdminHome', {
      path: '/admin/home',
      onBeforeAction: function() {
        if (!Meteor.userId()) {
            return this.render('login');
          } else {
            return this.next();
          }
      }
  });
  this.route('FacilityHome', {
      path: '/facility/home',
      onBeforeAction: function() {
        if (!Meteor.userId()) {
            return this.render('login');
          } else {
            return this.next();
          }
      }
  });
  //Admin Home
  this.route('PendingFacility', {
      path: '/admin/Pending',
      onBeforeAction: function() {
        if (!Meteor.userId()) {
            return this.render('login');
          } else {
            return this.next();
          }
      }
  });
  this.route('ActiveFacility', {
      path: '/admin/Active',
      onBeforeAction: function() {
        if (!Meteor.userId()) {
            return this.render('login');
          } else {
            return this.next();
          }
      }
  });
  this.route('CancelFacility', {
      path: '/admin/Cancel',
      onBeforeAction: function() {
        if (!Meteor.userId()) {
            return this.render('login');
          } else {
            return this.next();
          }
      }
  });
  this.route('NewFacility', {
      path: '/admin/Register',
      onBeforeAction: function() {
        if (!Meteor.userId()) {
            return this.render('login');
          } else {
            return this.next();
          }
      }
  });
  

});