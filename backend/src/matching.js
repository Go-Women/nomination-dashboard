const judges = [];
const nominees = [];
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


function getJudgeSubCat(judge){
    var Subcat = "Math";
    return Subcat;
}

function getNomineeSubCat(nominee){
    var Subcat = "Math";
    return Subcat;
}

function getJudgeCat(judge){
    var Cat = "Math";
    return Cat;
}

function getNomineeCat(nominee){
    var Cat = "Math";
    return Cat;
}

function matchSubcat(){
  for (let x = 0; x < nominees.length; x++){
    for (let y = 0; y < judges.length; y++){
          if (getJudgeSubCat(y) == getNomineeSubCat(x)){
              matches[x] = y;
          }
          else {
              if (getJudgeCat(y) == getNomineeCat(x)) {
                matches[x] = y;
              }
          }
    }
  }
}
