'use strict';

describe('Controller: MapCtrl', function() {

  // load the controller's module
  beforeEach(module('nycMapApp'));

  var MapCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    MapCtrl = $controller('MapCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
