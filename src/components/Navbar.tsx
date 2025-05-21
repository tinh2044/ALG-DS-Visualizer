import { useLocation } from 'react-router-dom';
import { 
  Navbar as HeroNavbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle, 
  NavbarMenu, 
  NavbarMenuItem, 
  Button,
  Link
} from '@heroui/react';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { mainMenuItems } from '@/configs';

// Define type for menu item
interface MenuItem {
  name: string;
  path: string;
  children?: { name: string; path: string }[];
}

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = location;

  // Helper để kiểm tra active cho menu cha hoặc con
  const isMenuActive = (item: MenuItem) => {
    if (item.path === pathname) return true;
    if (item.children) {
      return item.children.some((child: { name: string; path: string }) => child.path === pathname);
    }
    return false;
  };

  return (
    <HeroNavbar
      className="mb-5 w-full"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden flex"
        />
        <NavbarBrand>
          <Link href="/" color="secondary">
            <p className="font-bold text-inherit text-xl">
              Algorithms Visualization
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {mainMenuItems.map((item: MenuItem) => {
          const active = isMenuActive(item);
          if (item.children) {
            return (
              <div key={item.name} className="relative group">
                <Button
                  variant="light"
                  color='secondary'
                  as={Link}
                  radius="sm"
                  href={item.path}
                  className={`${active ? 'text-primary bg-secondary' : '!text-secondary'} text-lg !px-1`}
                >
                  {item.name}
                </Button>
                <div className="absolute left-0 top-[80%] z-20 hidden group-hover:block min-w-[180px] bg-primary shadow-lg rounded-md mt-2">
                  {item.children.map((child: { name: string; path: string }) => {
                    const isChildActive = pathname === child.path;
                    return (
                      <Button
                        key={child.name}
                        as={Link}
                        href={child.path}
                        className={`w-full justify-start rounded-none ${isChildActive ? 'text-primary bg-secondary' : 'text-secondary'} px-4 py-2 text-left`}
                        variant="light"
                        radius="none"
                      >
                        {child.name}
                      </Button>
                    );
                  })}
                </div>
              </div>
            );
          }
          return (
            <NavbarItem key={item.name} isActive={active}>
              <Button
                variant="light"
                as={Link}
                radius="sm"
                href={item.path}
                className={`$${active ? 'text-primary bg-secondary' : 'text-secondary'} text-lg !px-1`}
              >
                {item.name}
              </Button>
            </NavbarItem>
          );
        })}
        <ThemeToggle />
      </NavbarContent>
      <NavbarMenu>
        {mainMenuItems.map((item: MenuItem) => {
          const active = isMenuActive(item);
          if (item.children) {
            return (
              <div key={item.name}>
                <NavbarMenuItem isActive={active}>
                  <Button
                    as={Link}
                    href={item.path}
                    className={active ? 'text-primary w-full' : 'w-full'}
                  >
                    {item.name}
                  </Button>
                </NavbarMenuItem>
                {item.children.map((child: { name: string; path: string }) => {
                  const isChildActive = pathname === child.path;
                  return (
                    <NavbarMenuItem key={child.name} isActive={isChildActive}>
                      <Button
                        as={Link}
                        href={child.path}
                        className={
                          isChildActive
                            ? 'text-primary w-full pl-6'
                            : 'w-full pl-6'
                        }
                      >
                        {child.name[0].toUpperCase() +
                          child.name[0].slice(1)}
                      </Button>
                    </NavbarMenuItem>
                  );
                })}
              </div>
            );
          }
          return (
            <NavbarMenuItem key={item.name} isActive={active}>
              <Button
                as={Link}
                href={item.path}
                className={active ? 'text-primary w-full' : 'w-full'}
              >
                {item.name}
              </Button>
            </NavbarMenuItem>
          );
        })}
        <NavbarMenuItem>
          <div className="flex items-center justify-between py-2 px-2">
            <span>Theme</span>
            <ThemeToggle />
          </div>
        </NavbarMenuItem>
      </NavbarMenu>
    </HeroNavbar>
  );
}

export default Navbar;
