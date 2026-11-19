import type { Category } from '../types'

// The six core service categories of ShebaKhoj.
// `icon` is a stable key mapped to a Lucide icon inside CategoryCard.
export const categories: Category[] = [
  {
    id: 'home-repair',
    name: 'বাড়ি মেরামত',
    nameEn: 'Home Repair',
    description: 'বৈদ্যুতিক, পানির লাইন, কাঠ ও রঙের কাজ',
    icon: 'wrench',
    services: [
      { en: 'Electrician', bn: 'ইলেকট্রিশিয়ান' },
      { en: 'Plumber', bn: 'প্লাম্বার' },
      { en: 'Carpenter', bn: 'কাঠমিস্ত্রি' },
      { en: 'Painter', bn: 'পেইন্টার' },
    ],
  },
  {
    id: 'education',
    name: 'শিক্ষা ও টিউশন',
    nameEn: 'Education',
    description: 'ঘরে বসেই দক্ষ শিক্ষকের কাছ থেকে পড়াশোনা',
    icon: 'graduation-cap',
    services: [
      { en: 'Home Tutor', bn: 'হোম টিউটর' },
      { en: 'Language Tutor', bn: 'ভাষা টিউটর' },
      { en: 'Academic Tutor', bn: 'একাডেমিক টিউটর' },
    ],
  },
  {
    id: 'technology',
    name: 'প্রযুক্তি সেবা',
    nameEn: 'Technology',
    description: 'কম্পিউটার, মোবাইল ও আইটি সহায়তা',
    icon: 'laptop',
    services: [
      { en: 'Computer Repair', bn: 'কম্পিউটার মেরামত' },
      { en: 'Mobile Repair', bn: 'মোবাইল মেরামত' },
      { en: 'IT Support', bn: 'আইটি সাপোর্ট' },
    ],
  },
  {
    id: 'appliance',
    name: 'ইলেকট্রিক্যাল যন্ত্র',
    nameEn: 'Appliance Services',
    description: 'এসি, ফ্রিজ ও ওয়াশিং মেশিন মেরামত',
    icon: 'snowflake',
    services: [
      { en: 'AC Technician', bn: 'এসি টেকনিশিয়ান' },
      { en: 'Refrigerator Repair', bn: 'ফ্রিজ মেরামত' },
      { en: 'Washing Machine Repair', bn: 'ওয়াশিং মেশিন মেরামত' },
    ],
  },
  {
    id: 'home-services',
    name: 'গৃহ সেবা',
    nameEn: 'Home Services',
    description: 'পরিচ্ছন্নতা ও ঘরের যত্নের কাজ',
    icon: 'sparkles',
    services: [
      { en: 'Cleaner', bn: 'ক্লিনার' },
      { en: 'Housekeeping', bn: 'হাউসকিপিং' },
      { en: 'Pest Control', bn: 'পোকামাকড় নিয়ন্ত্রণ' },
    ],
  },
  {
    id: 'events',
    name: 'ইভেন্ট ও ক্রিয়েটিভ',
    nameEn: 'Events & Creative',
    description: 'ছবি, ভিডিও ও অনুষ্ঠান আয়োজন',
    icon: 'camera',
    services: [
      { en: 'Photographer', bn: 'ফটোগ্রাফার' },
      { en: 'Videographer', bn: 'ভিডিওগ্রাফার' },
      { en: 'Event Organizer', bn: 'ইভেন্ট অর্গানাইজার' },
    ],
  },
]

export const getCategory = (id: string): Category | undefined =>
  categories.find((category) => category.id === id)

export const categoryName = (id: string): string =>
  getCategory(id)?.name ?? 'অন্যান্য'

// Rajshahi areas supported in this MVP.
export const locations: string[] = [
  'মোহনপুর',
  'শ্যামপুর',
  'বোয়ালিয়া',
  'সাহেবপুর',
  'কাশিয়াডাঙ্গা',
  'নবাবগঞ্জ রোড',
  'হেরন সিটি',
  'কাশ্বা',
]
