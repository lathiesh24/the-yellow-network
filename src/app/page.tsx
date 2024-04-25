"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HomePage from "./components/HomePage";
import LoginPage from "./login/page";

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isInitialCheckDone, setIsInitialCheckDone] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      let userInfo = localStorage.getItem("userInfo");
      let parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;

      if (parsedUserInfo) {
        setIsLoggedIn(true);
      } else {
        router.push("/login");
      }

      setIsInitialCheckDone(true); 
    }
  }, []);

  console.log("isLoggedIn", isLoggedIn);

  return (
    <main className="">
      {isInitialCheckDone && (
        isLoggedIn ? (
          <div className="">
            <HomePage />
          </div>
        ) : (
          <LoginPage />
        )
      )}
    </main>
  );
}
