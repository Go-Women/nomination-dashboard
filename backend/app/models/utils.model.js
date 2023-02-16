const codes = require("./codes.ts");
// File used to clean and validate the data

exports.formatDate = (res) => {
  // Handle Date Format
  let date = new Date(res.date);

  let day = date.getDate();
  // TODO: fix bug in days that start with 1
  day = day >= 10 ? day : '0' + day;

  let month = date.getMonth();
  // TODO: fix bug in days that start with 1
  month = month >= 10 ? month : '0' + month;

  let year = date.getFullYear();

  res.date = month + '/' + day + '/' + year;

  return res.date;
};

exports.getCategories = (res, cat, subCat) => {
  Object.entries(codes).forEach((code, value) => {
      
    if (code[0] === cat) {
      res.category = code[1];
    }

    if (code[0] === subCat) {
      res.subcategory = code[1];
    }
  });

  return res;
};

// format data when individually being accessed
exports.formatSingleData = (res) => {
  let cat;
  let subCat;
  if (res.type) {
    // Handle Code Formats
    let info = JSON.parse(res.info)[0];
    cat = info.category;
    subCat = info.subcategory;
    res.info = this.getCategories(info, cat, subCat);
  } else {
    res.date = this.formatDate(res);

    // Handle Code Formats
    cat = res.category;
    subCat = res.subcategory;
    res = this.getCategories(res, cat, subCat);
  }
    return res;
};

// format data when all values are being accessed
exports.formatAllData = (res, type) => {
  Object.entries(res).forEach((data, value) => {
    this.formatSingleData(data[1]);
  });
};