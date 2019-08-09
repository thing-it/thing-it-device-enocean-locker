const assert = require("assert");
const _ = require("lodash");

describe('Test Server fixture functionality', function () {
  let testDriver;

  before(function () {
    testDriver = require("thing-it-test").createTestDriver({ logLevel: "debug" });

    testDriver.registerDevicePlugin("enocean-locker", __dirname + "/../lockerArray");
    testDriver.registerUnitPlugin(__dirname + "/../default-units/locker");

    testDriver.start({
      configuration: require(__dirname + "/../examples/configuration.js"),
      heartbeat: 10
    });

  });

  describe('Initialization', function () {
    this.timeout(60000);

    it('operational state of device and all actors should be ok', function (done) {
      setTimeout(function () {
        assert.deepEqual(testDriver.lockerArray01.operationalState.status, 'OK', 'device is not started correctly');
        assert.deepEqual(testDriver.lockerArray01.locker01.operationalState.status, 'OK', 'locker actor is not started correctly');        
        done();
      }.bind(this), 2000);
    });  

    it('device should have options', function (done) {
      setTimeout(function () {
        assert.notEqual(testDriver.lockerArray01.configuration.heightUnits, undefined, 'heightUnits not present in configuration of device');
        assert.notEqual(testDriver.lockerArray01.configuration.widthUnits, undefined, 'heightUnits not present in configuration of device');
        done();
      }.bind(this), 2000);
    });  

    it('actor lock should have methods', function (done) {
      setTimeout(function () {
        assert.notEqual(testDriver.lockerArray01.locker01.open, undefined, 'actor lock havent method open');
        assert.notEqual(testDriver.lockerArray01.locker01.close, undefined, 'actor lock havent method close');
        testDriver.lockerArray01.locker01.open();
        assert.deepEqual(testDriver.lockerArray01.locker01.state.locked, false, 'actor lock havent method open');
        testDriver.lockerArray01.locker01.close();
        assert.deepEqual(testDriver.lockerArray01.locker01.state.locked, true, 'actor lock havent method open');
        done();
      }.bind(this), 2000);
    });  
  });

  after(function () {
    testDriver.stop();
  });
});