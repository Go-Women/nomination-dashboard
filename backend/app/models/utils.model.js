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

exports.setJSON = (res, name) => {
  res[name] = JSON.parse(res[name])[0];
  return res;
};

// format data when individually being accessed
exports.formatSingleData = (res, type) => {
  let cat;
  let subCat;
  if (type === 'judge') {
    // Handle Code Formats
    res = this.setJSON(res, 'info');
    cat = res.info.category;
    subCat = res.info.subcategory;
    res.info = this.getCategories(res.info, cat, subCat);
  } else if (type === 'nominee') {
    // Handle Code Formats
    res = this.setJSON(res, 'nominations');

    cat = res.category;
    subCat = res.subcategory;
    if (subCat == null) {
      subCat = res.subcategoryOther;
    }
    res = this.getCategories(res, cat, subCat);
  } else {
    res.date = this.formatDate(res);

    // Handle Code Formats
    cat = res.category;
    subCat = res.subcategory;
    if (subCat == null) {
      subCat = res.subcategoryOther;
    }
    res = this.getCategories(res, cat, subCat);
  }
    return res;
};

// format data when all values are being accessed
exports.formatAllData = (res, type) => {
  Object.entries(res).forEach((data, value) => {
    this.formatSingleData(data[1], type);
  });
};