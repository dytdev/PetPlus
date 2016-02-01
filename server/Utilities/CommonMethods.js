if (Meteor.isServer) {
	Meteor.methods({
		createFacilityID: function(facilityName, firstName) {
			var facilityId = "P".concat(facilityName.substr(0,3).concat(firstName.substr(0,1)));
			var count = FacilityPolicy.find({facilityID: facilityId}).count();
			if (count === 0) {
				facilityId = "P".concat(facilityName.substr(0,3).concat(firstName.substr(0,1)).concat("1"));
			}
			else { 
				var lastDigit = parseInt(facilityId.substr(facilityId.length - 1)) + 1;
				facilityId = "P".concat(facilityName.substr(0,3).concat(firstName.substr(0,1)).concat(lastDigit));
			}
			return facilityId;
		}
	});
}