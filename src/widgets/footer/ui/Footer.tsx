import { memo } from 'react';

export const Footer = memo(() => {

  console.log('Footer');

  return (
    <footer className="border-t py-4 text-center text-sm text-muted-foreground">
      <div className="container">
        &copy; 2026
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';