export class UserEntity{
    constructor(
        public id : string | undefined,
        public name : string,
        public email : string,
        public password : string,
        public role : 'user' | 'admin',
        public isBlocked : boolean,
        public profileImgURL ?: string,
        public createdAt ?: Date,
        public updatedAT ?: Date,
    ){};
};