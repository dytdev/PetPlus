Template.AdminHome.helpers({
    adminId: function() {
      return Session.get('adminId');
    }
  });
/*
Template.AdminHome.table = function () {
    return FacilityPolicy;
  }

Template.AdminHome.tableSettings = function () {
return {
    rowsPerPage: 10,
    showFilter: true,
    showNavigation: 'auto',
    fields: [
        { key: 'nombre', label: 'Nombre' },
        { key: 'apellido', label: 'Apellido'},
        { key: 'correoe', label: 'E-mail' }
    ],
    useFontAwesome: true
	};
}
*/