export const fetchJobs = async (limit, offset) => {
     const myHeaders = new Headers();
     myHeaders.append("Content-Type", "application/json");
     const body = JSON.stringify({ limit, offset });
   
     const requestOptions = {
       method: "POST",
       headers: myHeaders,
       body
     };
   
     try {
       const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
       if (!response.ok) throw new Error(`HTTP error status: ${response.status}`);
       const result = await response.json();
       console.log(result);
       return result;
     } catch (error) {
       console.error(error);
       return null;
     }
   };
   