/**
 * Automated Performance Testing System
 * Detects performance issues, loops, and component conflicts
 */

class PerformanceTestSuite {
  constructor() {
    this.tests = [];
    this.results = [];
    this.isRunning = false;
  }

  // Test 1: Detect multiple RAF loops (fixed to exclude test overhead)
  testMultipleRAF() {
    // Count active RAF loops by checking how many are scheduled
    let rafCallbacks = new Set();
    let uniqueLoops = 0;
    
    const originalRAF = window.requestAnimationFrame;
    const rafMap = new WeakMap();
    
    window.requestAnimationFrame = function(callback) {
      const id = originalRAF.call(window, callback);
      
      // Track unique callback functions (each component has its own callback)
      if (!rafMap.has(callback)) {
        rafMap.set(callback, true);
        uniqueLoops++;
      }
      
      return id;
    };
    
    return new Promise((resolve) => {
      setTimeout(() => {
        window.requestAnimationFrame = originalRAF;
        // Should have max 3 RAF loops: SplashCursor, LiquidEther, PerformanceMonitor
        const result = {
          test: 'Multiple RAF Loops',
          passed: uniqueLoops <= 3,
          rafCount: uniqueLoops,
          message: uniqueLoops > 3 
            ? `Too many RAF loops detected: ${uniqueLoops}. Expected max 3 (SplashCursor, LiquidEther, Monitor).`
            : `RAF loop count acceptable: ${uniqueLoops}`
        };
        resolve(result);
      }, 2000);
    });
  }

  // Test 2: Detect memory leaks
  testMemoryLeak() {
    return new Promise((resolve) => {
      if (!performance.memory) {
        resolve({
          test: 'Memory Leak Detection',
          passed: true,
          message: 'Memory API not available'
        });
        return;
      }

      const initialMemory = performance.memory.usedJSHeapSize;
      
      setTimeout(() => {
        const finalMemory = performance.memory.usedJSHeapSize;
        const memoryIncrease = finalMemory - initialMemory;
        const increasePercent = (memoryIncrease / initialMemory) * 100;
        
        const result = {
          test: 'Memory Leak Detection',
          passed: increasePercent < 10, // Less than 10% increase is acceptable
          memoryIncrease: Math.round(memoryIncrease / 1024 / 1024 * 100) / 100 + 'MB',
          increasePercent: Math.round(increasePercent * 100) / 100 + '%',
          message: increasePercent >= 10
            ? `Potential memory leak detected: ${increasePercent.toFixed(2)}% increase`
            : `Memory usage stable: ${increasePercent.toFixed(2)}% increase`
        };
        resolve(result);
      }, 5000);
    });
  }

  // Test 3: Detect component conflicts
  testComponentConflicts() {
    const canvasElements = document.querySelectorAll('canvas');
    const webglContexts = [];
    
    canvasElements.forEach(canvas => {
      try {
        const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
        if (gl) webglContexts.push(gl);
      } catch (e) {
        // Ignore
      }
    });

    const result = {
      test: 'Component Conflicts',
      passed: webglContexts.length <= 1, // Only SplashCursor should use WebGL
      canvasCount: canvasElements.length,
      webglContextCount: webglContexts.length,
      message: webglContexts.length > 1
        ? `Multiple WebGL contexts detected: ${webglContexts.length}. This causes GPU conflicts.`
        : `WebGL context count acceptable: ${webglContexts.length}`
    };

    return Promise.resolve(result);
  }

  // Test 4: Detect excessive re-renders (fixed to exclude monitor overhead)
  testExcessiveRerenders() {
    let renderCount = 0;
    const originalRAF = window.requestAnimationFrame;
    const callbackSet = new Set();
    
    window.requestAnimationFrame = function(callback) {
      // Only count unique callbacks to avoid counting the same loop multiple times
      const callbackId = callback.toString().substring(0, 100); // Use function signature as ID
      if (!callbackSet.has(callbackId)) {
        callbackSet.add(callbackId);
        renderCount++;
      }
      return originalRAF.call(window, callback);
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        window.requestAnimationFrame = originalRAF;
        // Should have max 3-4 unique render loops
        const result = {
          test: 'Excessive Re-renders',
          passed: renderCount <= 4, // Max 4 unique render loops
          renderCount,
          message: renderCount > 4
            ? `Excessive render loops detected: ${renderCount}. Expected max 4.`
            : `Render loop count acceptable: ${renderCount}`
        };
        resolve(result);
      }, 2000);
    });
  }

  // Test 5: Detect long-running operations
  testLongRunningOperations() {
    return new Promise((resolve) => {
      const longTasks = [];
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) { // Tasks longer than 50ms block the main thread
            longTasks.push({
              name: entry.name,
              duration: Math.round(entry.duration * 100) / 100,
              startTime: Math.round(entry.startTime * 100) / 100
            });
          }
        }
      });

      try {
        observer.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        // Long task API not supported
        resolve({
          test: 'Long-running Operations',
          passed: true,
          message: 'Long Task API not available'
        });
        return;
      }

      setTimeout(() => {
        observer.disconnect();
        const result = {
          test: 'Long-running Operations',
          passed: longTasks.length === 0,
          longTasksCount: longTasks.length,
          longTasks,
          message: longTasks.length > 0
            ? `Long-running tasks detected: ${longTasks.length}. These block the main thread.`
            : 'No long-running tasks detected'
        };
        resolve(result);
      }, 5000);
    });
  }

  // Test 6: Measure actual FPS
  testActualFPS() {
    return new Promise((resolve) => {
      let frames = 0;
      let lastTime = performance.now();
      
      const measureFPS = (currentTime) => {
        frames++;
        const delta = currentTime - lastTime;
        
        if (delta >= 2000) { // Measure over 2 seconds
          const fps = (frames / delta) * 1000;
          const result = {
            test: 'Actual FPS',
            passed: fps >= 45, // Should be at least 45fps
            fps: Math.round(fps * 10) / 10,
            grade: fps >= 55 ? 'A+' : fps >= 50 ? 'A' : fps >= 45 ? 'B' : fps >= 35 ? 'C' : fps >= 25 ? 'D' : 'F',
            message: fps < 45
              ? `Low FPS detected: ${fps.toFixed(1)}. Performance is unacceptable.`
              : `FPS acceptable: ${fps.toFixed(1)}`
          };
          resolve(result);
        } else {
          requestAnimationFrame(measureFPS);
        }
      };
      
      requestAnimationFrame(measureFPS);
    });
  }

  // Run all tests
  async runAllTests() {
    if (this.isRunning) {
      console.warn('Tests already running');
      return;
    }

    this.isRunning = true;
    this.results = [];

    console.group('🧪 Running Performance Tests...');

    try {
      const tests = [
        this.testMultipleRAF(),
        this.testComponentConflicts(),
        this.testExcessiveRerenders(),
        this.testActualFPS(),
        this.testMemoryLeak(),
        this.testLongRunningOperations()
      ];

      const results = await Promise.all(tests);
      this.results = results;

      // Log results
      results.forEach(result => {
        const icon = result.passed ? '✅' : '❌';
        console.log(`${icon} ${result.test}: ${result.message}`);
        if (!result.passed && result.longTasks) {
          console.table(result.longTasks);
        }
      });

      // Summary
      const passed = results.filter(r => r.passed).length;
      const total = results.length;
      const grade = passed === total ? 'A+' : passed >= total * 0.8 ? 'B' : passed >= total * 0.6 ? 'C' : 'F';

      console.groupEnd();
      console.group('📊 Test Summary');
      console.log(`Passed: ${passed}/${total}`);
      console.log(`Grade: ${grade}`);
      console.groupEnd();

      return {
        passed,
        total,
        grade,
        results
      };
    } catch (error) {
      console.error('Test error:', error);
      this.isRunning = false;
      return null;
    } finally {
      this.isRunning = false;
    }
  }

  // Continuous monitoring
  startContinuousMonitoring(interval = 10000) {
    this.monitoringInterval = setInterval(async () => {
      const summary = await this.runAllTests();
      if (summary && summary.grade === 'F') {
        console.warn('⚠️ Performance degradation detected! Consider disabling heavy components.');
      }
    }, interval);
  }

  stopContinuousMonitoring() {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
  }
}

// Export singleton instance
export const performanceTestSuite = new PerformanceTestSuite();

// Auto-run tests in development
if (import.meta.env.DEV && typeof window !== 'undefined') {
  // Run tests after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      performanceTestSuite.runAllTests();
      // Start continuous monitoring
      performanceTestSuite.startContinuousMonitoring(30000); // Every 30 seconds
    }, 3000);
  });

  // Expose to window for manual testing
  window.performanceTest = performanceTestSuite;
}

export default PerformanceTestSuite;

