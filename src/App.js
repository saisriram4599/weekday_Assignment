import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';
import { fetchJobs } from './api';
import './App.css';

const App = () => {

  const [search, setSearch] = useState('');
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoreJobs = async () => {
    const data = await fetchJobs(20, jobs.length);
    if (data && data.jdList) {
      setJobs(prevJobs => [...prevJobs, ...data.jdList]);
    }
    setIsLoading(false);
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading) {
      setIsLoading(true);
      fetchMoreJobs();
    }
  };

  useEffect(() => {
    fetchMoreJobs(); // Initial data fetch
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const filteredJobs = jobs.filter(job => {
    return search.trim() === '' || job.location.toLowerCase().includes(search.toLowerCase());
  });
  
  return (
    <>
      <input onChange={(e) => setSearch(e.target.value)} type='text' />
      <div className='app'>
        {filteredJobs.map(job => (
          <JobCard key={job.index} job={job} />
        ))}
        {isLoading && <p>Loading more jobs...</p>}
      </div>
    </>
  );
};

export default App;