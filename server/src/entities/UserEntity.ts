export interface IUser{
    id : string;
    name : string;
    email : string;
    password : string;
    profileImgURL ?: string;
    role : 'user' | 'admin';
    isBlocked : boolean;
    createdAt ?: Date;
    updatedAT ?: Date;
};