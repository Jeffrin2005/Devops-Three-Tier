const authorizeRoles = (roles = []) => {
  return (req, res, next) => {
    try {
      if (!roles.length) return next();
      if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ success: false, error: "Forbidden" });
      }
      next();
    } catch (error) {
      return res.status(500).json({ success: false, error: "Auth error" });
    }
  };
};

export default authorizeRoles;
