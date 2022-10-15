import { DebugCart } from "use-shopping-cart";
import React, { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen font-mono relative">
      <main>{children}</main>
      <footer className="container mx-auto text-center py-6">
        North Shore Shop &copy; 2022
      </footer>
      <div className="font-sans">{/* <DebugCart /> */}</div>
    </div>
  );
};

export default Layout;
