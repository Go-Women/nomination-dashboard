import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({fetch}) => {
  const res = await fetch('http://localhost:8000/judges');
  if (res.ok) {
    const judges = await res.json();
    return {
      props: {judges: judges}
    };
  }
}