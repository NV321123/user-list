import React, { useState, useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { toast } from 'react-toastify';
import { Table, TableBody } from '@/shared/ui/table';
import { useIsMobile } from '@/shared/lib/hooks';
import { useUserStore } from '@/entities/user/model/userStore';
import type { IUser } from '@/entities/user/model/types';


import { EditUserDialog } from '@/features/edit-user/ui/EditUserDialog';
import { DeleteUserDialog } from '@/features/delete-user/ui/DeleteUserDialog';
import { UserCard } from './UserCard';
import { UserRow } from './UserRow';
import { TableHeaderRow } from './TableHeader';

export const UserTable: React.FC = () => {
  const isMobile = useIsMobile();
  
  const { users, removeUser } = useUserStore(useShallow((state) => ({ 
    users: state.users, 
    removeUser: state.removeUser 
  })));
  
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<IUser | null>(null);

  const confirmDelete = useCallback(() => {
    if (!userToDelete) return;
    removeUser(userToDelete.id);
    toast.warn('User deleted');
    setIsDeleteOpen(false);
  }, [userToDelete, removeUser]);

  const handleDeleteRequest = useCallback((user: IUser) => {
    setUserToDelete(user);
    setIsDeleteOpen(true);
  }, []);

  const handleOpenEdit = useCallback((user: IUser) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  }, []);

  const handleCloseEdit = useCallback(() => {
    setIsEditOpen(false);
  }, []);

  console.log('UserTable');

  if (users.length === 0) {
    return (
      <>
        <div className="flex-1 flex items-center justify-center text-center text-muted-foreground border rounded-lg bg-card p-4">
          No users found. Add one to get started!
        </div>
        <EditUserDialog 
          open={isEditOpen} 
          user={selectedUser} 
          onClose={handleCloseEdit} 
        />
      </>
    );
  }

  return (
    <>
      {isMobile ? (
        <div className="md:hidden">
          {users.map((user) => (
            <UserCard 
              key={user.id} 
              user={user} 
              onEdit={handleOpenEdit} 
              onDeleteRequest={handleDeleteRequest} 
            />
          ))}
        </div>
      ) : (
        <div className="hidden md:block rounded-lg border bg-card text-card-foreground shadow-sm overflow-x-auto overflow-y-clip">
          <Table>
            <TableHeaderRow />
            <TableBody>
              {users.map((user) => (
                <UserRow 
                  key={user.id} 
                  user={user} 
                  onEdit={handleOpenEdit} 
                  onDeleteRequest={handleDeleteRequest} 
                />
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <EditUserDialog 
        open={isEditOpen} 
        user={selectedUser} 
        onClose={handleCloseEdit} 
      />

      <DeleteUserDialog 
        open={isDeleteOpen}
        user={userToDelete} 
        onClose={() => setIsDeleteOpen(false)} 
        onConfirm={confirmDelete} 
      />
    </>
  );
};
