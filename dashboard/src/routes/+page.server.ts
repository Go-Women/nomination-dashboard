import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({fetch}) => {
  const res = await fetch('http://localhost:8000/');
  if (res.ok) {
    const nominations = await res.json();

    return {
      props: {nominations: nominations}
    };
  }
}