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
      console.log(data);  
      const res = await fetch(`http://localhost:8000/nominations/review`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      })
      .then(res => res.json())
    } else {
      console.log(data);  
      const res = await fetch(`http://localhost:8000/nominations/review`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      })
      .then(res => res.json())
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
    console.log(data);
    const res = await fetch(`http://localhost:8000/nominations/review`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    .then(res => res.json())
  }
};
