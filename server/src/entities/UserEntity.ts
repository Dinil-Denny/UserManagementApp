//Entities: The "Pure" version of your data.  They define what the data looks like (e.g., a User has username, email, password).
export class UserEntity{
    constructor(
        public id : string | undefined,
        public username : string,
        public email : string,
        public password : string,
        public role : 'user' | 'admin',
        public isBlocked : boolean,
        public isVerified : boolean,
        public profileImgURL ?: string,
        public createdAt ?: Date,
        public updatedAT ?: Date,
    ){};
};