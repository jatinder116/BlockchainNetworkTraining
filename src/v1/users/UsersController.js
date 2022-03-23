const User = require('./usersModel');
const mongoose = require('mongoose');
const sendEmail = require('./../../../helper/sendMail');

class UsersController{


    // upload(a,b,c){
    //     return (req,res,done) =>{
            
    //     }
    // }
    async getUsers(page){
        try{
            console.log('page...', page);
            const limit = 5;
            const pageNo = await page ? page-1 : 0;
            const skip = pageNo*limit;
            console.log('skip......', skip);
            const usersList = await User.aggregate([
                {
                    $project: { 
                        name: 1, contact: 1, address: 1, email: 1, created_at: 1,
                        dob: { 
                            $dateToString: { format: "%d/%m/%Y", date: "$dob" } 
                        },
                        _id : {
                            $toString : "$_id"
                        }
                    }
                },
                {
                    $sort: {
                        _id: -1
                    }
                }
            ]).skip(skip).limit(limit);
            console.log('LIST///////////....', usersList);
            return usersList;
        }
        catch (err) {
            console.log(err);
        }
    }

    async addUser(req) {
        try {
            // console.log('URLL',req.protocol); //req.get('host');
            let data = req.body;
            data.address = await this.createAdressObj(req);
            console.log("vnsdvsv==",data)
            const newUser = await User.create(data);
            const sendMail = await new sendEmail(newUser, `http://localhost:3000/users/resetPassword/${newUser['_id']}`).sendMail();
            return {
                status: "success",
                data: newUser
            };      
        }
        catch (err) {
            console.log('ADD USER',err);
        }
    }

    async showEditUserForm(id){
        // console.log('OBJECT ID',mongoose.Types.ObjectId(id));
        try {
            const user = await User.aggregate([
                {
                    $match: {
                        _id: mongoose.Types.ObjectId(id)
                    },
                },
                {
                    $project: { 
                        name: 1, contact: 1, address: 1, email: 1,
                        dob: { 
                            $dateToString: { format: "%Y-%m-%d", date: "$dob" } 
                        },
                        _id : {
                            $toString : "$_id"
                        }
                    }
                },
                {
                    $sort: {
                        name : 1
                    }
                }
            ]);

            return user;
        }
        catch(err){
            console.log('SHOW EDIT USER FORM',err);
        }
    }


    async editUser(req) {
        try {
            let data = req.body;
            data.address = await this.createAdressObj(req);
            const editedUser = await User.findByIdAndUpdate( req.params.id  , data, {
                new : true,
                runValidators : true
            });
            return {
                status: "success",
                data: editedUser
            };      
        }
        catch (err) {           
            console.log('EDIT USER',err);
        }
    }

    async deleteUser(req) {
        try {
            const deleteUser = await User.findByIdAndDelete(req.params.id);  
            return deleteUser; 
        }
        catch (err) {
            console.log(err);
        }
    }

    async resetPw(req){
        try{
            console.log('......', req.body.password);
            const updatePw = await User.findByIdAndUpdate(req.params.id, {
                'password' : req.body.password,
                'is_verified' : true
            });
            return updatePw;
        }
        catch(err){
            console.log(err);
        }
    }

    createAdressObj(req){
        return new Promise( (resolve, reject)=>{
            resolve( {
                "line1": req.body.line1,
                "line2": req.body.line2,
                "city": req.body.city,
                "state": req.body.state,
                "zip": req.body.zip
            })
        })
    }


}

module.exports = UsersController;
