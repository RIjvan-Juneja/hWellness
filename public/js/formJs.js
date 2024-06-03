
// ================ show and hide Input field Day ================ //
document.querySelector("#routing").addEventListener('change', (event) => {
    const day = document.querySelector("#day");
    const dayLable = document.querySelector("#dayLable");
    if (event.target.value === 'weekly') {
        day.style.display = 'block';
        dayLable.innerHTML = 'Day';
    } else {
        dayLable.innerHTML = '';
        day.style.display = 'none';
    }
});

// ===== Sumbit data of form(Only one time,Reccurring form) ====== //
const addMedication = async (formId,formType) => {
    const form = document.querySelector(`#${formId}`);
    const formData = new FormData(form);
    if(formType == 'oto'){
        formData.append('form_type', 'oto');
    } else {
        formData.append('form_type', 'recurrence');
    }
    console.log(formData);
    try {
        const response = await fetch('/medication/api/add', {
            method: 'POST',
            body: formData
        });
        const resData = await response.json();
        if (response.status === 200) {
            console.log(resData);
            form.reset();
            alert("Sucessfully added");
        } else {
            console.log(resData);
        }
    } catch (error) {
        console.log(error);
    }
}

document.querySelector("#otoBtn").addEventListener('click', () => {
    addMedication("otoForm","oto");
});

document.querySelector("#recurringBtn").addEventListener('click', () => {
    addMedication("recurringForm","recurrence");
});

