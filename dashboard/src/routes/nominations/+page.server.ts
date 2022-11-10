import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({fetch}) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (res.ok) {
    const nominations = await res.json();
    return {
      props: {nominations: nominations}
    };
  }
}