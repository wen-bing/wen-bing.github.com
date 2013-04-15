var events = require('events');

function Eventer() {
	this.eventDict={};

	this.on = function(name, callback)
	{
		if(this.eventDict[name])
		{
			var len = this.eventDict[name].length;
			this.eventDict[name][len] = callback;
		}else
		{
			this.eventDict[name] = [];
			this.eventDict[name][0]= callback;
		}
	}

	this.foo = function(data)
	{
		if(data == undefined)
		{
			data ="i'm foo event";
		}
		this.emit('foo', data);
	}

	this.bar = function()
	{
		this.emit('bar');
	}

	this.emit = function(eventName, data)
	{
		var callbackArray = this.eventDict[eventName];
		for(var i = 0; i < callbackArray.length; i++)
		{
			callback = callbackArray[i];
			if(callback){
				callback(data);
			}
		}
	}
};


function fooHandler(data) {
	console.log("foo handler:");
	console.log(data);
}

function barHandler(data)
{
	console.log("bar handler");
	console.log(data);
}

var eventer = new Eventer();
eventer.on('foo', fooHandler);
eventer.on('bar', barHandler);
eventer.on('bar', function(data){
	console.log("I'm another bar handler");
});

eventer.foo();
eventer.bar();