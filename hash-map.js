/*

Design a hash map
- key-value mapping
- keys are always strings

Plan
- build hash function to map string to bucket
- hash collision resolution
- array to hold buckets

*/

class HashMap {
  constructor() {
    this.numBuckets = 10;
    this.buckets = new Array(this.numBuckets);
    for (let i = 0; i < this.numBuckets; i++) {
      this.buckets[i] = [];
    }
  }

  set(key, value) {
    // compute hash of key to determine bucket
    const bucketNumber = this.hash(key);

    // linearly search for key in bucket
    const bucket = this.buckets[bucketNumber];
    const keyValuePair = bucket.find(pair => pair[0] === key);

    // update value or create key/value pair
    if (keyValuePair) {
      keyValuePair[1] = value;
    } else {
      bucket.push([key, value]);
    }
  }

  get(key) {
    // compute hash of key to determine bucket
    const bucketNumber = this.hash(key);

    // linearly search for key in bucket
    const bucket = this.buckets[bucketNumber];
    const keyValuePair = bucket.find(pair => pair[0] === key);

    if (!keyValuePair) {
      return null;
    } else {
      return keyValuePair[1];
    }
  }

  hash(key) { // -> bucket number
    let sum = 0;
    for (let i = 0; i < key.length; i++) {
      sum += key.codePointAt(i);
    }
    return sum % this.numBuckets;
  }
}

const map = new HashMap();
for (let i = 0; i < 100; i++) {
  map.set(String(i), i);
}
console.log(map.buckets);
console.log(map.get('20'));
map.set('hello', 5);
map.set('goodbye', 6);
map.set('hello', 7);
console.log(map.get('hello'));
console.log(map.get('goodbye'));
console.log(map.get('something-else'));
