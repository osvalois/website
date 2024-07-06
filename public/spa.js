[...document.querySelectorAll("template")].forEach(template => {
  const clone = template.content.cloneNode(true);

  const filename = template.id;

  const details = document.createElement("details");
  const summary = document.createElement("summary");

  summary.textContent = filename;

  details.appendChild(summary);
  details.appendChild(clone);

  document.querySelector(".markdown-body").appendChild(details);
});
