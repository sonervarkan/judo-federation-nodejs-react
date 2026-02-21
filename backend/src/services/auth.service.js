const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {User} = require("../models");

const login = async (email, password) => {
    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new Error("Email or password is incorrect");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Email or password is incorrect");
        }

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        const safeUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        return { token, user: safeUser };

    } catch (error) {
        console.error("LOGIN SERVICE ERROR:", error);
        throw error;
    }
};

module.exports = { login };
