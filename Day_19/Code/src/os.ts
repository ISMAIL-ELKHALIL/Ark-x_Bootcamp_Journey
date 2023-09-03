/**?
 *? The node:os module provides operating system-related utility methods and properties. It can be accessed using:
 *?const os = require('node:os');
 */

import os from "os";

console.log(`Total memory :${os.totalmem()}`);

console.log(`Free memory  :${os.freemem()}`);

console.log(`Temporary files Dir  :${os.tmpdir()}`);

console.log(`System uptime   :${os.uptime() / (60 * 60)}`);
