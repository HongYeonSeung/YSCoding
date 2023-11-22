// // PrivateRoute.js
// import React from 'react';
// import { Outlet, Route, Navigate } from 'react-router-dom';
// import { useUser } from './UserContext';
//
// const PrivateRoute = ({ element: Element, ...rest }) => {
//     const { loginId } = useUser();
//
//     return (
//         <Route
//             {...rest}
//             element={loginId ? <Outlet /> : <Navigate to="/login" />}
//         />
//     );
// };
//
// export default PrivateRoute;
