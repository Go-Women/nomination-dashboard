import type { Actions, PageServerLoad } from "./$types";

import { dev } from "$app/environment";

let FUNCTIONS_KEY: string;
if (dev) {
  const { DEFAULT_KEY } = await import("$env/static/private");
  FUNCTIONS_KEY = DEFAULT_KEY;
} else {
  FUNCTIONS_KEY = `${process.env.DEFAULTKEY}`;
}

export const load: PageServerLoad = async ({fetch}) => {
  const res1 = await fetch(`https://nwhofapi.azurewebsites.net/api/nominations`, {headers:{'x-functions-key':FUNCTIONS_KEY}});
  const res2 = await fetch(`https://nwhofapi.azurewebsites.net/api/nominees`, {headers:{'x-functions-key':FUNCTIONS_KEY}});

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

var option: string;
function setSelectedValue(key: string) {
  var val  = key.split('select-row-b-');
  option = val[1];
}

export const actions: Actions = {
  accept: async ({request, params}) => {
    const formData = await request.formData();
    const data: { [name: string]: any } = {};

    var toCreate = false;
    for (let field of formData) {
      const [key, value] = field;
      if (key == 'nomineeID') {
        // setSelectedValue(key);
        if (value == '0') {
          // a new nominee needs to be created
          toCreate = true;
          data['action'] = 'CREATE';
        } else {
          // add nomination id with existing nominee
          data['action'] = 'MERGE';
          data['nomineeID'] = value;
          toCreate = false;
        }
      }

      // when a nomination is unique --> create nominee
      if (key == 'nominationID') {
        data['nominations'] = JSON.stringify([{"ID": value}]);
        data['nominationID'] = value;
      }

      if (key == 'firstName')
        data[key] = value;
      if (key == 'lastName')
        data[key] = value;
      if (key == 'yob')
        data[key] = value
      if (key == 'category')
        data[key] = value
      if (key == 'subcategory')
        data[key] = value
      if (key == 'subcategoryOther')
        data[key] = value
    }

    if (toCreate) {
      const res = await fetch(`https://nwhofapi.azurewebsites.net/api/nominations/review`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-functions-key': FUNCTIONS_KEY
        }
      });
    } else {
      const res = await fetch(`https://nwhofapi.azurewebsites.net/api/nominations/review`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-functions-key': FUNCTIONS_KEY
        }
      });
    }
  },
  reject: async ({request, params}) => {
    const formData = await request.formData();
    const data: { [name: string]: any } = {};

    for (let field of formData) {
      const [key, value] = field;
      data[key] = value
    }
    data['action'] = 'REJECT';
    const res = await fetch(`https://nwhofapi.azurewebsites.net/api/nominations/review`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'x-functions-key': FUNCTIONS_KEY
      }
    });
  }
};
