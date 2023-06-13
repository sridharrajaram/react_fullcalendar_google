
const API_KEY = process.env.REACT_APP_GCP_API_KEY;
const CLIENT_ID = process.env.REACT_APP_GCP_CLIENT_ID;
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

export function initClient(callback) {
    window.gapi.load("client:auth2", function () {
        try {
            window.gapi.client
                .init({
                    apiKey: API_KEY,
                    clientId: CLIENT_ID,
                    discoveryDocs: DISCOVERY_DOCS,
                    scope: SCOPES,
                    plugin_name: "chat"
                })
                .then(
                    function () {
                        if (typeof callback === "function") {
                            callback(true);
                        }
                    },
                    function (error) {
                        console.log("Error", error);
                    }
                );
        } catch (error) {
            console.log(error);
        }
    });
}
export const checkSignInStatus = async () => {
    try {
        return await window.gapi.auth2.getAuthInstance().isSignedIn.listen(function (signedIn) {
            console.log("signedIn-", signedIn);
            if (signedIn) {
                console.log("profile", window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile());
            }
        });
    } catch (error) {
        console.log(error);
    }
};
export const signInToGoogle = async () => {
    try {
        let googleuser = await window.gapi.auth2.getAuthInstance().signIn({ prompt: "consent" });
        if (googleuser) {
            return true;
        }
    } catch (error) {
        console.log(error);
    }
};

export const signOutFromGoogle = () => {
    try {
        var auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut().then(() => {
            auth2.disconnect();
        });
        return true;
    } catch (error) {
        console.log(error);
    }
};

export const getSignedInUserEmail = async () => {
    try {
        let status = await checkSignInStatus();
        console.log("statusTIME--", status.isActive);

        if (status && status.isActive) {
            return window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();

        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
};

export const publishTheCalenderEvent = (event) => {
    try {
        console.log("EVENT--", event);

        setTimeout(() => {
            window.gapi.client.load("calendar", "v3", () => {
                var request = window.gapi.client.calendar.events.insert({
                    calendarId: "primary",
                    resource: event 
                });
                
                request.execute((event) => {
                    console.log("Event created: " + event.htmlLink);
                });
            });
        }, 1000)
    } catch (error) {
        console.log(error);
    }
};