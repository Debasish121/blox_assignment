const crypto = require("crypto");

// Approach 1 : Hash value based validation

// Function to generate hash for a list of objects
function generateHash(data) {
  if (!data || data.length === 0) {
    return ""; // Return an empty string for null or empty data
  }

  const hash = crypto.createHash("sha256"); // Use SHA-256 hashing algorithm

  // Iterate over each object in the array
  for (const obj of data) {
    // Sort keys in the object to ensure consistent hashing
    const sortedKeys = Object.keys(obj).sort();
    for (const key of sortedKeys) {
      // Append the key and value to the hash
      hash.update(key);
      hash.update(obj[key] || ""); // Use an empty string for null/undefined values
    }
  }

  // Return the final hash in hexadecimal format
  return hash.digest("hex");
}

// Main function to test the comparison
function main() {
  // Local data (array of objects)
  const localData = [
    { name: "John", id: "1" },
    { id: "2", name: "Doe" },
  ];

  // Cloud data (same logical data, but potentially different order of keys)
  const cloudData = [
    { id: "1", name: "John" },
    { name: "Doe", id: "2" },
  ];

  // Generate hashes for both datasets
  const hashLocal = generateHash(localData);
  const hashCloud = generateHash(cloudData);

  // Compare the hashes
  if (hashLocal === hashCloud) {
    console.log("✅ Data matches between local and cloud databases.");
  } else {
    console.log("❌ Data does not match between local and cloud databases.");
  }
}

// Run the program
main();
