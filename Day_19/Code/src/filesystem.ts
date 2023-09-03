/**
 *? The node:fs module enables interacting with the file system in a way modeled on standard POSIX functions.

To use the promise-based APIs:

    import * as fs from 'node:fs/promises';
To use the callback and sync APIs:

    import * as fs from 'node:fs';
 */
import * as fs from "node:fs";

fs.readdir("./", (err, files) => {
  if (err) console.log(err);
  else console.log(files);
});
    