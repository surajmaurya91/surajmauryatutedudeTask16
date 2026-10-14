const students = [
    { name: "Salman Khan", marks: 38, className: "10th", address: "Delhi, India" },
    { name: "Aarav Sharma", marks: 92, className: "12th", address: "Mumbai, India" },
    { name: "Priya Verma", marks: 84, className: "11th", address: "Jaipur, India" },
    { name: "Rohan Patel", marks: 76, className: "10th", address: "Ahmedabad, India" },
    { name: "Aisha Khan", marks: 95, className: "12th", address: "Lucknow, India" },
    { name: "Kabir Singh", marks: 67, className: "9th", address: "Chandigarh, India" },
    { name: "Meera Iyer", marks: 89, className: "11th", address: "Chennai, India" },
    { name: "Arjun Das", marks: 73, className: "10th", address: "Kolkata, India" },
    { name: "Sana Ali", marks: 81, className: "12th", address: "Hyderabad, India" },
    { name: "Dev Mehta", marks: 58, className: "9th", address: "Pune, India" }
];

const studentColors = ["#635bdb", "#278b78", "#d1813e", "#447bc4", "#bd5d83"];
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#student-search");
const clearButton = document.querySelector("#clear-search");
const studentList = document.querySelector("#student-list");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");

function renderStudents(studentRecords) {
    studentList.innerHTML = studentRecords.map((student) => {
        const initials = student.name
            .split(" ")
            .map((part) => part[0])
            .join("");
        const color = studentColors[students.indexOf(student) % studentColors.length];

        return `
            <article class="student-card" style="--student-color: ${color}">
                <div class="student-card-top">
                    <span class="student-avatar" aria-hidden="true">${initials}</span>
                    <div>
                        <h3 class="student-name">${student.name}</h3>
                        <p class="student-class">Class ${student.className}</p>
                    </div>
                </div>
                <div class="student-details">
                    <div class="student-detail">
                        <span class="detail-label">Marks</span>
                        <span class="detail-value marks-value">${student.marks}%</span>
                    </div>
                    <div class="student-detail">
                        <span class="detail-label">Address</span>
                        <span class="detail-value">${student.address}</span>
                    </div>
                </div>
            </article>
        `;
    }).join("");

    const hasResults = studentRecords.length > 0;
    studentList.hidden = !hasResults;
    emptyState.hidden = hasResults;
    resultCount.textContent = `Showing ${studentRecords.length} of ${students.length} students`;
}

function filterStudents(query) {
    const normalizedQuery = query.trim().toLocaleLowerCase();

    if (!normalizedQuery) {
        return students;
    }

    return students.filter((student) => {
        const searchableDetails = [
            student.name,
            student.marks,
            `${student.marks}%`,
            student.className,
            `class ${student.className}`,
            student.address
        ];

        return searchableDetails.some((detail) =>
            String(detail).toLocaleLowerCase().includes(normalizedQuery)
        );
    });
}

function updateResults() {
    const query = searchInput.value;
    renderStudents(filterStudents(query));
    clearButton.hidden = query.length === 0;
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    updateResults();
});

searchInput.addEventListener("input", updateResults);

clearButton.addEventListener("click", () => {
    searchInput.value = "";
    updateResults();
    searchInput.focus();
});

renderStudents(students);
