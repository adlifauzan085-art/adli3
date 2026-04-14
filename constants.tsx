
import React from 'react';

export type Language = 'id' | 'en';

export const TRANSLATIONS = {
  id: {
    nav: {
      flights: 'Penerbangan',
      destinations: 'Destinasi',
      hotels: 'Hotel',
      activities: 'Aktivitas',
      login: 'Login',
      start: 'Mulai'
    },
    hero: {
      tag: '✈️ Penerbangan Langit Biru',
      title: 'Terbang Jauh',
      subtitle: 'Di Atas Awan',
      desc: 'LeFlight menyempurnakan setiap detik perjalanan Anda dengan nuansa langit yang menenangkan dan teknologi AI cerdas.'
    },
    search: {
      from: 'Dari',
      to: 'Ke',
      date: 'Tanggal',
      btn: 'Cari Tiket',
      placeholderOrigin: 'Kota Asal',
      placeholderDest: 'Kota Tujuan'
    },
    trending: {
      title: 'Estimasi Terkini',
      live: 'Live Data',
      from: 'Dari',
      to: 'Ke',
      est: 'Estimasi',
      book: 'Booking'
    },
    dest: {
      title: 'Destinasi',
      highlight: 'Ikonik',
      subtitle: 'Pilihan terbaik untuk pengalaman musim ini',
      catalog: 'Lihat Katalog',
      startFrom: 'Mulai Dari'
    },
    ai: {
      title: 'Asisten AI',
      tag: 'LeFlight Cerdas',
      placeholder: 'Bagaimana kabar rencana perjalanan Anda? Saya siap memberikan tips lokal terbaik.',
      btn: 'Tanya Lebih Lanjut',
      typing: 'Sedang mengetik...'
    },
    game: {
      title: 'Urban Dash',
      tag: 'Game Terbang Online',
      status: 'Penerbangan Online',
      tap: 'Ketuk untuk Lepas Landas',
      emergency: 'Darurat!',
      cancelled: 'Penerbangan Dibatalkan',
      current: 'Skor',
      best: 'Terbaik',
      restart: 'Ulangi Penerbangan'
    },
    cs: {
      title: 'LeFlight Support',
      assistant: 'Sky Assistant Online',
      greeting: 'Halo! Saya Sky, asisten cerdas LeFlight. Ada yang bisa saya bantu hari ini?',
      input: 'Tanyakan sesuatu...',
      error: 'Maaf, koneksi saya sedang terganggu.'
    },
    login: {
      welcome: 'Selamat Datang',
      join: 'Gabung LeFlight',
      subLogin: 'Terbang lebih tinggi bersama kami',
      subJoin: 'Mulai petualangan baru Anda',
      or: 'Atau dengan Email',
      email: 'Alamat Email',
      pass: 'Kata Sandi',
      forgot: 'Lupa Sandi?',
      btnIn: 'Masuk Sekarang',
      btnUp: 'Buat Akun',
      noAccount: 'Belum punya akun?',
      haveAccount: 'Sudah punya akun?',
      reg: 'Daftar Gratis',
      log: 'Masuk Saja'
    },
    confirm: {
      title: 'Konfirmasi Pesanan',
      sub: 'Tinjau rencana perjalanan Anda',
      pay: 'Total Bayar',
      cancel: 'Batal',
      yes: 'Ya, Booking'
    }
  },
  en: {
    nav: {
      flights: 'Flights',
      destinations: 'Destinations',
      hotels: 'Hotels',
      activities: 'Activities',
      login: 'Login',
      start: 'Start'
    },
    hero: {
      tag: '✈️ Blue Sky Flights',
      title: 'Fly Beyond',
      subtitle: 'Above Clouds',
      desc: 'LeFlight perfects every second of your journey with soothing sky aesthetics and smart AI technology.'
    },
    search: {
      from: 'From',
      to: 'To',
      date: 'Date',
      btn: 'Search Tickets',
      placeholderOrigin: 'Origin City',
      placeholderDest: 'Destination City'
    },
    trending: {
      title: 'Latest Estimates',
      live: 'Live Data',
      from: 'From',
      to: 'To',
      est: 'Estimate',
      book: 'Book'
    },
    dest: {
      title: 'Iconic',
      highlight: 'Destinations',
      subtitle: 'Best choices for this season\'s experience',
      catalog: 'View Catalog',
      startFrom: 'Starting From'
    },
    ai: {
      title: 'AI Assistant',
      tag: 'LeFlight Smart',
      placeholder: 'How is your travel planning going? I am ready to provide the best local tips.',
      btn: 'Ask More',
      typing: 'Typing...'
    },
    game: {
      title: 'Urban Dash',
      tag: 'Flight Game Online',
      status: 'Game Online',
      tap: 'Tap to Takeoff',
      emergency: 'Emergency!',
      cancelled: 'Flight Cancelled',
      current: 'Score',
      best: 'Best',
      restart: 'Restart Flight'
    },
    cs: {
      title: 'LeFlight Support',
      assistant: 'Sky Assistant Online',
      greeting: 'Hello! I am Sky, LeFlight\'s smart assistant. How can I help you today?',
      input: 'Ask something...',
      error: 'Sorry, my connection is currently interrupted.'
    },
    login: {
      welcome: 'Welcome Back',
      join: 'Join LeFlight',
      subLogin: 'Fly higher with us',
      subJoin: 'Start your new adventure',
      or: 'Or with Email',
      email: 'Email Address',
      pass: 'Password',
      forgot: 'Forgot?',
      btnIn: 'Login Now',
      btnUp: 'Create Account',
      noAccount: 'Don\'t have an account?',
      haveAccount: 'Already have an account?',
      reg: 'Sign Up Free',
      log: 'Just Login'
    },
    confirm: {
      title: 'Booking Confirmation',
      sub: 'Review your itinerary',
      pay: 'Total Payment',
      cancel: 'Cancel',
      yes: 'Yes, Book'
    }
  }
};

export const AIRLINES = [
  { name: 'SkyHigh Airways', logo: '✈️' },
  { name: 'Azure Wings', logo: '☁️' },
  { name: 'Cloud Nine', logo: '🌤️' },
  { name: 'Oceanic Air', logo: '🌊' },
  { name: 'LeFlight Express', logo: '🦅' }
];

export const DESTINATIONS = [
  { id: 1, name: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800', price: '$450' },
  { id: 2, name: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800', price: '$320' },
  { id: 3, name: 'Kyoto', country: 'Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800', price: '$580' },
  { id: 4, name: 'Santorini', country: 'Greece', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800', price: '$610' },
  { id: 5, name: 'New York', country: 'USA', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800', price: '$720' },
  { id: 6, name: 'Dubai', country: 'UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800', price: '$550' },
  { id: 7, name: 'Sydney', country: 'Australia', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=800', price: '$680' },
  { id: 8, name: 'Rome', country: 'Italy', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=800', price: '$490' },
];

export const TRENDING_FLIGHTS = [
  { id: 't1', from: 'JKT', to: 'SIN', price: 85, airline: 'LeFlight Express', status: 'Live', class: 'Economy' },
  { id: 't2', from: 'JKT', to: 'NRT', price: 420, airline: 'Azure Wings', status: 'Hot Deal', class: 'Business' },
  { id: 't3', from: 'JKT', to: 'LHR', price: 890, airline: 'SkyHigh Airways', status: 'Live', class: 'Economy' },
  { id: 't4', from: 'JKT', to: 'DPS', price: 45, airline: 'Cloud Nine', status: 'Trending', class: 'Economy' },
];

export const PlaneIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.8,11.6C23,11.2,18,10,14,10l-4-7H7.5l3,7H6l-2-2H2l1,4l-1,4h2l2-2h4.5l-3,7h2.5l4-7c4,0,9-1.2,9.8-1.6 C24.2,12.2,24.2,11.8,23.8,11.6z" />
  </svg>
);
