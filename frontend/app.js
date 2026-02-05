// Don't touch the DOM before it exists!
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkinForm");
  const checkinsList = document.getElementById("checkinsList");

  const BASE_URL = "https://reentry-project.onrender.com";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const mood = document.getElementById("mood").value;
    const note = document.getElementById("note").value;

    try {
      const res = await fetch(`${BASE_URL}/checkins`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood, note })
      });

      const data = await res.json();

      const li = document.createElement("li");
      li.textContent = `${data.mood} — ${data.note || ""}`;
      checkinsList.appendChild(li);

      form.reset();
    } catch (err) {
      console.error(err);
      alert("Error submitting check-in");
    }
  });

  async function loadCheckins() {
    try {
      const res = await fetch(`${BASE_URL}/checkins`);
      const checkins = await res.json();

      checkinsList.innerHTML = "";
      checkins.forEach(c => {
        const li = document.createElement("li");
        li.textContent = `${c.mood} — ${c.note || ""}`;
        checkinsList.appendChild(li);
      });
    } catch (err) {
      console.error(err);
    }
  }

  loadCheckins();
});