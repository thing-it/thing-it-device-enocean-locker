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

    it('device lockerArray should have methods', function (done) {
      setTimeout(function () {
        assert.notEqual(testDriver.lockerArray01.open, undefined, 'device lockerArray havent method open');
        assert.notEqual(testDriver.lockerArray01.close, undefined, 'device lockerArray havent method close');       
      }.bind(this), 2000);
    });

    it('actor locker should have methods', function (done) {
      setTimeout(function () {
        assert.notEqual(testDriver.lockerArray01.locker01.open, undefined, 'actor lock havent method open');
        assert.notEqual(testDriver.lockerArray01.locker01.close, undefined, 'actor lock havent method close');
        testDriver.lockerArray01.locker01.open().then(() => {
          assert.deepEqual(testDriver.lockerArray01.locker01.state.status, 'unlocked', 'actors method open should work correct');
          return testDriver.lockerArray01.locker01.close();
        }).then(() => {
          assert.deepEqual(testDriver.lockerArray01.locker01.state.status, 'locked', 'actors method close should work correct');
          done();
        });
      }.bind(this), 2000);
    });

    after(function () {
      testDriver.stop();
    });
  });
});