import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchAllUsers } from '../../store/slices/adminUsersSlice';

import SkeletonTable from '@components/admin/tableSkeleton';
import StatCards from "@components/admin/summeryCards";
import UsersTable from "@components/admin/userTable";
import { Button } from '@components/ui/button'; 
import { Plus } from 'lucide-react';
import AddUserDialog from '@components/admin/addUserDialog';

// interface User {
//   _id: string;
//   username: string;
//   email: string;
//   profileImgURL?: string;
//   isActive: boolean;
// }

// const userlist : User[] = [
//   {
//     _id:'1',
//     username:'Dinil',
//     email:'email@gmail.com',
//     profileImgURL : '',
//     isActive:true,
//   },
//     {
//     _id:'2',
//     username:'Amal',
//     email:'email@gmail.com',
//     profileImgURL : '',
//     isActive:false,
//   },
//     {
//     _id:'3',
//     username:'Babu',
//     email:'email@gmail.com',
//     profileImgURL : '',
//     isActive:false,
//   },
//     {
//     _id:'4',
//     username:'Sunil',
//     email:'email@gmail.com',
//     profileImgURL : '',
//     isActive:true,
//   },
// ]

const AdminDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {users,summary,loading,error} = useSelector((state:RootState) => state.adminUsers);
  console.log('users in state:',users);
  console.log('summery in state:',summary);

  //fetching users when component mounts
  useEffect(()=>{
    dispatch(fetchAllUsers())
  },[dispatch]);

  
  return (
    <div className="p-8 bg-white min-h-screen">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-slate-500 mt-1">Monitor system access and manage organizational member roles.</p>
        </div>
        
        {/* We will trigger a Shadcn Dialog (Modal) from this button later */}
        {/* <Button className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button> */}
        <AddUserDialog/>
      </div>
      {/* STATS SECTION */}
      <div className="mb-8">
        <StatCards stats={summary} />
        {/* <StatCards stats={{ total: 22, active: 18, blocked: 4 }} /> */}
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-lg shadow border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold">Member Directory</h2>
        </div>
        
        {loading ? (
          <SkeletonTable/>
        ) : error ? (
          <div className="p-8 text-center text-red-500">{error}</div>
        ) : (
          <UsersTable users={users} />
        )}
      </div>
      {/* <UsersTable users={userlist}/> */}
    </div>
  );
};

export default AdminDashboard;
