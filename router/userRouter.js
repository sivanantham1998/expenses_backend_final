let express=require("express")
const { registerUser, loginUser, logOut, authendicatedUser ,demo, postPlans, getPlans, userPlans, getsingleuser, prePostPlans} = require("../controller/userController")
// const { demo, postPlans } = require("../controller/Plancontroller")

let router=express.Router()


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logOut)

router.route("/plan").get(authendicatedUser,demo)
// router.route("/newplan").post(postPlans)
// router.route("/newplan").post(authendicatedUser,postPlans)
router.route("/preplan").post(prePostPlans)

router.route("/getplan").get(getPlans)
router.route("/userplan").get(authendicatedUser,userPlans)
router.route('/getsingle').get(getsingleuser)

module.exports=router