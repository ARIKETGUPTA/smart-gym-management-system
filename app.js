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
const paymentRoutes = require("./backend/routes/paymentRoutes");

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

app.get("/register",(req,res)=>{

    res.sendFile(
        path.join(
            __dirname,"frontend",
            "register.html"
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

app.get("/payment-page", (req, res) => {

    res.sendFile(
        path.join(__dirname,"frontend","payment.html")
    );

});

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
    "/admin-dashboard-page",
    (req,res)=>{

        res.sendFile(

            path.join(
                __dirname,
                "frontend",
                "admin-dashboard.html"
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

app.get("/scan-page",(req,res)=>{

    res.sendFile(

        path.join(
            __dirname,"frontend",
            "scan.html"
        )

    );

});

app.get("/forgot-password", (req, res) => {

    res.sendFile(
        path.join(__dirname, "frontend", "forgot-password.html")
    );

});

app.get(
    "/reset-password/:token",
    (req,res)=>{

        res.sendFile(
            path.join(
                __dirname,
                "frontend",
                "reset-password.html"
            )
        );

});

app.use("/payment",paymentRoutes );
app.use("/api/attendance",attendanceRoutes);
app.use("/auth",authRoutes);
app.use("/attendance",attendanceRoutes);
app.use( "/subscription", subscriptionRoutes );
app.use("/dashboard", dashboardRoutes);
app.use( "/admin", adminRoutes );

app.use(express.static( path.join(__dirname,"frontend")));

app.listen(PORT , () =>{
    console.log("server is running in port 5000");
});
