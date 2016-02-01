Template.FacilityRegistrationStatus.helpers({
  facilityId: function() {
  	return Session.get('facilityId');
  },
  primaryEmail: function() {
  	return Session.get('primaryEmail');
  }
});