const mongoose = require('mongoose');
//     mongoose.connect('mongodb://127.0.0.1:27017/' + config.env.database.name, options, function (err, db) {});
    mongoose.connect(process.env.MONGO_PATH +  process.env.DATABASE_NAME, function (err, db) {
    if (err) {
        console.log("enter12345678=================")
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log("enter12345678=================sdbsdbd")
        console.log('Connected to ' + process.env.DATABASE_NAME);
    }
});

