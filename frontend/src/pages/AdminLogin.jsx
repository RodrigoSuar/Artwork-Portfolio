import { useState } from "react"
import loginService from '../services/login'
import adminService from '../services/admin'
import { Navigate } from "react-router-dom";

const AdminLogin = () => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [user,setUser] = useState(null)
    const [error,setError] = useState(false)
    
    const handleLogin = async (event) => {
        event.preventDefault()
        try{
            const admin = await loginService.login({username,password})
            window.localStorage.setItem(
                'loggedAdmin', JSON.stringify(admin)
            )
            adminService.setToken(admin.token)
            setUser(admin)
            setUsername('')
            setPassword('')
            return <Navigate to="/"/>
        } catch {
            setError(true)
            
            setTimeout(() => {
                setError(false)
            }, 5000)
        }
    }

    const errorMessage = () => (
        <div className="error">
            Incorect Username or Password
        </div>
    )

    return (
       <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
            <div>
                <label>
                    username
                    <input
                        type='text'
                        value={username}
                        onChange={({target}) => setUsername(target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    password
                    <input
                        type="password"
                        value={password}
                        onChange={({target}) => setPassword(target.value)}
                    />
                </label>
            </div>
            <button type="submin">login</button>
        </form>
        {error && errorMessage()}

        {user &&  <Navigate to="/admin"/>}
       </div>
    )
}

export default AdminLogin