const _ = require('lodash');
const rpio = require('rpio');
const SerialPort = require('serialport');
const options = {
    baudRate: 9600,
    dataBits: 8,
    stopBits: 1,
    parity: 'none'
};

rpio.open('12', rpio.OUTPUT, rpio.LOW);
const port = new SerialPort('/dev/ttyAMA0', options, (error) => console.log(error));


const dataHandler = {
    maxEntries: 100,
    
    listener: null,

    reading: false,

    data (buffer) {
        if (this.listener) {            
            let data = [];
            for (let i = 0; i < buffer.length; i++) {
                data.push(String.fromCharCode(buffer[i]));
            }
            
            if (data[0] === 'R' && data[data.length-1] === '\r') {
                this.listener({
                    timeStamp: Date.now(),
                    value: parseInt( data.join('').replace('R', '').replace('\r', '') ) 
                });
            }
        }
    },

    listen (entries) {
        const self = dataHandler;

        if (self.reading) {
            return self.reading;
        }

        const reading = new Promise((resolve, reject) => {
            const result = [];
            self.listener = function (data) {
                result.push(data);          
                if (result.length >= entries || result.length >= self.maxEntries) {
                    self.listener = null;
                    self.reading = null;
                    resolve(result);
                    console.log('enough results', resolve(result))
                }
            }
        });

        self.reading = reading;
        return reading;
    }
}

const readValue = (values = 10) => {
    return new Promise((resolve, reject) => {
        rpio.write(12, rpio.HIGH);
        return dataHandler.listen(values).then((values) => {
            rpio.write(12, rpio.LOW);
            return values;
        }, () => {});
    });
}

port.on('open', function (evt) {
    port.on('data', (data) => dataHandler.data(data));
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

    read (count) {
        return readValue(count).then((response) => {
            console.log('i has resolved');
            return response;
        })
    },

    on (event, callback) {
        if (!listeners[event]) {
            listeners[event] = [];
        }
        listeners[event].push(callback);
    }
};

module.exports = meter;