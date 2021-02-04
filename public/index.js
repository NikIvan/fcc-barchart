(() => {
  // src/client/index.js
  document.addEventListener("DOMContentLoaded", () => {
    app().catch((err) => console.error(err));
  });
  var dataUrl = "/api/v1/data";
  async function app() {
    let data;
    try {
      const response = await fetch(dataUrl);
      data = await response.json();
    } catch (e) {
      console.error(e);
    }
    console.log(data);
  }
})();
//# sourceMappingURL=index.js.map
