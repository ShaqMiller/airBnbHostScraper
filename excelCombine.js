import fs from "fs"
import path from "path"
import xlsx from "xlsx"

// Directory containing JSON files
const dirPath = path.join('./data');

// Function to read JSON files and convert them to Excel
const convertJsonToExcel = async () => {
    const files = fs.readdirSync(dirPath);

    // Initialize an array to hold all the data
    const allData = [];

    files.forEach((file) => {
        const filePath = path.join(dirPath, file);

        // Read the JSON file
        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        // Extract data from the JSON structure
        Object.keys(jsonData).forEach(hostId => {
            const hostData = jsonData[hostId];
            const details = hostData.details;
            hostData.vehicles.forEach(vehicle => {
                allData.push({
                    hostId,
                    hostName: details.name,
                    vehicleId: vehicle.id,
                    make: vehicle.make,
                    model: vehicle.model,
                    year: vehicle.year,
                    city: vehicle.location.city,
                    state: vehicle.location.state,
                    avgDailyPrice: vehicle.avgDailyPrice.amount,
                    currency: vehicle.avgDailyPrice.currency
                });
            });
        });
    });

    // Create a new workbook and worksheet
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(allData);

    // Append the worksheet to the workbook
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Write the workbook to a file
    xlsx.writeFile(wb, 'output.xlsx');
};

// Run the conversion
convertJsonToExcel();
