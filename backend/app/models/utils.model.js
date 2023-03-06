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

exports.setJSON = (res, name) => {
  res[name] = JSON.parse(res[name]);
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
    // TODO: implement this for status codes
  });

  return res;
};

exports.clean = (jsonData) => {
  // TODO: figure out how to handle if BOTH category is chosen without a subcategory and the Other category
  // sets subcategory default to General is if other is not chosen
  // this assumes that the other field requires the user to type something in that field
  // TODO: support this for judges
  if (jsonData.subcategory == undefined && jsonData.subcategoryOther == undefined) {
    jsonData.subcategory = 's100';
  }

  return nomination;
}

exports.merge = (nominee, nomination) => {
  let merged = JSON.parse(nominee.nominations);
  merged.push(JSON.parse(nomination)[0]);

  nominee.nominations = JSON.stringify(merged);
  nominee.nomStatus = 'n200';

  return nominee;
}

exports.formatJudgeInput = (judge) => {
    judge.email = judge.info.email;
    judge.active = judge.info.active;
    judge.info = JSON.stringify([judge.info]);
    return judge;
}

exports.setCategories = (res, cat, subCat, nomStatus, type) => {
  let resultCat = [];
  let resultsubCat = [];
  
  Object.entries(codes).forEach((code, value) => {
    // console.log("CATEGORY: ", res.category);
    if (code[0] === cat && cat.length == 4) {
      res.category = code[1];
    } else if (cat.length > 4 && cat.includes(",") ){
      let cats = cat.split(',');
      for (const i in cats) {
        if (code[0] === cats[i]) {
          resultCat.push(code[1]);
        }
      }
      res.category = resultCat.join(",");
    }

    // TODO: fix this once judge subcategory is supported on the frontend
    // BUG: with judge other subcategory
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

    if (nomStatus !== undefined && nomStatus !== null)
    if (code[0] === nomStatus)
      if (type === 'judge')
        res.judgeStatus = code[1];
      else
        res.nomStatus = code[1];
  });

  return res;
};

exports.setJSON = (res, name) => {
  res[name] = JSON.parse(res[name])[0];
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
  let nomStatus;
  if (type === 'judge') {
    // Handle Code Formats
    res.info = JSON.parse(res.info);  
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
    // Handle Code Formats
    nomStatus = res.nomStatus;
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

exports.getAllJudgesMatchingData = (res, type) => {
  Object.entries(res).forEach((data, value) => {
    this.getMatchingData(data[1], type);
  });
};

exports.getMatchingData = (res, type) => {
  if (type === "data") {
    res.info = JSON.parse(res.info);
  }
  
  const info = res.info;

  res.judgeCategory = info.category;
  res.judgeSubcategory = info.subcategory;
  res.judgeSubcategoryOther = info.subcategoryOther;
  res.judgeCapacity = info.capacity;
  res.judgeStatus = info.judgeStatus;

  if ("info" in res)
    delete res["info"];

  return res;
};

exports.setMatchingStatus = (res) => {  
  const matchStatus = res.matchStatus;
  Object.entries(res).forEach((data, value) => {
    Object.entries(codes).forEach((code, value) => {
      if (code[0] === data[1].matchStatus)
        data[1].matchStatus = code[1];
    });
  });

  return res;
};

exports.filterJudgeStatus = (res, status) => {
  const activeJudges = res.filter(function (stat) {
    return stat.judgeStatus == status;
  });
  
  return activeJudges;
}