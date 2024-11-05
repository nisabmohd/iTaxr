import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, Building, Lock } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8 text-center grid">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Register to Taxpage
          </h2>
          <p className="mb-6 mt-2 text-muted-foreground text-sm">
            Enter details to register account
          </p>
          <form className="space-y-4 my-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  className="w-full pl-11 h-12"
                  required
                />
              </div>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  type="text"
                  name="middlename"
                  placeholder="Middle Name"
                  className="w-full pl-11 h-12"
                />
              </div>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  className="w-full pl-11 h-12"
                  required
                />
              </div>
            </div>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full pl-11 h-12"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="w-full pl-11 h-12"
                  required
                />
              </div>
              <div className="relative">
                <Building
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  type="tel"
                  name="office"
                  placeholder="Office Number"
                  className="w-full pl-11 h-12"
                />
              </div>
            </div>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full pl-11 h-12"
                required
              />
            </div>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                type="password"
                name="cpassword"
                placeholder="Confirm Password"
                className="w-full pl-11 h-12"
                required
              />
            </div>
            <Button type="submit" size="lg" className="w-full">
              Register
            </Button>
          </form>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <div className="text-center">
            <Link
              href="/login"
              className={buttonVariants({
                variant: "link",
                className: "mx-0 px-0",
              })}
            >
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
