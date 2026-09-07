function doGet() {
  return HtmlService.createTemplateFromFile("index")
    .evaluate()
    .addMetaTag("viewport", "width=device-width, initial-scale=1");
}

function saveData(data) {
  let myWorksheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  myWorksheet.appendRow([new Date(), data.wishMessage]);

  var numRows = myWorksheet.getDataRange().getLastRow();
  var count = numRows - 1;

  var msg = {
    message: "\n" + "มีผู้ส่งคำอธิษฐานเข้ามาใหม่เป็นคนที่ " + count,
  };
  //sendLineNotify(msg);

  return data;
}

function sendLineNotify(message) {
  var token = ["IpiRrzFTDM0ishXGef6MJDRSlTCrOWmMWMXUBZhqJcl"]; //insert Notify Token
  var options = {
    method: "post",
    payload: message,
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
}
