import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const resJudges = await fetch('http://localhost:8000/judges');
  const resNominees = await fetch('http://localhost:8000/nominees')

  if (resJudges.ok && resNominees.ok) {
    const judges: any[] = await resJudges.json();
    const nominees: any[] = await resNominees.json();
    let matches: Match[] = [];

    const catMap: { [key: string]: CategoryJudges } = {};

    for (let i = 0; i < judges.length; i++) {
      const judge = judges[i];
      const jc: JudgeCapacity = { id: judge.ID, capacity: judge.info['capacity'] };
      judge.info['category'].split(',').forEach((cat: string) => {
        creator(jc, cat, catMap);
      });
      judge.info['subcategory'].split(',').forEach((cat: string) => {
        creator(jc, cat, catMap);
      });
    }

    for (let i = 0; i < nominees.length; i++) {
      const nominee = nominees[i];

      for (let i = 0; i < 3; i++){
        if (!tryMatchSubcategory(nominee, catMap, matches)) {
          if (!tryMatchCategory(nominee, catMap, matches)) {
            matches.push({
              nominee: nominee.ID,
              matched: false,
              judge: undefined,
              category: nominee.category,
              subcategory: nominee.subcategory
            });
          }
        }
      }
    }

    return {
      props: { matches: matches }
    };
  }
}

function tryMatchSubcategory(nominee: any, catMap: { [key: string]: CategoryJudges }, matches: Match[]): boolean {
  const subcategories = nominee.subcategory.split(',');
  for (let c = 0; c < subcategories.length; c++) {
    let subcategory = subcategories[c];
    if (catMap[subcategory]) {
      for (let j = 0; j < catMap[subcategory].judges.length; j++) {
        const judge = catMap[subcategory].judges[j];
        if (judge.capacity > 0 && !isJudging(nominee.ID, judge.id, matches)) { 
          judge.capacity -= 1;
          matches.push({
            nominee: nominee.ID,
            matched: true,
            judge: judge.id,
            category: undefined,
            subcategory: subcategory
          });
          return true;
        }
      }
    }
  }
  return false;
};

function tryMatchCategory(nominee: any, catMap: { [key: string]: CategoryJudges }, matches: Match[]): boolean {
  const categories = nominee.category.split(',');
  for (let c = 0; c < categories.length; c++) {
    let category = categories[c];
    if (catMap[category]) {
      for (let j = 0; j < catMap[category].judges.length; j++) {
        const judge = catMap[category].judges[j];
        if (judge.capacity > 0 && !isJudging(nominee.ID, judge.id, matches)) { 
          judge.capacity -= 1;
          matches.push({
            nominee: nominee.ID,
            matched: true,
            judge: judge.id,
            category: undefined,
            subcategory: category
          });
          return true;
        }
      }
    }
  }
  return false;
};

function isJudging(nomineeId: number, judgeId: number, matches: Match[]): boolean {
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    if (match.judge == judgeId && match.nominee == nomineeId) return true;
  }
  return false;
}

function creator(jc: JudgeCapacity, cat: string, map: { [key: string]: CategoryJudges }) {
  if (map[cat]) {
    map[cat].judges.push(jc);
  } else {
    const cj: CategoryJudges = { cat: cat, judges: [jc] };
    map[cat] = cj;
  }
};

interface CategoryJudges {
  cat: string,
  judges: JudgeCapacity[]
};

interface JudgeCapacity {
  id: number,
  capacity: number
};

interface Match {
  nominee: number,
  matched: boolean,
  judge: number|undefined,
  category: string|undefined,
  subcategory: string|undefined
};