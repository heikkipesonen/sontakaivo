const _ = require('lodash');
const SerialPort = require('serialport');
const options = {
    baudRate: 9600,
    dataBits: 8,
    stopBits: 1,
    parity: 'none'
};

const port = new SerialPort('/dev/ttyAMA0', options, (error) => console.log(error));

port.on('open', function (evt) {    
    port.on('data', (data) => {
        let d = [];
        for (var i = 0; i < data.length; i++ ){
            d.push( data[i] );
        }

        meter.value = d;        
        meter.timeStamp = Date.now();        

        _.debounce(() => meter.fire('data'), 500);
    });
});

const listeners = {};
const fire = function (event) {
    if (listeners[event]) {
        listeners[event].forEach((callback) => {
            callback(meter);
        });
    }    
}

const meter = {    
    listeners: {},

    timeStamp: Date.now(),
    value: [],
    
    get distance () {
        return parseInt(meter.value.map((char) => String.fromCharCode(char)).join('').replace('R', '').replace('\r', ''))
    },

    on (event, callback) {
        if (!listeners[event]) {
            listeners[event] = [];
        }
        listeners[event].push(callback);
    }
};

module.exports = meter;