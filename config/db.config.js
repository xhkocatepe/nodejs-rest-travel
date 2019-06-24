/** Getir Database Connection Information */
const server = 'assignmentcluster-doq69.mongodb.net';
const db = 'case';
const user = 'user7640';
const password = 'sGrg6H1zITxSHnDs';

const sUrl = `mongodb+srv://${user}:${password}@${server}/${db}`;
const oDBInfo = { url: sUrl };
 
module.exports = oDBInfo;