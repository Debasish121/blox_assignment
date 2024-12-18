## Problem Statement

Write a function to parse any valid json string into a corresponding Object, List, or Map
object. You can use C,C++, Java, Scala, Kotlin, Python, Node. Note that the integer and
floating point should be arbitrary precision.

## Approach Taken

In this solution:

1. I used the built-in `JSON.parse()` function for basic parsing of JSON strings.
2. A custom parser was implemented within the `JSON.parse()` method to handle arbitrary precision for large integers and floating-point numbers.
3. The code also checks for valid JSON syntax, such as missing values, unmatched brackets, and invalid numbers.
4. The function converts the parsed object into a `Map` if the top-level structure is an object, for easy handling of key-value pairs.
5. I used regular expressions to detect and handle large numbers, floating points, and invalid formats in string values.

### Key Features:

- Parses JSON into JavaScript objects, arrays, or maps.
- Handles large integers using `BigInt` for arbitrary precision.
- Supports floating-point numbers.
- Throws descriptive errors for invalid JSON strings.

## How to Run the Solution

### Prerequisites:

- Ensure that **Node.js** is installed on your machine.

### Steps to Run:

1. Go to the folder destination. And run the below command in the terminal

   ```bash
   node solution
   ```
