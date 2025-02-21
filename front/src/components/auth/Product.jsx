import Card from "./card";


const Product = () => {
    const products = [
        {
            id: 1,
            name: 'Desktop',
            price: 150,
            image: 'https://www.bhphotovideo.com/images/images2500x2500/hp_64w34aa_aba_p24h_g5_full_hd_1721389.jpg',
        },
        {
            id: 2,
            name: 'Gaming PC',
            price: 250,
            image: 'https://i5.walmartimages.com/seo/Alarco-Gaming-PC-Desktop-Computer-Intel-3-70GHZ-16GB-Ram-512GB-SSD-WIFI-RX-580-8-GB-WINDOWS-11-RGB_aebe3de9-bae4-4e3f-9b75-a4d585a67ffe.f5013633ee4f5323f54e9263a31e5c58.jpeg',
        },
        {
            id: 3,
            name: 'Keyboard + Mouse',
            price: 50,
            image: 'https://i5.walmartimages.com/asr/db1c0af9-f692-489a-8cac-77b326c3a8ca.fd06c35fa92adcaec0824a865a3a67a6.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff',
        },
        {
            id: 4,
            name: 'Gaming Headset',
            price: 90,
            image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6518/6518171_sd.jpg',
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

