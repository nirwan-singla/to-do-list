// ============================================================
// TODO LIST APPLICATION
// ============================================================

// Variables
let tasks = [];
let editingId = null;

const STORAGE_KEY = "AkshLabs3";


// ============================================================
// LOAD DATA
// ============================================================

function loadData() {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
        try {
            tasks = JSON.parse(saved);

            if (!Array.isArray(tasks)) {
                tasks = [];
            }
        } catch (error) {
            console.error("Error loading tasks:", error);
            tasks = [];
        }
    } else {
        tasks = [
            {
                id: 1,
                title: "Do workout for 20 minutes",
                status: "pending",
                priority: "normal",
                completed: false
            },
            {
                id: 2,
                title: "Learn one concept of JavaScript",
                status: "pending",
                priority: "normal",
                completed: false
            },
            {
                id: 3,
                title: "Prepare for tomorrow class test",
                status: "pending",
                priority: "critical",
                completed: false
            },
            {
                id: 4,
                title: "Delete all unnecessary files and videos from the computer",
                status: "pending",
                priority: "minor",
                completed: false
            }
        ];

        saveData();
    }

    renderTasks();
    updateGreeting();
}


// ============================================================
// UPDATE GREETING
// ============================================================

function updateGreeting() {
    const hour = new Date().getHours();

    let greet = "Good Morning";

    if (hour >= 12 && hour < 18) {
        greet = "Good Afternoon";
    } else if (hour >= 18) {
        greet = "Good Evening";
    }

    document.getElementById("greeting").textContent =
        `${greet}, Akshat`;
}


// ============================================================
// SAVE DATA
// ============================================================

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}


// ============================================================
// RENDER TASKS
// ============================================================

function renderTasks() {

    const onHold = tasks.filter((task) => !task.completed);
    const completed = tasks.filter((task) => task.completed);


    // --------------------------------------------------------
    // ON HOLD TASKS
    // --------------------------------------------------------

    document.getElementById("onHoldTasks").innerHTML =
        onHold.length
            ? onHold.map((task) => `
                <div class="task-item">

                    <div
                        class="task-checkbox"
                        onclick="toggleTask(${task.id})"
                    ></div>

                    <div class="task-content">
                        <div class="task-title">
                            ${escapeHTML(task.title)}
                        </div>
                    </div>

                    <span class="status-badge status-${task.status}">
                        ${
                            task.status === "progress"
                                ? "In Progress"
                                : task.status.charAt(0).toUpperCase()
                                  + task.status.slice(1)
                        }
                    </span>

                    <div class="priority-badge priority-${task.priority}">
                        <i class="fas fa-circle"></i>
                        ${
                            task.priority.charAt(0).toUpperCase()
                            + task.priority.slice(1)
                        }
                    </div>

                    <div class="avatar">CF</div>

                    <button
                        class="icon-button"
                        style="width:30px;height:30px;"
                        onclick="editTask(${task.id})"
                        title="Edit Task"
                    >
                        <i
                            class="fas fa-pen"
                            style="font-size:12px;"
                        ></i>
                    </button>

                    <button
                        class="icon-button"
                        style="width:30px;height:30px;"
                        onclick="deleteTask(${task.id})"
                        title="Delete Task"
                    >
                        <i
                            class="fas fa-trash"
                            style="font-size:12px;"
                        ></i>
                    </button>

                </div>
            `).join("")
            : `
                <p style="color:#9ca3af;padding:20px;">
                    No Tasks on Hold
                </p>
            `;


    // --------------------------------------------------------
    // COMPLETED TASKS
    // --------------------------------------------------------

    document.getElementById("completedTasks").innerHTML =
        completed.length
            ? completed.map((task) => `
                <div class="task-item">

                    <div
                        class="task-checkbox completed"
                        onclick="toggleTask(${task.id})"
                    ></div>

                    <div class="task-content">
                        <div class="task-title completed">
                            ${escapeHTML(task.title)}
                        </div>
                    </div>

                    <span class="status-badge status-completed">
                        Completed
                    </span>

                    <div class="priority-badge priority-${task.priority}">
                        <i class="fas fa-circle"></i>
                        ${
                            task.priority.charAt(0).toUpperCase()
                            + task.priority.slice(1)
                        }
                    </div>

                    <div class="avatar">CF</div>

                    <button
                        class="icon-button"
                        style="width:30px;height:30px;"
                        onclick="editTask(${task.id})"
                        title="Edit Task"
                    >
                        <i
                            class="fas fa-pen"
                            style="font-size:12px;"
                        ></i>
                    </button>

                    <button
                        class="icon-button"
                        style="width:30px;height:30px;"
                        onclick="deleteTask(${task.id})"
                        title="Delete Task"
                    >
                        <i
                            class="fas fa-trash"
                            style="font-size:12px;"
                        ></i>
                    </button>

                </div>
            `).join("")
            : `
                <p style="color:#9ca3af;padding:20px;">
                    No completed tasks
                </p>
            `;


    // --------------------------------------------------------
    // UPDATE STATISTICS
    // --------------------------------------------------------

    const total = tasks.length;

    const completedCount =
        tasks.filter((task) => task.completed).length;

    const pending = total - completedCount;

    const rate =
        total > 0
            ? Math.round((completedCount / total) * 100)
            : 0;


    // IMPORTANT:
    // HTML ID is "task-count"
    document.getElementById("task-count").textContent = pending;

    document.getElementById("totalTasks").textContent = total;

    document.getElementById("completedCount").textContent =
        completedCount;

    document.getElementById("pendingCount").textContent =
        pending;

    document.getElementById("completionRateValue").textContent =
        rate + "%";

    document.getElementById("totalProgress").style.width =
        rate + "%";

    document.getElementById("completionProgress").style.width =
        rate + "%";
}


// ============================================================
// TOGGLE TASK
// ============================================================

function toggleTask(id) {

    const task = tasks.find((task) => task.id === id);

    if (task) {
        task.completed = !task.completed;

        task.status = task.completed
            ? "completed"
            : "pending";

        saveData();
        renderTasks();
    }
}


// ============================================================
// DELETE TASK
// ============================================================

function deleteTask(id) {

    if (confirm("Are you sure you want to delete this Task?")) {

        tasks = tasks.filter((task) => task.id !== id);

        saveData();
        renderTasks();
    }
}


// ============================================================
// OPEN MODAL
// ============================================================

function openModal() {
    document
        .getElementById("taskModal")
        .classList.add("active");
}


// ============================================================
// CLOSE MODAL
// ============================================================

function closeModal() {

    document
        .getElementById("taskModal")
        .classList.remove("active");

    document
        .getElementById("taskForm")
        .reset();

    editingId = null;
}


// ============================================================
// FORM SUBMISSION
// ============================================================

document
    .getElementById("taskForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        const title =
            document.getElementById("taskTitle").value.trim();

        const status =
            document.getElementById("taskStatus").value;

        const priority =
            document.getElementById("taskPriority").value;


        if (!title) {
            alert("Please enter a task title.");
            return;
        }


        // ----------------------------------------------------
        // EDIT TASK
        // ----------------------------------------------------

        if (editingId !== null) {

            const task =
                tasks.find((task) => task.id === editingId);

            if (task) {
                task.title = title;
                task.status = status;
                task.priority = priority;
                task.completed = status === "completed";
            }
        }


        // ----------------------------------------------------
        // ADD NEW TASK
        // ----------------------------------------------------

        else {

            tasks.push({
                id: Date.now(),
                title: title,
                status: status,
                priority: priority,
                completed: status === "completed"
            });
        }


        saveData();
        renderTasks();
        closeModal();
    });


// ============================================================
// EDIT TASK
// ============================================================

function editTask(id) {

    const task =
        tasks.find((task) => task.id === id);

    if (!task) {
        return;
    }

    editingId = id;

    document.getElementById("taskTitle").value =
        task.title;

    document.getElementById("taskStatus").value =
        task.status;

    document.getElementById("taskPriority").value =
        task.priority;

    openModal();
}


// ============================================================
// ESCAPE HTML
// ============================================================

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


// ============================================================
// START APPLICATION
// ============================================================

loadData();
