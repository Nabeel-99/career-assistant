import React from "react";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { User } from "@/lib/generated/prisma";
import { toast } from "sonner";
import axios from "axios";
const PaymentButton = ({ user }: { user: User | null }) => {
  console.log("user", user);
  const config = {
    public_key: "FLWPUBK_TEST-a4afdff8027882794a525f2ad6d1b494-X",
    tx_ref: `careerassistant-${Date.now()}`,
    amount: 1,
    currency: "USD",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: `${user?.email}`,
      phone_number: `00000000000`,
      name: `${user?.firstname}  ${user?.lastname}`,
    },
    customizations: {
      title: "Career Assistant",
      description: "Unlock unlimited access to premium features",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const verifyPayment = async (tx_ref: string, transaction_id: number) => {
    try {
      const res = await axios.post("/api/upgrade", {
        tx_ref,
        transaction_id,
      });
      console.log("response", res.data);
      if (res.status === 200) {
        toast.success(
          "Payment confirmed — you now have full access to all Premium features."
        );
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Error verifying payment");
    }
  };
  const fwConfig = {
    ...config,
    text: "Pay with Flutterwave!",
    callback: async (response: any) => {
      console.log(response);
      if (response.status === "successful") {
        await verifyPayment(response.tx_ref, response.transaction_id);
      }
      closePaymentModal();
    },
    onClose: () => {},
  };
  return (
    <FlutterWaveButton
      {...fwConfig}
      text="Upgrade to Premium"
      className="border p-2 w-full rounded-full text-center cursor-pointer bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 transition-all duration-300 ease-in-out"
    />
  );
};

export default PaymentButton;
