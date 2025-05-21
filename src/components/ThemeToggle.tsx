import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@heroui/react';
import { SunIcon, MoonIcon } from 'lucide-react';

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Chỉ hiển thị component sau khi đã mount để tránh hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      variant="light"
      isIconOnly
      aria-label="Toggle theme"
      onPress={toggleTheme}
      className="rounded-full"
    >
      {theme === 'dark' ? (
        <SunIcon className="w-5 h-5 text-secondary" />
      ) : (
        <MoonIcon className="w-5 h-5 text-secondary" />
      )}
    </Button>
  );
};

export default ThemeToggle; 