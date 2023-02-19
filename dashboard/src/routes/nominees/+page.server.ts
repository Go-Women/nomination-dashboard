import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({fetch, params}) => {
  const res = await fetch(`http://localhost:8000/nominees`);
  if (res.ok) {
    const nominees = await res.json();
    return {
      props: {nominees: nominees}
    };
  }
};