// Saves options to chrome.storage

function getGoodreadsUsername(str)
{
    const regex = /https:\/\/www\.goodreads\.com\/user\/show\/(.*)/gm;
    let m;

    let profile;
    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        
        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            if (groupIndex === 1)
            {
                profile = match;
            }
        });
    }
    return profile;
}

const profileStorageName = 'goodreadsProfileName';

function save_options() {
    let profileUrl = document.getElementById('profileUrl').value;
    const profileName = getGoodreadsUsername(profileUrl);
    
    localStorage.setItem(profileStorageName, profileName);
    
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  }
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    const profileName = localStorage.getItem(profileStorageName);
    document.getElementById('profileUrl').value = profileName;
  }
  
  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click',
      save_options);