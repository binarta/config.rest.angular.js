describe('config.rest', function () {

    beforeEach(module('config'));
    beforeEach(module('config.gateways'));

    describe('publicConfigReader', function () {
        var configReader, publicConfigReader, configWriter, publicConfigWriter, request, response, value;

        beforeEach(inject(function (_configReader_, _publicConfigReader_, _configWriter_, _publicConfigWriter_) {
            configReader = _configReader_;
            publicConfigReader = _publicConfigReader_;
            configWriter = _configWriter_;
            publicConfigWriter = _publicConfigWriter_;
        }));

        describe('reading', function () {
            describe('with response', function () {
                beforeEach(function () {
                    request = {
                        key: 'x'
                    };
                    response = {
                        success: function (it) {
                            value = it
                        }
                    };
                    publicConfigReader(request, response);
                });

                it('delegates to configReader', function () {
                    expect(configReader.calls[0].args[0].$scope).toEqual({});
                    expect(configReader.calls[0].args[0].key).toEqual('x');
                    expect(configReader.calls[0].args[0].scope).toEqual('public');
                });

                it('known values', function () {
                    configReader.calls[0].args[0].success('a');
                    expect(value).toEqual('a');
                });
            });

            describe('without response', function () {
                beforeEach(function () {
                    request = {
                        key: 'x'
                    };

                    publicConfigReader(request);
                });

                it('delegates to configReader', function () {
                    expect(configReader.calls[0].args[0].$scope).toEqual({});
                    expect(configReader.calls[0].args[0].key).toEqual('x');
                    expect(configReader.calls[0].args[0].scope).toEqual('public');
                });
            });
        });


        describe('writing', function () {
            describe('with response', function () {
                beforeEach(function () {
                    request = {
                        key: 'x',
                        value: 'a'
                    };
                    response = {
                        success: function (it) {
                            value = it
                        }
                    };
                    publicConfigWriter(request, response);
                });

                it('delegates to configWriter', function () {
                    expect(configWriter.calls[0].args[0].$scope).toEqual({});
                    expect(configWriter.calls[0].args[0].key).toEqual('x');
                    expect(configWriter.calls[0].args[0].value).toEqual('a');
                    expect(configWriter.calls[0].args[0].scope).toEqual('public');
                });

                it('write accepted', function () {
                    configWriter.calls[0].args[0].success('response');

                    expect(value).toEqual('response');
                });
            });

            describe('without response', function () {
                beforeEach(function () {
                    request = {
                        key: 'x',
                        value: 'a'
                    };

                    publicConfigWriter(request);
                });

                it('delegates to configWriter', function () {
                    expect(configWriter.calls[0].args[0].$scope).toEqual({});
                    expect(configWriter.calls[0].args[0].key).toEqual('x');
                    expect(configWriter.calls[0].args[0].value).toEqual('a');
                    expect(configWriter.calls[0].args[0].scope).toEqual('public');
                });
            });
        });
    });
});