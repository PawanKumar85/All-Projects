export const getClientIp = (req) => {
  const ip =
    req.headers["cf-connecting-ip"] || // Cloudflare
    req.headers["x-real-ip"] || // Nginx
    req.headers["x-forwarded-for"] || // Other proxies
    req.socket.remoteAddress; // Direct connection

  return ip;
};
