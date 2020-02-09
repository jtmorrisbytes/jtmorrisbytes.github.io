
const passport = require('passport')
function verifyGithubUser(accessToken,RefreshToken,profile,cb) {
    if(!accessToken || !RefreshToken || !profile){
        return cb(("OOPS SOMETHING HAPPENED"), null)
    }
    return cb(null, {
        authType:"github",
        name:"testuser",
        testing:true
    })
}

const GithubStrategy =
    new (require('passport-github').Strategy)({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL:process.env.CALLBACK_URL ||"http://localhost:3000/auth/github/callback"
        },verifyGithubUser);
passport.use(GithubStrategy)
module.exports = passport