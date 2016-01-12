
var PwmDriver = require('adafruit-i2c-pwm');

var pwm = new PwmDriver(0x40, '/dev/i2c-1');


var servoMin = 150  // Min pulse length out of 4096
var servoMax = 600  // Max pulse length out of 4096

var setServoPulse = function(channel, pulse){
  var pulseLength = 1000000;                // 1,000,000 us per second
  pulseLength /= 60;                       // 60 Hz
  print("%d us per period" % pulseLength);
  pulseLength /= 4096;                    // 12 bits of resolution
  print("%d us per bit" % pulseLength);
  pulse *= 1000;
  pulse /= pulseLength;
  pwm.setPWM(channel, 0, pulse);
}

pwm.setPWMFreq(60) // Set frequency to 60 Hz

setHigh = function() {
  pwm.setPWM(0, 0, servoMax)
  setTimeout( setLow, 1000 )
}

setLow = function(){
  pwm.setPWM(0,0, servoMin);
  setTimeout( setHigh, 1000);
}

servoLoop = function(){
  setLow();
}

servoLoop();
