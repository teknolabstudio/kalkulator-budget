import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useBudget } from '../../context/BudgetContext';

export default function InputBudgetScreen() {
  const router = useRouter();
    const [uangBulananLocal, setUangBulananLocal] = useState('');
    const [tanggalMulaiLocal, setTanggalMulaiLocal] = useState(new Date());
    const [tanggalAkhirLocal, setTanggalAkhirLocal] = useState(new Date());;

    const {setUangBulanan,
    setTanggalMulai,
    setTanggalAkhir} = useBudget();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Masukkan Uang Bulanan</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Contoh: 5000000"
        value={uangBulananLocal}
        onChangeText={setUangBulananLocal}
      />

      <Text style={styles.label}>Tanggal Mulai</Text>
      <DateTimePicker
        value={tanggalMulaiLocal}
        onChange={(event, selectedDate) =>
            setTanggalMulaiLocal(selectedDate || tanggalMulaiLocal)}
      />

      <Text style={styles.label}>Tanggal Akhir</Text>
      <DateTimePicker
        value={tanggalAkhirLocal}
        onChange={(event, selectedDate) =>
            setTanggalAkhirLocal(selectedDate || tanggalAkhirLocal)}
      />

      <Pressable
        style={styles.button}
        onPress={() => {
        setUangBulanan(parseInt(uangBulananLocal));
        setTanggalMulai(tanggalMulaiLocal);
        setTanggalAkhir(tanggalAkhirLocal);
          router.push('/(setup)/input-rutin');
        }}
      >
        <Text style={styles.buttonText}>Lanjut</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 12 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  label: { fontSize: 16, marginTop: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#2196f3',
    padding: 14,
    borderRadius: 12,
    marginTop: 24,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
