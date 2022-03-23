const User = require('../users/usersModel');

class DashboardController{

    async countUsers(){
        try{
            const countUsers = await User.count();
            return countUsers; 
        }
        catch(err){
            console.log('GET USER COUNT ERROR', err);
        }
    }
}

module.exports = DashboardController;
