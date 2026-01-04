import { ref, watch } from 'vue';

const KEY_DARK_MODE = 'inz-showcase-dark-mode';
const KEY_RTL = 'inz-showcase-rtl';

// Create a singleton instance to ensure all components share the same state
const isRtlDirection = ref(getFromStorage(KEY_RTL));
const isDarkModeOn = ref(getFromStorage(KEY_DARK_MODE));

// Watch for changes and save to localStorage
watch(isDarkModeOn, (value) => {
  saveToStorage(KEY_DARK_MODE, value);
});

watch(isRtlDirection, (value) => {
  saveToStorage(KEY_RTL, value);
});

function toggleDarkMode() {
  isDarkModeOn.value = !isDarkModeOn.value;
}

function toggleDirection() {
  isRtlDirection.value = !isRtlDirection.value;
}

function getFromStorage(key: string): boolean {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key) === 'true';
  }
  return false;
}

function saveToStorage(key: string, value: boolean): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, String(value));
  }
}

export function useShowcaseContainer() {
  return {
    isRtlDirection,
    isDarkModeOn,
    toggleDarkMode,
    toggleDirection
  };
}
