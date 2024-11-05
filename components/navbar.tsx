import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="h-14 border-b sticky top-0 bg-background z-30 ">
      <div className="h-full flex justify-between items-center px-5">
        <h2>TaxPage</h2>
        <div className="flex gap-2">
          <Button variant="ghost">John Doe</Button>
          <Button variant="ghost">Logout</Button>
        </div>
      </div>
    </nav>
  );
}
