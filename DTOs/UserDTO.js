class UserDTO {
    constructor(user) {
        this.userId = user.userId;
        this.fullName = user.fullName;
        this.email = user.email;
        this.phone = user.phone;
        this.departmentName = user.departmentName;
        this.address = user.address;
        this.dateOfBirth = user.dateOfBirth;
        this.gender = user.gender;
        this.userStatus = user.userStatus;
        this.createdAt = user.createdAt;
    }
}

module.exports = UserDTO;
