const form = document.getElementById('checkinForm');
const checkinList = document.getElementById('checkinList');

const BASE_URL = "https://reentry-project.onrender.com";

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const mood = document.getElementById('mood').value;
  const note = document.getElementById('note').value;

  try {
    const res = await fetch(`${BASE_URL}/checkins`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mood, note })
    });
    const data = await res.json();

    const li = document.createElement('li');
    li.textContent = 'ID: ${data.id} | Mood: $data.mood} | Note: ${data.note || ""} | ${data.created_at}';
    checkinList.appendChild(li);

    form.reset();
  } catch (err) {
    alert('Error submitting check-in');
    console.error(err);
  }
});

async function loadCheckins() {
    try {
        const res = await fetch(`${BASE_URL}/checkins`);
        const checkins = await res.json();
        checkinList.innerHTML = '';
        checkins.forEach(c => {
            const li = document.createElement('li');
            li.textContent = `ID: ${c.id} | Mood: ${c.mood} | Note: ${c.note || ""} | ${c.created_at}`;
            checkinList.appendChild(li);
        });
    } catch (err) {
        console.error(err);
}
}

loadCheckins();