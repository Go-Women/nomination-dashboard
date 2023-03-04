const codes = require("./codes.js");
// File used to clean and validate the data

exports.formatDate = (res) => {
  // Handle Date Format
  let date = new Date(res.date);

  let day = date.getDate();
  day = day >= 10 ? day : '0' + day;

  let month = date.getUTCMonth() + 1;
  // TODO: fix bug in days that start with 1
  month = month >= 10 ? month : '0' + month;

  let year = date.getFullYear();

  res.date = month + '/' + day + '/' + year;

  return res.date;
};

exports.getCategories = (res, cat, subCat) => {
  let resultCat = [];
  let resultsubCat = [];
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
        let cats = subCat.split(',');
        for (const i in cats) {
          if (code[0] === cats[i]) {
            resultsubCat.push(code[1]);
          }
        }
        res.subcategory = resultsubCat.join(",");
        }
    }
  });

  return res;
};

exports.setJSON = (res, name) => {
  res[name] = JSON.parse(res[name])[0];
  return res;
};

exports.getCodes = (res) => {
  // TODO: this will turn a category or subcategory when submitted into a their corresponding code
  let resultCat = [];
  let resultsubCat = [];
  console.log(res);
  Object.entries(codes).forEach((code, value) => {
    // check if the category is other
    if (res.category.includes('Other')) {
        //  TODO: handle this case
    } else {
      if (res.category == code[1])
        res.category = code[0];

      if (res.subcategory == code[1])
        res.subcategory = code[0];
    }
    // if (code[0] === cat && cat.length == 4) {
    //   res.category = code[1];
    // } else if (cat.length > 4){
    //   let cats = cat.split(',');
    //   for (const i in cats) {
    //     if (code[0] === cats[i]) {
    //       resultCat.push(code[1]);
    //     }
    //   }
    //   res.category = resultCat.join(",");
    // }

    // // TODO: fix this once judge subcategory is supported on the frontend
    // if (subCat != null || subCat !== undefined) {
    //   if (code[0] === subCat && subCat.length == 4) {
    //         res.subcategory = code[1];
    //   } else if (subCat.length > 4){
    //     let cats = subCat.split(',');
    //     for (const i in cats) {
    //       if (code[0] === cats[i]) {
    //         resultsubCat.push(code[1]);
    //       }
    //     }
    //     res.subcategory = resultsubCat.join(",");
    //     }
    // }
  });

  return res;
};

exports.clean = (nomination) => {
  // TODO: figure out how to handle if BOTH category is chosen without a subcategory and the Other category
  // sets subcategory default to General is if other is not chosen
  // this assumes that the other field requires the user to type something in that field
  if (nomination.subcategory == undefined && nomination.subcategoryOther == undefined) {
    nomination.subcategory = 's100';
  }

  return nomination;
}

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
    res.info = this.getCategories(res.info, cat, subCat);

  } else if (type === 'nominee') {
    // Handle Code Formats
    // res = this.setJSON(res, 'nominations');

    cat = res.category;
    subCat = res.subcategory;
    if (subCat == null) {
      subCat = res.subcategoryOther;
    }
    res = this.getCategories(res, cat, subCat);
  } else {
    // res.date = this.formatDate(res);

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