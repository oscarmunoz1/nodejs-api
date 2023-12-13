import "dotenv/config";

export default {
  port: process.env.PORT,
  dbUri: process.env.DB_URI,
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n"
  ),
  accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY?.replace(
    /\\n/g,
    "\n"
  ),
  refreshTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n"
  ),
  refreshTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY?.replace(
    /\\n/g,
    "\n"
  ),
};
