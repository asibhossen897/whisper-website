/* Moved the inline JavaScript to this file so it can keep the html cleaner */
/* script */
const recorder = document.getElementById('recorder');
const player = document.getElementById('player');

// Script to set the default subtitle file name based on the uploaded file
const filenameInput = document.getElementById('filename');

recorder.addEventListener('change', function (e) {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  player.src = url;

  // Set the default subtitle file name
  if (file) {
    const fileName = file.name.split('.').slice(0, -1).join('.');
    filenameInput.value = fileName;
  }
});
/* /script */

/* script */
const conversionForm = document.getElementById('conversion-form');
const submitButton = document.getElementById('submit');
const spinner = document.getElementById('spinner');

conversionForm.addEventListener('submit', async (event) => {
event.preventDefault();
submitButton.disabled = true;
spinner.classList.remove('d-none');

const formData = new FormData(conversionForm);
const response = await fetch('/download/', {
    method: 'POST',
    body: formData,
});

const blob = await response.blob();
const downloadUrl = URL.createObjectURL(blob);
const link = document.createElement('a');
link.href = downloadUrl;
link.download = `${formData.get('filename')}.${formData.get('file_type')}`;
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
submitButton.disabled = false;
spinner.classList.add('d-none');
});
/* /script */