import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 px-12 overflow-y-auto">
        <Header userName="Budi" />
        {children}
      </main>
    </div>
  );
}
