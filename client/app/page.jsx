'use client'

import Link from "next/link";

export default function Home() {
    const pages = [
        {
            name: 'Store Management System',
            description: 'Add and manage store information with simple form',
            linkName: 'Manage Stores →',
            link: '/stores'
        },
        {
            name: 'Order Management',
            description: 'Create new orders and view order history',
            linkName: 'View Orders →',
            link: '/orders'
        },
        {
            name: 'Payment Processing',
            description: 'Process additional charges through Stripe integration',
            linkName: 'Process Payment →',
            link: '/payment'
        }
    ]

    return (
        <div className="container mx-auto pt-6">
            <h1 className="text-2xl font-bold mb-6">Store Management System</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pages.map((page, idx) => (
                    <div key={idx} className="flex flex-col justify-between p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-3">{page.name}</h2>
                        <p className="mb-4">{page.description}</p>
                        <Link href={page.link} className="text-secondary hover:underline">
                            {page.linkName}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
