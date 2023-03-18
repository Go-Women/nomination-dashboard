import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({fetch, params}) => {
  const res = await fetch(`http://localhost:8000/settings`);
  if (res.ok) {
    const cohort = await res.json();
    return {
      props: {cohort: cohort}
    };
  }
};