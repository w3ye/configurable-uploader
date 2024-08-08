const fs = require("fs");
const axios = require("axios");
const Papa = require("papaparse");

const filePath = "";
const token = "";
const recipeKey = "";

// url to post the configurables
const url = "";

// Function to read a file synchronously and parse it as CSV
const readCsvFileSync = async () => {
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const parsedData = Papa.parse(fileContent, {
      header: true,
      dynamicTyping: true,
    });

    for await (const row of parsedData.data) {
      await axios.post(url, [JSON.parse(row.Json)], {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("post for", JSON.parse(row.Json).key);
    }

    return parsedData.data;
  } catch (err) {
    console.error("Error reading the file:", err);
    return null;
  }
};
const main = async () => {
  await readCsvFileSync();
};

main();
