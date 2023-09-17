export async function createNewToDo(obj) {
  let result = [];
  try {
    const fetchedResult = await fetch(
      "https://my-json-server.typicode.com/ChetanaMJyothi/todoapp/posts",
      {
        method: "POST",
        body: JSON.stringify({
          id: obj.id,
          title: obj.title,
          body: obj.body,
          isCompleted: false,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    result = await fetchedResult.json();
  } catch (err) {
    console.log(err);
  }
  console.log(result);
  return result;
}
export async function getToDoList() {
  let result = [];
  try {
    const fetchedRes = await fetch(
      "https://my-json-server.typicode.com/ChetanaMJyothi/todoapp/posts"
    );
    result = await fetchedRes.json();
    return result;
  } catch (err) {
    console.log(err);
  }
}
export async function updateToDo(obj) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${obj.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          id: obj.id,
          title: obj.title,
          body: obj.body,
          isCompleted: true,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}
export async function deleteToDo(obj) {
  try {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${obj.id}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.log(err);
  }
  return obj.id;
}
