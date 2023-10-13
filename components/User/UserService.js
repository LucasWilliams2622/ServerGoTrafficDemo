const UserModel = require('./UserModel')
const bcrypt = require('bcryptjs')

//http://localhost:3000/api/user/login
const login = async (email, password) => {
    try {
        const user = await UserModel.findOne({ email: email })
        if (user) {
            const result = bcrypt.compareSync(password, user.password);
            return result ? user : false;
        }
    } catch (error) {
        console.log('Login error' + error)
        return false;
    }
}
//http://localhost:3000/api/user/loginGoogle
const loginGoogle = async (email, avatar, name) => {
    try {
        const user = await UserModel.findOne({ email: email })
        if (user) {
            // user.isLogin = true;
            return user;
        } else {
            const newUser = { email, avatar, name };
            const u = new UserModel(newUser);
            await u.save();
            user.isLogin = true;

            return newUser;
        }
    } catch (error) {
        console.log('loginGoogle error' + error)
        return false;
    }
}
//http://localhost:3000/api/user/register
const register = async (name, firstName, lastName, phone, email, password, gender,
    dob, avatar, point, createdAt, updatedAt, address, longitude, latitude,
    status, role, isLogin, isActive, verificationCode,
    isVerifiedPhone, isVerifiedEmail) => {
    try {
        const existingUser = await UserModel.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Create a new user
        const newUser = await User.create({
            name,
            firstName,
            lastName,
            phone,
            email,
            password,
            gender,
            dob,
            avatar,
            point,
            address,
            longitude,
            latitude,
            status,
            role,
            isLogin: false,
            isActive: false,
            verificationCode: null,
            isVerifiedPhone: false,
            isVerifiedEmail: false
        });

        return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.log("Register error" + error)
        return false;
    }
}
const deleteUser = async (email) => {
    try {
        const user = await UserModel.findOne({ email: email })
        // console.log(user)
        {
            await UserModel.deleteOne(user)
        }
        return true;
    } catch (error) {
        console.log("Delete User  error", error);
        return false;

    }
}

const updateUser = async (email, password, name, description, gender, dob, avatar, role, createAt, updateAt, isLogin) => {
    try {
        const user = await UserModel.findOne({ email: email })
        if (user) {

            user.password = password ? password : user.password;
            user.name = name ? name : user.name;
            user.description = description ? description : user.description;

            user.gender = gender ? gender : user.gender;
            user.dob = dob ? dob : user.dob;
            user.avatar = avatar ? avatar : user.avatar;
            user.role = role ? role : user.role;

            user.createAt = createAt ? createAt : user.createAt;
            user.updateAt = updateAt ? updateAt : user.updateAt;
            user.isLogin = isLogin ? isLogin : user.isLogin;

            await user.save();
            console.log("INFO USER:", user);

            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Update User  error", error)
        return false;
    }
}
const search = async (email) => {
    try {
        // console.log("phoneNumber", email)
        return await UserModel.findOne(
            { email: email }
        )

    } catch (error) {
        return false;
    }
}
const getAllUser = async (page, size) => {
    try {
        // return data;
        return await UserModel.find();
        //  data.splice(index, 1);
    } catch (error) {
        console.log("List user Got an error: ", error);
        throw error;
    }
}
const changePassword = async (email, oldPassword, newPassword) => {
    try {
        const user = await UserModel.findOne({ email: email })
        if (user) {
            // console.log("INFO USER:", user);
            const isPasswordValid = await bcrypt.compare(oldPassword, user.password)
            if (isPasswordValid) {
                user.password = newPassword
                await user.save();
                return true;
            } else {
                return false
            }
        } else {
            return false;
        }
    } catch (error) {
        console.log("Change Password got an error: ", error);
        throw error;
    }
}

const getById = async (id) => {
    try {
        const user = await UserModel.findById({ _id: id });
        if (user != null) {
            return user
        } return false
    } catch (error) {
        console.log("Get product by id error " + error);
        return null;
    }
}

module.exports = {
    login, register, deleteUser, loginGoogle,
    updateUser, getAllUser, search, changePassword,
    getById,
};
