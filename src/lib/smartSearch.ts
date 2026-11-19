import { categories } from '../data/categories'

/**
 * SMART SEARCH (deterministic, keyword-based — NOT a real AI model)
 * ---------------------------------------------------------------
 * This module exposes a small `SearchEngine` interface. The current
 * implementation (`keywordSearchEngine`) matches Bengali/English keywords
 * to a service category using simple scoring. It never calls any external
 * API and needs no key.
 *
 * To plug in a real AI later, implement the same `SearchEngine` interface
 * (e.g. an `aiSearchEngine` that calls your own backend) and swap the
 * exported `searchEngine` value. No page/component code needs to change.
 */

export interface SearchIntent {
  query: string
  categoryId: string | null
  detectedLabel: string | null
  matchedKeywords: string[]
}

export interface SearchEngine {
  detectIntent(query: string): SearchIntent
}

type KeywordSet = Record<string, string[]>

const keywords: KeywordSet = {
  'home-repair': [
    'ইলেকট্রিশিয়ান', 'ইলেক্ট্রিশিয়ান', 'ইলেকট্রিক', 'electrician', 'electrical',
    'বৈদ্যুতিক', 'তারের কাজ', 'তার', 'সুইচবোর্ড', 'সুইচ', 'ফ্যান', 'লাইট',
    'প্লাম্বার', 'plumber', 'পানির কল', 'কল নষ্ট', 'কল', 'পাইপলাইন', 'পাইপ',
    'ড্রেইন', 'ট্যাংক', 'কাঠমিস্ত্রি', 'কাঠের কাজ', 'কাঠ', 'দরজা', 'জানালা',
    'আলমারি', 'পেইন্টার', 'painter', 'রঙ', 'পেইন্ট', 'বাড়ি মেরামত', 'এলেক্ট্রিশিয়ান',
  ],
  education: [
    'শিক্ষক', 'টিউটর', 'tutor', 'টিউশন', 'হোম টিউটর', 'গণিত', 'math',
    'বিজ্ঞান', 'science', 'ইংরেজি', 'english', 'spoken', 'স্পোকেন', 'ভাষা',
    'language', 'পড়াশোনা', 'পড়া', 'এসএসসি', 'এইচএসসি', 'শিক্ষা', 'পরীক্ষা',
    'অ্যাডমিশন', 'প্রাইমারি', 'কিন্ডারগার্টেন',
  ],
  technology: [
    'কম্পিউটার', 'computer', 'ল্যাপটপ', 'laptop', 'মোবাইল', 'mobile',
    'স্মার্টফোন', 'smartphone', 'ফোন', 'আইটি', ' it ', 'আইটি সাপোর্ট',
    'সফটওয়্যার', 'software', 'ভাইরাস', 'virus', 'হার্ডওয়্যার', 'ডেটা',
    'প্রিন্টার', 'printer', 'নেটওয়ার্ক', 'network', 'wifi', 'wi-fi', 'স্ক্রিন',
    'ব্যাটারি', 'মাদারবোর্ড', 'রিপেয়ার', 'repair',
  ],
  appliance: [
    'এসি', ' ac ', 'এসি মেরামত', 'ফ্রিজ', 'fridge', 'refrigerator', 'রেফ্রিজারেটর',
    'ওয়াশিং মেশিন', 'ওয়াশিং', 'washing', 'কুলিং', 'গ্যাস', 'কম্প্রেসার',
    ' এসি টেকনিশিয়ান', 'এসি টেকনিশিয়ান', 'তাপমাত্রা',
  ],
  'home-services': [
    'ক্লিনার', 'cleaner', 'পরিষ্কার', 'পরিচ্ছন্ন', 'হাউসকিপিং', 'housekeeping',
    'পোকামাকড়', 'পোকা', 'মাছি', 'উইপোকা', 'pest', 'স্প্রে', 'মোপিং', 'মোপ',
    'ঝাড়ু', 'সাফাই', 'স্যানিটাইজেশন',
  ],
  events: [
    'ফটোগ্রাফার', 'photographer', 'ছবি', 'ফটো', 'photo', 'ভিডিওগ্রাফার',
    'videographer', 'ভিডিও', 'video', 'ইভেন্ট', ' event ', 'অনুষ্ঠান', 'বিয়ে',
    'বিবাহ', 'আয়োজক', 'organizer', 'শুট', 'জন্মদিন',
  ],
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function matchesKeyword(query: string, keyword: string): boolean {
  const kw = keyword.toLowerCase().trim()
  if (!kw) return false

  const isAscii = /^[\x00-\x7F]+$/.test(kw)
  if (isAscii && kw.length <= 4) {
    // Avoid false positives like "ac" inside "academic".
    return new RegExp(`(^|[^a-z0-9])${escapeRegex(kw)}([^a-z0-9]|$)`).test(query)
  }
  return query.includes(kw)
}

function normalizeQuery(query: string): string {
  return ` ${query.toLowerCase().replace(/\s+/g, ' ').trim()} `
}

const keywordEngine: SearchEngine = {
  detectIntent(query: string): SearchIntent {
    const normalized = normalizeQuery(query)
    const scores: Record<string, number> = {}
    const matched: Record<string, string[]> = {}

    for (const category of categories) {
      scores[category.id] = 0
      matched[category.id] = []
      for (const keyword of keywords[category.id] ?? []) {
        if (matchesKeyword(normalized, keyword)) {
          // Longer, more specific keywords count a little more.
          scores[category.id] += keyword.trim().length >= 4 ? 2 : 1
          matched[category.id].push(keyword.trim())
        }
      }
    }

    const best = categories.reduce((top, category) =>
      scores[category.id] > scores[top.id] ? category : top,
    )

    if (scores[best.id] === 0) {
      return {
        query: query.trim(),
        categoryId: null,
        detectedLabel: null,
        matchedKeywords: [],
      }
    }

    return {
      query: query.trim(),
      categoryId: best.id,
      detectedLabel: best.name,
      matchedKeywords: matched[best.id],
    }
  },
}

// Swap this single value to integrate a real AI-based search engine later.
export const searchEngine: SearchEngine = keywordEngine

export const suggestionCategories = categories.map((category) => ({
  id: category.id,
  name: category.name,
  description: category.description,
}))
