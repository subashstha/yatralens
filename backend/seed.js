const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');
const Destination = require('./models/Destination');
const Category = require('./models/Category');
const Blog = require('./models/Blog');
const Review = require('./models/Review');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');
  } catch (error) {
    console.error(`Connection error: ${error.message}`);
    process.exit(1);
  }
};

// ─── CATEGORIES ─────────────────────────────────────────────────────────────
const categoriesData = [
  {
    name: 'Trekking',
    slug: 'trekking',
    description: 'Multi-day treks through Nepal\'s legendary mountain trails and high-altitude passes.',
    icon: '🥾',
    color: '#2E7D32',
    gradient: 'from-green-700 to-green-900',
    order: 1,
  },
  {
    name: 'Hiking',
    slug: 'hiking',
    description: 'Day hikes and short walks through forests, hills, and scenic viewpoints.',
    icon: '🏔️',
    color: '#1565C0',
    gradient: 'from-blue-700 to-blue-900',
    order: 2,
  },
  {
    name: 'Adventure',
    slug: 'adventure',
    description: 'Thrilling activities like white-water rafting, bungee jumping, and paragliding.',
    icon: '⚡',
    color: '#E65100',
    gradient: 'from-orange-600 to-orange-900',
    order: 3,
  },
  {
    name: 'Religious',
    slug: 'religious',
    description: 'Sacred temples, monasteries, and pilgrimage sites across Nepal.',
    icon: '🛕',
    color: '#6A1B9A',
    gradient: 'from-purple-700 to-purple-900',
    order: 4,
  },
  {
    name: 'Cafe',
    slug: 'cafe',
    description: 'Cozy cafes and unique dining spots with panoramic mountain views.',
    icon: '☕',
    color: '#4E342E',
    gradient: 'from-amber-800 to-amber-950',
    order: 5,
  },
  {
    name: 'Hidden Gem',
    slug: 'hidden-gem',
    description: 'Off-the-beaten-path destinations rarely visited by mainstream tourists.',
    icon: '💎',
    color: '#00838F',
    gradient: 'from-cyan-700 to-cyan-900',
    order: 6,
  },
  {
    name: 'Short Ride',
    slug: 'short-ride',
    description: 'Quick day trips and short rides from major cities, perfect for weekends.',
    icon: '🚗',
    color: '#DC143C',
    gradient: 'from-red-600 to-red-800',
    order: 7,
  },
  {
    name: 'Weekend Trip',
    slug: 'weekend-trip',
    description: 'Perfect 2–3 day getaways from Kathmandu and other major towns.',
    icon: '🌄',
    color: '#00695C',
    gradient: 'from-teal-700 to-teal-900',
    order: 8,
  },
];

// ─── DESTINATIONS ────────────────────────────────────────────────────────────
const destinationsData = [
  {
    title: 'Everest Base Camp',
    shortDescription: 'Stand at the foot of the world\'s highest mountain on the legendary Everest Base Camp trek through the heart of the Khumbu.',
    description: `The Everest Base Camp trek is one of the most iconic and sought-after trekking experiences in the world. Beginning with a scenic flight from Kathmandu to Lukla (2,860m), trekkers traverse through lush rhododendron forests, ancient Sherpa villages, and barren alpine landscapes before reaching Base Camp at 5,364m.

Along the way, you pass through legendary stops: Namche Bazaar, the gateway to the Everest region; Tengboche Monastery with its breathtaking views of Ama Dablam; Dingboche, a high-altitude acclimatization stop; Lobuche; and Gorak Shep, the last settlement before Base Camp.

The trek rewards adventurers with unparalleled views of Everest (8,849m), Lhotse, Nuptse, and Pumori. The Kala Patthar viewpoint (5,545m) offers the best panoramic sunrise view of Everest available without technical climbing skills.`,
    category: ['Trekking', 'Adventure'],
    region: 'Koshi',
    district: 'Solukhumbu',
    address: 'Khumbu Pasanglhamu Rural Municipality, Solukhumbu',
    location: { type: 'Point', coordinates: [86.8528, 27.9881] },
    budget: { min: 80000, max: 150000, currency: 'NPR', includes: ['Guide', 'Porter', 'Tea house accommodation', 'Permits', 'Meals'] },
    difficulty: 'Hard',
    duration: { min: 12, max: 16, unit: 'Days' },
    altitude: 5364,
    activities: ['Trekking', 'Photography', 'Cultural visits', 'Acclimatization hikes', 'Monastery visits'],
    bestSeason: ['Spring', 'Autumn'],
    tips: [
      'Acclimatize properly — spend an extra day at Namche Bazaar and Dingboche.',
      'Book your Lukla flights well in advance, especially for spring and autumn seasons.',
      'Carry a good sleeping bag rated to -20°C.',
      'Carry cash (NPR) as ATMs are unavailable beyond Namche.',
      'Get a TIMS card and Sagarmatha National Park entry permit before departing Kathmandu.',
      'Stay hydrated and avoid alcohol at high altitude.',
    ],
    itinerary: [
      { day: 1, title: 'Fly Kathmandu to Lukla, Trek to Phakding', description: 'Thrilling 35-minute flight to Lukla (2,860m), then a 3-hour downhill trek to Phakding (2,610m).', distance: '8 km', accommodation: 'Phakding Tea House' },
      { day: 2, title: 'Phakding to Namche Bazaar', description: 'Trek through Sagarmatha National Park, cross suspension bridges over the Dudh Koshi river, steep ascent to Namche Bazaar (3,440m).', distance: '11 km', accommodation: 'Namche Bazaar Lodge' },
      { day: 3, title: 'Acclimatization Day at Namche Bazaar', description: 'Rest day with optional hike to Everest View Hotel (3,880m) for first views of Everest. Explore local market.', distance: '5 km optional', accommodation: 'Namche Bazaar Lodge' },
      { day: 4, title: 'Namche to Tengboche', description: 'Trek through pine and rhododendron forests with dramatic views of Ama Dablam. Visit the famous Tengboche Monastery (3,867m).', distance: '10 km', accommodation: 'Tengboche Lodge' },
      { day: 5, title: 'Tengboche to Dingboche', description: 'Descend to Deboche, cross the Imja Khola river, ascend through juniper forests to Dingboche (4,410m).', distance: '12 km', accommodation: 'Dingboche Tea House' },
      { day: 6, title: 'Acclimatization at Dingboche', description: 'Hike to Nagarjun Hill (5,100m) for views of Island Peak, Lhotse, Makalu, and Cho Oyu.', distance: '6 km optional', accommodation: 'Dingboche Tea House' },
      { day: 7, title: 'Dingboche to Lobuche', description: 'Cross the lateral moraine of the Khumbu Glacier to Lobuche (4,940m). Memorials to fallen climbers line the trail.', distance: '8 km', accommodation: 'Lobuche Lodge' },
      { day: 8, title: 'Lobuche to Gorak Shep, EBC Visit', description: 'Reach Gorak Shep (5,164m), drop bags, then complete the final push to Everest Base Camp (5,364m) and return.', distance: '13 km', accommodation: 'Gorak Shep Lodge' },
      { day: 9, title: 'Kala Patthar Sunrise, Descend to Pheriche', description: 'Pre-dawn hike to Kala Patthar (5,545m) for a dramatic sunrise over Everest. Descend to Pheriche (4,280m).', distance: '16 km', accommodation: 'Pheriche Tea House' },
    ],
    coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80&fm=webp&fit=crop',
    isFeatured: true,
    isTrending: true,
    tags: ['everest', 'base camp', 'khumbu', 'himalaya', 'sherpa', 'high altitude', 'sagarmatha'],
    weatherInfo: 'Cold year-round. Spring (Mar–May) and Autumn (Sep–Nov) offer stable weather and clear skies. Winter is extremely cold with heavy snow above 4,000m.',
    roadCondition: 'No road access — fly to Lukla or walk from Jiri (10-14 days). All trekking on foot.',
    permits: ['Sagarmatha National Park Entry Permit (NPR 3,000)', 'TIMS Card (NPR 2,000)'],
  },
  {
    title: 'Annapurna Base Camp',
    shortDescription: 'Trek deep into the Annapurna Sanctuary, a natural amphitheatre surrounded by towering Himalayan peaks including Annapurna I (8,091m).',
    description: `The Annapurna Base Camp (ABC) trek leads into the heart of the Annapurna Sanctuary, a hidden glacial basin encircled by ten peaks over 7,000m. Beginning from the lakeside city of Pokhara, the route winds through terraced rice fields, dense rhododendron forests, Gurung villages, and high alpine meadows.

The trek passes through Ghandruk, a traditional Gurung village with stone-paved streets and a perfect view of Annapurna South and Hiunchuli. Higher up, the Modi Khola river gorge narrows dramatically before opening into the vast sanctuary at Base Camp (4,130m).

From the Base Camp, trekkers are completely encircled by a ring of peaks: Annapurna I, Annapurna South, Machapuchare (Fishtail), Hiunchuli, Gangapurna, and Glacier Dome. The experience is intimate and awe-inspiring — unlike any other trek in Nepal.`,
    category: ['Trekking', 'Nature'],
    region: 'Gandaki',
    district: 'Kaski',
    address: 'Annapurna Conservation Area, Kaski District',
    location: { type: 'Point', coordinates: [83.8781, 28.5314] },
    budget: { min: 50000, max: 100000, currency: 'NPR', includes: ['Guide', 'Porter', 'Tea house accommodation', 'ACAP permit', 'Meals'] },
    difficulty: 'Moderate',
    duration: { min: 7, max: 12, unit: 'Days' },
    altitude: 4130,
    activities: ['Trekking', 'Wildlife watching', 'Cultural visits', 'Photography', 'Bird watching'],
    bestSeason: ['Spring', 'Autumn'],
    tips: [
      'Start from Nayapul or Kande to avoid Pothana road section.',
      'Carry enough cash — there are no ATMs past Chhomrong.',
      'Check for landslide closures during monsoon if trekking in summer.',
      'Book tea houses in peak season (Oct–Nov) as they fill up fast.',
      'The Machapuchare Base Camp is a stunning overnight stop.',
    ],
    coverImage: 'https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?w=800&q=80&fm=webp&fit=crop',
    isFeatured: true,
    isTrending: false,
    tags: ['annapurna', 'sanctuary', 'machapuchare', 'fishtail', 'gurung', 'pokhara'],
    weatherInfo: 'Best Oct–Nov and Mar–May. Heavy monsoon rains June–August with leeches on trail below 2,500m.',
    roadCondition: 'Drive/taxi from Pokhara to Nayapul (1.5 hrs). All further travel on foot.',
    permits: ['ACAP Permit (NPR 3,000)', 'TIMS Card (NPR 2,000)'],
  },
  {
    title: 'Pokhara Lakeside',
    shortDescription: 'Nepal\'s tourism capital — a laid-back lakeside city with stunning Himalayan reflections, adventure sports, and vibrant café culture.',
    description: `Pokhara is Nepal's most popular tourist destination after Kathmandu, and for good reason. Nestled beside the serene Phewa Lake at 820m altitude, the city offers a dramatic backdrop of the Annapurna range, including the iconic fishtail-shaped Machapuchare.

Lakeside (Baidam) is the main tourist hub, lined with restaurants, cafés, bookshops, and gear stores. Boat rides on Phewa Lake to the Tal Barahi Island Temple are a must. The city is also the paragliding capital of Asia — tandem flights from Sarangkot offer breathtaking views of the Himalayas and the lake below.

Day hikes to World Peace Pagoda (Shanti Stupa) across the lake provide panoramic views of Pokhara and the Annapurnas. The International Mountain Museum is an excellent primer for Nepal's mountaineering history. Adventure seekers can arrange zip-lining, ultra-light flights, kayaking, and day hikes.`,
    category: ['Weekend Trip', 'Adventure', 'Cafe'],
    region: 'Gandaki',
    district: 'Kaski',
    address: 'Lakeside, Baidam, Pokhara Metropolitan City',
    location: { type: 'Point', coordinates: [83.9572, 28.2096] },
    budget: { min: 5000, max: 20000, currency: 'NPR', includes: ['Accommodation', 'Meals', 'Boat ride', 'Museum entry'] },
    difficulty: 'Easy',
    duration: { min: 2, max: 5, unit: 'Days' },
    altitude: 820,
    activities: ['Paragliding', 'Boating', 'Hiking', 'Zip-lining', 'Kayaking', 'Mountain biking', 'Museums'],
    bestSeason: ['All Year'],
    tips: [
      'Take the sunrise hike to Sarangkot (1,592m) for a spectacular Annapurna dawn view.',
      'Hire a rowboat or pedal boat for Phewa Lake — sunset from the water is magical.',
      'Book paragliding early — morning flights before 11am offer better thermals and clearer skies.',
      'Avoid Lakeside road traffic by walking along the lake shore promenade.',
      'Try Dal Bhat at local restaurants away from the main tourist strip for authentic taste at half the price.',
    ],
    coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&fm=webp&fit=crop',
    isFeatured: true,
    isTrending: true,
    tags: ['pokhara', 'phewa lake', 'paragliding', 'sarangkot', 'lakeside', 'annapurna views'],
    weatherInfo: 'Mild climate year-round. Oct–Nov best for mountain views. Jun–Aug heavy rain but lush green landscape.',
    roadCondition: 'Well-paved roads from Kathmandu (6-7 hrs drive or 25-min flight). Good roads within city.',
    permits: [],
  },
  {
    title: 'Chitwan National Park',
    shortDescription: 'UNESCO World Heritage jungle safari experience with one-horned rhinos, Royal Bengal tigers, and elephants in the Terai lowlands.',
    description: `Chitwan National Park is Nepal's first national park and a UNESCO World Heritage Site, covering 952 sq km of Terai lowland forests, grasslands, and river floodplains. It is one of the last places on earth where one-horned rhinos and Royal Bengal tigers coexist in significant numbers.

Jungle safari activities are the main draw: jeep safaris at dawn and dusk have the best wildlife sighting rates, elephant-back safaris offer a unique forest perspective, and guided walking safaris through tall elephant grass are heart-pumping. The Rapti and Narayani rivers provide excellent opportunities for canoe rides, during which marsh mugger crocodiles and Gangetic dolphins are frequently spotted.

Sauraha, the main tourist village, sits on the northern bank of the Rapti River. In the evening, the famous Tharu cultural dance performances and local restaurants make for a full experience. Birdwatchers will delight in over 544 recorded bird species, including the rare giant hornbill and lesser florican.`,
    category: ['Adventure', 'Nature', 'Weekend Trip'],
    region: 'Bagmati',
    district: 'Chitwan',
    address: 'Sauraha, Chitwan National Park, Bharatpur Metropolitan City',
    location: { type: 'Point', coordinates: [84.4994, 27.5743] },
    budget: { min: 15000, max: 40000, currency: 'NPR', includes: ['Park entry', 'Jeep safari', 'Elephant safari', 'Accommodation', 'Cultural show'] },
    difficulty: 'Easy',
    duration: { min: 2, max: 4, unit: 'Days' },
    altitude: 150,
    activities: ['Jeep safari', 'Elephant safari', 'Canoe ride', 'Bird watching', 'Walking safari', 'Tharu cultural shows'],
    bestSeason: ['Autumn', 'Winter', 'Spring'],
    tips: [
      'Book jeep safaris for early morning (6am) or late afternoon (3pm) for the best wildlife sightings.',
      'Wear muted earth tones (khaki, olive, brown) — avoid bright colours in the jungle.',
      'Carry insect repellent — mosquitoes are active at dusk.',
      'Do not approach rhinos or elephants on foot without a guide.',
      'Bring binoculars for bird watching in Bis Hazari Tal (20,000 Lakes).',
    ],
    coverImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80&fm=webp&fit=crop',
    isFeatured: true,
    isTrending: true,
    tags: ['chitwan', 'safari', 'rhino', 'tiger', 'jungle', 'wildlife', 'terai', 'UNESCO'],
    weatherInfo: 'Best Nov–Mar (cool and dry). Very hot Apr–Jun. Monsoon Jul–Sep closes some areas.',
    roadCondition: 'Excellent highway from Kathmandu to Sauraha (4-5 hrs by tourist bus). Paved road all the way.',
    permits: ['National Park Entry Fee (NPR 1,500 for Nepali, USD 35 for foreigners)'],
  },
  {
    title: 'Lumbini — Birthplace of Buddha',
    shortDescription: 'The sacred birthplace of Siddhartha Gautama, the Buddha — a UNESCO World Heritage Site of international Buddhist pilgrimage.',
    description: `Lumbini, located in the foothills of the Himalayas in Rupandehi District, is the birthplace of Siddhartha Gautama, who later became the Buddha. It is one of the four major Buddhist pilgrimage sites in the world and has been a UNESCO World Heritage Site since 1997.

The Sacred Garden at the heart of Lumbini contains the Maya Devi Temple, marking the exact spot where Buddha was born in 623 BC. The Ashoka Pillar, erected by Emperor Ashoka in 249 BC, still stands and bears the inscription confirming this as the birthplace. The sacred Puskarini Pond where Queen Maya Devi bathed before giving birth, and the ancient tree ruins form the sacred core.

The Lumbini Development Zone spreads across 3 sq km, featuring two zones of international monasteries: the East zone (Theravada Buddhist nations) and West zone (Mahayana/Vajrayana nations), each with stunning temples representing their national architectural styles — from Myanmar's gleaming white pagoda to China's ornate temple to Cambodia's Angkor-inspired structure.`,
    category: ['Religious', 'Cultural'],
    region: 'Lumbini',
    district: 'Rupandehi',
    address: 'Lumbini Development Zone, Rupandehi',
    location: { type: 'Point', coordinates: [83.2764, 27.4833] },
    budget: { min: 5000, max: 15000, currency: 'NPR', includes: ['Entry fee', 'Bicycle rental', 'Accommodation', 'Meals'] },
    difficulty: 'Easy',
    duration: { min: 1, max: 3, unit: 'Days' },
    altitude: 100,
    activities: ['Temple visits', 'Meditation', 'Cultural tours', 'Monastery circuit', 'Museum visits'],
    bestSeason: ['Autumn', 'Winter', 'Spring'],
    tips: [
      'Rent a bicycle at the entrance — the monastery zone covers 3+ km and walking is tiring.',
      'Visit early morning (6–8am) for the most peaceful atmosphere at Maya Devi Temple.',
      'Remove shoes before entering all monasteries and sacred areas.',
      'The Lumbini Museum near the entrance has excellent artifacts and historical documentation.',
      'Buddha Jayanti (May full moon) is the best time to visit with special celebrations.',
    ],
    coverImage: 'https://images.unsplash.com/photo-1562832135-14a35d25edef?w=800&q=80&fm=webp&fit=crop',
    isFeatured: false,
    isTrending: false,
    tags: ['lumbini', 'buddha', 'birthplace', 'pilgrimage', 'buddhism', 'UNESCO', 'maya devi'],
    weatherInfo: 'Hot in summer. Best season is October to March. Very cold mornings in December–January.',
    roadCondition: 'Good highway from Kathmandu via Butwal (6-7 hrs). Local roads inside development zone are well maintained.',
    permits: ['Lumbini Development Zone entry fee (NPR 100)'],
  },
  {
    title: 'Pashupatinath Temple',
    shortDescription: 'Nepal\'s most sacred Hindu temple — a UNESCO World Heritage Site on the banks of the Bagmati River, dedicated to Lord Shiva.',
    description: `Pashupatinath Temple is Nepal's most sacred Hindu pilgrimage site and one of the most significant Shiva temples in the world. Located on the banks of the Bagmati River, 5km east of Kathmandu, this UNESCO World Heritage Site dates back to at least the 5th century CE in its current form, though its origins are believed to be much older.

The main temple (non-Hindus cannot enter the inner sanctum) is a pagoda-style structure with two-tiered golden roof and silver doors. The sacred lingam of Pashupatinath inside is said to be one of the most powerful in the Hindu world. The riverside ghats are the site of open-air cremations, a deeply significant cultural and religious practice that continues 24 hours a day.

The wider temple complex stretches across both banks of the Bagmati and includes over 500 smaller temples, ashrams, and shrines, as well as communities of Hindu sadhus (holy men) who cover themselves in ash and gather especially for the Maha Shivaratri festival (February/March), when hundreds of thousands of devotees converge on Pashupatinath from across Nepal and India.`,
    category: ['Religious', 'Cultural'],
    region: 'Bagmati',
    district: 'Kathmandu',
    address: 'Pashupatinath, Deopatan, Kathmandu',
    location: { type: 'Point', coordinates: [85.3486, 27.7106] },
    budget: { min: 1000, max: 5000, currency: 'NPR', includes: ['Entry fee', 'Guide fee', 'Offerings'] },
    difficulty: 'Easy',
    duration: { min: 2, max: 6, unit: 'Hours' },
    altitude: 1293,
    activities: ['Temple visits', 'Photography', 'Cultural immersion', 'Ritual observation', 'Guided tours'],
    bestSeason: ['All Year'],
    tips: [
      'Non-Hindus cannot enter the main temple but can view it from the eastern bank across the river.',
      'Morning aarti ceremony (6:30–7:30am) and evening aarti (7–8pm) are magical to observe.',
      'The Maha Shivaratri festival (Feb/Mar) draws the largest crowds — arrive very early.',
      'Respect ongoing cremation ceremonies — maintain distance and silence.',
      'Hire a knowledgeable local guide to understand the complex mythology and iconography.',
    ],
    coverImage: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=800&q=80&fm=webp&fit=crop',
    isFeatured: true,
    isTrending: false,
    tags: ['pashupatinath', 'shiva', 'hindu', 'kathmandu', 'bagmati', 'UNESCO', 'cremation ghats'],
    weatherInfo: 'Year-round destination. Cooler and clearer Oct–Feb. Can be crowded on Saturdays and religious festivals.',
    roadCondition: 'Well-connected by road from Kathmandu city centre. Taxi or micro-bus from Thamel (~20 min).',
    permits: ['Entry fee: NPR 1,000 for South Asian tourists, USD 15 for foreign tourists'],
  },
  {
    title: 'Boudhanath Stupa',
    shortDescription: 'One of the largest Buddhist stupas in the world — a living centre of Tibetan Buddhism in the heart of Kathmandu Valley.',
    description: `Boudhanath Stupa is one of the largest spherical stupas in the world and the holiest Tibetan Buddhist temple outside Tibet. Located 11km east of central Kathmandu, this UNESCO World Heritage Site is the spiritual heart of Nepal's Tibetan exile community and draws Tibetan Buddhist pilgrims from around the world.

The massive mandala-shaped stupa rises 36 metres from the ground. Its distinctive all-seeing eyes of the Buddha gaze out from each of the four cardinal directions. The stupa is encircled by a ring of 147 niches housing prayer wheels and images of Dhyani Buddhas. Surrounding the stupa is a wide kora (circumambulation) path lined with monasteries, thangka shops, and traditional Tibetan restaurants.

Walking the kora at dawn or dusk with local Tibetan devotees — spinning prayer wheels, murmuring mantras, turning prayer beads — is a profound meditative experience. The neighbourhood of Boudha has over 40 Tibetan Buddhist monasteries, ranging from large monastery complexes (gompa) to smaller practice centres. The famous Kopan Monastery offering meditation courses is nearby.`,
    category: ['Religious', 'Cultural', 'Photography'],
    region: 'Bagmati',
    district: 'Kathmandu',
    address: 'Boudha, Kathmandu Metropolitan City',
    location: { type: 'Point', coordinates: [85.3620, 27.7215] },
    budget: { min: 500, max: 3000, currency: 'NPR', includes: ['Entry fee', 'Rooftop café', 'Thangka shopping'] },
    difficulty: 'Easy',
    duration: { min: 1, max: 4, unit: 'Hours' },
    altitude: 1400,
    activities: ['Kora walks', 'Photography', 'Monastery visits', 'Meditation', 'Thangka painting', 'Shopping'],
    bestSeason: ['All Year'],
    tips: [
      'Walk the kora clockwise (always keep the stupa to your right).',
      'Dawn (6–7am) and dusk (5–7pm) are the most atmospheric times to visit.',
      'Climb to a rooftop restaurant/café for aerial views of the stupa.',
      'The Losar (Tibetan New Year) celebrations in February/March are spectacular.',
      'Visit nearby Kopan Monastery for serene gardens and meditation courses.',
    ],
    coverImage: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80&fm=webp&fit=crop',
    isFeatured: true,
    isTrending: true,
    tags: ['boudhanath', 'stupa', 'tibetan buddhism', 'kathmandu', 'UNESCO', 'kora', 'prayer wheels'],
    weatherInfo: 'Year-round. Clearest views Oct–Feb. Can be hazy March–May due to dust.',
    roadCondition: 'Directly accessible by taxi or micro-bus from Kathmandu. 20–30 min from Thamel.',
    permits: ['Entry fee: NPR 400 for tourists'],
  },
  {
    title: 'Bhaktapur Durbar Square',
    shortDescription: 'A medieval city frozen in time — Bhaktapur\'s Durbar Square is the best-preserved of the three Kathmandu Valley palace squares.',
    description: `Bhaktapur (City of Devotees) is the best-preserved medieval city in Nepal and its Durbar Square complex is the most intact of the three royal squares in Kathmandu Valley. Located 13km east of Kathmandu, Bhaktapur was the seat of the ancient Malla kingdom and its architectural heritage reflects 1,500 years of Newari civilization.

The Durbar Square contains 15th-century temples, courtyards, and palaces that survived the 2015 earthquake largely intact (compared to Kathmandu and Patan squares). Key monuments include the 55-Window Palace of King Bhupatindra Malla with its intricate woodcarved windows, the towering 5-storey Nyatapola Temple (the tallest temple in Nepal), the Bhairabnath Temple, and the Golden Gate (Sun Dhoka) leading to the Taleju Palace.

Beyond Durbar Square, Bhaktapur's narrow brick-paved alleys, pottery squares (Kumale Tole), weaving districts, and traditional Newari courtyard homes (chowks) are as fascinating as the monuments themselves. The city is especially famous for Juju Dhau (king curd), a thick, sweet yoghurt sold in clay pots, and Bhaktapur Siddha, the local grain brandy.`,
    category: ['Cultural', 'Photography', 'Short Ride'],
    region: 'Bagmati',
    district: 'Bhaktapur',
    address: 'Bhaktapur Durbar Square, Bhaktapur Municipality',
    location: { type: 'Point', coordinates: [85.4280, 27.6721] },
    budget: { min: 2000, max: 8000, currency: 'NPR', includes: ['Entry fee', 'Local food', 'Photography permit'] },
    difficulty: 'Easy',
    duration: { min: 3, max: 8, unit: 'Hours' },
    altitude: 1401,
    activities: ['Heritage walks', 'Photography', 'Pottery watching', 'Cultural shows', 'Food tasting', 'Temple visits'],
    bestSeason: ['All Year'],
    tips: [
      'Buy the Bhaktapur entry pass — it is valid for 2 days and covers all squares.',
      'Visit Pottery Square (Kumale Tole) where potters wheel clay by hand on the street.',
      'Try Juju Dhau (king curd) and Bara (lentil pancake) at local eateries.',
      'The Bisket Jatra festival (Nepali New Year, April) features chariot processions.',
      'Taumadhi Square (Nyatapola) is separate from Durbar Square — both are worth seeing.',
    ],
    coverImage: 'https://images.unsplash.com/photo-1618851142562-ff30d09313a9?w=800&q=80&fm=webp&fit=crop',
    isFeatured: true,
    isTrending: false,
    tags: ['bhaktapur', 'durbar square', 'newari', 'medieval', 'kathmandu valley', 'nyatapola', 'UNESCO'],
    weatherInfo: 'Year-round. Winter (Dec–Feb) is cold but clear skies. Autumn is the best season with festivals.',
    roadCondition: 'Regular micro-bus from Kathmandu (Baguwa Bus Park) or taxi. 45 min from Thamel.',
    permits: ['Entry fee: NPR 1,500 for SAARC citizens, USD 15 for foreigners'],
  },
  {
    title: 'Rara Lake',
    shortDescription: 'Nepal\'s largest lake in a remote Himalayan setting — crystal-clear turquoise waters surrounded by pine forests and snow-capped peaks.',
    description: `Rara Lake is Nepal's largest and deepest lake, and arguably its most beautiful. Sitting at 2,990m in the remote Rara National Park in Mugu District, far-western Nepal, this pristine Alpine lake stretches 10.8 km in length and 5.1 km in width, covering 10.8 sq km.

The lake changes colour dramatically through the day — from deep sapphire blue in morning to turquoise in afternoon — with the surrounding Chuchemara peak (4,087m) and dense Himalayan pine and blue pine forests perfectly reflected in its glassy surface. The lake is home to rare water birds including Tundra Swan, Common Crane, and Bar-headed Goose.

Getting to Rara is part of the adventure. Flights from Nepalganj to Talcha airport (2,900m), then a 2-3 hour trek through rhododendron and pine forests leads to the lake. The surrounding Rara National Park protects red pandas, Himalayan black bears, musk deer, and wolves. Due to its extreme remoteness, Rara sees very few visitors, making it the ultimate off-the-beaten-track Nepal destination.`,
    category: ['Hidden Gem', 'Trekking', 'Nature'],
    region: 'Karnali',
    district: 'Mugu',
    address: 'Rara National Park, Mugu District, Karnali Province',
    location: { type: 'Point', coordinates: [82.0847, 29.5267] },
    budget: { min: 60000, max: 120000, currency: 'NPR', includes: ['Flights (Ktm-Nepalgunj-Talcha)', 'Guide', 'Porter', 'Camping/lodge', 'Park permits'] },
    difficulty: 'Moderate',
    duration: { min: 6, max: 10, unit: 'Days' },
    altitude: 2990,
    activities: ['Trekking', 'Bird watching', 'Wildlife watching', 'Photography', 'Camping', 'Fishing'],
    bestSeason: ['Spring', 'Autumn'],
    tips: [
      'Book Talcha flights well in advance — there are very few seats and many cancellations.',
      'The Nepalgunj-Talcha flight is weather-dependent; carry buffer days in your itinerary.',
      'Carry all supplies from Kathmandu — availability is extremely limited in Mugu.',
      'A licensed guide is mandatory for Rara National Park.',
      'Take warm clothing even in May — nights drop well below 0°C.',
    ],
    coverImage: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=800&q=80&fm=webp&fit=crop',
    isFeatured: false,
    isTrending: false,
    tags: ['rara lake', 'remote', 'off beaten path', 'karnali', 'mugu', 'alpine lake', 'rara national park'],
    weatherInfo: 'Best May–June and September–October. Heavy snow blocks trails November–March. Summer monsoon brings lush greenery.',
    roadCondition: 'Fly Kathmandu → Nepalganj → Talcha (Mugu). Road access via Jumla is possible but takes many days.',
    permits: ['Rara National Park Entry Permit (NPR 3,000)', 'TIMS Card'],
  },
  {
    title: 'Langtang Valley',
    shortDescription: 'The closest Himalayan trek to Kathmandu — a compact valley of yak pastures, glaciers, and Tamang villages beneath Langtang Lirung (7,227m).',
    description: `Langtang Valley is often called the "Valley of Glaciers" and offers one of Nepal's most accessible Himalayan treks, just 65km north of Kathmandu. The Langtang region was devastated by the 2015 earthquake and subsequent avalanche that buried Langtang village, but the local Tamang community has rebuilt with remarkable resilience.

The trek begins at Syabru Besi (1,460m) following the Langtang Khola river through dense forests of oak, maple, and rhododendron, teeming with red pandas, Himalayan black bears, and diverse birdlife. The valley opens up progressively, passing through rebuilt Langtang village, Mundu, and Lama Hotel, before reaching Kyanjin Gompa (3,870m) — the trail's main destination.

Kyanjin Gompa is a small monastery settlement with spectacular views of Langtang Lirung, Dorje Lakpa, and Tsergo Ri. The famous Kyanjin Gompa cheese factory produces local yak cheese. Day hikes to Tsergo Ri (4,984m) and Kyanjin Ri (4,773m) offer outstanding panoramas. The Langtang glacier hike from Kyanjin adds another impressive excursion.`,
    category: ['Trekking', 'Nature'],
    region: 'Bagmati',
    district: 'Rasuwa',
    address: 'Langtang National Park, Rasuwa District',
    location: { type: 'Point', coordinates: [85.5124, 28.2116] },
    budget: { min: 30000, max: 70000, currency: 'NPR', includes: ['Guide', 'Porter', 'Tea house accommodation', 'Permits', 'Meals'] },
    difficulty: 'Moderate',
    duration: { min: 7, max: 10, unit: 'Days' },
    altitude: 3870,
    activities: ['Trekking', 'Glacier hikes', 'Cheese tasting', 'Photography', 'Bird watching', 'Cultural visits'],
    bestSeason: ['Spring', 'Autumn'],
    tips: [
      'Carry cash for the entire trek — no ATMs beyond Syabru Besi.',
      'The drive from Kathmandu to Syabru Besi (7–8 hrs) has rough road sections — start early.',
      'Visit the yak cheese factory at Kyanjin for fresh local cheese.',
      'The Gosainkunda Lake side trip from Sing Gompa adds 2 days and incredible scenery.',
      'Hire a registered guide — the area still has some trail damage from the 2015 earthquake.',
    ],
    coverImage: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80&fm=webp&fit=crop',
    isFeatured: false,
    isTrending: false,
    tags: ['langtang', 'tamang heritage', 'kyanjin gompa', 'rasuwa', 'himalaya', 'glacier', 'red panda'],
    weatherInfo: 'Best Oct–Nov and Mar–May. Trail snowy and potentially blocked Dec–Feb above 3,000m.',
    roadCondition: 'Drive from Kathmandu to Syabru Besi (~7 hrs). Road quality variable, 4WD recommended in monsoon.',
    permits: ['Langtang National Park Entry Permit (NPR 3,000)', 'TIMS Card (NPR 2,000)'],
  },
  {
    title: 'Tilicho Lake',
    shortDescription: 'The highest lake in the world at 4,919m — a remote, achingly beautiful glacial lake on the Annapurna Circuit.',
    description: `Tilicho Lake holds the distinction of being one of the highest lakes in the world, sitting at a dramatic 4,919m in the Manang District of the Annapurna range. It lies off the main Annapurna Circuit route, requiring a 2-day side trip from Manang, but the effort is spectacularly rewarded.

The approach to Tilicho follows a precarious high-altitude trail along sheer cliff faces above the Marsyangdi River valley. The infamous "landslide section" demands careful navigation on a narrow path where one wrong step has fatal consequences. Beyond this, the landscape transitions to stark glacial terrain — moraine rubble, icefields, and alpine tundra.

At the lake itself, the silence is absolute. The deep turquoise-green water is surrounded by 6,000m+ peaks — Tilicho Peak (7,134m), the Great Barrier, and the flanks of Annapurna III. In winter, the lake freezes completely. The reflection of surrounding peaks on calm mornings makes this one of the most photographed spots on any Nepal trekking route.`,
    category: ['Trekking', 'Hidden Gem', 'Nature'],
    region: 'Gandaki',
    district: 'Manang',
    address: 'Tilicho Base Camp, Manang District',
    location: { type: 'Point', coordinates: [83.8667, 28.6833] },
    budget: { min: 60000, max: 120000, currency: 'NPR', includes: ['Guide', 'Porter', 'Tea house/camping', 'Permits'] },
    difficulty: 'Hard',
    duration: { min: 14, max: 18, unit: 'Days' },
    altitude: 4919,
    activities: ['Trekking', 'High-altitude hiking', 'Photography', 'Acclimatization hikes'],
    bestSeason: ['Spring', 'Autumn'],
    tips: [
      'Start the lake day-hike from Tilicho Base Camp at 4am to avoid afternoon clouds.',
      'The landslide section is extremely dangerous — stay on the marked trail and follow your guide.',
      'Proper acclimatization at Manang (3,519m) is essential — spend at least 2 nights.',
      'Carry crampons if trekking in May as snow can make the approach icy.',
      'This is typically done as part of the full Annapurna Circuit (2–3 weeks total).',
    ],
    coverImage: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&q=80&fm=webp&fit=crop',
    isFeatured: false,
    isTrending: false,
    tags: ['tilicho', 'highest lake', 'manang', 'annapurna circuit', 'high altitude', 'glacial lake'],
    weatherInfo: 'Best Oct–Nov and late April–May. Completely snowed in Dec–March. Afternoon clouds typical in all seasons.',
    roadCondition: 'Trek from Chame (road access) via Annapurna Circuit. No direct road to Tilicho.',
    permits: ['ACAP Permit (NPR 3,000)', 'TIMS Card (NPR 2,000)'],
  },
  {
    title: 'Poon Hill Sunrise Trek',
    shortDescription: 'Nepal\'s most popular short trek — a 4-day loop from Pokhara to the famous Poon Hill viewpoint (3,210m) for a legendary Himalayan sunrise.',
    description: `The Poon Hill trek (also called Ghorepani-Poon Hill trek) is the most popular short trek in Nepal and consistently ranks among the best sunrise viewpoints in the world. Accessible from Pokhara, it is the perfect introduction to Himalayan trekking for first-timers.

The 4-day loop follows well-maintained stone-stepped trails through terraced hillsides, rhododendron forests (spectacular in March–April bloom), and traditional Gurung and Magar villages. The route passes through Tikhedhunga, Ulleri, Ghorepani, and Tadapani before descending to Nayapul via Ghandruk.

The undisputed highlight is the 45-minute pre-dawn hike from Ghorepani to Poon Hill (3,210m) in the dark, arriving just before sunrise. As dawn breaks, the panorama reveals Dhaulagiri (8,167m), Annapurna South, Machapuchare, Annapurna I, Hiunchuli, Nilgiri, and dozens more peaks lit in golden alpenglow. The 360-degree view from the small iron tower at the summit is simply unforgettable.`,
    category: ['Hiking', 'Trekking', 'Photography'],
    region: 'Gandaki',
    district: 'Myagdi',
    address: 'Ghorepani VDC, Myagdi District / Kaski District',
    location: { type: 'Point', coordinates: [83.6985, 28.4001] },
    budget: { min: 20000, max: 45000, currency: 'NPR', includes: ['Guide', 'Porter', 'Tea house accommodation', 'Meals', 'Permits'] },
    difficulty: 'Moderate',
    duration: { min: 4, max: 5, unit: 'Days' },
    altitude: 3210,
    activities: ['Trekking', 'Sunrise viewing', 'Photography', 'Village visits', 'Rhododendron forest walks'],
    bestSeason: ['Spring', 'Autumn', 'Winter'],
    tips: [
      'March-April is best for rhododendron blooms — the forest turns crimson and pink.',
      'Start the Poon Hill hike at 4:30am for optimal sunrise timing.',
      'The Ulleri to Ghorepani section has 3,500+ stone steps — take it slow.',
      'This trek can be done solo with a guide — no porter required if you pack light.',
      'Ghandruk village is a great alternative finish point with stunning Annapurna South views.',
    ],
    coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80&fm=webp&fit=crop',
    isFeatured: true,
    isTrending: true,
    tags: ['poon hill', 'ghorepani', 'sunrise', 'annapurna', 'dhaulagiri', 'rhododendron', 'short trek'],
    weatherInfo: 'Oct–Nov: clear and cold. Dec–Jan: very cold, possible snow at Ghorepani. Feb–April: rhododendron bloom. May: pre-monsoon clouds.',
    roadCondition: 'Drive/taxi from Pokhara to Nayapul (1.5 hrs, NPR 2,000-3,000). Good roads.',
    permits: ['ACAP Permit (NPR 3,000)', 'TIMS Card (NPR 2,000)'],
  },
];

// ─── BLOGS ───────────────────────────────────────────────────────────────────
const blogsData = [
  {
    title: 'Complete Guide to Everest Base Camp Trek 2024',
    excerpt: 'Everything you need to know about planning the iconic EBC trek — permits, costs, gear, acclimatization, and what to expect on the trail.',
    content: `# Complete Guide to Everest Base Camp Trek 2024

The Everest Base Camp trek is the dream of every hiker and adventure traveller. Standing at the foot of the world's highest mountain is an experience that stays with you for a lifetime. This comprehensive guide covers everything you need to plan your perfect EBC adventure.

## When to Go

The two best seasons are **Spring (March–May)** and **Autumn (September–November)**.

- **October–November** offers the most stable weather, clearest skies, and best mountain views. Expect the busiest trails and highest tea house prices.
- **March–April** is perfect if you want rhododendron blooms along the lower sections. Weather is slightly less stable than October but still excellent.
- **Winter (December–February)**: Possible but extremely cold. Temperatures at Base Camp can drop to -20°C or below. Very few trekkers attempt this.
- **Summer/Monsoon (June–August)**: Not recommended. Trails are muddy, views are obscured, and leeches are active below 3,000m.

## Permits Required

You need two permits before leaving Kathmandu:

1. **Sagarmatha National Park Entry Permit** — NPR 3,000. Available at NTB offices in Kathmandu or at the park entrance in Monjo.
2. **TIMS Card** (Trekkers' Information Management System) — NPR 2,000. Available at Nepal Tourism Board office.

## Estimated Budget

| Category | Budget Option | Mid-Range | Comfortable |
|----------|--------------|-----------|-------------|
| Accommodation | NPR 500–800/night | NPR 1,000–2,000/night | NPR 2,500+/night |
| Meals | NPR 500–800/day | NPR 1,200–2,000/day | NPR 2,500+/day |
| Guide | NPR 2,500–3,000/day | NPR 3,500/day | NPR 4,500+/day |
| Porter | NPR 2,000–2,500/day | NPR 2,500–3,000/day | NPR 3,000+/day |

Total budget for a 14-day trek: NPR 80,000–150,000 per person (excluding international flights and Kathmandu expenses).

## Essential Gear

**Clothing:**
- Down jacket (-20°C rated) — can be rented in Thamel, Kathmandu
- Fleece mid-layer
- Waterproof shell jacket and pants
- Thermal base layers (top and bottom)
- Trekking pants (2–3 pairs)
- Wool/synthetic trekking socks (5+ pairs)
- Warm hat, balaclava, neck gaiter
- Sun hat/cap
- Lightweight gloves + heavy outer mitts
- Trekking boots (broken in before the trip!)

**Equipment:**
- 50–60L trekking backpack
- Sleeping bag (-20°C rated) — rental available in Thamel
- Trekking poles (highly recommended for the knees)
- Headlamp with spare batteries
- Sunglasses (UV400, wraparound)

**Health:**
- Diamox (acetazolamide) — consult your doctor; helps with AMS prevention
- First aid kit
- Rehydration salts
- Personal medications
- Water purification tablets or SteriPen

## Acclimatization Strategy

Acute Mountain Sickness (AMS) is the biggest risk on EBC. Follow the "climb high, sleep low" principle strictly:

- **Do not skip the Namche acclimatisation day.** Hike to Everest View Hotel (3,880m) and return.
- **Add an extra night at Dingboche (4,410m).** Hike to Nagarjun Hill (5,100m).
- **Know the symptoms of AMS**: headache, nausea, loss of appetite, fatigue, dizziness. If symptoms worsen, descend immediately — do not sleep higher.
- **Descend is the cure** — if someone in your group has severe AMS symptoms, descend at least 300m immediately.

## Trail Overview

The classic EBC trek begins with a flight from Kathmandu to Lukla (2,860m). The route then follows:

Lukla → Phakding → **Namche Bazaar** (acclimatize) → Tengboche → Dingboche (acclimatize) → Lobuche → **Gorak Shep** → Everest Base Camp (5,364m) → **Kala Patthar** (5,545m) → Pheriche → Namche → Lukla

Total distance: approximately 130km return.

## Hiring a Guide and Porter

While it is technically possible to do EBC independently, hiring a guide is strongly recommended:
- They know the trail, tea houses, and can respond to medical emergencies.
- Licensed guides speak English, Sherpa, and Nepali.
- Cost: NPR 2,500–3,500/day (guide), NPR 2,000–2,500/day (porter, max 25kg baggage).
- Book through a licensed trekking agency in Kathmandu.

The Everest Base Camp trek is challenging but achievable for any reasonably fit person who prepares properly. The reward — standing at the foot of the world's highest mountain — is beyond description.`,
    category: 'Trek Guide',
    tags: ['EBC', 'Everest', 'trekking guide', 'Khumbu', 'permits', 'acclimatization'],
    featuredImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80&fm=webp&fit=crop',
    readTime: 18,
  },
  {
    title: 'Budget Travel in Nepal: How to Explore for NPR 3,000 Per Day',
    excerpt: 'Nepal is one of the most budget-friendly destinations in Asia. Here is how to explore Kathmandu, Pokhara, and more on a shoestring without missing the highlights.',
    content: `# Budget Travel in Nepal: How to Explore for NPR 3,000 Per Day

Nepal consistently ranks as one of the best value-for-money destinations in the world. With careful planning, you can experience world-class trekking, rich cultural heritage, and delicious food on an extremely modest budget. Here's a real, tested breakdown of how to do it.

## Accommodation

**Budget options under NPR 800/night:**
- Tourist guesthouses in Thamel (Kathmandu): NPR 500–800 for a clean double room with hot water
- Backpacker hostels (dorm beds): NPR 300–500
- Tea houses on popular trekking routes: NPR 100–300 (sometimes free if you eat meals there)
- Pokhara Lakeside guesthouses: NPR 500–900 for a private room

**Tips:**
- Book directly at the property — apps often charge 15–20% extra.
- Negotiate during low season (June–September and January–February).
- Many tea house owners offer free accommodation if you have all meals with them.

## Food

Nepal's national dish, **Dal Bhat**, is arguably the best value meal in Asia. For NPR 200–400 at a local restaurant, you get:
- Steamed rice (unlimited refill)
- Lentil soup (dal)
- Vegetable curry
- Pickle (achar)
- Sometimes papad, yoghurt, or a seasonal vegetable side

**Eat where locals eat:**
- Tourist restaurants in Thamel/Lakeside charge 2–3x more than local (bhaat ghar) restaurants
- Momo (steamed dumplings) NPR 120–180 for a plate of 10
- Chow mein: NPR 150–200
- Buff (buffalo) sekuwa: NPR 150–250

**Daily food budget breakdown:**
- Breakfast (chapati + tea): NPR 150–200
- Lunch (dal bhat or momo): NPR 200–350
- Dinner (dal bhat or noodle soup): NPR 250–400
- Snacks and chai: NPR 100–150
- **Total: NPR 700–1,100/day**

## Transport

**Kathmandu to Pokhara:**
- Tourist bus: NPR 800–1,200 (6–7 hrs)
- Local bus from Gongabu Bus Park: NPR 400–500 (slower, less comfortable)
- Flight: NPR 6,000–10,000 one-way (25 min)

**Within Kathmandu:**
- Metered taxi: NPR 150–300 for most city rides
- Micro-bus/tempo: NPR 20–30
- Tuk-tuk: NPR 100–200 for short distances
- Avoid taxi from Tribhuvan Airport — negotiate firmly or use Pathao/InDrive app

**Within Pokhara:**
- Bicycle rental: NPR 200–400/day — perfect for lakeside area
- E-bike: NPR 800–1,200/day
- Taxi from Lakeside to bus park: NPR 200–300

## Free and Low-Cost Attractions

**Kathmandu (Free or under NPR 500):**
- Swayambhunath Stupa (NPR 200 for foreigners, free for Nepali)
- Garden of Dreams: NPR 200
- Walking Thamel and Asan Bazaar: Free
- Kirtipur day hike: Free

**Pokhara (Free or under NPR 500):**
- World Peace Pagoda hike: Free (rowboat across lake: NPR 600)
- Davi's Fall: NPR 50
- Gupteshwor Cave: NPR 100
- Lakeside stroll: Free
- Begnas Lake: Free

## The NPR 3,000/Day Breakdown

| Category | Budget |
|---------|--------|
| Accommodation | NPR 700 |
| Food | NPR 900 |
| Transport | NPR 200 |
| Entry fees / activities | NPR 400 |
| Miscellaneous | NPR 300 |
| Buffer | NPR 500 |
| **Total** | **NPR 3,000** |

This is very achievable in Nepal. With smart choices, you can do it for even less while having an amazing experience.`,
    category: 'Budget Travel',
    tags: ['budget travel', 'Nepal backpacking', 'cheap travel', 'Dal Bhat', 'hostel'],
    featuredImage: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=600&q=80&fm=webp&fit=crop',
    readTime: 12,
  },
  {
    title: 'Pokhara in 72 Hours: The Perfect Itinerary',
    excerpt: 'Three days in Pokhara — the Himalayan lakeside paradise. Sunrise hikes, paragliding over the Annapurnas, lakeside cafés, and hidden temples.',
    content: `# Pokhara in 72 Hours: The Perfect Itinerary

Pokhara is Nepal's most beloved city — a stunning contrast of high Himalayan peaks and a serene lakeside. Whether you have 3 days or 3 weeks, Pokhara never disappoints. Here is the perfect 72-hour itinerary.

## Day 1: Arrival and Lakeside Exploration

**Morning:**
Arrive from Kathmandu by tourist bus (morning departure) or flight. Check into your lakeside hotel and freshen up.

Walk the Lakeside promenade (Baidam) stretching along Phewa Lake's eastern shore. The views of Macchapuchre (Fishtail Mountain, 6,993m) rising directly behind the lake are stunning.

Rent a bicycle (NPR 200–400) and cycle north along the lake to the camping site at the far end — excellent mountain reflections in calm morning water.

**Afternoon:**
Take a rowboat or pedal boat to Tal Barahi Island Temple in the middle of Phewa Lake (NPR 600–800 return boat hire). The small two-storey pagoda temple dedicated to Goddess Barahi is an important pilgrimage site.

**Evening:**
Explore the restaurants and cafés of Lakeside. Pokhara has a fantastic food scene compared to Kathmandu. Recommended spots:
- Moondance Restaurant (international food, lake view)
- Caffe Concerto (Italian coffee, famous cakes)
- Local Dal Bhat restaurants in the alleys behind the main strip

## Day 2: Sarangkot Sunrise + Paragliding

**Pre-dawn (4:30am):**
This is the highlight of any Pokhara visit. Take a taxi or walk (1–1.5 hrs) to Sarangkot viewpoint (1,592m). Arrive before 5:30am to find a spot. As the sun rises from behind the eastern hills, it illuminates the entire Annapurna Himal in sequence — Dhaulagiri, Annapurna South, Annapurna I, Machapuchare, Annapurna II, Annapurna IV — a golden panorama stretching 200km.

The descent (45 min walk, or 10-min taxi) brings you back for breakfast in Lakeside.

**Morning (9am–noon):**
**Paragliding** from Sarangkot is one of the most accessible paragliding experiences in Asia. Tandem flights with a certified pilot cost NPR 5,000–8,000 for 20–30 minutes. You take off from Sarangkot and ride thermals above the lake, with a direct view of the Annapurnas. Landing is on the lakeside beach.

Book through any Lakeside agency the previous evening or directly with operators at Sarangkot.

**Afternoon:**
Visit the International Mountain Museum (NPR 300 entry) — an excellent museum on Himalayan mountaineering, geography, and Nepal's ethnic diversity.

Explore **Old Bazaar** (Bazar Chowk) — a traditional Newari trading street with old-style wooden architecture, spice markets, and local commerce largely unchanged from 50 years ago.

**Evening:**
Boat sunset on Phewa Lake — hire a rowboat for NPR 600–800 and watch the sun drop behind the Pokhara hills with the Annapurnas turning pink.

## Day 3: World Peace Pagoda + Begnas Lake

**Morning:**
Hire a rowboat from Lakeside south end (NPR 300 one-way) to cross Phewa Lake to the World Peace Pagoda (Shanti Stupa). A 20-minute steep hike brings you to the pristine white Japanese Buddhist stupa with panoramic 360° views — Pokhara city below, Phewa Lake, and the Annapurna range across the horizon.

Descend via the longer forest trail (1.5 hrs) back to Lakeside.

**Afternoon:**
Take a taxi (NPR 500–700) 15km east to **Begnas Lake** — Pokhara's second lake, far less visited than Phewa but arguably more beautiful and peaceful. Kayaking, fishing, and lakeside restaurants are available.

**Evening:**
Final Lakeside dinner. Pokhara has excellent rooftop bars with mountain views, perfect for a send-off evening.

## Getting Around Pokhara

- **Bicycle**: Best for lakeside area. NPR 200–400/day.
- **E-bike**: Cover more ground. NPR 800–1,200/day.
- **Taxi**: Metered or negotiate. Lakeside to Sarangkot: NPR 600–1,000.
- **Walking**: Most lakeside area is walkable.

Pokhara rewards slow travel. Three days is enough to see the highlights, but a week here feels like a proper rest.`,
    category: 'Local Experience',
    tags: ['Pokhara', 'itinerary', 'paragliding', 'Sarangkot', 'Phewa Lake', 'travel guide'],
    featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&fm=webp&fit=crop',
    readTime: 14,
  },
  {
    title: 'Nepal\'s Hidden Gems: 7 Destinations Off the Tourist Trail',
    excerpt: 'Beyond Everest and Pokhara, Nepal hides extraordinary places that most tourists never see. From remote Himalayan lakes to ancient cave cities, discover the real Nepal.',
    content: `# Nepal's Hidden Gems: 7 Destinations Off the Tourist Trail

Nepal's tourist trail is well-worn: Kathmandu, Pokhara, Chitwan, EBC. But the country is vast and extraordinarily diverse. For those willing to venture off the beaten path, Nepal reveals a completely different face — wilder, quieter, and even more captivating. Here are seven hidden gems worth the extra effort.

## 1. Rara Lake, Mugu (Karnali Province)

Nepal's largest and arguably most beautiful lake sits at 2,990m in the remote far-west. The turquoise-blue water, framed by Himalayan pine forests and snow-capped peaks, sees fewer than 2,000 visitors per year. Getting here requires flights to Talcha via Nepalganj, making it inherently exclusive.

**Why go**: Complete solitude, pristine nature, no other tourists, endemic bird species.
**Best season**: May and September–October.

## 2. Upper Mustang, Lo Manthang

A former Forbidden Kingdom, Upper Mustang remained closed to foreigners until 1992. The ancient walled city of Lo Manthang (3,840m) and the stark Tibetan plateau landscape beyond feel like stepping back 500 years. Ancient cave monasteries, sky caves, and Tibetan Buddhist frescoes are found nowhere else in Nepal.

**Why go**: Authentic Tibetan culture, cave monasteries, other-worldly landscape, no monsoon rain.
**Best season**: June–August (best kept secret: Upper Mustang is rain-shadow and stays clear during monsoon!).

## 3. Khaptad National Park, Sudurpashchim

The Khaptad Plateau in Nepal's far-west is a high-altitude meadowland (2,800–3,300m) scattered with wildflowers, lakes, and Hindu shrines. The annual Khaptad fair (June) draws pilgrims, and the park is home to leopards, black bears, and over 270 bird species. Far fewer than 1,000 foreign visitors per year.

**Why go**: Complete wilderness, no crowds, incredible biodiversity, sacred Hindu sites.

## 4. Bardiya National Park, Bardiya

Bardiya is Chitwan's bigger, wilder cousin in the far-western Terai. It has the highest density of Royal Bengal tigers in Nepal, and sightings here are more frequent than anywhere else. The Karnali River safari for Gangetic dolphins and mahseer fishing are unique. With a fraction of Chitwan's visitors, the whole park feels like it belongs to you.

**Why go**: Best tiger sightings in Nepal, authentic wilderness, far fewer tourists than Chitwan.
**Best season**: November–March.

## 5. Tsum Valley, Gorkha

The Tsum Valley is a sacred Buddhist pilgrimage route in a hidden Himalayan valley in Gorkha District, bordering Tibet. Completely isolated for centuries, it was only opened to trekkers in 2008. The valley is home to a unique Buddhist culture, ancient gompas, and mani walls stretching for kilometres. Nupri people's traditional lifestyle here is unlike anywhere else in Nepal.

**Why go**: Untouched Buddhist culture, rare permit area, stunning scenery, very few visitors.

## 6. Ganesh Himal Trek, Nuwakot

The Ganesh Himal is one of Nepal's most overlooked trekking destinations — a challenging but incredibly rewarding circuit around the Ganesh Himal massif (7,422m). Long ridgeline walks with 360° Himalayan panoramas, traditional Tamang and Gurung villages, and almost zero other trekkers make this a true hidden gem just days from Kathmandu.

## 7. Dolpo, Dolpo District

Made famous by Peter Matthiessen's book "The Snow Leopard," Dolpo is one of Nepal's most restricted and remote regions, requiring a special permit. The Phoksundo Lake (3,611m) — Nepal's deepest lake — with its impossible turquoise colour, and the ancient Bon-Buddhist culture of the Dolpo people, make this one of the most extraordinary and rewarding destinations in the Himalayas.

**Why go**: The Snow Leopard experience, Phoksundo Lake, ancient Bon culture, extreme remoteness.
**Permit**: Restricted Area Permit required (USD 10/day for lower Dolpo, USD 50/day for upper Dolpo).

---

Nepal's hidden gems reward patience, flexibility, and a spirit of adventure. They require more planning and often more budget than the well-trodden tourist circuit, but the rewards — in solitude, authenticity, and raw natural beauty — are immeasurably greater.`,
    category: 'Adventure',
    tags: ['hidden gems', 'off beaten path', 'Rara Lake', 'Upper Mustang', 'Dolpo', 'Bardiya', 'Tsum Valley'],
    featuredImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80&fm=webp&fit=crop',
    readTime: 16,
  },
  {
    title: 'Nepali Food Guide: 15 Dishes You Must Try',
    excerpt: 'From Dal Bhat to Sel Roti, Newari feasts to Thakali cuisine — a comprehensive guide to Nepal\'s most delicious and authentic dishes.',
    content: `# Nepali Food Guide: 15 Dishes You Must Try

Nepali cuisine is one of Asia's most underrated food cultures. Shaped by Himalayan geography, agricultural traditions, and diverse ethnic groups — Newari, Thakali, Gurung, Sherpa, Tharu, Madheshi — it spans simple mountain fare to elaborate ritual feasts. Here are 15 dishes you absolutely must try.

## 1. Dal Bhat (दाल भात)

The national dish and the backbone of Nepali life. Dal (lentil soup) + Bhat (steamed rice) + Tarkari (vegetable curry) + Achar (pickle). Served with unlimited refills at any local restaurant. Nutritionally complete, incredibly filling, and costs NPR 200–400. On trekking routes, this is fuel for 20km days.

**Where to eat it best**: Any local bhaat ghar restaurant, or tea houses on trekking routes.

## 2. Momo (म:म:)

Nepal's most popular street food — steamed or fried dumplings filled with buff (buffalo), chicken, pork, or vegetables. The Tibetan origins are clear, but Nepali momo has evolved its own identity. Served with achar (spicy tomato/sesame sauce). Best eaten piping hot, straight from the steamer.

**Types**: Steamed (Kothey), Pan-fried (Kothey), Fried (Tela momo), Soup (Jhol momo), and the trendy Tandoori momo.

## 3. Sel Roti (सेल रोटी)

A traditional ring-shaped fried rice bread, made from a fermented rice batter. Crispy on the outside, soft and slightly sweet inside. Essential during Dashain and Tihar festivals, and also sold year-round at roadside stalls. Eaten with yoghurt (dahi) or potato curry.

## 4. Dhido (ढिंडो)

A thick porridge made from buckwheat or millet flour — the staple food of high-altitude Nepal and the favourite of Gurung, Magar, and Tamang communities. Denser and more nutritious than rice. Eaten with gundruk (fermented spinach), nettle soup, or dal.

## 5. Thukpa (थुक्पा)

A Tibetan noodle soup introduced to Nepal through the Sherpa and Tibetan communities. Hand-pulled noodles in a hearty broth with vegetables and meat. The Sherpa version (often with tsampa flour noodles) is particularly warming on cold mountain nights.

## 6. Newari Feast (नेवारी खाजा)

The Newari community of Kathmandu Valley has Nepal's most sophisticated food culture. A traditional Newari khaja set includes: Chiura (flattened rice), Bara (fried lentil pancake), Chatamari (Newari pizza — rice crepe with egg and meat), Sapu Mhicha (buffalo offal wrapped in leaf), Aila (rice wine), and many pickles. Eaten at any Newari bhoj restaurant.

**Try at**: Honacha Restaurant (Kirtipur), Bajeko Sekuwa (Kathmandu), or any Bhaktapur local eatery.

## 7. Gundruk (गुन्द्रुक)

Fermented leafy greens (mustard, cauliflower leaves, radish greens) — a traditional preservation method from the Himalayan highlands. Has a distinctly sour, pungent taste. Eaten as a side dish, in soup (Gundruk soup is famous), or as pickle. Rich in probiotics and vitamins.

## 8. Yak Cheese (याक चिज)

Made in the high Himalayas from yak milk. Hard, aged, with a strong alpine flavour similar to Gruyère. Available from the Kyanjin Gompa cheese factory (Langtang), at Namche Bazaar shops, and increasingly in Kathmandu specialty stores. Pairs perfectly with local wine (Marpha apple wine).

## 9. Tongba (तोम्बा)

A traditional Limbu and Rai fermented millet beer from eastern Nepal. Hot water is poured into a wooden or bamboo cylinder (tongba) filled with fermented millet grain. Drunk through a bamboo straw that filters the grain. Warm, mildly alcoholic, and deeply comforting in cold weather.

**Find it**: Thamel restaurants in Kathmandu, Pokhara mountain town restaurants, or eastern Nepal hill stations.

## 10. Juju Dhau (जुजु धौ)

"King Curd" from Bhaktapur — thick, creamy, slightly sweet yoghurt set in clay pots. The clay gives it a unique earthy flavour. Juju Dhau from Bhaktapur is geographically protected and cannot be authentically replicated elsewhere. Always eat at a fresh Bhaktapur restaurant, served in the original clay pot.

## 11. Laphing (ललपिङ)

A cold, spicy street food from the Tibetan refugee communities in Kathmandu. A thick mung bean starch sheet (similar to glass noodles) dressed in vinegar, soy sauce, chilli oil, garlic, and sesame. Intensely flavoured. Found at street stalls in Boudha and Swayambhu areas.

## 12. Aloo Tama (आलु तामा)

A deeply comforting curry of potatoes (aloo) and bamboo shoots (tama) in a sour, funky fermented broth. The bamboo shoots give it an extraordinary depth of flavour. A quintessentially Newari dish, eaten especially in winter.

## 13. Sekuwa (सेकुवा)

Nepali-style grilled or BBQ meat — buff, chicken, or pork marinated in a spiced yoghurt rub and cooked over a charcoal fire. Tender, smoky, and perfect with chiura (beaten rice) and a cold Everest beer. The best sekuwa stalls are in Kathmandu's Thamel area and along roadside dhabas.

## 14. Kheer (खिर)

A sweet rice pudding made with full-fat milk, sugar, and cardamom. A ritual food served at festivals, religious ceremonies, and celebrations. Saffron kheer during Indra Jatra festival and coconut kheer during Dashain are especially notable.

## 15. Marpha Apple Products

The village of Marpha (3,310m) in the Mustang valley is Nepal's apple capital. The orchards produce delicious apples, transformed into: cider, brandy (Mustang Marpha is sold throughout Nepal), apple jam, dried apples, and apple pie at the village's famous bakeries. The brandy is a must-buy.

---

Nepali food is best experienced slowly — sitting with a local family, eating with your hands (right hand only), and letting the meal take as long as it takes. The food reflects the land, the people, and thousands of years of mountain ingenuity.`,
    category: 'Food',
    tags: ['Nepali food', 'Dal Bhat', 'momo', 'Newari cuisine', 'food guide', 'local food'],
    featuredImage: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&q=80&fm=webp&fit=crop',
    readTime: 20,
  },
];

// ─── SEED FUNCTION ────────────────────────────────────────────────────────────
const seedDB = async () => {
  await connectDB();

  console.log('Clearing existing data...');
  await Promise.all([
    User.deleteMany(),
    Destination.deleteMany(),
    Category.deleteMany(),
    Blog.deleteMany(),
    Review.deleteMany(),
  ]);
  console.log('Existing data cleared.');

  // Create users
  console.log('Creating users...');
  const adminUser = await User.create({
    name: 'Subash Shrestha',
    email: '9819690893.subash@gmail.com',
    password: 'q){#AH227F)+DD',
    role: 'admin',
    bio: 'Administrator of Explore Nepal — passionate about showcasing the beauty of Nepal to the world.',
  });

  const regularUser = await User.create({
    name: 'Subash Shrestha',
    email: 'user@explorenepal.com',
    password: 'User@123',
    role: 'user',
    bio: 'Avid trekker and travel blogger based in Kathmandu. Done EBC twice and counting.',
  });
  console.log(`Created users: ${adminUser.email}, ${regularUser.email}`);

  // Create categories
  console.log('Creating categories...');
  const categories = await Category.insertMany(categoriesData);
  console.log(`Created ${categories.length} categories.`);

  // Create destinations
  console.log('Creating destinations...');
  const destinations = [];
  for (const destData of destinationsData) {
    const dest = await Destination.create({ ...destData, createdBy: adminUser._id });
    destinations.push(dest);
  }
  console.log(`Created ${destinations.length} destinations.`);

  // Set nearby places for a few destinations
  const ebc = destinations.find(d => d.title === 'Everest Base Camp');
  const abc = destinations.find(d => d.title === 'Annapurna Base Camp');
  const poonHill = destinations.find(d => d.title === 'Poon Hill Sunrise Trek');
  const tilicho = destinations.find(d => d.title === 'Tilicho Lake');
  const pokhara = destinations.find(d => d.title === 'Pokhara Lakeside');

  if (abc && poonHill && tilicho) {
    await Destination.findByIdAndUpdate(abc._id, { nearbyPlaces: [poonHill._id, tilicho._id] });
  }
  if (poonHill && abc) {
    await Destination.findByIdAndUpdate(poonHill._id, { nearbyPlaces: [abc._id, pokhara._id] });
  }

  // Create blogs
  console.log('Creating blogs...');
  const blogs = [];
  for (const blogData of blogsData) {
    const blog = await Blog.create({ ...blogData, author: adminUser._id, isPublished: true });
    blogs.push(blog);
  }
  console.log(`Created ${blogs.length} blogs.`);

  // Link EBC blog to EBC destination
  if (blogs[0] && ebc) {
    await Blog.findByIdAndUpdate(blogs[0]._id, { destination: ebc._id });
  }

  // Create reviews
  console.log('Creating reviews...');
  const reviewsData = [
    {
      user: regularUser._id,
      destination: ebc._id,
      rating: 5,
      title: 'Life-changing experience',
      comment: 'I trained for 6 months for this and it absolutely lived up to every expectation. The moment you step into that glacial basin and see Everest towering above you — nothing prepares you for it. The Sherpa people are incredibly warm and hospitable. Do the extra acclimatization days, carry enough cash, and take it slow. Worth every rupee and every sore muscle.',
      visitedOn: new Date('2024-10-15'),
    },
    {
      user: adminUser._id,
      destination: abc._id,
      rating: 5,
      title: 'The Annapurna Sanctuary is magical',
      comment: 'The ABC trek has a completely different character to EBC. The Annapurna Sanctuary feels more intimate — you are completely encircled by peaks. The approach through the Modi Khola gorge is stunning. Ghandruk village is a highlight. Tea house food is excellent all the way. Did it in October and conditions were perfect.',
      visitedOn: new Date('2024-10-20'),
    },
    {
      user: regularUser._id,
      destination: pokhara._id,
      rating: 5,
      title: 'The perfect Nepal base camp',
      comment: 'Pokhara is where you go to recover after trekking and where you go to plan your next trek. The lakeside is gorgeous, the food is excellent, and having the Annapurnas right there above you every morning never gets old. Paragliding from Sarangkot was a top-5 life experience. I keep coming back.',
      visitedOn: new Date('2024-11-01'),
    },
    {
      user: adminUser._id,
      destination: destinations.find(d => d.title === 'Chitwan National Park')._id,
      rating: 4,
      title: 'Outstanding wildlife experience',
      comment: 'We saw two rhinos and a crocodile on the first jeep safari morning. The guides are incredibly knowledgeable about animal behaviour and tracking. Did not see a tiger but that is always luck-dependent. The Tharu cultural show was excellent. Canoe ride on the Rapti was peaceful and beautiful. Best wildlife experience outside of Africa.',
      visitedOn: new Date('2024-12-10'),
    },
    {
      user: regularUser._id,
      destination: poonHill._id,
      rating: 5,
      title: 'Perfect first Himalayan trek',
      comment: 'I had never trekked before and chose Poon Hill based on recommendations. Best decision. The trail is well-marked, tea houses are comfortable, and the people are incredibly friendly. The sunrise from Poon Hill made me cry — I am not ashamed to admit it. The Annapurnas stretched across the entire horizon in gold. Already planning Annapurna Base Camp for next year.',
      visitedOn: new Date('2024-03-20'),
    },
    {
      user: adminUser._id,
      destination: destinations.find(d => d.title === 'Boudhanath Stupa')._id,
      rating: 5,
      title: 'A living spiritual heart',
      comment: 'Boudha is special in a way that is hard to describe. Come at 6am when the dawn light hits the white stupa and the Tibetan pilgrims are doing their first kora of the day. The smell of incense, the sound of prayers and spinning prayer wheels, the eye of the Buddha watching calmly from every direction — it is deeply moving even for a non-Buddhist. Stay for breakfast in one of the rooftop cafés looking down at the stupa.',
      visitedOn: new Date('2025-01-05'),
    },
  ];

  for (const review of reviewsData) {
    await Review.create(review);
  }
  console.log(`Created ${reviewsData.length} reviews.`);

  console.log('\n✅ Database seeded successfully!');
  console.log('\nLogin credentials:');
  console.log('  Admin: admin@explorenepal.com / Admin@123');
  console.log('  User:  user@explorenepal.com / User@123');
  console.log(`\nData summary:`);
  console.log(`  Users: 2`);
  console.log(`  Categories: ${categories.length}`);
  console.log(`  Destinations: ${destinations.length}`);
  console.log(`  Blogs: ${blogs.length}`);
  console.log(`  Reviews: ${reviewsData.length}`);

  process.exit(0);
};

seedDB().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
