// Variable and data structure ✅
// loaddata and localstorage    ✅
// updateGreeting   ✅
// savedata function  ✅
// renderTasks function (needs to be furthur division)
// toggletasks function
// deleteTasks function
// modal functions
// Form Submission
// Edit task function
// control flow for better understanding how everything is working


// ----------------------------------- STARTING -------------------------------------------------

// Variable defination and ID Allocation

 let tasks = [],

 // EDITING ID / DYNAMIC ID
        editingId = null;

// Load data and localStorage

function loadData(){
    const saved = localStorage.getItem("AkshLabs3");
    if(saved){
        tasks = JSON.parse(saved);
    } else {
        tasks = [

            {
                id:1,
                title: "Do workout for 20 minutes",
                status: "pending",
                priority: "normal",
                completed: false,
            },

            {
                id: 2,
                title: "Learn one concept of JavaScript",
                status: "pending",
                priority: "normal",
                completed: false,
            },

            {
                id:3,
                title: "Prepare for tomorrow class test",
                status: "pending",
                priority: "critical",
                completed: false,
            },

            {
                id:4,
                title: "Delete all unneccessary files and videos from the computer",
                status: "pending",
                priority: "minor",
                completed: false,
            },
            //End of Array [Tasks]
        ];
        // End of Else statement
    }
    // End of function LOAD_DATA()
    renderTasks();
    updateGreeting();
}


// ---------------------------- Update Greeting Function ------------------------

function updateGreeting(){
    const hour = new Date().getHours();
    let greet = "Good Morning";

    // Condition Checking for Real Time Changes

    if(hour >= 12 && hour < 18){
        greet = "Good Afternoon";
    } else if(hour>=18){
        greet = "Good Evening";
    }

    // Changing InnerHTMl

    document.getElementById("greeting").textContent = `${greet}, Akshat`
}


// ---------------------------------- SAVE_DATA() FUNCTION -----------------------------------

function saveData(){
    localStorage.setItem("AkshLabs2", JSON.stringify(tasks));
}


// -------------------------------------- RENDER TASKS FUNCTION ----------------------------------

function renderTasks() {
    const onHold = tasks.filter((t) => !t.completed);
    const completed = tasks.filter((t) => t.completed);

    // ---------------------- TO RENDER ONHOLD TASKS ---------------------------

        document.getElementById("onHoldTasks").innerHTML = onHold.length
            ? onHold.map((t) =>
                `<div class="task-item">
                <div class="task-checkbox ${t.completed ? "completed" : ""}" onclick="toggleTask(${t.id})"></div>
                <div class="task-content">
                <div class="task-title ${t.completed ? "completed": ""}">
                ${t.title}
                </div>
            </div>

            <span class="status-badge status-${t.status}">
            ${t.status === "progress" ? "In Progress" : t.status.charAt(0).toUpperCase() + t.status.slice(1)}
            </span>

            <div class="priority-badge priority-${t.priority}">
                <i class="fas fa-circle"></i>
                ${t.priority.charAt(0).toUpperCase() + t.priority.slice(1)}
            </div>

            <div class="avatar"> CF </div>

            <button class="icon-button" style="width: 30px; height: 30px;" onclick="editTask(${t.id})">

            <i class="fas fa-pen" style="font-size:12px;"> </i>

            </button>

            <button class="icon-button" style="width: 30px; height: 30px;" onclick="deleteTask(${t.id})">

            <i class="fas fa-trash" style="font-size:12px;"> </i>

            </button>

        </div>`
            )
            .join(" ")
            : '<p style="color:#9ca3af; padding:20px;">No Tasks on Hold</p>';


// ------------------To Render Completed Tasks---------------------------

        document.getElementById("completedTasks").innerHTML = completed.length
            ? completed.map((t) =>
                `<div class="task-item">
                <div class="task-checkbox completed" onclick="toggleTask(${t.id})"></div>
                <div class="task-content">
                    <div class="task-title completed">${t.title}</div>
                </div>
                <span class="status-badge status-completed">Completed</span>
                <div class="priority-badge priority-${t.priority}">
                    <i class="fas fa-circle"></i> ${t.priority.charAt(0).toUpperCase() + t.priority.slice(1)}
                </div>
                <div class="avatar">CF</div>
                <button class="icon-button" style="width:30px;height:30px;" onclick="editTask(${t.id})">
                    <i class="fas fa-pen" style="font-size:12px;"></i>
                </button>
                <button class="icon-button" style="width:30px;height:30px;" onclick="deleteTask(${t.id})">
                    <i class="fas fa-trash" style="font-size:12px;"></i>
                </button>
            </div>
                `
        )
                .join("")
            : '<p style="color:#9ca3af;padding:20px;">No completed tasks</p>';


            // UPDATE Status Bar

            const total = tasks.length;
            const completedCount = tasks.filter((t) => t.completed).length;
            const pending = total - completedCount;
            const rate = total ? Math.round((completedCount/total) * 100) : 0;

            document.getElementById("taskCount").textContent = pending;
            document.getElementById("totalTasks").textContent = total;
            document.getElementById("completedCount").textContent = completedCount;
            document.getElementById("pendingCount").textContent = pending;
            document.getElementById("completionRateValue").textContent = rate + "%";
            document.getElementById("totalProgress").style.width = rate + "%";
            document.getElementById("completionProgress").style.width = rate + "%";



            saveData();
}

// Rendering Completed

// Toggle Task

function toggleTask(id){
    const t = tasks.find((t) => t.id === id);

    if(t){
        t.completed = !t.completed;
        t.status = t.completed ? "completed" : "pending";
        renderTasks();
    }
}

// --------------------------- TO Delete a task ------------------------------

function deleteTask(id){
    if(confirm("Are you sure you want to delete this Task?")){
        tasks = tasks.filter((t) => t.id !== id);
        renderTasks();
    }
}


// ----------------------------OPEN MODAL-----------------------------------------

function openModal(){
    document.getElementById("taskModal").classList.add("active");
}

function closeModal(){
    document.getElementById("taskModal").classList.remove("active");
    document.getElementById("taskForm").reset();
    editingId = null;
}

document.getElementById("taskForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("taskTitle").value;
    const status = document.getElementById("taskStatus").value;
    const priority = document.getElementById("taskPriority").value;

    if(editingId){
        const t = tasks.find((t) => t.id === editingId);
        t.title = title;
        t.status = status;
        t.priority = priority;
        t.completed = status === "completed";
    } else {
        tasks.push({
            id: Date.now(),
            title,
            status,
            priority,
            completed: status === "completed"
        });

        renderTasks();
        closeModal();
    }
})

// ------------------------------TO EDIT A TASK--------------------------------


function editTask(id){
    editingId = id;
    const t = tasks.find((t) => t.id === id);

    if(t){
        document.getElementById("taskTitle").value = t.title;
        document.getElementById("taskStatus").value = t.status;
        document.getElementById("taskPriority").value = t.priority;

        openModal();
    }
}


loadData();

