import OrderConfirmationClient from "./OrderConfirmationClient";

export const metadata = { title: "Order confirmed" };

interface Props {
  params: { id: string };
}

export default function OrderPage({ params }: Props) {
  return <OrderConfirmationClient orderId={params.id} />;
}
