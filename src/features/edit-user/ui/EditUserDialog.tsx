import { useCallback, memo } from 'react';
import { toast } from 'react-toastify';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { useUserStore } from '@/entities/user/model/userStore';
import type { IUser } from '@/entities/user/model/types';
import { UserForm } from './UserForm';

interface Props {
  open: boolean;
  user: IUser | null;
  onClose: () => void;
}

const EditUserDialogComponent = ({ open, user, onClose }: Props) => {
  const updateUser = useUserStore((state) => state.updateUser);

  const handleSave = useCallback((newAddress: string) => {
    if (!user) return;

    if (newAddress === user.address) {
      onClose();
      return;
    }

    updateUser(user.id, { address: newAddress });
    toast.info('User updated');
    onClose();
  }, [user, updateUser, onClose]);

  console.log('Edit User Dialog');

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-106.25">
        <DialogHeader>
          <DialogTitle className="text-primary">User Details</DialogTitle>
          <DialogDescription>
            View full user details. Edit address and save changes.
          </DialogDescription>
        </DialogHeader>
        
        {user && (
          <UserForm 
            key={user.id} 
            user={user} 
            onSave={handleSave} 
            onCancel={onClose} 
          />
        )}
        
      </DialogContent>
    </Dialog>
  );
};

export const EditUserDialog = memo(EditUserDialogComponent);