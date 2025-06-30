import SwiperCarousel from './components/SwiperCarousel'

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

  const carouselSlides = [
    {
      id: 1,
      background: <img src="/home/swiper/01.webp" className="w-full h-full object-cover" alt="slide 1" />,
      content: sharedContent
    },
    {
      id: 2,
      background: <img src="/home/swiper/02.webp" className="w-full h-full object-cover" alt="slide 2" />,
      content: sharedContent

    },
    {
      id: 3,
      background: <img src="/home/swiper/03.webp" className="w-full h-full object-cover" alt="slide 3" />,
      content: sharedContent
    },
    {
      id: 4,
      background: <img src="/home/swiper/04.webp" className="w-full h-full object-cover" alt="slide 4" />,
      content: sharedContent
    },
    {
      id: 5,
      background: <img src="/home/swiper/05.webp" className="w-full h-full object-cover" alt="slide 5" />,
      content: sharedContent
    },
    {
      id: 6,
      background: <img src="/home/swiper/06.webp" className="w-full h-full object-cover" alt="slide 6" />,
      content: sharedContent
    },
    {
      id: 7,
      background: <img src="/home/swiper/07.webp" className="w-full h-full object-cover" alt="slide 7" />,
      content: sharedContent
    }
  ]

  return (
    <main className="w-full h-[calc(100vh-80px)] overflow-hidden">
      <SwiperCarousel slides={carouselSlides} />
    </main>
  )
}
