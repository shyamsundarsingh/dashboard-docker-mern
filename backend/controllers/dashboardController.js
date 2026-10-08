const getDashboard = async (req, res) => {
    try {
        res.status(200).json({
            message: "Welcome to protected dashboard",
            user: req.user
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    getDashboard
};