import React from 'react';

interface CompanyPillProps {
  company_name: string;
  company_logo_url?: string;
  className?: string;
}

export const CompanyPill: React.FC<CompanyPillProps> = ({
  company_name,
  company_logo_url,
  className = '',
}) => {
  const [logoError, setLogoError] = React.useState(false);

  return (
    <div
      className={`inline-flex items-center bg-background rounded-md border border-input h-6 overflow-hidden ${className}`}
    >
      {company_logo_url && !logoError ? (
        <img
          src={company_logo_url}
          alt={company_name}
          className="w-6 h-6 object-cover flex-shrink-0"
          onError={() => setLogoError(true)}
        />
      ) : (
        <span className="w-6 h-6 flex-shrink-0 flex items-center justify-center text-[11px] leading-none text-muted-foreground font-semibold bg-muted">
          {company_name.charAt(0).toUpperCase()}.
        </span>
      )}
      <span className="text-sm font-medium text-foreground truncate px-2.5">{company_name}</span>
    </div>
  );
};
