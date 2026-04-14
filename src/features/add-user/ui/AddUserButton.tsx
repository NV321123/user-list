import React, { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { Button } from '@/shared/ui/button';
import { userApi } from '@/entities/user/api/userApi';
import { useUserStore } from '@/entities/user/model/userStore';
import { Loader2 } from 'lucide-react';

export const AddUserButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const addUser = useUserStore((state) => state.addUser);

  const handleAddUser = useCallback(async () => {
    setLoading(true);
    try {
      const newUser = await userApi.fetchRandomUser();
      addUser(newUser);
      toast.success('User added successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch user.');
    } finally {
      setLoading(false);
    }
  }, [addUser]);

  console.log('Add User Button');

  return (
    <Button onClick={handleAddUser} variant="add" disabled={loading}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {loading ? 'Fetching...' : 'Add User'}
    </Button>
  );
};