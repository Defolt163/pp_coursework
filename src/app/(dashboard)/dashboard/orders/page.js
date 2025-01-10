import OrdersTable from "@/app/components/(ui)/OrderTable/OrderTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OrderPage() {
    return (
      <div className="w-full">
          <h2 className="text-2xl font-bold">Заказы</h2>
          <div className="w-full pl-3 mt-3">
            <OrdersTable/>
          </div>
      </div>
    );
  }
  