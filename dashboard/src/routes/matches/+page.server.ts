import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, params }) => {
  const res = await fetch(`http://localhost:8000/matches`);
  if (res.ok) {
    const matches = await res.json();
    return {
      props: { matches: matches }
    };
  }
};

export const actions: Actions = {
  default: async ({request}) => {
    const formData = await request.formData();
    const data: { [name: string]: any } = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    console.log(data);
    const res = await fetch(`http://localhost:8000/matches`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    .then(res => res.json())
    .then(res => console.log(res))
  } 
};
