'use strict';

module.exports = {
  metadata: {
    plugin: 'locker',
    label: 'bGrid Bacnet Island',
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
    ],
    state: [
      {
        label: "Locked",
        id: "locked",
        type: {
          id: "boolean"
        },
        defaultValue: false
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

    this.state = {};

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
    this.state.locked = false;
    this.publishState();
  }

  Locker.prototype.close = function () {
    this.state.locked = true;
    this.publishState();
  }
}