function doPost(e) {
  try {
    // Nhận dữ liệu JSON từ Frontend gửi lên
    var data = JSON.parse(e.postData.contents);
    var email = data.email;
    var password = data.password;

    // Mở Google Sheet (Thay ID của Google Sheet của bạn vào đây)
    var sheetId = "1tvNZINJ7pQDx8J2mlBDxdzWB-yP1oGqThhGPOl5ZQvA";
    var sheet = SpreadsheetApp.openById(sheetId).getSheetByName("Users");

    var rows = sheet.getDataRange().getValues();
    var userFound = null;

    // Duyệt qua các dòng để kiểm tra thông tin (Bỏ qua hàng tiêu đề i=0)
    for (var i = 1; i < rows.length; i++) {
      var rowEmail = rows[i][0];
      var rowPassword = rows[i][1];
      var rowName = rows[i][2];

      if (rowEmail === email && rowPassword === password) {
        userFound = {
          email: rowEmail,
          fullName: rowName
        };
        break;
      }
    }

    // Trả về kết quả dưới dạng JSON kèm cấu hình CORS
    var output = {};
    if (userFound) {
      output = { success: true, message: "Đăng nhập thành công!", user: userFound };
    } else {
      output = { success: false, message: "Email hoặc mật khẩu không đúng!" };
    }

    return ContentService.createTextOutput(JSON.stringify(output))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    var errorOutput = { success: false, message: "Lỗi hệ thống: " + error.toString() };
    return ContentService.createTextOutput(JSON.stringify(errorOutput))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Hàm test nhanh trên Apps Script
function doGet(e) {
  return ContentService.createTextOutput("API is running successfully!");
}