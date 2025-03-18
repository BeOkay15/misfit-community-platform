import React from "react";
import clsx from "clsx"; // Optional for conditional classes

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={clsx("p-4 border rounded-lg shadow-md bg-white", className)}>
      {children}
    </div>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string; // ✅ Allow className prop
}

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
  return <div className={clsx("p-2", className)}>{children}</div>;
};

// ✅ Add a default export with a valid component
const Home = () => {
  return (
    <div className="p-10">
      <Card className="max-w-md mx-auto">
        <CardContent>
          <h1 className="text-xl font-bold">Welcome to Misfit Community!</h1>
          <p className="text-gray-600">This is a simple card component.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
