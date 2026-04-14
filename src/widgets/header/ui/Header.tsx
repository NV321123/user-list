import { memo } from 'react'; // Импортируем memo
import { AddUserButton } from '@/features/add-user/ui/AddUserButton';

export const Header = memo(() => {

  console.log('Header');
  
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          User List
        </h1>
        <AddUserButton />
      </div>
    </header>
  );
});

Header.displayName = 'Header';