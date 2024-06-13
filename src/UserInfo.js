//// // src/UserInfo.js
//// import React, { useEffect, useState } from "react";
//// import { getAccessToken } from "./teamsSSO";

//// const UserInfo = () => {
////   const [user, setUser] = useState(null);

////   useEffect(() => {
////     const fetchUser = async () => {
////       try {
////         const token = await getAccessToken();
////         const response = await fetch("https://graph.microsoft.com/v1.0/me", {
////           headers: {
////             Authorization: `Bearer ${token}`
////           }
////         });
////         const data = await response.json();
////         setUser(data);
////       } catch (error) {
////         console.error("Error fetching user info: ", error);
////       }
////     };

////     fetchUser();
////   }, []);

////   if (!user) {
////     return <div>Loading...</div>;
////   }

////   return (
////     <div>
////       <h1>Welcome, {user.displayName}</h1>
////     </div>
////   );
//// };

//// export default UserInfo;


//// src/UserInfo.js
//import React, { useEffect, useState } from "react";
//import { getAccessToken } from "./teamsSSO";

//const UserInfo = () => {
//    const [user, setUser] = useState(null);
//    const [loading, setLoading] = useState(true);

//    useEffect(() => {
//        const fetchUser = async () => {
//            try {
//                const token = await getAccessToken();
//                const response = await fetch("https://graph.microsoft.com/v1.0/me", {
//                    headers: {
//                        Authorization: `Bearer ${token}`,
//                    },
//                });
//                const data = await response.json();
//                setUser(data);
//            } catch (error) {
//                console.error("Error fetching user info: ", error);
//            } finally {
//                setLoading(false);
//            }
//        };

//        fetchUser();
//    }, []);

//    if (loading) {
//        return <div>Loading...</div>;
//    }

//    if (!user) {
//        return <div>Failed to load user information.</div>;
//    }

//    return (
//        <div>
//            <h1>Welcome, {user.displayName}</h1>
//        </div>
//    );
//};

//export default UserInfo;

// src/UserInfo.js
// src/UserInfo.js
// src/UserInfo.js
import React, { useEffect, useState } from "react";
import { getAccessToken } from "./teamsSSO";

const UserInfo = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = await getAccessToken();
                console.log("Token acquired: ", token); // Log the acquired token
                const response = await fetch("https://graph.microsoft.com/v1.0/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    // If response is not OK, throw an error with the status text
                    const errorData = await response.json();
                    throw new Error(`Error: ${response.status} - ${response.statusText}, ${JSON.stringify(errorData)}`);
                }

                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Error fetching user info: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Failed to load user information.</div>;
    }

    return (
        <div>
            <h1>Welcome, {user.displayName}</h1>
        </div>
    );
};

export default UserInfo;



