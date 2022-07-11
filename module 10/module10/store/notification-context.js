import { createContext, useState, useEffect } from "react";



//initialized object that defines the structure of  the context. this will manage notification
const NotificationContext = createContext({
    notification: null,//{title,message,status}
    showNotification: function (notificationData) { },
    hideNotification: function () { }

});


// component to manage context related state and to wrap props children
export function NotificationContextProvider(props) {
    // state to store notification if any

    const [activeNotification, setActiveNotification] = useState();

    useEffect(() => {
        if (activeNotification && (activeNotification.status === 'success' || activeNotification.status === 'error')) {
            const timer = setTimeout(() => {
                setActiveNotification(null);
            }, 3000);
        }

        return ()=>{
            clearTimeout(timer);
        }

        
    }, [activeNotification])


    function showNotificationHandler(notificationData) {
        setActiveNotification(notificationData);
    }

    function hideNotificationHandler() {
        setActiveNotification(null);
    }

    const context = {
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler,
    }

    return <NotificationContext.Provider value={context}>
        {props.children}
    </NotificationContext.Provider>
}

export default NotificationContext;
