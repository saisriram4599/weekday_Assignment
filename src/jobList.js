import React, { useState, useEffect } from 'react';
import axios from 'axios';

// JobCard component
const JobCard = ({ job }) => {
     const [isExpanded, setIsExpanded] = useState(false);
   
     const toggleDescription = () => {
       setIsExpanded(!isExpanded);
     };
   
     return (
       <div className="job-card">
         <img src={job.logoUrl} alt={`${job.companyName} logo`} />
         <h2>{job.jobRole}</h2>
         <h3>{job.companyName}</h3>
         <p>Location: {job.location}</p>
         {/* <p>
           Description: {isExpanded ? job.jobDetailsFromCompany : `${job.jobDetailsFromCompany.substring(0, 100)}...`}
           <button onClick={toggleDescription}>
             {isExpanded ? 'Show Less' : 'Show More'}
           </button>
         </p> */}
         <p>Experience Required: {job.minExp} - {job.maxExp} years</p>
         <p>Salary: {job.minJdSalary ? `$${job.minJdSalary}` : 'Negotiable'} - $${job.maxJdSalary} {job.salaryCurrencyCode}</p>
         <a href={job.jdLink} target="_blank" rel="noopener noreferrer">Apply Now</a>
       </div>
     );
   };

// JobListings component
const JobListings = () => {
     const [jobs, setJobs] = useState([]);
   
     useEffect(() => {
       const fetchJobs = async () => {
         try {
           const response = await axios.post('https://api.weekday.technology/adhoc/getSampleJdJSON', {
             limit: 10,
             offset: 0
           }, {
             headers: {
               "Content-Type": "application/json"
             }
           });
           console.log('API Response:', response.data); // Log the API response
           if (response.data && Array.isArray(response.data.jobs)) {
             setJobs(response.data.jobs);
             console.log('Jobs State:', jobs); // Log the jobs state
           }
         } catch (error) {
           console.error('Error fetching data: ', error);
         }
       };
   
       fetchJobs();
     }, []);

  return (
    <div className="job-listings">
      {jobs.length > 0 ? (
        jobs.map(job => <JobCard key={job.id} job={job} />)
      ) : (
        <p>Loading jobs...</p> // Provide a loading state or error message
      )}
    </div>
  );
};

export default JobListings;
