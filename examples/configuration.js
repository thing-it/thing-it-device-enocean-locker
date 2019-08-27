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
            lockerId: 1,
            heightUnits: 1,
            widthUnits: 1
          },          
        },
        {
          id: 'locker02',
          label: 'Locker 02',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            lockerId: 12352,
            heightUnits: 1,
            widthUnits: 2
          },          
        },
        {
          id: 'locker03',
          label: 'Locker 03',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            lockerId: 3,
            heightUnits: 1,
            widthUnits: 1
          },          
        },
        {
          id: 'locker04',
          label: 'Locker 04',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            lockerId: 4,
            heightUnits: 1,
            widthUnits: 1
          },          
        },
        {
          id: 'locker05',
          label: 'Locker 05',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            lockerId: 5,
            heightUnits: 2,
            widthUnits: 1
          },          
        },
        {
          id: 'locker06',
          label: 'Locker 06',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            lockerId: 6,
            heightUnits: 2,
            widthUnits: 2
          },          
        },
        {
          id: 'locker07',
          label: 'Locker 07',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            lockerId: 7,
            heightUnits: 1,
            widthUnits: 1
          },          
        },
        {
          id: 'locker08',
          label: 'Locker 08',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            lockerId: 8,
            heightUnits: 1,
            widthUnits: 1
          },          
        },
        {
          id: 'locker09',
          label: 'Locker 09',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            lockerId: 9,
            heightUnits: 1,
            widthUnits: 1
          },          
        },
        {
          id: 'locker10',
          label: 'Locker 10',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            lockerId: 10,
            heightUnits: 1,
            widthUnits: 1
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
