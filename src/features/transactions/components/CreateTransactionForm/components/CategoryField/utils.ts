import {
  Award,
  BookOpen,
  Briefcase,
  Bus,
  Car,
  CircleHelp,
  Code,
  Coffee,
  Coins,
  Computer,
  CreditCard,
  Dog,
  Droplet,
  Dumbbell,
  Film,
  Fuel,
  Gift,
  GraduationCap,
  Hammer,
  Heart,
  Home,
  Lightbulb,
  type LucideIcon,
  Music,
  Pill,
  Plane,
  Receipt,
  Scissors,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Stethoscope,
  Tablet,
  Tv,
  Users,
  Utensils,
  UtensilsCrossed,
  Wallet,
  Watch,
  Wifi,
  Wrench,
  Zap,
} from 'lucide-react';

export const getCategoryIcon = (slug: string): LucideIcon => {
  const iconMap: Record<string, LucideIcon> = {
    // Income categories
    salary: Briefcase,
    'freelance-work': Code,
    bonus: Award,
    allowance: Wallet,
    'petty-cash': Coins,
    'item-sale': ShoppingBag,
    loan: Wallet,
    other: CircleHelp,
    // Expense parent categories
    food: UtensilsCrossed,
    'fitness-wellness': Dumbbell,
    'fitness-and-wellness': Dumbbell,
    household: Home,
    utilities: Zap,
    devices: Smartphone,
    vehicles: Car,
    apparel: Shirt,
    health: Heart,
    'financial-services': CreditCard,
    transport: Bus,
    culture: BookOpen,
    'social-life': Users,
    beauty: Sparkles,
    education: GraduationCap,
    gift: Gift,
    pets: Dog,
    // Food subcategories
    lunch: Utensils,
    dinner: UtensilsCrossed,
    supermarket: ShoppingCart,
    supplements: Pill,
    'eating-out': ShoppingCart,
    beverages: Coffee,
    // Fitness & Wellness subcategories
    'gym-membership': Dumbbell,
    'yoga-class': Users,
    'pilates-class': Users,
    'fitness-class': Dumbbell,
    'sports-activities': Award,
    'sports-equipment': Dumbbell,
    'sports-club': Award,
    // Household subcategories
    rent: Home,
    furniture: Home,
    toiletries: Sparkles,
    appliances: Zap,
    kitchen: UtensilsCrossed,
    chandlery: CircleHelp,
    laundry: Scissors,
    // Utilities subcategories
    'electricity-bill': Zap,
    'internet-bill': Wifi,
    'water-bill': Droplet,
    'common-charges': Receipt,
    // Devices subcategories
    mobile: Smartphone,
    computer: Computer,
    tablet: Tablet,
    smartwatch: Watch,
    'smart-tv': Tv,
    'smart-home': Home,
    electronics: Lightbulb,
    // Vehicles subcategories
    fuel: Fuel,
    service: Hammer,
    maintenance: Wrench,
    'tolls-parking': Car,
    'vehicle-upgrades': Wrench,
    'vehicle-legal-insurance': CreditCard,
    // Apparel subcategories
    clothing: Shirt,
    fashion: Sparkles,
    shoes: CircleHelp,
    sportswear: Shirt,
    'underwear-socks': Shirt,
    outerwear: Shirt,
    // Health subcategories
    'medical-services': Stethoscope,
    medicines: Pill,
    'health-general': Heart,
    'medical-insurance': CreditCard,
    // Transport subcategories
    bus: Bus,
    subway: Bus, // Using Bus icon for subway/metro
    plane: Plane,
    taxi: Car, // Using Car icon for taxi
    // Culture subcategories
    books: BookOpen,
    movies: Film,
    music: Music,
    apps: Smartphone,
    'streaming-services': Tv,
    // Social Life subcategories
    friend: Users,
    fellowship: Users,
    'trips-holidays': Plane,
    // Beauty subcategories
    cosmetics: Sparkles,
    makeup: Sparkles,
    accessories: Gift,
    'beauty-services': Scissors,
    // Education subcategories
    schooling: GraduationCap,
    textbooks: BookOpen,
    'school-supplies': CircleHelp,
    tuition: GraduationCap,
    academy: GraduationCap,
    // Financial Services subcategories
    'loan-payment': CreditCard,
    'credit-card-fee': CreditCard,
    'bank-fees': Wallet,
    accountant: Briefcase,
  };

  return iconMap[slug] || CircleHelp;
};

// fixed palette of 20 distinct, soft, muted colors
const COLOR_PALETTE = [
  {
    bgColor: 'bg-emerald-50/50 dark:bg-emerald-950/10',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
  },
  {
    bgColor: 'bg-blue-50/50 dark:bg-blue-950/10',
    iconColor: 'text-blue-600 dark:text-blue-400',
    borderColor: 'border-blue-200 dark:border-blue-800',
  },
  {
    bgColor: 'bg-amber-50/50 dark:bg-amber-950/10',
    iconColor: 'text-amber-600 dark:text-amber-400',
    borderColor: 'border-amber-200 dark:border-amber-800',
  },
  {
    bgColor: 'bg-teal-50/50 dark:bg-teal-950/10',
    iconColor: 'text-teal-600 dark:text-teal-400',
    borderColor: 'border-teal-200 dark:border-teal-800',
  },
  {
    bgColor: 'bg-orange-50/50 dark:bg-orange-950/10',
    iconColor: 'text-orange-600 dark:text-orange-400',
    borderColor: 'border-orange-200 dark:border-orange-800',
  },
  {
    bgColor: 'bg-rose-50/50 dark:bg-rose-950/10',
    iconColor: 'text-rose-600 dark:text-rose-400',
    borderColor: 'border-rose-200 dark:border-rose-800',
  },
  {
    bgColor: 'bg-yellow-50/50 dark:bg-yellow-950/10',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
  },
  {
    bgColor: 'bg-indigo-50/50 dark:bg-indigo-950/10',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    borderColor: 'border-indigo-200 dark:border-indigo-800',
  },
  {
    bgColor: 'bg-pink-50/50 dark:bg-pink-950/10',
    iconColor: 'text-pink-600 dark:text-pink-400',
    borderColor: 'border-pink-200 dark:border-pink-800',
  },
  {
    bgColor: 'bg-red-50/50 dark:bg-red-950/10',
    iconColor: 'text-red-600 dark:text-red-400',
    borderColor: 'border-red-200 dark:border-red-800',
  },
  {
    bgColor: 'bg-cyan-50/50 dark:bg-cyan-950/10',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    borderColor: 'border-cyan-200 dark:border-cyan-800',
  },
  {
    bgColor: 'bg-purple-50/50 dark:bg-purple-950/10',
    iconColor: 'text-purple-600 dark:text-purple-400',
    borderColor: 'border-purple-200 dark:border-purple-800',
  },
  {
    bgColor: 'bg-fuchsia-50/50 dark:bg-fuchsia-950/10',
    iconColor: 'text-fuchsia-600 dark:text-fuchsia-400',
    borderColor: 'border-fuchsia-200 dark:border-fuchsia-800',
  },
  {
    bgColor: 'bg-violet-50/50 dark:bg-violet-950/10',
    iconColor: 'text-violet-600 dark:text-violet-400',
    borderColor: 'border-violet-200 dark:border-violet-800',
  },
  {
    bgColor: 'bg-lime-50/50 dark:bg-lime-950/10',
    iconColor: 'text-lime-600 dark:text-lime-400',
    borderColor: 'border-lime-200 dark:border-lime-800',
  },
  {
    bgColor: 'bg-green-50/50 dark:bg-green-950/10',
    iconColor: 'text-green-600 dark:text-green-400',
    borderColor: 'border-green-200 dark:border-green-800',
  },
  {
    bgColor: 'bg-sky-50/50 dark:bg-sky-950/10',
    iconColor: 'text-sky-600 dark:text-sky-400',
    borderColor: 'border-sky-200 dark:border-sky-800',
  },
  {
    bgColor: 'bg-slate-50/50 dark:bg-slate-900/20',
    iconColor: 'text-slate-600 dark:text-slate-400',
    borderColor: 'border-slate-200 dark:border-slate-700',
  },
  {
    bgColor: 'bg-stone-50/50 dark:bg-stone-900/20',
    iconColor: 'text-stone-600 dark:text-stone-400',
    borderColor: 'border-stone-200 dark:border-stone-700',
  },
  {
    bgColor: 'bg-zinc-50/50 dark:bg-zinc-900/20',
    iconColor: 'text-zinc-600 dark:text-zinc-400',
    borderColor: 'border-zinc-200 dark:border-zinc-700',
  },
] as const;

export const getCategoryColors = (
  slug: string,
  order?: number,
): {
  bgColor: string;
  borderColor: string;
  iconColor: string;
} => {
  let colorIndex: number;
  if (order !== undefined) {
    colorIndex = order % COLOR_PALETTE.length;
  } else {
    let hash = 0;
    for (let i = 0; i < slug.length; i++) {
      hash = (hash << 5) - hash + slug.charCodeAt(i);
      hash = hash & hash;
    }
    colorIndex = Math.abs(hash) % COLOR_PALETTE.length;
  }

  return COLOR_PALETTE[colorIndex]!;
};
