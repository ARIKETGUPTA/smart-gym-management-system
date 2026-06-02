require("dotenv").config();
const express = require('express');
const app = express();
const connectDB = require('./backend/config/db');
const attendanceRoutes = require("./backend/routes/attendanceRoutes");
const authRoutes =  require("./backend/routes/authRoutes");
const subscriptionRoutes = require("./backend/routes/subscriptionRoutes");
const cors = require("cors");
const dashboardRoutes = require("./backend/routes/dashboardRoutes");
const adminRoutes = require("./backend/routes/adminRoutes");
const path = require("path");

app.use(cors());

app.use(express.json());
app.set('view engine', 'ejs');

connectDB();

app.get("/",(req,res)=>{

    res.sendFile(
        path.join(
            __dirname,
            "frontend",
            "login.html"
        )
    );

});

app.get("/dashboard-page",(req,res)=>{

    res.sendFile(
        path.join(
            __dirname,
            "frontend",
            "dashboard.html"
        )
    );

});

app.use("/api/attendance",attendanceRoutes);
app.use("/auth",authRoutes);
app.use("/attendance",attendanceRoutes);
app.use( "/subscription", subscriptionRoutes );
app.use("/dashboard", dashboardRoutes);
app.use( "/admin", adminRoutes );
app.use(
    express.static( path.join(__dirname,"frontend"))
);

app.listen(5000 , () =>{
    console.log("server is running in port 5000");
});
