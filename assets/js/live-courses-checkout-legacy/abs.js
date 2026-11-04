// Function to get the redirect URL based on the entered code
function getRedirectLink(code) {
  const couponMap = {
    'TX-Biz': '/courses/live-courses/tarun/bug-bounty/',       // If code is TX-12, redirect to ref.html
    'TX-Wiz': '/courses/live-courses/tarun/cyber-security/',     // If code is TX-13, redirect to ref_2.html
    'TX-14': '/ref_3.html',     // If code is TX-14, redirect to ref_3.html
    'TX-15': '/ref_4.html',     // If code is TX-15, redirect to ref_4.html
    // Add more codes and their corresponding URLs as needed
  };
  
  return couponMap[code] || null;  // If the code doesn't match, return null
}
