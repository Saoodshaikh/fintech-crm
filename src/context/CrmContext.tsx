import { createContext, useContext, useState, ReactNode } from "react";
import {
  clients as initialClients,
  transactions as initialTransactions,
  sipRecords as initialSips,
  holdings as initialHoldings,
  funds,
} from "../data/dummyData";

export interface Transaction {
  id: number;
  clientId: number;
  client: string;
  fund: string;
  type: string;
  amount: number;
  status: string;
  date: string;
  nav: number;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  mobile: string;
  pan: string;
  aadhaar: string;
  dob: string;
  occupation: string;
  annualIncome: number;
  address: string;
  status: string;
  kycStatus: string;
  goal: string;
  risk: string;
  aum: number;
  currentValue: number;
  xirr: number;
  lastFollowUp: string;
  nextFollowUp: string;
  joinedDate: string;
  notes: string;
  advisor: string;
  bank: {
    account: string;
    ifsc: string;
    branch: string;
  };
  nominee: {
    name: string;
    relation: string;
    share: number | string;
  };
}

export interface Holding {
  fund: string;
  category: string;
  units: number;
  investment: number;
  value: number;
}

interface CrmContextType {
  clients: Client[];
  transactions: Transaction[];
  sipRecords: any[];
  compareFunds: typeof funds;
  isCompareOpen: boolean;
  isTransactionOpen: boolean;
  transactionFund: typeof funds[0] | null;
  transactionClient: Client | null;
  toggleCompareFund: (fund: typeof funds[0]) => void;
  clearCompare: () => void;
  openCompare: () => void;
  closeCompare: () => void;
  openTransaction: (fund?: typeof funds[0] | null, client?: Client | null) => void;
  closeTransaction: () => void;
  executeTransaction: (clientId: number, fundName: string, type: "SIP" | "Lumpsum", amount: number) => void;
}

const CrmContext = createContext<CrmContextType | undefined>(undefined);

export function CrmProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [sipRecords, setSipRecords] = useState<any[]>(initialSips);
  const [compareFunds, setCompareFunds] = useState<typeof funds>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  
  // Transaction Drawer State
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [transactionFund, setTransactionFund] = useState<typeof funds[0] | null>(null);
  const [transactionClient, setTransactionClient] = useState<Client | null>(null);

  const toggleCompareFund = (fund: typeof funds[0]) => {
    setCompareFunds((prev) => {
      const exists = prev.some((f) => f.name === fund.name);
      if (exists) {
        return prev.filter((f) => f.name !== fund.name);
      }
      if (prev.length >= 3) {
        alert("You can compare a maximum of 3 funds at a time.");
        return prev;
      }
      return [...prev, fund];
    });
  };

  const clearCompare = () => {
    setCompareFunds([]);
    setIsCompareOpen(false);
  };

  const openCompare = () => setIsCompareOpen(true);
  const closeCompare = () => setIsCompareOpen(false);

  const openTransaction = (fund: typeof funds[0] | null = null, client: Client | null = null) => {
    setTransactionFund(fund);
    setTransactionClient(client);
    setIsTransactionOpen(true);
  };

  const closeTransaction = () => {
    setIsTransactionOpen(false);
    setTransactionFund(null);
    setTransactionClient(null);
  };

  const executeTransaction = (clientId: number, fundName: string, type: "SIP" | "Lumpsum", amount: number) => {
    const client = clients.find((c) => c.id === clientId);
    const fund = funds.find((f) => f.name === fundName);

    if (!client || !fund) return;

    // Create New Transaction
    const newTx: Transaction = {
      id: transactions.length + 1,
      clientId,
      client: client.name,
      fund: fundName,
      type,
      amount,
      status: "Success",
      date: "Today",
      nav: fund.nav,
    };

    // Calculate units acquired
    const units = parseFloat((amount / fund.nav).toFixed(3));

    // Update Client metrics
    const updatedClients = clients.map((c) => {
      if (c.id === clientId) {
        return {
          ...c,
          aum: c.aum + amount,
          currentValue: c.currentValue + amount,
        };
      }
      return c;
    });

    // Update SIP Records if type is SIP
    if (type === "SIP") {
      const newSip = {
        id: sipRecords.length + 1,
        clientId,
        client: client.name,
        fund: fundName,
        amount,
        startDate: "Today",
        nextDate: "05 Aug 2026",
        units,
        status: "Active",
      };
      setSipRecords((prev) => [newSip, ...prev]);
    }

    setTransactions((prev) => [newTx, ...prev]);
    setClients(updatedClients);
  };

  return (
    <CrmContext.Provider
      value={{
        clients,
        transactions,
        sipRecords,
        compareFunds,
        isCompareOpen,
        isTransactionOpen,
        transactionFund,
        transactionClient,
        toggleCompareFund,
        clearCompare,
        openCompare,
        closeCompare,
        openTransaction,
        closeTransaction,
        executeTransaction,
      }}
    >
      {children}
    </CrmContext.Provider>
  );
}

export function useCrm() {
  const context = useContext(CrmContext);
  if (!context) {
    throw new Error("useCrm must be used within a CrmProvider");
  }
  return context;
}
