document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('dateConverterForm');
  const resultDiv = document.getElementById('result');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const gregDate = document.getElementById('gregDate').value;

    if (!gregDate) {
      resultDiv.textContent = 'Gregorian Date: Undefined';
      resultDiv.classList.add('error');
      return;
    }

    try {
      const [year, month, day] = gregDate.split('-');
      const response = await fetch(`https://www.hebcal.com/converter?cfg=json&gy=${year}&gm=${month}&gd=${day}`, {
        method: 'GET'
      });
      const data = await response.json();
      if (response.ok) {
        resultDiv.textContent = `Hebrew Date: ${data.hebrew}`;
        resultDiv.classList.remove('error');
      } else {
        resultDiv.textContent = 'Error occurred during conversion.';
        resultDiv.classList.add('error');
      }
    } catch (error) {
      resultDiv.textContent = 'Error occurred during conversion.';
      resultDiv.classList.add('error');
    }
  });
});
