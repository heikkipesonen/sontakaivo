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
    });
});

const meter = {    
    timeStamp: Date.now(),
    value: [],
    get distance () {
        return meter.value.map((char) => String.fromCharCode(char))
    }
};

module.exports = meter;