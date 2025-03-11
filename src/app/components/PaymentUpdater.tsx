"use client";

import { useEffect, useState } from "react";
import Button from "./Button";
import { ApiResponse, PaymentMethod } from "@/types/types";
import Select from "./Select";
import TextInput from "./TextInput";

const PaymentUpdater = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [updateAll, setUpdateAll] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const res = await fetch("/api/updatePayment", { method: "GET" });
        const data: ApiResponse = await res.json();
        if (data.success && data.paymentMethods) {
          setPaymentMethods(data.paymentMethods);
        } else {
          setError("No available payment methods.");
        }
      } catch {
        setError("Failed to load payment methods.");
      }
    };
    fetchPaymentMethods();
  }, []);

  const handleUpdatePayment = async (simulateError = false) => {
    if (!selectedPayment && !updateAll) return;

    setIsUpdating(true);
    setSuccessMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/updatePayment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId: updateAll ? "ALL" : selectedPayment?.id,
          newExpiration: expirationDate,
          simulateError,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      setSuccessMessage("✅ Payment method updated successfully!");

      // update the ui
      setPaymentMethods(prev =>
        prev.map(pm =>
          updateAll || pm.id === selectedPayment?.id ? { ...pm, exp: expirationDate } : pm
        )
      );

    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReset = () => {
    setSelectedPayment(null);
    setExpirationDate("");
    setUpdateAll(false);
    setError(null);
    setSuccessMessage(null);
  };

  // format magic!
  const handleExpirationChange = (input: string) => {
    let formatted = input.replace(/\D/g, "").slice(0, 4);
    if (formatted.length > 2) {
      formatted = `${formatted.slice(0, 2)}/${formatted.slice(2)}`;
    }
    setExpirationDate(formatted);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-8 bg-[#0A0A0A] text-white rounded-lg shadow-lg border border-gray-800">
      <h2 className="text-xl font-semibold mb-4 text-gray-100">Select Payment Method</h2>

      {error && <p className="text-red-400 mb-2">{error}</p>}
      {successMessage && <p className="text-green-400 mb-2">{successMessage}</p>}
      {/* select component */}
      <Select
        label="Payment Method"
        value={selectedPayment?.id || ""}
        onChange={(value) => {
          const payment = paymentMethods.find((pm) => pm.id === value) || null;
          setSelectedPayment(payment);
        }}
        options={paymentMethods.map((pm) => ({
          value: pm.id,
          label: `${pm.type} ending in ${pm.last4} (Exp: ${pm.exp})`,
        }))}
        disabled={updateAll}
      />
      {/* text entry */}
      {selectedPayment || updateAll ? (
        <div className="w-full mt-4">
          <TextInput
            label="New Expiration Date"
            value={expirationDate}
            onChange={handleExpirationChange}
            placeholder="MM/YY"
          />
        </div>
      ) : null}

      {/* update all checkbox */}
      <div className="flex items-center w-full mt-4">
        <input
          type="checkbox"
          id="updateAll"
          checked={updateAll}
          onChange={() => setUpdateAll(prev => !prev)}
          className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
        />
        <label htmlFor="updateAll" className="ml-2 text-sm text-gray-300">
          Update all payment methods
        </label>
      </div>
      {/* cta buttons */}
      <div className="flex w-full mt-6 space-x-3 justify-center">
        <Button
          label="Update Payment"
          onClick={() => handleUpdatePayment(false)}
          disabled={!selectedPayment && !updateAll || expirationDate.length !== 5}
        />
        <Button
          label="Simulate Error"
          variant="secondary"
          onClick={() => handleUpdatePayment(true)}
          disabled={isUpdating}
        />
      </div>

      <Button
        label="Reset"
        variant="danger"
        onClick={handleReset}
        className="mt-4 w-full"
      />

      <p className="mt-4 text-gray-400 text-sm text-center">
        Built with <span className="text-gray-300">TypeScript, Next.js</span>, and a little bit of magic ✨.
        {/* let's work together! */}
      </p>
    </div>
  );
};

export default PaymentUpdater;