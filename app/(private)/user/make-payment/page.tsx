import { Button } from "@/components/ui/button";

export default function PaymentPage() {
  return (
    <div>
      <h3 className="text-2xl font-semibold">Payment</h3>
      <p className="text-sm text-muted-foreground mb-7 mt-2">
        Please click the following to make the payment
      </p>
      <Button className="w-fit bg-tomato">Make payment</Button>
    </div>
  );
}
