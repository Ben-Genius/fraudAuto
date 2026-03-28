import { useEffect, useState, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, XCircle, Loader2, Mail } from "lucide-react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { verifyEmail } from "../../services/vinApi";
import { Logo } from "../../components/ui/logo";

type Status = "loading" | "success" | "error" | "missing";

const VerifyEmail = () => {
  useDocumentTitle("Verify Email");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<Status>(token ? "loading" : "missing");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const isVerifying = useRef(false);

  useEffect(() => {
    if (!token || isVerifying.current) return;
    
    isVerifying.current = true;
    verifyEmail(token)
      .then(() => setStatus("success"))
      .catch((err: any) => {
        setErrorMsg(err?.message || "Verification failed. The link may have expired.");
        setStatus("error");
      });
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="mb-8">
        <Logo />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 max-w-md w-full text-center">
        {status === "loading" && (
          <>
            <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-5">
              <Loader2 size={24} className="text-gray-400 animate-spin" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Verifying your email</h2>
            <p className="text-sm text-gray-400">Just a moment…</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 size={24} className="text-emerald-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Email verified</h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-7">
              Your account is now active. Sign in to start running vehicle history reports.
            </p>
            <Link
              to="/login"
              className="block w-full py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-[#FC612D] transition-colors"
            >
              Sign in
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-5">
              <XCircle size={24} className="text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Verification failed</h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-7">
              {errorMsg}
            </p>
            <Link
              to="/register"
              className="block w-full py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-[#FC612D] transition-colors mb-3"
            >
              Register again
            </Link>
            <Link to="/login" className="text-sm text-gray-400 hover:text-gray-700">
              Already verified? Sign in
            </Link>
          </>
        )}

        {status === "missing" && (
          <>
            <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mx-auto mb-5">
              <Mail size={24} className="text-orange-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">No token provided</h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-7">
              This link is invalid or incomplete. Check your email for the correct verification link.
            </p>
            <Link
              to="/login"
              className="block w-full py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-[#FC612D] transition-colors"
            >
              Go to Sign In
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
