import {Component, OnInit, signal} from '@angular/core';
import {NavigationEnd, Route, Router, RouterModule} from '@angular/router';
import {filter} from 'rxjs/operators';

interface MenuItem {
  label: string;
  path: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styles: [`
    .sidebar {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 100;
      padding: 48px 0 0;
      box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
    }

    .sidebar-sticky {
      position: relative;
      top: 0;
      height: calc(100vh - 48px);
      padding-top: .5rem;
      overflow-x: hidden;
      overflow-y: auto;
    }

    @supports ((position: -webkit-sticky) or (position: sticky)) {
      .sidebar-sticky {
        position: -webkit-sticky;
        position: sticky;
      }
    }

    .sidebar .nav-link {
      font-weight: 500;
      color: #333;
    }

    .sidebar .nav-link.active {
      color: #2470dc;
    }

    .sidebar .nav-link.ps-4 {
      padding-left: 2rem !important;
    }
  `]
})
export class SidebarComponent implements OnInit {
  menuItems = signal<MenuItem[]>([]);

  constructor(private router: Router) {
    this.generateMenuItems();
  }

  ngOnInit() {
    this.generateMenuItems();

    // Listen for route changes to update the menu if needed
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.generateMenuItems();
      });
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  private generateMenuItems() {
    // Extract routes from the router configuration
    const routes = this.router.config;
    const items = this.processRoutes(routes);
    this.menuItems.set(items);
  }

  private processRoutes(routes: Route[], basePath: string = ''): MenuItem[] {
    const menuItems: MenuItem[] = [];

    for (const route of routes) {
      // Skip routes that have no path or are redirects
      if (route.path == undefined || route.path === '**') continue;

      // Build the full path
      const fullPath = basePath ? `${basePath}/${route.path}` : route.path;

      // Generate a label from the path if no data is provided
      let label = route.data?.['label'] as string || this.pathToLabel(route.path);

      // If it's the root path, set a specific label
      if (fullPath === '') {
        label = 'Home';
      }

      // Create menu item
      const menuItem: MenuItem = {
        label: label,
        path: fullPath === '' ? '/' : `/${fullPath}`
      };

      // Process children if they exist
      if (route.children && route.children.length > 0) {
        menuItem.children = this.processRoutes(route.children, fullPath);
      }

      menuItems.push(menuItem);
    }

    return menuItems;
  }

  private pathToLabel(path: string): string {
    // Convert path to a readable label
    return path
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
