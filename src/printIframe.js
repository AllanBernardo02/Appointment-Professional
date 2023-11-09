/**
 * Prints the content of an iframe, and returns a Promise that resolves when the print process is complete.
 * @param {HTMLIFrameElement} iframe - The iframe element to be printed.
 * @param {string} fileName - The name of the file to be printed (optional).
 * @returns {Promise<void>} - A Promise that resolves when the print process is complete.
 */
function printIframe(iframe, fileName) {
  return new Promise((resolve, reject) => {
    // sometimes background image not work if no setTimeout
    setTimeout(() => {
      if (!iframe.contentWindow) {
        reject(
          "Printing failed because the `contentWindow` of the print iframe did not load."
        );
        return;
      }
      // Some browsers, such as Firefox Android, do not support printing at all
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/print
      if (!iframe.contentWindow.print) {
        reject(
          "Printing for this browser is not currently possible: the browser does not have a `print` method available for iframes."
        );
        return;
      }
      iframe.contentWindow.focus(); // Needed for IE 11

      // Additional print styles to remove any potential spacing
      const printStyles = `
              @page {
                margin: 0;
              }
              body {
                margin: 0;
              }
            `;

      const styleEl = iframe.contentDocument.createElement("style");
      styleEl.appendChild(iframe.contentDocument.createTextNode(printStyles));
      iframe.contentDocument.head.appendChild(styleEl);

      // NOTE: Overrides the page's title during the print process
      const title = document.title;
      if (fileName) {
        document.title = fileName;
      }
      iframe.contentWindow.print();
      // back the title
      if (fileName) {
        document.title = title;
      }
      resolve();
    });
  });
}

export default printIframe;
