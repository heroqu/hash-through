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

A short example using ```createHash``` from node's ```crypto``` module:

```javascript
const crypto = require('crypto')

function myCreateHash(){
  return crypto.createHash('sha256')
}

const HashThrough = require('hash-through')
const hash = HashThrough(myCreateHash)
```
Now we can pipe through and get the digest ready by the very time when the streaming is over:

```javascript
const fs = require('fs')
const src = fs.createReadStream(__filename)

src.pipe(hash).pipe(process.stdout)

hash.on('finish', ()=>{
  console.log(hash.digest('hex'))
})
```

Basically, ```createHash``` should be a function that returns a ```hash``` object, which in turn should have two methods: ```hash.update(chunk)``` and ```hash.digest(format)``` with the same meaning as in [crypto module](https://nodejs.org/api/crypto.html#crypto_class_hash)

## More examples

The ```tests``` directory contains some more examples of using different hash functions, including both cryptographic functions from [node crypto module](https://nodejs.org/api/crypto.html#crypto_class_hash) as well as non-cryptographic [MurmurHash3 function](https://www.npmjs.com/package/murmurhash-native).

## The idea

The point of this module is that original stream can really pass through the hashing instance 'untouched', so it is really a PassThrough stream from external point of view. One can insert one or more instances of it at any points of piping sequences without violating the existing streaming at all. Kind of like tapping to the wire or playing man-in-the-middle.
