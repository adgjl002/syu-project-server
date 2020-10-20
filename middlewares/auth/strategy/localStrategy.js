const LocalStrategy = require('passport-local')
const User = require('../../../models/users')

module.exports = new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pw'
},
    (username, password, done) => {
        User.GetList({ email: username })
            .then(user => {
                if (!user) {
                    return done(null, false)
                }
                console.log("EMAIL >> " + username)
                console.log("PASSWORD >> " + password)
                console.log("SUCCESS >> " + user.password)
                if (password !== user.password) {
                    return done(null, false)
                }

                // if (user.type !== "local") {
                //     return done(null, false)
                // }
                
                return done(null, user)
            })
            .catch(err => {
                return done(err)
            })
    }
)