// Contact page: validate, send the enquiry to the team inbox (FormSubmit) and email the visitor a confirmation.
// If the request fails, fall back to the visitor's email app so the message is never lost.
(() => {
  const form = document.getElementById("ct-form");
  if (!form) return;
  const err = document.getElementById("ct-err");
  const ok = document.getElementById("ct-ok");
  const note = document.getElementById("ct-note");
  const btn = form.querySelector(".ct-send");
  const label = btn.querySelector("span");
  const ENDPOINT = "https://formsubmit.co/ajax/dp.uideveloper@gmail.com";
  const FALLBACK = "connect@9sprints.com";

  const mailto = (f) => {
    const co = f.company.value.trim();
    const body = `${f.message.value.trim()}\n\n— ${f.name.value.trim()}${co ? ", " + co : ""}\n${f.email.value.trim()}`;
    location.href = `mailto:${FALLBACK}?subject=${encodeURIComponent("Enquiry: " + f.topic.value)}&body=${encodeURIComponent(body)}`;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = form.elements;
    if (f._honey && f._honey.value) return; // bot
    const req = [f.name, f.email, f.message];
    const bad = req.filter((el) => !el.value.trim() || !el.checkValidity());
    req.forEach((el) => el.classList.toggle("bad", bad.includes(el)));
    err.textContent = "Please add your name, a valid email and a short message.";
    err.hidden = !bad.length;
    ok.hidden = true;
    if (bad.length) { bad[0].focus(); return; }

    btn.disabled = true; label.textContent = "Sending…";
    const data = {
      name: f.name.value.trim(),
      email: f.email.value.trim(),
      company: f.company.value.trim() || "—",
      interested_in: f.topic.value,
      message: f.message.value.trim(),
      page: location.href,
      _subject: `New 9sprints enquiry — ${f.name.value.trim()} (${f.topic.value})`,
      _template: "table",
      _captcha: "false",
      _autoresponse: `Hi ${f.name.value.trim()}, thank you for contacting 9sprints. We have received your message about "${f.topic.value}" and a member of our team will reply within one business day. — The 9sprints team (connect@9sprints.com)`,
    };
    try {
      const res = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || out.success === "false" || out.success === false) throw new Error(out.message || res.status);
      form.reset();
      ok.hidden = false; note.hidden = true;
      ok.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } catch (_) {
      err.textContent = "We couldn’t send that just now — opening your email app so you can send it directly.";
      err.hidden = false;
      setTimeout(() => mailto(f), 900);
    } finally {
      btn.disabled = false; label.textContent = "Send message";
    }
  });
})();
