
const UserService = require('./Userservice');
const { models: UserModel } = require('./UserModel')
const mailer = require('nodemailer')

const login = async (email, password) => {
    try {
        return await UserService.login(email, password);
    } catch (error) {
        return false;
    }
}
const register = async (name, firstName, lastName, phone, email, password, gender,
    dob, avatar, point, createdAt, updatedAt, address, longitude, latitude,
    status, role, isLogin, isActive, verificationCode,
    isVerifiedPhone, isVerifiedEmail) => {
    try {
        return await UserService.register(name, firstName, lastName, phone, email, password, gender,
            dob, avatar, point, createdAt, updatedAt, address, longitude, latitude,
            status, role, isLogin, isActive, verificationCode,
            isVerifiedPhone, isVerifiedEmail);

    } catch (error) {
        return false;
    }
}
const loginGoogle = async (email, name, avatar) => {
    try {
        return await UserService.loginGoogle(email, name, avatar);
    } catch (error) {
        return false;
    }
}

const deleteUser = async (email) => {
    try {
        return await UserService.deleteUser(email);

    } catch (error) {
        return false;
    }
}
const updateUser = async (email, password, name, description, gender, dob, avatar, role, createAt, updateAt, isLogin) => {
    try {
        return await UserService.updateUser(email, password, name, description, gender, dob, avatar, role, createAt, updateAt, isLogin);

    } catch (error) {
        return false;
    }
}
const getAllUser = async (page, size) => {
    try {
        return await UserService.getAllUser(page, size);
    } catch (error) {
        throw error;
    }
}
const search = async (email) => {
    try {
        return await UserService.search(email);
    } catch (error) {
        throw error;
    }
}
const changePassword = async (email, oldPassword, newPassword) => {
    try {
        return await UserService.changePassword(email, oldPassword, newPassword);
    } catch (error) {
        throw error;
    }
}
const transporter = mailer.createTransport({
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    auth: {
        user: 'nguyenvanson2622003@gmail.com',
        pass: 'wzbnwoqyymntiavu'
    },
    tls: { rejectUnauthorized: false }
})


const sendMail = async (email, subject, content) => {
    try {
        const mailOptions = {
            from: "Lucas <nguyenvanson2622003@gmail.com>",
            to: email,
            subject: subject,
            html: content
        }
        return await transporter.sendMail(mailOptions);

    } catch (error) {
        console.log("Send email error:", error);
    }
    return false;
}
const sendVerifyCode = async (email, subject, verifyCode) => {

    try {
        const mailOptions = {
            from: "Lucas <nguyenvanson2622003@gmail.com>",
            to: email,
            subject: subject,
            html: "Your authentication code is : " + verifyCode
        }
        await UserModel.updateOne({ email }, { verificationCode: verifyCode, });

        return await transporter.sendMail(mailOptions);

    } catch (error) {
        console.log("Send email error:", error);
    }
    return false;
}
const verifyCode = async (email, verifyCode) => {
    try {
        const user = await UserModel.findOne({ email });
        console.log(user)
        if (user) {
            if (user.verificationCode === verifyCode) {
                console.log(user.verificationCode)
                await UserModel.updateOne({ email }, { isVerified: true });
                return true;
            } else {
                return false;

            }
        } else {
            return false;
        }
    } catch (error) {
        console.log("Verify email error:", error);

    }
}
const getById = async (id) => {
    try {
        return await UserService.getById(id);
    } catch (error) {
        return null;
    }
}

module.exports = {
    login, register, deleteUser,
    updateUser, getAllUser, search,
    changePassword, sendMail, sendVerifyCode,
    verifyCode, loginGoogle, getById
};