//Code Tip
// 각 인증모듈을 Import하여 passport에 사용하도록함
// 현재 구조는 local, facebook, naver, kakao passport로 인증 한 뒤 성공하면 Token을 반환
// 이후 모든 권한이 필요한 api 요청에 jwt Strategy를 이용하여 인증받으면 됨
// middleware로 passport.authenticate("사용할 Strategy 이름")을 넣으면 해당 인증수단으로 인증처리함.

const passport = require('passport');
const local = require('./strategy/localStrategy.js');

passport.use(local)

//Passport 각 인증 Strategy에서 완료된 뒤 아래 함수로 넘어옴
passport.serializeUser((user, done) => {
    done(null, user);
});

//SerializeUser에서 넘긴 값을 req.user로 넣어줌
passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;