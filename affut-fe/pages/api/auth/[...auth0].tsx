import { handleAuth, handleCallback, handleLogin } from "@auth0/nextjs-auth0";

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
});

