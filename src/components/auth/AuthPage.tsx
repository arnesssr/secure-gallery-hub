
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import type { AuthError, Session, User } from "@supabase/supabase-js";

const AuthPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate("/galleries");
      }
    });

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      handleAuthChange(event, session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleAuthChange = async (
    event: string,
    session: Session | null
  ) => {
    switch (event) {
      case "SIGNED_IN":
        toast({
          title: "Welcome back!",
          description: "Successfully signed in",
        });
        navigate("/galleries");
        break;
      case "SIGNED_OUT":
        setError("");
        break;
      case "SIGNED_UP":
        toast({
          title: "Account created",
          description: "Please check your email to confirm your account",
        });
        break;
      case "USER_UPDATED":
        toast({
          title: "Success",
          description: "Your account has been updated",
        });
        break;
      case "USER_DELETED":
        toast({
          title: "Account deleted",
          description: "Your account has been successfully deleted",
        });
        break;
      case "PASSWORD_RECOVERY":
        toast({
          title: "Password recovery",
          description: "Check your email for password reset instructions",
        });
        break;
    }
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
            view="sign_in"
            showLinks={false}
            localization={{
              variables: {
                sign_in: {
                  email_label: "Email address",
                  password_label: "Password",
                  email_input_placeholder: "Your email address",
                  password_input_placeholder: "Your password",
                  button_label: "Sign in",
                  loading_button_label: "Signing in...",
                },
                sign_up: {
                  email_label: "Email address",
                  password_label: "Create a password",
                  email_input_placeholder: "Your email address",
                  password_input_placeholder: "Create a password (min 6 chars)",
                  button_label: "Create account",
                  loading_button_label: "Creating account..."
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
