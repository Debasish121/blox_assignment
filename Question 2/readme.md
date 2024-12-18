## Problem Statement

There is one database. Let’s say it is hosted locally and one of the team members migrates it
to AWS or GCP. How can one confirm that the copied data is the same as the original data ?
What would be the check points ?
Imagine that data from table is of the form : List<Map<String,String>>

# Data Migration Validation - Hashing Approaches

This project implements two approaches for validating the consistency of data after migrating a database from a local environment to a cloud environment (e.g., AWS/GCP). These approaches help ensure that the data in the cloud database is identical to the original data in the local database.

### 1. **Hashing Based Validation**

This approach involves generating a hash of the data (list of key-value pairs) from both the local and cloud databases and comparing the hashes. If the hashes match, the data is considered identical.

#### **Time Complexity**:

- **O(n log n)** due to the sorting step (TreeMap sorts the data).

#### **Space Complexity**:

- **O(n)** due to the space required for storing the sorted data.

#### **Advantages**:

- Simple and effective for small to medium-sized datasets.
- Straightforward implementation of data validation.

#### **Disadvantages**:

- Sorting introduces overhead, making it inefficient for very large datasets.
- Requires additional memory for sorting.

---

### 2. **Hashtable Entry Based Validation**

This approach uses a hash table (or bucketed hash map) to store key-value pairs and compares the entries between the local and cloud datasets. Each dataset is processed and added/removed from the hash table as we process the entries. After processing both datasets, we check if the hash table is empty. If it is, the data matches; otherwise, there are differences.

#### **Time Complexity**:

- **O(n)** for processing the entire dataset, where `n` is the number of key-value pairs. Each key-value pair is hashed and processed individually.

#### **Space Complexity**:

- **O(n)** in the worst-case scenario, when one stream contains keys in a particular order and the other contains the reverse order, causing the hash table to grow temporarily.

#### **Advantages**:

- Efficient for large datasets, as it processes each entry only once.
- No sorting required, so it is more scalable for larger datasets.

#### **Disadvantages**:

- In the worst case, memory usage may increase temporarily if the data streams are not balanced.

---

### Comparison of Both Approaches

| **Approach**                         | **Time Complexity** | **Space Complexity** | **Advantages**                                           | **Disadvantages**                                |
| ------------------------------------ | ------------------- | -------------------- | -------------------------------------------------------- | ------------------------------------------------ |
| **Hashing Based Validation**         | O(n log n)          | O(n)                 | Simple and effective for small to medium-sized datasets. | Overhead for sorting large datasets.             |
| **Hashtable Entry Based Validation** | O(n)                | O(n) (worst case)    | Efficient for large datasets.                            | Memory usage may grow temporarily in some cases. |

## Additional Methods for Data Validation

Besides the two approaches mentioned above, you can also use other validation techniques such as:

- **Reconciliation**: Compute aggregated values (e.g., sums, counts, averages) on both the local and cloud datasets. Compare the results to verify data integrity.
- **Sampling**: Take random subsets of data from both the local and cloud databases and compare them. This method is useful for large datasets where validating the entire dataset is impractical.

---

## Project Setup

### Prerequisites

- Node.js installed on your machine.

### Steps to Run:

1. Clone the repository.
2. Install dependencies (if any) using `npm install` (not needed for this implementation, as it's self-contained).
3. Run the script using Node.js:

```bash
node solution1.js
```
