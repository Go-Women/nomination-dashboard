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
  let resultCat = [];
  Object.entries(codes).forEach((code, value) => {
    if (code[0] === cat && cat.length == 4) {
      res.category = code[1];
    } else if (cat.length > 4){
      let cats = cat.split(',');
      for (const i in cats) {
        if (code[0] === cats[i]) {
          resultCat.push(code[1]);
        }
      }
      res.category = resultCat.join(",");
    }

    // TODO: fix this once judge subcategory is supported on the frontend
    if (subCat != null || subCat !== undefined) {
      if (code[0] === subCat && subCat.length == 4) {
            res.subcategory = code[1];
      } else if (subCat.length > 4){

      }
    }
  });

  return res;
};

exports.setJSON = (res, name) => {
  res[name] = JSON.parse(res[name])[0];
  return res;
};

exports.formatJudgeInput = (judge) => {
    judge.email = judge.info.email;
    judge.active = judge.info.active;
    judge.info = JSON.stringify([judge.info]);
    return judge;
}

// format data when individually being accessed
exports.formatSingleData = (res, type) => {
  let cat;
  let subCat;
  if (type === 'judge') {
    // Handle Code Formats
    res = this.setJSON(res, 'info');
    cat = res.info.category;
    subCat = res.info.subcategory;
    console.log(subCat);
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