import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import stavoLogo from './assets/stavo-logo.svg'
import cloudShape from './assets/cloud-shape.svg'
import heroCloud from './assets/hero-cloud.webp'
import productOne from './assets/product-hoodie.webp'
import productTwo from './assets/product-tracksuit.webp'
import productThree from './assets/product-sneakers.webp'

const manifestoWords = [
  'STAVO',
  'transforms',
  'Romanian',
  'street',
  'energy',
  'into',
  'technical',
  'sportswear',
  'built',
  'for',
  'daily',
  'movement.',
]

const products = [
  { name: 'Aero Hoodie', price: '329 RON', image: productOne },
  { name: 'Metro Track Set', price: '449 RON', image: productTwo },
  { name: 'Pulse Runner', price: '389 RON', image: productThree },
]

function Intro() {
  const heroRef = useRef(null)
  const manifestoRef = useRef(null)

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const logoScale = useTransform(heroProgress, [0, 0.7], [1, 1.2])
  const logoRotate = useTransform(heroProgress, [0, 1], [0, 18])
  const cloudX = useTransform(heroProgress, [0, 1], ['-10%', '15%'])
  const cloudY = useTransform(heroProgress, [0, 1], ['0%', '-20%'])

  return (
    <main className="bg-neutral-950 text-white">
      <section
        ref={heroRef}
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
      >
        <motion.img
          src={heroCloud}
          alt="Soft cloud texture"
          className="absolute top-12 w-72 opacity-35 md:w-96"
          style={{ x: cloudX, y: cloudY }}
        />
        <motion.img
          src={cloudShape}
          alt=""
          aria-hidden="true"
          className="absolute bottom-20 right-12 w-24 opacity-30"
          animate={{ y: [-6, 6, -6] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 6, ease: 'easeInOut' }}
        />
        <motion.img
          src={stavoLogo}
          alt="STAVO logo"
          className="relative z-10 w-40 md:w-56"
          style={{ scale: logoScale, rotate: logoRotate }}
        />
        <p className="relative z-10 mt-6 max-w-2xl text-lg text-neutral-300 md:text-xl">
          Romanian sportswear and streetwear made for the rhythm of the city.
        </p>
      </section>

      <section
        ref={manifestoRef}
        className="flex min-h-screen items-center justify-center px-6 py-20"
      >
        <p className="max-w-4xl text-center text-3xl font-semibold leading-relaxed md:text-5xl">
          {manifestoWords.map((word, index) => (
            <motion.span
              key={word}
              className="mr-3 inline-block"
              initial={{ opacity: 0.15, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.55 }}
              transition={{ delay: index * 0.06, duration: 0.35 }}
            >
              {word}
            </motion.span>
          ))}
        </p>
      </section>

      <section className="min-h-screen px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-4xl font-bold">Shop STAVO</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {products.map((product) => (
              <motion.article
                key={product.name}
                className="group h-96 perspective-1000"
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative h-full w-full preserve-3d">
                  <div className="absolute inset-0 flex h-full flex-col overflow-hidden rounded-3xl border border-white/20 bg-neutral-900 backface-hidden">
                    <img src={product.image} alt={product.name} className="h-56 w-full object-cover" />
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold">{product.name}</h3>
                      <p className="mt-2 text-neutral-300">Flip for details</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex h-full rotate-y-180 flex-col justify-center rounded-3xl border border-white/20 bg-white p-6 text-neutral-950 backface-hidden">
                    <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">New Drop</p>
                    <h3 className="mt-3 text-2xl font-bold">{product.name}</h3>
                    <p className="mt-4 text-lg font-medium">{product.price}</p>
                    <button
                      type="button"
                      className="mt-8 rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Intro
