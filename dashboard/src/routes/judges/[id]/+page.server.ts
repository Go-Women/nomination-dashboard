import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({fetch, params}) => {
  const res = await fetch(`http://localhost:8000/judges/${params.id}`);
  if (res.ok) {
    const judges = await res.json();
    return {
      props: {j: judges}
    };
  }
};