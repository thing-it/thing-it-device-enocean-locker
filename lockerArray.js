'use strict'

module.exports = {
  metadata: {
    family: 'enocean-locker',
    plugin: 'lockerArray',
    label: 'EnOcean Locker Array',
    manufacturer: '',
    discoverable: false,
    actorTypes: [],
    sensorTypes: [],
    configuration: [
      {
        label: "heightUnits",
        id: "Height Units",
        type: {
          id: "integer"
        },
        defaultValue: "0"
      },
      {
        label: "widthUnits",
        id: "Width Units",
        type: {
          id: "integer"
        },
        defaultValue: "0"
      }

    ]
  },
  create: function () {
    return new LockerArray();
  }
};

Promise.prototype.fail = Promise.prototype.catch;

function LockerArray() {

  LockerArray.prototype.start = function () {
    this.operationalState = {
      status: 'PENDING',
      message: 'Waiting for state initialization...'
    };
    this.publishOperationalStateChange();

    this.state = {};

    this.operationalState = {
      status: 'OK',
      message: 'Initialization not implement...'
    };
    this.publishOperationalStateChange();

    return Promise.resolve();
  }

  LockerArray.prototype.stop = function () {
    this.operationalState = {
      status: 'PENDING',
      message: 'Waiting for closing...'
    };
    this.publishOperationalStateChange();

    return Promise.resolve();
  }
}