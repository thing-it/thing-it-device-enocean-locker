'use strict';

module.exports = {
  metadata: {
    plugin: 'locker',
    label: 'EnOcean Locker',
    role: 'actor',
    family: 'locker',
    deviceTypes: ['enocean-locker/lockerArray'],
    discoverable: false,
    events: [],
    configuration: [
      {
        label: "lockerId",
        id: "LockerId",
        type: {
          id: "integer"
        }
      },
      {
        label: "Height Units",
        id: "heightUnits",
        type: {
          id: "integer"
        },
        defaultValue: 1
      },
      {
        label: "Width Units",
        id: "widthUnits",
        type: {
          id: "integer"
        },
        defaultValue: 1
      },
      {
        label: "Height Position",
        id: "heightPosition",
        type: {
          id: "integer"
        }
      },
      {
        label: "Whidth Position",
        id: "whidthPosition",
        type: {
          id: "integer"
        }
      }
    ],
    state: [
      {
        label: "Status",
        id: "status",
        type: {
          id: "srting"
        },
        defaultValue: 'open'
      },
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
    return new Locker();
  },
};

Promise.prototype.fail = Promise.prototype.catch;

function Locker() {

  Locker.prototype.start = function () {
    this.operationalState = {
      status: 'PENDING',
      message: 'Waiting for state initialization...'
    };
    this.publishOperationalStateChange();

    //TODO: remove default status after impelmentation of API
    this.state = {
      status: 'unlocked',
      lockerId: this.configuration.lockerId,
      widthUnits: this.configuration.widthUnits,
      heightUnits: this.configuration.heightUnits,
      order: 0
    };
    if (this.configuration.whidthPosition && this.configuration.heightPosition) {
      this.state.order = this.calculateOrder(
        this.configuration.heightPosition ? this.configuration.heightPosition : 0,
        this.configuration.whidthPosition ? this.configuration.whidthPosition : 0
      );
    }

    this.operationalState = {
      status: 'OK',
      message: 'Initialization not implement...'
    };
    this.publishOperationalStateChange();
    return Promise.resolve();
  }

  Locker.prototype.setState = function (state) {
    if (_.isObjectLike(state)) {
      this.state = _.cloneDeep(state);
      this.publishStateChange();
    } else {
      this.state = {}
    }
  }

  Locker.prototype.getState = function () {
    return this.state;
  }

  Locker.prototype.open = function () {
    return new Promise((resolve) => {
      this.state.status = 'pending';
      this.publishState();
      resolve();
    }).then(() => new Promise((resolve) => setTimeout(resolve, 2000))) //instead of api call
      .then(() => {
        this.state.status = 'unlocked';
        this.publishState();
      }).then(() => {
        this.device.updateArrayOfLockers();
        this.device.publishState();
      });
  }

  Locker.prototype.close = function () {
    return new Promise((resolve) => {
      this.state.status = 'pending';
      this.publishState();
      this.device.updateArrayOfLockers();
      this.device.publishState();
      resolve();
    }).then(() => new Promise((resolve) => setTimeout(resolve, 2000))) //instead of api call
      .then(() => {
        this.state.status = 'locked';
        this.publishState();
      }).then(() => {
        this.device.updateArrayOfLockers();
        this.device.publishState();
      });
  }

  Locker.prototype.calculateOrder = function (heightPosition, whidthPosition) {
    const widthRate = Math.pow(10, this.device.configuration.widthUnits.toString().length + 1);
    const heightRate = Math.pow(10, this.device.configuration.heightUnits.toString().length + 1);
    return (heightPosition + heightRate) * widthRate + whidthPosition
  }
}