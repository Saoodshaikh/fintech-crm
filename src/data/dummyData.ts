export const clients = [
  { id: 1, name: "Rahul Sharma", pan: "ABCDE1234F", mobile: "+91 98200 11223", email: "rahul.sharma@gmail.com", risk: "Moderate", aum: 1250000, status: "Active" },
  { id: 2, name: "Priya Mehta", pan: "BCDEF2345G", mobile: "+91 98765 43210", email: "priya.mehta@yahoo.com", risk: "Aggressive", aum: 4820000, status: "Active" },
  { id: 3, name: "Amit Patel", pan: "CDEFG3456H", mobile: "+91 90123 45678", email: "amit.patel@outlook.com", risk: "Conservative", aum: 620000, status: "KYC Pending" },
  { id: 4, name: "Neha Verma", pan: "DEFGH4567I", mobile: "+91 99887 76655", email: "neha.verma@gmail.com", risk: "Moderate", aum: 2100000, status: "Active" },
  { id: 5, name: "Karan Shah", pan: "EFGHI5678J", mobile: "+91 91234 56789", email: "karan.shah@gmail.com", risk: "Aggressive", aum: 5680000, status: "Active" },
  { id: 6, name: "Anjali Gupta", pan: "FGHIJ6789K", mobile: "+91 97654 32109", email: "anjali.gupta@gmail.com", risk: "Moderate", aum: 980000, status: "Active" },
  { id: 7, name: "Vikram Singh", pan: "GHIJK7890L", mobile: "+91 96543 21098", email: "vikram.singh@rediffmail.com", risk: "Conservative", aum: 350000, status: "Inactive" },
  { id: 8, name: "Sneha Iyer", pan: "HIJKL8901M", mobile: "+91 95432 10987", email: "sneha.iyer@gmail.com", risk: "Aggressive", aum: 3220000, status: "KYC Pending" },
  { id: 9, name: "Rohan Kapoor", pan: "IJKLM9012N", mobile: "+91 94321 09876", email: "rohan.kapoor@gmail.com", risk: "Moderate", aum: 1750000, status: "Active" },
  { id: 10, name: "Divya Nair", pan: "JKLMN0123O", mobile: "+91 93210 98765", email: "divya.nair@gmail.com", risk: "Moderate", aum: 890000, status: "Active" },
];

export const funds = [
  { name: "HDFC Flexi Cap Fund", category: "Flexi Cap", amc: "HDFC MF", nav: 1842.35, r1: 18.4, r3: 22.1, r5: 16.8, risk: "High", expense: 1.68 },
  { name: "SBI Bluechip Fund", category: "Large Cap", amc: "SBI MF", nav: 78.92, r1: 14.2, r3: 17.5, r5: 14.9, risk: "Moderate", expense: 1.42 },
  { name: "Axis Small Cap Fund", category: "Small Cap", amc: "Axis MF", nav: 92.14, r1: 26.7, r3: 29.3, r5: 21.4, risk: "Very High", expense: 1.89 },
  { name: "ICICI Pru Value Discovery", category: "Value", amc: "ICICI Pru MF", nav: 412.6, r1: 16.9, r3: 19.8, r5: 15.6, risk: "High", expense: 1.55 },
  { name: "Mirae Asset Emerging Bluechip", category: "Large & Mid Cap", amc: "Mirae Asset MF", nav: 128.47, r1: 19.3, r3: 21.6, r5: 18.2, risk: "High", expense: 1.61 },
  { name: "Parag Parikh Flexi Cap", category: "Flexi Cap", amc: "PPFAS MF", nav: 76.83, r1: 17.8, r3: 20.4, r5: 19.1, risk: "Moderate", expense: 1.31 },
  { name: "Kotak Emerging Equity", category: "Mid Cap", amc: "Kotak MF", nav: 118.29, r1: 21.5, r3: 23.9, r5: 17.7, risk: "High", expense: 1.72 },
  { name: "Nippon India Small Cap", category: "Small Cap", amc: "Nippon India MF", nav: 156.72, r1: 28.1, r3: 30.6, r5: 22.9, risk: "Very High", expense: 1.94 },
  { name: "UTI Nifty Index Fund", category: "Index", amc: "UTI MF", nav: 178.55, r1: 12.6, r3: 15.2, r5: 13.4, risk: "Moderate", expense: 0.21 },
  { name: "Franklin India Bluechip", category: "Large Cap", amc: "Franklin Templeton", nav: 892.14, r1: 13.9, r3: 16.7, r5: 14.1, risk: "Moderate", expense: 1.48 },
  { name: "DSP Tax Saver Fund", category: "ELSS", amc: "DSP MF", nav: 98.36, r1: 16.2, r3: 18.9, r5: 15.8, risk: "High", expense: 1.58 },
  { name: "Quant Active Fund", category: "Multi Cap", amc: "Quant MF", nav: 642.18, r1: 24.3, r3: 27.8, r5: 20.6, risk: "Very High", expense: 1.76 },
];

export const transactions = [
  { client: "Rahul Sharma", fund: "HDFC Flexi Cap Fund", amount: 50000, status: "Success", date: "2026-07-03" },
  { client: "Priya Mehta", fund: "Axis Small Cap Fund", amount: 125000, status: "Success", date: "2026-07-03" },
  { client: "Karan Shah", fund: "Mirae Asset Emerging Bluechip", amount: 200000, status: "Pending", date: "2026-07-02" },
  { client: "Neha Verma", fund: "Parag Parikh Flexi Cap", amount: 75000, status: "Success", date: "2026-07-02" },
  { client: "Sneha Iyer", fund: "Nippon India Small Cap", amount: 90000, status: "Failed", date: "2026-07-01" },
  { client: "Rohan Kapoor", fund: "SBI Bluechip Fund", amount: 60000, status: "Success", date: "2026-07-01" },
];

export const notifications = [
  { type: "Market Update", text: "Sensex closed 1.2% higher today, led by banking stocks.", time: "10:32 AM" },
  { type: "SIP Due", text: "SIP payment of ₹15,000 due tomorrow for Priya Mehta.", time: "9:15 AM" },
  { type: "Pending KYC", text: "Amit Patel's KYC documents are pending verification.", time: "Yesterday" },
  { type: "Birthday Reminder", text: "Today is Karan Shah's birthday — send a greeting.", time: "Yesterday" },
  { type: "Portfolio Alert", text: "Sneha Iyer's portfolio has drifted 8% from target allocation.", time: "2 days ago" },
];

export const growthData = [
  { month: "Jan", value: 1420 }, { month: "Feb", value: 1480 }, { month: "Mar", value: 1510 },
  { month: "Apr", value: 1560 }, { month: "May", value: 1610 }, { month: "Jun", value: 1690 },
  { month: "Jul", value: 1840 },
];

export const allocationData = [
  { name: "Equity", value: 52, color: "#0F4C81" },
  { name: "Debt", value: 24, color: "#2563EB" },
  { name: "Hybrid", value: 14, color: "#16A34A" },
  { name: "ELSS", value: 10, color: "#D97706" },
];

export const amcData = [
  { amc: "HDFC MF", value: 320 }, { amc: "SBI MF", value: 280 }, { amc: "Axis MF", value: 210 },
  { amc: "ICICI Pru", value: 190 }, { amc: "Mirae", value: 150 },
];

export const holdings = [
  { fund: "HDFC Flexi Cap Fund", units: 245.6, investment: 380000, value: 452800 },
  { fund: "Axis Small Cap Fund", units: 512.3, investment: 420000, value: 471900 },
  { fund: "Parag Parikh Flexi Cap", units: 890.1, investment: 610000, value: 683900 },
  { fund: "SBI Bluechip Fund", units: 1240.8, investment: 890000, value: 978800 },
];

export const inr = (n: number) => "₹" + Number(n).toLocaleString("en-IN", { maximumFractionDigits: 0 });
