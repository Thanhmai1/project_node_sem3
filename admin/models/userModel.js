const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose); // Yêu cầu gói 'mongoose-sequence'

// Định nghĩa schema cho người dùng
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address'] // Xác nhận định dạng email hợp lệ
    },
    password: {
        type: String,
        required: true // Bắt buộc phải có mật khẩu
    },
    createdAt: {
        type: Date,
        default: Date.now // Mặc định là ngày giờ hiện tại
    }
});

// Sử dụng plugin AutoIncrement để tự động tăng giá trị của trường 'id'
userSchema.plugin(AutoIncrement, { inc_field: 'id' });

// Tạo model 'User' dựa trên schema
const User = mongoose.model('User', userSchema);

// Xuất model 'User' để có thể sử dụng ở nơi khác
module.exports = User;
