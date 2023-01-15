const app = require("./src/app");

const APP_PORT = 4000;

app.listen(APP_PORT, () => {
  console.log(`Application is listening on port ${APP_PORT}`);
});
