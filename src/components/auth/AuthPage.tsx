
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

    // Set up error listener
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        const errorData = {
          message: error,
          code: ""
        };

        try {
          // Try to parse the error message if it's in JSON format
          const parsedError = JSON.parse(error);
          errorData.message = parsedError.message;
          errorData.code = parsedError.code;
        } catch {
          // If parsing fails, use the error string as is
          errorData.message = error;
        }

        // Handle specific error cases
        if (errorData.code === "weak_password") {
          setError("Password should be at least 6 characters long.");
        } else if (errorData.code === "invalid_credentials") {
          setError("Invalid email or password. Please try again.");
        } else if (error && error !== "") {
          setError(errorData.message || "An error occurred during authentication.");
        }
      }
    });

    return () => {
      subscription.unsubscribe();
      authListener.data.subscription.unsubscribe();
    };
  }, [navigate, error]);

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
              style: {
                container: {
                  width: '100%'
                },
                button: {
                  width: '100%',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: 500
                },
                input: {
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: 'white'
                },
                anchor: {
                  color: '#B8860B',
                  textDecoration: 'none'
                },
                message: {
                  color: '#991B1B',
                  fontSize: '0.875rem',
                  marginTop: '0.5rem'
                }
              }
            }}
            theme="default"
            providers={['google']}
            localization={{
              variables: {
                sign_up: {
                  password_placeholder: "Password (minimum 6 characters)",
                  email_label: "Email address",
                  password_label: "Create a password",
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
