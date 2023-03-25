const Match = require("../models/matches.model");
var judges = []; // original list of judges needing matches (used to store judge info for match)
var nominees = []; // original list of nominees needing matching (used to store nominee info for match)
var manualReview = []; // lists of nominees and judges that need manual review
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
//       "nomCapacity": 0,
//       "nomStatus": "n200";
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

/**
 * used to check if the current nominee judge match exists
 * @param matches the current matches of nominees for a given ID [[nomID, judgeID], ...]
 * @param currentMatch an array of [nomID, judgeID]
 * @returns true if the currentMatch is already matched
 * @returns false if the currentMatch does not exist
 */
function isMatched(matches, currentMatch) {
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
  judge.judgeCapacity -= 1;
  nominee.nomCapacity += 1;
}

/**
 * used to create a current match for a given a judge and nominee
 * adds nomineeID and judgeID the matched dictionary
 * @param judge the current judge being checked
 * @param nominee the current nominee being checked
 */
function createMatch(judge, nominee) {
  let nomID = nominee.nomineeID;
  let currentMatch = [
    nomID,
    judge.judgeID,
    nominee.nomCategory,
    nominee.nomSubcategory,
    judge.judgeCategory,
    judge.judgeSubcategory,
  ];

  // check if the current nominee match has already been created and its capacity isn't full
  if (
    matched[nomID] &&
    !isMatched(matched[nomID], currentMatch) &&
    nominee.nomCapacity < 3 &&
    judge.judgeCapacity > 0
  ) {
    // add the current match to the existing nominee matches
    matched[nomID].push(currentMatch);
    updateCapacity(judge, nominee);
  } else if (matched[nomID] == undefined) {
    matched[nomID] = [currentMatch];
    updateCapacity(judge, nominee);
  }
}

function matchSubCat() {
  for (let i = 0; i < 3; i++) {
    for (let x in nominees) {
      let nominee = nominees[x];
      if (nominee.nomSubcategoryOther != null) {
        manualReview.push(nominee); // add to manual review
        nominees.splice(x, 1); // remove nominee list
      } else {
        if (nominee.nomCapacity === 3) {
          // TODO: verify when there's more data
          nominees.splice(x, 1); // remove nominee list
        } else {
          for (let y in judges) {
            let judge = judges[y];
            if (judge.judgeSubcategoryOther != null) {
              manualReview.push(judge); // add to manual review
              judges.splice(y, 1); // judge from list
            } else {
              // created as a list to support multiple subcategories
              let judgeSubCatList = getJudgeSubCat(judge);
              let nomSubCatList = getNomineeSubCat(nominee);

              if (nomSubCatList != null) {
                // then check might not be necessary but we could do some error handling instead
                for (const nomSubCat of nomSubCatList) {
                  for (const judgeSubCat of judgeSubCatList) {
                    // TODO: verify when there's more data
                    if (judge.judgeCapacity > 0) {
                      if (nomSubCat === judgeSubCat)
                        createMatch(judge, nominee);
                    } else {
                      // judge is at capacity
                      judges.splice(y, 1); // remove judge from list
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
      let nominee = nominees[x];
      if (nominee.nomCapacity === 3) {
        // TODO: verify when there's more data
        nominees.splice(x, 1); // remove nominee from original list
      } else {
        for (let y in judges) {
          let judge = judges[y];
          // created as a list to support multiple subcategories
          let judgeCatList = getJudgeCat(judge);
          let nomCatList = getNomineeCat(nominee);

          if (nomCatList != null) {
            // then check might not be necessary but we could do some error handling instead
            for (const nomCat of nomCatList) {
              for (const judgeCat of judgeCatList) {
                // TODO: verify when there's more data
                if (judge.judgeCapacity > 0) {
                  if (nomCat === judgeCat) {
                    createMatch(judge, nominee);
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
  matchCat(); // TODO: check this

  console.log("\n-----------------------------");
  console.log("Matched Results: ", matched);
  // console.log(nominees.length, judges.length, manualReview.length);

  // STEPS LEFT:
  // 1. Verify Capacities
  // 2. Call to backend model with matches
  // 3. add support for multiple categories and subcategories
};
