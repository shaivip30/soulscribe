import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      router.push("/journal");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-96">
        <h1 className="text-2xl font-bold mb-4">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-pink-500 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
      </div>
    </div>
  );
}