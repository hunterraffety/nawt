import { ApiResponse, PaymentMethod } from "@/types/types";
import { NextApiRequest, NextApiResponse } from "next";

const mockPaymentMethods: PaymentMethod[] = [
  { id: "1", last4: "1234", type: "Visa", exp: "12/25" },
  { id: "2", last4: "5678", type: "Amex", exp: "12/26" },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    if (req.method === "GET") {
      return res
        .status(200)
        .json({ paymentMethods: mockPaymentMethods, success: true });
    }

    if (req.method === "POST") {
      const { paymentId, newExpiration, simulateError } = req.body;

      // simulate error
      if (simulateError) {
        return res.status(500).json({
          success: false,
          message: "Internal Server Error! Simulated Failure",
        });
      }

      // update all
      if (paymentId === "ALL") {
        if (!newExpiration) {
          return res.status(400).json({
            success: false,
            message: "New expiry date is required for all updates.",
          });
        }

        mockPaymentMethods.forEach((pm) => (pm.exp = newExpiration));
        return res.status(200).json({
          success: true,
          message: "All payment methods updated successfully!",
        });
      }

      // verify/validate
      const paymentMethod = mockPaymentMethods.find(
        (pm) => pm.id === paymentId
      );
      if (!paymentMethod) {
        return res.status(400).json({
          success: false,
          message: "Invalid Payment ID! Please try again",
        });
      }

      // update single
      paymentMethod.exp = newExpiration;
      return res.status(200).json({
        success: true,
        message: "Payment Method Updated Successfully!",
      });
    }

    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Unexpected error occurred",
      error: err instanceof Error ? err.message : "Unknown Error",
    });
  }
}
