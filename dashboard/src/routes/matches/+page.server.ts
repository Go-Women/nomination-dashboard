import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const res1 = await fetch(`http://localhost:8000/matches`);
  const res2 = await fetch(`http://localhost:8000/matches/review`);
  const res3 = await fetch(`http://localhost:8000/matches/judges`);
  const res4 = await fetch(`http://localhost:8000/matches/nominees`);
  const res5 = await fetch(`http://localhost:8000/matches/manual`);

  if (res1.ok && res2.ok && res3.ok && res4.ok && res5.ok) {
    const matches = await res1.json();
    const review = await res2.json();
    const judges = await res3.json();
    const nominees = await res4.json();
    const manualReview = await res5.json();
    return {
      props: { 
        matches: matches,
        judges: judges,
        nominees: nominees,
        manual: manualReview,
        suggestions: review
      }
    };
  }
};

export const actions: Actions = {
  manual: async ({request}) => {
    const formData = await request.formData();
    const data: { [name: string]: any } = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }

    const res = await fetch(`http://localhost:8000/matches/manual`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    .then(res => res.json())
    .then(res => console.log(res))
  },
  generate: async ({request}) => {
    const formData = await request.formData();
    const data: { [name: string]: any } = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }

    const res = await fetch(`http://localhost:8000/matches/data`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    .then(res => res.json())
    .then(res => console.log(res))
  },
  match: async ({request}) => {
    const formData = await request.formData();
    const data: { [name: string]: any } = {};
    for (let field of formData) {
      const [key, value] = field;
      if (key === 'nominee')
        data[key] = value;
      if (key === 'judges')
        data[key] = value.split(',');
      else
        data[key] = value
    }

    console.log(data);
    const res = await fetch(`http://localhost:8000/matches`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    .then(res => res.json())
    .then(res => console.log(res))
  }
};
