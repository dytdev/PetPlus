if (Meteor.isClient) {
    Template.AdminRegistration.events({
        'submit .newAdminRegistration': function(event, template) {
            event.preventDefault();
            var firstName = event.target.firstName.value;
            var lastName = event.target.lastName.value;
            var Address1 = event.target.Address1.value;
            var Address2 = event.target.Address2.value;
            var City = event.target.City.value;
            var State = event.target.State.value;
            var Zip = event.target.Zip.value;
            var primaryEmail = event.target.primaryEmail.value;
            var secondaryEmail = event.target.secondaryEmail.value;
            var primaryContact = event.target.primaryContact.value;
            var secondaryContact = event.target.secondaryContact.value;
            var mobileContact = event.target.mobileContact.value;
            var whatsappContact = event.target.whatsappContact.value;

            //Generate unique adminID
            var adminId = "P".concat(firstName.substr(0,2)).concat(lastName.substr(0,2));
           
            //insert into adminRegistration
            AdminRegistration.insert({
                adminID: adminId,
                status: "Pending",
                "personalDetails": {
                        "adminFirstName": firstName,
                        "adminLastName": lastName,
                        "adminPrimaryEmail": primaryEmail,
                        "adminSecondaryEmail": secondaryEmail,
                        "adminPrimaryContact": primaryContact,
                        "adminSecondaryContact": secondaryContact,
                        "adminMobileContact": mobileContact,
                        "adminWhatsAppContact": whatsappContact,
                        "auditID": "AUD2016010000000001",
                        "mailingAddress": {
                            "mailAddressLine1": Address1,                            
                            "mailAddressLine2": Address2,
                            "mailCity": City,
                            "mailState": State,
                            "mailPinCode": Zip
                        },
                        "billingAddress": {
                            "billAddressLine1": Address1,
                            "billAddressLine2": Address2,
                            "billCity": City,
                            "billState": State,
                            "billPinCode": Zip
                        }
                    }
            });

            var userEntries = {'username': adminId, password:adminId,
                                profile:{FirstName:firstName, LastName:lastName, status:"Active",
                                        roles:['Admin']}};
            Accounts.createUser(userEntries, function(err) {
                if(!err) {
                    Session.setAuth('adminId', adminId);
                    Router.go('AdminHome');
                } else {
                    alert('Some Error from Admin!' + err.reason);
                }
            });

        }
    });
}