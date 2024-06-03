
const displayMedication = async () => {
  const response = await fetch("/medication/api/list", {
    method: "POST",
  })
  const resData = await response.json();
  if (response.status === 200) {
    console.log(resData);
    const thead = document.querySelector("table thead");
    thead.innerHTML = '';
    const tr = document.createElement("tr");
    if(resData.length != 0){
  
      let fields = Object.keys(resData[0]);
      fields.forEach(el => {
        let th = document.createElement("th");
        th.setAttribute("scope", "col");
        th.classList.add('text-capitalize');
        th.innerText = el.replace(/_/g, " ");
        tr.appendChild(th);
      });
      thead.appendChild(tr);
    } else {
      tr.innerHTML = `<th>No data Found</th>`;
      thead.appendChild(tr);
    }

  } else {
    console.log(resData.msg);
  }
}

displayMedication();