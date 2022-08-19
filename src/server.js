import app from './app';

require("dotenv/config");

export const PORT = process.env.PORT || 3000;

app.listen(5000, () => {
  console.log('Listening on port 5000 /' + PORT);
})