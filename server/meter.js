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

    /**
     * called when serialport receives data
     * data is then parsed as numeric values and listener is called with
     * @param {buffer} buffer
     * @returns {void}
     */
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

    /**
     * listen until desired number of events has been received
     * @param {number} count
     * @returns {Promise}
     */
    listen (count) {
        const self = dataHandler;

        if (self.reading) {
            return self.reading;
        }

        const reading = new Promise((resolve, reject) => {
            const result = [];
            self.listener = function (data) {
                result.push(data);
                if (result.length >= count || result.length >= self.maxEntries) {
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

/**
 * intialize ultrasonic sensor, wait for sensor to init
 * @returns {Promise}
 */
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

/**
 * power off the sensor
 * @returns {Promise}
 */
const close = () => {
    return new Promise((resolve, reject) => {
        rpio.write(12, rpio.LOW);
        meter.active = false;
        setTimeout(resolve, 1);
    });
}

/**
 * read values from sensor
 * @param {number} values
 */
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
    // power on for sensor
    open,

    // power off
    close,

    // sensor status
    active: false,

    listeners: {},

    // timer id
    _interval: null,

    // last received data
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
            fire('data', data);
            return meter.data;
        });
    },

    /**
     * read multiple values from sensor and resolve with single
     * average value
     * @param {number} count
     * @returns {Promise}
     */
    readAverage (count = 50) {
        return new Promise((resolve, reject) => {
            open().then(() => {
                readValues(count).then((response) => {
                    // first few values are inaccurate
                    // so half of the results are discarded
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
