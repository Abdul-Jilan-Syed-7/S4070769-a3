// context/PremiumContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface PremiumContextType {
  totalPremium: number | null;
  setTotalPremium: (value: number) => void;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

export const PremiumProvider = ({ children }: { children: ReactNode }) => {
  const [totalPremium, setTotalPremium] = useState<number | null>(null);

  return (
    <PremiumContext.Provider value={{ totalPremium, setTotalPremium }}>
      {children}
    </PremiumContext.Provider>
  );
};

export const usePremium = () => {
  const context = useContext(PremiumContext);
  if (!context) {
    throw new Error("usePremium must be used within a PremiumProvider");
  }
  return context;
};
