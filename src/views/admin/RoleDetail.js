// import React from "react";
// import { useParams } from "react-router-dom";
// // import { roles } from "./rolesData";

// export default function RoleDetail() {
//     const { roleKey } = useParams();
//     const role = roles.find(r => r.key === roleKey);

//     if (!role) return <div className="p-4">Role not found.</div>;

//     return (
//         <div className="p-4">
//             <h2 className="mb-2 text-xl font-bold">{role.name}</h2>
//             <p>{role.description}</p>
//         </div>
//     );
// }