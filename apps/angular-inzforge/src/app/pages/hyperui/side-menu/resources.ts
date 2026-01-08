export const SideMenuItems = [
  {
    label: "Dashboard",
    route: ["/dashboard"],
    iconClass: "fa-solid fa-gauge",
    badge: "5"
  },
  {
    label: "Projects",
    route: ["/projects"],
    iconClass: "fa-solid fa-diagram-project",
  },
  {
    label: "Team",
    route: ["/team"],
    iconClass: "fa-solid fa-people-group",
    children: [
      {
        label: "Members",
        route: ["/team/members"],
        iconClass: "fa-solid fa-person",
      },
      {
        label: "Invitations",
        route: ["/team/invitations"],
        iconClass: "fa-solid fa-envelope-open-text",
      }
    ]
  },
  {
    label: "Settings",
    route: ["/settings"],
    iconClass: "fa-solid fa-gear",
    children: [
      {
        label: "Profile",
        route: ["/settings/profile"],
        iconClass: "fa-solid fa-id-card",
      },
      {
        label: "Security",
        route: ["/settings/security"],
        iconClass: "fa-solid fa-shield",
      },
      {
        label: "Notifications",
        route: ["/settings/notifications"],
        iconClass: "fa-solid fa-bell",
      }
    ]
  }
];
export const SideMenuLogo = {
  text: "HyperUI",
  subtitle: "The UI Library",
  initials: "HUI"
};
export const SideMenuProfile = {
  headline: "John Doe",
  subtitle: "john.doe@example.com",
  avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=aW1nbnNlY29uZC1yZGYtc2NoZW1hLXN0cmluZz1zZXJpYWw%3D&auto=format&fit=crop&w=200&h=200&q=80",
  profileRoute: ["/profile"] // TODO a url to an external web page can be passed instead
};
export const SideMenuFooterItems = [
  {
    label: "Help",
    route: ["/help"],
    iconClass: "fa-solid fa-hand-holding-hand",
  },
  {
    label: "Logout",
    route: ["/logout"], // TODO for an item like this, passing an action/callback is more suitable then passing a route
    iconClass: "fa-solid fa-arrow-right-from-bracket"
  }
];
