const _ = require('lodash');
const rpio = require('rpio');
const SerialPort = require('serialport');
const options = {
    baudRate: 4800,
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
            for (let i = 0; i < data.length; i++) {
                data.push(String.fromCharCode(buffer[i]));
            }
            console.log(data)
            this.listener({
                timeStamp: Date.now(),
                value: parseInt( data.join('').replace('R', '').replace('\r', '') ) 
            });
        }
    },

    listen (entries) {
        const self = dataHandler;

        if (self.reading) {
            return self.reading;
        }

        self.reading = new Promise((resolve) => {
            const result = [];
            self.listener = (data) => {
                result.push(data);          
                console.log(result)      
                if (result.length >= entries || result.length >= self.maxEntries) {
                    resolve(result);
                    self.listener = null;
                    self.reading = null;
                }
            }
        });

        return self.reading;
    }
}

const readValue = () => {
    return new Promise((resolve, reject) => {
        rpio.write(12, rpio.HIGH);
        return dataHandler.listen(100).then((values) => {
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

    read: readValue,

    on (event, callback) {
        if (!listeners[event]) {
            listeners[event] = [];
        }
        listeners[event].push(callback);
    }
};

module.exports = meter;