"use client";

import {
  BanknoteIcon,
  BellIcon,
  FileChartColumnIcon,
  FileInputIcon,
  FileOutputIcon,
  FolderCheckIcon,
  FolderClockIcon,
  FolderSearchIcon,
  SettingsIcon,
  SquarePenIcon,
  UserIcon,
  UserXIcon,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Anchor from "./anchor";
import { useState } from "react";

export function UserLeftbar() {
  return (
    <aside className="h-full flex-[2] border-r sticky top-14 px-2 py-7">
      <div className="flex flex-col gap-1">
        {user_links.map((link) => (
          <Anchor
            className="text-sm p-3 flex items-center gap-2.5"
            activeClassName="bg-secondary rounded-md text-tomato"
            href={link.href}
            key={link.href}
          >
            <link.icon className="w-5 h-5 text-current" />
            {link.title}
          </Anchor>
        ))}
      </div>
    </aside>
  );
}

export function AdminLeftbar() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (title: string) => {
    setOpenItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  return (
    <aside className="h-full flex-[2] border-r sticky top-14 px-2 py-7">
      <div className="flex flex-col gap-1">
        {admin_links.map((link) => (
          <div key={link.href}>
            {link.subItems ? (
              <Collapsible
                open={openItems.includes(link.title)}
                onOpenChange={() => toggleItem(link.title)}
              >
                <CollapsibleTrigger asChild>
                  <button className="w-full text-sm p-3 flex items-center gap-2.5 hover:bg-secondary rounded-md">
                    <link.icon className="w-5 h-5 text-current" />
                    {link.title}
                    {openItems.includes(link.title) ? (
                      <ChevronDown className="w-4 h-4 ml-auto" />
                    ) : (
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    )}
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="ml-7 mt-1 flex flex-col gap-1">
                    {link.subItems.map((subItem) => (
                      <Anchor
                        key={subItem.href}
                        href={subItem.href}
                        className="text-sm p-2 px-3 flex items-center hover:bg-secondary rounded-md"
                        activeClassName="bg-secondary text-tomato"
                      >
                        {subItem.title}
                      </Anchor>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <Anchor
                className="text-sm p-3 flex items-center gap-2.5"
                activeClassName="bg-secondary rounded-md text-blue-500"
                href={link.href}
              >
                <link.icon className="w-5 h-5 text-current" />
                {link.title}
              </Anchor>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}

const user_links = [
  {
    title: "Personal Information",
    href: "/user/personal-info",
    icon: UserIcon,
  },
  {
    title: "Interview Sheet",
    href: "/user/interview-sheet",
    icon: SquarePenIcon,
  },
  {
    title: "Pre Tax Documents",
    href: "/user/pre-tax-documents",
    icon: FileInputIcon,
  },
  {
    title: "Post Tax Documents",
    href: "/user/post-tax-documents",
    icon: FileOutputIcon,
  },
  {
    title: "Make Payment",
    href: "/user/make-payment",
    icon: BanknoteIcon,
  },
  {
    title: "Settings",
    href: "/user/settings",
    icon: SettingsIcon,
  },
];

const admin_links = [
  {
    title: "Registration",
    href: "/admin/registration",
    icon: FileChartColumnIcon,
  },
  {
    title: "Pre Process",
    href: "/admin/pre-process",
    icon: FolderClockIcon,
    subItems: [
      {
        title: "Interview Pending",
        href: "/admin/pre-process/pdf-pending",
      },
      {
        title: "Document Pending",
        href: "/admin/pre-process/doc-pending",
      },
      {
        title: "Additional Doc Pending",
        href: "/admin/pre-process/additional-doc-pending",
      },
      {
        title: "Pre Cancelled",
        href: "/admin/pre-process/pre-cancelled",
      },
    ],
  },
  {
    title: "Process",
    href: "/admin/process",
    icon: FolderSearchIcon,
    subItems: [
      {
        title: "Tax Preparation Pending",
        href: "/admin/process/tax-prep-pending",
      },
      {
        title: "Tax Review Pending",
        href: "/admin/process/tax-review-pending",
      },
      {
        title: "Estimates Pending",
        href: "/admin/process/estimate-pending",
      },
      {
        title: "Payment Pending Pending",
        href: "/admin/process/payment-pending",
      },
      {
        title: "Post Cancelled",
        href: "/admin/process/post-cancelled",
      },
    ],
  },
  {
    title: "Post Process",
    href: "/admin/post-process",
    icon: FolderCheckIcon,
    subItems: [
      {
        title: "PDF Pending",
        href: "/admin/post-process/pdf-pending",
      },
      {
        title: "Client Confirmation Pending",
        href: "/admin/post-process/confirm-pending",
      },
      {
        title: "E-Filing Pending",
        href: "/admin/post-process/e-filing-pending",
      },
      {
        title: "Paper Filing Pending",
        href: "/admin/post-process/paper-filing-pending",
      },
      {
        title: "State Filing Pending",
        href: "/admin/post-process/state-filing-pending",
      },
      {
        title: "Completed",
        href: "/admin/post-process/completed",
      },
      {
        title: "Cancelled",
        href: "/admin/post-process/cancelled",
      },
    ],
  },
  {
    title: "Notifications",
    href: "/admin/notifications",
    icon: BellIcon,
  },
  {
    title: "Temporary Register",
    href: "/admin/temporary-register",
    icon: UserXIcon,
  },
];
