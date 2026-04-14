import React, { useRef, memo } from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import type { IUser } from '@/entities/user/model/types';

interface UserFormProps {
  user: IUser;
  onSave: (newAddress: string) => void;
  onCancel: () => void;
}

const UserFormComponent = ({ user, onSave, onCancel }: UserFormProps) => {
  const addressRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(addressRef.current?.value || user.address);
  };

  console.log('User Form');

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-3 items-center gap-4">
          <span className="text-right text-muted-foreground text-sm">Name</span>
          <span className="col-span-2 font-medium">{user.name}</span>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <span className="text-right text-muted-foreground text-sm">Username</span>
          <span className="col-span-2">{user.username}</span>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <span className="text-right text-muted-foreground text-sm">Email</span>
          <span className="col-span-2">{user.email}</span>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <span className="text-right text-muted-foreground text-sm">Sex</span>
          <span className="col-span-2">{user.sex}</span>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <span className="text-right text-muted-foreground text-sm">Birthday</span>
          <span className="col-span-2">{user.birthday}</span>
        </div>
        
        <div className="grid grid-cols-3 items-center gap-4">
          <label htmlFor="address" className="text-right text-muted-foreground text-sm">Address</label>
          <Input
            id="address"
            ref={addressRef}
            defaultValue={user.address}
            className="col-span-2"
          />
        </div>
      </div>
      
      <div className="flex flex-col gap-2 mt-4">
        <Button type="submit" variant="save" className="w-full">
          Save changes
        </Button>
        <Button type="button" variant="cancel" className="w-full" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export const UserForm = memo(UserFormComponent);