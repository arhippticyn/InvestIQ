import React, { useEffect, useState } from "react";
import { getUser, getNewRefresh } from "../../redux/Auth/AuthOperation";
import { useTypificatedDispatch } from "../../hooks/hooks";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const dispatch = useTypificatedDispatch();
    const [isVerified, setIsVerified] = useState < boolean | null>(null);

    useEffect(() => {
        const verifyUser = async function () {            
            try {
                await dispatch(getUser()).unwrap();
                setIsVerified(true);
            } catch {
                console.log('Сюди пашлі');

                try {
                    await dispatch(getNewRefresh()).unwrap();
                    setIsVerified(true);
                } catch {
                    setIsVerified(false);
                }
            }
        };

        verifyUser();
    }, [dispatch]);

    if (isVerified === false) return <Navigate to="/" replace={true} />;

    return children;
}