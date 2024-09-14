const {default: mongoose} = require('mongoose');

const connectDatabase = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    if(connect.connection.readyState === 1) {
        console.log('MongoDB connected successfully');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error(error);
  }
};

module.exports = connectDatabase;