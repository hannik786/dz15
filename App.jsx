import './styles.css';
import Restaurant from './Restaurant';
import Credentials from './Credentials';
export default function App() {
  return (
    <main className="page">
      {/* Завдання 1 */}
      <Restaurant
        name="Ристоранте «Італійська гостина»"
        address="м. Київ, вул. Хрещатик, 22"
        rating={4.6}
        cuisine="Італійська"
        image="https://placehold.co/280x200?text=Ресторан"
      />
      {/* Завдання 3 */}
      <Credentials title="Дані для входу" minPasswordLength={6} />
    </main>
  );
}
