import { Stack } from 'expo-router';
import { BudgetProvider } from '../context/BudgetContext';

export default function Layout() {
  return (
    <BudgetProvider>
      <Stack />
    </BudgetProvider>
  );
}
