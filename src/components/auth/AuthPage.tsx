import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AuthError } from "@supabase/supabase-js";

const AuthPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        navigate("/galleries");
      }
      if (event === 'SIGNED_OUT') {
        setError(""); // Clear any errors on sign out
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleError = (error: AuthError) => {
    const errorMessage = error.message || "An error occurred during authentication";
    setError(errorMessage);
  };

  return (
    <div className="min-h-screen bg-offwhite dark:bg-charcoal flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-playfair text-charcoal dark:text-offwhite mb-2">
            Welcome Back
          </h1>
          <p className="text-charcoal/80 dark:text-offwhite/80">
            Sign in to access your private galleries
          </p>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="bg-white dark:bg-charcoal/50 p-8 rounded-lg shadow-sm">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#B8860B',
                    brandAccent: '#9A7209',
                  },
                },
              },
              className: {
                container: 'auth-container',
                button: 'auth-button',
                input: 'auth-input',
              },
            }}
            theme="default"
            providers={['google']}
          />
        </div>
      </div>

      <style jsx global>{`
        .auth-container {
          width: 100%;
        }
        .auth-button {
          width: 100%;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 500;
        }
        .auth-input {
          width: 100%;
          padding: 8px 12px;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
          background-color: white;
        }
        .dark .auth-input {
          background-color: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
          color: white;
        }
      `}</style>
    </div>
  );
};

export default AuthPage;