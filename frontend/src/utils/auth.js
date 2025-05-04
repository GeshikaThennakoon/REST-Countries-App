// NEW CODE — SUPPORTS MULTIPLE USERS
export const registerUser = (username, password) => {
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Check if user already exists
  const userExists = existingUsers.some((u) => u.username === username);
  if (userExists) {
    alert("Username already exists");
    return false;
  }

  const newUser = { username, password };
  const updatedUsers = [...existingUsers, newUser];
  localStorage.setItem("users", JSON.stringify(updatedUsers));
  return true;
};

export const loginUser = (username, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    return true;
  }
  return false;
};

export const logoutUser = () => {
  localStorage.removeItem("currentUser");
};

// Check login status
export const isLoggedIn = () => {
  return localStorage.getItem("loggedIn") === "true";
};


