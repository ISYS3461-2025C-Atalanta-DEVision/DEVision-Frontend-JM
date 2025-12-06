import React from 'react'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import useLoginForm from './hook/useLoginForm'

export default function LoginForm({
  loginFunction
}) {

  const {user, error, loading, login, handleInputChange, goToRegister} = useLoginForm(loginFunction)

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <form className="space-y-4" onSubmit={login}>
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        {user && (
          <div className="p-3 bg-green-100 text-green-700 rounded-lg">
            Login successful!
          </div>
        )}
        <div>
          <Input
            type="email"
            placeholder="Email"
            onChange={handleInputChange("email")}
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password"
            onChange={handleInputChange("password")}
          />
        </div>
        <div className="space-y-2">
          <Button type="submit" variant="primary">
            {loading ? "Signing in..." : "Login"}
          </Button>
          <Button type="button" variant="secondary" onClick={goToRegister}>
            Create Account
          </Button>
        </div>
      </form>
    </div>
  )
}