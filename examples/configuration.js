module.exports = {
  "label": "Default",
  "id": "default",
  "autoDiscoveryDeviceTypes": [],
  "devices": [
    {
      "plugin": "enocean-locker/lockerArray",
      "actors": [
        {
          id: 'locker01',
          label: 'Locker 01',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            lockerId: 1
          },          
        }
      ],
      "sensors": [],
      "services": [],
      "class": "Device",
      "id": "lockerArray01",
      "label": "Enocean Locker Container 01",
      "logLevel": "debug",
      "configuration": {      
        "heightUnits":2,
        "widthUnits": 30
      }
    }
  ],
  "services": [],
  "eventProcessors": [],
  "groups": [],
  "jobs": [],
  "data": []
};
