// composables/useUsernameSuggestion.ts
import { ref, computed, onMounted } from 'vue';
import { debounce } from 'lodash-es'; // or use your own debounce util

interface UsernameStatus {
  status: 'idle' | 'checking' | 'available' | 'taken' | null;
  message: string;
}

export function useUsernameSuggestion() {
  const username = ref('');
  const status = ref<UsernameStatus>({ status: null, message: '' });

  // Reddit-style word lists (expand as needed)
  const adjectives = [
    'Jackfruit',
    'Clever',
    'Swift',
    'Brave',
    'Quiet',
    'Lunar',
    'Solar',
    'Neon',
    'Vivid',
    'Frosty',
    'Blazing',
    'Mystic',
    'Echo',
    'Phantom',
    'Crimson',
    'Azure',
    'Golden',
    'Silver',
    'Emerald',
    'Ruby',
    'Onyx'
  ];

  const nouns = [
    'Panda',
    'Falcon',
    'Tiger',
    'Wolf',
    'Eagle',
    'Shark',
    'Lynx',
    'Raven',
    'Phoenix',
    'Dragon',
    'Knight',
    'Wizard',
    'Rogue',
    'Sage',
    'Nomad',
    'Voyager',
    'Horizon',
    'Summit',
    'Valley',
    'Ridge'
  ];

  // Generate random username
  const generateSuggestion = async () => {
    status.value = { status: 'checking', message: '' };

    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const numbers = Math.floor(Math.random() * 9999)
      .toString()
      .padStart(4, '0');

    username.value = adj + noun + numbers;

    await checkAvailability();
  };

  // Check availability via API
  const checkAvailability = async () => {
    if (!username.value.trim()) {
      status.value = { status: null, message: '' };
      return;
    }

    // Basic client-side format validation
    if (!/^[a-zA-Z0-9_-]{3,20}$/.test(username.value)) {
      status.value = {
        status: null,
        message: '3–20 chars: letters, numbers, - or _ only'
      };
      return;
    }

    status.value = { status: 'checking', message: '' };

    try {
      const res = await $fetch('/api/check-username', {
        method: 'POST',
        body: { username: username.value.trim() }
      });

      if (res.available) {
        status.value = {
          status: 'available',
          message: 'Nice! Username available'
        };
      } else {
        status.value = {
          status: 'taken',
          message: 'Sorry, that username is taken'
        };
      }
    } catch (err) {
      status.value = { status: null, message: 'Check failed, try again' };
    }
  };

  // Debounced check on input
  const debouncedCheck = debounce(checkAvailability, 500);

  const handleInput = () => {
    debouncedCheck();
  };

  // Expose everything
  const isAvailable = computed(() => status.value.status === 'available');
  const isChecking = computed(() => status.value.status === 'checking');
  const canRegenerate = computed(() => isAvailable.value);

  onMounted(() => {
    generateSuggestion();
  });

  return {
    username,
    status,
    isAvailable,
    isChecking,
    canRegenerate,
    generateSuggestion,
    handleInput,
    checkAvailability
  };
}
