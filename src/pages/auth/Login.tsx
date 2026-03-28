import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { Logo } from "../../components/ui/logo";
import { login } from "../../services/vinApi";

const Login = () => {
  useDocumentTitle("Login");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan");
  const vin = searchParams.get("vin");

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await login({ email: formData.email, password: formData.password });
      // Redirect back to vehicle history if coming from plan selection
      if (vin) {
        navigate(`/dashboard?vin=${vin}`);
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err?.message || "Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const registerHref = `/register${plan ? `?plan=${plan}${vin ? `&vin=${vin}` : ""}` : ""}`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-4">
          <Logo />
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-900">Sign in to your account</h2>
        {plan && (
          <p className="mt-1 text-center text-sm text-[#FC612D] font-medium">
            Sign in to apply your {plan === "deluxe" ? "Deluxe (2 credits)" : "Standard (1 credit)"} report
          </p>
        )}
        <p className="mt-2 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to={registerHref} className="font-medium text-[#FC612D] hover:underline">
            Sign up
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-gray-100 sm:rounded-2xl sm:px-10">
          {error && (
            <div className="mb-5 flex items-start gap-2.5 p-3.5 bg-red-50 rounded-xl border border-red-100">
              <AlertCircle size={15} className="text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input
                id="email" name="email" type="email" autoComplete="email" required
                value={formData.email} onChange={handleChange}
                className="input-field" placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  id="password" name="password" type={showPassword ? "text" : "password"}
                  autoComplete="current-password" required
                  value={formData.password} onChange={handleChange}
                  className="input-field pr-10" placeholder="Enter your password"
                />
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 accent-[#FC612D] border-gray-300 rounded" />
                <label htmlFor="remember-me" className="text-sm text-gray-600">Remember me</label>
              </div>
              <Link to="/forgot-password" className="text-sm text-[#FC612D] hover:underline">Forgot password?</Link>
            </div>

            <button
              type="submit" disabled={isLoading}
              className="w-full py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#FC612D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
