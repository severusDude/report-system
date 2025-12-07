import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex items-center justify-between h-16 gap-2 p-4 border-b bg-background shrink-0 z-50">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="data-[orientation=vertical]:h-4 mx-1"
            />
            <DynamicBreadcrumb />
          </div>
          {/* <div>
            <AppearanceDropdown />
          </div> */}
        </header>

        <main className="h-full p-4 md:pt-2">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AuthenticatedLayout;
