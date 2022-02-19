const url = document.getElementById("url");
const btn = document.getElementById("btn");

btn.addEventListener("click", (_) => {
  if (!url.value) {
    alert("Please fill in the URL field!");
  } else {
    fetch("/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url.value }),
    })
      .then((response) => response.json())
      .then((result) => alert(`Shortened URL: ${result.url}`));
  }
});
