"use client"

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HomePage from "./components/HomePage";
import LoginPage from "./login/page";

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    let userInfo = localStorage.getItem("userInfo");
    let parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;

    if (parsedUserInfo) {
      setIsLoggedIn(true);
    } else {
      router.push("/login");
    }
  }, []);

  console.log("isLoggedIn", isLoggedIn);

  return (
    <main className="">
      {isLoggedIn ? (
        <div className="">
          <HomePage />
        </div>
      ) : (
        <LoginPage />
      )}
    </main>
  );
}
