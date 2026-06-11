import AsyncStorage from "@react-native-async-storage/async-storage";
import { initialData } from "../constants/initialData";
const STORAGE_KEY = "@fittrack:data:v1";
export const appStorage = {
  async load() {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  },
  async save(data) {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },
};
