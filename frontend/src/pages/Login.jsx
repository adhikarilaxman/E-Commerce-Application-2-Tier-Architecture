import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, Sparkles } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, user } = useAuth();
    const navigate = useNavigate();

    if (user) return <Navigate to="/products" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(username, password);
            navigate('/products');
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center py-10 px-4">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl"
                    style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
            </div>

            <div className="w-full max-w-md animate-fade-in-up relative">
                {/* Card */}
                <div
                    className="rounded-3xl p-8"
                    style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.09)',
                        boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(20px)',
                    }}
                >
                    {/* Logo Icon */}
                    <div className="text-center mb-8">
                        <div
                            className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 8px 30px rgba(99,102,241,0.4)' }}
                        >
                            <Sparkles size={28} className="text-white" />
                        </div>
                        <h1
                            className="text-3xl font-extrabold text-white mb-1"
                            style={{ fontFamily: 'Outfit, sans-serif' }}
                        >
                            Welcome Back
                        </h1>
                        <p className="text-gray-400 text-sm">Sign in to your ShopApp account</p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div
                            className="mb-5 px-4 py-3 rounded-xl text-sm text-rose-400 animate-fade-in"
                            style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.2)' }}
                        >
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                            <input
                                id="login-username"
                                type="text"
                                required
                                autoComplete="username"
                                className="input-field"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                            <div className="relative">
                                <input
                                    id="login-password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    autoComplete="current-password"
                                    className="input-field pr-12"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            id="login-submit"
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 mt-2"
                            style={loading ? {
                                background: 'rgba(99,102,241,0.3)',
                                cursor: 'not-allowed',
                            } : {
                                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                boxShadow: '0 8px 30px rgba(99,102,241,0.4)',
                            }}
                            onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = 'translateY(-1px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
                        >
                            {loading ? (
                                <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            ) : (
                                <>
                                    <LogIn size={18} />
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-grow h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
                        <span className="text-gray-600 text-xs">OR</span>
                        <div className="flex-grow h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
                    </div>

                    <p className="text-center text-sm text-gray-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-semibold text-brand-400 hover:text-brand-300 transition-colors">
                            Create one now →
                        </Link>
                    </p>
                </div>

                {/* Bottom note */}
                <p className="text-center text-xs text-gray-600 mt-6">
                    🔒 Your data is protected with end-to-end encryption
                </p>
            </div>
        </div>
    );
};

export default Login;
