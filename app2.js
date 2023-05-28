function saveInput(event) {
  event.preventDefault();
  const formValues = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
  };

  axios.post('https://crudcrud.com/api/your-unique-identifier', formValues)
    .then(response => {
      console.log(response.data); // Optional: Display the response data in the console
      displayFormValues(response.data);
    })
    .catch(error => {
      console.error(error);
    });
}

function displayFormValues(savedValues) {
  const displayArea = document.createElement('div');
  const namePara = document.createElement('p');
  const emailPara = document.createElement('p');
  const phonePara = document.createElement('p');
  const deleteIcon = document.createElement('i');

  namePara.textContent = `Name: ${savedValues.name}`;
  emailPara.textContent = `Email: ${savedValues.email}`;
  phonePara.textContent = `Phone: ${savedValues.phone}`;
  deleteIcon.className = 'fas fa-trash-alt'; // Add a font-awesome class for the delete icon

  deleteIcon.addEventListener('click', () => {
    deleteFormValues(savedValues._id);
    displayArea.remove();
  });

  displayArea.appendChild(namePara);
  displayArea.appendChild(emailPara);
  displayArea.appendChild(phonePara);
  displayArea.appendChild(deleteIcon);

  const existingDisplayArea = document.getElementById('displayArea');
  if (existingDisplayArea) {
    existingDisplayArea.remove(); // Remove the existing display area if it exists
  }

  displayArea.id = 'displayArea'; // Set an ID for the display area
  document.body.appendChild(displayArea);
}

function deleteFormValues(id) {
  axios.delete(`https://crudcrud.com/api/your-unique-identifier/${id}`)
    .then(response => {
      console.log(response.data); // Optional: Display the response data in the console
    })
    .catch(error => {
      console.error(error);
    });
}
function updateDisplayArea(id, updatedValues) {
  const displayArea = document.getElementById('displayArea');
  if (displayArea) {
    const namePara = displayArea.querySelector(`[data-id="${id}"] .name`);
    const emailPara = displayArea.querySelector(`[data-id="${id}"] .email`);
    const phonePara = displayArea.querySelector(`[data-id="${id}"] .phone`);

    namePara.textContent = `Name: ${updatedValues.name}`;
    emailPara.textContent = `Email: ${updatedValues.email}`;
    phonePara.textContent = `Phone: ${updatedValues.phone}`;
  }
}

window.onload = function() {
  axios.get('https://crudcrud.com/api/your-unique-identifier')
    .then(response => {
      const data = response.data;
      if (data) {
        data.forEach(savedValues => {
          displayFormValues(savedValues);
        });
      }
    })
    .catch(error => {
      console.error(error);
    });
};
