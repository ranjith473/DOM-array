const api = "https://randomuser.me/api";
const addUser = document.getElementById("user-btn");
const descsortbtn = document.getElementById("sort-desc");
const ascsortbtn = document.getElementById("sort-asc");
const userlist = document.getElementById("user-list");
const searchinput = document.getElementById("search");

const appState = [];

class User {
  constructor(title, firstname, lastname, gender, email) {
    this.name = `${title} ${firstname} ${lastname}`;
    this.email = email;
    this.gender = gender;
  }
}

addUser.addEventListener("click", async () => {
  const userData = await fetch(api, {
    method: "GET"
  });
  const userJson = await userData.json();
  const user = userJson.results[0];
  const classUser = new User(
    user.name.title,
    user.name.first,
    user.name.last,
    user.gender,
    user.email
  );
  appState.push(classUser);

  domRenderer(appState);
});

const domRenderer = (stateArr) => {
  userlist.innerHTML = null;
  stateArr.forEach((userobj) => {
    const userele = document.createElement("div");
    userele.innerHTML = `<div>
   Name: ${userobj.name}
    <ol>
    <li>${userobj.gender}</li>
    <li>${userobj.email}</li>
    </ol>
 </div>`;

    userlist.appendChild(userele);
  });
};

searchinput.addEventListener("keyup", (e) => {
  const filteredAppstate = appState.filter(
    (user) =>
      user.name.toLowerCase().includes(searchinput.value.toLowerCase()) ||
      user.gender.toLowerCase().includes(searchinput.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchinput.value.toLowerCase())
  );
  domRenderer(filteredAppstate);
});

descsortbtn.addEventListener("click", () => {
  const appStatecopy = [...appState];
  appStatecopy.sort((a, b) => (a.name < b.name ? 1 : -1));

  domRenderer(appStatecopy);
});

ascsortbtn.addEventListener("click", () => {
  const appStatecopy = [...appState];
  appStatecopy.sort((a, b) => (a.name < b.name ? -1 : 1));

  domRenderer(appStatecopy);
});
