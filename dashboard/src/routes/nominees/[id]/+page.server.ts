import { Exit } from "carbon-icons-svelte";
import type { Actions, PageServerLoad } from "./$types";

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

export const actions: Actions = {
  default: async ({request, params}) => {
    const formData = await request.formData();
    const data: { [name: string]: any } = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    //console.log(data);
    const res = await fetch(`http://localhost:8000/nominations/${params.id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
       'Content-type': 'application/json; charset=UTF-8',
    }
    })
    .then(res => res.json());
    //console.log(res);
  }
}