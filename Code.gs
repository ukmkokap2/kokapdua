const SPREADSHEET_ID = 'GANTI_DENGAN_ID_GOOGLE_SHEET';
const SHEET_NAME = 'Presensi';

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    const sh = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (sh.getLastRow() === 0) sh.appendRow(['Timestamp Server','ID','Nama','Jenis','Tanggal','Waktu','Latitude','Longitude','Akurasi','Jarak','Sumber']);
    sh.appendRow([new Date(),d.id,d.nama,d.jenis,d.tanggal,d.waktu,d.latitude,d.longitude,d.akurasi,d.jarak,'Website']);
    return json({ok:true});
  } catch(err) { return json({ok:false,error:String(err)}); }
}
function doGet(e) {
  try {
    const action = e.parameter.action || '';
    if(action !== 'list') return json({ok:true,message:'Presensi API aktif'});
    const sh = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    const values = sh.getDataRange().getValues();
    if(values.length <= 1) return json([]);
    const rows=values.slice(1).map(r=>({
      serverTimestamp:r[0],id:String(r[1]),nama:String(r[2]),jenis:String(r[3]),
      tanggal:String(r[4]),waktu:String(r[5]),latitude:String(r[6]),longitude:String(r[7]),
      akurasi:String(r[8]),jarak:String(r[9]),source:String(r[10])
    }));
    return json(rows);
  } catch(err) { return json({ok:false,error:String(err)}); }
}
function json(obj){return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);}
function setup(){
  const ss=SpreadsheetApp.openById(SPREADSHEET_ID);
  let sh=ss.getSheetByName(SHEET_NAME)||ss.insertSheet(SHEET_NAME);
  if(sh.getLastRow()===0) sh.appendRow(['Timestamp Server','ID','Nama','Jenis','Tanggal','Waktu','Latitude','Longitude','Akurasi','Jarak','Sumber']);
}
