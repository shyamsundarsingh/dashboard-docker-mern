const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        // Authorization header get karo
        const authHeader = req.headers.authorization;

        // Header exist karta hai ya nahi
        if (!authHeader) {
            return res.status(401).json({
                message: "Authorization token is required"
            });
        }

        // Bearer TOKEN
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Token is missing"
            });
        }

        // JWT verify
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // User information request me attach karo
        req.user = decoded;

        // Next middleware/controller
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = authMiddleware;