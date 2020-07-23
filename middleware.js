const firebase = require("./firebase");
const FirebaseService = require("./services/FirebaseService");
const UserService = require("./services/UserService");

module.exports = {
  verifyTokenAndCookie: async function verifyToken(req, res, next) {
    const sessionCookie = req.cookies.session_fancify;
    const authorization = req.header("Authorization");

    // If using authorisation header or cookie
    if (authorization) {
      const token = authorization.split(" ");

      try {
        const decodedToken = await firebase.auth().verifyIdToken(token[1]);
        res.locals.tokenUser = { ...decodedToken, id: decodedToken.uid };
        next();
      } catch (e) {
        req.log.error(e);
        res.boom.badRequest("Invalid token");
      }
    } else if (sessionCookie) {
      // Verify the session cookie. In this case an additional check is added to detect
      // if the user's Firebase session was revoked, user deleted/disabled, etc.
      firebase
        .auth()
        .verifySessionCookie(sessionCookie, true)
        .then((decodedToken) => {
          res.locals.tokenUser = { ...decodedToken, id: decodedToken.uid };
          next();
        })
        .catch((e) => {
          // Session cookie is unavailable or invalid. Force user to login.
          req.log.error(e);
          res.boom.badRequest("Invalid cookie");
        });
    } else {
      res.boom.unauthorized("Unauthorized Access");
    }
  },
  loadInternalUserAndSync: async (req, res, next) => {
    let user;

    if (!res.locals.tokenUser) {
      return res.boom.badImplementation(
        "loadInternalUser called without user token"
      );
    }

    const { id } = res.locals.tokenUser;

    try {
      const userRecord = await UserService.getUserById(id, {
        eager: ["subscriptions.plan"],
      });
      if (!userRecord) {
        const internalUser = await UserService.createUser(
          FirebaseService.parseUser(res.locals.tokenUser)
        );
        const userRecord = await UserService.getUserById(id, {
          eager: ["subscriptions.plan"],
        });
        user = userRecord;
      } else {
        user = userRecord;
      }
      if (user.subscriptions && user.subscriptions.length > 0) {
        const subscription = user.subscriptions.find(
          (s) => s.status === "active"
        );
        if (subscription) user.plan = subscription.plan;
      }
      // Attach and call next
      res.locals.user = {
        ...user,
        provider: res.locals.tokenUser.firebase.sign_in_provider,
        emailVerified: res.locals.tokenUser.email_verified,
      };

      return next();
    } catch (e) {
      req.log.error(e);
      return res.boom.badImplementation();
    }
  },
  isSelf: (req, res, next) => {
    const { userId } = req.params;
    const { tokenUser } = res.locals;

    // Developer Note: Always verify token before calling this middleware
    if (!userId) {
      return res.boom.badImplementation("Invalid parameters");
    }

    if (userId !== tokenUser.id) {
      return res.boom.unauthorized("unauthorized user for resource");
    }

    return next();
  },
};
