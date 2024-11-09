const bcrypt = require('bcryptjs');
const knex = require('../config/knex');

exports.getProfile = async (req, res) => {
  const userId = req.user.id;
  const user = await knex('users').where({ id: userId }).select('id', 'email', 'name','bio','profile_picture','gender').first();
  res.json(user);
};

exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { name, password, bio, gender } = req.body;

  const updates = { name, bio, gender };

  if (password) {
    updates.password = await bcrypt.hash(password, 10);
  }

  if (req.file) {
    const host = req.get('host');
    const profilePictureURL = `${req.protocol}://${host}/uploads/${req.file.filename}`;
    updates.profile_picture = profilePictureURL;
  }
  
  await knex('users').where({ id: userId }).update(updates);
  res.json({ message: 'Profile updated' });
};

exports.deleteAccount = async (req, res) => {
  const userId = req.user.id;
  await knex('users').where({ id: userId }).del();
  res.json({ message: 'Account deleted' });
};
