// Approach 2 : Hashtable entry based validation

class ParallelHash {
  constructor(bucket) {
    this.bucket = bucket;
    this.table = Array.from({ length: bucket }, () => []);
    this.mutex = new Map(); // Simulating a lock using Map
  }

  hashFunction(key) {
    return key.hashCode() % this.bucket;
  }

  async processStream(data) {
    for (const entry of data) {
      const key = Object.keys(entry)[0];
      const value = entry[key];
      const index = this.hashFunction(key);

      // Using the mutex lock to simulate synchronization
      if (!this.mutex.has(index)) {
        this.mutex.set(index, Promise.resolve());
      }

      const release = await this.mutex.get(index);

      // Process the data
      await release;
      try {
        let found = false;
        for (let i = 0; i < this.table[index].length; i++) {
          const item = this.table[index][i];
          if (item[0] === key && item[1] === value) {
            found = true;
            this.table[index].splice(i, 1);
            break;
          }
        }
        if (!found) {
          this.table[index].push([key, value]);
        }
      } finally {
        this.mutex.set(index, Promise.resolve());
      }
    }
  }

  isHashTableEmpty() {
    return this.table.every((bucket) => bucket.length === 0);
  }

  displayHash() {
    this.table.forEach((bucket, i) => {
      let output = `${i}`;
      bucket.forEach((entry) => {
        output += ` --> (${entry[0]}, ${entry[1]})`;
      });
      console.log(output);
    });
  }
}

// Utility to calculate hashCode like Java's hashCode method for strings
String.prototype.hashCode = function () {
  let hash = 0;
  for (let i = 0; i < this.length; i++) {
    const char = this.charCodeAt(i);
    hash = (hash << 5) - hash + char;
  }
  return hash;
};

// Main code
async function main() {
  const localData = [
    { key1: "value" },
    { key3: "value3" },
    { key2: "value2" },
    { key3: "value4" },
  ];

  const cloudData = [
    { key2: "value2" },
    { key3: "value3" },
    { key3: "value4" },
    { key1: "value1" },
  ];

  const h = new ParallelHash(100);

  // Simulate parallel processing using promises
  const localProcessing = h.processStream(localData);
  const cloudProcessing = h.processStream(cloudData);

  // Wait for both processes to finish
  await Promise.all([localProcessing, cloudProcessing]);

  // Display the hash table and check if it's empty
  h.displayHash();

  // Ensure data match check occurs after the processing is done
  if (h.isHashTableEmpty()) {
    console.log("✅ Data matches between local and cloud databases.");
  } else {
    console.log("❌ Data does not match between local and cloud databases.");
  }
}

main();
