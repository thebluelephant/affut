import { handleAuth, handleCallback, handleLogin, handleLogout } from "@auth0/nextjs-auth0";

const afterCallback = async (req, res, session, state) => {
  return session;
}

export default handleAuth({  
  async callback(req, res) {
    try {
      await handleCallback(req, res, {afterCallback});
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
  async login(req, res) {
    await handleLogin(req, res, {
      returnTo: 'http://localhost:3000/checkout'
    });
  },
  async logout(req, res) {
    await handleLogout(req, res, {
      returnTo: 'http://localhost:3000/hello'
    });
  },
});

