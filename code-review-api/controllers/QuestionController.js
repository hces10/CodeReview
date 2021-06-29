const Question = require('../models/Question')

module.exports = {

  async list(req, res) {
    const { email } = req.query;
    try {
      const questionData = await Question.find({userEmail: email});
      return res.json({ questionData });
    } catch (err) {
      return res.status(400).send({ error: 'GET failed' })
    }
  },

  async save(req, res) {
    try {
      const questionData = await Question.create(req.body);
      return res.json({ questionData });
    } catch (err) {
      return res.status(400).send({ error: 'Registration failed' })
    }
  },
}



