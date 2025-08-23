'use client'

export default function StripePayment() {
  const handlePayment = () => {
    alert("Stripe payment integration would be implemented here. This would charge $1.00.");
  };

  return (
    <div className="pt-6">
      <h2 className="text-2xl font-bold mb-6">Stripe Payment</h2>
      
      <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Charge Extra</h3>
          <p className="text-gray-600">This will process a payment of $1.00 through Stripe</p>
        </div>
        
        <button
          onClick={handlePayment}
          className="w-full bg-secondary text-white py-3 px-4 rounded-md hover:bg-secondary-muted transition duration-200 font-medium"
        >
          Charge Extra - $1.00
        </button>
        
        <div className="mt-6 p-4 bg-gray-100 rounded-md text-sm text-gray-600">
          <p>Note: Stripe integration is not implemented yet. This is just a UI demonstration.</p>
        </div>
      </div>
    </div>
  );
}
