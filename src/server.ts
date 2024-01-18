import "dotenv/config";
import app from "./app";
import connectDB from './config/db'


connectDB();

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));