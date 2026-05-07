export interface IUsersResponseDTO {
  id: string | undefined;
  username: string;
  email: string;
  role: string;
  isBlocked: boolean;
  isVerified: boolean;
  isGoogleAuth: boolean;
  profileImgURL: string;
}

//DTO for returning all users & summery to dashboard
export interface IFetchAllUsersResponseDTO {
  users: IUsersResponseDTO[];
  summary: {
    total: number;
    active: number;
    blocked: number;
  };
}

// export class UserEntity{
//     constructor(
//         public id : string | undefined,
//         public username : string,
//         public email : string,
//         public password : string,
//         public role : 'user' | 'admin',
//         public isBlocked : boolean,
//         public isVerified : boolean,
//         public isGoogleAuth: boolean,
//         public profileImgURL ?: string,
//         public createdAt ?: Date,
//         public updatedAT ?: Date,
//         public refreshToken ?: string,
//     ){};
// };
