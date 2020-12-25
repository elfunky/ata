const router = require('express').Router();
const UserModel = require("../model/UserModel")

//Router To Render Manage Users Page
router.get('/', async(req, res) => {
    // UserModel.find((err, users) => {
    //     if (err)
    //         throw err;
    //     else{
    //         res.render('manageUsers/index', { users: users });
    //     }
           
    // })
    try {
        let users = await UserModel.find();
        return res.render('manageUsers/index', { users: users });
    } catch (error) {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
      
        // render the error page
        res.status(err.status || 500);
        res.render('error');
    }
});

//Route To Render Create User PAge
router.get('/create', (req, res) => {
    res.render('manageUsers/create');
});

//Route To Create New User
router.post('/create', (req, res) => {
    let newUser = new UserModel(req.body);
    newUser.save((err) => {
        if (err)
            throw err;
        else
            res.redirect('/manageUsers');
    });
});


//Route To Render Edit User Page
router.get('/edit/:userId', async(req, res)=>{
    try{
        let userData = await UserModel.findOne({_id: req.params.userId});
        return res.render('manageUsers/edit', {user: userData});
    }catch(err){
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
      
        // render the error page
        res.status(err.status || 500);
        res.render('error');
    }
});

//Router To Edit User Details
router.post('/edit', async(req, res)=>{
    try {
      await UserModel.findOneAndUpdate({_id: req.body._id}, {$set: req.body});
      res.redirect('/manageUsers');  
    } catch (error) {
        res.locals.message = error.message;
        res.locals.error = req.app.get('env') === 'development' ? error : {};
      
        // render the error page
        res.status(error.status || 500);
        res.render('error');
    }
});

//Route To Delete User
router.get('/delete/:userId', async(req, res)=>{
    try {
        await UserModel.findOneAndDelete({_id: req.params.userId});
        res.redirect('/manageUsers');
    } catch (error) {
        res.locals.message = error.message;
        res.locals.error = req.app.get('env') === 'development' ? error : {};
      
        // render the error page
        res.status(error.status || 500);
        res.render('error');
    }
})
module.exports = router;