export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-primary-50">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex">
        <h1 className="text-4xl font-bold text-primary-900">
          LaporInfrastruktur.id <span className="text-primary-500 text-lg font-normal">Admin CMS</span>
        </h1>
      </div>
      
      <div className="mt-8 p-8 bg-white rounded-xl shadow-lg border border-primary-100">
        <p className="text-gray-600">
          Initializing the government digital infrastructure management system...
        </p>
        <div className="mt-4 flex gap-4">
          <div className="px-4 py-2 bg-status-resolved text-white rounded-md text-sm font-medium">
            System Online
          </div>
          <div className="px-4 py-2 bg-primary-900 text-white rounded-md text-sm font-medium">
            Step 4.1 Complete
          </div>
        </div>
      </div>
    </main>
  );
}
