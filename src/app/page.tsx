"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HomePage from "./components/HomePage";
import LoginPage from "./login/page";

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem("userInfo") ? true : false
  );
  const [isInitialCheckDone, setIsInitialCheckDone] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is already authenticated before performing authentication
    if (!isLoggedIn) {
      let userInfo = localStorage.getItem("userInfo");
      let parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;

      if (!parsedUserInfo) {
        router.push("/login");
      }
    }

    setIsInitialCheckDone(true); // Mark the initial check as done
  }, []);

  console.log("isLoggedIn", isLoggedIn);

  return (
    <main className="">
      {isInitialCheckDone && (
        // Render the UI only after the initial check is done
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
