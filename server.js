import {app} from "./app.js";

//server
app.listen(process.env.PORT, () => {
    console.log(`Server is running in port ${process.env.PORT} at ${process.env.ACCESS_MODE} mode`);
  }); 