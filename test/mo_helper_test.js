const mongoose = require('mongoose');

mongoose.connect("mongo://localhost/employee-tracker", {useNewUrlParser: true});

mongoose.connection
    .once("open", () => console.log('Connected'))
    .on("error", error => {
        console.log("Your Error", error);
    });
