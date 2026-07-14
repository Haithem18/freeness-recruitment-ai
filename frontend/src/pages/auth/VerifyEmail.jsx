import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import API from "../../services/api";
import freenessLogo from "../../assets/logos/freeness.png";

export default function VerifyEmail() {
  const navigate = useNavigate();

  const [code, setCode] = useState("");

  const email = localStorage.getItem("email");

  const verify = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/verify-email", {
        email,
        code,
      });

      alert("Email verified successfully");

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl border border-[#e5e7eb] shadow-xl overflow-hidden">
          {/* TOP BLUE LINE */}
          <div className="h-[10px] w-full bg-gradient-to-r from-[#2d0fd5] via-[#5b46ff] to-[#7c6cff]" />

          <div className="p-10">
            {/* LOGO */}
            <div className="flex justify-center">
              <img src={freenessLogo} alt="Freeness" className="w-24 h-auto" />
            </div>

            <h1 className="text-center text-3xl font-bold text-[#111827] mt-6">
              Verify your email
            </h1>

            <p className="text-center text-gray-500 mt-3 text-sm">
              We've sent a verification code to
            </p>

            <div className="flex items-center justify-center gap-2 mt-2 text-[#2d0fd5] font-medium">
              <Mail size={16} />
              <span>{email}</span>
            </div>

            <form onSubmit={verify} className="mt-8">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter verification code"
                maxLength={6}
                className="
                  w-full
                  h-14
                  px-5
                  rounded-2xl
                  border
                  border-[#e5e7eb]
                  outline-none
                  focus:ring-2
                  focus:ring-[#2d0fd5]/30
                  text-center
                  text-lg
                  tracking-[0.4em]
                  font-semibold
                "
              />

              <button
                type="submit"
                className="
                  w-full
                  h-14
                  mt-5
                  rounded-2xl
                  bg-[#2d0fd5]
                  text-white
                  font-semibold
                  hover:opacity-90
                  transition
                "
              >
                Verify Email
              </button>
            </form>

            <p className="text-center text-sm text-gray-400 mt-5">
              Didn't receive the code?
            </p>

            <button
              className="
                w-full
                mt-3
                h-12
                rounded-xl
                border
                border-[#e5e7eb]
                text-[#2d0fd5]
                font-medium
                hover:bg-[#f8f9fc]
                transition
              "
            >
              Resend Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
