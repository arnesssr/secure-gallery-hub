import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AuthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/galleries");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

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
        <div className="bg-white dark:bg-charcoal/50 p-8 rounded-lg shadow-sm">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: 'default' as const,
              variables: {
                default: {
                  colors: {
                    brand: '#B8860B',
                    brandAccent: '#9A7209',
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;