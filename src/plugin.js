const through = require('through2');
const path = require('path');
const fs = require('fs');
const Concat = require('concat-with-sourcemaps');

module.exports = function(packages, targetName) {
   let targetFile;
   var contents2write = [];

   function bufferContents(file, enc, cb) {
      var fname = file.path.replace(file.base, '');
      if (fname[0] === "/") {
         fname = fname.slice(1)
      }
      for (let i = 0; i < packages.length; i++) {
         let name = packages[i];
         if (fname.indexOf(name) === 0) {
            contents2write.push(`require("./${fname}");`);
         }
      }
      fname === targetName ? targetFile = file : this.push(file);
      cb()
   }

   function endStream(cb) {
      if (targetFile) {
         let concat = new Concat(true, '', '\n');
         concat.add(null, contents2write.join('\n'));
         concat.add(targetFile.path, targetFile.contents, targetFile.sourceMap);
         targetFile.contents = concat.content;
         this.push(targetFile);
      }
      cb();
   }
   return through.obj(bufferContents, endStream);
}
