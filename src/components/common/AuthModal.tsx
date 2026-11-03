import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, loginWithGoogle, loading } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      await login(email, name);
      onClose();
    }
  };

  const handleGoogleSignIn = async () => {
    await loginWithGoogle();
    onClose();
  };

  const handleDemoSignIn = async (roleName: string, roleEmail: string) => {
    await login(roleEmail, roleName);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-sand p-6 sm:p-8 z-10 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-taupe-dark hover:text-charcoal-900 rounded-full hover:bg-sand/40 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Brand Header */}
        <div className="text-center mb-6">
          <span className="font-serif text-2xl tracking-widest text-charcoal-900 block">
            AURA <span className="text-gold font-light">&</span> ATELIER
          </span>
          <p className="text-xs text-taupe-dark mt-1">
            {isSignUp ? 'Create your personalized fashion atelier account' : 'Sign in to access your saved looks and mood preferences'}
          </p>
        </div>

        {/* Google Authentication */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-xl border border-sand-dark bg-white hover:bg-sand-light text-charcoal-800 text-xs font-semibold tracking-wider transition-colors flex items-center justify-center gap-3 shadow-subtle mb-4"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.15z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.98 0 12c0 2.02.45 3.84 1.24 5.42l4.04-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-sand" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-taupe-dark">
            <span className="bg-white px-2">or with email</span>
          </div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {isSignUp && (
            <div>
              <label className="block text-[11px] font-semibold text-charcoal-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Eleanor Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-ivory-50 border border-sand rounded-xl text-xs text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-charcoal-900"
                />
                <User className="w-4 h-4 text-taupe-dark absolute left-3 top-2.5" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-charcoal-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="eleanor@atelier.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-ivory-50 border border-sand rounded-xl text-xs text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-charcoal-900"
              />
              <Mail className="w-4 h-4 text-taupe-dark absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-charcoal-700 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-ivory-50 border border-sand rounded-xl text-xs text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-charcoal-900"
              />
              <Lock className="w-4 h-4 text-taupe-dark absolute left-3 top-2.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 mt-2 shadow-soft"
          >
            <span>{isSignUp ? 'Create Account' : 'Sign In to Atelier'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 1-Click Test Presets */}
        <div className="mt-5 p-3 rounded-xl bg-sand/40 border border-sand text-left">
          <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal-800 block mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-gold" />
            Instant Demo Account (1-Click)
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleDemoSignIn('Eleanor Vance', 'eleanor.vance@atelier.com')}
              className="flex-1 py-1.5 px-2 bg-white rounded-lg border border-sand text-[10px] font-medium text-charcoal-800 hover:bg-charcoal-900 hover:text-white transition-colors"
            >
              Sign In as Eleanor
            </button>
            <button
              type="button"
              onClick={() => handleDemoSignIn('Julian March', 'julian.march@atelier.com')}
              className="flex-1 py-1.5 px-2 bg-white rounded-lg border border-sand text-[10px] font-medium text-charcoal-800 hover:bg-charcoal-900 hover:text-white transition-colors"
            >
              Sign In as Julian
            </button>
          </div>
        </div>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-taupe-dark hover:text-charcoal-900 transition-colors underline"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

