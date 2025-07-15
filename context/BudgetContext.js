// context/BudgetContext.js

import React, { createContext, useContext, useState } from 'react';

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [uangBulanan, setUangBulanan] = useState(0);
  const [tanggalMulai, setTanggalMulai] = useState(new Date());
  const [tanggalAkhir, setTanggalAkhir] = useState(new Date());
  const [pengeluaranRutin, setPengeluaranRutin] = useState([]);

  return (
    <BudgetContext.Provider
      value={{
        uangBulanan,
        setUangBulanan,
        tanggalMulai,
        setTanggalMulai,
        tanggalAkhir,
        setTanggalAkhir,
        pengeluaranRutin,
        setPengeluaranRutin,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => useContext(BudgetContext);
