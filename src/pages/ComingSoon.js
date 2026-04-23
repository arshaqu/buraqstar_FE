import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../assets/footer_logo.svg';

const ComingSoon = () => {
  const { t } = useTranslation();
  const TARGET_DATE = '2025-03-15T00:00:00';
  const targetDate = new Date(TARGET_DATE);

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate - now;
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timerComponents = Object.keys(timeLeft).map((interval) => (
    <div key={interval} className="flex flex-col items-center mx-2 sm:mx-4">
      <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2858a3]">
        {timeLeft[interval]}
      </span>
      <span className="text-sm sm:text-base md:text-lg uppercase text-gray-600">
        {interval}
      </span>
    </div>
  ));

  const handleSubscribe = () => {
    const email = window.prompt(t('coming_soon.enter_email_prompt'));
    if (email) {
      if (email === "test@gmail.com") {
        localStorage.setItem("test_mode", 'true');
        window.alert(t('coming_soon.refresh_notice'));
      } else {
        window.alert(t('coming_soon.subscribe_thanks'));
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-[#2858a3] to-indigo-600 p-6 sm:p-8">
      {/* Logo */}
      <img src={logo} alt="Logo" className="w-28 sm:w-36 md:w-44 h-auto mb-6 sm:mb-8" />

      {/* Main Heading */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white mb-3 sm:mb-5 text-center">
        {t('coming_soon.title')}
      </h1>

      {/* Subheading */}
      <p className="text-sm sm:text-lg md:text-xl text-white mb-6 sm:mb-8 text-center px-4 max-w-lg">
        {t('coming_soon.description')}
      </p>

      {/* Countdown Timer */}
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg flex flex-wrap justify-center gap-4 w-full max-w-md sm:max-w-lg md:max-w-xl">
        {timerComponents.length ? timerComponents : <span>{t('coming_soon.times_up')}</span>}
      </div>

      {/* Subscribe Button */}
      <button
        onClick={handleSubscribe}
        className="mt-6 sm:mt-8 px-5 sm:px-6 py-2 bg-white text-[#2858a3] rounded-md hover:text-white hover:bg-[#2858a3] transition duration-300 text-sm sm:text-lg md:text-xl"
      >
        {t('coming_soon.subscribe')}
      </button>
    </div>
  );
};

export default ComingSoon;
