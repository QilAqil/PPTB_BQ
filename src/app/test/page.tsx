export default function TestPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-8">
          Test Page - Tailwind CSS
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-card-foreground mb-4">
              Card Component
            </h2>
            <p className="text-muted-foreground">
              This is a test card to verify that Tailwind CSS styling is working.
            </p>
          </div>
          
          <div className="bg-primary p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-primary-foreground mb-4">
              Primary Card
            </h2>
            <p className="text-primary-foreground/80">
              This card uses primary colors to test the color system.
            </p>
          </div>
          
          <div className="bg-secondary p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-secondary-foreground mb-4">
              Secondary Card
            </h2>
            <p className="text-secondary-foreground/80">
              This card uses secondary colors.
            </p>
          </div>
          
          <div className="bg-muted p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
              Muted Card
            </h2>
            <p className="text-muted-foreground">
              This card uses muted colors.
            </p>
          </div>
        </div>
        
        <div className="mt-8 space-y-4">
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
            Primary Button
          </button>
          <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80 ml-4">
            Secondary Button
          </button>
          <button className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md hover:bg-destructive/90 ml-4">
            Destructive Button
          </button>
        </div>
      </div>
    </div>
  );
} 