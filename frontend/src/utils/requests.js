export const callToBackend = async (method, endpoint, withAuth, reqBody={}) => {
    // Fonction utilisee pour faire des appels au backend django
    try {
        const url = `http://localhost:8000${endpoint}`;
        const body = {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Authorization: withAuth ? `JWT ${localStorage.getItem("access")}` : "",
                Accept: "application/json",
            },
        };
        if (method.toUpperCase() === "POST") {
            // Cette cle est a part, car les methodes GET ne peuvent pas avoir de body
            body.body = JSON.stringify(reqBody);
        }
        const res = await fetch(url, body);
        return res.json();
    } catch (error) {
        console.log(error);
    }
};