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

function matchSubcat(){
  for (let i = 0; i < 3; i++){
    for (let x in nominees){
      if (checkOther(x) == false) {
        if (isNomineeAtCapacity[x] == false) {
          for (let y in judges){
              var judgeSubCatList = getJudgeSubCat(y);
              var nomSubCatList = getNomineeSubCat(x);
              if (nomSubCatList !== null) {
                for (let k = 0; k < nomSubCatList.length; k++){
                  for (let m = 0; m < judgeSubCatList.length; m++){
                    if (judgeSubCatList[m] == nomSubCatList[k]){
                      if (isJudgeAtCapacity(y) == false) {
                        matches[x] = y;
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

function matchCat(){
  for (let i = 0; i < 3; i++){
    for (let x in nominees){
      if (isNomineeAtCapacity[x] == false) {
        for (let y in judges){
            var judgeCatList = getJudgeCat(y);
            var nomCatList = getNomineeCat(x);
            if (nomCatList !== null) {
              for (let k = 0; k < nomCatList.length; k++){
                for (let m = 0; m < judgeCatList.length; m++){
                  if (judgeCatList[m] == nomCatList[k]){
                    if (isJudgeAtCapacity(y) == false) {
                      matches[x] = y;
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
  var set = true;
  while(set !== false) {
    matchSubcat();
    matchCat();
    set = matchCheck();
  }
}