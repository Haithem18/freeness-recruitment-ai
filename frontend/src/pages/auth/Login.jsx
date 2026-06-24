import {useState} from "react";
import {Link,useNavigate} from "react-router-dom";

import API from "../../services/api";

import {
 Mail,
 Lock,
 Eye,
 ArrowRight
} from "lucide-react";

import {
 FaShieldHalved,
 FaBolt,
 FaRocket,
 FaUsers,
 FaGoogle,
 FaLinkedinIn,
 FaCheck
} from "react-icons/fa6";


export default function Login(){


const navigate=useNavigate();

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [show,setShow]=useState(false);



const submit=async(e)=>{

e.preventDefault();

try{

const res=await API.post(
"/auth/login",
{
email,
password
}
);


localStorage.setItem(
"token",
res.data.token
);


navigate("/candidate/dashboard");


}catch(err){

alert(
err.response?.data?.message ||
"Login failed"
)

}

}



return(

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



{/* background blur */}

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





{/* LEFT */}

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

{
Array.from({length:25}).map((_,i)=>(

<span
key={i}
className="
w-[3px]
h-[3px]
bg-indigo-400
rounded-full
"
/>

))
}

</div>






{/* logo */}

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
Welcome Back
</h1>


<p
className="
text-gray-500
mt-2
"
>
Sign in to continue your journey
with

<span
className="
text-indigo-600
font-semibold
"
>
 Freeness
</span>

</p>







{/* shield area */}


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
>




</div>





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

<FaShieldHalved
size={80}
className="text-indigo-600"
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

<FaCheck/>

</div>







<div
className="
absolute
left-5
top-28

bg-white

rounded-xl

shadow-lg

p-4
"
>

<FaUsers
className="text-indigo-600"
/>


</div>





<div
className="
absolute
right-0
bottom-40

bg-white

rounded-xl

shadow-lg

px-4
py-3
"
>

<div
className="
flex
items-center
gap-2
"
>

<FaShieldHalved
className="text-indigo-600"
/>


<span
className="
text-xs
font-semibold
"
>
Secure
</span>

</div>


</div>




</div>









{/* pills */}

<div
className="
flex
gap-3
"
>


{
[
[FaShieldHalved,"Secure"],
[FaBolt,"Smart"],
[FaRocket,"Fast"],
[FaUsers,"Made for opportunities"]

].map(([I,t])=>(

<div
key={t}
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

<I
className="text-indigo-600"
/>

{t}


</div>

))
}


</div>



</div>


</div>









{/* RIGHT */}


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



<div
className="relative"
>

<Mail
className="
absolute
left-4
top-1/2
-translate-y-1/2
text-indigo-500
"
size={17}
/>


<input

placeholder="Email address"

value={email}

onChange={
e=>setEmail(e.target.value)
}

className="
w-full
h-14
rounded-xl
bg-white
border
border-gray-200
pl-12
text-sm
outline-none
focus:ring-2
focus:ring-indigo-400
"

/>


</div>






<div
className="relative"
>


<Lock
className="
absolute
left-4
top-1/2
-translate-y-1/2
text-indigo-500
"
size={17}
/>


<input

type={
show?
"text":
"password"
}

placeholder="Password"

value={password}

onChange={
e=>setPassword(e.target.value)
}


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
"

/>


<Eye
onClick={()=>setShow(!show)}
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






<div
className="
flex
justify-between
text-xs
"
>


<label
className="
flex
gap-2
items-center
text-gray-500
"
>

<input type="checkbox"/>

Remember me

</label>



<span
className="
text-indigo-600
"
>
Forgot password?
</span>


</div>







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

Login

<ArrowRight size={18}/>


</button>







<div
className="
flex
items-center
gap-3
"
>

<div
className="h-px bg-gray-200 flex-1"
/>

<span
className="
text-xs
text-gray-400
"
>
Or continue with
</span>

<div
className="h-px bg-gray-200 flex-1"
/>


</div>







<div
className="
grid
grid-cols-2
gap-4
"
>


<button
type="button"
className="
h-12
border
rounded-xl
flex
justify-center
items-center
gap-2
text-sm
"
>

<FaGoogle className="text-red-500"/>

Google

</button>


<button
type="button"
className="
h-12
border
rounded-xl
flex
justify-center
items-center
gap-2
text-sm
"
>

<FaLinkedinIn className="text-blue-600"/>

LinkedIn

</button>


</div>






<p
className="
text-center
text-sm
text-gray-500
"
>

Don't have an account?

<Link
to="/register"
className="
text-indigo-600
font-semibold
ml-1
"
>
Sign up
</Link>


</p>


</form>


</div>


</div>



</div>


)

}