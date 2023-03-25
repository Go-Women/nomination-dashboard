const Match = require("../models/matches.model");
var judges = []; // original list of judges needing matches (used to store judge info for match)
var nominees = []; // original list of nominees needing matching (used to store nominee info for match)
const nomineesReview = new Set(); // a set of nominee IDs
const judgesReview = new Set();   // a set of judge IDs
var manualReview = [nomineesReview, judgesReview]; // lists of nominees and judges that need manual review
// TODO: need to think how to handle judges with an other subcategory (might need to have these judges reviewed and assigned a subcategory manually before matching process)
/**
 * {
 *    "nomID": [judgeID, judgeID, judgeID],
 *    "nomID": [judgeID, judgeID, ...],
 *   ...
 * }
 */
var matched = {}; // object of matched candidates

/**
 * checks whether the nominee needs to be manually reviewed;
 * if so adds them a separate list
 * @param {string} subCatOther 
 * @param {int} id 
 * @param {boolean} noMatch 
 * @returns true if it needs to be reviewed; otherwise false
 */
function nomineeManualReview(subCatOther, id, noMatch) {
  if (subCatOther) {
    if (subCatOther != null || noMatch) {
      nomineesReview.add(id); // add to manual review
      return true;
    }
  }

  return false;
}

/**
 * checks whether the judge needs to be manually reviewed;
 * if so adds them a separate list
 * @param {string} judgeSubCat 
 * @param {int} id 
 * @param {boolean} noMatch 
 * @returns 
 */
function judgeManualReview(judgeSubCat, id, noMatch) {
  if (judgeSubCat != null || noMatch) {
    judgesReview.add(id); // add to manual review
    return true;
  }

  return false;
}

/**
 * used to check if the current nominee judge match exists
 * @param {Array<Int>} judges an array of judge IDs [judgeID, judgeID, ...]
 * @param {Int} currentJudge the current judge ID that needs to be checked
 * @returns true if the currentMatch is already matched
 * @returns false if the currentMatch does not exist
 */
function isMatched(judges, currentJudge) {
  for (let judge in judges) {
    if (judge == currentJudge) return true;
  }

  return false;
}

/**
 * used to update the judge and nominee capacities
 * @param {judge object} judge the current judge
 * @param {nominee object} nominee the current nominee
 */
function updateCapacity(judge, nominee) {
  judge.judgeCapacity -= 1;
  nominee.nomCapacity += 1;
}

/**
 * used to see if a match can be found:
 *  given nominee, subcategory or category with a judge, subcategory or category
 * 
 * when passing in arguments both nominee and judge need to be either comparing BOTH
 * their categories or BOTH their subcategories (CANNOT compare a category to a subcategory)
 * @param {nominee object} nominee 
 * @param {string subcategory or category} nomCatSub 
 * @param {judge object} judge 
 * @param {judge subcategory or category} judgeCatSub 
 * @returns true if match was created; otherwise false
 */
function tryMatch(nominee, nomCatSub, judge, judgeCatSub) {
  if (nomCatSub != null) {
    if (judge.judgeCapacity > 0) {
      // then check might not be necessary but we could do some error handling instead
      for (const nomCat of nomCatSub) {
        for (const judgeCat of judgeCatSub) {
          // TODO: verify when there's more data
          if (nomCat === judgeCat) {
            createMatch(judge, nominee);
            // remove nominee from having to be manually matched
            if (nominee.nomCapacity === 3)
              manualReview[0].delete(nominee.nomineeID);
              
            return true;
          }
        }
      }
    } else // judge is at capacity
        return false;
  }

  return false;
}

/**
 * used to create a current match for a given a judge and nominee
 * adds nomineeID and judgeID the matched dictionary
 * {
 *   'nomID': [judgeID, judgeID, judgeID],
 *    ...
 * }
 * @param {judge object} judge the current judge being checked
 * @param {nominee object} nominee the current nominee being checked
 */
function createMatch(judge, nominee) {
  let nomID = nominee.nomineeID;
  let judgeID = judge.judgeID;

  // check if the current nominee match has already been created and its capacity isn't full
  if (matched[nomID] &&!isMatched(matched[nomID], judgeID) && nominee.nomCapacity < 3 && judge.judgeCapacity > 0) {
    // add the current match to the existing nominee matches
    matched[nomID].push(judgeID);
    updateCapacity(judge, nominee);
  } else if (matched[nomID] === undefined) {
    // create initial match
    matched[nomID] = [judgeID];
    updateCapacity(judge, nominee);
  }
}

/**
 * starts the matches process by checking nominee and judges subcategories and then categories
 * 
 * if they are the same they are matched and their capacities are updated
 * 
 * edge cases are where a nominee or judge has an Other category these need to be manually reviewed
 */
function generateMatches() {
  for (let x = 0; x < nominees.length; x++) { // loop through all nominees
    for (let i = 0; i < 3; i++) {   // each nominee should get assigned 3 judges
      const nominee = nominees[x];
      if (!nomineeManualReview(nominee.nomSubcategoryOther, nominee.nomineeID) && nominee) {
        if (nominee.nomCapacity < 3) {
          for (let y in judges) {
            const judge = judges[y];
            if (!judgeManualReview(judge.judgeSubcategoryOther, judge.judgeID)) {
              // created as a list to support multiple subcategories
              const judgeSubCatList = judge.judgeSubcategory.split(',');
              const nomSubCatList = nominee.nomSubcategory.split(',');
              const judgeCatList = judge.judgeCategory.split(',');
              const nomCatList = nominee.nomCategory.split(',');
              if (!tryMatch(nominee, nomSubCatList, judge, judgeSubCatList)) {
                if (!tryMatch(nominee, nomCatList, judge, judgeCatList))
                    nomineeManualReview(nominee.nomSubcategoryOther, nominee.nomineeID, true);
              }
            }
          } 
        } 
      }
    }
  }
}

// Dataset from GET /matches/data:
exports.mainMatching = (matches) => {
  nominees = matches[0];
  judges = matches[1];
  generateMatches();

  console.log("\n-----------------------------");
  console.log("Matched Results: ", matched);
  console.log("Manual Review: ", manualReview);
  // console.log(nominees.length, judges.length, manualReview.length);

  // STEPS LEFT:
  // 1. Call to backend model with matches
  // 2. verify support for multiple categories and subcategories with more data
};
