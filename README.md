# hash-through

A PassThrough stream that taps to chunks flow and calculates the digest on the fly.

The hashing function has to be supplied. It should be in a form similar to ```createHash``` from node crypto module.

## Setup

```javascript
npm install hash-through
```

## Dependencies

None.

## Usage

A short example using [createHash](https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm) from node's crypto module:

```javascript
const HashThrough = require('hash-through')
const crypto = require('crypto')

function createHash(){
  // here we are wrapping a particular implementation
  return crypto.createHash('sha256')
}

const ht = HashThrough(createHash)

// Now we can pipe through and get the digest ready
// by the very time the streaming is over:

const fs = require('fs')
const src = fs.createReadStream(__filename)

src.pipe(ht).pipe(process.stdout)

ht.on('finish', ()=>{
  console.log(ht.digest('hex'))
})
```

Basically, ```createHash``` should be a function with no args that returns a ```hash``` object, which in turn should have two methods: ```hash.update(chunk)``` and ```hash.digest(format)``` with the same meaning as in [crypto module](https://nodejs.org/api/crypto.html#crypto_class_hash)

## More examples

The [test directory](https://github.com/heroqu/hash-through/tree/master/test) contains some more examples of how to plug in different hash algorithms, including both cryptographic functions from [node crypto module](https://nodejs.org/api/crypto.html#crypto_class_hash):

- sha256
- sha512
- ripemd160

as well as some non-cryptographic ones:

- [MurmurHash3](https://www.npmjs.com/package/murmurhash-native)
- [xxHash](https://github.com/mscdex/node-xxhash)
- [MetroHash](https://www.npmjs.com/package/metrohash)

## The idea

The point of this module is that original stream can really pass through the hashing instance 'untouched', so it really is a *PassThrough stream* from external point of view. One can insert one or more instances of it at any points of piping chains without violating the existing streaming logics. Kind of like tapping to the wire or playing man-in-the-middle.
