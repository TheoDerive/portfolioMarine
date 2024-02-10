export default async function getAllCategories() {
  const res = await fetch("/api/all-categories");
  const result = await res.json();
  console.log(result);

  return result;
}
