'use strict'

module.exports = {
  metadata: {
    family: 'enocean-locker',
    plugin: 'lockerArray',
    label: 'EnOcean Locker Array',
    tangible: true,
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

    ],
    services: [
      {
        id: "open",
        label: "Open",
      },
      {
        id: "close",
        label: "Close",
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

    this.state = {
      heightUnits: this.configuration.heightUnits,
      widthUnits: this.configuration.widthUnits,
      arrayOfLockers: []
    };

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
  
  LockerArray.prototype.getState = function () {
    this.updateArrayOfLockers();
    return this.state;
  }

  LockerArray.prototype.updateArrayOfLockers = function () {
    let result = [];
    this.actors.forEach(actor => {
      result.push(actor.state);
    });
    
    this.state.arrayOfLockers = result;
  }

  LockerArray.prototype.open = function (param) {
    const lockerId = param.lockerId;
    this.actors.forEach(item => {
      if (item.configuration.lockerId == lockerId) {
        item.open();
      }
    });
    this.publishStateChange();
  }
  
  LockerArray.prototype.close = function (param) {
    const lockerId = param.lockerId;
    this.actors.forEach(item => {
      if (item.configuration.lockerId == lockerId) {
        item.close();
      }
    });
    this.publishStateChange();
  }

}