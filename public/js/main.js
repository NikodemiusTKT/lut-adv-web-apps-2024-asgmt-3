document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#userForm");
  const getUsersButton = document.querySelector("#getUsers");
  const userList = document.querySelector("#userList");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await postUserData();
  });

  getUsersButton.addEventListener("click", getAndDisplayUsers);

  async function postUserData() {
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    try {
      const response = await fetch("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function getAndDisplayUsers() {
    try {
      const response = await fetch("/users");
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const { users } = await response.json();
      userList.innerHTML = "";
      users.forEach((user) => {
        const li = document.createElement("li");
        li.textContent = `${user.name} - ${user.email}`;
        userList.appendChild(li);
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }
});
