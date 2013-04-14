
var events = require('events');
var util = require('util');

// The Thing That Emits Event
var Eventer = function(){
	
  events.EventEmitter.call(this);
  
  this.foo = function(){
    var data = "foo event";
    this.emit('foo', data);
  },

  this.bar = function(){
     this.emit("bar");
  };
};

util.inherits(Eventer, events.EventEmitter);
// The thing that listens to, and handles, those events

var Listener = function(){
  this.barHandler =  function(data){
    console.log("** bar event handled");
    console.log(data);
  },
  this.fooHandler = function(data){
    console.log("** foo event handled");
    console.log(data);
  };

};

// The thing that drives the two.
var eventer = new Eventer();
var listener = new Listener(eventer);
eventer.on('bar', listener.barHandler);
eventer.on('foo', listener.fooHandler);

eventer.foo();
eventer.bar();

