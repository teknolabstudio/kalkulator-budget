import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useBudget } from '../../context/BudgetContext';

export default function InputRutinScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (name && amount) {
      setItems([...items, { id: Date.now().toString(), name, amount: parseInt(amount) }]);
      setName('');
      setAmount('');
    }
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const totalRutin = items.reduce((sum, item) => sum + item.amount, 0);

  const {pengeluaranRutin, setPengeluaranRutin} = useBudget();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pengeluaran Rutin Bulanan</Text>

      <TextInput
        placeholder="Nama pengeluaran (cth: Sewa)"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Nominal (cth: 1000000)"
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Pressable style={styles.addButton} onPress={addItem}>
        <Text style={styles.addText}>+ Tambah</Text>
      </Pressable>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={styles.itemText}>{item.name} - Rp {item.amount.toLocaleString()}</Text>
            <Pressable onPress={() => removeItem(item.id)}>
              <Text style={styles.removeText}>Hapus</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={<Text style={{ color: '#777' }}>Belum ada pengeluaran</Text>}
      />

      <Text style={styles.total}>Total: Rp {totalRutin.toLocaleString()}</Text>

      <Pressable
        style={styles.nextButton}
        onPress={() => {
        setPengeluaranRutin(items);
          router.push('/(tabs)/index'); // ke dashboard
        }}
      >
        <Text style={styles.nextText}>Lanjut ke Dashboard</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#4caf50', padding: 12, borderRadius: 8, marginBottom: 20, alignItems: 'center',
  },
  addText: { color: '#fff', fontWeight: 'bold' },
  itemRow: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, backgroundColor: '#eee', padding: 12, borderRadius: 6,
  },
  itemText: { fontSize: 16 },
  removeText: { color: '#f44336', fontWeight: 'bold' },
  total: { fontSize: 16, fontWeight: 'bold', marginTop: 16 },
  nextButton: {
    backgroundColor: '#2196f3', padding: 14, borderRadius: 12, marginTop: 24, alignItems: 'center',
  },
  nextText: { color: '#fff', fontWeight: 'bold' },
});
