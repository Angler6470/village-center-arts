import { useState, type FormEvent } from 'react'
import {
  Award,
  Brush,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Heart,
  Mail,
  MapPin,
  Menu,
  Palette,
  Phone,
  Sparkles,
  Tag,
  Users,
} from 'lucide-react'

type EventCategory = 'Workshop' | 'Kids Camp' | 'Adult BYOB' | 'Special Event'
type EventStatus = 'Open' | 'Filling Fast' | 'Sold Out'

type StudioEvent = {
  id: string
  title: string
  category: EventCategory
  date: string
  time: string
  price: string
  spotsLeft: string
  image: string
  description: string
  registrationStatus: EventStatus
}

type GalleryCategory = 'Pottery' | 'Painting' | 'Parties' | 'Studio Life'

type GalleryPhoto = {
  id: string
  title: string
  category: GalleryCategory
  imageUrl: string
  caption: string
}

// Update these lists to refresh the events and photos shown on the site.
const UPCOMING_EVENTS: StudioEvent[] = [
  {
    id: 'art-club',
    title: 'VCA Art Club',
    category: 'Kids Camp',
    date: 'School year · registration required',
    time: 'Tuesday–Friday, 3:00–6:00 PM',
    price: '$99 for 2026–27 · sibling & family rates available',
    spotsLeft: 'Contact VCA for current availability',
    image:
      'https://static.wixstatic.com/media/d4ac7d_4a864e76ebf54818954aa13cff9125b0~mv2.jpg/v1/fill/w_900,h_650,al_c,q_85,enc_avif,quality_auto/IMG_20190116_221035_706.jpg',
    description:
      'A year-round creative workspace where young artists pursue their own ideas with support from VCA instructors.',
    registrationStatus: 'Open',
  },
  {
    id: 'pottery-wheel',
    title: 'Pottery Wheel Lessons',
    category: 'Workshop',
    date: 'By appointment',
    time: 'First lesson is two hours',
    price: 'See current lesson options',
    spotsLeft: 'Contact VCA to schedule',
    image:
      'https://static.wixstatic.com/media/d4ac7d_0e69cee89243411d8e2f5a683dfd70ef~mv2.jpg/v1/fill/w_900,h_650,al_c,q_85,enc_avif,quality_auto/d4ac7d_0e69cee89243411d8e2f5a683dfd70ef~mv2.jpg',
    description:
      'Patient, step-by-step instruction, clay, tools, storage, and firing help you turn a lump of clay into your own work.',
    registrationStatus: 'Open',
  },
  {
    id: 'studio-affair',
    title: 'A Studio Affair',
    category: 'Adult BYOB',
    date: 'Every third Saturday',
    time: 'Check the events calendar',
    price: 'Free community event',
    spotsLeft: 'Confirm details before visiting',
    image:
      'https://static.wixstatic.com/media/d4ac7d_5b290e7b2d5e4feba4b366195d22ed3f~mv2.jpg/v1/fill/w_900,h_650,al_c,q_85,enc_avif,quality_auto/d4ac7d_5b290e7b2d5e4feba4b366195d22ed3f~mv2.jpg',
    description:
      'An easygoing, free community gathering for adults to unwind, bring a project, and enjoy a little creative time. BYOB is welcome.',
    registrationStatus: 'Open',
  },
  {
    id: 'summer-camp',
    title: 'Summer Camp Creation',
    category: 'Special Event',
    date: 'Seasonal · check current listings',
    time: 'Half-day and full-day options',
    price: 'See current camp listing',
    spotsLeft: 'Contact VCA for current availability',
    image:
      'https://static.wixstatic.com/media/d4ac7d_3a897564590e415a99ca6ddac079b034~mv2.jpg/v1/fill/w_900,h_650,al_c,q_85,enc_avif,quality_auto/d4ac7d_3a897564590e415a99ca6ddac079b034~mv2.jpg',
    description:
      'Hands-on art, new skills, and imaginative weekly themes for young artists. Visit the current camp page for dates and details.',
    registrationStatus: 'Open',
  },
]

const STUDIO_GALLERY: GalleryPhoto[] = [
  {
    id: 'hands-at-wheel',
    title: 'Pottery wheel lessons',
    category: 'Pottery',
    imageUrl:
      'https://static.wixstatic.com/media/d4ac7d_0bbaa0d2e1454c7cad8ff11e95af95f3~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_90,enc_avif,quality_auto/d4ac7d_0bbaa0d2e1454c7cad8ff11e95af95f3~mv2.jpg',
    caption: 'Get to know the wheel with a patient instructor.',
  },
  {
    id: 'clay-and-kiln',
    title: 'Clay play',
    category: 'Pottery',
    imageUrl:
      'https://static.wixstatic.com/media/d4ac7d_d58ce84b05be45928306abcbc200de45~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_90,enc_avif,quality_auto/d4ac7d_d58ce84b05be45928306abcbc200de45~mv2.jpg',
    caption: 'Make a mess, get curious, and create with clay.',
  },
  {
    id: 'colorful-canvas',
    title: 'Open Studio',
    category: 'Painting',
    imageUrl:
      'https://static.wixstatic.com/media/d4ac7d_3bf27de08ff14099b426254a0a31815c~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_90,enc_avif,quality_auto/Open%20Studio.jpg',
    caption: 'A welcoming place to spend an hour or make a day of it.',
  },
  {
    id: 'paintbrushes',
    title: 'Art Club',
    category: 'Painting',
    imageUrl:
      'https://static.wixstatic.com/media/d4ac7d_4a864e76ebf54818954aa13cff9125b0~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_90,enc_avif,quality_auto/IMG_20190116_221035_706.jpg',
    caption: 'Young artists build their own projects, at their own pace.',
  },
  {
    id: 'creative-gathering',
    title: 'Arty Party',
    category: 'Parties',
    imageUrl:
      'https://static.wixstatic.com/media/d4ac7d_12aa6b0108024ec28b13667771ec0ac2~mv2.png/v1/fill/w_1200,h_900,al_c,q_90,enc_avif,quality_auto/d4ac7d_12aa6b0108024ec28b13667771ec0ac2~mv2.png',
    caption: 'Celebrate with an original art project for every guest.',
  },
  {
    id: 'studio-table',
    title: 'Creative workshops',
    category: 'Studio Life',
    imageUrl:
      'https://static.wixstatic.com/media/d4ac7d_f00a1d1a7a894247bbe5de7836f35e20~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_90,enc_avif,quality_auto/d4ac7d_f00a1d1a7a894247bbe5de7836f35e20~mv2.jpg',
    caption: 'Try something new in a friendly community art studio.',
  },
]

const eventFilters = ['All Events', 'Workshops', 'Kids', 'Adult BYOB'] as const

type EventFilter = (typeof eventFilters)[number]
const galleryFilters: Array<'All' | GalleryCategory> = [
  'All',
  'Pottery',
  'Painting',
  'Parties',
  'Studio Life',
]

const offerings = [
  {
    number: '01',
    title: "Children's Programs",
    description:
      'Art Club gives young artists a year-round place to pursue their own ideas with instructor guidance.',
    icon: Palette,
    accent: 'text-green-700',
    image:
      'https://static.wixstatic.com/media/d4ac7d_4a864e76ebf54818954aa13cff9125b0~mv2.jpg/v1/fill/w_900,h_650,al_c,q_85,enc_avif,quality_auto/IMG_20190116_221035_706.jpg',
    href: 'https://www.villagecenterarts.org/afterschoolclasses',
  },
  {
    number: '02',
    title: 'Adult Programs',
    description:
      'Explore art at your own pace, from pottery wheel lessons to relaxed classes and community events.',
    icon: Brush,
    accent: 'text-orange-600',
    image:
      'https://static.wixstatic.com/media/d4ac7d_05ece92f0c0d499ea39da60af430d1c9~mv2.jpg/v1/fill/w_900,h_650,al_c,q_85,enc_avif,quality_auto/DEC%20(10).jpg',
    href: 'https://www.villagecenterarts.org/adultclasses',
  },
  {
    number: '03',
    title: 'Open Studio',
    description:
      'Drop by to paint, make, and spend as little or as long as you like in the studio.',
    icon: Heart,
    accent: 'text-[#672752]',
    image:
      'https://static.wixstatic.com/media/d4ac7d_3bf27de08ff14099b426254a0a31815c~mv2.jpg/v1/fill/w_900,h_650,al_c,q_85,enc_avif,quality_auto/Open%20Studio.jpg',
    href: 'https://www.villagecenterarts.org/open-studio',
  },
  {
    number: '04',
    title: 'Arty Party',
    description:
      'Celebrate with a staffed, two-hour art party where every guest makes an original creation.',
    icon: Sparkles,
    accent: 'text-amber-500',
    image:
      'https://static.wixstatic.com/media/d4ac7d_12aa6b0108024ec28b13667771ec0ac2~mv2.png/v1/fill/w_900,h_650,al_c,q_85,enc_avif,quality_auto/d4ac7d_12aa6b0108024ec28b13667771ec0ac2~mv2.png',
    href: 'https://www.villagecenterarts.org/birthday-parties',
  },
]

const studioHours = [
  { day: 'Tuesday – Friday', hours: '11:00 AM – 6:00 PM' },
  { day: 'Saturday', hours: '10:00 AM – 6:00 PM' },
  { day: 'Sunday', hours: '12:00 PM – 5:00 PM' },
]

function App() {
  const [eventFilter, setEventFilter] = useState<EventFilter>('All Events')
  const [galleryFilter, setGalleryFilter] = useState<'All' | GalleryCategory>(
    'All',
  )
  const [selectedEventId, setSelectedEventId] = useState('')
  const [programType, setProgramType] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const visibleEvents = UPCOMING_EVENTS.filter((event) => {
    switch (eventFilter) {
      case 'Workshops':
        return event.category === 'Workshop' || event.category === 'Special Event'
      case 'Kids':
        return event.category === 'Kids Camp'
      case 'Adult BYOB':
        return event.category === 'Adult BYOB'
      default:
        return true
    }
  })

  const visibleGallery = STUDIO_GALLERY.filter(
    (photo) => galleryFilter === 'All' || photo.category === galleryFilter,
  )

  const selectedEvent = UPCOMING_EVENTS.find(
    (event) => event.id === selectedEventId,
  )

  function chooseEvent(event: StudioEvent) {
    setSelectedEventId(event.id)
    setProgramType(
      event.category === 'Kids Camp'
        ? 'camp'
        : event.category === 'Adult BYOB'
          ? 'byob'
          : event.id === 'pottery-wheel'
            ? 'pottery'
            : 'paint',
    )
    setSubmitted(false)
    document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' })
  }

  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  const navLinks = [
    { label: 'After School', href: '#art-club' },
    { label: 'Open Studio', href: '#open-studio' },
    { label: 'Summer Camps', href: '#events' },
    { label: 'Pottery', href: '#events' },
    { label: 'Events', href: '#events' },
    { label: 'Parties', href: '#inquiry' },
    { label: 'More', href: '#about' },
    { label: 'Visit', href: '#visit' },
  ]

  return (
    <>
      <style>{'html { scroll-behavior: smooth; }'}</style>
      <div className="min-h-screen bg-[#fff9fc] text-[#392137] selection:bg-[#f7a34b] selection:text-[#392137]">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 bg-[#60284f] px-4 py-2.5 text-center text-xs font-semibold tracking-wide text-white sm:text-sm">
          <span>
            Your Art Center for 26 Years <span className="px-1">•</span>{' '}
            12 Main Street, New Milford <span className="px-1">•</span> Call{' '}
            <a className="underline decoration-white/60 underline-offset-2" href="tel:8603544318">
              (860) 354-4318
            </a>
          </span>
          <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold">
            Walk-Ins Welcome During Studio Hours
          </span>
        </div>

        <header className="sticky top-0 z-50 border-b border-[#60284f]/10 bg-[#fff9fc]/95 backdrop-blur-lg">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <a href="#top" className="flex shrink-0 items-center gap-3" aria-label="Village Center for the Arts home">
              <img
                src="https://static.wixstatic.com/media/d4ac7d_ef0c7bbc30754d698f990917d9d923c0~mv2.png/v1/fill/w_347,h_96,al_c,q_85/PlainLogoGreen%20Smaller.png"
                alt="Village Center for the Arts — a nonprofit community fine art center"
                className="h-auto w-48 sm:w-56"
              />
            </a>

            <nav className="hidden items-center gap-3 xl:flex" aria-label="Main navigation">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs font-bold uppercase tracking-wide text-[#55354d] transition hover:text-orange-700"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden shrink-0 items-center gap-2 xl:flex">
              <a
                href="tel:8603544318"
                className="inline-flex items-center gap-2 rounded-full border border-[#60284f]/20 px-4 py-2.5 text-sm font-semibold text-[#60284f] transition hover:border-orange-500 hover:text-orange-700"
              >
                <Phone size={15} />
                <span className="hidden 2xl:inline">Call</span> (860) 354-4318
              </a>
              <a
                href="#inquiry"
                className="rounded-full bg-[#f59a45] px-5 py-2.5 text-sm font-bold text-[#432439] transition hover:bg-[#ee8732]"
              >
                Inquire / Book
              </a>
            </div>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#60284f]/20 text-[#60284f] xl:hidden"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <Menu size={21} />
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="border-t border-[#60284f]/10 bg-[#fff4fa] px-4 py-4 xl:hidden">
              <nav className="mx-auto flex max-w-7xl flex-col gap-1" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#55354d] hover:bg-[#60284f]/5"
                  >
                    {link.label}
                  </a>
                ))}
                <a href="tel:8603544318" className="mt-2 inline-flex items-center gap-2 rounded-lg bg-[#60284f] px-3 py-2.5 text-sm font-bold text-white">
                  <Phone size={16} /> Call (860) 354-4318
                </a>
                <a href="#inquiry" onClick={() => setMobileMenuOpen(false)} className="mt-2 rounded-lg bg-[#f59a45] px-3 py-2.5 text-center text-sm font-bold text-[#432439]">
                  Inquire / Book
                </a>
              </nav>
            </div>
          )}
        </header>

        <main id="top">
          <section className="relative isolate overflow-hidden">
            <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_75%_30%,rgba(245,154,69,0.20),transparent_45%),linear-gradient(115deg,#fff8fc_10%,#f8e8f3_60%,#f9eee7)]" />
            <div className="absolute -right-24 top-10 -z-10 h-80 w-80 rounded-full bg-[#d7e4cf]/70 blur-3xl sm:h-[34rem] sm:w-[34rem]" />
            <div className="mx-auto grid min-h-[640px] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.04fr_0.96fr] lg:px-8 lg:py-24">
              <div className="relative z-10 max-w-2xl">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#60284f]/15 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-[#60284f]">
                  <Sparkles size={15} />
                  A nonprofit community fine art center
                </div>
                <p className="mb-3 text-sm font-bold tracking-wide text-green-800">
                  Your Art Center for 26 Years
                </p>
                <p className="mb-4 text-sm font-semibold text-[#624e60]">
                  12 Main Street · New Milford, Connecticut
                </p>
                <h1 className="text-5xl font-black leading-[0.99] tracking-tight text-[#432439] sm:text-6xl lg:text-7xl">
                  Walk in.
                  <span className="mt-3 block text-[#60284f]">
                    Make art. Make it yours.
                  </span>
                </h1>
                <p className="mt-7 max-w-xl text-lg leading-8 text-[#604f5e] sm:text-xl">
                  A one-of-a-kind, walk-in-and-create art center for all ages.
                  Find your next idea in open studio, pottery, art classes,
                  camps, and parties—guided by a community that loves to make.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="https://www.villagecenterarts.org/open-studio"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f59a45] px-6 py-4 text-sm font-extrabold text-[#432439] shadow-xl shadow-orange-950/10 transition hover:-translate-y-0.5 hover:bg-[#ee8732]"
                  >
                    Explore Open Studio <ChevronRight size={18} />
                  </a>
                  <a
                    href="https://www.villagecenterarts.org/eventscalendar"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#60284f]/20 bg-white/70 px-6 py-4 text-sm font-bold text-[#60284f] transition hover:border-[#60284f]/50 hover:bg-white"
                  >
                    See Events & Classes <ChevronRight size={18} />
                  </a>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-[#60284f]/15 pt-6 sm:grid-cols-4">
                  {[
                    { icon: Award, text: '26 years making art' },
                    { icon: Palette, text: 'All ages welcome' },
                    { icon: Heart, text: 'Walk-in studio' },
                    { icon: Users, text: '501(c)(3) nonprofit' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-start gap-2 text-xs font-semibold leading-5 text-[#604f5e]">
                      <Icon className="mt-0.5 shrink-0 text-green-800" size={16} />
                      {text}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
                <div className="absolute -left-5 -top-5 z-10 hidden rounded-2xl border border-[#60284f]/10 bg-white/95 p-4 shadow-2xl sm:block">
                <p className="text-xs font-bold uppercase tracking-widest text-green-800">Make something</p>
                <p className="mt-1 text-lg font-black text-[#432439]">wonderfully yours.</p>
                </div>
                <div className="overflow-hidden rounded-[2rem] border border-[#60284f]/10 bg-white p-2 shadow-2xl shadow-[#60284f]/10">
                  <img
                    src="https://static.wixstatic.com/media/d4ac7d_12aa6b0108024ec28b13667771ec0ac2~mv2.png/v1/fill/w_1400,h_1100,al_c,q_90,enc_avif,quality_auto/d4ac7d_12aa6b0108024ec28b13667771ec0ac2~mv2.png"
                    alt="Creative arts and pottery projects from Village Center for the Arts"
                    className="h-[390px] w-full rounded-[1.5rem] object-cover sm:h-[500px]"
                  />
                </div>
                <div className="absolute -bottom-5 right-3 flex items-center gap-3 rounded-2xl border border-[#60284f]/10 bg-white px-4 py-3 shadow-xl sm:right-8">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d8e3d1] text-green-900">
                    <MapPin size={19} />
                  </span>
                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-[#806c7d]">Right by</span>
                    <span className="block text-sm font-extrabold text-[#432439]">New Milford Town Green</span>
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section id="about" className="scroll-mt-28 border-y border-[#60284f]/10 bg-white py-14">
            <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-[auto_1fr] md:items-center lg:px-8">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#dce7d6] text-green-900"><Heart size={26} /></span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-green-800">Art belongs to everyone</p>
                <p className="mt-2 max-w-4xl text-lg font-semibold leading-8 text-[#50384d]">
                  VCA is a nonprofit arts center making room for creative learning, self-expression, and community connection through programs for all ages.
                </p>
              </div>
            </div>
          </section>

          <section id="studios" className="scroll-mt-28 bg-[#fff4fa] py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-green-800">Find your next creative thing</p>
                  <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight text-[#432439] sm:text-4xl">
                    Come make something <span className="text-[#60284f]">with us.</span>
                  </h2>
                </div>
                <p className="max-w-md text-sm leading-6 text-[#715f70]">
                  From young artists finding their own ideas to adults trying
                  something new, there&apos;s a place for you at VCA.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {offerings.map(({ number, title, description, icon: Icon, accent, image, href }) => (
                  <article key={number} id={number === '01' ? 'art-club' : number === '03' ? 'open-studio' : undefined} className="group overflow-hidden rounded-2xl border border-[#60284f]/10 bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#60284f]/30 hover:shadow-xl hover:shadow-[#60284f]/10">
                    <div className="relative h-44 overflow-hidden">
                      <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#432439]/70 to-transparent" />
                      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold tracking-wider text-[#60284f]">{number}</span>
                      <Icon className={`absolute bottom-4 right-4 ${accent}`} size={25} />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-extrabold leading-snug text-[#432439]">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#715f70]">{description}</p>
                      <a href={href} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[#60284f] transition group-hover:text-orange-700">
                        Explore program <ChevronRight size={16} />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-white py-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f9e1c8] text-[#8a4818]"><Award size={23} /></span>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#806c7d]">Community recognized</p>
                  <p className="mt-1 font-extrabold text-[#432439]">Award-winning art center · First Place for Kids Art Classes</p>
                </div>
              </div>
              <a href="https://litchfieldmagazine.com/readers-choice-survey-2027/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 self-start rounded-full border border-[#60284f]/20 px-5 py-3 text-sm font-bold text-[#60284f] transition hover:bg-[#fff4fa] md:self-auto">
                Nominate VCA <ChevronRight size={16} />
              </a>
            </div>
          </section>

          <section id="events" className="scroll-mt-28 bg-white py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-green-800">Calendar & programs</p>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-[#432439] sm:text-4xl">There’s always something to make.</h2>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-[#715f70]">
                    Explore recurring programs and seasonal offerings. Schedules
                    change—check VCA&apos;s current calendar or call before you visit.
                  </p>
                </div>
                <a href="https://www.villagecenterarts.org/eventscalendar" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 self-start rounded-full bg-[#60284f] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#47203b] lg:self-auto">
                  View the VCA event calendar <ChevronRight size={16} />
                </a>
              </div>

              <div className="mt-8 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Filter events">
                {eventFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    role="tab"
                    aria-selected={eventFilter === filter}
                    onClick={() => setEventFilter(filter)}
                    className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-bold transition ${
                      eventFilter === filter
                        ? 'bg-[#60284f] text-white'
                        : 'border border-[#60284f]/15 bg-[#fff4fa] text-[#604f5e] hover:border-[#60284f]/40 hover:text-[#432439]'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {visibleEvents.map((event) => (
                  <article key={event.id} className="flex overflow-hidden rounded-2xl border border-[#60284f]/10 bg-[#fff9fc] shadow-sm">
                    <div className="flex w-full flex-col">
                      <div className="relative h-48">
                        <img src={event.image} alt="" className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#432439]/70 to-transparent" />
                        <span className={`absolute right-3 top-3 rounded-full px-3 py-1 text-[11px] font-extrabold ${
                          event.registrationStatus === 'Filling Fast'
                            ? 'bg-[#f59a45] text-[#432439]'
                            : event.registrationStatus === 'Sold Out'
                              ? 'bg-[#60284f] text-white'
                              : 'bg-[#dce7d6] text-green-900'
                        }`}>
                          {event.registrationStatus}
                        </span>
                        <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-[#432439]/85 px-3 py-1.5 text-xs font-bold text-white">
                          <Calendar size={13} className="text-[#f8bd75]" /> {event.date}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-full bg-[#60284f]/10 px-3 py-1 text-[11px] font-bold text-[#60284f]">
                          <Tag size={12} /> {event.category}
                        </span>
                        <h3 className="text-lg font-extrabold leading-snug text-[#432439]">{event.title}</h3>
                        <p className="mt-2 flex-1 text-sm leading-6 text-[#715f70]">{event.description}</p>
                        <div className="mt-4 space-y-2 border-t border-[#60284f]/10 pt-4 text-xs text-[#604f5e]">
                          <p className="flex items-center gap-2"><Clock size={14} className="text-green-800" />{event.time}</p>
                          <p className="flex items-center gap-2"><Tag size={14} className="text-green-800" />{event.price}</p>
                          <p className="flex items-center gap-2"><Users size={14} className="text-green-800" />{event.spotsLeft}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => chooseEvent(event)}
                          disabled={event.registrationStatus === 'Sold Out'}
                          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#f59a45] px-4 py-3 text-sm font-extrabold text-[#432439] transition hover:bg-[#ee8732] disabled:cursor-not-allowed disabled:bg-[#e9dce6] disabled:text-[#806c7d]"
                        >
                          {event.registrationStatus === 'Sold Out' ? 'Join the waitlist' : 'Ask about dates'}
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
                {visibleEvents.length === 0 && (
                  <p className="col-span-full rounded-2xl border border-white/10 bg-stone-900 p-8 text-center text-stone-400">
                    Nothing listed in this category right now. Contact the studio
                    and we&apos;ll help you find a good fit.
                  </p>
                )}
              </div>
            </div>
          </section>

          <section className="bg-[#60284f] py-16 text-white sm:py-20">
            <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f8bd75]">A little support makes a big difference</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Help keep creativity within reach.</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
                  As a nonprofit, community support helps VCA offer more
                  opportunities for young artists and local families.
                </p>
                <a href="https://www.villagecenterarts.org/tuitionassistance" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#f8bd75] hover:text-white">
                  Learn about tuition assistance <ChevronRight size={16} />
                </a>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a href="https://a.co/027eqrM" target="_blank" rel="noreferrer" className="rounded-full bg-white px-5 py-3 text-center text-sm font-extrabold text-[#60284f] transition hover:bg-[#fff0f8]">Shop the wish list</a>
                <a href="https://account.venmo.com/u/villagecenterarts" target="_blank" rel="noreferrer" className="rounded-full border border-white/35 px-5 py-3 text-center text-sm font-extrabold text-white transition hover:bg-white/10">Give with Venmo</a>
                <a href="https://www.paypal.com/donate/?hosted_button_id=2ELW248BXVFYJ" target="_blank" rel="noreferrer" className="rounded-full bg-[#f59a45] px-5 py-3 text-center text-sm font-extrabold text-[#432439] transition hover:bg-[#ee8732]">Donate with PayPal</a>
              </div>
            </div>
          </section>

          <section id="gallery" className="scroll-mt-28 bg-[#fff4fa] py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-green-800">A peek inside the studio</p>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-[#432439] sm:text-4xl">A little inspiration from VCA.</h2>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-[#715f70]">
                    Take a look at the art, activities, and creative community
                    that make this place special.
                  </p>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter studio photos">
                  {galleryFilters.map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      aria-pressed={galleryFilter === filter}
                      onClick={() => setGalleryFilter(filter)}
                      className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${
                        galleryFilter === filter
                          ? 'bg-green-800 text-white'
                          : 'border border-[#60284f]/15 text-[#604f5e] hover:border-green-800/40 hover:text-[#432439]'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-8 grid auto-rows-[220px] grid-cols-2 gap-3 sm:auto-rows-[250px] sm:grid-cols-3 lg:grid-cols-4">
                {visibleGallery.map((photo, index) => (
                  <figure
                    key={photo.id}
                    className={`group relative overflow-hidden rounded-2xl bg-[#e9dce6] ${
                      index === 0 ? 'col-span-2 row-span-2' : ''
                    }`}
                  >
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#30202e]/90 via-[#30202e]/5 to-transparent opacity-80 transition group-hover:opacity-100" />
                    <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-4 transition duration-300 group-hover:translate-y-0 sm:p-5">
                      <span className="mb-2 inline-block rounded-full bg-[#dce7d6] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-green-900">{photo.category}</span>
                      <h3 className="text-lg font-extrabold text-white">{photo.title}</h3>
                      <p className="mt-1 text-xs text-stone-200 sm:text-sm">{photo.caption}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden bg-[#dce7d6] py-16 text-[#432439] sm:py-20">
            <div className="absolute -right-12 -top-24 h-72 w-72 rounded-full border-[40px] border-green-950/5" />
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-green-900">Come in and create</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Open Studio, your way.</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#604f5e] sm:text-base">
                  Drop by for an hour or make a day of it. Try something new,
                  pick up a project, or bring an idea you&apos;ve been waiting to explore.
                </p>
              </div>
              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {[
                  {
                    number: '01',
                    title: 'Choose your creative adventure',
                    text: 'Pick an activity at the studio or bring along a project of your own.',
                  },
                  {
                    number: '02',
                    title: 'Create at your own pace',
                    text: 'Settle in for an hour or stay longer. VCA instructors can help you along the way.',
                  },
                  {
                    number: '03',
                    title: 'Make space for inspiration',
                    text: 'Work on something new, build your skills, and enjoy making art in good company.',
                  },
                ].map((step) => (
                  <div key={step.number} className="rounded-2xl border border-green-950/10 bg-white/60 p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#60284f] text-sm font-black text-white">{step.number}</span>
                    <h3 className="mt-5 text-xl font-extrabold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-800">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="inquiry" className="scroll-mt-28 bg-white py-20 sm:py-24">
            <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
              <div className="lg:py-5">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-green-800">Celebrate with art</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-[#432439] sm:text-4xl">Arty Party, VCA style.</h2>
                <p className="mt-5 text-base leading-7 text-[#715f70]">
                  Make a birthday or group gathering memorable with a two-hour,
                  artist-staffed celebration. Guests can paint ceramics, build
                  wood crafts, decorate keepsake boxes, try splatter painting,
                  and more. Ask about party options and availability.
                </p>
                <div className="mt-8 space-y-4">
                  <a href="tel:8603544318" className="flex items-center gap-3 text-sm font-semibold text-[#432439] hover:text-orange-700">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff4fa] text-[#60284f]"><Phone size={18} /></span>
                    (860) 354-4318
                  </a>
                  <a href="mailto:vca@villagecenterarts.org" className="flex items-center gap-3 text-sm font-semibold text-[#432439] hover:text-orange-700">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff4fa] text-[#60284f]"><Mail size={18} /></span>
                    vca@villagecenterarts.org
                  </a>
                  <a href="https://www.villagecenterarts.org/birthday-parties" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-[#60284f] hover:text-orange-700">
                    See VCA party details <ChevronRight size={16} />
                  </a>
                </div>
              </div>

              <form onSubmit={submitInquiry} className="rounded-3xl border border-[#60284f]/10 bg-[#fff9fc] p-5 shadow-sm sm:p-8">
                {submitted ? (
                  <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#dce7d6] text-green-900"><Check size={30} /></span>
                    <h3 className="mt-6 text-2xl font-black text-[#432439]">Thanks for reaching out!</h3>
                    <p className="mt-3 max-w-md leading-7 text-[#604f5e]">
                      Your inquiry is ready. This preview does not send form
                      details to VCA; please email or call the studio to book.
                    </p>
                    {selectedEvent && <p className="mt-3 text-sm font-bold text-[#60284f]">Your selection: {selectedEvent.title}</p>}
                    <button type="button" onClick={() => setSubmitted(false)} className="mt-6 text-sm font-bold text-[#60284f] underline underline-offset-4">Send another inquiry</button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-extrabold text-[#432439]">Workshop & party inquiry</h3>
                    <p className="mt-1 text-sm text-[#715f70]">Tell us a little about what you have in mind.</p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <label className="text-xs font-bold text-[#604f5e]">
                        Name *
                        <input required name="name" autoComplete="name" className="mt-2 w-full rounded-xl border border-[#60284f]/15 bg-white px-4 py-3 text-sm text-[#432439] outline-none placeholder:text-[#a994a7] focus:border-[#60284f]" placeholder="Your name" />
                      </label>
                      <label className="text-xs font-bold text-[#604f5e]">
                        Email *
                        <input required name="email" type="email" autoComplete="email" className="mt-2 w-full rounded-xl border border-[#60284f]/15 bg-white px-4 py-3 text-sm text-[#432439] outline-none placeholder:text-[#a994a7] focus:border-[#60284f]" placeholder="you@example.com" />
                      </label>
                      <label className="text-xs font-bold text-[#604f5e]">
                        Phone
                        <input name="phone" type="tel" autoComplete="tel" className="mt-2 w-full rounded-xl border border-[#60284f]/15 bg-white px-4 py-3 text-sm text-[#432439] outline-none placeholder:text-[#a994a7] focus:border-[#60284f]" placeholder="(860) 555-0123" />
                      </label>
                      <label className="text-xs font-bold text-[#604f5e]">
                        Event / program type *
                        <select required name="programType" value={programType} onChange={(change) => setProgramType(change.target.value)} className="mt-2 w-full rounded-xl border border-[#60284f]/15 bg-white px-4 py-3 text-sm text-[#432439] outline-none focus:border-[#60284f]">
                          <option value="" disabled>Select a program</option>
                          <option value="pottery">Pottery lessons / Clay Play</option>
                          <option value="paint">Drop-in paint / ceramics</option>
                          <option value="party">Birthday party / private event</option>
                          <option value="byob">Adult BYOB night</option>
                          <option value="camp">After-school / camp inquiry</option>
                        </select>
                      </label>
                      <label className="text-xs font-bold text-[#604f5e]">
                        Interested in a specific event?
                        <select
                          name="event"
                          value={selectedEventId}
                          onChange={(change) => setSelectedEventId(change.target.value)}
                          className="mt-2 w-full rounded-xl border border-[#60284f]/15 bg-white px-4 py-3 text-sm text-[#432439] outline-none focus:border-[#60284f]"
                        >
                          <option value="">No specific event</option>
                          {UPCOMING_EVENTS.map((studioEvent) => (
                            <option key={studioEvent.id} value={studioEvent.id}>{studioEvent.title}</option>
                          ))}
                        </select>
                      </label>
                      <label className="text-xs font-bold text-[#604f5e]">
                        Approximate group size
                        <input name="groupSize" inputMode="numeric" className="mt-2 w-full rounded-xl border border-[#60284f]/15 bg-white px-4 py-3 text-sm text-[#432439] outline-none placeholder:text-[#a994a7] focus:border-[#60284f]" placeholder="e.g. 8" />
                      </label>
                      <label className="text-xs font-bold text-[#604f5e] sm:col-span-2">
                        Preferred date window
                        <input name="dateWindow" className="mt-2 w-full rounded-xl border border-[#60284f]/15 bg-white px-4 py-3 text-sm text-[#432439] outline-none placeholder:text-[#a994a7] focus:border-[#60284f]" placeholder="A day, week, or time of year" />
                      </label>
                      <label className="text-xs font-bold text-[#604f5e] sm:col-span-2">
                        Message
                        <textarea name="message" rows={4} className="mt-2 w-full resize-y rounded-xl border border-[#60284f]/15 bg-white px-4 py-3 text-sm text-[#432439] outline-none placeholder:text-[#a994a7] focus:border-[#60284f]" placeholder="Share any details that will help us plan..." />
                      </label>
                    </div>
                    <button type="submit" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#f59a45] px-5 py-3.5 text-sm font-extrabold text-[#432439] transition hover:bg-[#ee8732] sm:w-auto">
                      Send inquiry <ChevronRight size={17} />
                    </button>
                    <p className="mt-3 text-xs leading-5 text-[#806c7d]">This form shows a local confirmation only and does not send your details. To reach the studio directly, email <a className="text-[#60284f] underline underline-offset-2" href="mailto:vca@villagecenterarts.org">vca@villagecenterarts.org</a>.</p>
                  </>
                )}
              </form>
            </div>
          </section>

          <section id="visit" className="scroll-mt-28 bg-[#fff4fa] py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-9 text-center">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-green-800">Come find us on the Green</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-[#432439] sm:text-4xl">Your creative spot in town.</h2>
              </div>
              <div className="grid overflow-hidden rounded-3xl border border-[#60284f]/10 bg-white shadow-sm lg:grid-cols-[0.9fr_1.1fr]">
                <div className="p-6 sm:p-9">
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#dce7d6] text-green-900"><MapPin size={23} /></span>
                    <div>
                      <h3 className="text-xl font-extrabold text-[#432439]">Village Center for the Arts</h3>
                      <p className="mt-2 text-sm leading-6 text-[#715f70]">12 Main Street<br />New Milford, CT 06776<br /><span className="font-semibold text-green-800">Right across from the Town Green</span></p>
                    </div>
                  </div>
                  <div className="mt-7 border-t border-[#60284f]/10 pt-6">
                    <h4 className="flex items-center gap-2 text-sm font-extrabold text-[#432439]"><Clock size={17} className="text-[#60284f]" /> Studio hours</h4>
                    <div className="mt-4 space-y-2.5">
                      {studioHours.map((entry) => (
                        <div key={entry.day} className="flex items-center justify-between gap-3 rounded-lg bg-[#fff4fa] px-3 py-2 text-sm text-[#604f5e]">
                          <span className="font-semibold">{entry.day}</span>
                          <span className="text-right">{entry.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="mt-4 text-xs leading-5 text-[#806c7d]">Program times may vary. Call ahead to confirm current studio hours and availability.</p>
                  <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                    <a href="tel:8603544318" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#60284f] px-4 py-3 text-xs font-extrabold text-white hover:bg-[#47203b]"><Phone size={15} /> Call (860) 354-4318</a>
                    <a href="mailto:vca@villagecenterarts.org" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#60284f]/20 px-4 py-3 text-xs font-bold text-[#60284f] hover:border-[#60284f]/50"><Mail size={15} /> Email the Studio</a>
                    <a href="https://www.google.com/maps/search/?api=1&query=12+Main+Street%2C+New+Milford%2C+CT+06776" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#60284f]/20 px-4 py-3 text-xs font-bold text-[#60284f] hover:border-[#60284f]/50">Directions via Google Maps <ChevronRight size={15} /></a>
                  </div>
                </div>
                <a href="https://www.google.com/maps/search/?api=1&query=12+Main+Street%2C+New+Milford%2C+CT+06776" target="_blank" rel="noreferrer" className="group relative min-h-[330px] overflow-hidden bg-[#e9dce6]">
                  <img src="https://static.wixstatic.com/media/d4ac7d_fd7a8de1af374081a15ece961e98bdb6.jpg/v1/fill/w_1200,h_1000,al_c,q_85,enc_avif,quality_auto/d4ac7d_fd7a8de1af374081a15ece961e98bdb6.jpg" alt="Historic New Milford building, home of Village Center for the Arts" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#30202e]/80 via-transparent to-transparent" />
                  <span className="absolute bottom-7 left-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#60284f] shadow-xl"><MapPin size={17} /> Find us across from the Green <ChevronRight size={16} /></span>
                </a>
              </div>
            </div>
          </section>
        </main>

        <footer id="contact" className="scroll-mt-28 bg-[#432439] text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_1fr_auto] md:items-center lg:px-8">
            <a href="#top" className="inline-flex w-fit items-center rounded-xl bg-white px-3 py-2">
              <img
                src="https://static.wixstatic.com/media/d4ac7d_ef0c7bbc30754d698f990917d9d923c0~mv2.png/v1/fill/w_300,h_84,al_c,q_85/PlainLogoGreen%20Smaller.png"
                alt="Village Center for the Arts"
                className="h-auto w-48"
                loading="lazy"
              />
            </a>
            <div className="text-xs leading-6 text-white/75">
              <p>© {new Date().getFullYear()} Village Center for the Arts · Registered 501(c)(3) nonprofit</p>
              <p>12 Main Street, New Milford, CT 06776 · Dates, times, and pricing may change; call ahead to confirm.</p>
              <a href="tel:8603544318" className="mt-1 inline-flex items-center gap-2 font-bold text-[#f8bd75] hover:text-white"><Phone size={14} /> (860) 354-4318</a>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-bold text-white/80">
              <a href="https://www.instagram.com/villagecenterarts/" target="_blank" rel="noreferrer" className="hover:text-[#f8bd75]">Instagram</a>
              <a href="https://www.facebook.com/www.villagecenterarts.org" target="_blank" rel="noreferrer" className="hover:text-[#f8bd75]">Facebook</a>
              <a href="https://www.tiktok.com/@vcanewmilfordct?lang=en" target="_blank" rel="noreferrer" className="hover:text-[#f8bd75]">TikTok</a>
              <a href="mailto:vca@villagecenterarts.org" className="inline-flex items-center gap-1 hover:text-[#f8bd75]"><Mail size={14} /> Email</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default App
