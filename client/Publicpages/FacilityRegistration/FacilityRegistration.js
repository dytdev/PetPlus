if (Meteor.isClient) {
    Template.FacilityRegistration.events({
    "submit .newFacilityRegistration": function(event, template) {
        event.preventDefault();
        var facilityId;
        var facilityName = event.target.facilityName.value;
        var firstName = event.target.firstName.value;
        var lastName = event.target.lastName.value;
        var Address1 = event.target.Address1.value;
        var Address2 = event.target.Address2.value;
        var Location = event.target.Location.value;
        var City = event.target.City.value;
        var State = event.target.State.value;
        var Zip = event.target.Zip.value;
        var primaryEmail = event.target.primaryEmail.value;
        var secondaryEmail = event.target.secondaryEmail.value;
        var primaryContact = event.target.primaryContact.value;
        var secondaryContact = event.target.secondaryContact.value;
        var mobileContact = event.target.mobileContact.value;
        var whatsappContact = event.target.whatsappContact.value;
        var Services = _.map(template.findAll("input[type=checkbox]:checked"),
                        function(service) {
             return service.defaultValue;
           });

        //Generate unique facilityID
        Meteor.call('createFacilityID', facilityName, firstName, function(error, result) {
            if(error) {
                alert("Some error occured!"+error.reason);
            } else { 
                var userEntries = {'username': result, password: result,
                            profile:{FirstName:firstName, LastName:lastName, status:"Active",
                                    roles:["facilityOwner"]}};
                Accounts.createUser(userEntries, function(err) {
                    if(!err) {
                        Session.set("facilityId", result);
                        Session.set("primaryEmail", primaryEmail);
                        
                        var ServiceArray = [];
                        for(var i=0;i<Services.length;i++) {
                            ServiceArray.push({
                                "serviceID" : Services[i],
                                serviceObjects: {
                                    "sequenceNumber": "SRVSQ0000000001",
                                    "serviceEffectiveDate": Services[i],
                                    "status": "Pending"
                                }
                            });
                        }

                        //insert into FacilityPolicy
                        FacilityPolicy.insert({
                            facilityID: result,
                            status: "Pending",
                            "personalDetails": {
                                    "facilityName": facilityName,
                                    "facilityContactFirstName": firstName,
                                    "facilityContactLastName": lastName,
                                    "primaryContactEmail": primaryEmail,
                                    "seconContactEmail": secondaryEmail,
                                    "primaryContactPhone": primaryContact,
                                    "secondaryContactPhone": secondaryContact,
                                    "primaryMobileNumber": mobileContact,
                                    "primaryWhatsAppNumber": whatsappContact,
                                    "websiteName": "Website Name",
                                    "auditID": "AUD2016010000000001",
                                    "mailingAddress": {
                                        "mailAddressLine1": Address1,                            
                                        "mailAddressLine2": Address2,
                                        "mailLocation": Location,
                                        "mailCity": City,
                                        "mailState": State,
                                        "mailPinCode": Zip
                                    },
                                    "billingAddress": {
                                        "billAddressLine1": Address1,
                                        "billAddressLine2": Address2,
                                        "billLocation": Location,
                                        "billCity": City,
                                        "billState": State,
                                        "billPinCode": Zip
                                    },
                                    "policy": {
                                            "policyNumber": "PL0000000001",
                                             "Term": {
                                                    "termID": "1",
                                                    "termDuration": "",
                                                    "termStartDate": "",
                                                    "termEndDate": "",
                                                    "latestTransactionSeqNr": ""
                                                }
                                        }
                                }
                        });

                        var getID = FacilityPolicy.findOne({facilityID: result});
                        FacilityPolicy.update({ _id: getID._id}, {
                            $set: {
                                    "personalDetails.policy.Term.Services": ServiceArray
                                }}
                        );
                        Router.go("FacilityRegistrationStatus");
                        Meteor.logout();
                    } else {
                        alert("Some Error from FacilityRegistration!" + err.reason);
                        Router.go("FacilityRegistration");
                    }
                }); 
            }
        });

    } 
});
}