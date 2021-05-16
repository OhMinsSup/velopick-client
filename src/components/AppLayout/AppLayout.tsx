import React from "react";

interface SideProps {
  children: React.ReactNode;
}

function Side({ children }: SideProps) {
  return (
    <aside className="relative col-span-12 md:col-span-3 lg:col-span-2 xl:col-span-1">
      {children}
    </aside>
  );
}

interface MainProps {
  children: React.ReactNode;
}

function Main({ children }: MainProps) {
  return (
    <main className="col-span-12 md:pt-2 md:col-span-9 lg:col-span-6 xl:col-span-5">
      {children}
    </main>
  );
}

interface RightSideProps {
  children: React.ReactNode;
}

function RightSide({ children }: RightSideProps) {
  return (
    <div className="hidden col-span-4 pt-2 lg:block xl:col-span-2">
      {children}
    </div>
  );
}

interface AppLayoutProps {
  children: React.ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="container grid items-stretch grid-cols-12 gap-2 px-2 mx-auto md:gap-4 xl:grid-cols-8 2xl:px-5">
      {children}
    </div>
  );
}

AppLayout.Side = Side;
AppLayout.Main = Main;
AppLayout.RightSide = RightSide;

export default AppLayout;
