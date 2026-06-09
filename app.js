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
const PORT = process.env.PORT || 5000;
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

app.get( "/attendance-page", (req,res)=>{

        res.sendFile(

            path.join(
                __dirname,
                "frontend",
                "attendance.html"
            )

        );

    }
);

app.get(
    "/subscription-page",
    (req,res)=>{

        res.sendFile(

            path.join(
                __dirname,
                "frontend",
                "subscription.html"
            )

        );

    }
);

app.get(
    "/profile-page",
    (req,res)=>{

        res.sendFile(
            path.join(
                __dirname,
                "frontend",
                "profile.html"
            )
        );

    }
);

app.get(
    "/admin-members-page",
    (req,res)=>{

        res.sendFile(

            path.join(
                __dirname,
                "frontend",
                "admin-members.html"
            )

        );

    }
);

app.use("/api/attendance",attendanceRoutes);
app.use("/auth",authRoutes);
app.use("/attendance",attendanceRoutes);
app.use( "/subscription", subscriptionRoutes );
app.use("/dashboard", dashboardRoutes);
app.use( "/admin", adminRoutes );
app.use(
    express.static( path.join(__dirname,"frontend"))
);

app.listen(PORT , () =>{
    console.log("server is running in port 5000");
});
