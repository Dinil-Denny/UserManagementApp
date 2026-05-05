import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchAllUsers } from '../../store/slices/adminUsersSlice';

import StatCards from "@components/admin/summeryCards";
import UsersTable from "@components/admin/userTable";
import { Button } from '@components/ui/button'; 
import { Plus } from 'lucide-react';

interface User {
  _id: string;
  username: string;
  email: string;
  profileImgURL?: string;
  isActive: boolean;
}

const users : User[] = [
  {
    _id:'1',
    username:'Dinil',
    email:'email@gmail.com',
    profileImgURL : '',
    isActive:true,
  },
    {
    _id:'2',
    username:'Amal',
    email:'email@gmail.com',
    profileImgURL : '',
    isActive:false,
  },
    {
    _id:'3',
    username:'Babu',
    email:'email@gmail.com',
    profileImgURL : '',
    isActive:false,
  },
    {
    _id:'4',
    username:'Sunil',
    email:'email@gmail.com',
    profileImgURL : '',
    isActive:true,
  },
]

const AdminDashboard = () => {
  const dispatch = useDispatch
  return (
    <div className="ms-10 me-10">
      <StatCards stats={{ total: 22, active: 18, blocked: 4 }} />
      <UsersTable users={users}/>
    </div>
  );
};

export default AdminDashboard;
