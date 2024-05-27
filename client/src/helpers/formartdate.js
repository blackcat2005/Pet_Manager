export function formatDateIsoString(isoString) {
  const date = new Date(isoString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

export function formatDateToYYYYMMDD(ngayThangNam) {
  // Tách ngày, tháng và năm từ chuỗi đầu vào
  var parts = ngayThangNam.split('/');
  
  // Lấy ngày, tháng và năm từ các phần đã tách
  var ngay = parts[0];
  var thang = parts[1];
  var nam = parts[2];
  
  // Định dạng lại chuỗi thành "YYYY-MM-DD"
  var namThangNgay = nam + '-' + thang + '-' + ngay;
  
  // Trả về chuỗi đã được định dạng lại
  return namThangNgay;
}

