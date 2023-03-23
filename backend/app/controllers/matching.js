const Match = require("../models/matches.model");
var judges = [];
var nominees = [];
var matches = [];
var manualReveiw = [];

// Dataset from GET /matches/data:
// const tobeMatched = [
//   [
//     {
//       "nomineeID": 1,
//       "nomCategory": "c400",
//       "nomSubcategory": "s403",
//       "nomSubcategoryOther": null,
//       "nomCapacity": 0
//     },
//     {
//       "nomineeID": 2,
//       "nomCategory": "c700",
//       "nomSubcategory": "s708",
//       "nomSubcategoryOther": null
//     },
//     ...
//   ],
//   [
//     {
//       "judgeID": 1,
//       "judgeCategory": "c100",
//       "judgeSubcategory": "s108",
//       "judgeSubcategoryOther": null,
//       "judgeCapacity": 12,
//       "judgeStatus": "j300"
//     },
//     {
//       "judgeID": 2,
//       "judgeCategory": "c300",
//       "judgeSubcategory": "s303",
//       "judgeSubcategoryOther": null,
//       "judgeCapacity": 16,
//       "judgeStatus": "j300"
//     },
//    ...
//   ]
// ];

// tobeMatched[0]  --> nominees {..},{..}...
//                         e.g. nominees[0].nomCategory = "c400";
//                         tobeMatched[0][0].nomCategory = "c400";
// tobeMatched[1] --> judges {..},{..},...
//                          e.g. judges[0].judgeCategory = "c100"
//                          tobeMatched[1][0].judgeCategory = "c100";

function populateJudges(matches){
  judges = matches;
}

function populateNominees(matches){
  nominees = matches;
}

function getJudgeSubCat(i){
  let judgeSubcats = judges[i].judgeSubcategory;
  let newList = judgeSubcats.split(',');
  return newList;
}

function getNomineeSubCat(i){
  let nomineeSubcats = nominees[i].nomineeSubcategory;
  let newList = nomineeSubcats.split(',');
  return newList;
}

function getJudgeCat(i){
  let judgeCats = judges[i].judgeCategory;
  let newList = judgeCats.split(',');
  return newList;
}

function getNomineeCat(i){
  let nomineeCats = nominees[i].nomineeCategory;
  let newList = nomineeCats.split(',');
  return newList;
}

function checkOther(y) {
  //returns true if other category
  if (nominees[y].nomSubcategoryOther !== null) {
    return true;
  }
  return false;
}

function isJudgeAtCapacity(y){
    //returns true if judge is at capacity
  if (judges[y].judgecapacity <= 0) {
    return true;
  }
  return false;
}

function getJudgeCapacity(y){
  //return judge capacity number
  return judges[y].judgecapacity;
}

function isNomineeAtCapacity(nominee){
  //returns true if nominee is no longer needing judges
  if (nominees[nominee].nomineecapacity <= 0) {
    return true;
  }
  return false;
}

function matchSubCat() {
  for (let i = 0; i < 3; i++) {
    for (let x in nominees) {
      if (!checkOther(x)) {
        manualReveiw.push(x);
        continue;
      }
      if (isNomineeAtCapacity[x]) continue;

      for (let y in judges) {
        let judgeSubCatList = getJudgeSubCat(y);
        let nomSubCatList = getNomineeSubCat(x);
        if (nomSubCatList == null) continue;

        for (let k = 0; k < nomSubCatList.length; k++) {
          for (let m = 0; m < judgeSubCatList.length; m++) {
            if (isJudgeAtCapacity(y)) continue;
            if (nomSubCatList[k] === judgeSubCatList[m]) {
              matches[x] = y;
              judges[y].judgeCapacity = judges[y].judgeCapacity--;
              nominees[x].nomineeCapacity = nominees[x].nomineeCapacity--;
            }
          }
        }
      }
    }
  }
}

function matchCat() {
  for (let i = 0; i < 3; i++) {
    for (let x in nominees) {
      if (isNomineeAtCapacity(x)) continue;

      for (let y in judges) {
        let judgeCatList = getJudgeCat(y);
        let nomCatList = getNomineeCat(x);
        if (nomCatList == null) continue;

        for (let k = 0; k < nomCatList.length; k++) {
          for (let m = 0; m < judgeCatList.length; m++) {
            if (judgeCatList[m] === nomCatList[k]) {
              if (isJudgeAtCapacity(y)) continue;
              if (nomCatList[k] == judgeCatList[m]) {
                matches[x] = y;
                judges[y].judgeCapacity = judges[y].judgeCapacity--;
                nominees[x].nomineeCapacity = nominees[x].nomineeCapacity--;
              }
            }
          }
        }
      }
      manualReveiw.push(x);
    }
  }
}

exports.mainMatching = (matches) => {
  // Call to backend GET /matches/data
  // returns [[{},{}..],[{},{},..]] data
  populateJudges(matches[1]);
  populateNominees(matches[0]);
  matchSubcat();
  matchCat();
}
