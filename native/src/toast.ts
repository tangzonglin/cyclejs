import xs, {Stream} from 'xstream';
import {ToastAndroid, Platform} from 'react-native';

export type Toast = {
  type: 'show';
  message: string;
  duration: number;
};

export type GravityToast = {
  type: 'showWithGravity';
  message: string;
  duration: number;
  gravity: number;
};

export const Duration = {
  SHORT: ToastAndroid.SHORT,
  LONG: ToastAndroid.LONG,
};

export const Gravity = {
  TOP: ToastAndroid.TOP,
  CENTER: ToastAndroid.CENTER,
  BOTTOM: ToastAndroid.BOTTOM,
};

export function makeToastDriver() {
  return function toastDriver(sink: Stream<Toast | GravityToast>): void {
    if (Platform.OS === 'android') {
      sink.addListener({
        next: t => {
          const args = [t.message, t.duration, (t as GravityToast).gravity];
          (ToastAndroid[t.type] as any)(...args);
        },
      });
    }
  };
}