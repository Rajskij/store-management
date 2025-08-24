'use client'

import StripePayment from '../components/StripePayment';
import { useState } from "react";

export default function Payment() {
	const [loading, setLoading] = useState(false);
	const [amount, setAmount] = useState(1);

	async function handleSubmit(e) {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await fetch("http://localhost:4000/charge-extra", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ amount }),
			});

			const { url } = await res.json();
			console.log(url)
			window.location.href = url; // redirect to Stripe Checkout
		} catch (err) {
			console.error(err);
		}
		setLoading(false);
	};

	return (
		<div className="pt-6">
			<h2 className="text-2xl font-bold mb-6">Stripe Payment</h2>

			<div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
				<div className="mb-6">
					<h3 className="text-lg font-semibold mb-2">Charge Extra</h3>
					<p className="text-gray-600">This will process a payment through Stripe</p>
				</div>
				<form onSubmit={handleSubmit}>
					<label htmlFor="amount">Enter Amount</label>
					<input 
						id='amount' 
						type="number" 
						value={amount}  
						onChange={(e) => setAmount(e.target.value)}
						className='w-full border rounded-md p-2 my-4' 
					/>
					<button
						type='submit'
						className="w-full bg-secondary text-white py-3 px-4 rounded-md hover:bg-secondary-muted transition duration-200 font-medium"
					>
						Charge Extra
					</button>
				</form>

				<div className="mt-6 p-4 bg-gray-100 rounded-md text-sm text-gray-600">
					<p>Note: This is a Stripe integration demonstration using test mode. No actual payment was processed.</p>
				</div>
			</div>
		</div>
	);
}
