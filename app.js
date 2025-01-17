import { supabase } from "./supabase.js";
import formFunctions from './toggle.js';

// Logout Functionality
document.getElementById('signOut').addEventListener('click', async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    if (error) {
        Swal.fire({
            icon: 'error',
            title: 'Sign Out Failed',
            text: error.message,
        });
    } else {
        Swal.fire({
            icon: 'success',
            title: 'Signed Out Successfully!',
        }).then(() => window.location.href = 'index.html');
    }
});

// Display User Data
const displayData = document.getElementById('data');
(async () => {
    const { data, error } = await supabase.from('authUser').select('*');
    if (error) {
        console.error("Error fetching data:", error);
        return;
    }

    const rows = data.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.phoneNo}</td>
            <td>${user.email}</td>
            <td>
                <select class="styled-select" onchange="handleAction(event, ${user.id})">
                    <option value="">Select</option>
                    <option value="edit">Edit</option>
                    <option value="delete">Delete</option>
                </select>
            </td>
        </tr>
    `).join('');
    displayData.innerHTML = rows;
})();

// Action Handlers
window.handleAction = (event, userId) => {
    const action = event.target.value;
    if (action === "edit") {
        alert(`Edit user with ID: ${userId}`);
    } else if (action === "delete") {
        alert(`Delete user with ID: ${userId}`);
    }
    event.target.value = "";
};
