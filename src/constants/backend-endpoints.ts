const BASE_URL = "http://localhost:8080/api/v1";

const BackendEndpoints = {
    // Admin, Staff, Customer
    LOGIN_ADMIN: `${BASE_URL}/auth/adminData/login`,    // POST
    SIGNIN_ADMIN: `${BASE_URL}/auth/adminData/signup`,  // POST

    // Stylist
    ADD_NEW_STYLIST:"/stylistData",          // POST
    // GET_ALL_STYLISTS: "/stylistData",    // GET
    // GET_A_STYLIST: "/stylist?id={1}",    // GET
    // UPDATE_STYLIST:"/stylist?id={1}",    // PUT
    
    // Appointmnet
    ADD_NEW_APPOINTMENT: `${BASE_URL}/appointment`,             // POST
    // GET_ALL_APPOINTMENT:"/appointments",                     // GET
    // UPDATE_AN_APPOINTMENT:"/appointment?id={2}",             // PUT
    // DELETE_AN_APPOINTMENT: "/appointment?id={3}",            // DELETE
    // GET_APPOINTMENT_HISTORY: "/appointments/user?id={2}",    // GET
} 

export default BackendEndpoints;
