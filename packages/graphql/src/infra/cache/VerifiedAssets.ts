export default class VerifiedAssets {
  static instance: VerifiedAssets;
  private lastDate?: Date;
  private assets: any;

  private constructor() {}

  async fetch() {
    const now = new Date();
    if (
      !this.lastDate ||
      !this.assets ||
      now.getTime() - this.lastDate.getTime() > 60000
    ) {
      this.lastDate = new Date();
      const response = await fetch(
        'https://verified-assets.fuel.network/assets.json',
      );
      this.assets = await response.json();
      return this.assets;
    }
    return this.assets;
  }

  static getInstance() {
    if (!VerifiedAssets.instance) {
      VerifiedAssets.instance = new VerifiedAssets();
    }
    return VerifiedAssets.instance;
  }
}
