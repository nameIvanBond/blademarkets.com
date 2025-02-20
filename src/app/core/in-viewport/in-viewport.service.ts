import {Injectable, NgZone} from '@angular/core';
import {Subject} from 'rxjs';
import {InViewportConfig} from './in-viewport-config';

export interface InViewportRegistryEntry {
  root: Element;
  configHash: string;
  targets: Set<Element>;
  observer: IntersectionObserver;
}

export type InViewportTrigger = Subject<IntersectionObserverEntry>;
export type InViewportRegistry = InViewportRegistryEntry[];

@Injectable({
  providedIn: 'root'
})
export class InViewportService {
  public readonly trigger$: InViewportTrigger = new Subject<IntersectionObserverEntry>();
  private registry: InViewportRegistry = [];

  constructor(private ngZone: NgZone) {
   // console.log('InViewportService___constructor', this.registry);
  }

  private emitTrigger(entries: IntersectionObserverEntry[]) {
    if (Array.isArray(entries) && entries.length) {
      entries.forEach((entry) => this.trigger$.next(entry));
    }
  }

  private getRootElement(element?: Element): Element | null {
    return element && element.nodeType === Node.ELEMENT_NODE ? element : null;
  }

  private findEntry(root: Element, configHash: string) {
    return this.registry.find((entry) => entry.root === this.getRootElement(root) && entry.configHash === configHash);
  }

  public register(target: Element, config: InViewportConfig): void {
    this.ngZone.runOutsideAngular(() => {
      const foundedEntry = this.findEntry(config.root, config.hash);
 //     console.log('register++++++++++++++++++++++START', foundedEntry);
      if (foundedEntry && !foundedEntry.targets.has(target)) {
   //     console.log('register++++++++++++++++++++++IF TRUE');
        foundedEntry.targets.add(target);
        foundedEntry.observer.observe(target);
      } else {
    //    console.log('register++++++++++++++++++++++IF FALSE');
        const root: Element | null = this.getRootElement(config.root);
        const options: any = {
          root: root !== null ? root : undefined,
          rootMargin: config.rootMargin,
          threshold: config.threshold
        };
        const entry: InViewportRegistryEntry = {
          root,
          configHash: config.hash,
          targets: new Set([target]),
          observer: new IntersectionObserver(
            (entries: IntersectionObserverEntry[]) => this.ngZone.run(() => this.emitTrigger(entries)),
            options
          )
        };
        entry.observer.observe(target);
        this.registry = [...this.registry, entry];
      }
    });
 //   console.log('register++++++++++++++++++++++AFTER', target, this.registry);
  }

  public unregister(target: Element, config: InViewportConfig): void {
    this.ngZone.runOutsideAngular(() => {
      const foundedEntry = this.findEntry(config.root, config.hash);
      if (foundedEntry) {
        const {observer, targets} = foundedEntry;
        if (targets.has(target)) {
          observer.unobserve(target);
          targets.delete(target);
        }
        if (targets.size === 0) {
          observer.disconnect();
          this.registry = this.registry.filter((entry) => entry !== foundedEntry);
        }
      }
    });
  }
}
