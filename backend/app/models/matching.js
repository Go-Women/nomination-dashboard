const Match = require("./matches.model");
var judges = []; // original list of judges needing matches (used to store judge info for match)
var nominees = []; // original list of nominees needing matching (used to store nominee info for match)
var nomineesReview = new Set(); // a set of nominee IDs
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
 * @param {int} id
 * @param {boolean} noMatch
 * @returns true if it needs to be reviewed; otherwise false
 */
function nomineeManualReview(id, noMatch) {
  if (noMatch) {
      nomineesReview.add(id); // add to manual review
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
  for (let i in judges) {
    if (judges[i] == currentJudge) return true;
  }

  return false;
}

/**
 * used to update the judge and nominee capacities
 * @param {judge object} judge the current judge
 * @param {nominee object} nominee the current nominee
 */
function updateCapacity(judge, nominee) {
  judge.judgeMatchesAssigned += 1;
  nominee.matchesAssigned += 1;
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
function tryMatch(nominee, nomCatSub, judges, checkCat) {
  for (let y in judges) {
    const judge = judges[y];
      if (nomCatSub != null) {
        if (judge.judgeMatchesAssigned < judge.judgeCapacity) {
          // then check might not be necessary but we could do some error handling instead
          for (const nomCat of nomCatSub) {
            const judgeList = checkCat ? judge.judgeCategory.split(",") : judge.judgeSubcategory.split(",");
            for (const judgeCat of judgeList) {
              if (nomCat === judgeCat) {
                if (createMatch(judge, nominee)) {
                  // remove nominee from having to be manually matched
                  // if (nominee.matchesAssigned === 3)
                    // manualReview[0].delete(nominee.nomineeID);
                  return true;
                }
              }
            }
          }
        } // judge is at capacity
        else return false;
      }
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
  if (matched[nomID] && !isMatched(matched[nomID], judgeID) && nominee.matchesAssigned < 3 && judge.judgeMatchesAssigned < judge.judgeCapacity) {
    // add the current match to the existing nominee matches
    matched[nomID].push(judgeID);
    updateCapacity(judge, nominee);
    return true;
  } else if (matched[nomID] === undefined) {
    // create initial match
    matched[nomID] = [judgeID];
    updateCapacity(judge, nominee);
    return true;
  } else {
    return false;
  }
}

/**
 * starts the matches process by checking nominee and judges subcategories and then categories
 *
 * if they are the same they are matched and their capacities are updated
 *
 * edge cases are where a nominee or judge has an Other category these need to be manually reviewed
 *  --> this is handled separately
 */
function generateMatches() {
  for (let i = 0; i < 3; i++) {
    // each nominee should get assigned 3 judges
    for (let x = 0; x < nominees.length; x++) {
      // loop through all nominees
      const nominee = nominees[x];
      if (nominee) {
        if (nominee.matchesAssigned < 3) {
          const nomSubCatList = nominee.subcategory.split(",");
          const nomCatList = nominee.category.split(",");
          if (tryMatch(nominee, nomSubCatList, judges, false)) {
          } else {
            if (!tryMatch(nominee, nomCatList, judges, true))
              nomineeManualReview(nominee.nomineeID, true);
          }
        }
      }
    }
  }
};

/**
 * creates a match object that will be sent for the front end display for a suggested match
 * @param {[[nomineeID, judgeID, matchStatus],...]} matches 
 * @returns an array of match objects
 */
function getMatchDetails(matches) {
  var matchDetails = [];
  for (const match of matches) {
    var nominee = nominees.filter((item)=>item.nomineeID == match[0])[0];
    var judge = judges.filter((item)=>item.judgeID == match[1])[0];
    const info = {
      "matchStatus": "Review",
      "nomID": nominee.nomineeID,
      "nomFullName": nominee.fullName,
      "category": nominee.category,
      "subcategory": nominee.subcategory,
      "nomStatus": match[2],
      "matchesAssigned": nominee.matchesAssigned,
      "nomCapacity": nominee.nomCapacity,

      "judgeID": judge.judgeID,
      "judgeFullName": judge.fullName,
      "judgeCategory": judge.judgeCategory,
      "judgeSubcategory": judge.judgeSubcategory,
      "judgeMatchesAssigned": judge.judgeMatchesAssigned,
      "judgeCapacity": judge.judgeCapacity,
      "judgeStatus": match[2]
    };
    matchDetails.push(info);
  }

  return matchDetails;
};

// Dataset from GET /matches/data:
exports.mainMatching = (matches) => {
  // RESET existing values
  judges = []; // original list of judges needing matches (used to store judge info for match)
  nominees = []; // original list of nominees needing matching (used to store nominee info for match)
  nomineesReview = new Set(); // a set of nominee IDs
  // /**
  //  * {
  //  *    "nomID": [judgeID, judgeID, judgeID],
  //  *    "nomID": [judgeID, judgeID, ...],
  //  *   ...
  //  * }
  //  */
  matched = {}; // object of matched candidates 
  nominees = matches[0];
  judges = matches[1];
  generateMatches();

  // console.log("\n-----------------------------");
  // console.log("Matched Results: ", matched);
  // console.log("Manual Review: ", nomineesReview); 
  var match = [];
  for (const nominee in matched) {
    const nomMatch = matched[nominee];  
    for (const judge in nomMatch) {
      match.push([parseInt(nominee), nomMatch[judge], "m100"]);
    }
  };

  const matchDetails = getMatchDetails(match);
  return matchDetails;

  // STEPS LEFT:
  // 2. verify support for multiple categories and subcategories with more data
};
