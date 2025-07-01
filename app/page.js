import Image from 'next/image';
import SwiperCarousel from './components/SwiperCarousel'
import Map from './components/home/map'

export default function Home() {
  const sharedContent = (
    <div>
      <h2
        className="text-5xl font-extrabold drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)]"
        style={{ color: '#cc8f2a' }}
      >
        TRANFORM
      </h2>

      <h2
        className="text-5xl font-light drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)]"
        style={{ color: '#fdfdfd' }}
      >
        & DECORATE
      </h2>
      <br />

      <h3 className="text-[#fdfdfd] drop-shadow-lg">&quot;เปลี่ยนบ้านหลังเก่าให้เป็นไปตามจินตนาการของคุณ&quot;</h3>
    </div>
  )

  const imageSlides = [1, 2, 3, 4, 5, 6, 7]

  const carouselSlides = imageSlides.map((num) => {
    const paddedNum = String(num).padStart(2, '0')

    return {
      id: num,
      background: (
        <Image
          key={num}
          src={`/home/swiper/${paddedNum}.webp`}
          className="w-full h-full object-cover"
          alt={`slide ${num}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={num === 1} // โหลดภาพแรกก่อน
        />
      ),
      content: sharedContent,
    }
  })

  return (
  <main className="flex flex-col">
    <section className="h-[calc(100vh-80px)] overflow-hidden">
      <SwiperCarousel slides={carouselSlides} />
    </section>

    <section className="bg-white py-0">
      <Map />
    </section>
  </main>
  )
}
