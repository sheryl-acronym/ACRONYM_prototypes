import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Briefcase,
  Mail,
  User,
  PanelLeft,
  MoreHorizontal,
  Calendar,
} from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Contact } from '@/components/ContactsPage';
import { PersonaPill } from '@/components/PersonaPill';
import { CompanyPill } from '@/components/CompanyPill';
import { DatePill } from '@/components/DatePill';

interface ContactDetailPageProps {
  contact: Contact;
  hideTopBar?: boolean;
}

// LinkedIn Icon Component (filled square with rounded corners)
const LinkedInIcon: React.FC<{ className?: string }> = ({ className = 'h-4 w-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20 2H4C2.9 2 2 2.9 2 4V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V4C22 2.9 21.1 2 20 2ZM8 19H5V9H8V19ZM6.5 7.5C5.4 7.5 4.5 6.6 4.5 5.5C4.5 4.4 5.4 3.5 6.5 3.5C7.6 3.5 8.5 4.4 8.5 5.5C8.5 6.6 7.6 7.5 6.5 7.5ZM19 19H16V13.5C16 12 15.4 11 14 11C13 11 12.4 11.6 12.2 12.2C12.1 12.4 12 12.7 12 13V19H9C9 19 9 10 9 9H12V10.5C12.4 9.8 13.5 8.7 15.4 8.7C18 8.7 19 10.5 19 13V19Z" />
  </svg>
);

const TopBar: React.FC<{ contactName: string }> = ({ contactName }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/contacts');
                }}
              >
                Contacts
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{contactName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const ContactHeader: React.FC<{ contactName: string; buyerPersona?: string | null }> = ({
  contactName,
  buyerPersona,
}) => (
  <div className="mb-6">
    {buyerPersona && (
      <div className="mb-2">
        <PersonaPill persona={buyerPersona} />
      </div>
    )}
    <h1 className="text-2xl font-bold text-foreground">{contactName}</h1>
  </div>
);

const MetadataRows: React.FC<{ contact: Contact }> = ({
  contact,
}) => {
  return (
    <>
      {/* Personal markers - full width */}
      {contact.personal_markers && contact.personal_markers.length > 0 && (
        <>
          <div className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Personal markers</h3>
            <ul className="text-sm text-foreground space-y-1">
              {contact.personal_markers.map((marker, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-muted-foreground">•</span>
                  <span>{marker}</span>
                </li>
              ))}
            </ul>
          </div>
          <Separator className="mb-6" />
        </>
      )}

      {/* Two-column layout: field names on left, values on right (left-aligned) */}
      <div className="space-y-3">
        {/* Company */}
        {contact.company && (
          <div className="grid grid-cols-[130px_1fr] gap-6">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Company</span>
            </div>
            <div className="flex items-center">
              <CompanyPill company_name={contact.company} />
            </div>
          </div>
        )}

        {/* Job title */}
        {contact.job_title && (
          <div className="grid grid-cols-[130px_1fr] gap-6">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Job title</span>
            </div>
            <p className="text-sm text-foreground">{contact.job_title}</p>
          </div>
        )}

        {/* Reports to */}
        {contact.reports_to && (
          <div className="grid grid-cols-[130px_1fr] gap-6">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Reports to</span>
            </div>
            <p className="text-sm text-foreground">{contact.reports_to}</p>
          </div>
        )}

        {/* Last meeting */}
        {contact.last_meeting && (
          <div className="grid grid-cols-[130px_1fr] gap-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Last meeting</span>
            </div>
            <div className="flex items-center">
              <DatePill date={contact.last_meeting} />
            </div>
          </div>
        )}

        {/* Email */}
        {contact.email && (
          <div className="grid grid-cols-[130px_1fr] gap-6">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Email</span>
            </div>
            <a
              href={`mailto:${contact.email}`}
              className="text-sm text-foreground underline decoration-dotted hover:decoration-solid"
            >
              {contact.email}
            </a>
          </div>
        )}

        {/* LinkedIn */}
        {contact.linkedin_url && (
          <div className="grid grid-cols-[130px_1fr] gap-6">
            <div className="flex items-center gap-2">
              <LinkedInIcon className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium text-muted-foreground">LinkedIn</span>
            </div>
            <a
              href={contact.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground underline decoration-dotted hover:decoration-solid"
            >
              {contact.linkedin_url}
            </a>
          </div>
        )}
      </div>
    </>
  );
};


export const ContactDetailPage: React.FC<ContactDetailPageProps> = ({
  contact,
  hideTopBar = false,
}) => {
  if (hideTopBar) {
    return (
      <div className="flex flex-col h-full overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-4 w-full">
            <ContactHeader
              contactName={contact.name}
              buyerPersona={contact.buyer_persona}
            />

            <MetadataRows contact={contact} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 h-screen relative bg-sidebar overflow-hidden">
      {/* Main content area */}
      <div className="flex-1 min-w-0 bg-white flex flex-col m-3 rounded-lg shadow-md overflow-hidden">
        {/* Full-width header - sticky */}
        <div className="z-20 bg-white h-[50px] flex items-center px-3 gap-2 border-b border-slate-200 flex-shrink-0">
          <SidebarTrigger className="h-8 w-8 p-1.5 hover:bg-slate-100 rounded transition-colors">
            <PanelLeft className="h-4 w-4" />
          </SidebarTrigger>
          <div className="flex-1 flex items-center">
            <TopBar contactName={contact.name} />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[720px] mx-auto px-8 pt-8 pb-24 w-full">
            <ContactHeader
              contactName={contact.name}
              buyerPersona={contact.buyer_persona}
            />

            <MetadataRows contact={contact} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailPage;
