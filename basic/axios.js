// axios == fetch

import axios from "axios";

// 비동기
// fetch().then().then().catch();
// axios().then().catch();

fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => response.json())
  .then((json) => console.log(json));

axios
  .get("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => {
    console.log(response);
    console.log(response.data);
  })
  .catch((err) => console.log(err));