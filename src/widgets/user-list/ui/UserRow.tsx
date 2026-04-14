import React, { memo } from 'react';
import { Button } from '@/shared/ui/button';
import { TableCell, TableRow } from '@/shared/ui/table';
import type { IUser } from '@/entities/user/model/types';

interface Props {
  user: IUser;
  onEdit: (u: IUser) => void;
  onDeleteRequest: (u: IUser) => void;
}

export const UserRow = memo(({ user, onEdit, onDeleteRequest }: Props) => {
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

  console.log('Render: User Row ->', user.username);

  return (
    <TableRow 
      onClick={() => onEdit(user)} 
      onKeyDown={handleKeyDown}
      className="cursor-pointer animate-fade-in"
      tabIndex={0}
      role="button"
      aria-label={`Edit user ${user.username}`}
    >
      <TableCell className="font-medium">{user.username}</TableCell>
      <TableCell>{user.address}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell className="text-right">
        <Button variant="delete" size="sm" onClick={handleDeleteClick}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
});

UserRow.displayName = 'UserRow';