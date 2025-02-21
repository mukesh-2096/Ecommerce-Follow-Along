import Card from "./card";


const Product = () => {
    const products = [
        {
            id: 1,
            name: 'Infinix Note 40 Pro+ 5G (Vintage Green, 256 GB) (12 GB RAM)',
            price: 248.15,
            image: 'https://m.media-amazon.com/images/I/41SKvKK4+VL.jpg',
        },
        {
            id: 2,
            name: 'Moto Edge 50 Fusion 5G (Snapdragon 7s Gen 2 & Upto 16 GB RAM)',
            price: 279.32,
            image: 'https://suprememobiles.in/cdn/shop/files/motorolaedge50fusion-32MPFrontcamera.png?v=1736579994',
        },
        {
            id: 3,
            name: 'OnePlus Nord CE4 Lite 5G (Super Silver, 8GB RAM, 128GB Storage)',
            price: 207.74,
            image: 'https://m.media-amazon.com/images/I/61Io5-ojWUL.jpg',
        },
        {
            id: 4,
            name: 'Realme RMX3840 12 Pro+ 12/256 GB Navigator Beige',
            price: 357.80,
            image: 'https://manikmobile.com/wp-content/uploads/2024/06/REALME-12-PLUS-5G-NAVIGATOR-BEIGE_01-1.jpg',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-800 to-blue-600 p-6">
            <h1 className="text-5xl font-bold text-center text-white mb-10">Our Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <Card
                        key={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                    />
                ))}
            </div>
        </div>

    )
}

export default Product

