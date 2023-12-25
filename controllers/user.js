const User = require("../models/user");
async function handleGetAllUsers(req, res) {
  try {
    const allDbUsers = await User.find({});
    let html =
      '<table border="1"><thead><tr><th>First Name</th><th>Last Name</th><th>Email</th><th>Job Title</th><th>Gender</th></tr></thead><tbody>';

    allDbUsers.forEach((user) => {
      html += `<tr>
        <td>${user.firstName}</td>
        <td>${user.lastName ? user.lastName : "-"}</td>
        <td>${user.email}</td>
        <td>${user.jobTitle ? user.jobTitle : "-"}</td>
        <td>${user.gender ? user.gender : "-"}</td>
      </tr>`;
    });

    html += "</tbody></table>";
    res.send(html);
  } catch (err) {
    res.status(500).send("Error fetching users");
  }
}

async function handleGetUserById(req, res) {
  // const id = Number(req.params.id);
  // const user = users.find((user) => user.id === id);
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ msg: "user not found" });
  return res.json(user);
}
async function handleUpdateUserById(req, res) {
  // Edit user logic here
  await User.findByIdAndUpdate(req.params.id, { lastName: "sonavane" });
  return res.json({ status: "success" });
}
async function handleDeleteUserById(req, res) {
  // Delete user logic here
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "success" });
}

async function handleCreateNewUserById(req, res) {
  const { firstName, lastName, email, gender, jobTitle } = req.body;

  console.log(req.body);
  if (!firstName || !lastName || !email || !gender || !jobTitle) {
    return res.status(400).json({ msg: "All fields are required." });
  }

  try {
    // Check if the user already exists with the given email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User with this email already exists." });
    }

    // Create a new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      gender,
      jobTitle,
    });

    return res.status(201).json({ msg: "User created successfully.", id: newUser._id });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ msg: "Error creating user." });
  }
}


module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUserById,
};
