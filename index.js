let myLeads = [];
const inputEl = document.getElementById("input-el");
const noteEl = document.getElementById("note-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
let deletebtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const themeToggle = document.getElementById("theme-toggle");

// Load leads from localStorage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

// // Check saved theme from localStorage
// const savedTheme = localStorage.getItem("theme");
// if (savedTheme) {
//     document.body.classList.toggle('dark', savedTheme === 'dark');
//     themeToggle.checked = savedTheme === 'dark';
// }


// Event listener for theme toggle
// themeToggle.addEventListener("change", () => {
//     document.body.classList.toggle('dark');
//     const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
//     localStorage.setItem("theme", currentTheme);
// });

// Save current tab URL
tabBtn.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const url = tabs[0].url;
        const note = noteEl.value.trim();
        myLeads.push({ url, note });
        inputEl.value = "";
        noteEl.value = "";
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    });
});

function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
          <a target="_blank" href="${leads[i].url}">
            ${leads[i].url}
          </a>
          <p>${leads[i].note}</p>
          <button class="edit-btn" data-index="${i}">Edit</button>
        </li>
        `;
    }
    ulEl.innerHTML = listItems;

    // Add event listeners for edit buttons
    const editButtons = document.querySelectorAll(".edit-btn");
    editButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            const newUrl = prompt("Edit your lead URL:", myLeads[index].url);
            const newNote = prompt("Edit your lead note:", myLeads[index].note);
            if (newUrl) {
                myLeads[index].url = newUrl;
            }
            if (newNote) {
                myLeads[index].note = newNote;
            }
            localStorage.setItem("myLeads", JSON.stringify(myLeads));
            render(myLeads);
        });
    });
}

// Clear all leads
deletebtn.addEventListener("dblclick", () => {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});

// Save input lead
inputBtn.addEventListener("click", function () {
    const inputValue = inputEl.value.trim();
    const noteValue = noteEl.value.trim();
    if (inputValue) {
        myLeads.push({ url: inputValue, note: noteValue });
        inputEl.value = "";
        noteEl.value = "";
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    }
});






