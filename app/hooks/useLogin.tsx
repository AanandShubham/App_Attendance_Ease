import { useState } from "react";

const useLogin = () => {
    const [loading,setLoading] = useState(false)
    
  const login = (username: string, password: string) => {
    // Implement login logic here
    console.log(`Logging in with username: ${username} and password: ${password}`);
  }

  return { login };
}

export default useLogin