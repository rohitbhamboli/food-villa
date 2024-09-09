import mongoose from "mongoose";

const connect = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((data) => {
      console.log(`Database connected to ${data.connection.host}`);
    })
    .catch((error) => {
      console.log(`Error connecting db => ${error}`);
    });
};
export default connect;
