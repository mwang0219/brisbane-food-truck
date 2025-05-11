import { FoodTruckList } from '@/components/FoodTruckList';

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">布里斯班美食车</h1>
        <p className="text-gray-600">探索布里斯班最受欢迎的美食车</p>
      </header>
      
      <main>
        <FoodTruckList />
      </main>
    </div>
  );
}
