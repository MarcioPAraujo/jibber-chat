"use client";

interface RootLayoutProps {
  children: React.ReactNode;
}

const Contacts = ({ children }: RootLayoutProps) => {
  return (
    <main>
      <div>contacs</div>
      {children}
    </main>
  );
};
export default Contacts;
