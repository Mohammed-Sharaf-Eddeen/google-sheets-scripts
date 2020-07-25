function myFunction() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var range = sheet.getRange("a:a");  // This is the column you want to make deletions in, change it to what you want. It must be one column.
  var to_be_deleted_from_range = sheet.getRange("b:c");  // This is the range you want to make deletions using it, change it to what you want.
  var to_replace = ""
  var replace_with = "";
  replaceInSheet(sheet,range, to_replace, replace_with, to_be_deleted_from_range);
}

function replaceInSheet(sheet, range, to_replace, replace_with, to_be_deleted_from_range) {
  //Confirm
  var ui = SpreadsheetApp.getUi(); 
  var spread = SpreadsheetApp.getActiveSpreadsheet();

  var result = ui.alert(
     "Recommendation",
     'It is recommended that you test the script on a small subset in your sheet first \n Are you still sure that you want to proceed with the same selections?',
      ui.ButtonSet.YES_NO);

  // Process the user's response.
  if (result == ui.Button.YES) {
    // User clicked "Yes".
    var address  = range.getValues();
    var should_deleted_values = to_be_deleted_from_range.getValues();

    var oldValue="";
    var newValue="";
    var cellsChanged = 0;

    for (var row=0; row<address.length; row++) {
      for (var item=0; item<should_deleted_values[row].length; item++) {
        oldValue = address[row][0];
        to_replace = should_deleted_values[row][item].toString()
        newValue = address[row][0].toString().replace(to_replace, replace_with);
        if (oldValue!=newValue)
        {
          cellsChanged++;
          address[row][0] = newValue;
        }
      }
    }
    
    range.setValues(address);
    spread.toast(cellsChanged + " cells changed", "STATUS");
  }
  else {
    // User clicked "No" or X in the title bar.
    spread.toast("Okay. No action taken!", "ABANDONED");
  }
}