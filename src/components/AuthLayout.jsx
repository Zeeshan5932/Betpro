export default function AuthLayout({ children }) {
  return (
    <main className="w-full flex justify-center pt-6 sm:pt-7 md:pt-8">
      {children}
    </main>
  );
}