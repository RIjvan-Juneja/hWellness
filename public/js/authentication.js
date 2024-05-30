
const loginBtn = document.querySelector('#signUpBtn');
loginBtn.addEventListener('click',async ()=>{
  const form = document.querySelector('#signUpForm');
  let formData = new FormData(form);
  // console.log(formData);
  
  try {
    const response = await fetch('/api/registation', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data' // Set Content-Type to multipart/form-data
      }
    });
    const resData = await response.json();
    console.log(resData);
  } catch (error) {
    console.log(error);
  }
});