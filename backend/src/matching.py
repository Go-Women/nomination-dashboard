judges = []
nominees = []
matches = {}

def getJudgeSubCat(judge):
    Subcat = "Math"
    return Subcat

def getNomineeSubCat(nominee):
    Subcat = "Math"
    return Subcat

def getJudgeCat(judge):
    Cat = "Math"
    return Cat

def getNomineeCat(nominee):
    Cat = "Math"
    return Cat

def matchSubcat():
  for x in nominees:
      for y in judges:
          if getJudgeSubCat(y) == getNomineeSubCat(x):
              matches[x] = y
          else:
              if getJudgeCat(y) == getNomineeCat(x):
                matches[x] = y
