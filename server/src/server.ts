//code for starting the server and connecting to the port

import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const port : number | string = process.env.PORT || 5000;

app.listen(port,()=>console.log(`server started at port ${port}`));