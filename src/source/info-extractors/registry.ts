export interface InfoExtractor {
  canHandle(siteName: string, siteType: string): boolean;
  extract(): Promise<TorrentInfo.Info>;
  priority: number;
}

class ExtractorRegistry {
  private extractors: InfoExtractor[] = [];

  register(extractor: InfoExtractor): void {
    this.extractors.push(extractor);
    this.extractors.sort((a, b) => b.priority - a.priority);
  }

  getExtractor(siteName: string, siteType: string): InfoExtractor | null {
    return (
      this.extractors.find((extractor) =>
        extractor.canHandle(siteName, siteType),
      ) || null
    );
  }
}

export const registry = new ExtractorRegistry();
