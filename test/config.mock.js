angular.module('config', [])
    .factory('configReader', function () {
        return jasmine.createSpy('configReader');
    })
    .factory('configWriter', function () {
        return jasmine.createSpy('configWriter');
    });