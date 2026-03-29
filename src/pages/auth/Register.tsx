import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { Logo } from "../../components/ui/logo";
import { register } from "../../services/vinApi";

const Register = () => {
  useDocumentTitle("Register");
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan");
  const vin = searchParams.get("vin");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!formData.agreeToTerms) {
      setError("Please agree to the terms and conditions.");
      return;
    }

    setIsLoading(true);
    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  // Build login link preserving plan/vin context
  const loginHref = `/login${plan ? `?plan=${plan}${vin ? `&vin=${vin}` : ""}` : ""}`;

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-10 max-w-md w-full text-center shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={24} className="text-emerald-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Check your email</h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            We sent a verification link to <span className="font-semibold text-gray-800">{formData.email}</span>.
            Click the link to activate your account, then sign in.
          </p>
          {plan && (
            <p className="text-xs text-gray-400 mb-5">
              After signing in, your <span className="font-semibold capitalize">{plan}</span> report credit will be applied.
            </p>
          )}
          <Link
            to={loginHref}
            className="block w-full py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl text-center hover:bg-gray-700 transition-colors"
          >
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-7xl">
        <div className="flex justify-center mb-4">
          <Logo />
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Create your account
        </h2>
        {plan && (
          <p className="mt-1 text-center text-sm text-[#FC612D] font-medium">
            {plan === "deluxe" ? "2 report credits" : "1 report credit"} · GHC {plan === "deluxe" ? "120" : "50"}
          </p>
        )}
        <p className="mt-2 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to={loginHref} className="font-medium text-[#FC612D] hover:underline">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="bg-white py-8 px-4 shadow-sm border border-gray-100 sm:rounded-2xl sm:px-10">
          {error && (
            <div className="mb-5 flex items-start gap-2.5 p-3.5 bg-red-50 rounded-xl border border-red-100">
              <AlertCircle size={15} className="text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                <input
                  id="firstName" name="firstName" type="text" required
                  value={formData.firstName} onChange={handleChange}
                  className="input-field" placeholder="First name"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                <input
                  id="lastName" name="lastName" type="text" required
                  value={formData.lastName} onChange={handleChange}
                  className="input-field" placeholder="Last name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input
                id="email" name="email" type="email" autoComplete="email" required
                value={formData.email} onChange={handleChange}
                className="input-field" placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
              <input
                id="phone" name="phone" type="tel" required
                value={formData.phone} onChange={handleChange}
                className="input-field" placeholder="+234 800 000 0000"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    id="password" name="password" type={showPassword ? "text" : "password"} required
                    value={formData.password} onChange={handleChange}
                    className="input-field pr-10" placeholder="Create a password"
                  />
                  <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm password</label>
                <div className="relative">
                  <input
                    id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} required
                    value={formData.confirmPassword} onChange={handleChange}
                    className="input-field pr-10" placeholder="Confirm your password"
                  />
                  <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input
                id="agreeToTerms" name="agreeToTerms" type="checkbox" required
                checked={formData.agreeToTerms} onChange={handleChange}
                className="mt-0.5 h-4 w-4 accent-[#FC612D] border-gray-300 rounded"
              />
              <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-[#FC612D] hover:underline">Terms and Conditions</a>
                {" "}and{" "}
                <a href="#" className="text-[#FC612D] hover:underline">Privacy Policy</a>
              </label>
            </div>

            <button
              type="submit" disabled={isLoading}
              className="w-full py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#FC612D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
