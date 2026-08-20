import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register, user } = useAuth();
    const navigate = useNavigate();

    if (user) return <Navigate to="/products" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await register(username, password);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-white mb-1">Create an account</h1>
                    <p className="text-sm text-gray-500">Start learning today</p>
                </div>

                {error && (
                    <div className="mb-5 px-4 py-3 rounded-lg text-sm text-red-400 bg-red-500/10 border border-red-500/20">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="register-username" className="block text-sm font-medium text-gray-400 mb-1.5">
                            Username
                        </label>
                        <input
                            id="register-username"
                            type="text"
                            required
                            autoComplete="username"
                            autoFocus
                            className="input-field"
                            placeholder="e.g. john_doe"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="register-password" className="block text-sm font-medium text-gray-400 mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="register-password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                autoComplete="new-password"
                                className="input-field pr-10"
                                placeholder="Min. 6 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <button
                        id="register-submit"
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full mt-2"
                    >
                        {loading
                            ? <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Creating account…</>
                            : 'Create account'
                        }
                    </button>
                </form>

                <p className="text-sm text-gray-500 text-center mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
