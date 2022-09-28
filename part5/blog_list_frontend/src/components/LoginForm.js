import { useState } from 'react'

const LoginForm = ({ token }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = (event) => {
        event.preventDefault()
        token(username, password)
        setUsername('')
        setPassword('')
    }
    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>username: </label><input id='username' type='text' name='Username' value={username} onChange={({ target }) => setUsername(target.value)} />
                </div><br/>
                <div>
                    <label>password: </label><input id='password' type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button id='loginSubmit' type='submit'>login</button>
            </form>
        </div>
    )
}
export default LoginForm