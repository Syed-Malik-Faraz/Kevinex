import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

export default function FeaturedGrid({ products }) {
  if (!products || products.length === 0) {
    return (
      <p className="text-center text-gray-500 py-20">
        No featured products at the moment.
      </p>
    );
  }

  // 🔥 Filter only Exclusive products
  const exclusiveProducts = products.filter(
    (product) => Math.round(product.price * 1.2) > product.price
  );

  if (exclusiveProducts.length === 0) {
    return (
      <p className="text-center text-gray-500 py-20">
        No exclusive products available.
      </p>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Exclusive Collection
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Handpicked premium essentials curated specially for you.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">

          {exclusiveProducts.map((product, index) => {
            const isMiddle = index % 3 === 1;

            return (
              <motion.div
                key={product._id}
                className={`flex ${isMiddle ? "lg:mt-16" : ""}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.8,
                  ease: "easeOut",
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
