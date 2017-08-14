# hash-through

A PassThrough stream that taps to chunks flow and calculates the digest on the fly.

The hashing function has to be supplied. It should be in a form similar to createHash from node crypto module.

See the short example below and some more, including using a non-cryptographic murmur hash function in examples dir.

## Setup

```
npm install hash-through
```

## Usage

```
// let's choose the specific implementation of createHash
// that we are going to use:

const crypto = require('crypto')
function myCreateHash(){
  return crypto.createHash('sha256')
}

// now create a PassThrough stream with that

const HashThrough = require('hash-through')
const hashThrough = HashThrough(myCreateHash)

// now we can pipe through

const fs = require('fs')
const src = fs.createReadStream(__filename)

src.pipe(hashThrough).pipe(process.stdout)

// ...and get the digest when the streaming is over

hashThrough.on('finish', ()=>{
  console.log(hashThrough.digest('hex'))
})
```
