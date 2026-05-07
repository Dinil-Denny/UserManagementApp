//interface for users - shape of return data form server & to display in admin dashboard table
export interface User {
  id: string;
  username: string;
  email: string;
  profileImgURL?: string;
  isBlocked: boolean;
};
