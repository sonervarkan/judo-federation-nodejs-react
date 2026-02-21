const roleMiddleware = (requiredRoles) => {
    return (req, res, next) => {
        
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized access: User not found." });
        }

        const hasPermission = Array.isArray(requiredRoles)
            ? requiredRoles.includes(req.user.role)
            : req.user.role === requiredRoles;

        if (!hasPermission) {
            return res.status(403).json({ 
                message: `Access denied. You do not have the necessary authorization for this operation.` 
            });
        }

        next(); 
    };
};

module.exports = roleMiddleware;