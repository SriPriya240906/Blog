const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  dbName: 'blogdb'
})
  .then(async () => {
    console.log('✅ Connected to MongoDB');

    try {
      const newUser = new User({ username: 'test123', password: 'test123' });
      await newUser.save();
      console.log('✅ User saved successfully');
    } catch (err) {
      console.error('❌ Error saving user:', err);
    }

    mongoose.connection.close();
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
  });