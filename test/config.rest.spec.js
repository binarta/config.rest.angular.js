describe('config.rest', function () {

    beforeEach(module('config'));
    beforeEach(module('config.gateways'));

    var configReader, publicConfigReader, configWriter, publicConfigWriter, request, response, value;

    beforeEach(inject(function (_configReader_, _publicConfigReader_, _configWriter_, _publicConfigWriter_) {
        configReader = _configReader_;
        configReader.andReturn({success: function () {}});
        publicConfigReader = _publicConfigReader_;
        configWriter = _configWriter_;
        configWriter.andReturn({success: function () {}});
        publicConfigWriter = _publicConfigWriter_;
        value = undefined;
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
            });

            it('delegates to configReader', function () {
                publicConfigReader(request, response);

                expect(configReader.calls[0].args[0].$scope).toEqual({});
                expect(configReader.calls[0].args[0].key).toEqual('x');
                expect(configReader.calls[0].args[0].scope).toEqual('public');
            });

            it('known values', function () {
                publicConfigReader(request, response);
                configReader.calls[0].args[0].success({value: 'a'});

                expect(value).toEqual('a');
            });

            it('returns a promise', function () {
                publicConfigReader(request, response).success();
            });
        });

        describe('without response', function () {
            beforeEach(function () {
                request = {
                    key: 'x'
                };
            });

            it('delegates to configReader', function () {
                publicConfigReader(request);

                expect(configReader.calls[0].args[0].$scope).toEqual({});
                expect(configReader.calls[0].args[0].key).toEqual('x');
                expect(configReader.calls[0].args[0].scope).toEqual('public');
            });

            it('value is unknown', function () {
                publicConfigReader(request);

                expect(value).toBeUndefined();
            });

            it('returns a promise', function () {
                publicConfigReader(request).success();
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
            });

            it('delegates to configWriter', function () {
                publicConfigWriter(request, response);

                expect(configWriter.calls[0].args[0].$scope).toEqual({});
                expect(configWriter.calls[0].args[0].key).toEqual('x');
                expect(configWriter.calls[0].args[0].value).toEqual('a');
                expect(configWriter.calls[0].args[0].scope).toEqual('public');
            });

            it('write accepted', function () {
                publicConfigWriter(request, response);
                configWriter.calls[0].args[0].success();

                expect(value).toEqual('a');
            });

            it('returns a promise', function () {
                publicConfigWriter(request, response).success();
            });
        });

        describe('without response', function () {
            beforeEach(function () {
                request = {
                    key: 'x',
                    value: 'a'
                };
            });

            it('delegates to configWriter', function () {
                publicConfigWriter(request);

                expect(configWriter.calls[0].args[0].$scope).toEqual({});
                expect(configWriter.calls[0].args[0].key).toEqual('x');
                expect(configWriter.calls[0].args[0].value).toEqual('a');
                expect(configWriter.calls[0].args[0].scope).toEqual('public');
            });

            it('value is unknown', function () {
                publicConfigWriter(request);

                expect(value).toBeUndefined();
            });

            it('returns a promise', function () {
                publicConfigWriter(request).success();
            });
        });
    });
});