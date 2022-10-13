import { DebugCart } from "use-shopping-cart";
import React, { useState } from "react";
import Hero from "components/Hero";
import Nav from "components/nav/Nav";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="h-screen font-mono">
      <main>{children}</main>
      <footer className="container mx-auto text-center">
        North Shore Shop &copy; 2022
      </footer>
      <div className="font-sans">{/* <DebugCart /> */}</div>
    </div>
  );
};

export default Layout;
