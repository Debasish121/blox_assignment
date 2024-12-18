// Importing necessary library
const util = require("util");

/**
 * Parses a valid JSON string into its corresponding object, list, or map.
 * Handles integers and floating-point numbers with arbitrary precision using BigInt and Number.
 *
 * @param {string} jsonString - The JSON string to parse.
 * @returns {Object|Array|Map} The parsed JSON object.
 * @throws Will throw an error if the JSON string is invalid.
 */

function parseJsonString(jsonString) {
  if (!jsonString || jsonString.trim() === "") {
    throw new Error("JSON string cannot be empty or null");
  }

  try {
    const parsed = JSON.parse(jsonString, (key, value) => {
      if (typeof value === "string") {
        // Check if it's a valid number (integer or floating point) using regex
        if (/^[-+]?\d+$/.test(value)) {
          // If the number is too large, treat it as BigInt
          const bigIntValue = BigInt(value);
          if (
            bigIntValue > Number.MAX_SAFE_INTEGER ||
            bigIntValue < Number.MIN_SAFE_INTEGER
          ) {
            return bigIntValue; // Return as BigInt for arbitrary precision
          }
          return Number(value); // Otherwise, parse as Number
        }

        // Check for floating-point numbers with arbitrary precision
        if (/^[-+]?\d*\.\d+$/.test(value)) {
          return Number(value);
        }

        // If the string contains non-numeric characters (like "123abc"), throw an error
        if (/[^0-9.\-+eE]/.test(value)) {
          throw new Error(`Invalid number format: ${value}`);
        }
      }
      return value;
    });

    // Convert objects to Map if needed
    if (typeof parsed === "object" && !Array.isArray(parsed)) {
      return new Map(Object.entries(parsed));
    }

    return parsed;
  } catch (error) {
    throw new Error(`Invalid JSON string: ${error.message}`);
  }
}

// ------------------------ Testing Below ---------------

// Testing the function with some valid and invalids JSON strings

// Some Valid JSONs
const testJson1 =
  '{"key1": "12345678901234567890", "key2": "42.5", "key3": [1, 2, 3]}';

const testJson2 =
  '{"key1": {"subKey": "123"}, "key2": ["1", "2", "3"], "key3": {"subObj": {"subKey2": "456"}}}';

const testJson3 = '{"key1": "42.0", "key2": {"subKey": "123.456"}}';

// Invalid JSONs
const invalidJson1 = '{"key1": "value", "key2": }'; // Missing value
const invalidJson2 = '{"key1": "123abc", "key2": "42.5"}'; // Invalid number format
const invalidJson3 = '{"key1": "value", "key2": "42.5",}'; // Extra comma
const invalidJson4 = 'randomText{"key1": "value", "key2": "42.5"}'; // Random non-JSON text at the beginning
const invalidJson5 = '{"key1": "value", "key2": "42.5"'; // Missing closing bracket
const invalidJson6 = "[1, 2, 3,]"; // Extra comma at the end
const invalidJson7 = '{"key": "This is an invalid "quote" in a string"}'; // Unescaped quote inside a string
const invalidJson8 = '{key: "value"}'; // Missing quotes around the key
const invalidJson9 = '{"path": "C:\\Windows\\System32"}'; // Unescaped backslashes
const invalidJson10 = '{ "key1": "value", key2: "42.5" }'; // Missing quotes around key2
const invalidJson11 = '{"key1": "value"} {"key2": "42.5"}'; // Multiple root elements
const invalidJson12 = '{"kêy": "value"}'; // Key contains non-ASCII characters (ê)

try {
  const result = parseJsonString(testJson1);
  console.log(
    "Parsed JSON:",
    util.inspect(result, { showHidden: false, depth: null, colors: true })
  );
} catch (error) {
  console.error(error.message);
}

module.exports = parseJsonString;
