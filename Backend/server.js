require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected");

    app.listen(port, '0.0.0.0', () => {
      console.log(`Server is running on port ${port}`);
    });
    
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1); 
  }
};

startServer();