import type { Actions, PageServerLoad } from "./$types";
import { page } from '$app/stores';

export const load: PageServerLoad = async ({fetch, params}) => {
  const res = await fetch(`http://localhost:8000/judges/${params.id}`);
  if (res.ok) {
    const judges = await res.json();
    return {
      props: {j: judges}
    };
  }
};

const codes = [
  {value: "c100", label: "Art"},
  {value: "c200", label: "Athletics"},
  {value: "c300", label: "Business"},
  {value: "c400", label: "Education"},
  {value: "c500", label: "Humanities"},
  {value: "c600", label: "Public Service/Government"},
  {value: "c700", label: "STEM"},
  {value: "c800", label: "Other"}
];

let pronouns = ["she/her", "he/him", "they/them"];

function getCategoryValues(categories: {value: string, label: string}[]) {
  let cleaned = [];
  for (const code in codes) {
    for (const category in categories) {
      if (categories[category].value == codes[code].value)
        cleaned.push(codes[code].value);
    }
  }
  return cleaned.join(",");
}

export const actions: Actions = {
  default: async ({request, params}) => {
    const formData = await request.formData();
    const data: { [name: string]: any } = {};
    // data['id'] = params.id;
    for (let field of formData) {
      const [key, value] = field;
      if (key == 'pronouns') {
        data[key] = pronouns[value];
      } else if (key == 'category') {
        data[key] = getCategoryValues(JSON.parse(value));
      } else if (key == 'previousJudge') {
        if (value) {
          data[key] = '1';
        } else {
          data[key] = '0';
        } 
      } else if (key == 'interested') {
        if (value) {
          data[key] = '1';
        } else {
          data[key] = '0';
        } 
      } else {
        data[key] = value;
      };
    }

    const res = await fetch(`http://localhost:8000/judges/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify({data}),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    .then(res => res.json())
    .then(res => console.log(res));
  }
};