import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { Eye, EyeOff, UserPlus, CheckCircle2 } from 'lucide-react';

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

    const perks = [
        'Access to 9+ premium courses',
        'Indian Rupee pricing',
        'Instant digital delivery',
    ];

    return (
        <div className="min-h-[85vh] flex items-center justify-center py-10 px-4">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl"
                    style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }}
                />
            </div>

            <div className="w-full max-w-md animate-fade-in-up relative">
                <div
                    className="rounded-3xl p-8"
                    style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.09)',
                        boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(20px)',
                    }}
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div
                            className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                            style={{
                                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                                boxShadow: '0 8px 30px rgba(139,92,246,0.4)',
                            }}
                        >
                            <UserPlus size={28} className="text-white" />
                        </div>
                        <h1
                            className="text-3xl font-extrabold text-white mb-1"
                            style={{ fontFamily: 'Outfit, sans-serif' }}
                        >
                            Join ShopApp
                        </h1>
                        <p className="text-gray-400 text-sm">Create your free account today</p>
                    </div>

                    {/* Perks */}
                    <div
                        className="rounded-xl p-4 mb-6 space-y-2"
                        style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)' }}
                    >
                        {perks.map((perk) => (
                            <div key={perk} className="flex items-center gap-2.5 text-sm text-gray-300">
                                <CheckCircle2 size={15} className="text-violet-400 flex-shrink-0" />
                                {perk}
                            </div>
                        ))}
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
                            <label className="block text-sm font-medium text-gray-300 mb-2">Choose Username</label>
                            <input
                                id="register-username"
                                type="text"
                                required
                                autoComplete="username"
                                className="input-field"
                                placeholder="e.g. john_doe"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Create Password</label>
                            <div className="relative">
                                <input
                                    id="register-password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    autoComplete="new-password"
                                    className="input-field pr-12"
                                    placeholder="Min. 6 characters"
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
                            id="register-submit"
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 mt-2"
                            style={loading ? {
                                background: 'rgba(139,92,246,0.3)',
                                cursor: 'not-allowed',
                            } : {
                                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                                boxShadow: '0 8px 30px rgba(139,92,246,0.4)',
                            }}
                            onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = 'translateY(-1px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
                        >
                            {loading ? (
                                <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            ) : (
                                <>
                                    <UserPlus size={18} />
                                    Create Account
                                </>
                            )}
                        </button>
                    </form>

                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-grow h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
                        <span className="text-gray-600 text-xs">OR</span>
                        <div className="flex-grow h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
                    </div>

                    <p className="text-center text-sm text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-violet-400 hover:text-violet-300 transition-colors">
                            Sign in instead →
                        </Link>
                    </p>
                </div>

                <p className="text-center text-xs text-gray-600 mt-6">
                    🔒 Your data is protected with end-to-end encryption
                </p>
            </div>
        </div>
    );
};

export default Register;
