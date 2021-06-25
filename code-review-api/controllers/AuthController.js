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

  // async create(req, res) {
  //   const { note, email } = req.body;
  //   const noteData = { note };
  //   await db.collection(email).add(noteData)
  //     .then(() => console.log('new Note written to database'));
  //   return res.json(noteData);
  // },

  // async update(req, res) {
  //   const { note, email, id } = req.body;
  //   const noteData = { note };
  //   await db.collection(email).doc(id).set(noteData)
  //     .then(() => console.log('Note updated to database'));
  //   return res.json(noteData);
  // },


  // async delete(req, res) {
  //   const { email, id } = req.params;
  //   await db.collection(email).doc(id).delete()
  //     .then(() => console.log('Note updated to database'));
  //   return res.json(id);
  // },
}



