const judges = {};
const nominees = {};
const matches = {};

// Dataset:
// {
//   'nomineeID':'stringID' ,
//   'nomCategory': 'string',
//   'nomSubCategory': 'string',
//   'nomSubcatgoryOther:' 'string',
//   'judgeID':'stringID' ,
//   'judgeCategory': 'string',
//   'judgeSubcategory': 'string',
//   'judgeSubcategoryOther:' 'string'
//   'judgeCapacity': 'int'
// }

function populateJudges(){
  return 0;
}

function populateNominees(){
  return 0;
}

// function getJudgeSubCat(judge){
//   //check for empty or other
//   //will be multipe
//     var Subcat = "Math";
//     return Subcat;
// }

// function getNomineeSubCat(nominee){
//   //check for empty or other
//   //will be multipe
//     var Subcat = "Math";
//     return Subcat;
// }

// function getJudgeCat(judge){
//   //check for empty or other
//   //will be multipe
//     var Cat = "Math";
//     return Cat;
// }

// function getNomineeCat(nominee){
//   //check for empty or other
//   //will be multipe
//     var Cat = true;
//     return Cat;
// }

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
  //return juge capacity number
  return 3;
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

function matchSubcat(){
  for (let i = 0; i < 3; i++){
    for (let x in nominees){
      if (isNomineeAtCapacity[x] == false) {
        for (let y in judges){
              if (judges[y] == nominees[x]){
                if (isJudgeAtCapacity(y) == false) {
                  matches[x] = y;
                }
              }
        }
      }
    }
}
}

function matchCat(){
  for (let i = 0; i < 3; i++){
    for (let x in nominees){
      if (isNomineeAtCapacity[x] == false) {
        for (let y in judges){
              if (judges[y] == nominees[x]){
                if (isJudgeAtCapacity[y] == false) {
                  matches[x] = y;
                }
              }
        }
      }
    }
}
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
  populateJudges();
  populateNominees();
  matchSubcat();
  matchCat();
  if (matchCheck == true) {
    print("oh no!");
  }
}