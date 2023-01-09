const addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", () => {
    addNewNote();
})
    
text = JSON.parse(localStorage.getItem("notes"));
if (text) {
    text.forEach(note => {
        addNewNote(note);
    });
}

function addNewNote(text = "") {
    const note = document.createElement("div");
    note.classList.add("note-container")
    note.innerHTML =
    `<div class="notes">
        <div id="note-header">
            <button id="btn-delete"><i class="fa-solid fa-trash"></i></button>
            <button id="btn-edit"><i class="fa-regular fa-pen-to-square"></i></button>
        </div>
        <div>
            <div class="main hidden">${text}</div>
            <textarea id="note" name="message">${text}</textarea>
        </div>
    </div>`;

    const delBtn = note.querySelector("#btn-delete");
    const editBtn = note.querySelector("#btn-edit");

    const main = note.querySelector(".main");
    const textArea = note.querySelector('textarea');
   

    delBtn.addEventListener("click", ()=> {
        removeNote();
        updateLs();
    });

    editBtn.addEventListener("click", ()=> {
        main.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
    });

    textArea.addEventListener("input", (e) => {
        const { value } = e.target;
        main.innerHTML = value;

        updateLs();
    })
    

    function removeNote() {
        note.remove();

    };



    document.body.appendChild(note);
};

function updateLs() {
    const noteText = document.querySelectorAll("textarea");
    const notes = []
    noteText.forEach(note => {
        notes.push(note.value);
    });
    localStorage.setItem("notes", JSON.stringify(notes))
}




    
  








