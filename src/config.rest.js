angular.module('config.gateways', ['config'])
    .factory('publicConfigReader', ['configReader', PublicConfigReaderFactory])
    .factory('publicConfigWriter', ['configWriter', PublicConfigWriterFactory]);

function PublicConfigReaderFactory(reader) {
    return function (request, response) {
        return reader({
            $scope:{},
            key:request.key,
            scope:'public',
            success: function (data) {
                if (response && response.success) response.success(data.value);
            }
        });
    };
}

function PublicConfigWriterFactory(writer) {
    return function(request, response) {
        return writer({
            $scope:{},
            key:request.key,
            value: request.value,
            scope: 'public',
            success: function () {
                if (response && response.success) response.success(request.value);
            }
        });
    }
}