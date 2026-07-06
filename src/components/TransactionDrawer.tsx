import { useState, useEffect } from "react";
import { X, CheckCircle, IndianRupee, ArrowRight, ShieldCheck } from "lucide-react";
import { useCrm } from "../context/CrmContext";
import { funds } from "../data/dummyData";
import { Button } from "./UI";

export default function TransactionDrawer() {
  const {
    isTransactionOpen,
    transactionFund,
    transactionClient,
    closeTransaction,
    executeTransaction,
    clients,
  } = useCrm();

  const [selectedClientId, setSelectedClientId] = useState<number | "">("");
  const [selectedFundName, setSelectedFundName] = useState<string>("");
  const [type, setType] = useState<"SIP" | "Lumpsum">("SIP");
  const [amount, setAmount] = useState<number>(5000);
  
  // Workflow States
  const [status, setStatus] = useState<"form" | "loading" | "success">("form");

  // Sync state with props when drawer opens
  useEffect(() => {
    if (isTransactionOpen) {
      setSelectedClientId(transactionClient?.id || clients[0]?.id || "");
      setSelectedFundName(transactionFund?.name || funds[0]?.name || "");
      setAmount(transactionFund ? (type === "SIP" ? transactionFund.minSip : transactionFund.minLumpsum) : 5000);
      setStatus("form");
    }
  }, [isTransactionOpen, transactionFund, transactionClient]);

  // Adjust amount when type changes to match minimums
  useEffect(() => {
    const fund = funds.find((f) => f.name === selectedFundName);
    if (fund) {
      setAmount(type === "SIP" ? fund.minSip : fund.minLumpsum);
    }
  }, [type, selectedFundName]);

  if (!isTransactionOpen) return null;

  const currentFund = funds.find((f) => f.name === selectedFundName);
  const currentClient = clients.find((c) => c.id === Number(selectedClientId));

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClientId || !selectedFundName || !amount) return;

    setStatus("loading");

    setTimeout(() => {
      executeTransaction(Number(selectedClientId), selectedFundName, type, amount);
      setStatus("success");
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">New Transaction</h2>
            <p className="text-xs text-slate-500">Initiate mutual fund order instantly</p>
          </div>
          <button onClick={closeTransaction} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {status === "form" && (
            <form onSubmit={handleConfirm} className="space-y-5">
              {/* Select Client */}
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Select Client
                </label>
                <select
                  value={selectedClientId}
                  onChange={(e) => setSelectedClientId(Number(e.target.value))}
                  disabled={!!transactionClient}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white outline-none focus:border-brand-primary disabled:bg-slate-50 disabled:text-slate-500"
                >
                  <option value="">Choose a client...</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.pan})
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Fund */}
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Select Mutual Fund
                </label>
                <select
                  value={selectedFundName}
                  onChange={(e) => setSelectedFundName(e.target.value)}
                  disabled={!!transactionFund}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white outline-none focus:border-brand-primary disabled:bg-slate-50 disabled:text-slate-500"
                >
                  {funds.map((f) => (
                    <option key={f.name} value={f.name}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Investment Type */}
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Investment Scheme
                </label>
                <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
                  {["SIP", "Lumpsum"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t as any)}
                      className={`py-2 rounded-lg text-xs font-bold transition-all ${
                        type === t
                          ? "bg-white text-brand-primary shadow-sm"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {t === "SIP" ? "Monthly SIP" : "One-Time Lumpsum"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Investment Amount (₹)
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-slate-400 font-semibold">₹</div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    min={type === "SIP" ? currentFund?.minSip : currentFund?.minLumpsum}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 outline-none focus:border-brand-primary"
                    placeholder="Enter amount..."
                  />
                </div>
                {currentFund && (
                  <div className="text-[10px] text-slate-400 mt-1">
                    Minimum investment: ₹{type === "SIP" ? currentFund.minSip : currentFund.minLumpsum} · NAV: ₹{currentFund.nav}
                  </div>
                )}
              </div>

              {/* Fund Brief Summary */}
              {currentFund && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Fund Risk</span>
                    <span className="font-semibold text-slate-700">{currentFund.risk} Risk</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Expense Ratio</span>
                    <span className="font-semibold text-slate-700">{currentFund.expense}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">3Y Return</span>
                    <span className="font-bold text-green-600">{currentFund.r3}%</span>
                  </div>
                </div>
              )}

              {/* Submit */}
              <Button type="submit" variant="primary" className="w-full py-3">
                Proceed to Invest <ArrowRight size={14} />
              </Button>
            </form>
          )}

          {status === "loading" && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="relative w-16 h-16 mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
                <div className="absolute inset-0 rounded-full border-4 border-t-brand-primary animate-spin" />
              </div>
              <div className="font-semibold text-slate-800">Processing Mandate...</div>
              <p className="text-xs text-slate-400 mt-1.5 max-w-[200px]">
                Validating client mandate and placing order with AMC.
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 border-2 border-green-200 animate-bounce">
                <CheckCircle size={32} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Transaction Successful</h3>
                <p className="text-xs text-slate-500 mt-1">Order processed successfully</p>
              </div>

              <div className="w-full border border-slate-100 rounded-2xl p-4 bg-slate-50/50 space-y-2 text-left text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Client</span>
                  <span className="font-semibold text-slate-800">{currentClient?.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Mutual Fund</span>
                  <span className="font-semibold text-slate-800 truncate max-w-[180px]">{selectedFundName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Scheme Type</span>
                  <span className="font-semibold text-slate-800">{type}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Amount Paid</span>
                  <span className="font-bold text-slate-900 text-sm">₹{amount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 justify-center">
                <ShieldCheck size={12} className="text-green-600" /> Secure payment registered.
              </div>

              <Button variant="primary" className="w-full mt-4" onClick={closeTransaction}>
                Done
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        {status === "form" && (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Powered by BillDesk & BSE Star MF</span>
            <span>SECURE · 256-BIT SSL</span>
          </div>
        )}
      </div>
    </div>
  );
}
