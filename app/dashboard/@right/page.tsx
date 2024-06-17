export default async function DashboardPage() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <div className="min-h-screen text-center flex flex-col justify-center font-semibold bg-rose-700 text-white">
      right Page
    </div>
  );
}
