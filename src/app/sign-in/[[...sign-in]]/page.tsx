import { SignIn } from "@clerk/nextjs";
import "../../globals.css"

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        appearance={{
          elements: {
            card: "custom-signin-card",
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
  );
}