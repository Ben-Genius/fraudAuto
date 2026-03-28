import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Loader2, AlertCircle, Lock, CheckCircle2 } from "lucide-react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { Logo } from "../../components/ui/logo";
import { resetPassword } from "../../services/vinApi";

const ResetPassword = () => {
  useDocumentTitle("Reset Password");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({ newPassword: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError("Reset token is missing. Please use the link sent to your email.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError(null);
    setIsLoading(true);
    try {
      await resetPassword({ token, newPassword: formData.newPassword });
      setIsSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err: any) {
      setError(err?.message || "Failed to reset password. The link may have expired.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!token && !isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <Logo />
          <div className="mt-8 bg-white py-8 px-4 shadow-sm border border-gray-100 sm:rounded-2xl sm:px-10">
            <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-5">
              <AlertCircle size={24} className="text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Invalid Reset Link</h2>
            <p className="text-sm text-gray-500 mb-6">
              The password reset link is invalid or has expired. Please request a new one.
            </p>
            <Link
              to="/forgot-password"
              className="block w-full py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-[#FC612D] transition-colors"
            >
              Request new link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-4">
          <Logo />
        </div>
        
        {!isSuccess ? (
          <>
            <h2 className="text-center text-2xl font-bold text-gray-900">Set new password</h2>
            <p className="mt-2 text-center text-sm text-gray-500">
              Your new password must be different from previous passwords.
            </p>
          </>
        ) : (
          <>
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 size={24} className="text-emerald-500" />
            </div>
            <h2 className="text-center text-2xl font-bold text-gray-900">Password reset</h2>
            <p className="mt-2 text-center text-sm text-gray-500">
              Your password has been successfully reset. Redirecting to login...
            </p>
          </>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-gray-100 sm:rounded-2xl sm:px-10">
          {!isSuccess ? (
            <>
              {error && (
                <div className="mb-5 flex items-start gap-2.5 p-3.5 bg-red-50 rounded-xl border border-red-100">
                  <AlertCircle size={15} className="text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      id="newPassword" name="newPassword" type={showPassword ? "text" : "password"}
                      required value={formData.newPassword} onChange={handleChange}
                      className="input-field pl-10 pr-10" placeholder="Minimum 6 characters"
                    />
                    <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword" name="confirmPassword" type={showPassword ? "text" : "password"}
                      required value={formData.confirmPassword} onChange={handleChange}
                      className="input-field pl-10 pr-10" placeholder="Re-enter password"
                    />
                  </div>
                </div>

                <button
                  type="submit" disabled={isLoading}
                  className="w-full py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#FC612D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Reset password"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <Link
                to="/login"
                className="block w-full py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-[#FC612D] transition-colors"
              >
                Sign in now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
