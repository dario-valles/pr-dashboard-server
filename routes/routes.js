const authGithubController = require('../controllers/auth.github.controller');
const authJwtController = require('../controllers/auth.jwt.controller');
const webhookController = require('../controllers/webhook.controller');
const pullrequestController = require('../controllers/pullrequest.controller');
const repoController = require('../controllers/repo.controller');
const userController = require('../controllers/user.controller');
const githubMiddleware = require('../middleware/github');
const requireAuth = require('../middleware/requireAuth');

// WSocket as class for dependency injection test
const WSocket = require('../controllers/websockets.controller');
const { io } = require('../services/socket');
const webSocketController = new WSocket({ io });

module.exports = app => {
  // Authentication
  app.get('/v3/auth/github', authGithubController.auth());
  app.get('/v3/auth/github/private', authGithubController.private());
  app.get(
    '/v3/auth/callback',
    authGithubController.callback(),
    authJwtController.generateUserToken
  );

  // Current User
  app.get('/v3', requireAuth(), userController.me);

  // Pull requests
  app.get('/v3/pullrequests', pullrequestController.listAll);
  app.patch(
    '/v3/pullrequests/:id/seen',
    requireAuth(),
    pullrequestController.seen
  );
  app.get('/v3/pullrequests/count', requireAuth(), pullrequestController.count);

  // Repositories
  app.get('/v3/repos', requireAuth(), repoController.listAll);
  app.get(
    '/v3/repos/:id/pullrequests',
    requireAuth(),
    repoController.listPullrequests
  );
  app.post('/repos/socket', repoController.socket);

  // Repository settings
  app.patch('/v3/repos/:id/color', requireAuth(), repoController.color);

  // Github Webhooks
  app.post('/v3/webhooks', githubMiddleware, webhookController.newEvent);
  app.patch('/v3/repos/:id/enable', requireAuth(), webhookController.enable);
  app.patch('/v3/repos/:id/disable', requireAuth(), webhookController.disable);

  // Temporary Websockets communication
  app.get('/pr-update', webSocketController.test);
  app.get('/repos-update', webSocketController.reposUpdate);
};
