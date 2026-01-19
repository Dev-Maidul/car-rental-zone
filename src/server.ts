import app from './app';
import { ENV } from './config/environment';
import { connectDB } from './config/database';
import { initTables } from './config/initTables';

const startServer = async () => {
  await connectDB();
  await initTables();

  app.listen(ENV.PORT, () => {
    console.log(`Server running on port ${ENV.PORT}`);
  });
};

startServer();
