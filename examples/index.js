'use strict'

// choose hash function implementation here:

const createHash = require('./sha256')
// const createHash = require('./sha512')
// const createHash = require('./murmur3_native_128_86_le')
// const createHash = require('./murmur3_native_128_64_le')
// - see respective local files for details.
//  have to `npm install murmurhash-native` first for murmur examples.

// now create a PassThrough stream with that
const HashThrough = require('../')
// or `= require('hash-through')`, if it is already installed as npm

const hashThrough = HashThrough({}, createHash)

// now we can pipe through it to some other destination
const fs = require('fs')
const src = fs.createReadStream(__filename)

src.pipe(hashThrough).pipe(process.stdout)

// ...and have the digest when finished
hashThrough.on('finish', () => {
  console.log(hashThrough.digest('hex'))
})
