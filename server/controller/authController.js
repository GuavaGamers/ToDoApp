const { User } = require('../models');

const loginUser = async (req, res) => {
  try {
    const userData = req.body;
    const findUser = await User.findOne({ where: { email: userData.email } });

    if (!findUser) res.status(404).send('user does not exist...');

    if (findUser.password !== userData.password)
      res.status(400).send('password does not match. please try again...');

    console.log(`user ${findUser.email} has successfully logged in... `);
    res.status(200).json(findUser);
  } catch (error) {
    console.error(error);
  }
};

const signUpUser = async (req, res) => {
  try {
    const newUserData = req.body;
    // check if user exists already
    const findUser = await User.findOne({
      where: { email: newUserData.email },
    });

    if (findUser) res.status(500).send('user already exists...');

    const user = await User.create(newUserData);
    res.status(202).json(user);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { loginUser, signUpUser };
