import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({fetch}) => {
  const res1 = await fetch('http://localhost:8000/nominations');
  const res2 = await fetch('http://localhost:8000/nominees')

  if (res1.ok && res2.ok) {
    const noms = await res1.json();
    const nominees = await res2.json();

    return {
      props: {
        nominations: noms,
        nominees: nominees
      }
    };
  }
}

export const actions: Actions = {
  accept: async ({request}) => {
    const formData = await request.formData();
    const data: {[name: string]: any} = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    data['action'] = data['nomineeId'] == 0 ? 'CREATE' : 'MERGE';
    console.log(data);
    const res = await fetch('http://localhost:8000/nominations/review', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    
  },
  reject: async ({request}) => {
    const formData = await request.formData();
    const data: {[name: string]: any} = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    data['action'] = 'REJECT';
    console.log(data);
    const res = await fetch('http://localhost:8000/nominations/review', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
  }
}