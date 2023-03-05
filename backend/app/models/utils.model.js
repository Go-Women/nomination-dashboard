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

exports.setCategories = (res, cat, subCat) => {
  let resultCat = [];
  let resultsubCat = [];
  Object.entries(codes).forEach((code, value) => {
    if (code[0] === cat && cat.length == 4) {
      res.category = code[1];
    } else if (cat.length > 4 && cat.includes(",")){
      let cats = cat.split(',');
      for (const i in cats) {
        if (code[0] === cats[i]) {
          resultCat.push(code[1]);
        }
      }
      res.category = resultCat.join(",");
    }

    // TODO: fix this once judge subcategory is supported on the frontend
    // Right now all judges subcategories are mark as general when trying to edit a judge
    // console.log("SUBCATEGORY: ", res.subcategory);
    if (subCat == null || subCat == undefined) {
      res.subcategory = "General";
    } else {

      if (code[0] === subCat && subCat.length == 4) {
        res.subcategory = code[1];
        console.log("SUBCATEGORY: ", res.subcategory);
      } else if (subCat.length > 4 && subCat.includes(",")){
        let subCats = subCat.split(',');
        for (const i in subCats) {
          if (code[0] === subCats[i])
            resultsubCat.push(code[1]);
        }
        res.subcategory = resultsubCat.join(",");
      }
    }
  });

  // TODO: handle other subcategory
  return res;
};

exports.setJSON = (res, name) => {
  res[name] = JSON.parse(res[name]);
  return res;
};

exports.clean = (jsonData) => {
  // TODO: figure out how to handle if BOTH category is chosen without a subcategory and the Other category
  // sets subcategory default to General is if other is not chosen
  // this assumes that the other field requires the user to type something in that field
  // TODO: support this for judges
  console.log(jsonData.category, jsonData.subcategory);
  if (jsonData.subcategory == undefined && jsonData.subcategoryOther == undefined) {
    jsonData.subcategory = 's100';
  }

  return jsonData;
}

// format data when individually being accessed
exports.formatSingleData = (res, type) => {
  let cat;
  let subCat;
  if (type === 'judge') {
    // Handle Code Formats
    res.info = JSON.parse(res.info);  
    cat = res.info.category;
    subCat = res.info.subcategory;
    res.info = this.setCategories(res.info, cat, subCat);
  } else if (type === 'nominee') {
    // Handle Code Formats
    // res = this.setJSON(res, 'nominations');
    cat = res.category;
    subCat = res.subcategory;
    if (subCat == null) {
      subCat = res.subcategoryOther;
    }
    res = this.setCategories(res, cat, subCat);
  } else {
    // res.date = this.formatDate(res);

    // Handle Code Formats
    cat = res.category;
    subCat = res.subcategory;
    if (subCat == null) {
      subCat = res.subcategoryOther;
    }
    res = this.setCategories(res, cat, subCat);
  }
    return res;
};

// format data when all values are being accessed
exports.formatAllData = (res, type) => {
  Object.entries(res).forEach((data, value) => {
    this.formatSingleData(data[1], type);
  });
};