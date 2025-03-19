
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import type { AuthError, Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, UserPlus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AuthPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        checkIfAdmin(session.user.id);
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

  const checkIfAdmin = async (userId: string) => {
    try {
      // For admin email, directly navigate to admin
      const { data: userData } = await supabase.auth.getUser();
      if (userData?.user?.email === "philiprundu@gmail.com") {
        navigate("/admin");
        return;
      }
      
      // For other users, check the admin_users table
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (data) {
        navigate("/admin");
      } else {
        navigate("/galleries");
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
      navigate("/galleries");
    }
  };

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
        if (session?.user) {
          checkIfAdmin(session.user.id);
        }
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

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Sign in with the provided admin credentials
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // For the admin account, directly navigate to admin
      if (data.user?.email === "philiprundu@gmail.com") {
        toast({
          title: "Welcome Admin",
          description: "You have successfully logged in",
        });
        navigate("/admin");
        return;
      }

      // For other users, check admin privileges
      if (data.user) {
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', data.user.id)
          .single();
        
        if (adminError || !adminData) {
          toast({
            title: "Access Denied",
            description: "You don't have admin privileges",
            variant: "destructive",
          });
          // Don't sign them out, just redirect to galleries
          navigate("/galleries");
        } else {
          toast({
            title: "Welcome Admin",
            description: "You have successfully logged in",
          });
          navigate("/admin");
        }
      }
    } catch (error) {
      const authError = error as AuthError;
      setError(authError.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signUpPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email: signUpEmail,
        password: signUpPassword,
      });

      if (error) throw error;

      toast({
        title: "Account created",
        description: "You can now sign in with your credentials",
      });
      
      // Switch to login tab
      setIsSigningUp(false);
    } catch (error) {
      const authError = error as AuthError;
      setError(authError.message);
    } finally {
      setLoading(false);
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
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" onClick={() => setIsSigningUp(false)}>Login</TabsTrigger>
              <TabsTrigger value="register" onClick={() => setIsSigningUp(true)}>Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <div className="mb-6">
                <h2 className="text-xl font-medium mb-4 text-charcoal dark:text-offwhite">Admin Login</h2>
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Admin Email"
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Admin Password"
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gold hover:bg-gold/80 text-charcoal"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign in as Admin"}
                  </Button>
                </form>
              </div>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-charcoal/50 text-gray-500">Or continue with</span>
                </div>
              </div>

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
                showLinks={true}
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
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input
                      type="email"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      placeholder="Email address"
                      required
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input
                      type="password"
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      placeholder="Create password"
                      required
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                      required
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gold hover:bg-gold/80 text-charcoal"
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Create account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
