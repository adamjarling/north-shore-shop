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
      {/* <Nav /> */}
      <main>{children}</main>
      <footer className="container mx-auto text-center">
        North Shore Shop &copy; 2022
      </footer>
    </div>
  );
};

export default Layout;
