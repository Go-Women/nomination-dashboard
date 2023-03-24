const Match = require("../models/matches.model");
var judges = [];
var nominees = [];
var matches = []; // initial matches
var matched = {}; // dictionary of matched candidates
// {
//    "nomID": [[nomID, judgeID], ...],
//    "nomID": [[nomID, judgeID], ...],
//    ...
// }
var manualReview = [];

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

function populateJudges(matches) {
  judges = matches;
}

function populateNominees(matches) {
  nominees = matches;
}

function getJudgeSubCat(judge) {
  let judgeSubcats = judge.judgeSubcategory;
  let newList = judgeSubcats.split(",");
  return newList;
}

function getNomineeSubCat(nominee) {
  let nomineeSubcats = nominee.nomSubcategory;
  let newList = nomineeSubcats.split(",");
  return newList;
}

function getJudgeCat(judge) {
  let judgeCats = judge.judgeCategory;
  let newList = judgeCats.split(",");
  return newList;
}

function getNomineeCat(nominee) {
  let nomineeCats = nominee.nomCategory;
  let newList = nomineeCats.split(",");
  return newList;
}

function checkOtherNominees(nominee) {
  if (nominee.nomSubcategoryOther == null) return false;

  return true; //returns true if other category
}

function checkOtherJudges(judge) {
  if (judge.judgeSubcategoryOther == null) return false;

  return true; //returns true if other category
}

function isJudgeAtCapacity(y) {
  //returns true if judge is at capacity
  if (judges[y].judgeCapacity == 0) {
    return true;
  }
  return false;
}

function getJudgeCapacity(y) {
  //return judge capacity number
  return judges[y].judgeCapacity;
}

function isNomineeAtCapacity(nominee) {
  //returns true if nominee is no longer needing judges
  if (nominees[nominee].nomCapacity == 3) {
    return true;
  }
  return false;
}

/**
 * used to check if the current nominee judge match exists
 * @param matches the current matches of nominees for a given ID [[nomID, judgeID], ...]
 * @param currentMatch an array of [nomID, judgeID]
 * @returns true if the currentMatch is already matched
 * @returns false if the currentMatch does not exist
 */
function isMatched(matches, currentMatch) {
  // console.log(matches);
  for (let i in matches) {
    if (matches[i][1] == currentMatch[1]) return true;
  }

  return false;
}

/**
 * used to create a current match for a given a judge and nominee
 * adds nomineeID and judgeID the matched dictionary
 * @param judge the current judge being checked
 * @param nominee the current nominee being checked
 */
function createMatch(judge, nominee) {
  let currentMatch = [nominee.nomineeID, judge.judgeID, nominee.nomCategory, nominee.nomSubcategory, judge.judgeCategory, judge.judgeSubcategory];
  let nomID = nominee.nomineeID;
  // get current matches
  if (matched[nomID] && !isMatched(matched[nomID], currentMatch)) {
    // need to get current judges matched and add to that list
    matched[nomID].push(currentMatch);
    judge.judgeCapacity = judge.judgeCapacity--;
    nominee.nomCapacity = nominee.nomCapacity++;
  } else {
    // create the initial match
    matched[nomID] = [currentMatch];
    judge.judgeCapacity = judge.judgeCapacity--;
    nominee.nomCapacity = nominee.nomCapacity++;
  }
}

function matchSubCat() {
  for (let i = 0; i < 3; i++) {
    for (let x in nominees) {
      if (checkOtherNominees(nominees[x])) {
        nominees.splice(x, 1); // remove nominee from original list
        manualReview.push(nominees[x]); // add to manual review
      } else {
        if (isNomineeAtCapacity[nominees[x]]) {
          // TODO: verify when there's more data
          nominees.splice(x, 1); // remove nominee from original list
        } else {
          for (let y in judges) {
            if (checkOtherJudges(judges[y])) {
              judges.splice(y, 1); // remove judge from original list
              manualReview.push(judges[y]); // add to manual review
            } else {
              // created as a list to support multiple subcategories
              let judgeSubCatList = getJudgeSubCat(judges[y]);
              let nomSubCatList = getNomineeSubCat(nominees[x]);

              if (nomSubCatList == null) continue;
              // console.log("NOMINEE", nomSubCatList, "JUDGE: ", judgeSubCatList);
              for (let k = 0; k < nomSubCatList.length; k++) {
                for (let m = 0; m < judgeSubCatList.length; m++) {
                  if (!isJudgeAtCapacity(y)) {
                    // TODO: verify when there's more data
                    if (nomSubCatList[k] === judgeSubCatList[m]) {
                      createMatch(judges[y], nominees[x]);
                    }
                  } else {
                    // judge is at capacity
                    judges.splice(y, 1); // remove from list
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

function matchCat() {
  // for (let i = 0; i < 3; i++) {
  for (let x in nominees) {
    if (checkOtherNominees(nominees[x])) {
      nominees.splice(x, 1); // remove nominee from original list
      manualReview.push(nominees[x]); // add to manual review
    } else {
      if (isNomineeAtCapacity[nominees[x]]) {
        // TODO: verify when there's more data
        nominees.splice(x, 1); // remove nominee from original list
      } else {
        for (let y in judges) {
          if (checkOtherJudges(judges[y])) {
            judges.splice(y, 1); // remove judge from original list
            manualReview.push(judges[y]); // add to manual review
          } else {
            // created as a list to support multiple subcategories
            let judgeCatList = getJudgeCat(judges[y]);
            let nomCatList = getNomineeCat(nominees[x]);

            if (nomCatList == null) continue;

            for (let k = 0; k < nomCatList.length; k++) {
              for (let m = 0; m < judgeCatList.length; m++) {
                if (!isJudgeAtCapacity(y)) {
                  // TODO: verify when there's more data
                  if (nomCatList[k] === judgeCatList[m]) {
                    matches[nominees[x]] = judges[y];
                    judges[y].judgeCapacity = judges[y].judgeCapacity--;
                    nominees[x].nomCapacity = nominees[x].nomCapacity++;
                  }
                } else {
                  // judge is at capacity
                  judges.splice(y, 1); // remove from list
                }
              }
            }
          }
        }
      }
    }
  }
  // }
}

function matchCat() {
  for (let i = 0; i < 3; i++) {
    for (let x in nominees) {
      if (isNomineeAtCapacity(x)) continue;

      for (let y in judges) {
        let judgeCatList = getJudgeCat(y);
        let nomCatList = getNomineeCat(x);
        // console.log(judgeCatList, nomCatList);
        if (nomCatList == null) continue;

        for (let k = 0; k < nomCatList.length; k++) {
          for (let m = 0; m < judgeCatList.length; m++) {
            // console.log(ju)
            if (judgeCatList[m] === nomCatList[k]) {
              if (isJudgeAtCapacity(y)) continue;
              if (nomCatList[k] == judgeCatList[m]) {
                matches[x] = y;
                // console.log(matches[x]);
                judges[y].judgeCapacity = judges[y].judgeCapacity--;
                nominees[x].nomCapacity = nominees[x].nomCapacity--;
              }
            }
          }
        }
      }
      manualReview.push(x);
    }
  }
}

// function printMatches(matches) {
//   for (let x in matches) {
//     if (!checkOther(x)) {
//       manualReview.push(x);
//       continue;
//     }
//     if (isNomineeAtCapacity[x]) continue;

//     for (let y in judges) {
//       let judgeSubCatList = getJudgeSubCat(y);
//       let nomSubCatList = getNomineeSubCat(x);
// }

exports.mainMatching = (matches) => {
  // Call to backend GET /matches/data
  // returns [[{},{}..],[{},{},..]] data
  populateJudges(matches[1]);
  populateNominees(matches[0]);
  matchSubCat();
  // matchCat();
  console.log("Matched Result: ", matched);
};
