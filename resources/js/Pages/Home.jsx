import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/header';
import Main from '@/components/main';
import Info from '@/components/information';
import '../../css/scroll.css';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const mainRef = useRef(null);
  const infoRef = useRef(null);

  // Menangani scroll   
  const handleScroll = (e) => {
    if (e.deltaY > 0 && currentPage === 0) {
      setCurrentPage(1);
    } else if (e.deltaY < 0 && currentPage === 1) {
      setCurrentPage(0);
    }
  };

  // Fungsi untuk menggulir ke section tertentu
  const scrollToInfo = (page) => {
    if (page === 0) {
      mainRef.current.scrollIntoView({ behavior: 'smooth' });
      setCurrentPage(0);
    } else {
      infoRef.current.scrollIntoView({ behavior: 'smooth' });
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [currentPage]);

  const currentTheme = localStorage.getItem('currentTheme')
  const [ theme, setTheme ] = useState(currentTheme ? currentTheme : 'light')

  useEffect(()=>{
    localStorage.setItem('currentTheme', theme)
  },[theme])

  return (
    <div className={`container ${theme}`}>
      <Header scrollToInfo={scrollToInfo} theme={theme} setTheme={setTheme} />
      <div className={`page ${currentPage === 0 ? 'show-home' : 'show-info'}`}>
        <div ref={mainRef} className="section home-section">
          <Main />
        </div>
        <div ref={infoRef} className="section info-section">
          <Info />
        </div>
      </div>
    </div>
  );
};