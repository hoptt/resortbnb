export default function RoomRegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-4xl mx-auto px-4 min-h-screen mt-5 sm:mt-10 pb-10">
      {children}
    </section>
  );
}
