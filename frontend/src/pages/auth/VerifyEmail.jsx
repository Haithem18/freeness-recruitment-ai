import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";


export default function VerifyEmail(){

const navigate = useNavigate();

const [code,setCode] = useState("");

const email = localStorage.getItem("email");


const verify = async(e)=>{

e.preventDefault();


try{

await API.post(
"/auth/verify-email",
{
email,
code
}
);


alert(
"Email verified successfully"
);


navigate("/");


}catch(error){

alert(
error.response?.data?.message ||
"Verification failed"
);

}

};


return(

<form onSubmit={verify}>

<h2>
Verify your email
</h2>


<p>
Code sent to {email}
</p>


<input

value={code}

onChange={
e=>setCode(e.target.value)
}

placeholder="Enter verification code"

/>


<button>
Verify
</button>


</form>

);


}