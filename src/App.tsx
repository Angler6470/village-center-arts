import { useEffect, useState, type FormEvent } from 'react'
import {
  Award,
  Brush,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Heart,
  Mail,
  MapPin,
  Menu,
  Palette,
  Phone,
  Sparkles,
  Users,
  X,
  ShieldCheck,
} from 'lucide-react'

type ViewId = 'home' | 'pottery' | 'fine-arts' | 'parties-camps' | 'events' | 'visit'
type ScheduleCategory = 'Clay' | 'Painting' | 'Youth' | 'BYOB Adult'
type ScheduleStatus = 'Open' | 'Filling Fast' | 'Sold Out'
type EventFilter = 'All' | 'Clay & Wheel' | 'Adult BYOB' | 'Youth'

type ScheduleItem = {
  id: string
  title: string
  category: ScheduleCategory
  date: string
  time: string
  price: string
  description: string
  spotsRemaining: string
  status: ScheduleStatus
  image: string
}

type GalleryItem = {
  id: string
  category: 'Pottery' | 'Painting' | 'Studio' | 'Youth'
  title: string
  caption: string
  image: string
}

type PricingTier = {
  id: string
  title: string
  description: string
  price: string
  note: string
}

// Keep these arrays current as classes, availability, photos, and rates change.
const UPCOMING_SCHEDULE: ScheduleItem[] = [
  {
    id: 'art-club',
    title: 'VCA Art Club',
    category: 'Youth',
    date: 'School year · registration required',
    time: 'Tuesday–Friday · 3:00–6:00 PM',
    price: '$99 for 2026–27; sibling and family rates available',
    description:
      'A year-round creative workspace where young artists choose projects and get support from VCA instructors.',
    spotsRemaining: 'Ask the studio about current availability',
    status: 'Open',
    image:
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'wheel-lesson',
    title: 'Beginner Pottery Wheel Lesson',
    category: 'Clay',
    date: 'By appointment',
    time: 'First lesson · 2 hours',
    price: 'Contact VCA for current lesson rates',
    description:
      'Get patient, step-by-step instruction and experience the feel of shaping clay on the wheel.',
    spotsRemaining: 'Call to schedule',
    status: 'Open',
    image:
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'studio-affair',
    title: 'A Studio Affair',
    category: 'BYOB Adult',
    date: 'Every third Saturday',
    time: 'See the VCA calendar for this month’s time',
    price: 'Free community event',
    description:
      'Unplug, bring a project you have been meaning to finish, and enjoy a relaxed creative gathering. BYOB welcome.',
    spotsRemaining: 'Check the current event listing',
    status: 'Open',
    image:
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'summer-camp',
    title: 'Summer Camp Creation',
    category: 'Youth',
    date: 'Seasonal · check current listings',
    time: 'Half-day and full-day programs',
    price: 'Varies by camp; see current camp listing',
    description:
      'Themed weeks invite young artists to explore fine arts, pottery, and mixed media.',
    spotsRemaining: 'Ask about the next camp session',
    status: 'Open',
    image:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'senior-clay',
    title: 'Senior Clay Hand-Building',
    category: 'Clay',
    date: 'Seasonal sessions',
    time: 'Ask about current class dates',
    price: 'Contact VCA for current rates',
    description:
      'A welcoming introduction to hand-building with clay. No previous pottery experience is needed.',
    spotsRemaining: 'Class sizes may be limited',
    status: 'Open',
    image:
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'watercolor',
    title: 'Adult Watercolor',
    category: 'Painting',
    date: 'Seasonal sessions',
    time: 'Ask about current class dates',
    price: 'Contact VCA for current rates',
    description:
      'Explore watercolor techniques, color, and your own ideas in a relaxed studio setting.',
    spotsRemaining: 'Ask about current availability',
    status: 'Open',
    image:
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=85',
  },
]

const GALLERY_COLLECTIONS: GalleryItem[] = [
  {
    id: 'wheel',
    category: 'Pottery',
    title: 'Find your center',
    caption: 'Wheel lessons for curious beginners and returning makers.',
    image:
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=90',
  },
  {
    id: 'hand-built',
    category: 'Pottery',
    title: 'Made by hand',
    caption: 'Build, shape, and make a piece that is yours.',
    image:
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=90',
  },
  {
    id: 'color',
    category: 'Painting',
    title: 'A little more color',
    caption: 'Paint, experiment, and follow your own ideas.',
    image:
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=90',
  },
  {
    id: 'watercolor-art',
    category: 'Painting',
    title: 'Let it flow',
    caption: 'Explore color and technique in a relaxed studio.',
    image:
      'https://images.unsplash.com/photo-1515405295579-ba7b45403062?auto=format&fit=crop&w=1200&q=90',
  },
  {
    id: 'youth-art',
    category: 'Youth',
    title: 'Young makers, big ideas',
    caption: 'Room to discover, learn, and create at every age.',
    image:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=90',
  },
  {
    id: 'studio-life',
    category: 'Studio',
    title: 'A place to make',
    caption: 'A friendly creative home right on the Town Green.',
    image:
      'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1200&q=90',
  },
]

const PRICING_TIERS: PricingTier[] = [
  {
    id: 'drop-in',
    title: 'Drop-in studio',
    description: 'Choose a project and make art at your own pace.',
    price: 'Ask for current studio and project pricing',
    note: 'Project costs vary by materials and piece.',
  },
  {
    id: 'wheel',
    title: 'Pottery wheel lesson',
    description: 'A two-hour first lesson with instruction and clay.',
    price: 'Contact VCA for current lesson rates',
    note: 'Ask about included materials, firing, and follow-up options.',
  },
  {
    id: 'party',
    title: 'Arty Party',
    description: 'A staffed two-hour art celebration for your group.',
    price: 'Ask for package options and current rates',
    note: 'Project choice and extras depend on availability.',
  },
  {
    id: 'camp',
    title: 'Art Club & camps',
    description: 'Youth programs, from school-year Art Club to seasonal camps.',
    price: 'Rates vary by program',
    note: 'The 2026–27 Art Club listing is $99 per child; sibling and family rates available.',
  },
]

const VIEWS: Array<{ id: ViewId; label: string }> = [
  { id: 'home', label: 'Studio Home' },
  { id: 'pottery', label: 'Pottery & Clay' },
  { id: 'fine-arts', label: 'Paint & Fine Arts' },
  { id: 'parties-camps', label: 'Parties & Camps' },
  { id: 'events', label: 'Events Calendar' },
  { id: 'visit', label: 'Visit & Hours' },
]

const HOURS = [
  { day: 'Monday', time: 'Closed' },
  { day: 'Tuesday – Thursday', time: '11:00 AM – 6:00 PM' },
  { day: 'Friday', time: '11:00 AM – 8:00 PM', highlight: true },
  { day: 'Saturday', time: '10:00 AM – 6:00 PM' },
  { day: 'Sunday', time: '12:00 PM – 5:00 PM' },
]

const ACTIVITY_OPTIONS = [
  { value: 'wheel', label: 'Pottery Wheel Lesson' },
  { value: 'painting', label: 'Drop-in Painting Question' },
  { value: 'party', label: 'Birthday Party' },
  { value: 'byob', label: 'Adult BYOB' },
  { value: 'camp', label: 'Summer Camp' },
]

const buttonPrimary =
  'inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-orange-950/20 transition hover:-translate-y-0.5 hover:bg-orange-400'
const buttonSecondary =
  'inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-amber-300/50 hover:bg-white/10'

function App() {
  const [currentView, setCurrentView] = useState<ViewId>('home')
  const [activeFilter, setActiveFilter] = useState<EventFilter>('All')
  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingActivity, setBookingActivity] = useState('')
  const [bookingEvent, setBookingEvent] = useState('')
  const [bookingSubmitted, setBookingSubmitted] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    if (!bookingOpen) return
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setBookingOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [bookingOpen])

  function openBooking(activity = '', eventId = '') {
    setBookingActivity(activity)
    setBookingEvent(eventId)
    setBookingSubmitted(false)
    setBookingOpen(true)
    setMobileNavOpen(false)
  }

  function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBookingSubmitted(true)
  }

  const filteredSchedule = UPCOMING_SCHEDULE.filter((item) => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Clay & Wheel') return item.category === 'Clay'
    if (activeFilter === 'Adult BYOB') return item.category === 'BYOB Adult'
    return item.category === 'Youth'
  })

  function changeView(view: ViewId) {
    setCurrentView(view)
    setMobileNavOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 selection:bg-amber-300 selection:text-stone-950">
      <div className="bg-orange-600 px-3 py-2 text-center text-xs font-bold tracking-wide text-white sm:px-4 sm:text-sm">
        🎨 Celebrating 25+ Years on the Green <span className="px-1">•</span>
        12 Main St <span className="px-1">•</span> Walk-Ins Welcome During
        Studio Hours <span className="px-1">•</span>
        <a href="tel:8603544318" className="underline underline-offset-2">
          (860) 354-4318
        </a>
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-stone-950/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => changeView('home')}
            className="flex shrink-0 items-center gap-3 text-left"
            aria-label="Village Center for the Arts home"
          >
            <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 text-stone-950">
              <Palette size={22} strokeWidth={2.3} />
              <Sparkles className="absolute -right-1 -top-1 text-amber-200" size={16} />
            </span>
            <span className="leading-tight">
              <span className="block text-[11px] font-black tracking-[0.15em] text-white sm:text-xs">
                VILLAGE CENTER
              </span>
              <span className="block text-[10px] font-bold tracking-[0.23em] text-orange-300">
                FOR THE ARTS
              </span>
            </span>
          </button>
          <a
            href="tel:8603544318"
            className="ml-auto hidden items-center gap-2 text-sm font-semibold text-stone-300 hover:text-amber-300 lg:inline-flex"
          >
            <Phone size={15} /> (860) 354-4318
          </a>
          <button
            type="button"
            onClick={() => openBooking()}
            className={`${buttonPrimary} hidden sm:inline-flex`}
          >
            Book a Wheel / Event <ChevronRight size={16} />
          </button>
          <button
            type="button"
            onClick={() => setMobileNavOpen((open) => !open)}
            aria-label={mobileNavOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileNavOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
          >
            {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="mx-auto hidden max-w-7xl gap-2 overflow-x-auto px-4 pb-3 sm:px-6 lg:flex lg:px-8" aria-label="Studio sections">
          {VIEWS.map((view) => (
            <button
              type="button"
              key={view.id}
              onClick={() => changeView(view.id)}
              aria-current={currentView === view.id ? 'page' : undefined}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${
                currentView === view.id
                  ? 'bg-amber-300 text-stone-950'
                  : 'bg-white/5 text-stone-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {view.label}
            </button>
          ))}
        </nav>

        {mobileNavOpen && (
          <nav className="grid grid-cols-2 gap-2 border-t border-white/10 bg-stone-900 p-4 lg:hidden" aria-label="Mobile studio sections">
            {VIEWS.map((view) => (
              <button
                type="button"
                key={view.id}
                onClick={() => changeView(view.id)}
                className={`rounded-xl px-3 py-3 text-left text-sm font-bold ${
                  currentView === view.id
                    ? 'bg-amber-300 text-stone-950'
                    : 'bg-stone-800 text-stone-200'
                }`}
              >
                {view.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => openBooking()}
              className="col-span-2 mt-1 rounded-xl bg-orange-500 px-3 py-3 text-sm font-extrabold text-white"
            >
              Book a Wheel / Event
            </button>
          </nav>
        )}
      </header>

      <main className="min-h-[70vh]">
        {currentView === 'home' && (
          <HomeView onNavigate={changeView} onBook={openBooking} />
        )}
        {currentView === 'pottery' && <PotteryView onBook={openBooking} />}
        {currentView === 'fine-arts' && <FineArtsView onBook={openBooking} />}
        {currentView === 'parties-camps' && <PartiesView onBook={openBooking} />}
        {currentView === 'events' && (
          <EventsView
            filter={activeFilter}
            onFilter={setActiveFilter}
            schedule={filteredSchedule}
            onBook={openBooking}
          />
        )}
        {currentView === 'visit' && <VisitView onBook={openBooking} />}
      </main>

      <footer className="border-t border-white/10 bg-zinc-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="text-xs font-black tracking-[0.15em] text-white">
              VILLAGE CENTER FOR THE ARTS
            </p>
            <p className="mt-1 text-xs text-stone-500">
              Community Fine Art, Pottery Wheel & Creative Hub on the Green
            </p>
          </div>
          <p className="text-xs leading-5 text-stone-500">
            501(c)(3) Nonprofit <span className="px-1">•</span> 12 Main Street,
            New Milford, CT 06776
          </p>
          <div className="flex gap-4">
            <a href="tel:8603544318" aria-label="Call VCA" className="text-stone-400 hover:text-amber-300">
              <Phone size={18} />
            </a>
            <a href="mailto:vca@villagecenterarts.org" aria-label="Email VCA" className="text-stone-400 hover:text-amber-300">
              <Mail size={18} />
            </a>
            <button type="button" onClick={() => changeView('visit')} className="text-stone-400 hover:text-amber-300" aria-label="Visit VCA">
              <MapPin size={18} />
            </button>
          </div>
        </div>
      </footer>

      {bookingOpen && (
        <BookingDrawer
          activity={bookingActivity}
          eventId={bookingEvent}
          submitted={bookingSubmitted}
          onClose={() => setBookingOpen(false)}
          onActivityChange={setBookingActivity}
          onEventChange={setBookingEvent}
          onSubmit={submitBooking}
          onReset={() => setBookingSubmitted(false)}
        />
      )}
    </div>
  )
}

function ViewHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string
  title: string
  copy: string
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-300">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
        {title}
      </h1>
      <p className="mt-5 text-base leading-7 text-stone-300 sm:text-lg">{copy}</p>
    </div>
  )
}

function HomeView({
  onNavigate,
  onBook,
}: {
  onNavigate: (view: ViewId) => void
  onBook: (activity?: string, eventId?: string) => void
}) {
  const shortcuts: Array<{
    title: string
    description: string
    view: ViewId
    image: string
    icon: typeof Palette
  }> = [
    {
      title: 'Pottery & Clay',
      description: 'Wheel lessons, hand-building, and kiln-fired keepsakes.',
      view: 'pottery',
      image:
        'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=900&q=85',
      icon: Palette,
    },
    {
      title: 'Paint & Fine Arts',
      description: 'Open studio, painting, youth art, and creative classes.',
      view: 'fine-arts',
      image:
        'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=85',
      icon: Brush,
    },
    {
      title: 'Parties & Camps',
      description: 'Celebrate, gather, and make something together.',
      view: 'parties-camps',
      image:
        'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=85',
      icon: Heart,
    },
  ]

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_75%_35%,rgba(234,88,12,0.26),transparent_42%),linear-gradient(120deg,#0c0a09_5%,#211812_54%,#302017)]" />
        <div className="absolute -right-24 top-10 -z-10 h-80 w-80 rounded-full bg-orange-500/15 blur-3xl sm:h-[35rem] sm:w-[35rem]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:min-h-[650px] lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-300/25 bg-orange-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-orange-200">
              <Sparkles size={15} /> Your creative home on the Green
            </div>
            <p className="mb-4 text-sm font-semibold text-amber-300">
              Community Fine Art, Pottery Wheel & Creative Hub for 25+ Years
            </p>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.99] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Get Your Hands Dirty.
              <span className="mt-3 block text-orange-400">
                Unleash Your Creativity on the Green.
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-stone-300">
              Walk in and create. Explore pottery, painting, open studio, youth
              programs, and joyful art experiences for all ages—right in the
              heart of New Milford.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => onNavigate('events')} className={buttonPrimary}>
                Explore the Studio <ChevronRight size={17} />
              </button>
              <button type="button" onClick={() => onBook()} className={buttonSecondary}>
                Book a Wheel / Event <Calendar size={16} />
              </button>
            </div>
            <div className="mt-9 grid grid-cols-2 gap-x-5 gap-y-3 border-t border-white/10 pt-6 sm:grid-cols-4">
              {[
                { icon: Award, label: '25+ Years on the Green' },
                { icon: Palette, label: 'Pottery Wheel Studio' },
                { icon: Heart, label: 'Walk-Ins Welcome' },
                { icon: ShieldCheck, label: '501(c)(3) Nonprofit' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-start gap-2 text-xs font-semibold leading-5 text-stone-300">
                  <Icon size={16} className="mt-0.5 shrink-0 text-amber-300" />
                  {label}
                </div>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-stone-800 p-2 shadow-2xl shadow-black/50">
              <img
                src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1400&q=90"
                alt="Hands shaping clay on a pottery wheel"
                className="h-[370px] w-full rounded-[1.5rem] object-cover sm:h-[480px]"
              />
            </div>
            <div className="absolute -bottom-5 right-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-stone-900 px-4 py-3 shadow-xl sm:right-8">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-300 text-stone-950">
                <MapPin size={19} />
              </span>
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-stone-400">
                  Find us at
                </span>
                <span className="block text-sm font-extrabold text-white">
                  12 Main Street · Town Green
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-900 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-300">
                No experience necessary
              </p>
              <h2 className="mt-2 text-3xl font-black text-white">
                Drop in. Make it yours.
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-6 text-stone-400">
              Come in for an hour or spend the day. The VCA team is here to help
              you feel at home in the studio.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                number: '01',
                title: 'Pick your bisque or clay',
                text: 'Choose a ceramic project, a canvas, or a bit of clay and find your starting point.',
              },
              {
                number: '02',
                title: 'Paint, make, create',
                text: 'Settle in with studio materials and friendly guidance from our artists.',
              },
              {
                number: '03',
                title: 'Glaze & kiln fired',
                text: 'Take home paint projects the same day. Pottery stays for glazing and firing.',
              },
            ].map((step) => (
              <div key={step.number} className="rounded-2xl border border-white/10 bg-stone-800 p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-sm font-black text-white">
                  {step.number}
                </span>
                <h3 className="mt-4 font-extrabold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-400">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-950 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Find your kind of creative"
            title="A studio with room for everyone."
            copy="Browse a few of the ways to make, learn, celebrate, and connect at VCA."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {shortcuts.map(({ title, description, view, image, icon: Icon }) => (
              <button
                key={view}
                type="button"
                onClick={() => onNavigate(view)}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-stone-900 text-left transition hover:-translate-y-1 hover:border-orange-400/40"
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent" />
                  <Icon size={24} className="absolute bottom-4 right-4 text-amber-300" />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-extrabold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-400">{description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-orange-300">
                    Explore <ChevronRight size={16} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <GalleryPreview />

      <section className="bg-orange-600 py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-100">
              Good things grow together
            </p>
            <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
              Support a creative community.
            </h2>
            <p className="mt-2 text-sm leading-6 text-orange-50/90">
              VCA is a nonprofit arts center. Your time, supplies, and support
              help make creative experiences possible for local families.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <a
              href="https://www.villagecenterarts.org/tuitionassistance"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/40 px-5 py-3 text-center text-sm font-bold text-white hover:bg-white/10"
            >
              Scholarship information
            </a>
            <a
              href="mailto:vca@villagecenterarts.org?subject=Volunteering%20with%20VCA"
              className="rounded-full border border-white/40 px-5 py-3 text-center text-sm font-bold text-white hover:bg-white/10"
            >
              Volunteer with VCA
            </a>
            <a
              href="https://www.paypal.com/donate/?hosted_button_id=2ELW248BXVFYJ"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-amber-300 px-5 py-3 text-center text-sm font-extrabold text-stone-950 hover:bg-amber-200"
            >
              Support VCA
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

function SectionIntro({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string
  title: string
  copy: string
}) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-300">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-400">{copy}</p>
    </div>
  )
}

function GalleryPreview() {
  const [galleryFilter, setGalleryFilter] = useState<'All' | GalleryItem['category']>('All')
  const categories: Array<'All' | GalleryItem['category']> = [
    'All',
    'Pottery',
    'Painting',
    'Youth',
    'Studio',
  ]
  const photos = GALLERY_COLLECTIONS.filter(
    (item) => galleryFilter === 'All' || item.category === galleryFilter,
  )
  return (
    <section className="bg-stone-900 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionIntro
            eyebrow="From around the studio"
            title="A little inspiration."
            copy="A glimpse of the materials, color, and making that fill our days."
          />
          <div className="flex gap-2 overflow-x-auto pb-1" aria-label="Filter studio gallery">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={galleryFilter === category}
                onClick={() => setGalleryFilter(category)}
                className={`shrink-0 rounded-full px-3 py-2 text-xs font-bold ${
                  galleryFilter === category
                    ? 'bg-amber-300 text-stone-950'
                    : 'border border-white/10 text-stone-300 hover:border-white/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-7 grid auto-rows-[190px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:grid-cols-3 lg:grid-cols-4">
          {photos.map((photo, index) => (
            <figure
              key={photo.id}
              className={`group relative overflow-hidden rounded-2xl bg-stone-800 ${
                index === 0 ? 'col-span-2 row-span-2' : ''
              }`}
            >
              <img
                src={photo.image}
                alt={photo.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4">
                <span className="rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-white">
                  {photo.category}
                </span>
                <h3 className="mt-2 text-lg font-extrabold text-white">{photo.title}</h3>
                <p className="mt-1 text-xs leading-5 text-stone-200">{photo.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function PotteryView({ onBook }: { onBook: (activity?: string) => void }) {
  return (
    <ViewShell className="bg-stone-950">
      <ViewHeading
        eyebrow="Clay & wheel studio"
        title="Get centered at the wheel."
        copy="From a first try at the pottery wheel to experienced studio practice, VCA welcomes curious makers at every stage."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <img
          src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1400&q=90"
          alt="Pottery wheel lesson in progress"
          className="h-[340px] w-full rounded-3xl object-cover sm:h-[460px]"
        />
        <div className="grid gap-4">
          <DetailCard
            icon={<Palette size={20} />}
            title="Wheel throwing"
            text="Start with a one-time beginner lesson or ask about multi-week intensive and multi-visit instruction. VCA’s published lesson information includes a two-hour first lesson, clay, tools, instruction, and firing details; confirm current package specifics and rates when booking."
          />
          <DetailCard
            icon={<Users size={20} />}
            title="Open studio & practice"
            text="Returning potters can ask about open studio time, wheel rental between lessons, and glazing access. Availability depends on studio schedules."
          />
          <DetailCard
            icon={<Heart size={20} />}
            title="Senior 60+ clay club"
            text="Explore hand-building with clay in a supportive, beginner-friendly setting. Ask VCA about current senior class dates, location, accessibility, and rates."
          />
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-stone-900 p-6 sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-300">
            From wet clay to keepsake
          </p>
          <h2 className="mt-2 text-2xl font-black text-white">The firing & glazing journey</h2>
          <div className="mt-6 space-y-4">
            {[
              ['Shape & dry', 'Your piece needs time to dry before its first firing.'],
              ['Bisque firing', 'The first kiln firing prepares the clay for glazing.'],
              ['Glaze & finish', 'Choose compatible studio glazes; ask about high-fire stoneware options and firing schedules.'],
              ['Pick up', 'Firing schedules vary—confirm your pickup timeline with VCA.'],
            ].map(([title, copy], index) => (
              <div key={title} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs font-black text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-bold text-white">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-stone-400">{copy}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 rounded-xl bg-stone-800 p-4 text-xs leading-5 text-stone-300">
            Clay type, glaze compatibility, and firing temperature must be
            confirmed with the studio before firing outside work.
          </p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-stone-900 p-6 sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-300">
            First time at the wheel?
          </p>
          <h2 className="mt-2 text-2xl font-black text-white">A few good-to-knows</h2>
          <div className="mt-5 space-y-3">
            {[
              ['What should I wear?', 'Comfortable clothes you can move in. Clay can be messy, so skip anything precious.'],
              ['Should I trim my nails?', 'Shorter nails can make centering and shaping easier, especially for beginners.'],
              ['Is cleanup included?', 'Ask your instructor what to expect for setup and cleanup in your lesson.'],
              ['Do I need experience?', 'No. Beginner lessons are designed to introduce the wheel step by step.'],
            ].map(([question, answer]) => (
              <details key={question} className="group rounded-xl border border-white/10 bg-stone-950 px-4 py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-stone-100">
                  {question}
                  <ChevronDown size={17} className="shrink-0 text-amber-300 transition group-open:rotate-180" />
                </summary>
                <p className="pt-3 text-sm leading-6 text-stone-400">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
      <PricingPanel ids={['wheel']} />
      <button type="button" onClick={() => onBook('wheel')} className={`${buttonPrimary} mt-8`}>
        Book a wheel lesson <ChevronRight size={17} />
      </button>
    </ViewShell>
  )
}

function FineArtsView({ onBook }: { onBook: (activity?: string) => void }) {
  return (
    <ViewShell className="bg-stone-900">
      <ViewHeading
        eyebrow="Paint, explore, express"
        title="Make space for your imagination."
        copy="Drop into the studio, explore an adult class, or help a young artist follow an idea wherever it leads."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {[
          {
            icon: Palette,
            title: 'Paint-your-own ceramics',
            text: 'Choose from 200+ bisque pieces, including mugs, bowls, planters, and figures. Ask what is currently in stock and how glazing and firing work for your project.',
            image:
              'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=85',
          },
          {
            icon: Brush,
            title: 'Canvas & watercolor',
            text: 'Paint in open studio or ask about guided sessions and seasonal watercolor classes for adults. Bring your own idea or ask what the studio is offering.',
            image:
              'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=85',
          },
          {
            icon: Sparkles,
            title: 'Youth & teen arts',
            text: 'VCA Art Club gives young artists a year-round workspace to explore projects such as drawing, anime and comic art, and sculpture with instructor support. Ask VCA about portfolio preparation options.',
            image:
              'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=85',
          },
        ].map(({ icon: Icon, title, text, image }) => (
          <article key={title} className="overflow-hidden rounded-2xl border border-white/10 bg-stone-800">
            <img src={image} alt="" className="h-52 w-full object-cover" loading="lazy" />
            <div className="p-5">
              <Icon size={22} className="text-amber-300" />
              <h2 className="mt-3 text-xl font-extrabold text-white">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-stone-400">{text}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-3xl border border-white/10 bg-stone-950 p-6 sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-300">Year-round creative workspace</p>
          <h2 className="mt-2 text-2xl font-black text-white">VCA Art Club</h2>
          <p className="mt-4 text-sm leading-6 text-stone-300">
            Tuesday–Friday, 3:00–6:00 PM during the school year. Artists bring
            an idea or project and can return to work on it over time.
            Registration is required.
          </p>
          <p className="mt-4 rounded-xl bg-stone-900 p-4 text-sm font-bold text-amber-200">
            Published 2026–27 tuition: $99 per child, $49 per sibling, $197
            family maximum. Confirm current registration details with VCA.
          </p>
        </div>
        <div className="rounded-3xl border border-orange-300/20 bg-orange-500/10 p-6 sm:p-8">
          <h2 className="text-2xl font-black text-white">Open studio, open mind.</h2>
          <p className="mt-3 text-sm leading-6 text-stone-300">
            The live VCA site describes Open Studio as a place to come in and
            spend an hour or the day. Call ahead to confirm current activities,
            materials, and availability.
          </p>
          <button type="button" onClick={() => onBook('painting')} className={`${buttonPrimary} mt-6`}>
            Ask about open studio <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <PricingPanel ids={['drop-in']} />
    </ViewShell>
  )
}

function PartiesView({ onBook }: { onBook: (activity?: string) => void }) {
  return (
    <ViewShell className="bg-stone-950">
      <ViewHeading
        eyebrow="Gather, celebrate, create"
        title="Make your next get-together an Arty Party."
        copy="Artist-staffed celebrations and seasonal youth programs bring people together around making something original."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <img
          src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=90"
          alt="Colorful art projects on a studio table"
          className="h-[340px] w-full rounded-3xl object-cover"
        />
        <div className="rounded-3xl border border-white/10 bg-stone-900 p-6 sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-300">Birthday parties & private groups</p>
          <h2 className="mt-2 text-2xl font-black text-white">Every guest makes an original artwork.</h2>
          <p className="mt-4 text-sm leading-6 text-stone-400">
            VCA party options include ceramic painting, wood crafts, keepsake
            boxes, tie dye, and splatter painting. Party extras and projects
            depend on instructor and studio availability.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-stone-300">
            <li className="flex gap-2"><CheckCircle2 size={17} className="shrink-0 text-amber-300" /> Professional artist staff</li>
            <li className="flex gap-2"><CheckCircle2 size={17} className="shrink-0 text-amber-300" /> Scout art badge workshops available</li>
            <li className="flex gap-2"><CheckCircle2 size={17} className="shrink-0 text-amber-300" /> Ask about food setup and special needs</li>
          </ul>
          <button type="button" onClick={() => onBook('party')} className={`${buttonPrimary} mt-6`}>
            Reserve a date <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <DetailCard
          icon={<Heart size={20} />}
          title="Friday late night"
          text="Friday studio hours run until 8:00 PM. Ask VCA about current adult BYOB, Open Clay, and paint night options before planning your visit."
          action={<button type="button" onClick={() => onBook('byob')} className="mt-4 text-sm font-bold text-amber-300 hover:text-amber-200">Ask about Friday nights →</button>}
        />
        <DetailCard
          icon={<Sparkles size={20} />}
          title="School break & summer camps"
          text="Seasonal camps explore fine arts, pottery, and mixed media through hands-on projects and changing weekly themes. Dates, ages, and rates vary by session."
          action={<button type="button" onClick={() => onBook('camp')} className="mt-4 text-sm font-bold text-amber-300 hover:text-amber-200">Ask about camps →</button>}
        />
      </div>
      <PricingPanel ids={['party', 'camp']} />
    </ViewShell>
  )
}

function EventsView({
  filter,
  onFilter,
  schedule,
  onBook,
}: {
  filter: EventFilter
  onFilter: (filter: EventFilter) => void
  schedule: ScheduleItem[]
  onBook: (activity?: string, eventId?: string) => void
}) {
  const filters: EventFilter[] = ['All', 'Clay & Wheel', 'Adult BYOB', 'Youth']
  return (
    <ViewShell className="bg-stone-900">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <ViewHeading
          eyebrow="Make a date with creativity"
          title="Events & studio calendar."
          copy="Browse recurring programs, classes, and seasonal offerings. Dates, availability, and pricing can change; confirm with VCA before you make plans."
        />
        <a
          href="https://www.villagecenterarts.org/eventscalendar"
          target="_blank"
          rel="noreferrer"
          className={`${buttonSecondary} shrink-0`}
        >
          Official VCA calendar <ChevronRight size={16} />
        </a>
      </div>
      <div className="mt-8 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Filter schedule">
        {filters.map((tag) => (
          <button
            key={tag}
            type="button"
            role="tab"
            aria-selected={filter === tag}
            onClick={() => onFilter(tag)}
            className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-bold ${
              filter === tag
                ? 'bg-amber-300 text-stone-950'
                : 'border border-white/10 bg-stone-950 text-stone-300 hover:border-white/25'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {schedule.map((item) => (
          <article key={item.id} className="overflow-hidden rounded-2xl border border-white/10 bg-stone-950">
            <div className="relative h-48">
              <img src={item.image} alt="" className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent" />
              <span className={`absolute right-3 top-3 rounded-full px-3 py-1 text-[11px] font-extrabold ${
                item.status === 'Filling Fast'
                  ? 'bg-amber-300 text-stone-950'
                  : item.status === 'Sold Out'
                    ? 'bg-stone-700 text-white'
                    : 'bg-emerald-400 text-stone-950'
              }`}>
                {item.status}
              </span>
              <span className="absolute bottom-3 left-3 rounded-full bg-stone-950/80 px-3 py-1.5 text-xs font-bold text-white">
                {item.category}
              </span>
            </div>
            <div className="p-5">
              <h2 className="text-xl font-extrabold text-white">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-stone-400">{item.description}</p>
              <div className="mt-4 space-y-2 border-t border-white/10 pt-4 text-xs text-stone-300">
                <p className="flex gap-2"><Calendar size={14} className="text-amber-300" />{item.date}</p>
                <p className="flex gap-2"><Clock size={14} className="text-amber-300" />{item.time}</p>
                <p className="flex gap-2"><Users size={14} className="text-amber-300" />{item.spotsRemaining}</p>
                <p className="pt-1 font-bold text-amber-200">{item.price}</p>
              </div>
              <button
                type="button"
                disabled={item.status === 'Sold Out'}
                onClick={() =>
                  onBook(
                    item.category === 'Youth'
                      ? 'camp'
                      : item.category === 'BYOB Adult'
                        ? 'byob'
                        : item.category === 'Painting'
                          ? 'painting'
                          : 'wheel',
                    item.id,
                  )
                }
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-stone-700"
              >
                RSVP / Inquire <ChevronRight size={16} />
              </button>
            </div>
          </article>
        ))}
        {schedule.length === 0 && (
          <p className="col-span-full rounded-2xl border border-white/10 bg-stone-950 p-8 text-center text-stone-400">
            There are no listings in this category right now.
          </p>
        )}
      </div>
      <p className="mt-6 text-xs leading-5 text-stone-500">
        This is a curated program overview, not a live booking feed. Check the official
        calendar or contact the studio for exact dates, availability, and current rates.
      </p>
    </ViewShell>
  )
}

function VisitView({ onBook }: { onBook: (activity?: string) => void }) {
  return (
    <ViewShell className="bg-stone-950">
      <ViewHeading
        eyebrow="Right on the Town Green"
        title="Come find your creative corner."
        copy="Village Center for the Arts is at 12 Main Street in New Milford, directly on the Town Green and across from Town Hall."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-white/10 bg-stone-900 p-6 sm:p-8">
          <h2 className="flex items-center gap-2 text-xl font-extrabold text-white">
            <Clock className="text-amber-300" size={20} /> Studio hours
          </h2>
          <div className="mt-5 space-y-2">
            {HOURS.map(({ day, time, highlight }) => (
              <div
                key={day}
                className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm ${
                  highlight
                    ? 'border border-amber-300/20 bg-amber-300/10 text-amber-100'
                    : 'bg-stone-950 text-stone-300'
                }`}
              >
                <span className="font-bold">
                  {day}
                  {highlight && (
                    <span className="ml-2 rounded-full bg-amber-300 px-2 py-0.5 text-[9px] font-black uppercase text-stone-950">
                      Late Night
                    </span>
                  )}
                </span>
                <span>{time}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-5 text-stone-500">
            Friday late hours include adult BYOB and Open Clay offerings when
            scheduled. Please call ahead to confirm program availability.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a href="tel:8603544318" className={buttonPrimary}><Phone size={15} /> Call (860) 354-4318</a>
            <a href="mailto:vca@villagecenterarts.org" className={buttonSecondary}><Mail size={15} /> Email VCA</a>
          </div>
        </div>
        <div className="relative min-h-[380px] overflow-hidden rounded-3xl bg-stone-800">
          <img
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=85"
            alt="Artwork and paint supplies in an art studio"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-300">Visit the studio</p>
            <h2 className="mt-2 text-2xl font-black text-white">12 Main Street</h2>
            <p className="mt-2 text-sm text-stone-200">New Milford, CT 06776 · across from Town Hall</p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=12+Main+Street%2C+New+Milford%2C+CT+06776"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-extrabold text-stone-950"
            >
              <MapPin size={16} /> Directions via Google Maps
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <DetailCard
          icon={<MapPin size={20} />}
          title="Parking nearby"
          text="Town Green street parking and nearby municipal lots serve the Main Street area. Follow posted parking signs and local restrictions."
        />
        <DetailCard
          icon={<ShieldCheck size={20} />}
          title="A nonprofit arts center"
          text="VCA is a registered 501(c)(3) nonprofit, building a nurturing environment for artistic creativity and development through programs and events for all ages."
        />
        <DetailCard
          icon={<Heart size={20} />}
          title="Help the arts thrive"
          text="Volunteer, support scholarships, or donate supplies to help keep community arts accessible."
          action={
            <a
              href="https://www.paypal.com/donate/?hosted_button_id=2ELW248BXVFYJ"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-amber-300"
            >
              Support VCA <ChevronRight size={15} />
            </a>
          }
        />
      </div>
      <button type="button" onClick={() => onBook()} className={`${buttonPrimary} mt-8`}>
        Ask a question <ChevronRight size={16} />
      </button>
    </ViewShell>
  )
}

function ViewShell({
  children,
  className,
}: {
  children: React.ReactNode
  className: string
}) {
  return (
    <section className={`${className} min-h-[75vh] px-4 py-12 sm:px-6 sm:py-16 lg:px-8`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  )
}

function DetailCard({
  icon,
  title,
  text,
  action,
}: {
  icon: React.ReactNode
  title: string
  text: string
  action?: React.ReactNode
}) {
  return (
    <article className="rounded-2xl border border-white/10 bg-stone-800 p-5">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/15 text-amber-300">
        {icon}
      </span>
      <h3 className="mt-4 text-lg font-extrabold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-stone-400">{text}</p>
      {action}
    </article>
  )
}

function PricingPanel({ ids }: { ids: string[] }) {
  const tiers = PRICING_TIERS.filter((tier) => ids.includes(tier.id))
  return (
    <section className="mt-10">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-300">
        Pricing & planning
      </p>
      <h2 className="mt-2 text-2xl font-black text-white">Clear answers before you arrive.</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {tiers.map((tier) => (
          <article key={tier.id} className="rounded-2xl border border-white/10 bg-stone-900 p-5">
            <h3 className="font-extrabold text-white">{tier.title}</h3>
            <p className="mt-2 text-sm text-stone-400">{tier.description}</p>
            <p className="mt-4 text-sm font-bold text-amber-200">{tier.price}</p>
            <p className="mt-2 text-xs leading-5 text-stone-500">{tier.note}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function BookingDrawer({
  activity,
  eventId,
  submitted,
  onClose,
  onActivityChange,
  onEventChange,
  onSubmit,
  onReset,
}: {
  activity: string
  eventId: string
  submitted: boolean
  onClose: () => void
  onActivityChange: (activity: string) => void
  onEventChange: (id: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onReset: () => void
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-white/10 bg-stone-950 shadow-2xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-stone-950/95 px-5 py-4 backdrop-blur sm:px-7">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-300">Let’s make a plan</p>
            <h2 id="booking-title" className="mt-1 text-xl font-black text-white">Book a wheel / event</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close booking form" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white hover:bg-white/10">
            <X size={20} />
          </button>
        </div>
        {submitted ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
            <CheckCircle2 size={56} className="text-emerald-400" />
            <h3 className="mt-5 text-2xl font-black text-white">Thanks for your interest!</h3>
            <p className="mt-3 max-w-sm text-sm leading-6 text-stone-300">
              Your inquiry is ready. This demo does not send your information
              to VCA. Please call or email the studio to confirm availability
              and make a reservation.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a href="tel:8603544318" className={buttonPrimary}><Phone size={15} /> Call the studio</a>
              <a href="mailto:vca@villagecenterarts.org" className={buttonSecondary}><Mail size={15} /> Email VCA</a>
            </div>
            <button type="button" onClick={onReset} className="mt-6 text-sm font-bold text-amber-300 underline underline-offset-4">
              Send another inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex-1 px-5 py-6 sm:px-7">
            <p className="mb-6 text-sm leading-6 text-stone-400">
              Tell us what you have in mind. We’ll help you find a good time and
              confirm current details.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Name *">
                <input required name="name" autoComplete="name" placeholder="Your name" className={inputClass} />
              </FormField>
              <FormField label="Email *">
                <input required name="email" type="email" autoComplete="email" placeholder="you@example.com" className={inputClass} />
              </FormField>
              <FormField label="Phone">
                <input name="phone" type="tel" autoComplete="tel" placeholder="(860) 555-0123" className={inputClass} />
              </FormField>
              <FormField label="Activity type *">
                <select required value={activity} onChange={(event) => onActivityChange(event.target.value)} className={inputClass}>
                  <option value="" disabled>Choose an activity</option>
                  {ACTIVITY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </FormField>
              <FormField label="Specific class or event">
                <select value={eventId} onChange={(event) => onEventChange(event.target.value)} className={inputClass}>
                  <option value="">No specific listing</option>
                  {UPCOMING_SCHEDULE.map((item) => (
                    <option key={item.id} value={item.id}>{item.title}</option>
                  ))}
                </select>
              </FormField>
              <FormField label="Group size">
                <input name="groupSize" inputMode="numeric" placeholder="e.g. 6" className={inputClass} />
              </FormField>
              <FormField label="Preferred date window" wide>
                <input name="dateWindow" placeholder="Day, week, or time of year" className={inputClass} />
              </FormField>
              <FormField label="Notes" wide>
                <textarea name="notes" rows={4} placeholder="Tell us a bit more..." className={`${inputClass} resize-y`} />
              </FormField>
            </div>
            <button type="submit" className={`${buttonPrimary} mt-6 w-full`}>
              Send inquiry <ChevronRight size={17} />
            </button>
            <p className="mt-4 text-center text-xs leading-5 text-stone-500">
              This front-end preview does not transmit or store form details.
              Contact VCA directly at{' '}
              <a href="mailto:vca@villagecenterarts.org" className="text-amber-300 underline underline-offset-2">
                vca@villagecenterarts.org
              </a>.
            </p>
          </form>
        )}
      </aside>
    </div>
  )
}

const inputClass =
  'mt-2 w-full rounded-xl border border-white/10 bg-stone-900 px-4 py-3 text-sm text-white outline-none placeholder:text-stone-600 focus:border-orange-400'

function FormField({
  label,
  children,
  wide = false,
}: {
  label: string
  children: React.ReactNode
  wide?: boolean
}) {
  return (
    <label className={`text-xs font-bold text-stone-300 ${wide ? 'sm:col-span-2' : ''}`}>
      {label}
      {children}
    </label>
  )
}

export default App
