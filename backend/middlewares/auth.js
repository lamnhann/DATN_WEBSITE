const User = require('../models/user');

const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

// Check if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors( async (req, res, next ) => {

    const { token } = req.cookies

    if(!token) {
        return next(new ErrorHandler('Bạn cần đăng nhập trước.', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);

    next()
})

// Handling users roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(
                new ErrorHandler(`Vai trò (${req.user.role}) không có quyền truy cập tài nguyên`, 403))
        }
        next()
    }
}