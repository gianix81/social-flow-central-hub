
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <h2 className="text-2xl font-medium mt-4">Pagina Non Trovata</h2>
      <p className="text-gray-500 mt-2 max-w-md">
        La pagina che stai cercando non esiste o è stata spostata.
      </p>
      <Button asChild className="mt-8">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Torna alla Dashboard
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
