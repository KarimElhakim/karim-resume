/**
 * Component Coordinator
 * Manages coordination between multiple animated components to prevent conflicts
 */

class ComponentCoordinator {
  constructor() {
    this.components = new Map();
    this.globalFPS = 60;
    this.targetFPS = 60;
    this.isThrottling = false;
    this.frameSkip = 0;
  }

  registerComponent(name, component) {
    this.components.set(name, {
      component,
      priority: name === 'SplashCursor' ? 0 : 2, // SplashCursor has highest priority (0 = never throttled)
      enabled: true,
      lastUpdate: 0
    });
  }

  unregisterComponent(name) {
    this.components.delete(name);
  }

  // Throttle components if performance is low (but never throttle SplashCursor)
  shouldUpdate(componentName) {
    const component = this.components.get(componentName);
    if (!component || !component.enabled) return false;

    // SplashCursor (priority 0) is never throttled - it's critical
    if (component.priority === 0) return true;

    // If throttling is active, skip lower priority components
    if (this.isThrottling) {
      if (component.priority > 1) {
        this.frameSkip++;
        if (this.frameSkip % 2 === 0) return false; // Skip every other frame for low priority
      }
    }

    return true;
  }

  // Monitor global performance and adjust
  monitorPerformance() {
    const now = performance.now();
    const components = Array.from(this.components.values());
    
    // Calculate average time since last update
    const avgUpdateTime = components.reduce((sum, c) => {
      return sum + (now - c.lastUpdate);
    }, 0) / components.length;

    // If average update time is too high, enable throttling
    if (avgUpdateTime > 20) { // >20ms means <50fps
      this.isThrottling = true;
      this.targetFPS = 30; // Reduce target FPS
    } else if (avgUpdateTime < 16) { // <16ms means >60fps
      this.isThrottling = false;
      this.targetFPS = 60;
    }

    // Update last update time
    components.forEach(c => {
      c.lastUpdate = now;
    });
  }

  // Disable low priority components if performance is critical
  optimizeForPerformance() {
    const components = Array.from(this.components.values());
    const lowPriorityComponents = components.filter(c => c.priority > 1);
    
    // If performance is critical, disable low priority components
    if (this.globalFPS < 25) {
      lowPriorityComponents.forEach(c => {
        c.enabled = false;
        console.warn(`Disabling ${c.component.constructor.name} due to low performance`);
      });
    } else if (this.globalFPS > 45) {
      // Re-enable if performance improves
      lowPriorityComponents.forEach(c => {
        c.enabled = true;
      });
    }
  }
}

export const componentCoordinator = new ComponentCoordinator();

// Monitor performance every second
if (typeof window !== 'undefined') {
  setInterval(() => {
    componentCoordinator.monitorPerformance();
    componentCoordinator.optimizeForPerformance();
  }, 1000);
}

export default ComponentCoordinator;

