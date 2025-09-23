import React from "react";
import { useHistory } from "react-router-dom";
// import { roles } from "./rolesData";

export default function AdminPanel() {
    const history = useHistory();

    return (
        <div className="p-4">
            <h1 className="mb-4 text-2xl font-bold">Admin Panel</h1>
            <label className="block mb-2">Select Role:</label>
            <select
                className="p-2 mb-4 border"
                onChange={e => {
                    if (e.target.value) history.push(`/adminpanel/${e.target.value}`);
                }}
                defaultValue=""
            >
                {/* <option value="" disabled>Select a role</option>
                {roles.map(role => (
                    <option key={role.key} value={role.key}>{role.name}</option>
                ))} */}
            </select>
        </div>
    );
}