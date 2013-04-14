var fs = require('fs');
var path = require('path');

console.log('read file in sync:');
filenames = fs.readdirSync(process.cwd());
for (i = 0; i < filenames.length; i++) {
    console.log(filenames[i]);
}

console.log("read dir in async: ");
fs.readdir(".", function (err, filenames) {
    var i;
    for (i = 0; i < filenames.length; i++) {
        console.log(filenames[i]);
    }
});
