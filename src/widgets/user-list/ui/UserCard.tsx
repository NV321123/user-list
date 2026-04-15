import React, { memo } from 'react';
import { Button } from '@/shared/ui/button';
import type { IUser } from '@/entities/user/model/types';

interface Props {
  user: IUser;
  onEdit: (u: IUser) => void;
  onDeleteRequest: (u: IUser) => void;
}

export const UserCard = memo(({ user, onEdit, onDeleteRequest }: Props) => {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteRequest(user);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onEdit(user);
    }
  };

  console.log('Render: User Card ->', user.username);

  return (
    <div 
      onClick={() => onEdit(user)}
      onKeyDown={handleKeyDown}
      className="bg-card border rounded-lg p-4 shadow-sm mb-3 cursor-pointer hover:bg-primary/20 transition-colors animate-in fade-in-0 slide-in-from-bottom-2 duration-300"
      tabIndex={0}
      role="button"
      aria-label={`Edit user ${user.username}`}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg text-foreground">{user.username}</h3>
        <Button variant="delete" size="sm" onClick={handleDeleteClick}>
          Delete
        </Button>
      </div>
      
      <div className="space-y-1 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground w-16 shrink-0">Email:</span>
          <span className="text-foreground truncate">{user.email}</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-muted-foreground w-16 shrink-0">Address:</span>
          <span className="text-foreground">{user.address}</span>
        </div>
      </div>
    </div>
  );
});

UserCard.displayName = 'UserCard';
