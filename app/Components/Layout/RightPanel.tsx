export default function RightPanel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main id="main-content" className="pt-24 md:w-1/2 md:py-24">
      {children}
    </main>
  );
}
