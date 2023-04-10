import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, params }) => {
  const resMatch = await fetch(`http://localhost:8000/matches/${params.id}`);
  const resKeys = await fetch(`http://localhost:8000/keys`);

  if (resMatch.ok && resKeys.ok) {
    const match = await resMatch.json();
    const keys = await resKeys.json();

    const resNominee = await fetch(`http://localhost:8000/nominees/${match.nomineeID}`);
    const nominee = await resNominee.json();

    let nominations: any[] = [];
    const nominationIDs: any[] = JSON.parse(nominee.nominations);
    for (const child of nominationIDs) {
      const result = await fetch(`http://localhost:8000/nominations/${child['ID']}`);
      const nomination = await result.json();
      nominations.push(nomination);
    }

    return {
      props: {
        ID: params.id,
        match,
        nominee,
        nominations,
        keys
      }
    }
  }
}

export const actions: Actions = {
  default: async ({request}) => {
    const formData = await request.formData();
    const data: { [name: string]: any } = {};
    var verdict = '{';
    for (let field of formData) {
      const [key, value] = field;
      if (key === "nomineeID")
        data[key] = value;
      if (key === "nomQ1")
        verdict += '"nomQ1": "' + value + '"';
      if (key === "nomQ2")
        verdict += ', "nomQ2": "' + value + '"';
      if (key === "nomQ3")
        verdict += ', "nomQ3": "' + value + '"';
      if (key === "nomAdditionalInfo")
        verdict += ', "nomAdditionalInfo": "' + value + '"';
      if (key === "verdict")
        verdict += ', "verdict": ' + value;
    }
    verdict += '}';
    data["data"] = verdict;
    const res = await fetch('http://localhost:8000/nominees/verdict', {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(() => { throw redirect(303, '/nominees'); })
  }
}