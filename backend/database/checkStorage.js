// import mongoose from "mongoose";
// import nodemailer from "nodemailer";
// import { jsPDF } from "jspdf"; // Import jsPDF
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from 'url'; // To fix __dirname issue

// // Fix __dirname for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Email configuration using Nodemailer
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'teamdevelopers450@gmail.com',
//         pass: 'gadr lwzd cxwp odgc', // Use environment variables for security
//     }
// });

// // Function to generate PDF using jsPDF
// async function generatePDF(data, filePath) {
//     const doc = new jsPDF();

//     // Add title and content to the PDF
//     doc.setFontSize(18);
//     doc.text("Database Collections Backup", 10, 10);

//     doc.setFontSize(12);
//     doc.text("Incomes Collection Data:", 10, 30);
//     doc.setFontSize(10);
//     doc.text(JSON.stringify(data.incomes, null, 2), 10, 40);

//     doc.addPage(); // Add a new page for expenses
//     doc.setFontSize(12);
//     doc.text("Expenses Collection Data:", 10, 10);
//     doc.setFontSize(10);
//     doc.text(JSON.stringify(data.expenses, null, 2), 10, 20);

//     // Save the PDF to the file system
//     return new Promise((resolve, reject) => {
//         doc.save(filePath, (error) => {
//             if (error) reject(error);
//             else resolve();
//         });
//     });
// }

// // Function to send email with the PDF attached
// async function sendEmailWithPDF(data) {
//     const pdfPath = path.join(__dirname, 'Database_Backup.pdf'); // Now __dirname works

//     try {
//         await generatePDF(data, pdfPath);

//         const mailOptions = {
//             from: 'teamdevelopers450@gmail.com',
//             to: 'sinanmhd5817@gmail.com',
//             subject: 'Year-End Database Backup',
//             html: `
//                 <p>Dear Team,</p>
//                 <p>As part of our year-end process, please find attached the backup of our database collections.</p>
//                 <p>This email includes the backup data from the 'Incomes' and 'Expenses' collections.</p>
//                 <p>If you have any questions, feel free to reach out.</p>
//                 <p>Best regards,<br />Your Team</p>
//             `,
//             attachments: [
//                 {
//                     filename: 'Database_Backup.pdf',
//                     path: pdfPath, // Attach the generated PDF
//                     contentType: 'application/pdf'
//                 }
//             ]
//         };

//         // Send the email with the attachment
//         await transporter.sendMail(mailOptions);
//         console.log('Email with PDF attachment sent successfully');

//         // Optionally delete the PDF file after sending the email
//         fs.unlinkSync(pdfPath);

//     } catch (error) {
//         console.error(`Error sending email: ${error.message}`);
//     }
// }

// // Function to fetch the collection data
// async function getCollectionData() {
//     try {
//         const incomes = await mongoose.connection.db.collection('incomes').find({}).toArray();
//         const expenses = await mongoose.connection.db.collection('expenses').find({}).toArray();

//         return { incomes, expenses };
//     } catch (error) {
//         console.error(`Error fetching collection data: ${error.message}`);
//         return null;
//     }
// }

// // Monitor database size and trigger email with PDF
// export default async function monitorDatabaseSize() {
//     console.log("Monitor database size called");

//     try {
//         const stats = await mongoose.connection.db.stats();
//         const dbSizeInMB = stats.dataSize / (1024 * 1024); // Convert to MB

//         console.log(`Current database size: ${dbSizeInMB.toFixed(2)} MB`);

//         if (dbSizeInMB < 500) {
//             console.log("Database size exceeds 500 MB, preparing to send email and clear collections...");

//             // Fetch the collection data
//             const data = await getCollectionData();
            
//             if (data) {
//                 // Send email with the PDF attached
//                 await sendEmailWithPDF(data);
//             }

//             // Clear the collections after sending the email
//             await clearCollections();
//         }
//     } catch (error) {
//         console.error(`Error getting database stats: ${error.message}`);
//     }
// }

// async function clearCollections() {
//     try {
//         await mongoose.connection.db.collection('incomes').deleteMany({});
//         console.log(`Cleared Income collection`);

//         await mongoose.connection.db.collection('expenses').deleteMany({});
//         console.log(`Cleared Expense collection`);
//     } catch (error) {
//         console.error(`Error clearing collections: ${error.message}`);
//     }
// }
