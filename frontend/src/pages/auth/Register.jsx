import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../../services/api";

import { User, Mail, Lock, Eye, ArrowRight } from "lucide-react";

import {
  FaShieldHalved,
  FaBolt,
  FaRocket,
  FaUsers,
  FaCheck,
} from "react-icons/fa6";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration successful");

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      className="
min-h-screen
bg-[#F6F5FF]
flex
items-center
justify-center
p-6
overflow-hidden
relative
"
    >
      {/* background */}

      <div
        className="
absolute
w-[500px]
h-[500px]
bg-purple-300/30
blur-[130px]
rounded-full
-top-40
-left-40
"
      />

      <div
        className="
absolute
w-[400px]
h-[400px]
bg-indigo-300/20
blur-[120px]
rounded-full
bottom-0
right-0
"
      />

      <div
        className="
w-full
max-w-[1200px]
h-[700px]

bg-white/70
backdrop-blur-xl

rounded-[32px]

shadow-[0_30px_100px_rgba(70,40,200,.15)]

border
border-white

grid
grid-cols-[55%_45%]

overflow-hidden
"
      >
        {/* LEFT SIDE */}

        <div
          className="
relative
bg-[#FAFAFF]
p-14
"
        >
          {/* dots */}

          <div
            className="
absolute
top-8
left-10

grid
grid-cols-5
gap-2

opacity-40
"
          >
            {Array.from({ length: 25 }).map((_, i) => (
              <span
                key={i}
                className="
w-[3px]
h-[3px]
bg-indigo-400
rounded-full
"
              />
            ))}
          </div>

          {/* LOGO */}

          <div
            className="
flex
items-center
gap-3
"
          >
            <div
              className="
text-indigo-600
text-5xl
font-black
"
            >
              F
            </div>

            <div>
              <h2
                className="
text-3xl
font-bold
text-[#161B3D]
"
              >
                Freeness
              </h2>

              <p
                className="
text-gray-400
text-xs
"
              >
                Recruitment AI
              </p>
            </div>
          </div>

          <div
            className="
mt-14
"
          >
            <div
              className="
w-10
h-1
bg-indigo-600
rounded
"
            />

            <h1
              className="
mt-5
text-[42px]
font-bold
text-[#161B3D]
"
            >
              Join Us
            </h1>

            <p
              className="
text-gray-500
mt-2
"
            >
              Create your account and start your journey with
              <span
                className="
text-indigo-600
font-semibold
"
              >
                Freeness
              </span>
            </p>

            {/* illustration */}

            <div
              className="
relative
h-[300px]
mt-5
"
            >
              <div
                className="
absolute
left-1/2
top-1/2
-translate-x-1/2
-translate-y-1/2

w-[250px]
h-[250px]

rounded-full

bg-gradient-to-br
from-indigo-200
to-white

shadow-[0_20px_50px_rgba(80,60,255,.2)]
"
              />

              <div
                className="
absolute
left-1/2
top-1/2

-translate-x-1/2
-translate-y-1/2

w-[150px]
h-[170px]

bg-white

rounded-[35px]

shadow-xl

flex
items-center
justify-center
"
              >
                <FaUsers
                  size={80}
                  className="
text-indigo-600
"
                />
              </div>

              <div
                className="
absolute
right-28
top-14

w-12
h-12

rounded-full

bg-indigo-600

text-white

flex
items-center
justify-center

shadow-lg
"
              >
                <FaCheck />
              </div>
            </div>

            {/* pills */}

            <div
              className="
flex
gap-3
"
            >
              {[
                [FaShieldHalved, "Secure"],
                [FaBolt, "Smart"],
                [FaRocket, "Fast"],
                [FaUsers, "Opportunities"],
              ].map(([Icon, text]) => (
                <div
                  key={text}
                  className="
bg-white
rounded-lg
px-3
py-2

shadow-sm

flex
items-center
gap-2

text-xs
"
                >
                  <Icon
                    className="
text-indigo-600
"
                  />

                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div
          className="
p-14
flex
items-center
"
        >
          <form
            onSubmit={submit}
            className="
w-full
space-y-5
"
          >
            <h2
              className="
text-3xl
font-bold
text-[#161B3D]
"
            >
              Create Account
            </h2>

            <p
              className="
text-gray-400
text-sm
mb-6
"
            >
              Register to start using Freeness AI
            </p>

            {/* NAME */}

            <div
              className="
relative
"
            >
              <User
                size={17}
                className="
absolute
left-4
top-1/2
-translate-y-1/2

text-indigo-500
"
              />

              <input
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="
w-full
h-14

rounded-xl

bg-white

border
border-gray-200

pl-12

outline-none

focus:ring-2

focus:ring-indigo-400
"
              />
            </div>

            {/* EMAIL */}

            <div
              className="
relative
"
            >
              <Mail
                size={17}
                className="
absolute
left-4
top-1/2
-translate-y-1/2

text-indigo-500
"
              />

              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
w-full
h-14

rounded-xl

bg-white

border
border-gray-200

pl-12

outline-none

focus:ring-2

focus:ring-indigo-400
"
              />
            </div>

            {/* PASSWORD */}

            <div
              className="
relative
"
            >
              <Lock
                size={17}
                className="
absolute
left-4
top-1/2
-translate-y-1/2

text-indigo-500
"
              />

              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
w-full
h-14

rounded-xl

bg-white

border
border-gray-200

pl-12

pr-12

outline-none

focus:ring-2

focus:ring-indigo-400
"
              />

              <Eye
                onClick={() => setShow(!show)}
                className="
absolute
right-4
top-1/2

-translate-y-1/2

text-gray-400

cursor-pointer
"
              />
            </div>

            <label
              className="
flex
gap-2
items-center

text-sm
text-gray-500
"
            >
              <input type="checkbox" />I agree to terms and privacy policy
            </label>

            <button
              className="
h-14
w-full

rounded-xl

bg-gradient-to-r

from-[#5534FF]

to-[#6D4AFF]

text-white

font-semibold

flex
justify-center
items-center

gap-3

shadow-lg

shadow-indigo-500/30
"
            >
              Create Account
              <ArrowRight size={18} />
            </button>

            <p
              className="
text-center
text-sm
text-gray-500
"
            >
              Already have an account?
              <Link
                to="/"
                className="
text-indigo-600

font-semibold

ml-1
"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
