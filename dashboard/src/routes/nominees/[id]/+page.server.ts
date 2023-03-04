import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({fetch, params}) => {
  const res1 = await fetch(`http://localhost:8000/nominees/${params.id}`);
  const res2 = await fetch(`http://localhost:8000/keys`);

  if (res1.ok && res2.ok) {
    const nominee = await res1.json();
    const nominationIDs: any[] = JSON.parse(nominee.nominations);

    let nominationList: any[] = [];
    for (const child of nominationIDs) {
      const result = await fetch(`http://localhost:8000/nominations/${child['ID']}`);
      const nomination = await result.json();
      nominationList.push(nomination);
    }

    const keys = await res2.json();
    return {
      props: {
        n: nominee,
        nominations: nominationList,
        keys
      }
    };
  }
};