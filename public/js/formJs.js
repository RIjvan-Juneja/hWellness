
document.addEventListener('DOMContentLoaded', function () {
    const timePickerInput = document.getElementById('timePickerInput');
    const timePickerButton = document.getElementById('timePickerButton');
    const timePickerDropdown = document.getElementById('timePickerDropdown');
    const hoursSelect = document.getElementById('hours');
    const minutesSelect = document.getElementById('minutes');
    const setTimeButton = document.getElementById('setTimeButton');

    // Populate hours and minutes
    for (let i = 0; i < 24; i++) {
        const hourOption = document.createElement('option');
        hourOption.value = i;
        hourOption.textContent = i.toString().padStart(2, '0');
        hoursSelect.appendChild(hourOption);
    }

    for (let i = 0; i < 60; i++) {
        const minuteOption = document.createElement('option');
        minuteOption.value = i;
        minuteOption.textContent = i.toString().padStart(2, '0');
        minutesSelect.appendChild(minuteOption);
    }

    // Show/Hide dropdown
    timePickerButton.addEventListener('click', function () {
        timePickerDropdown.classList.toggle('show');
    });

    // Set time
    setTimeButton.addEventListener('click', function () {
        const hours = hoursSelect.value;
        const minutes = minutesSelect.value;
        timePickerInput.value = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
        timePickerDropdown.classList.remove('show');
    });

    // Close dropdown if clicked outside
    document.addEventListener('click', function (event) {
        if (!timePickerButton.contains(event.target) && !timePickerDropdown.contains(event.target)) {
            timePickerDropdown.classList.remove('show');
        }
    });
});

document.querySelector("#routing").addEventListener('change', (event) => {
  const day = document.querySelector("#day");
  const dayLable = document.querySelector("#dayLable");
  if(event.target.value === 'weekly'){
    day.style.display = 'block';
    dayLable.innerHTML = 'Day';
  }else {
    dayLable.innerHTML = '';
    day.style.display = 'none';
  }
});