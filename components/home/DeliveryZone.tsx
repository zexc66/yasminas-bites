import { MapPin, Clock, Truck, Phone } from 'lucide-react'

const AREAS = [
  'Abdoun',
  'Sweifieh',
  'Khalda',
  'Shmeisani',
  'Mecca Street',
  'Jabal Amman',
  'Tlaa Al Ali',
  'Gardens',
  'Dabouq',
  '7th Circle',
  '4th Circle',
  'University Area',
]

const INFO_CARDS = [
  {
    icon: Clock,
    title:    'Same-day delivery',
    subtitle: 'Order before 2pm',
  },
  {
    icon: Truck,
    title:    'Free delivery',
    subtitle: 'On orders over JD 20',
  },
  {
    icon: Phone,
    title:    'Order via WhatsApp',
    subtitle: '+962 7 8900 6574',
  },
]

export function DeliveryZone() {
  return (
    <section className="bg-cream py-20 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-playfair text-4xl sm:text-5xl text-brown font-bold mb-3">
            We deliver across Amman
          </h2>
          <p className="text-brown-light text-base">
            Same-day delivery available. Order before 2pm.
          </p>
        </div>

        {/* Area chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          {AREAS.map((area) => (
            <div
              key={area}
              className="flex items-center gap-2 bg-cream-dark border border-gold-pale/60 rounded-full px-4 py-2"
            >
              <MapPin size={12} className="text-gold shrink-0" />
              <span className="text-sm text-brown font-medium truncate">{area}</span>
            </div>
          ))}
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {INFO_CARDS.map(({ icon: Icon, title, subtitle }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center bg-cream-dark border border-gold-pale/60 rounded-2xl px-5 py-6 gap-2"
            >
              <Icon size={22} className="text-gold mb-1" />
              <p className="text-brown text-sm font-semibold">{title}</p>
              <p className="text-brown-light text-xs">{subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
