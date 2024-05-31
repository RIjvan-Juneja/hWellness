
// ======================= For Registation Form  ========================= //

if(document.querySelector('#signUpBtn')){

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
      if(response.status === 200){
        alert("You Are Successfully Registered, Check mail for Username and Password");
        form.reset();
      } else {
        alert(resData.status);
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  });  
}

// ======================= For login Form  ========================= //

if(document.querySelector("#signInBtn")){
  const loginBtn = document.querySelector('#signInBtn');
  loginBtn.addEventListener('click',async ()=>{
    const form = document.querySelector('#signInForm');
    let formData = new FormData(form);
    let userData = new URLSearchParams(formData);
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: userData,
        headers: {
          'Content-Type': "application/x-www-form-urlencoded",
        }
      });
      const resData = await response.json();
      if(response.status === 200){
        console.log(resData);
      } else {
        alert(response.status);
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  });
}