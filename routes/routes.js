const authGithubController = require('../controllers/auth.github.controller');
const authJwtController = require('../controllers/auth.jwt.controller');
const webhookController = require('../controllers/webhook.controller');
const pullrequestController = require('../controllers/pullrequest.controller');
const repoController = require('../controllers/repo.controller');
const userController = require('../controllers/user.controller');
const webSocketController = require('../controllers/websockets.controller');
const githubMiddleware = require('../middleware/github');
const requireAuth = require('../middleware/requireAuth');

module.exports = app => {
  // Authentication
  app.get('/v3/auth/github', authGithubController.auth());
  app.get('/v3/auth/github/private', authGithubController.private());
  app.get('/v3/auth/callback', 
    authGithubController.callback(),
    authJwtController.generateUserToken,
  );

  // Current User
  app.get('/v3/user/me', requireAuth(), userController.me);

  // Pull requests
  app.get('/v3/user/me/pullrequests', requireAuth(), pullrequestController.listAll);
  app.patch('/v3/user/me/pullrequests/:id/seen',
    requireAuth(),
    pullrequestController.seen,
  );
  app.get('/v3/user/me/pullrequests/count', requireAuth(), pullrequestController.count);

  // Repositories
  app.get('/v3/user/me/repos', requireAuth(), repoController.listAll);
  app.get('/v3/user/me/repos/:id/pullrequests',
    requireAuth(),
    repoController.listPullrequests,
  );
  app.post('/v3/user/me/repos/socket', repoController.socket);

  // Repository settings
  app.patch('/v3/user/me/repos/:id/color', requireAuth(), repoController.color);

  // Github Webhooks
  app.post('/v3/user/me/webhooks', githubMiddleware, webhookController.newEvent);
  app.patch('/v3/user/me/repos/:id/enable', requireAuth(), webhookController.enable);
  app.patch('/v3/user/me/repos/:id/disable', requireAuth(), webhookController.disable);

  // Temporary Websockets communication
  app.get('/pr-update', webSocketController.test);
  app.get('/repos-update', webSocketController.reposUpdate);
};
