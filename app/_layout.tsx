
import { Stack, useGlobalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, SafeAreaView, View, ActivityIndicator, Text } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { useEffect, useState } from 'react';
import { setupErrorLogging } from '../utils/errorLogger';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

const STORAGE_KEY = 'emulated_device';

export default function RootLayout() {
  const actualInsets = useSafeAreaInsets();
  const { emulate } = useGlobalSearchParams<{ emulate?: string }>();
  const [storedEmulate, setStoredEmulate] = useState<string | null>(null);
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  useEffect(() => {
    setupErrorLogging();

    if (Platform.OS === 'web') {
      if (emulate) {
        localStorage.setItem(STORAGE_KEY, emulate);
        setStoredEmulate(emulate);
      } else {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setStoredEmulate(stored);
        }
      }
    }
  }, [emulate]);

  let insetsToUse = actualInsets;

  if (Platform.OS === 'web') {
    const simulatedInsets = {
      ios: { top: 47, bottom: 20, left: 0, right: 0 },
      android: { top: 40, bottom: 0, left: 0, right: 0 },
    } as const;

    const deviceToEmulate = storedEmulate || emulate;
    insetsToUse =
      deviceToEmulate
        ? simulatedInsets[deviceToEmulate as keyof typeof simulatedInsets] || actualInsets
        : actualInsets;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[
          commonStyles.wrapper,
          {
            paddingTop: insetsToUse.top,
            paddingBottom: insetsToUse.bottom,
            paddingLeft: insetsToUse.left,
            paddingRight: insetsToUse.right,
          },
        ]}
      >
        <StatusBar style="light" />
        {!fontsLoaded ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
            <ActivityIndicator color={colors.accent} />
            <Text style={{ color: colors.text, marginTop: 10, fontFamily: 'Roboto_400Regular' }}>Loading...</Text>
          </View>
        ) : (
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'default',
            }}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
