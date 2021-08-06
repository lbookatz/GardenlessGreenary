require('./db/connection');
const express = require('express');
const app = express();
const cors = require('cors');
const populateRouter = require('./db/populatedb')
const {plantRouter} = require('./Plant/plant.routes')
const {userRouter} = require("./User/user.routes");

const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())
app.use("/populate", populateRouter); 
app.use("/plant", plantRouter); 
app.use("/user", userRouter);


app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})
