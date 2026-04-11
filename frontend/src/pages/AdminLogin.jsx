import { useState } from "react"
import loginService from '../services/login'
import adminService from '../services/admin'
import { Navigate } from "react-router-dom"
import './AdminLogin.css'

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
            return <Navigate to="/admin"/>
        } catch {
            setError(true)
            
            setTimeout(() => {
                setError(false)
            }, 5000)
        }
    }

    const errorMessage = () => (
        <div className="error">
            Incorrect Username or Password
        </div>
    )

    return (
       <div className="form-container">
        <h2>Admin Login</h2>
        <p>
            Access your admin dashboard
        </p>
        
        {error && errorMessage()}
        
        <form onSubmit={handleLogin}>
            <div className="form-group">
                <label>Username</label>
                <input
                    type='text'
                    name="username"
                    value={username}
                    onChange={({target}) => setUsername(target.value)}
                    placeholder="Enter your username"
                    required
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={({target}) => setPassword(target.value)}
                    placeholder="Enter your password"
                    required
                />
            </div>
            <button type="submit" style={{ width: "100%", padding: "0.875rem" }}>Login</button>
        </form>

        {user &&  <Navigate to="/admin"/>}
       </div>
    )
}

export default AdminLogin