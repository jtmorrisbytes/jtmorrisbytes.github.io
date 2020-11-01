// the user endpoint
const user = require("express").Router();

const redis = require("../lib/redis");
const { P_SETEX } = require("../lib/redis");
// 60 seconds times 30 minutes
const USER_CACHE_SECONDS = 60 * 30;

function checkUserLock() {
  return new Promise((resolve, reject) => {
    // console.log("getting user lock state");
    redis.P_GET("user.lock").then((reply) => {
      // console.log("got reply from redis", reply);
      if (reply == "false" || reply == null) {
        // console.log("user is not locked");
        resolve();
      } else {
        // wait for the lock to be released
        console.log("using polling to wait for the lock to be cleared");
        let intervalId = setInterval(() => {
          console.log("Polling user.lock");
          redis.GET("user.lock", (err, reply) => {
            if (err) {
              console.log("polling error", err);
              reject(err);
            } else {
              console.log("polling reply", reply, typeof reply);
              if (reply == null || reply == "false") {
                clearInterval(intervalId);
                resolve();
              }
            }
          });
        }, 1000);
      }
    });
  });
}

user.use((req, res, next) => {
  // check that another instance is writing
  // console.log("user preflight");
  checkUserLock().then(() => {
    redis.P_GET("user").then((reply) => {
      if (reply) {
        req.user = JSON.parse(reply);
        next();
      } else {
        return req.octoClient.users.getAuthenticated().then((r) => {
          if (r.data?.status > 399) {
            return Promise.reject(r.data);
          } else {
            // numerical value is in seconds
            console.log("taking the lock for user");
            return redis.P_SETEX("user.lock", 120, "true").then(() => {
              console.log("lock successful, updating user cache");
              return redis
                .P_SETEX("user", USER_CACHE_SECONDS, JSON.stringify(r.data))
                .then(() => {
                  console.log("cache update success. clearing lock");
                  return redis.P_SETEX("user.lock", 120, "false").then(() => {
                    console.log("clear lock success. calling next handler");
                    req.user = JSON.parse(r.data);
                    next();
                  });
                });
            });
          }
        });
      }
    });
  });
});

user.get("/", (req, res) => {
  let u = req.user;
  res.json({
    login: u.login,
    id: u.id,
    avatar_url: u.avatar_url,
    html_url: u.html_url,
    name: u.name,
    company: u.company,
    blog: u.blog,
    email: u.email,
    location: u.location,
    followers: u.followers,
    twitter_username: u.twitter_username,
  });
});

module.exports = {
  path: "/user",
  router: user,
};
