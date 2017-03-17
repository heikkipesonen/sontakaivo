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
        console.log(buffer)
        if (this.listener) {            
            let data = [];
            for (let i = 0; i < buffer.length; i++) {
                data.push(String.fromCharCode(buffer[i]));
            }
            
            if (data[0] === 'R' && data[data.length-1] === '\r') {
                let value = parseInt( data.join('').replace('R', '').replace('\r', '') );                
                this.listener({
                    timeStamp: Date.now(),
                    value
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
                }
            }
        });

        self.reading = reading;
        return reading;
    }
}

const open = () => {
    if (!meter.active) {
        meter.active = new Promise((resolve, reject) => {            
            rpio.write(12, rpio.HIGH);
            meter.active = true;
            setTimeout(resolve, 3000);
        });
    }
    
    return meter.active;
}

const close = () => {
    return new Promise((resolve, reject) => {
        rpio.write(12, rpio.LOW);
        meter.active = false;
        setTimeout(resolve, 1);
    });
}

const readValues = (values = 10) => {
    return dataHandler.listen(values);
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
    open,

    close,

    active: false,

    listeners: {},

    _interval: null,
    data: null,

    start () {
        meter.readValue();
        meter._interval = setInterval(meter.readValue, 1000 * 60);
    },

    stop () {
        clearInterval(meter._interval);
    },

    read: readValues,

    readValue () {
        return meter.readAverage().then((data) => {
            meter.close();
            meter.data = data;
            fire('data', meter.data);
            return meter.data;
        });        
    },

    // return single average value from multiple measurements
    readAverage (count = 50) {
        return new Promise((resolve, reject) => {            
            open().then(() => {
                readValues(count).then((response) => {
                    response.splice(Math.floor(response.length/2) - 1, Math.ceil(response.length/2));
                    const average = response.reduce((sum, reading) => sum + reading.value, 0) / response.length;
                    let endTime = response[response.length-1].timeStamp;
                    let startTime = response[0].timeStamp;

                    resolve({
                        startTime,
                        endTime,
                        duration: endTime - startTime,
                        value: Math.ceil(average)
                    });
                });
            });
        });
    },

    on (event, callback) {
        if (!listeners[event]) {
            listeners[event] = [];
        }
        listeners[event].push(callback);
    }
};

module.exports = meter;