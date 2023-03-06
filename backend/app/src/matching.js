const judges = {};
const nominees = {};
const matches = {};

// Dataset from GET /matches/data:
// const tobeMatched = [
//   [
//     {
//       "nomineeID": 1,
//       "nomCategory": "c400",
//       "nomSubcategory": "s403",
//       "nomSubcategoryOther": null
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


function populateJudges(){
  return 0;
}

function populateNominees(){
  return 0;
}

function getJudgeSubCat(judge){
  return judge["nomSubCategory"];
}

function getNomineeSubCat(nominee){
  return nominee["nomSubCategory"];
}

function getJudgeCat(judge){
  return judge["nomCategory"];
}

function getNomineeCat(nominee){
  return nominee["nomCategory"];
}

function checkOther(nominee) {
  //returns true if other category
  if (nominee["nomSubcategoryOther"] !== null) {
    return true;
  }
  return false;
}

function isJudgeAtCapacity(judge){
    //returns true if judge is at capacity
    var count = 0;
    for (let value in matches){
      if (value == judge) {
        count = count + 1;
      }
    }
    if (count == getJudgeCapacity(judge)) {
      return true;
    }
    return false;
}

function getJudgeCapacity(judge){
  //return judge capacity number
  return judge["judgeCapacity"];
}

function isNomineeAtCapacity(nominee){
  //returns true if nominee is no longer needing judges
  var count = 0;
  for (let x in matches){
    if (x == nominee) {
      count = count + 1;
    }
  }
  if (count == 3) {
    return true;
  }
  return false;
}

// function matchSubcat(){
//   for (let i = 0; i < 3; i++){
//     for (let x in nominees){
//       if (checkOther(x) == false) {
//         if (isNomineeAtCapacity[x] == false) {
//           for (let y in judges){
//               var judgeSubCatList = getJudgeSubCat(y);
//               var nomSubCatList = getNomineeSubCat(x);
//               if (nomSubCatList !== null) {
//                 for (let k = 0; k < nomSubCatList.length; k++){
//                   for (let m = 0; m < judgeSubCatList.length; m++){
//                     if (judgeSubCatList[m] == nomSubCatList[k]){
//                       if (isJudgeAtCapacity(y) == false) {
//                         matches[x] = y;
//                       }
//                     }
//                 }
//                 }
//           }
//         }
//         }
//       }
//       else {
//         matches[x] = "Manual";
//       }
//     }
//     }
// }

function matchSubCat() {
  for (let i = 0; i < 3; i++) {
    for (let x in nominees) {
      if (!checkOther(x)) {
        matches[x] = "Manual";
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
            matches[x] = y;
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
            if (judgeCatList[m] == nomCatList[k]) {
              if (isJudgeAtCapacity(y)) continue;
              matches[x] = y;
            }
          }
        }
      }
    }
  }
}

// function matchCat(){
//   for (let i = 0; i < 3; i++){
//     for (let x in nominees){
//       if (isNomineeAtCapacity[x] == false) {
//         for (let y in judges){
//             var judgeCatList = getJudgeCat(y);
//             var nomCatList = getNomineeCat(x);
//             if (nomCatList !== null) {
//               for (let k = 0; k < nomCatList.length; k++){
//                 for (let m = 0; m < judgeCatList.length; m++){
//                   if (judgeCatList[m] == nomCatList[k]){
//                     if (isJudgeAtCapacity(y) == false) {
//                       matches[x] = y;
//                     }
//                   }
//               }
//               }
//         }
//       }
//       }
//     }
// }

// TODO: then add any unmatched nominees to a separate manual review list
}

function matchCheck(){
    for (let x in nominees){
      if (isNomineeAtCapacity[x] == false) {
        return true;
    }
  }
  return false;
}

function mainMatching(){
  // Call to backend GET /matches/data
  // returns [[{},{}..],[{},{},..]] data
  populateJudges();
  populateNominees();
  var set = true;
  while(set !== false) {
    matchSubcat();
    matchCat();
    set = matchCheck();
  }
}