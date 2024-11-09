  require('dotenv').config();
  const bcrypt = require('bcryptjs');
  const jwt = require('jsonwebtoken');
  const knex = require('../config/knex');
  const { validateRequiredFields } = require('../utils/validationHelper');


  exports.signup = async (req, res) => {
    try {
      const { email, name, password } = req.body;

      const requiredValidation = validateRequiredFields({ name, email, password });
      if (!requiredValidation.isValid) {
        return res.status(400).json({ message: requiredValidation.message });
      }

      const user = await knex('users').where({ email }).first();
      if(user){
        return res.status(400).json({ message: 'Email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const [newUser] =await knex('users').insert({ email, name, password: hashedPassword }).returning('*');

      const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '2d'});
      res.status(201).json({ message: 'User created',
        token: token,
       });
    } catch (error) {
      res.status(400).json({ message: 'User creation failed', error: error.message });
    }
  };

  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const requiredValidation = validateRequiredFields({ email, password });
      if (!requiredValidation.isValid) {
        return res.status(400).json({ message: requiredValidation.message });
      }
      const user = await knex('users').where({ email }).first();
      if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
      } else {
        res.status(400).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
