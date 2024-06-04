// ======================= validations ========================= //

const mergeArrays = (...arrays) => {
  const mergedSet = new Set();
  arrays.forEach(array => {
    array.forEach(item => {
      mergedSet.add(item);
    });
  });
  return Array.from(mergedSet);
}

const loginValidation = () => {

  let required = ['username', 'password'];
  let onlyNumber = [];

  const fields = mergeArrays(required, onlyNumber);

  for (const field of fields) {
    let value = document.querySelector(`#${field}`).value.trim();
    let errorSpan = document.querySelector(`.${field}Error`);
    let name = field.replace(/([A-Z])/g, ' $1').trim();
    name = name.charAt(0).toUpperCase() + name.slice(1);
    errorSpan.textContent = '';

    if (required.includes(field) && value == '') {
      errorSpan.textContent = `${name} is Required`;
    } else if (onlyNumber.includes(field) && !(value.match(/^[0-9]+$/))) {
      errorSpan.textContent = `Only numers are allowed`;
    } else {
      errorSpan.textContent = ``;
    }
  }

  errors = document.querySelectorAll('.errorSpan');
  for (const error of errors) {
    if (error.textContent != '') {
      return false;
    }
  }

  return true;
}

const registationValidation = () => {
  
}


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
    if (loginValidation()) {
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
          window.location.href = "/dashboard";
        } else {
          document.querySelector(".passwordError").textContent =  "Invalid Username or Password" ;
        }

      } catch (error) {
        alert(error);
        console.log(error);
      }

    }
  });
}




// const validateForm = () => {
//   let required = ['productName', 'price', 'quantity', 'category', 'subCategory', 'description'];
//   let onlyNumber = ['price', 'quantity'];

  

  

  

//   const mainImgFile = document.querySelector("#mainImg");
//   if(!document.querySelector(".updateBtn")){   // insert file validation
//     if (mainImgFile.files.length != 0) {
//       validateImageFile(mainImgFile.files[0], "mainImgError");
//     } else {
//       document.querySelector(`.mainImgError`).textContent = `This Field Is Required`;
//     }
//   } else {                                     // update file validation
//     if (mainImgFile.files.length != 0) {               
//       validateImageFile(mainImgFile.files[0], "mainImgError");
//     }
//   }
  

//   const filesFields = document.querySelector("#multipleImg");
//   if (filesFields.files.length != 0) {
//     for (const file of filesFields.files) {
//       if (!validateImageFile(file, "multipleImgError")) {
//         break;
//       }
//     }
//   }

//   errors = document.querySelectorAll('.errorSpan');
//   for (const error of errors) {
//     if (error.textContent != '') {
//       return false;
//     }
//   }

//   return true;
// }

const validateImageFile = (file, errorClass) => {
  let allowImages = ['image/jpg', 'image/jpeg', 'image/png'];
  let fileSize = 5; // 5 MB

  const error = document.querySelector(`.${errorClass}`);

  if (!(allowImages.includes(file.type))) {
    error.textContent = `only ${allowImages.toString()} are allowed`;
    return false;
  } else if (file.size >= (fileSize * 1024 * 1024)) {
    error.textContent = `maximum image size is ${fileSize}`;
    return false;
  } else {
    error.textContent = ``;
  }

  return true;

}