import { createApp } from './app';
import { ENV } from './config/env';

const app = createApp();

app.listen(ENV.PORT, () => {
  console.log('====================================================');
  console.log(`🌌 Luna Handmade Backend Server is running!`);
  console.log(`🚀 API Base URL: ${ENV.BASE_URL}/api`);
  console.log(`📁 Uploads Dir:  ${ENV.UPLOAD_DIR}`);
  console.log(`💾 Data Dir:     ${ENV.DATA_DIR}`);
  console.log(`🟢 Health Check: ${ENV.BASE_URL}/api/health`);
  console.log('====================================================');
});
