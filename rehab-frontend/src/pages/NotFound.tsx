import { Link } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-sage-200 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>404</div>
        <h1 className="text-3xl font-bold text-sage-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
          Page Not Found
        </h1>
        <p className="text-sage-500 mb-8">
          The page you're looking for doesn't exist. Let's get you back on the path to healing.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link to="/" className="btn-primary">
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <Link to="/contact" className="btn-secondary">
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
