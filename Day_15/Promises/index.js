// Simulate an asynchronous API request
function fetchDataFromAPI() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { message: "Data fetched successfully" };
      // Simulate a successful response
      resolve(data);
      // Simulate an error
      // reject(new Error("Failed to fetch data"));
    }, 2000); // Simulate a 2-second delay
  });
}

// Using the Promise
console.log("Fetching data...");

fetchDataFromAPI()
  .then((result) => {
    console.log("Success:", result.message);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  })
  .finally(() => {
    console.log("Cleanup and further processing...");
  });

