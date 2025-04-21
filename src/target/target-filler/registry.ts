export interface TargetFiller {
  canHandle(siteName: string, siteType?: string): boolean;
  priority: number;
  fill(info: TorrentInfo.Info): void;
}

export class FillerRegistry {
  private fillers: TargetFiller[] = [];

  register(filler: TargetFiller): void {
    this.fillers.push(filler);
    this.fillers.sort((a, b) => b.priority - a.priority);
  }

  getApplicableFiller(siteName: string, siteType: string): TargetFiller | null {
    return (
      this.fillers.find((filler) => filler.canHandle(siteName, siteType)) ||
      null
    );
  }
}

export const registry = new FillerRegistry();
