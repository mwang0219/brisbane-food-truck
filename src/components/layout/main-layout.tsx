'use client';

import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">布里斯班美食车</h1>
        </div>
      </header>

      <div className="flex-1 flex">
        <aside className="w-64 border-r p-4">
          {/* 左侧栏内容将在这里 */}
        </aside>

        <main className="flex-1 p-4">
          {children}
        </main>
      </div>

      <footer className="border-t">
        <div className="container mx-auto px-4 py-4 text-center text-gray-500">
          © 2024 布里斯班美食车. All rights reserved.
        </div>
      </footer>
    </div>
  );
} 