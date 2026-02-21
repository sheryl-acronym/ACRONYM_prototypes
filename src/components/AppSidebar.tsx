import { useLocation, Link } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';
import {
  Box,
  Calendar,
  BookOpen,
  ChevronDown,
  User,
  Building2,
  Settings,
  ChevronsUpDown,
  Palette,
} from 'lucide-react';

export default function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-row items-center justify-between px-4 pt-5 pb-4">
        <span className="text-2xl tracking-tight group-data-[collapsible=icon]:hidden" style={{ fontFamily: "'Oxanium', sans-serif", fontWeight: 800 }}>
          ACRONYM.
        </span>
      </SidebarHeader>

      <SidebarContent>
        {/* Current company */}
        <SidebarGroup className="px-3 pt-0 pb-2">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Flex" className="h-auto py-2">
                  <img src="/flexlogo.png" alt="Flex" className="h-8 w-8 rounded-md flex-shrink-0 object-contain" />
                  <span className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold">Flex</span>
                    <span className="text-xs text-muted-foreground">withflex.com</span>
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Top nav */}
        <SidebarGroup className="px-3 pt-0 pb-1">
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === '/deals'}
                  tooltip="Deals"
                  className="h-9"
                >
                  <Link to="/deals">
                    <Box className="h-4 w-4" />
                    <span>Deals</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <Collapsible defaultOpen className="group/meetings">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Meetings" className="h-9">
                      <Calendar className="h-4 w-4" />
                      <span>Meetings</span>
                      <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/meetings:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="gap-0 py-1 ml-4 pl-3">
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild className="h-8" isActive={location.pathname === '/meetings'}>
                          <Link to="/meetings">
                            <span>Upcoming</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild className="h-8" isActive={location.pathname === '/meetings/past'}>
                          <Link to="/meetings/past">
                            <span>Past Meetings</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-2" />

        {/* Knowledge section */}
        <SidebarGroup className="px-3 pt-2 pb-2">
          <SidebarGroupLabel className="mb-1 px-2 text-xs text-muted-foreground/60 uppercase tracking-wider">Knowledge</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {/* Playbook - collapsible */}
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Playbook" className="h-9">
                      <BookOpen className="h-4 w-4" />
                      <span>Playbook</span>
                      <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="gap-0 py-1 ml-4 pl-3">
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild className="h-8" isActive={location.pathname === '/playbook/positioning'}>
                          <Link to="/playbook/positioning">
                            <span>Positioning</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild className="h-8" isActive={location.pathname === '/customer-profiles'}>
                          <Link to="/customer-profiles">
                            <span>Customer Profiles</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild className="h-8" isActive={location.pathname === '/buyer-personas'}>
                          <Link to="/buyer-personas">
                            <span>Buyer Personas</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild className="h-8" isActive={location.pathname === '/discovery-questions'}>
                          <Link to="/discovery-questions">
                            <span>Discovery Questions</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild className="h-8" isActive={location.pathname === '/faqs'}>
                          <Link to="/faqs">
                            <span>FAQs</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild className="h-8" isActive={location.pathname === '/objections'}>
                          <Link to="/objections">
                            <span>Objections</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === '/companies'}
                  tooltip="Companies"
                  className="h-9"
                >
                  <Link to="/companies">
                    <Building2 className="h-4 w-4" />
                    <span>Companies</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === '/contacts'}
                  tooltip="Contacts"
                  className="h-9"
                >
                  <Link to="/contacts">
                    <User className="h-4 w-4" />
                    <span>Contacts</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-2" />

        {/* Components section */}
        <SidebarGroup className="px-3 pt-2 pb-2">
          <SidebarGroupLabel className="mb-1 px-2 text-xs text-muted-foreground/60 uppercase tracking-wider">Development</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === '/components'}
                  tooltip="Components"
                  className="h-9"
                >
                  <Link to="/components">
                    <Palette className="h-4 w-4" />
                    <span>Components</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-3 pb-4">
        <SidebarMenu className="gap-0.5">
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={location.pathname === '/settings'}
              tooltip="Settings"
              className="h-9"
            >
              <Link to="/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="sales@reformer1.ai" className="h-auto py-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gray-200 text-xs font-semibold flex-shrink-0">
                CN
              </span>
              <span className="flex-1 truncate text-sm">sales@reformer1.ai</span>
              <ChevronsUpDown className="ml-auto h-4 w-4 text-muted-foreground" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
