import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, AlertCircle, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { Logo } from "../../components/ui/logo";
import { forgotPassword } from "../../services/vinApi";

const ForgotPassword = () => {
  useDocumentTitle("Forgot Password");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err?.message || "Failed to send reset link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-4">
          <Logo />
        </div>
        
        {!isSubmitted ? (
          <>
            <h2 className="text-center text-2xl font-bold text-gray-900">Forgot password?</h2>
            <p className="mt-2 text-center text-sm text-gray-500">
              No worries, we'll send you reset instructions.
            </p>
          </>
        ) : (
          <>
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 size={24} className="text-emerald-500" />
            </div>
            <h2 className="text-center text-2xl font-bold text-gray-900">Check your email</h2>
            <p className="mt-2 text-center text-sm text-gray-500">
              We've sent a password reset link to <span className="font-semibold text-gray-900">{email}</span>
            </p>
          </>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-gray-100 sm:rounded-2xl sm:px-10">
          {!isSubmitted ? (
            <>
              {error && (
                <div className="mb-5 flex items-start gap-2.5 p-3.5 bg-red-50 rounded-xl border border-red-100">
                  <AlertCircle size={15} className="text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      id="email" name="email" type="email" autoComplete="email" required
                      value={email} onChange={(e) => setEmail(e.target.value)}
                      className="input-field pl-10" placeholder="Enter your email"
                    />
                  </div>
                </div>

                <button
                  type="submit" disabled={isLoading}
                  className="w-full py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#FC612D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Send reset link"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-6">
                Didn't receive the email? Check your spam folder or try again with a different email address.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-[#FC612D] transition-colors"
              >
                Try another email
              </button>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link to="/login" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              <ArrowLeft size={14} />
              Back to log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
