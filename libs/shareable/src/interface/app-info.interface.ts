import { PlatformEnum } from '@shareable/enum';

export interface AppInfoInterface {
  platform: PlatformEnum;
  appVersion: string;
  deviceManufacturer: string;
  deviceOSVersion: string;
  deviceModel: string;
  lastLogin: string;
}
