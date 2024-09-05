import client from "@/api/client";

export async function test() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  const data = await response.json();
  return data;
}
