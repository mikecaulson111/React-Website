import { useRef, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { useAuth } from "../components/AuthContext/AuthContext";



export function useIdleTimeout(timeoutInMins = 15, callback) {
    const timerRef = useRef(null);
    const alertRef = useRef(null);

    const {user, loading} = useAuth();

    const logout = async () => {
        alert("You have been logged out due to inactivity.");
        callback(false);
        await supabase.auth.signOut();
    };

    const alertSoon = () => {
        callback(true);
    }

    const resetTimer = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        if (alertRef.current) clearTimeout(alertRef.current);
        console.log("resetting timer");

        timerRef.current = setTimeout(logout, timeoutInMins * 60 * 1000);
        alertRef.current = setTimeout(alertSoon, (timeoutInMins * 0.8) * 60 * 1000);
    };

    useEffect(() => {
        const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];
        if (user) {
            resetTimer();
            events.forEach((event) => window.addEventListener(event, resetTimer));
        }
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            if (alertRef.current) clearTimeout(alertRef.current);

            events.forEach((event) => window.removeEventListener(event, resetTimer));
        };
    }, [timeoutInMins, user]);
};
