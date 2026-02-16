import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AttendeeHoverCard } from '@/components/AttendeeHoverCard';
import { ContactPill } from '@/components/ContactPill';
import { DatePill } from '@/components/DatePill';
import { MomentumPill } from '@/components/MomentumPill';
import { StagePill } from '@/components/StagePill';
import { CompanyPill } from '@/components/CompanyPill';
import { BookOpen } from 'lucide-react';

export default function ComponentsPage() {
  return (
    <div className="space-y-8 p-8 bg-background">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Components</h1>
        <p className="text-muted-foreground">Custom components built for ACRONYM</p>
      </div>

      {/* Custom Components */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Custom Components</h2>
          <p className="text-sm text-muted-foreground mb-4">Reusable components built for ACRONYM</p>
        </div>

        {/* AttendeeHoverCard */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">AttendeeHoverCard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Popover card that displays attendee information on hover. Shows name, email, role, buyer persona, and color-coded tags (Champion, Economic Buyer, etc.).</p>
            <div className="bg-muted p-6 rounded-md border border-input space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-3">Example with Champion tag:</p>
                <AttendeeHoverCard
                  name="Sarah Johnson"
                  email="sarah@company.com"
                  role="VP of Sales"
                  persona="Operational Decision Maker"
                  linkedin_url="https://linkedin.com"
                  tags={['Champion']}
                />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-3">Example with Economic Buyer tag:</p>
                <AttendeeHoverCard
                  name="Mike Chen"
                  email="mike@company.com"
                  role="CFO"
                  persona="Financial Decision Maker"
                  linkedin_url="https://linkedin.com"
                  tags={['Economic Buyer']}
                />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-3">Example with multiple tags:</p>
                <AttendeeHoverCard
                  name="Emily Rodriguez"
                  email="emily@company.com"
                  role="Director of Operations"
                  persona="Process Optimizer"
                  linkedin_url="https://linkedin.com"
                  tags={['Champion', 'Economic Buyer']}
                />
              </div>
            </div>
            <div className="pt-2">
              <p className="text-xs font-medium text-muted-foreground">Usage:</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-md text-xs overflow-x-auto mt-2">
{`<AttendeeHoverCard
  name="John Smith"
  email="john@company.com"
  role="VP of Sales"
  persona="Strategic Decision Maker"
  linkedin_url="https://linkedin.com/..."
  tags={['Champion', 'Economic Buyer']}
/>`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* ContactPill */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">ContactPill</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">A compact rectangular pill that displays a contact's name with a user icon. Used in meeting and deal lists to show attendees and team members.</p>
            <div className="bg-muted p-6 rounded-md border border-input space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-3">Example contact pills (24px height):</p>
                <div className="flex flex-wrap gap-2">
                  <ContactPill name="Claire Stachniewski" />
                  <ContactPill name="Alice Wong" />
                  <ContactPill name="James Park" />
                  <ContactPill name="Sarah Johnson" />
                </div>
              </div>
            </div>
            <div className="pt-2">
              <p className="text-xs font-medium text-muted-foreground">Usage:</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-md text-xs overflow-x-auto mt-2">
{`<ContactPill name="Claire Stachniewski" />`}
              </pre>
            </div>
            <div className="pt-2">
              <p className="text-xs font-medium text-muted-foreground">Used in:</p>
              <ul className="text-xs text-muted-foreground mt-2 space-y-1 ml-4">
                <li>• UpcomingMeetingsPage.tsx (lines 357-367)</li>
                <li>• PastMeetingsPage.tsx (similar usage)</li>
                <li>• DealsPage.tsx (similar usage)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* CompanyPill */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">CompanyPill</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">A rectangular pill that displays a company logo on the left with the company name. The logo runs edge-to-edge with a fallback to the first letter initial if unavailable.</p>
            <div className="bg-muted p-6 rounded-md border border-input space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-3">Example company pills (24px height):</p>
                <div className="flex flex-wrap gap-2">
                  <CompanyPill
                    company_name="Oura"
                    company_logo_url="/oura.png"
                  />
                  <CompanyPill
                    company_name="Casper"
                    company_logo_url="/casper.png"
                  />
                  <CompanyPill
                    company_name="Lulu's"
                    company_logo_url="/lulus.png"
                  />
                  <CompanyPill
                    company_name="Vuori"
                    company_logo_url="/vuori.png"
                  />
                </div>
              </div>
            </div>
            <div className="pt-2">
              <p className="text-xs font-medium text-muted-foreground">Usage:</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-md text-xs overflow-x-auto mt-2">
{`<CompanyPill
  company_name="Acme Corp"
  company_logo_url="https://logo.clearbit.com/acme.com"
/>`}
              </pre>
            </div>
            <div className="pt-2">
              <p className="text-xs font-medium text-muted-foreground">Features:</p>
              <ul className="text-xs text-muted-foreground mt-2 space-y-1 ml-4">
                <li>• Logo on the left (24x24px) runs edge-to-edge</li>
                <li>• Standard-height pill (24px) with company name</li>
                <li>• Falls back to first letter initial if logo unavailable</li>
                <li>• Automatic error handling for broken logo URLs</li>
                <li>• Text truncation for long company names</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* DatePill */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">DatePill</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">A compact rectangular pill that displays a date with a calendar icon. Matches the ContactPill styling for consistent visual design across list pages.</p>
            <div className="bg-muted p-6 rounded-md border border-input space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-3">Example date pills (24px height):</p>
                <div className="flex flex-wrap gap-2">
                  <DatePill date="Jan 13" />
                  <DatePill date="Feb 28" />
                  <DatePill date="Mar 15" />
                  <DatePill date="Apr 22" />
                </div>
              </div>
            </div>
            <div className="pt-2">
              <p className="text-xs font-medium text-muted-foreground">Usage:</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-md text-xs overflow-x-auto mt-2">
{`<DatePill date="Jan 13" />`}
              </pre>
            </div>
            <div className="pt-2">
              <p className="text-xs font-medium text-muted-foreground">Used in:</p>
              <ul className="text-xs text-muted-foreground mt-2 space-y-1 ml-4">
                <li>• Meeting and deal list pages (for date display)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* MomentumPill */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">MomentumPill</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">A rounded pill component that displays deal momentum with color-coded states. Each momentum level has a distinct background and text color for quick visual identification.</p>
            <div className="bg-muted p-6 rounded-md border border-input space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-3">Momentum states (24px height):</p>
                <div className="flex flex-wrap gap-2">
                  <MomentumPill momentum="Strong" />
                  <MomentumPill momentum="Active" />
                  <MomentumPill momentum="Stalled" />
                  <MomentumPill momentum="At risk" />
                  <MomentumPill momentum="Closed" />
                </div>
              </div>
            </div>
            <div className="pt-2">
              <p className="text-xs font-medium text-muted-foreground">Color scheme:</p>
              <ul className="text-xs text-muted-foreground mt-2 space-y-1 ml-4">
                <li>• Strong — #D8F5E8 (saturated green)</li>
                <li>• Active — #DBEAFF (saturated blue)</li>
                <li>• Stalled — #FFF4D6 (saturated yellow)</li>
                <li>• At risk — #FFE0E0 (saturated red)</li>
                <li>• Closed — #F3F4F6 (grey)</li>
              </ul>
            </div>
            <div className="pt-2">
              <p className="text-xs font-medium text-muted-foreground">Usage:</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-md text-xs overflow-x-auto mt-2">
{`<MomentumPill momentum="Strong" />`}
              </pre>
            </div>
            <div className="pt-2">
              <p className="text-xs font-medium text-muted-foreground">Used in:</p>
              <ul className="text-xs text-muted-foreground mt-2 space-y-1 ml-4">
                <li>• DealsPage.tsx (momentum column)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* StagePill */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">StagePill</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">A rounded pill component that displays deal stages with color-coded states. Each stage in the sales pipeline has a distinct background and text color for quick visual identification.</p>
            <div className="bg-muted p-6 rounded-md border border-input space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-3">Deal stage examples (24px height):</p>
                <div className="flex flex-wrap gap-2">
                  <StagePill stage="First meeting scheduled" />
                  <StagePill stage="Discovery & Qualification" />
                  <StagePill stage="Demo" />
                  <StagePill stage="Proposal / Negotiation" />
                  <StagePill stage="Closed Won" />
                  <StagePill stage="Closed Lost" />
                </div>
              </div>
            </div>
            <div className="pt-2">
              <p className="text-xs font-medium text-muted-foreground">Color scheme:</p>
              <ul className="text-xs text-muted-foreground mt-2 space-y-1 ml-4">
                <li>• First meeting scheduled — #E0F2FE (light blue)</li>
                <li>• Discovery & Qualification — #F0EDFF (light purple)</li>
                <li>• Demo — #FEF3C7 (light amber)</li>
                <li>• Proposal / Negotiation — #FECACA (light red)</li>
                <li>• Closed Won — #DCFCE7 (light green)</li>
                <li>• Closed Lost — #F3F4F6 (grey)</li>
              </ul>
            </div>
            <div className="pt-2">
              <p className="text-xs font-medium text-muted-foreground">Usage:</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-md text-xs overflow-x-auto mt-2">
{`<StagePill stage="First meeting scheduled" />`}
              </pre>
            </div>
            <div className="pt-2">
              <p className="text-xs font-medium text-muted-foreground">Used in:</p>
              <ul className="text-xs text-muted-foreground mt-2 space-y-1 ml-4">
                <li>• DealsPage.tsx (deal stage column)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* CategoryBadge */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">CategoryBadge (Playbook Pills)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Color-coded badges for categorizing content. Used in Buyer Personas and Customer Profiles pages.</p>
            <div className="bg-muted p-6 rounded-md border border-input space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-3">Buyer Persona categories:</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-purple-50 text-purple-900 border-purple-200 font-normal text-xs rounded-md px-2.5 py-0.5">
                    Primary
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-900 border-blue-200 font-normal text-xs rounded-md px-2.5 py-0.5">
                    Secondary
                  </Badge>
                  <Badge variant="outline" className="bg-amber-50 text-amber-900 border-amber-200 font-normal text-xs rounded-md px-2.5 py-0.5">
                    Emerging
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-3">Customer Profile categories:</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-900 border-green-200 font-normal text-xs rounded-md px-2.5 py-0.5">
                    Ideal
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-900 border-blue-200 font-normal text-xs rounded-md px-2.5 py-0.5">
                    Secondary
                  </Badge>
                  <Badge variant="outline" className="bg-amber-50 text-amber-900 border-amber-200 font-normal text-xs rounded-md px-2.5 py-0.5">
                    Emerging
                  </Badge>
                </div>
              </div>
            </div>
            <div className="pt-2">
              <p className="text-xs font-medium text-muted-foreground">Used in:</p>
              <ul className="text-xs text-muted-foreground mt-2 space-y-1 ml-4">
                <li>• BuyerPersonasPage.tsx (lines 39-54)</li>
                <li>• CustomerProfilesPage.tsx (lines 39-54)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Persona Pill */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Persona Pill</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">A rectangular pill component that displays a contact's buyer persona. Features a book icon with the persona name in a light slate background.</p>
            <div className="bg-muted p-6 rounded-md border border-input space-y-4">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-3">Operational Decision Maker:</p>
                  <div className="inline-flex items-center gap-2 bg-muted rounded-md px-2.5 py-1.5 border border-input">
                    <BookOpen className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-xs text-foreground">Operational Decision Maker</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-3">Strategic Decision Maker:</p>
                  <div className="inline-flex items-center gap-2 bg-muted rounded-md px-2.5 py-1.5 border border-input">
                    <BookOpen className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-xs text-foreground">Strategic Decision Maker</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-3">Marketing/Growth Leader:</p>
                  <div className="inline-flex items-center gap-2 bg-muted rounded-md px-2.5 py-1.5 border border-input">
                    <BookOpen className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-xs text-foreground">Marketing/Growth Leader</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-2">
              <p className="text-xs font-medium text-muted-foreground">Usage:</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-md text-xs overflow-x-auto mt-2">
{`<div className="inline-flex items-center gap-2 bg-muted rounded-md px-2.5 py-1.5 border border-input">
  <BookOpen className="h-4 w-4 text-muted-foreground flex-shrink-0" />
  <span className="text-xs text-foreground">{persona}</span>
</div>`}
              </pre>
            </div>
            <div className="pt-2">
              <p className="text-xs font-medium text-muted-foreground">Used in:</p>
              <ul className="text-xs text-muted-foreground mt-2 space-y-1 ml-4">
                <li>• AttendeeHoverCard.tsx (lines 109-115)</li>
                <li>• ContactCard.tsx (lines 89-94)</li>
                <li>• PreCallBrief.tsx (multiple locations)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
