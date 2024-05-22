const { User } = require('../models');

const loginUser = async (req, res) => {
  try {
    const userData = req.body;
    const findUser = await User.findOne({ where: { email: userData.email } });
    if (!findUser) res.status(404).send('user does not exist...');
    console.log(`user ${findUser.email} has successfully logged in... `);
    res.status(200).json(findUser);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { loginUser };
