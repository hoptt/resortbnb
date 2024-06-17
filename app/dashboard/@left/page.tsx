export default async function DashboardPage() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <div className="min-h-screen text-center flex flex-col justify-center font-semibold bg-rose-300">
      Left Page
    </div>
  );
}
