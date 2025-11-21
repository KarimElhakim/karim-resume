/**
 * Performance Monitoring System
 * Tracks and reports performance metrics for components
 */

class PerformanceMonitor {
  constructor() {
    this.metrics = {
      fps: [],
      frameTime: [],
      memory: [],
      renderTime: []
    };
    this.isMonitoring = false;
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.rafId = null;
  }

  start() {
    if (this.isMonitoring) return;
    this.isMonitoring = true;
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.monitor();
  }

  stop() {
    this.isMonitoring = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  monitor() {
    if (!this.isMonitoring) return;

    const now = performance.now();
    const deltaTime = now - this.lastTime;
    this.lastTime = now;

    // Calculate FPS
    const fps = 1000 / deltaTime;
    this.metrics.fps.push(fps);
    this.metrics.frameTime.push(deltaTime);

    // Track memory if available
    if (performance.memory) {
      this.metrics.memory.push({
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize,
        limit: performance.memory.jsHeapSizeLimit,
        timestamp: now
      });
    }

    // Keep only last 30 frames (0.5 second at 60fps) to reduce memory usage
    if (this.metrics.fps.length > 30) {
      this.metrics.fps.shift();
      this.metrics.frameTime.shift();
    }
    if (this.metrics.memory.length > 30) {
      this.metrics.memory.shift();
    }

    this.frameCount++;
    
    // Periodic cleanup
    if (this.frameCount % 3600 === 0) {
      this.cleanup();
    }
    
    this.rafId = requestAnimationFrame(() => this.monitor());
  }

  getMetrics() {
    const avgFPS = this.metrics.fps.length > 0
      ? this.metrics.fps.reduce((a, b) => a + b, 0) / this.metrics.fps.length
      : 0;

    const avgFrameTime = this.metrics.frameTime.length > 0
      ? this.metrics.frameTime.reduce((a, b) => a + b, 0) / this.metrics.frameTime.length
      : 0;

    const minFPS = this.metrics.fps.length > 0 ? Math.min(...this.metrics.fps) : 0;
    const maxFPS = this.metrics.fps.length > 0 ? Math.max(...this.metrics.fps) : 0;

    const latestMemory = this.metrics.memory.length > 0
      ? this.metrics.memory[this.metrics.memory.length - 1]
      : null;

    return {
      fps: {
        average: Math.round(avgFPS * 10) / 10,
        min: Math.round(minFPS * 10) / 10,
        max: Math.round(maxFPS * 10) / 10,
        current: this.metrics.fps.length > 0 
          ? Math.round(this.metrics.fps[this.metrics.fps.length - 1] * 10) / 10 
          : 0
      },
      frameTime: {
        average: Math.round(avgFrameTime * 10) / 10,
        min: this.metrics.frameTime.length > 0 ? Math.min(...this.metrics.frameTime) : 0,
        max: this.metrics.frameTime.length > 0 ? Math.max(...this.metrics.frameTime) : 0
      },
      memory: latestMemory ? {
        usedMB: Math.round(latestMemory.used / 1048576 * 10) / 10,
        totalMB: Math.round(latestMemory.total / 1048576 * 10) / 10,
        limitMB: Math.round(latestMemory.limit / 1048576 * 10) / 10,
        usagePercent: Math.round((latestMemory.used / latestMemory.limit) * 1000) / 10
      } : null,
      frameCount: this.frameCount
    };
  }

  getPerformanceGrade() {
    const metrics = this.getMetrics();
    const avgFPS = metrics.fps.average;
    const avgFrameTime = metrics.frameTime.average;

    if (avgFPS >= 55 && avgFrameTime < 20) return 'A+';
    if (avgFPS >= 50 && avgFrameTime < 25) return 'A';
    if (avgFPS >= 45 && avgFrameTime < 30) return 'B';
    if (avgFPS >= 35 && avgFrameTime < 35) return 'C';
    if (avgFPS >= 25 && avgFrameTime < 45) return 'D';
    return 'F';
  }

  logMetrics() {
    const metrics = this.getMetrics();
    const grade = this.getPerformanceGrade();
    
    console.group('📊 Performance Metrics');
    console.log(`FPS: ${metrics.fps.current} (Avg: ${metrics.fps.average}, Min: ${metrics.fps.min}, Max: ${metrics.fps.max})`);
    console.log(`Frame Time: ${metrics.frameTime.average}ms (Min: ${metrics.frameTime.min}ms, Max: ${metrics.frameTime.max}ms)`);
    if (metrics.memory) {
      console.log(`Memory: ${metrics.memory.usedMB}MB / ${metrics.memory.limitMB}MB (${metrics.memory.usagePercent}%)`);
    }
    console.log(`Grade: ${grade}`);
    console.groupEnd();
    
    return { metrics, grade };
  }

  reset() {
    // Clear arrays to free memory
    this.metrics.fps.length = 0;
    this.metrics.frameTime.length = 0;
    this.metrics.memory.length = 0;
    this.metrics.renderTime.length = 0;
    this.frameCount = 0;
  }
  
  // Periodic cleanup to prevent memory leaks
  cleanup() {
    // Reset metrics every 60 seconds to prevent unbounded growth
    if (this.frameCount > 3600) { // ~60 seconds at 60fps
      this.reset();
    }
  }
}

// Component-specific performance tracker
export class ComponentPerformanceTracker {
  constructor(componentName) {
    this.componentName = componentName;
    this.renderTimes = [];
    this.updateTimes = [];
  }

  startRender() {
    this.renderStart = performance.now();
  }

  endRender() {
    if (this.renderStart) {
      const renderTime = performance.now() - this.renderStart;
      this.renderTimes.push(renderTime);
      if (this.renderTimes.length > 100) {
        this.renderTimes.shift();
      }
      this.renderStart = null;
    }
  }

  startUpdate() {
    this.updateStart = performance.now();
  }

  endUpdate() {
    if (this.updateStart) {
      const updateTime = performance.now() - this.updateStart;
      this.updateTimes.push(updateTime);
      if (this.updateTimes.length > 100) {
        this.updateTimes.shift();
      }
      this.updateStart = null;
    }
  }

  getStats() {
    const avgRenderTime = this.renderTimes.length > 0
      ? this.renderTimes.reduce((a, b) => a + b, 0) / this.renderTimes.length
      : 0;

    const avgUpdateTime = this.updateTimes.length > 0
      ? this.updateTimes.reduce((a, b) => a + b, 0) / this.updateTimes.length
      : 0;

    return {
      component: this.componentName,
      renderTime: {
        average: Math.round(avgRenderTime * 100) / 100,
        min: this.renderTimes.length > 0 ? Math.min(...this.renderTimes) : 0,
        max: this.renderTimes.length > 0 ? Math.max(...this.renderTimes) : 0,
        count: this.renderTimes.length
      },
      updateTime: {
        average: Math.round(avgUpdateTime * 100) / 100,
        min: this.updateTimes.length > 0 ? Math.min(...this.updateTimes) : 0,
        max: this.updateTimes.length > 0 ? Math.max(...this.updateTimes) : 0,
        count: this.updateTimes.length
      }
    };
  }

  logStats() {
    const stats = this.getStats();
    console.group(`📈 ${this.componentName} Performance`);
    console.log(`Render Time: ${stats.renderTime.average}ms (${stats.renderTime.count} renders)`);
    console.log(`Update Time: ${stats.updateTime.average}ms (${stats.updateTime.count} updates)`);
    console.groupEnd();
    return stats;
  }
}

// Global performance monitor instance
export const globalPerformanceMonitor = new PerformanceMonitor();

// Auto-start monitoring in development (with reduced frequency to avoid overhead)
if (import.meta.env.DEV) {
  globalPerformanceMonitor.start();
  
  // Log metrics every 10 seconds in development (reduced from 5 to avoid overhead)
  setInterval(() => {
    globalPerformanceMonitor.logMetrics();
  }, 10000);
  
  // Expose to window for manual inspection
  if (typeof window !== 'undefined') {
    window.performanceMonitor = globalPerformanceMonitor;
    // componentCoordinator will be exposed separately
  }
}

export default PerformanceMonitor;

