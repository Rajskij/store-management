import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 p-4 shadow-md z-50 bg-background">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl text-secondary font-bold">Store Manager</h1>
        </Link>
        <div className="space-x-4 text-xl">
          <Link href="/" className="hover:text-secondary">
            Home
          </Link>
          <Link href="/stores" className="hover:text-secondary">
            Stores
          </Link>
          <Link href="/orders" className="hover:text-secondary">
            Orders
          </Link>
          <Link href="/payment" className="hover:text-secondary">
            Payment
          </Link>
        </div>
      </div>
    </nav>
  );
}
