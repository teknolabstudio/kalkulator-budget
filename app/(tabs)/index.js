import { View, Text, StyleSheet } from 'react-native';
import { useBudget } from '../../context/BudgetContext';

export default function DashboardScreen() {
  const {
    uangBulanan,
    tanggalMulai,
    tanggalAkhir,
    pengeluaranRutin
  } = useBudget(); // ✅ ini ambil semua dari context

  const totalPengeluaran = pengeluaranRutin.reduce((sum, item) => sum + item.amount, 0);
  const sisaUang = uangBulanan - totalPengeluaran;

  const totalHari = Math.ceil(
    (tanggalAkhir.getTime() - tanggalMulai.getTime()) / (1000 * 60 * 60 * 24) + 1
  );

  const budgetHarian = Math.floor(sisaUang / totalHari);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Ringkasan Budget</Text>
      <Text style={styles.item}>💰 Uang Bulanan: Rp {uangBulanan.toLocaleString()}</Text>
      <Text style={styles.item}>📉 Pengeluaran Rutin: Rp {totalPengeluaran.toLocaleString()}</Text>
      <Text style={styles.item}>💵 Sisa Uang: Rp {sisaUang.toLocaleString()}</Text>
      <Text style={styles.item}>📆 Budget Harian: Rp {budgetHarian.toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  item: { fontSize: 18, marginBottom: 8 },
});
