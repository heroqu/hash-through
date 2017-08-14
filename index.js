'use strict'

const { Transform } = require('stream')
const setImmediate = (1, eval)('this').setImmediate
  || function (fn) { setTimeout(fn, 0) }

/**
* Effectively a PassThrough stream that taps to chunks flow
* and accumulating the hash
*/
function HashThrough (opts, createHash) {
  const hashThrough = new Transform(opts)

  const hash = createHash()

  hashThrough._transform = function (chunk, encoding, cb) {
    setImmediate(_ => {
      hash.update(chunk)
      cb(null, chunk)
    })
  }

  // bind the digest function to hash object
  hashThrough.digest = format => hash.digest(format)

  return hashThrough
}

module.exports = HashThrough
