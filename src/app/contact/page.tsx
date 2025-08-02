import React from "react";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-8">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-xl text-center">
        If you have any questions, feedback, or need support, please reach out to us using the form below or email us at <a href="mailto:info@example.com" className="text-blue-600 underline">info@example.com</a>.
      </p>
      {/* You can add a contact form here if needed */}
    </div>
  );
} 