const User = require('../models/User')

module.exports = {

  async register(req, res) {
    const {email} = req.body;
    try {
      if (await User.findOne({ email })) return res.status(400).send({ error: 'User already exists' })
  
      const user = await User.create(req.body);
  
      return res.json({ user });
    } catch (err) {
      return res.status(400).send({ error: 'Registration failed' })
    }
  },
}



