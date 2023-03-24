const Match = require("../models/matches.model");
var judges = [];
var nominees = [];
var matches = []; // initial matches
var manualReview = [];  // lists of nominees and judges that need manual review
// TODO: need to think how to handle judges with an other subcategory (might need to have these judges reviewed and assigned a subcategory manually before matching process)

/**
 * {
 *    "nomID": [[nomID, judgeID], ...],
 *    "nomID": [[nomID, judgeID], ...],
 *   ...
 * }
 */
var matched = {}; // dictionary of matched candidates



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
//    ...
//   ]
// ];

function populateJudges(judgesAvailable) {
  judges = judgesAvailable;
}

function populateNominees(nomineesAvailable) {
  nominees = nomineesAvailable;
}

function getJudgeSubCat(judge) {
  let judgeSubCats = judge.judgeSubcategory;
  let newList = judgeSubCats.split(",");
  return newList;
}

function getNomineeSubCat(nominee) {
  let nomineeSubCats = nominee.nomSubcategory;
  let newList = nomineeSubCats.split(",");
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

function checkNomineeOther(nominee) {
  if (nominee.nomSubcategoryOther == null) return false;

  return true; //returns true if other category
}

function checkJudgeOther(judge) {
  if (judge.judgeSubcategoryOther == null) return false;

  return true; //returns true if other category
}

function isJudgeAtCapacity(judge) {
  //returns true if judge is at capacity
  if (judge.judgeCapacity == 0) {
    return true;
  }
  return false;
}

function isNomineeAtCapacity(nominee) {
  //returns true if nominee is no longer needing judges
  if (nominee.nomCapacity == 3) {
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
 * used to update the judge and nominee capacities
 * @param judge the current judge
 * @param nominee the current nominee
 */
function updateCapacity(judge, nominee) {
  judge.judgeCapacity = judge.judgeCapacity--;
  nominee.nomCapacity = nominee.nomCapacity++;
}

/**
 * used to create a current match for a given a judge and nominee
 * adds nomineeID and judgeID the matched dictionary
 * @param judge the current judge being checked
 * @param nominee the current nominee being checked
 */
function createMatch(judge, nominee) {
  let currentMatch = [
    nominee.nomineeID,
    judge.judgeID,
    nominee.nomCategory,
    nominee.nomSubcategory,
    judge.judgeCategory,
    judge.judgeSubcategory,
  ];
  let nomID = nominee.nomineeID;

  // check if the current nominee match has already been created
  if (matched[nomID] && !isMatched(matched[nomID], currentMatch))
    // add the current match to the existing nominee matches
    matched[nomID].push(currentMatch);
  // create the initial match
  else matched[nomID] = [currentMatch];

  updateCapacity(judge, nominee);
}

function matchSubCat() {
  for (let i = 0; i < 3; i++) {
  for (let x in nominees) {
    if (checkNomineeOther(nominees[x])) {
      nominees.splice(x, 1); // remove nominee from original list
      manualReview.push(nominees[x]); // add to manual review
    } else {
      if (isNomineeAtCapacity[nominees[x]]) {
        // TODO: verify when there's more data
        nominees.splice(x, 1); // remove nominee from original list
      } else {
        for (let y in judges) {
          if (checkJudgeOther(judges[y])) {
            judges.splice(y, 1); // remove judge from original list
            manualReview.push(judges[y]); // add to manual review
          } else {
            // created as a list to support multiple subcategories
            let judgeSubCatList = getJudgeSubCat(judges[y]);
            let nomSubCatList = getNomineeSubCat(nominees[x]);

            if (nomSubCatList != null) {
              // then check might not be necessary but we could do some error handling instead
              for (let k = 0; k < nomSubCatList.length; k++) {
                for (let m = 0; m < judgeSubCatList.length; m++) {
                  // TODO: verify when there's more data
                  if (!isJudgeAtCapacity(judges[y])) {
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
}

function matchCat() {
  for (let i = 0; i < 3; i++) {
  for (let x in nominees) {
      if (isNomineeAtCapacity[nominees[x]]) {
        // TODO: verify when there's more data
        nominees.splice(x, 1); // remove nominee from original list
      } else {
        for (let y in judges) {
            // created as a list to support multiple subcategories
            let judgeCatList = getJudgeCat(judges[y]);
            let nomCatList = getNomineeCat(nominees[x]);

            if (nomCatList != null) {
              // then check might not be necessary but we could do some error handling instead
              for (let k = 0; k < nomCatList.length; k++) {
                for (let m = 0; m < judgeCatList.length; m++) {
                  // TODO: verify when there's more data
                  if (!isJudgeAtCapacity(judges[y])) {
                    if (nomCatList[k] === judgeCatList[m]) {
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

exports.mainMatching = (matches) => {
  // Call to backend GET /matches/data
  populateJudges(matches[1]);
  populateNominees(matches[0]);
  matchSubCat();
  matchCat();  // TODO: check this
  console.log("Matched Results: ", matched);

  // STEPS LEFT:
  // 1. Verify Capacities
  // 2. Call to backend model with matches
  // 3. add support for multiple categories and subcategories
};
