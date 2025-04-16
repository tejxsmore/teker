import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return  <div className="flex min-h-screen items-center justify-center">
        <SignUp 
            path="/sign-up" 
            routing="path" 
            signInUrl="/sign-in" 
            appearance={{
                elements: {
                  card: "custom-signup-card",
                  headerTitle: "custom-header-title",
                  formFieldInput: "custom-input",
                  formButtonPrimary: "custom-submit-button",
                  footerActionLink: "custom-footer-link",
                }, 
                variables: {
                  fontFamily: '"Geist Sans", sans-serif',
                },
            }}
        />
    </div>
}