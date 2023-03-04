const judges = [];
const nominees = [];
const matches = {};
//Change to dictionary
//Add population functions for dic

function getJudgeSubCat(judge){
  //check for empty or other
  //will be multipe
    var Subcat = "Math";
    return Subcat;
}

function getNomineeSubCat(nominee){
  //check for empty or other
  //will be multipe
    var Subcat = "Math";
    return Subcat;
}

function getJudgeCat(judge){
  //check for empty or other
  //will be multipe
    var Cat = "Math";
    return Cat;
}

function getNomineeCat(nominee){
  //check for empty or other
  //will be multipe
    var Cat = true;
    return Cat;
}

function getJudgeCapacity(judge){
  var cap = 3;
  return cap;
}

function matchSubcat(){
  for (let i = 0; i < 3; i++){
    for (let x = 0; x < nominees.length; x++){
      for (let y = 0; y < judges.length; y++){
            if (getJudgeSubCat(y) == getNomineeSubCat(x)){
              if (getJudgeCapacity(y) == true) {
                matches[x] = y;
              }
            }
            else {
                if (getJudgeCat(y) == getNomineeCat(x)) {
                  if (getJudgeCapacity(y) == true) {
                    matches[x] = y;
                  }
                }
            }
      }
    }
}
}
