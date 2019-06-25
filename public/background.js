/*global chrome*/
const profileStorageName = 'goodreadsProfileName';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    console.log('got background request', request);
    if (request.contentScriptQuery == "getQuote") {
      //const quotesApi = `https://cors.io/?https://www.goodreads.com/quotes/widget/27359384-shahar-shalev?v=2`;
      const profileName = localStorage.getItem(profileStorageName) || '27359384-shahar-shalev';
      const quotesApi = `https://www.goodreads.com/quotes/widget/${profileName}?v=2`;

      fetch(quotesApi)
      .then(resp => resp.text())
      .then(str => {
        const regex = /.*&ldquo;(.*).&rdquo.*title=\\\"(.*)\squotes.*/gm;
        let m;
        let result = {};
        while ((m = regex.exec(str)) !== null) {
          // This is necessary to avoid infinite loops with zero-width matches
          if (m.index === regex.lastIndex) {
              regex.lastIndex++;
          }
          
          // The result can be accessed through the `m`-variable.
          m.forEach((match, groupIndex) => {
            if (groupIndex === 1)
            {
              result['quote'] = match.replace(/\\/g, '');
            }
            if (groupIndex === 2)
            {
              result['author'] = match;
            }
          });
      }
      return result['quote'] + ' - ' +  result['author'];
    })
    .then(resp => sendResponse(resp))

    return true;  // Will respond asynchronously.
    }
});