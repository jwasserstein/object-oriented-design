/*

Design an LRU-cache
- key value store
- has max size (configurable)
- uses LRU as eviction policy

Plan
- hash map for underlying key-value mapping
- linked list for tracking access order to determine least recently used element

*/

class LRUCache {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.keys = 0;
    this.map = new Map();
    this.head = null;
    this.tail = null;
  }

  set(key, value) {
    // set key-value pair
    if (!this.map.has(key)) {
      const node = new LLNode(key, value, null, this.head);
      this.map.set(key, node);
      this.keys++;

      // update linked list
      if (this.head) {
        this.head.prev = node;
      }
      this.head = node;
      if (!this.tail) {
        this.tail = node;
      }

      // check number of keys, if > maxSize, remove last element in linked list and delete its key from hash map
      if (this.keys > this.maxSize) {
        this.map.delete(this.tail.key);
        this.tail = this.tail.prev;
        this.tail.next = null;
      }
    } else {
      const node = this.map.get(key);
      node.value = value;
      this.updateRecentlyUsed(key);
    }
  }

  get(key) {
    // get value from key
    const node = this.map.get(key);
    if (!node) {
      return null;
    }

    // update linked list to make that key most recently used
    this.updateRecentlyUsed(key);

    // return value
    return node.value;
  }

  delete(key) {
    // get value from key
    const node = this.map.get(key);
    if (!node) {
      return null;
    }

    // update linked list to make that key most recently used
    this.updateRecentlyUsed(key);
    this.head = this.head.next;
    this.head.prev = null;
    this.map.delete(key);
    return null;
  }

  updateRecentlyUsed(key) {
    const node = this.map.get(key);
    if (this.head === node) {
      return;
    }
    if (this.tail === node) {
      this.tail = node.prev;
    }
    const prev = node.prev;
    const next = node.next;

    if (prev) {
      prev.next = next;
    }
    if (next) {
      next.prev = prev;
    }

    node.prev = null;
    node.next = this.head;
    this.head.prev = node;
    this.head = node;
  }
}

class LLNode {
  constructor(key, value, prev, next) {
    this.key = key;
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}

const cache = new LRUCache(3);
cache.set('a', 5);
cache.set('b', 6);
cache.set('c', 7);
cache.set('d', 8);
cache.get('b');
cache.set('e', 9);
cache.delete('e');
console.log(cache.head);
