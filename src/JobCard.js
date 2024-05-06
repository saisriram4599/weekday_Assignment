import React from 'react';
import "./JobCard.css";

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <img src={job.logoUrl} alt={job.companyName} />
      <h2>CompanyName :{job.companyName}</h2>
      <p>Role:{job.jobRole}</p>
      <p>Location:{job.location}</p>
      <p>Experience: {job.minExp}-{job.maxExp}</p>
      <p>Salary: {job.minJdSalary || 'N/A'}-{job.maxJdSalary || 'N/A'} {job.salaryCurrencyCode}</p>
      <p>{job.jobDetailsFromCompany.substring(0, 200)}...</p>
      <a href={job.jdLink} target="_blank" rel="noopener noreferrer">Apply Now</a>
    </div>
  );
};

export default JobCard;
