
const loginBtn = document.querySelector('#signUpBtn');
loginBtn.addEventListener('click',async ()=>{
  const form = document.querySelector('#signUpForm');
  let formData = new FormData(form);
  let userData = new URLSearchParams(formData);
  
  try {
    const response = await fetch('/api/registation', {
      method: 'POST',
      body: userData,
      headers: {
        'Content-Type': "application/x-www-form-urlencoded",
      }
    });
    const resData = await response.json();
    console.log(resData);
  } catch (error) {
    console.log(error);
  }
});